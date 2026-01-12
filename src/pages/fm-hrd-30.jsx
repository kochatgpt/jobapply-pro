import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, Loader2, Send } from "lucide-react";
import FMHRD30Document from '@/components/application/pdf/FMHRD30Document';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

export default function FMHRD30Page() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [applicantId, setApplicantId] = useState(null);
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        employeeId: '',
        position: '',
        signaturePosition: '',
        criminalCheckDate: '',
        consentLetterDate: '',
        signatureDate: '',
        proclamationDate: ''
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
        queryKey: ['fm_hrd_30_pdf', applicantId],
        queryFn: async () => {
            const docs = await base44.entities.PdfBase.filter({ 
                applicant_id: applicantId, 
                pdf_type: 'FM-HRD-30' 
            });
            return docs[0] || null;
        },
        enabled: !!applicantId
    });

    const saveMutation = useMutation({
        mutationFn: async (data) => {
            if (existingPdfDoc) {
                return await base44.entities.PdfBase.update(existingPdfDoc.id, data);
            } else {
                return await base44.entities.PdfBase.create(data);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['fm_hrd_30_pdf', applicantId]);
            toast.success('บันทึกข้อมูลเรียบร้อยแล้ว');
            setShowForm(false);
        },
        onError: () => {
            toast.error('เกิดข้อผิดพลาดในการบันทึก');
        }
    });

    const handleSave = () => {
        const pdfData = {
            applicant_id: applicantId,
            pdf_type: 'FM-HRD-30',
            data: formData,
            status: 'draft'
        };
        saveMutation.mutate(pdfData);
    };

    useEffect(() => {
        if (existingPdfDoc?.data) {
            setFormData(existingPdfDoc.data);
        }
    }, [existingPdfDoc]);

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
                pdf.save(`FMHRD30_${applicant?.full_name || 'Document'}.pdf`);
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

    const handleAcknowledge = async () => {
        try {
            await base44.entities.Applicant.update(applicant.id, {
                fmhrd30_document: {
                    acknowledged: true,
                    acknowledged_date: new Date().toISOString()
                }
            });
            
            queryClient.invalidateQueries(['user_applicant', applicantId]);
            toast.success('รับทราบเรียบร้อยแล้ว');
            navigate('/user-dashboard');
        } catch (error) {
            console.error('Error acknowledging document:', error);
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        }
    };

    if (!applicant) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-slate-400">กำลังโหลด...</div>
            </div>
        );
    }

    const isAcknowledged = applicant?.fmhrd30_document?.acknowledged;

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
                            onClick={handleAcknowledge}
                            disabled={isAcknowledged}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {isAcknowledged ? '✓ รับทราบแล้ว' : <><Send className="w-4 h-4 mr-2" />รับทราบ</>}
                        </Button>
                    </div>
                </div>

                {/* Document Preview Card */}
                <Card className="shadow-xl">
                    <CardHeader className="border-b bg-slate-50">
                        <CardTitle>การตรวจประวัติอาชญากรรม (FM-HRD-30)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-auto max-h-[800px] bg-slate-100 p-8 flex justify-center">
                            <div id="fmhrd30-content">
                                <FMHRD30Document applicant={applicant} formData={formData} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <CardHeader className="border-b bg-slate-50">
                            <CardTitle>กรอกข้อมูลส่วนพนักงาน</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-slate-800">ข้อมูลส่วนตัว</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">รหัสพนักงาน</label>
                                        <input
                                            type="text"
                                            value={formData.employeeId}
                                            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                            placeholder="รหัสพนักงาน"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">ตำแหน่ง</label>
                                        <input
                                            type="text"
                                            value={formData.position}
                                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                            placeholder="ตำแหน่งงาน"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">ตำแหน่ง (ที่ลายเซ็น)</label>
                                        <input
                                            type="text"
                                            value={formData.signaturePosition}
                                            onChange={(e) => setFormData({ ...formData, signaturePosition: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                            placeholder="ตำแหน่งที่ลายเซ็น"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 border-t pt-4">
                                <h3 className="font-semibold text-slate-800">วันที่เอกสาร</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">วันที่ประกาศ - การตรวจประวัติอาชญากรรม</label>
                                        <input
                                            type="date"
                                            value={formData.proclamationDate}
                                            onChange={(e) => setFormData({ ...formData, proclamationDate: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">วันที่ - หนังสือยินยอมให้หักเงิน</label>
                                        <input
                                            type="date"
                                            value={formData.consentLetterDate}
                                            onChange={(e) => setFormData({ ...formData, consentLetterDate: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">วันที่ - การตรวจประวัติอาชญากรรม</label>
                                        <input
                                            type="date"
                                            value={formData.criminalCheckDate}
                                            onChange={(e) => setFormData({ ...formData, criminalCheckDate: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 border-t pt-4">
                                <h3 className="font-semibold text-slate-800">วันที่ลายเซ็น (หนังสือยินยอม)</h3>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">วันที่</label>
                                    <input
                                        type="date"
                                        value={formData.signatureDate}
                                        onChange={(e) => setFormData({ ...formData, signatureDate: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                    />
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
            );
            }