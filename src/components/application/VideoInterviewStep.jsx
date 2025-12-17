import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera } from "lucide-react";
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function VideoInterviewStep({ globalData, onFinish }) {
    // Phases: 'general-intro' -> 'general-questions' -> 'job-selection' -> 'specific-intro' -> 'specific-questions' -> 'finish'
    const [phase, setPhase] = useState('general-intro');
    const [selectedJob, setSelectedJob] = useState("");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [videoResponses, setVideoResponses] = useState([]);
    
    // Response states
    const [isRecording, setIsRecording] = useState(false);
    const [videoBlob, setVideoBlob] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [textAnswer, setTextAnswer] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [uploading, setUploading] = useState(false);
    
    const mediaRecorderRef = useRef(null);
    const videoPreviewRef = useRef(null);
    const chunksRef = useRef([]);

    // Reset state for new question
    const resetResponseState = () => {
        setVideoBlob(null);
        setVideoUrl(null);
        setTextAnswer("");
        setSelectedOption("");
        setSelectedOptions([]);
        setIsRecording(false);
    };

    // Fetch General Questions
    const { data: generalQuestions = [] } = useQuery({
        queryKey: ['generalQuestions'],
        queryFn: () => base44.entities.Question.filter({type: 'general', is_active: true}),
    });

    // Fetch Jobs
    const { data: jobs = [] } = useQuery({
        queryKey: ['jobs'],
        queryFn: () => base44.entities.JobPosition.filter({is_active: true}),
    });

    // Fetch Specific Questions (only when job selected)
    const { data: specificQuestions = [] } = useQuery({
        queryKey: ['specificQuestions', selectedJob],
        queryFn: () => base44.entities.Question.filter({job_position_id: selectedJob, is_active: true}),
        enabled: !!selectedJob
    });

    // Initialize job from previous step if available, but don't auto-skip
    React.useEffect(() => {
        if (jobs.length > 0 && globalData.personal_data?.position_1 && !selectedJob) {
            const match = jobs.find(j => j.title === globalData.personal_data.position_1);
            if (match) {
                setSelectedJob(match.id);
            }
        }
    }, [jobs, globalData.personal_data?.position_1]);

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

    const handleSaveResponse = async (question) => {
        setUploading(true);
        try {
            let responseData = {
                question: question.text,
                type: question.answer_type || 'text'
            };

            // Handle Video
            if (question.answer_type === 'video') {
                if (!videoBlob) {
                    alert("กรุณาอัดวิดีโอคำตอบก่อนส่ง");
                    setUploading(false);
                    return null;
                }
                const fileName = `interview_${Date.now()}.webm`;
                const file = new File([videoBlob], fileName, { type: "video/webm" });
                const { file_url } = await base44.integrations.Core.UploadFile({ file });
                responseData.url = file_url;
                responseData.answer = "Video Response";
            } 
            // Handle Text
            else if (question.answer_type === 'text') {
                if (!textAnswer.trim()) {
                    alert("กรุณากรอกคำตอบ");
                    setUploading(false);
                    return null;
                }
                responseData.answer = textAnswer;
            }
            // Handle Single Choice
            else if (question.answer_type === 'single_choice') {
                if (!selectedOption) {
                    alert("กรุณาเลือกคำตอบ");
                    setUploading(false);
                    return null;
                }
                responseData.answer = selectedOption;
            }
            // Handle Multiple Choice
            else if (question.answer_type === 'multiple_choice') {
                if (selectedOptions.length === 0) {
                    alert("กรุณาเลือกอย่างน้อย 1 ข้อ");
                    setUploading(false);
                    return null;
                }
                responseData.answer = selectedOptions.join(', ');
            } else {
                // Default fallback
                responseData.answer = textAnswer;
            }

            const updatedResponses = [...videoResponses, responseData];
            setVideoResponses(updatedResponses);
            resetResponseState();
            
            return updatedResponses;
        } catch (error) {
            console.error("Save failed", error);
            alert("เกิดข้อผิดพลาดในการบันทึกคำตอบ");
            return null;
        } finally {
            setUploading(false);
        }
    };

    const handleNextGeneral = async () => {
        const currentQ = generalQuestions[currentQuestionIndex];
        const result = await handleSaveResponse(currentQ);
        if (!result) return;

        if (currentQuestionIndex < generalQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setPhase('job-selection');
            setCurrentQuestionIndex(0);
        }
    };

    const handleNextSpecific = async () => {
        const currentQ = specificQuestions[currentQuestionIndex];
        const result = await handleSaveResponse(currentQ);
        if (!result) return;

        if (currentQuestionIndex < specificQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            // Finished
            await base44.entities.Applicant.update(globalData.applicant_id, {
                job_position_id: selectedJob,
                responses: result, // Save to new field
                // Legacy support just in case
                video_response_url: result.find(r => r.type === 'video')?.url || '', 
                status: 'pending'
            });
            onFinish();
        }
    };

    // --- RENDER PHASES ---

    // 1. General Intro
    if (phase === 'general-intro') {
        return (
            <div className="max-w-xl mx-auto py-10 px-4">
                <Card>
                    <CardHeader>
                        <CardTitle>การสัมภาษณ์ออนไลน์: ส่วนที่ 1</CardTitle>
                        <CardDescription>คำถามทั่วไป</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-slate-600 space-y-2">
                            <p>ในส่วนแรก คุณจะได้ตอบคำถามทั่วไปเกี่ยวกับตัวคุณ ทัศนคติ และเป้าหมายในการทำงาน</p>
                            <ul className="list-disc pl-5">
                                <li>จำนวนคำถาม: {generalQuestions.length} ข้อ</li>
                                <li>เมื่อพร้อมแล้ว กดปุ่ม "เริ่มตอบคำถาม"</li>
                            </ul>
                        </div>
                        <Button className="w-full bg-indigo-600" onClick={() => setPhase('general-questions')}>
                            เริ่มตอบคำถามทั่วไป
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // 2. General Questions Recording
    if (phase === 'general-questions') {
        const question = generalQuestions[currentQuestionIndex];
        if (!question) return <div className="text-center p-10">ไม่พบคำถามทั่วไป (กรุณาติดต่อ Admin) <Button onClick={() => setPhase('job-selection')} className="ml-4">ข้ามไปเลือกตำแหน่ง</Button></div>;

        return (
            <RecordingInterface 
                title={`คำถามทั่วไปข้อที่ ${currentQuestionIndex + 1} / ${generalQuestions.length}`}
                questionText={question.text}
                videoUrl={videoUrl}
                videoPreviewRef={videoPreviewRef}
                isRecording={isRecording}
                onStart={startRecording}
                onStop={stopRecording}
                onRetry={() => { setVideoUrl(null); setVideoBlob(null); }}
                onSubmit={handleNextGeneral}
                uploading={uploading}
                btnText={currentQuestionIndex < generalQuestions.length - 1 ? "ข้อถัดไป" : "เสร็จสิ้นส่วนที่ 1"}
            />
        );
    }

    // 3. Job Selection
    if (phase === 'job-selection') {
        return (
            <div className="max-w-xl mx-auto py-10 px-4">
                <Card>
                    <CardHeader>
                        <CardTitle>เลือกตำแหน่งงานที่สมัคร</CardTitle>
                        <CardDescription>กรุณายืนยันตำแหน่งงานที่คุณต้องการสมัครเพื่อเข้าสู่คำถามเฉพาะตำแหน่ง</CardDescription>
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
                            onClick={() => setPhase('specific-intro')}
                        >
                            ยืนยันตำแหน่ง
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // 4. Specific Intro
    if (phase === 'specific-intro') {
        const jobTitle = jobs.find(j => j.id === selectedJob)?.title || "ตำแหน่งงาน";
        return (
            <div className="max-w-xl mx-auto py-10 px-4">
                <Card>
                    <CardHeader>
                        <CardTitle>การสัมภาษณ์ออนไลน์: ส่วนที่ 2</CardTitle>
                        <CardDescription>คำถามเฉพาะสำหรับตำแหน่ง: <span className="text-indigo-600 font-semibold">{jobTitle}</span></CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="text-slate-600 space-y-2">
                            <p>ในส่วนนี้ จะเป็นคำถามที่เกี่ยวข้องกับทักษะและความรู้ในตำแหน่งงานที่คุณสมัคร</p>
                            <ul className="list-disc pl-5">
                                <li>จำนวนคำถาม: {specificQuestions.length} ข้อ</li>
                            </ul>
                        </div>
                        <Button className="w-full bg-indigo-600" onClick={() => setPhase('specific-questions')} disabled={specificQuestions.length === 0}>
                            {specificQuestions.length === 0 ? "ไม่มีคำถามเฉพาะตำแหน่ง (กดเพื่อส่งใบสมัคร)" : "เริ่มตอบคำถาม"}
                        </Button>
                         {specificQuestions.length === 0 && (
                            <Button variant="ghost" className="w-full text-slate-400" onClick={onFinish}>
                                ข้ามและส่งใบสมัคร
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
        );
    }

    // 5. Specific Questions Recording
    if (phase === 'specific-questions') {
        const question = specificQuestions[currentQuestionIndex];
        return (
            <QuestionInterface 
                title={`คำถามเฉพาะข้อที่ ${currentQuestionIndex + 1} / ${specificQuestions.length}`}
                question={question}
                
                // Video props
                videoUrl={videoUrl}
                videoPreviewRef={videoPreviewRef}
                isRecording={isRecording}
                onStart={startRecording}
                onStop={stopRecording}
                onRetry={() => { setVideoUrl(null); setVideoBlob(null); }}
                
                // Text/Choice props
                textAnswer={textAnswer}
                setTextAnswer={setTextAnswer}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                
                onSubmit={handleNextSpecific}
                uploading={uploading}
                btnText={currentQuestionIndex < specificQuestions.length - 1 ? "ข้อถัดไป" : "ส่งใบสมัคร"}
            />
        );
    }

    return null;
}

// Reusable UI for different question types
function QuestionInterface({ 
    title, question, 
    videoUrl, videoPreviewRef, isRecording, onStart, onStop, onRetry, 
    textAnswer, setTextAnswer,
    selectedOption, setSelectedOption,
    selectedOptions, setSelectedOptions,
    onSubmit, uploading, btnText 
}) {
    const { answer_type = 'text', options = [] } = question;

    const renderInput = () => {
        switch(answer_type) {
            case 'video':
                return (
                    <div className="w-full flex flex-col items-center gap-4">
                        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative max-w-2xl">
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
                                    <Button onClick={onStart} className="bg-red-600 hover:bg-red-700 w-32">
                                        <Camera className="mr-2 h-4 w-4" /> อัดวิดีโอ
                                    </Button>
                                ) : (
                                    <Button onClick={onStop} variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 w-32">
                                        <div className="w-3 h-3 bg-red-600 rounded-sm mr-2" /> หยุด
                                    </Button>
                                )
                            ) : (
                                <Button variant="outline" onClick={onRetry}>อัดใหม่</Button>
                            )}
                        </div>
                    </div>
                );
            
            case 'text':
                return (
                    <div className="w-full max-w-2xl">
                        <textarea 
                            className="w-full h-40 p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                            placeholder="พิมพ์คำตอบของคุณที่นี่..."
                            value={textAnswer}
                            onChange={(e) => setTextAnswer(e.target.value)}
                        />
                    </div>
                );
            
            case 'single_choice':
                return (
                    <div className="w-full max-w-xl space-y-3">
                        {options && options.map((opt, i) => (
                            <label key={i} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${selectedOption === opt ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500' : 'hover:bg-slate-50'}`}>
                                <input 
                                    type="radio" 
                                    name="choice" 
                                    value={opt} 
                                    checked={selectedOption === opt}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                    className="w-5 h-5 text-indigo-600 mr-3"
                                />
                                <span className="text-lg">{opt}</span>
                            </label>
                        ))}
                    </div>
                );

            case 'multiple_choice':
                return (
                    <div className="w-full max-w-xl space-y-3">
                        {options && options.map((opt, i) => {
                            const isChecked = selectedOptions.includes(opt);
                            return (
                                <label key={i} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${isChecked ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500' : 'hover:bg-slate-50'}`}>
                                    <input 
                                        type="checkbox" 
                                        value={opt}
                                        checked={isChecked}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedOptions([...selectedOptions, opt]);
                                            } else {
                                                setSelectedOptions(selectedOptions.filter(item => item !== opt));
                                            }
                                        }}
                                        className="w-5 h-5 text-indigo-600 mr-3 rounded"
                                    />
                                    <span className="text-lg">{opt}</span>
                                </label>
                            );
                        })}
                    </div>
                );

            default:
                return <div>Unknown question type</div>;
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl text-indigo-700">{title}</CardTitle>
                    <p className="text-lg font-medium mt-2">{question.text}</p>
                    <div className="text-sm text-slate-400 mt-1 capitalize">
                         Type: {answer_type?.replace('_', ' ')}
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-6">
                    
                    {renderInput()}

                    <div className="flex gap-4 pt-4">
                        <Button onClick={onSubmit} disabled={uploading} className="bg-green-600 hover:bg-green-700 w-full md:w-auto px-8">
                            {uploading ? "กำลังบันทึก..." : btnText}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}