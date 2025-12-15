import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

import AgreementStep from '@/components/application/AgreementStep';
import PhotoStep from '@/components/application/PhotoStep';
import DataFormWizard from '@/components/application/DataFormWizard';
import VideoInterviewStep from '@/components/application/VideoInterviewStep';

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
        family_data: { marital_status: '', has_children: 'no' },
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