import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown, Eye, Loader2, ArrowLeft, Send } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import NDADocument from '@/components/application/pdf/NDADocument';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

export default function FMHRD27Page() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [applicantId, setApplicantId] = useState(null);
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        contractDate: '',
        employeeSignDate: '',
        currentAddress: {
            number: '',
            moo: '',
            soi: '',
            road: '',
            subdistrict: '',
            district: '',
            province: '',
            zipcode: ''
        }
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

    const { data: existingPdfDoc } = useQuery({
        queryKey: ['nda_pdf', applicantId],
        queryFn: async () => {
            const docs = await base44.entities.PdfBase.filter({ 
                applicant_id: applicantId, 
                pdf_type: 'NDA' 
            });
            return docs[0] || null;
        },
        enabled: !!applicantId
    });

    useEffect(() => {
        if (existingPdfDoc?.data) {
            setFormData(existingPdfDoc.data);
        }
    }, [existingPdfDoc]);

    const saveMutation = useMutation({
        mutationFn: async (data) => {
            if (existingPdfDoc) {
                return await base44.entities.PdfBase.update(existingPdfDoc.id, data);
            } else {
                return await base44.entities.PdfBase.create(data);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['nda_pdf', applicantId]);
            toast.success('บันทึกข้อมูลเรียบร้อยแล้ว');
            setShowForm(false);
        },
        onError: () => {
            toast.error('เกิดข้อผิดพลาดในการบันทึก');
        }
    });

    const submitMutation = useMutation({
        mutationFn: async (data) => {
            if (existingPdfDoc) {
                return await base44.entities.PdfBase.update(existingPdfDoc.id, data);
            } else {
                return await base44.entities.PdfBase.create(data);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['nda_pdf', applicantId]);
            queryClient.invalidateQueries(['user_applicant', applicantId]);
            toast.success('ส่งเอกสารเรียบร้อยแล้ว');
            navigate('/user-dashboard');
        },
        onError: () => {
            toast.error('เกิดข้อผิดพลาดในการส่งเอกสาร');
        }
    });

    const handleSave = () => {
        const pdfData = {
            applicant_id: applicantId,
            pdf_type: 'NDA',
            data: formData,
            status: 'draft'
        };
        saveMutation.mutate(pdfData);
    };

    const handleSubmit = () => {
        const pdfData = {
            applicant_id: applicantId,
            pdf_type: 'NDA',
            data: formData,
            status: 'submitted',
            submitted_date: new Date().toISOString()
        };
        submitMutation.mutate(pdfData);
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
                pdf.save(`FM-HRD-27_NDA_${applicant?.full_name || 'Document'}.pdf`);
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
                        <CardTitle>FM-HRD-27: สัญญา NDA</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-auto max-h-[800px] bg-slate-100 p-8 flex justify-center">
                            <div id="nda-content">
                                <NDADocument 
                                    applicant={applicant}
                                    formData={formData}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                        <Card className="w-full max-w-md my-8">
                            <CardHeader className="border-b bg-slate-50">
                                <CardTitle>กรอกข้อมูลสัญญา NDA</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">วันที่ทำสัญญา</label>
                                    <input
                                        type="date"
                                        value={formData.contractDate}
                                        onChange={(e) => setFormData({ ...formData, contractDate: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">วันที่ลงนาม (พนักงาน)</label>
                                    <input
                                        type="date"
                                        value={formData.employeeSignDate}
                                        onChange={(e) => setFormData({ ...formData, employeeSignDate: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                    />
                                </div>

                                <div className="border-t pt-4 mt-4">
                                    <h3 className="text-sm font-semibold text-slate-700 mb-3">ที่อยู่ปัจจุบัน (ถ้าต่างจากที่อยู่ที่กรอกไว้)</h3>
                                    
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs text-slate-600 mb-1">บ้านเลขที่</label>
                                            <input
                                                type="text"
                                                value={formData.currentAddress.number}
                                                onChange={(e) => setFormData({ 
                                                    ...formData, 
                                                    currentAddress: { ...formData.currentAddress, number: e.target.value }
                                                })}
                                                className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-slate-600 mb-1">หมู่</label>
                                            <input
                                                type="text"
                                                value={formData.currentAddress.moo}
                                                onChange={(e) => setFormData({ 
                                                    ...formData, 
                                                    currentAddress: { ...formData.currentAddress, moo: e.target.value }
                                                })}
                                                className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-slate-600 mb-1">ซอย</label>
                                            <input
                                                type="text"
                                                value={formData.currentAddress.soi}
                                                onChange={(e) => setFormData({ 
                                                    ...formData, 
                                                    currentAddress: { ...formData.currentAddress, soi: e.target.value }
                                                })}
                                                className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-slate-600 mb-1">ถนน</label>
                                            <input
                                                type="text"
                                                value={formData.currentAddress.road}
                                                onChange={(e) => setFormData({ 
                                                    ...formData, 
                                                    currentAddress: { ...formData.currentAddress, road: e.target.value }
                                                })}
                                                className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-slate-600 mb-1">ตำบล/แขวง</label>
                                            <input
                                                type="text"
                                                value={formData.currentAddress.subdistrict}
                                                onChange={(e) => setFormData({ 
                                                    ...formData, 
                                                    currentAddress: { ...formData.currentAddress, subdistrict: e.target.value }
                                                })}
                                                className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-slate-600 mb-1">อำเภอ/เขต</label>
                                            <input
                                                type="text"
                                                value={formData.currentAddress.district}
                                                onChange={(e) => setFormData({ 
                                                    ...formData, 
                                                    currentAddress: { ...formData.currentAddress, district: e.target.value }
                                                })}
                                                className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-slate-600 mb-1">จังหวัด</label>
                                            <input
                                                type="text"
                                                value={formData.currentAddress.province}
                                                onChange={(e) => setFormData({ 
                                                    ...formData, 
                                                    currentAddress: { ...formData.currentAddress, province: e.target.value }
                                                })}
                                                className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-slate-600 mb-1">รหัสไปรษณีย์</label>
                                            <input
                                                type="text"
                                                value={formData.currentAddress.zipcode}
                                                onChange={(e) => setFormData({ 
                                                    ...formData, 
                                                    currentAddress: { ...formData.currentAddress, zipcode: e.target.value }
                                                })}
                                                className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm"
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
                                    <Button 
                                        onClick={handleSave}
                                        disabled={saveMutation.isPending}
                                        className="bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        {saveMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                        บันทึก
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