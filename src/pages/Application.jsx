import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Camera, Upload, CheckCircle2, ChevronRight, ChevronLeft, Save, UserCircle } from "lucide-react";
import SignatureCanvas from 'react-signature-canvas';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

// --- Sub-components for each step ---

const AgreementStep = ({ onNext }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">ข้อตกลงและเงื่อนไขการสมัครงาน</CardTitle>
          <CardDescription>กรุณาอ่านและยอมรับข้อตกลงก่อนดำเนินการต่อ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="h-64 overflow-y-auto p-4 bg-slate-50 rounded-md border text-sm text-slate-600 leading-relaxed">
            <p className="mb-3">1. ข้อมูลที่ท่านกรอกทั้งหมดจะต้องเป็นความจริงทุกประการ หากมีการตรวจสอบพบว่าเป็นเท็จ บริษัทขอสงวนสิทธิ์ในการยกเลิกใบสมัครทันที</p>
            <p className="mb-3">2. บริษัทจะเก็บรักษาข้อมูลส่วนบุคคลของท่านไว้เป็นความลับและจะนำไปใช้เพื่อวัตถุประสงค์ในการพิจารณาคัดเลือกบุคลากรเข้าทำงานเท่านั้น</p>
            <p className="mb-3">3. ท่านยินยอมให้บริษัททำการตรวจสอบประวัติอาชญากรรมและประวัติการทำงานย้อนหลังได้</p>
            <p className="mb-3">4. การสมัครงานนี้ไม่มีค่าใช้จ่ายใดๆ ทั้งสิ้น</p>
            <p>5. ท่านยินยอมให้มีการถ่ายภาพและบันทึกวิดีโอเพื่อประกอบการพิจารณาใบสมัคร</p>
          </div>
          
          <div className="flex items-center space-x-2 pt-4 border-t">
            <Checkbox id="terms" checked={agreed} onCheckedChange={setAgreed} />
            <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              ข้าพเจ้ายอมรับข้อตกลงและเงื่อนไขทั้งหมด รวมถึงยินยอมให้เก็บภาพถ่ายและข้อมูลส่วนบุคคล
            </Label>
          </div>

          <Button 
            onClick={onNext} 
            disabled={!agreed} 
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700"
          >
            ยืนยันและดำเนินการต่อ
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const PhotoStep = ({ onNext, setGlobalData }) => {
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
  
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            setShowCamera(false);
        }
    };

    const startCamera = async () => {
        setShowCamera(true);
        setPhoto(null);
        setPreview(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            // Use a small timeout to ensure videoRef is mounted
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            }, 100);
        } catch (err) {
            console.error("Camera error", err);
            alert("ไม่สามารถเข้าถึงกล้องได้");
            setShowCamera(false);
        }
    };

    const capturePhoto = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
            
            // Stop stream
            const stream = videoRef.current.srcObject;
            stream?.getTracks().forEach(track => track.stop());

            canvas.toBlob(blob => {
                const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
                setPhoto(file);
                setPreview(URL.createObjectURL(blob));
                setShowCamera(false);
            }, 'image/jpeg');
        }
    };

    const handleUpload = async () => {
        if (!photo) return;
        setIsUploading(true);
        try {
             const { file_url } = await base44.integrations.Core.UploadFile({ file: photo });
             setGlobalData(prev => ({ ...prev, photo_url: file_url }));
             onNext();
        } catch (error) {
            console.error("Upload failed", error);
            // Fallback logic
            setGlobalData(prev => ({ ...prev, photo_url: preview })); 
            onNext();
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto py-10 px-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">ถ่ายรูปหน้าตรง</CardTitle>
                    <CardDescription className="text-center">เลือกวิธีนำเข้ารูปภาพของคุณ</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-6">
                    
                    {/* Display Area */}
                    <div className="w-64 h-80 bg-slate-100 rounded-lg overflow-hidden border-2 border-slate-200 relative flex items-center justify-center">
                        {showCamera ? (
                            <div className="relative w-full h-full">
                                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                                <Button 
                                    size="sm" 
                                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 hover:bg-red-700 rounded-full w-12 h-12 flex items-center justify-center p-0"
                                    onClick={capturePhoto}
                                >
                                    <div className="w-4 h-4 bg-white rounded-full" />
                                </Button>
                            </div>
                        ) : preview ? (
                            <img src={preview} alt="Profile Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-center text-slate-400 p-4">
                                <UserCircle className="w-20 h-20 mx-auto mb-2 opacity-50" />
                                <p>ตัวอย่างรูปภาพ</p>
                            </div>
                        )}
                    </div>

                    {/* Controls */}
                    {!showCamera && (
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex gap-2">
                                <Upload className="w-4 h-4" /> อัปโหลดไฟล์
                            </Button>
                            <Button variant="outline" onClick={startCamera} className="flex gap-2">
                                <Camera className="w-4 h-4" /> เปิดกล้องถ่าย
                            </Button>
                        </div>
                    )}

                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                    />
                    
                    {photo && !showCamera && (
                        <div className="w-full pt-4 border-t">
                             <Button 
                                onClick={handleUpload} 
                                disabled={isUploading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700"
                            >
                                {isUploading ? "กำลังอัปโหลด..." : "ยืนยันรูปถ่ายนี้"}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

const FormStep1 = ({ data, updateData }) => (
    <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-900 border-b pb-2 mb-4">ส่วนที่ 1: ข้อมูลส่วนตัว</h3>
        <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label>คำนำหน้า</Label>
                <Select value={data.prefix} onValueChange={(v) => updateData('personal_data', 'prefix', v)}>
                    <SelectTrigger><SelectValue placeholder="เลือก" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="นาย">นาย</SelectItem>
                        <SelectItem value="นาง">นาง</SelectItem>
                        <SelectItem value="นางสาว">นางสาว</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                 <Label>เลขบัตรประชาชน</Label>
                 <Input value={data.id_card} onChange={(e) => updateData('personal_data', 'id_card', e.target.value)} placeholder="x-xxxx-xxxxx-xx-x" />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>ชื่อจริง</Label>
                <Input value={data.first_name} onChange={(e) => updateData('personal_data', 'first_name', e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>นามสกุล</Label>
                <Input value={data.last_name} onChange={(e) => updateData('personal_data', 'last_name', e.target.value)} />
            </div>
        </div>
        <div className="space-y-2">
            <Label>วันเดือนปีเกิด</Label>
            <Input type="date" value={data.dob} onChange={(e) => updateData('personal_data', 'dob', e.target.value)} />
        </div>
        <div className="space-y-2">
            <Label>ที่อยู่ปัจจุบัน</Label>
            <Textarea value={data.address} onChange={(e) => updateData('personal_data', 'address', e.target.value)} />
        </div>
    </div>
);

const FormStep2 = ({ data, updateData }) => (
    <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-900 border-b pb-2 mb-4">ส่วนที่ 2: ประวัติการศึกษา</h3>
        <div className="space-y-2">
            <Label>มหาวิทยาลัย / สถาบัน</Label>
            <Input value={data.university} onChange={(e) => updateData('education_data', 'university', e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>คณะ</Label>
                <Input value={data.faculty} onChange={(e) => updateData('education_data', 'faculty', e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>สาขาวิชา</Label>
                <Input value={data.major} onChange={(e) => updateData('education_data', 'major', e.target.value)} />
            </div>
        </div>
        <div className="space-y-2">
            <Label>เกรดเฉลี่ย (GPA)</Label>
            <Input value={data.gpa} onChange={(e) => updateData('education_data', 'gpa', e.target.value)} placeholder="0.00" />
        </div>
    </div>
);

const FormStep3 = ({ data, updateData }) => (
    <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-900 border-b pb-2 mb-4">ส่วนที่ 3: ข้อมูลเพิ่มเติม</h3>
        <div className="space-y-2">
            <Label>โรคประจำตัว</Label>
            <Input value={data.diseases} onChange={(e) => updateData('health_data', 'diseases', e.target.value)} placeholder="ไม่มี ให้ระบุว่า -" />
        </div>
        <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label>การดื่มแอลกอฮอล์</Label>
                <Select value={data.alcohol} onValueChange={(v) => updateData('health_data', 'alcohol', v)}>
                    <SelectTrigger><SelectValue placeholder="เลือก" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ไม่ดื่ม">ไม่ดื่ม</SelectItem>
                        <SelectItem value="ดื่มสังสรรค์">ดื่มสังสรรค์</SelectItem>
                        <SelectItem value="ดื่มเป็นประจำ">ดื่มเป็นประจำ</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label>การสูบบุหรี่</Label>
                 <Select value={data.smoking} onValueChange={(v) => updateData('health_data', 'smoking', v)}>
                    <SelectTrigger><SelectValue placeholder="เลือก" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ไม่สูบ">ไม่สูบ</SelectItem>
                        <SelectItem value="สูบ">สูบ</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div className="space-y-2">
            <Label>ประวัติครอบครัว (โดยย่อ)</Label>
            <Textarea value={data.family_history} onChange={(e) => updateData('health_data', 'family_history', e.target.value)} placeholder="บิดา/มารดา อาชีพ..." />
        </div>
    </div>
);

const FormStep4 = ({ data, updateData, setSignature }) => {
    const sigCanvas = useRef({});
    
    const clearSig = () => {
        sigCanvas.current.clear();
        setSignature(null);
    };

    const saveSig = () => {
        if (!sigCanvas.current.isEmpty()) {
            setSignature(sigCanvas.current.toDataURL());
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 border-b pb-2 mb-4">ส่วนที่ 4: ประสบการณ์และลายเซ็น</h3>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>ที่ทำงานล่าสุด (ถ้ามี)</Label>
                    <Input value={data.last_company} onChange={(e) => updateData('experience_data', 'last_company', e.target.value)} placeholder="ชื่อบริษัท" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>ตำแหน่ง</Label>
                        <Input value={data.position} onChange={(e) => updateData('experience_data', 'position', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>อายุงาน</Label>
                        <Input value={data.years} onChange={(e) => updateData('experience_data', 'years', e.target.value)} placeholder="เช่น 2 ปี" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label>คติประจำใจในการทำงาน</Label>
                    <Textarea value={data.motto} onChange={(e) => updateData('experience_data', 'motto', e.target.value)} />
                </div>
            </div>

            <div className="pt-4 border-t">
                <Label className="mb-2 block">ลายเซ็นผู้สมัคร</Label>
                <div className="border border-slate-300 rounded-md bg-white overflow-hidden">
                    <SignatureCanvas 
                        ref={sigCanvas}
                        penColor="black"
                        canvasProps={{width: 500, height: 200, className: 'sigCanvas w-full h-48'}}
                        onEnd={saveSig}
                    />
                </div>
                <div className="flex justify-end mt-2">
                    <Button variant="outline" size="sm" onClick={clearSig}>ล้างลายเซ็น</Button>
                </div>
            </div>
        </div>
    );
};

const DataFormWizard = ({ onComplete, globalData, setGlobalData }) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const updateData = (section, field, value) => {
        setGlobalData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
        else handleSubmitData();
    };

    const handleSubmitData = async () => {
        setIsSubmitting(true);
        try {
            const initialData = {
                full_name: `${globalData.personal_data.first_name} ${globalData.personal_data.last_name}`,
                personal_data: globalData.personal_data,
                education_data: globalData.education_data,
                health_data: globalData.health_data,
                experience_data: globalData.experience_data,
                photo_url: globalData.photo_url,
                signature_url: globalData.signature_url,
                submission_date: new Date().toISOString().split('T')[0],
                status: 'pending_video' // Intermediate status
            };
            
            const record = await base44.entities.Applicant.create(initialData);
            
            // Save the ID for the next step
            setGlobalData(prev => ({ ...prev, applicant_id: record.id }));
            
            onComplete();
        } catch (error) {
            console.error("Failed to save initial data", error);
            alert("ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <Card className="min-h-[600px] flex flex-col">
                <CardHeader>
                    <CardTitle>กรอกข้อมูลใบสมัคร</CardTitle>
                    <div className="flex gap-2 mt-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`h-2 flex-1 rounded-full ${i <= step ? 'bg-indigo-600' : 'bg-slate-200'}`} />
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="flex-1">
                    {step === 1 && <FormStep1 data={globalData.personal_data} updateData={updateData} />}
                    {step === 2 && <FormStep2 data={globalData.education_data} updateData={updateData} />}
                    {step === 3 && <FormStep3 data={globalData.health_data} updateData={updateData} />}
                    {step === 4 && <FormStep4 
                                        data={globalData.experience_data} 
                                        updateData={updateData} 
                                        setSignature={(url) => setGlobalData(prev => ({...prev, signature_url: url}))}
                                   />}
                </CardContent>
                <div className="p-6 border-t flex justify-between bg-slate-50 rounded-b-xl">
                    <Button variant="ghost" onClick={handleBack} disabled={step === 1 || isSubmitting}>
                        <ChevronLeft className="w-4 h-4 mr-2" /> ย้อนกลับ
                    </Button>
                    <Button onClick={handleNext} disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700">
                        {isSubmitting ? "กำลังบันทึก..." : (step === 4 ? "บันทึกและไปต่อ" : "ถัดไป")} 
                        {!isSubmitting && <ChevronRight className="w-4 h-4 ml-2" />}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

const VideoInterviewStep = ({ globalData, onFinish }) => {
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
};

// --- Main Page Component ---

export default function ApplicationPage() {
    const [mainStep, setMainStep] = useState(0); // 0: Agreement, 1: Photo, 2: Form, 3: Video
    const [globalData, setGlobalData] = useState({
        photo_url: '',
        personal_data: { prefix: '', first_name: '', last_name: '', id_card: '', dob: '', address: '' },
        education_data: { university: '', faculty: '', major: '', gpa: '' },
        health_data: { diseases: '', smoking: '', alcohol: '', family_history: '' },
        experience_data: { last_company: '', position: '', years: '', motto: '' },
        signature_url: ''
    });

    const handleCompletion = () => {
        setMainStep(4); // Success screen
    };

    if (mainStep === 4) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <Card className="w-full max-w-md text-center p-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">สมัครงานเสร็จสมบูรณ์</h2>
                    <p className="text-slate-500 mb-8">ขอบคุณที่ร่วมสมัครงานกับเรา ข้อมูลของคุณถูกส่งเรียบร้อยแล้ว</p>
                    <Button onClick={() => window.location.href = '/'} className="w-full">
                        กลับสู่หน้าหลัก
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 pb-20">
            {/* Progress Header could go here */}
            
            <AnimatePresence mode="wait">
                {mainStep === 0 && (
                    <motion.div key="agreement" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
                        <AgreementStep onNext={() => setMainStep(1)} />
                    </motion.div>
                )}
                {mainStep === 1 && (
                    <motion.div key="photo" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
                         <PhotoStep onNext={() => setMainStep(2)} setGlobalData={setGlobalData} />
                    </motion.div>
                )}
                {mainStep === 2 && (
                    <motion.div key="form" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
                        <DataFormWizard 
                            globalData={globalData} 
                            setGlobalData={setGlobalData}
                            onComplete={() => setMainStep(3)} 
                        />
                    </motion.div>
                )}
                {mainStep === 3 && (
                    <motion.div key="video" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
                        <VideoInterviewStep globalData={globalData} onFinish={handleCompletion} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}