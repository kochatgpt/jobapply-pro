import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown, Eye, Loader2, ArrowLeft, Send } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import CriminalCheckDocument from '@/components/application/pdf/CriminalCheckDocument';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

export default function CriminalCheckFormPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [applicantId, setApplicantId] = useState(null);
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        companyLocation: '',
        poaDate: '',
        idIssuedBy: '',
        idExpiry: '',
        companyName: '',
        authorizedPerson: '',
        authorizedId: '',
        authIdIssuedBy: '',
        authIdExpiry: '',
        effectiveDate: '',
        consentDate: '',
        houseNumber: '',
        moo: '',
        soi: '',
        road: '',
        subdistrict: '',
        district: '',
        province: '',
        companyAddress: '',
        purpose: ''
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

    const handleSubmit = () => {
        const criminalCheckData = {
            criminal_check_document: {
                status: 'submitted',
                employee_data: formData,
                submitted_date: new Date().toISOString()
            }
        };
        submitMutation.mutate(criminalCheckData);
    };

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
                pdf.save(`CriminalCheck_${applicant?.full_name || 'Document'}.pdf`);
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
                        <CardTitle>หนังสือมอบอำนาจและหนังสือยินยอมตรวจประวัติอาชญากรรม</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-auto max-h-[800px] bg-slate-100 p-8 flex justify-center">
                            <div id="criminal-check-content">
                                <CriminalCheckDocument 
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
                        <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                            <CardHeader className="border-b bg-slate-50">
                                <CardTitle>กรอกข้อมูลหนังสือมอบอำนาจและยินยอม</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-slate-800">ข้อมูลทั่วไป</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">ทำที่</label>
                                            <input
                                                type="text"
                                                value={formData.companyLocation}
                                                onChange={(e) => setFormData({ ...formData, companyLocation: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                                placeholder="เช่น กรุงเทพมหานคร"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">วันที่ (มอบอำนาจ)</label>
                                            <input
                                                type="date"
                                                value={formData.poaDate}
                                                onChange={(e) => setFormData({ ...formData, poaDate: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">วันที่ (ยินยอม)</label>
                                            <input
                                                type="date"
                                                value={formData.consentDate}
                                                onChange={(e) => setFormData({ ...formData, consentDate: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">บัตรออกให้โดย</label>
                                            <input
                                                type="text"
                                                value={formData.idIssuedBy}
                                                onChange={(e) => setFormData({ ...formData, idIssuedBy: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                                placeholder="เช่น สำนักทะเบียน..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">บัตรหมดอายุ</label>
                                            <input
                                                type="date"
                                                value={formData.idExpiry}
                                                onChange={(e) => setFormData({ ...formData, idExpiry: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">วันที่มีผล</label>
                                            <input
                                                type="date"
                                                value={formData.effectiveDate}
                                                onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 border-t pt-4">
                                    <h3 className="font-semibold text-slate-800">ข้อมูลบริษัท</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">ชื่อบริษัท</label>
                                            <input
                                                type="text"
                                                value={formData.companyName}
                                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">ที่อยู่บริษัท</label>
                                            <textarea
                                                value={formData.companyAddress}
                                                onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                                rows={2}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">วัตถุประสงค์</label>
                                            <input
                                                type="text"
                                                value={formData.purpose}
                                                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                                placeholder="เช่น เพื่อพิจารณารับเข้าทำงาน"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 border-t pt-4">
                                    <h3 className="font-semibold text-slate-800">ที่อยู่ปัจจุบัน (ถ้าต่างจากที่กรอกไว้)</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">บ้านเลขที่</label>
                                            <input
                                                type="text"
                                                value={formData.houseNumber}
                                                onChange={(e) => setFormData({ ...formData, houseNumber: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">หมู่</label>
                                            <input
                                                type="text"
                                                value={formData.moo}
                                                onChange={(e) => setFormData({ ...formData, moo: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">ซอย</label>
                                            <input
                                                type="text"
                                                value={formData.soi}
                                                onChange={(e) => setFormData({ ...formData, soi: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">ถนน</label>
                                            <input
                                                type="text"
                                                value={formData.road}
                                                onChange={(e) => setFormData({ ...formData, road: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">ตำบล/แขวง</label>
                                            <input
                                                type="text"
                                                value={formData.subdistrict}
                                                onChange={(e) => setFormData({ ...formData, subdistrict: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">อำเภอ/เขต</label>
                                            <input
                                                type="text"
                                                value={formData.district}
                                                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">จังหวัด</label>
                                            <input
                                                type="text"
                                                value={formData.province}
                                                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
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