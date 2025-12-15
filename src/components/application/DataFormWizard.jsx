import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { base44 } from '@/api/base44Client';
import FormStep1 from './steps/FormStep1';
import FormStep2 from './steps/FormStep2';
import FormStep3 from './steps/FormStep3';
import FormStep4 from './steps/FormStep4';

export default function DataFormWizard({ onComplete, globalData, setGlobalData }) {
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
                family_data: globalData.family_data,
                education_data: globalData.education_data,
                skills_data: globalData.skills_data,
                training_data: globalData.training_data,
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
        <div className="max-w-5xl mx-auto py-10 px-4">
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
                    {step === 2 && <FormStep2 
                        data={globalData.education_data} 
                        familyData={globalData.family_data} 
                        skillsData={globalData.skills_data}
                        trainingData={globalData.training_data}
                        updateData={updateData} 
                    />}
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
}