import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown, Eye, Loader2, ArrowLeft, Send } from "lucide-react";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import FMH19Document from '@/components/application/pdf/FMH19Document';
import SignaturePad from '@/components/admin/SignaturePad';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function FMHRD19Form() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [applicantId, setApplicantId] = useState(null);
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [signatureUrl, setSignatureUrl] = useState('');
    const [signatureDate, setSignatureDate] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        documentDate: '',
        position: '',
        department: '',
        startDate: '',
        trainingStartDate: '',
        trainingEndDate: ''
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

    const { data: fmhrd19Doc } = useQuery({
        queryKey: ['fmhrd19_pdf', applicantId],
        queryFn: async () => {
            const docs = await base44.entities.PdfBase.filter({ applicant_id: applicantId, pdf_type: 'FM-HRD-19' });
            return docs[0] || null;
        },
        enabled: !!applicantId
    });

    useEffect(() => {
        if (fmhrd19Doc && fmhrd19Doc.data) {
            setSignatureUrl(fmhrd19Doc.data.employee_signature_url || '');
            setSignatureDate(fmhrd19Doc.data.employee_signature_date || new Date().toISOString().split('T')[0]);
            setFormData({
                documentDate: fmhrd19Doc.data.document_date || '',
                position: fmhrd19Doc.data.position || '',
                department: fmhrd19Doc.data.department || '',
                startDate: fmhrd19Doc.data.start_date || '',
                trainingStartDate: fmhrd19Doc.data.training_start_date || '',
                trainingEndDate: fmhrd19Doc.data.training_end_date || ''
            });
        } else if (applicant) {
            setSignatureUrl(applicant.signature_url || '');
            setSignatureDate(applicant.signature_date || new Date().toISOString().split('T')[0]);
        }
    }, [fmhrd19Doc, applicant]);

    const saveDocumentMutation = useMutation({
        mutationFn: async (pdfData) => {
            if (fmhrd19Doc) {
                return await base44.entities.PdfBase.update(fmhrd19Doc.id, pdfData);
            } else {
                return await base44.entities.PdfBase.create(pdfData);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fmhrd19_pdf', applicantId] });
            toast.success('บันทึกข้อมูลเรียบร้อยแล้ว');
        }
    });

    const submitMutation = useMutation({
        mutationFn: async () => {
            const pdfData = {
                applicant_id: applicantId,
                pdf_type: 'FM-HRD-19',
                data: {
                    document_date: formData.documentDate,
                    position: formData.position,
                    department: formData.department,
                    start_date: formData.startDate,
                    training_start_date: formData.trainingStartDate,
                    training_end_date: formData.trainingEndDate,
                    employee_signature_url: signatureUrl,
                    employee_signature_date: signatureDate
                },
                status: 'submitted',
                submitted_date: new Date().toISOString()
            };

            if (fmhrd19Doc) {
                return await base44.entities.PdfBase.update(fmhrd19Doc.id, pdfData);
            } else {
                return await base44.entities.PdfBase.create(pdfData);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fmhrd19_pdf', applicantId] });
            toast.success('ส่งเอกสารเรียบร้อยแล้ว');
            navigate('/user-dashboard');
        },
        onError: () => {
            toast.error('เกิดข้อผิดพลาดในการส่งเอกสาร');
        }
    });

    const handleSubmit = () => {
        submitMutation.mutate();
    };

    const handleGeneratePDF = async (action) => {
        const page = document.querySelector('.pdpa-page');
        if (!page) return;

        setGeneratingPdf(true);
        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const canvas = await html2canvas(page, {
                scale: 2,
                useCORS: true,
                logging: false,
                windowWidth: 1200
            });

            const imgData = canvas.toDataURL('image/png');
            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            if (action === 'download') {
                pdf.save(`FM-HRD-19_${applicant?.full_name || 'Document'}.pdf`);
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
                        <CardTitle>เอกสาร FM-HRD-19</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-auto max-h-[800px] bg-slate-100 p-8 flex justify-center">
                            <div id="fmhrd19-printable-content">
                                <FMH19Document 
                                    applicant={applicant}
                                    signatureUrl={signatureUrl}
                                    signatureDate={signatureDate}
                                    formData={formData}
                                    witness1Signature={fmhrd19Doc?.data?.company_data?.witness_signature_1 || ''}
                                    witness2Signature={fmhrd19Doc?.data?.company_data?.witness_signature_2 || ''}
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
                                <CardTitle>กรอกข้อมูลและลงนาม</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">วันที่</label>
                                    <input
                                        type="date"
                                        value={formData.documentDate}
                                        onChange={(e) => setFormData({ ...formData, documentDate: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">ตำแหน่ง</label>
                                        <input
                                            type="text"
                                            value={formData.position}
                                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="ตำแหน่งที่สมัคร"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">แผนก</label>
                                        <input
                                            type="text"
                                            value={formData.department}
                                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="แผนกที่สังกัด"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">วันที่เริ่มปฏิบัติงาน</label>
                                    <input
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">วันที่เริ่มฝึกอบรม</label>
                                    <input
                                        type="date"
                                        value={formData.trainingStartDate}
                                        onChange={(e) => setFormData({ ...formData, trainingStartDate: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">วันที่สิ้นสุดฝึกอบรม</label>
                                    <input
                                        type="date"
                                        value={formData.trainingEndDate}
                                        onChange={(e) => setFormData({ ...formData, trainingEndDate: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="border-t pt-4">
                                    <h3 className="font-semibold text-slate-800 mb-4">ลายเซ็น</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">ลายเซ็นผู้ยินยอม</label>
                                            <SignaturePad 
                                                signatureUrl={signatureUrl}
                                                onSave={(url) => setSignatureUrl(url)}
                                                onDelete={() => setSignatureUrl('')}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">วันที่ลงนาม</label>
                                            <input
                                                type="date"
                                                value={signatureDate}
                                                onChange={(e) => setSignatureDate(e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 pt-4">
                                    <Button 
                                        variant="outline"
                                        onClick={() => setShowForm(false)}
                                    >
                                        ยกเลิก
                                    </Button>
                                    <Button 
                                        onClick={() => {
                                            saveDocumentMutation.mutate({
                                                applicant_id: applicantId,
                                                pdf_type: 'FM-HRD-19',
                                                data: {
                                                    document_date: formData.documentDate,
                                                    position: formData.position,
                                                    department: formData.department,
                                                    start_date: formData.startDate,
                                                    training_start_date: formData.trainingStartDate,
                                                    training_end_date: formData.trainingEndDate,
                                                    employee_signature_url: signatureUrl,
                                                    employee_signature_date: signatureDate
                                                },
                                                status: fmhrd19Doc?.status || 'draft'
                                            });
                                            setShowForm(false);
                                        }}
                                        disabled={saveDocumentMutation.isPending}
                                        className="bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        {saveDocumentMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
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