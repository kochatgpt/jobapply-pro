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
    // Get local date string in YYYY-MM-DD format
    const getLocalDate = () => {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [globalData, setGlobalData] = useState({
        photo_url: '',
        personal_data: { 
            application_date: getLocalDate(),
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
        family_data: { 
                marital_status: '', 
                has_children: 'no',
                spouse_name: '',
                spouse_occupation: '',
                spouse_workplace: '',
                spouse_phone: '',
                children_count: '',
                children_caretaker: ''
            },
        referral_data: {
            referred_by: '',
            referred_by_relationship: '',
            acquaintance_name: '',
            acquaintance_relationship: ''
        },
        parents_data: {
            father: {
                name: '',
                status: 'alive',
                age: '',
                nationality: '',
                occupation: '',
                phone: '',
                address: { number: '', moo: '', road: '', subdistrict: '', district: '', province: '', zipcode: '' }
            },
            mother: {
                name: '',
                status: 'alive',
                age: '',
                nationality: '',
                occupation: '',
                phone: '',
                address: { number: '', moo: '', road: '', subdistrict: '', district: '', province: '', zipcode: '' }
            },
            siblings_count: '',
            birth_order: ''
        },
        education_data: { 
            history: {
                primary: { level: 'ประถมศึกษา', institute: '', major: '', start_year: '', end_year: '', gpa: '' },
                secondary: { level: 'มัธยมศึกษา', institute: '', major: '', start_year: '', end_year: '', gpa: '' },
                vocational: { level: 'ปวช.', institute: '', major: '', start_year: '', end_year: '', gpa: '' },
                diploma: { level: 'ปวส.', institute: '', major: '', start_year: '', end_year: '', gpa: '' },
                bachelor: { level: 'ปริญญาตรี', institute: '', major: '', start_year: '', end_year: '', gpa: '' },
                master: { level: 'ปริญญาโท', institute: '', major: '', start_year: '', end_year: '', gpa: '' },
                doctoral: { level: 'ปริญญาเอก', institute: '', major: '', start_year: '', end_year: '', gpa: '' },
                current: { level: 'กำลังศึกษา', institute: '', major: '', start_year: '', end_year: '', gpa: '' }
            }
        },
        skills_data: {
            languages: {
                thai: '',
                english: '',
                chinese: '',
                other_name: '',
                other_level: ''
            },
            office: {
                typewriter_thai: false,
                typewriter_eng: false,
                calculator: false,
                fax_copier: false,
                computer: false
            },
            driving: {
                motorcycle: false,
                car: false,
                truck: false,
                other_name: '',
                other_check: false
            },
            computer_capability: ''
        },
        training_data: {
            history: [
                { course: '', institute: '', duration: '' },
                { course: '', institute: '', duration: '' },
                { course: '', institute: '', duration: '' },
                { course: '', institute: '', duration: '' }
            ]
        },
        health_data: { diseases: '', smoking: '', alcohol: '', family_history: '' },
        experience_data: { last_company: '', position: '', years: '', motto: '' },
        emergency_contacts: [{ name: '', relationship: '', address: '', phone: '', position: '' }],
        attitude: '',
        signature_url: '',
        signature_date: getLocalDate(),
        start_work_date: getLocalDate()
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