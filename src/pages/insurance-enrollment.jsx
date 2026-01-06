import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, Loader2, Send } from "lucide-react";
import InsuranceEnrollmentDocument from '@/components/application/pdf/InsuranceEnrollmentDocument';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

export default function InsuranceEnrollmentPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [applicantId, setApplicantId] = useState(null);
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        employerName: '',
        beneficiaries: [
            { name: '', relationship: '' },
            { name: '', relationship: '' }
        ],
        signatureDate: '',
        signatureUrl: '',
        maritalStatus: '',
        dateOfBirth: '',
        employmentDate: ''
    });

    useEffect(() => {
        const id = localStorage.getItem('user_applicant_id');
        if (!id) {
            navigate('/user-login');
        } else {
            setApplicantId(id);
        }
    }, [navigate]);

    const { data: applicant } = useQuery({
        queryKey: ['user_applicant', applicantId],
        queryFn: async () => {
            const applicants = await base44.entities.Applicant.list();
            return applicants.find(a => a.id === applicantId);
        },
        enabled: !!applicantId
    });

    const submitMutation = useMutation({
        mutationFn: async (data) => {
            return await base44.entities.Applicant.update(applicantId, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['user_applicant', applicantId]);
            toast.success('ส่งเอกสารเรียบร้อยแล้ว');
            navigate('/user-dashboard');
        },
        onError: () => {
            toast.error('เกิดข้อผิดพลาดในการส่งเอกสาร');
        }
    });

    const handleGeneratePDF = async (action) => {
        const pages = document.querySelectorAll('.pdpa-page');
        if (!pages || pages.length === 0) return;

        setGeneratingPdf(true);
        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();

            for (let i = 0; i < pages.length; i++) {
                const page = pages[i];
                const canvas = await html2canvas(page, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    windowWidth: 1200
                });

                const imgData = canvas.toDataURL('image/png');
                const imgWidth = pdfWidth;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                if (i > 0) {
                    pdf.addPage();
                }
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            }

            if (action === 'download') {
                pdf.save(`InsuranceEnrollment_${applicant?.full_name || 'Document'}.pdf`);
            } else {
                window.open(pdf.output('bloburl'), '_blank');
            }
        } catch (error) {
            console.error("PDF Generation failed", error);
            alert("เกิดข้อผิดพลาดในการสร้าง PDF");
        } finally {
            setGeneratingPdf(false);
        }
    };

    const handleSubmit = () => {
        const insuranceData = {
            insurance_enrollment_document: {
                status: 'submitted',
                form_data: formData,
                submitted_date: new Date().toISOString()
            }
        };
        submitMutation.mutate(insuranceData);
    };

    if (!applicant) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-slate-400">กำลังโหลด...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <Button 
                        variant="outline" 
                        onClick={() => navigate('/user-dashboard')}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        กลับ
                    </Button>
                    <div className="flex gap-2">
                        <Button 
                            onClick={() => setShowForm(true)}
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            กรอกเอกสาร
                        </Button>
                        <Button 
                            variant="outline"
                            onClick={() => handleGeneratePDF('preview')}
                            disabled={generatingPdf}
                        >
                            {generatingPdf ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Eye className="w-4 h-4 mr-2" />}
                            Preview
                        </Button>
                        <Button 
                            onClick={handleSubmit}
                            disabled={submitMutation.isPending}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {submitMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                            ส่งเอกสาร
                        </Button>
                    </div>
                </div>

                {/* Document Preview Card */}
                <Card className="shadow-xl">
                    <CardHeader className="border-b bg-slate-50">
                        <CardTitle>ใบสมัครขอเอาประกันภัยพนักงาน</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-auto max-h-[800px] bg-slate-100 p-8 flex justify-center">
                            <div id="insurance-content">
                                <InsuranceEnrollmentDocument 
                                    applicant={applicant}
                                    formData={formData}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <CardHeader className="border-b bg-slate-50">
                                <CardTitle>กรอกข้อมูล</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">นามนายจ้าง (ชื่อบริษัท)</label>
                                        <input
                                            type="text"
                                            value={formData.employerName}
                                            onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                            placeholder="เช่น บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-slate-800 mb-3">ผู้รับประโยชน์</h3>
                                        {formData.beneficiaries.map((ben, idx) => (
                                            <div key={idx} className="grid grid-cols-2 gap-3 mb-3">
                                                <div>
                                                    <label className="block text-sm text-slate-600 mb-1">ชื่อผู้รับประโยชน์ {idx + 1}</label>
                                                    <input
                                                        type="text"
                                                        value={ben.name}
                                                        onChange={(e) => {
                                                            const newBeneficiaries = [...formData.beneficiaries];
                                                            newBeneficiaries[idx].name = e.target.value;
                                                            setFormData({ ...formData, beneficiaries: newBeneficiaries });
                                                        }}
                                                        className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                                        placeholder="ชื่อ-นามสกุล"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-slate-600 mb-1">ความสัมพันธ์</label>
                                                    <input
                                                        type="text"
                                                        value={ben.relationship}
                                                        onChange={(e) => {
                                                            const newBeneficiaries = [...formData.beneficiaries];
                                                            newBeneficiaries[idx].relationship = e.target.value;
                                                            setFormData({ ...formData, beneficiaries: newBeneficiaries });
                                                        }}
                                                        className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                                        placeholder="เช่น บิดา, มารดา, คู่สมรส"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">สถานภาพ</label>
                                            <select
                                                value={formData.maritalStatus}
                                                onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                            >
                                                <option value="">เลือก</option>
                                                <option value="single">โสด</option>
                                                <option value="married">สมรส</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">วันเดือนปีเกิด</label>
                                            <input
                                                type="date"
                                                value={formData.dateOfBirth}
                                                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">วันที่เริ่มทำงาน</label>
                                            <input
                                                type="date"
                                                value={formData.employmentDate}
                                                onChange={(e) => setFormData({ ...formData, employmentDate: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">วันที่ลงนาม</label>
                                            <input
                                                type="date"
                                                value={formData.signatureDate}
                                                onChange={(e) => setFormData({ ...formData, signatureDate: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 pt-4">
                                    <Button 
                                        variant="outline"
                                        onClick={() => setShowForm(false)}
                                    >
                                        ปิด
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}