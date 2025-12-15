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
  const [agreed1, setAgreed1] = useState(false);
  const [agreed2, setAgreed2] = useState(false);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">ขอความยินยอม</CardTitle>
          <CardDescription>นโยบายความเป็นส่วนตัวสำหรับผู้สมัครงาน</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="h-[500px] overflow-y-auto p-6 bg-slate-50 rounded-md border text-sm text-slate-700 leading-relaxed space-y-4">
            <p className="font-semibold text-slate-900">
              บริษัทตระหนักและให้ความสำคัญต่อการคุ้มครองข้อมูลส่วนบุคคลของท่าน บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด ได้จัดทำนโยบาย ความเป็นส่วนตัวสำหรับข้อมูลส่วนบุคคลของผู้ใช้บริการบุคคลภายนอก ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) เพื่อแจ้ง ให้ท่านทราบถึงวิธีการในการเก็บรวบรวม ใช้และเปิดเผยข้อมูลส่วนบุคคลของท่านเมื่อเข้าร่วมกิจกรรม
            </p>

            <div>
                <h4 className="font-bold text-slate-900 mb-2">1. ข้อมูลที่เก็บรวบรวม</h4>
                <p className="mb-2">เมื่อท่านสมัครงานกับเรา เราจำเป็นที่จะต้องรวบรวมข้อมูลดังนี้:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>ข้อมูลส่วนตัวพื้นฐาน เช่น ชื่อ-นามสกุล ที่อยู่ เบอร์โทรศัพท์ อีเมล</li>
                    <li>ประวัติการศึกษาและประสบการณ์ทำงาน</li>
                    <li>ทักษะความสามารถและงานอดิเรก</li>
                    <li>คำแถลงความสนใจและข้อมูลความถนัดและความสะดวก</li>
                    <li>ผลิตภัณฑ์และบริการ (ในกรณีมีบริการรองรับ)</li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-slate-900 mb-2">2. วัตถุประสงค์ในการใช้ข้อมูล</h4>
                <p className="mb-2">เราจะใช้ข้อมูลของท่านเพื่อ:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>พิจารณาคุณสมบัติและความเหมาะสมของผู้สมัครในตำแหน่งงาน</li>
                    <li>ดำเนินการรับสมัครและประเมินผลผู้สมัคร</li>
                    <li>ให้บริการและการติดตามการจ้าง</li>
                    <li>วิเคราะห์และปรับปรุงกระบวนการรับสมัครงานของเรา</li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-slate-900 mb-2">3. ระยะเวลาในการเก็บข้อมูล</h4>
                <p>ข้อมูลส่วนบุคคลของท่านจะถูกเก็บไว้ไม่เกิน 1 ปี นับจากวันที่ทีมงานของเราทำการพิจารณา เว้นแต่กรณีที่พระราชบัญญัติ ในการเก็บไว้นานกว่านั้นอนุญาต</p>
            </div>

            <div>
                <h4 className="font-bold text-slate-900 mb-2">4. การเปิดเผยข้อมูล</h4>
                <p>ข้อมูลของท่านจะถูกใช้เฉพาะเท่าที่จำเป็น และจะไม่มีการเผยแพร่ต่อสาธารณะ เว้นแต่ได้รับอนุญาตจากท่านตามกฎหมาย</p>
            </div>

            <div>
                <h4 className="font-bold text-slate-900 mb-2">5. สิทธิของผู้สมัคร</h4>
                <p>ท่านสามารถขอดูข้อมูล แก้ไขข้อมูล หรือลบข้อมูลส่วนบุคคลได้ หากมีข้อเสนอแนะหรือข้อร้องเรียนในการใช้ข้อมูลดังกล่าว โดย ติดต่อเราที่: hr@ko.in.th</p>
            </div>

            <div>
                <h4 className="font-bold text-slate-900 mb-2">6. การให้ความยินยอม</h4>
                <p>เมื่อท่านส่งใบสมัคร แบบฟอร์ม หรือส่งข้อมูลใด ๆ มาให้เรา ถือว่าท่านยินยอมต่าง ๆ และยินยอมให้ทำตามข้อกำหนดที่ระบุไว้ข้างต้น</p>
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-start space-x-3">
              <Checkbox id="term1" checked={agreed1} onCheckedChange={setAgreed1} className="mt-1" />
              <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="term1" className="text-sm font-medium leading-snug cursor-pointer">
                      ยินยอมให้เก็บข้อมูล
                  </Label>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox id="term2" checked={agreed2} onCheckedChange={setAgreed2} className="mt-1" />
              <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="term2" className="text-sm font-medium leading-snug cursor-pointer">
                      ยินยอมให้บันทึกวิดีโอและเก็บข้อมูลเพื่อวัตถุประสงค์ในการคัดเลือกบุคลากร ตามนโยบายความเป็นส่วนตัวของบริษัท
                  </Label>
              </div>
            </div>
          </div>

          <Button 
            onClick={onNext} 
            disabled={!agreed1 || !agreed2} 
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
                if (blob) {
                    const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
                    setPhoto(file);
                    setPreview(URL.createObjectURL(blob));
                    setShowCamera(false);
                } else {
                    console.error("Failed to capture photo");
                    setShowCamera(false);
                }
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

const FormStep1 = ({ data, updateData, photo }) => {
    // Helper to update nested address fields
    const updateAddress = (type, field, value) => {
        const currentAddr = data[type] || {};
        updateData('personal_data', type, { ...currentAddr, [field]: value });
    };

    const calculateAge = (dob) => {
        if (!dob) return "";
        const diff = Date.now() - new Date(dob).getTime();
        const ageDate = new Date(diff); 
        return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
    };

    const handleDobChange = (e) => {
        const val = e.target.value;
        updateData('personal_data', 'dob', val);
        updateData('personal_data', 'age', calculateAge(val));
    };

    return (
    <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 border-b pb-2 mb-4">ส่วนที่ 1: ประวัติส่วนตัว</h3>

        <div className="space-y-4 bg-slate-50 p-4 rounded-lg border">
            <div className="space-y-2">
                <Label>วันที่ยื่นใบสมัคร</Label>
                <Input type="date" value={data.application_date} onChange={(e) => updateData('personal_data', 'application_date', e.target.value)} />
            </div>
            <div className="text-sm text-slate-600 leading-relaxed text-justify">
                ใบสมัครงานฉบับนี้เป็นส่วนหนึ่งในการพิจารณา ในโอกาสที่ท่านมาสมัครเข้าทำงานที่บริษัทฯ ซึ่งใบสมัครนี้ท่าน ไม่ว่าจะ การพิจารณา รับเข้าทำงาน ข้อมูลในใบสมัครจะถูกเก็บไว้เป็นระยะเวลา 1 เดือน หากมีการพิจารณาเข้าเป็นพนักงาน ซึ่งท้ายหลังจากหมดระยะ อายุใบสมัครนี้ท่านสามาทำการสมัครงานใหม่ได้ ข้อมูลในใบสมัครจะถูกเก็บไว้สำหรับหน่วยงานบริษัทของบริษัท/ลูกจ้างของ บริษัทและผู้ประมวลผลข้อมูลของบริษัท/ลูกจ้างอีกทั้ง บริษัทจะไม่เปิดเผยข้อมูลส่วนบุคคลไปยังบุคคลภายนอก 2 ปี ท่านยินยอมที่ ต้องเป็นพนักงานประจำของการพิจารณาค่าตอบแทน หลักฐานทรัพย์สินผลตอบแทนการรับ อันมิอาจเปิดเผยข้อมูลดังกล่าวแก่บุคคล ภายนอกได้ อนึ่ง ตาม พ.ร.บ. คุ้มครอง ข้อมูล ส่วนบุคคล ปี 2562 เป็นเหตุเกิดอาจกระทบต่อสิทธิและเสรีภาพในความเป็นบุคคลของ ข้าน ตาม (PDPA) คุ้มข้อมูลส่วนบุคคลผู้ที่นำไปใช้ กรม.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 "การคุ้มครองข้อมูลส่วนบุคคล" และ "ข้อมูลส่วนบุคคลทั่วไปภายในสำนักงาน" ในแบบแบ่งปันข้อมูลการพิจารณาบุคคลภายนอกเปิดเผยข้อทำ
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
                <Label>สมัครงานในตำแหน่ง 1</Label>
                <Input value={data.position_1} onChange={(e) => updateData('personal_data', 'position_1', e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>สมัครงานในตำแหน่ง 2</Label>
                <Input value={data.position_2} onChange={(e) => updateData('personal_data', 'position_2', e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>อัตราเงินเดือนที่ต้องการ</Label>
                <Input value={data.expected_salary} onChange={(e) => updateData('personal_data', 'expected_salary', e.target.value)} />
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>ชื่อ-สกุล (ภาษาไทย)</Label>
                    <div className="flex gap-2">
                         <Select value={data.prefix} onValueChange={(v) => updateData('personal_data', 'prefix', v)}>
                            <SelectTrigger className="w-[80px]"><SelectValue placeholder="คำนำ" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="นาย">นาย</SelectItem>
                                <SelectItem value="นาง">นาง</SelectItem>
                                <SelectItem value="นางสาว">น.ส.</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input placeholder="ชื่อ" value={data.first_name} onChange={(e) => updateData('personal_data', 'first_name', e.target.value)} />
                        <Input placeholder="สกุล" value={data.last_name} onChange={(e) => updateData('personal_data', 'last_name', e.target.value)} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Name in English</Label>
                    <Input placeholder="Firstname Lastname" value={data.english_name} onChange={(e) => updateData('personal_data', 'english_name', e.target.value)} />
                </div>
            </div>

            <div className="flex gap-4">
                <div className="space-y-2 flex-1">
                    <Label>ชื่อเล่น (ภาษาไทย)</Label>
                    <Input value={data.thai_nickname} onChange={(e) => updateData('personal_data', 'thai_nickname', e.target.value)} />
                </div>
                {photo && (
                  <div className="w-24 h-32 bg-slate-100 border rounded-md overflow-hidden shrink-0">
                       <img src={photo} alt="Applicant" className="w-full h-full object-cover" />
                  </div>
                )}
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="space-y-2">
                <Label>วัน/เดือน/ปีเกิด</Label>
                <Input type="date" value={data.dob} onChange={handleDobChange} />
            </div>
            <div className="space-y-2">
                <Label>อายุ</Label>
                <Input value={data.age} onChange={(e) => updateData('personal_data', 'age', e.target.value)} readOnly className="bg-slate-50" />
            </div>
            <div className="space-y-2">
                <Label>น้ำหนัก (กก.)</Label>
                <Input value={data.weight} onChange={(e) => updateData('personal_data', 'weight', e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>ส่วนสูง (ซม.)</Label>
                <Input value={data.height} onChange={(e) => updateData('personal_data', 'height', e.target.value)} />
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
                <Label>เชื้อชาติ</Label>
                <Input value={data.race} onChange={(e) => updateData('personal_data', 'race', e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>สัญชาติ</Label>
                <Input value={data.nationality} onChange={(e) => updateData('personal_data', 'nationality', e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>ศาสนา</Label>
                <Input value={data.religion} onChange={(e) => updateData('personal_data', 'religion', e.target.value)} />
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>(Email) อีเมล์ที่ติดต่อได้</Label>
                <Input value={data.email} onChange={(e) => updateData('personal_data', 'email', e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>โทรศัพท์มือถือที่ติดต่อได้สะดวก</Label>
                <Input value={data.mobile_phone} onChange={(e) => updateData('personal_data', 'mobile_phone', e.target.value)} />
            </div>
        </div>

        {/* Registered Address */}
        <div className="bg-slate-50 p-4 rounded-lg border space-y-3">
            <Label className="font-semibold text-indigo-700">ที่อยู่ตามทะเบียนบ้าน</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="col-span-1"><Input placeholder="เลขที่" value={data.registered_address?.number || ''} onChange={(e) => updateAddress('registered_address', 'number', e.target.value)} /></div>
                <div className="col-span-1"><Input placeholder="หมู่" value={data.registered_address?.moo || ''} onChange={(e) => updateAddress('registered_address', 'moo', e.target.value)} /></div>
                <div className="col-span-2"><Input placeholder="ถนน" value={data.registered_address?.road || ''} onChange={(e) => updateAddress('registered_address', 'road', e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                 <Input placeholder="ตำบล/แขวง" value={data.registered_address?.subdistrict || ''} onChange={(e) => updateAddress('registered_address', 'subdistrict', e.target.value)} />
                 <Input placeholder="อำเภอ/เขต" value={data.registered_address?.district || ''} onChange={(e) => updateAddress('registered_address', 'district', e.target.value)} />
                 <Input placeholder="จังหวัด" value={data.registered_address?.province || ''} onChange={(e) => updateAddress('registered_address', 'province', e.target.value)} />
                 <Input placeholder="รหัสไปรษณีย์" value={data.registered_address?.zipcode || ''} onChange={(e) => updateAddress('registered_address', 'zipcode', e.target.value)} />
            </div>
        </div>

        {/* Current Address */}
        <div className="bg-slate-50 p-4 rounded-lg border space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                 <Label className="font-semibold text-indigo-700">ที่อยู่ปัจจุบัน</Label>
                 <Select value={data.current_address_type} onValueChange={(v) => {
                     updateData('personal_data', 'current_address_type', v);
                     if (v === 'same') {
                         updateData('personal_data', 'current_address', data.registered_address);
                     }
                 }}>
                    <SelectTrigger className="w-[250px]"><SelectValue placeholder="เลือกประเภทที่อยู่" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="own">บ้านตนเอง</SelectItem>
                        <SelectItem value="rent">บ้านเช่า / หอพัก</SelectItem>
                        <SelectItem value="same">ที่อยู่ตามบัตรประชาชน</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="col-span-1"><Input placeholder="เลขที่" value={data.current_address?.number || ''} onChange={(e) => updateAddress('current_address', 'number', e.target.value)} /></div>
                <div className="col-span-1"><Input placeholder="หมู่" value={data.current_address?.moo || ''} onChange={(e) => updateAddress('current_address', 'moo', e.target.value)} /></div>
                <div className="col-span-2"><Input placeholder="ถนน" value={data.current_address?.road || ''} onChange={(e) => updateAddress('current_address', 'road', e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                 <Input placeholder="ตำบล/แขวง" value={data.current_address?.subdistrict || ''} onChange={(e) => updateAddress('current_address', 'subdistrict', e.target.value)} />
                 <Input placeholder="อำเภอ/เขต" value={data.current_address?.district || ''} onChange={(e) => updateAddress('current_address', 'district', e.target.value)} />
                 <Input placeholder="จังหวัด" value={data.current_address?.province || ''} onChange={(e) => updateAddress('current_address', 'province', e.target.value)} />
                 <Input placeholder="รหัสไปรษณีย์" value={data.current_address?.zipcode || ''} onChange={(e) => updateAddress('current_address', 'zipcode', e.target.value)} />
            </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
            <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <Label>เพศ</Label>
                    <Select value={data.gender} onValueChange={(v) => updateData('personal_data', 'gender', v)}>
                        <SelectTrigger><SelectValue placeholder="เลือกเพศ" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">ชาย</SelectItem>
                            <SelectItem value="female">หญิง</SelectItem>
                            <SelectItem value="other">อื่นๆ</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>สถานะทางทหาร</Label>
                    <div className="space-y-1">
                         <div className="flex items-center space-x-2">
                            <Checkbox id="mil_exempt" checked={data.military_status === 'exempted'} onCheckedChange={() => updateData('personal_data', 'military_status', 'exempted')} />
                            <label htmlFor="mil_exempt" className="text-sm">ได้รับการยกเว้นทางทหาร</label>
                         </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="mil_served" checked={data.military_status === 'served'} onCheckedChange={() => updateData('personal_data', 'military_status', 'served')} />
                            <label htmlFor="mil_served" className="text-sm">เกณฑ์ทหารแล้ว</label>
                         </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="mil_not" checked={data.military_status === 'not_served'} onCheckedChange={() => updateData('personal_data', 'military_status', 'not_served')} />
                            <label htmlFor="mil_not" className="text-sm">ยังไม่ได้รับการเกณฑ์ทหาร</label>
                         </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>สถานะอุปสมบท</Label>
                    <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="ord_not" checked={data.ordination_status === 'not_yet'} onCheckedChange={() => updateData('personal_data', 'ordination_status', 'not_yet')} />
                            <label htmlFor="ord_not" className="text-sm">ยังไม่อุปสมบท</label>
                         </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="ord_done" checked={data.ordination_status === 'ordained'} onCheckedChange={() => updateData('personal_data', 'ordination_status', 'ordained')} />
                            <label htmlFor="ord_done" className="text-sm">อุปสมบทแล้ว</label>
                         </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
);
}

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
                    {step === 1 && <FormStep1 data={globalData.personal_data} updateData={updateData} photo={globalData.photo_url} />}
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
          personal_data: { 
              application_date: new Date().toISOString().split('T')[0],
              position_1: '',
              position_2: '',
              expected_salary: '',
              prefix: '', 
              first_name: '', 
              last_name: '', 
              thai_nickname: '',
              english_name: '',
              id_card: '', 
              dob: '', 
              age: '',
              weight: '',
              height: '',
              race: '',
              nationality: '',
              religion: '',
              email: '',
              mobile_phone: '',
              registered_address: { number: '', moo: '', road: '', subdistrict: '', district: '', province: '', zipcode: '' },
              current_address_type: '',
              current_address: { number: '', moo: '', road: '', subdistrict: '', district: '', province: '', zipcode: '' },
              gender: '',
              military_status: '',
              ordination_status: ''
          },
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