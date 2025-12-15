import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Camera, Upload, UserCircle } from "lucide-react";
import { base44 } from '@/api/base44Client';

export default function PhotoStep({ onNext, setGlobalData }) {
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
}