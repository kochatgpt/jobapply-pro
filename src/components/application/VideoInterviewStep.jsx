import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera } from "lucide-react";
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function VideoInterviewStep({ globalData, onFinish }) {
    const [selectedJob, setSelectedJob] = useState("");
    const [stage, setStage] = useState('select'); // select, instruction, record, done
    const [isRecording, setIsRecording] = useState(false);
    const [videoBlob, setVideoBlob] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const mediaRecorderRef = useRef(null);
    const videoPreviewRef = useRef(null);
    const chunksRef = useRef([]);

    // Fetch jobs
    const { data: jobs } = useQuery({
        queryKey: ['jobs'],
        queryFn: () => base44.entities.JobPosition.list({is_active: true}),
        initialData: []
    });

    // Fetch questions
    const { data: questions } = useQuery({
        queryKey: ['questions', selectedJob],
        queryFn: async () => {
            if (!selectedJob) return [];
            // Get general questions
            const general = await base44.entities.Question.list({type: 'general', is_active: true});
            // Get specific questions
            const specific = await base44.entities.Question.list({job_position_id: selectedJob, is_active: true});
            return [...general, ...specific];
        },
        enabled: !!selectedJob
    });

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (videoPreviewRef.current) {
                videoPreviewRef.current.srcObject = stream;
            }
            
            mediaRecorderRef.current = new MediaRecorder(stream);
            chunksRef.current = [];
            
            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'video/webm' });
                setVideoBlob(blob);
                const url = URL.createObjectURL(blob);
                setVideoUrl(url);
                
                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing media devices:", err);
            alert("ไม่สามารถเข้าถึงกล้องหรือไมโครโฟนได้");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleSubmit = async () => {
        if (!videoBlob) return;
        setUploading(true);
        
        try {
            // Upload video
            const file = new File([videoBlob], "interview.webm", { type: "video/webm" });
            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            
            // Update the existing applicant record with video and job info
            await base44.entities.Applicant.update(globalData.applicant_id, {
                job_position_id: selectedJob,
                video_response_url: file_url,
                status: 'pending' // Ready for review
            });

            onFinish();

        } catch (error) {
            console.error("Submission failed", error);
            alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
        } finally {
            setUploading(false);
        }
    };

    if (stage === 'select') {
        return (
            <div className="max-w-xl mx-auto py-10 px-4">
                <Card>
                    <CardHeader>
                        <CardTitle>เลือกตำแหน่งงาน</CardTitle>
                        <CardDescription>กรุณาเลือกตำแหน่งที่คุณต้องการสมัครเพื่อเข้าสู่ขั้นตอนการสัมภาษณ์</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Select value={selectedJob} onValueChange={setSelectedJob}>
                            <SelectTrigger>
                                <SelectValue placeholder="เลือกตำแหน่งงาน" />
                            </SelectTrigger>
                            <SelectContent>
                                {jobs.map(job => (
                                    <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button 
                            className="w-full bg-indigo-600" 
                            disabled={!selectedJob}
                            onClick={() => setStage('instruction')}
                        >
                            ยืนยันตำแหน่ง
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (stage === 'instruction') {
        return (
            <div className="max-w-xl mx-auto py-10 px-4">
                <Card>
                    <CardHeader>
                        <CardTitle>คำแนะนำการอัดวิดีโอ</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="list-disc pl-5 space-y-2 text-slate-600">
                            <li>ระบบจะสุ่มคำถาม 1 ข้อจากตำแหน่งที่คุณเลือก</li>
                            <li>คุณมีเวลาในการตอบคำถามไม่จำกัด แต่ควรมีความกระชับ</li>
                            <li>ตรวจสอบแสงและเสียงให้ชัดเจน</li>
                            <li>เมื่อพร้อมแล้วกดปุ่ม "เริ่มทดสอบ"</li>
                        </ul>
                        <Button className="w-full" onClick={() => setStage('record')}>
                            เริ่มทดสอบ
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Recording Stage
    const question = questions && questions.length > 0 ? questions[0] : { text: "แนะนำตัวเองให้เรารู้จักหน่อย" };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl text-indigo-700">คำถามสัมภาษณ์</CardTitle>
                    <p className="text-lg font-medium mt-2">{question.text}</p>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-6">
                    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative">
                        {!videoUrl ? (
                            <video ref={videoPreviewRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                        ) : (
                            <video src={videoUrl} controls className="w-full h-full object-cover" />
                        )}
                        
                        {isRecording && (
                            <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500/80 text-white px-3 py-1 rounded-full text-sm animate-pulse">
                                <div className="w-2 h-2 bg-white rounded-full" /> REC
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4">
                        {!videoUrl ? (
                            !isRecording ? (
                                <Button onClick={startRecording} className="bg-red-600 hover:bg-red-700 w-32">
                                    <Camera className="mr-2 h-4 w-4" /> อัดวิดีโอ
                                </Button>
                            ) : (
                                <Button onClick={stopRecording} variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 w-32">
                                    <div className="w-3 h-3 bg-red-600 rounded-sm mr-2" /> หยุด
                                </Button>
                            )
                        ) : (
                            <>
                                <Button variant="outline" onClick={() => { setVideoUrl(null); setVideoBlob(null); }}>
                                    อัดใหม่
                                </Button>
                                <Button onClick={handleSubmit} disabled={uploading} className="bg-green-600 hover:bg-green-700">
                                    {uploading ? "กำลังส่ง..." : "ส่งคำตอบและใบสมัคร"}
                                </Button>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}