import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown, Eye, Loader2, ArrowLeft } from "lucide-react";
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
    const [witness1Signature, setWitness1Signature] = useState('');
    const [witness2Signature, setWitness2Signature] = useState('');
    const [formData, setFormData] = useState({
        day: '',
        month: '',
        year: '',
        position: '',
        department: '',
        witnessName1: '',
        witnessName2: ''
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

    useEffect(() => {
        if (applicant) {
            setSignatureUrl(applicant.signature_url || '');
            setSignatureDate(applicant.signature_date || new Date().toISOString().split('T')[0]);
        }
    }, [applicant]);

    const updateApplicantMutation = useMutation({
        mutationFn: (data) => base44.entities.Applicant.update(applicantId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user_applicant', applicantId] });
        }
    });

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

    const handleSaveSignature = () => {
        if (signatureUrl && signatureDate) {
            updateApplicantMutation.mutate({
                signature_url: signatureUrl,
                signature_date: signatureDate
            });
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
                            กรอกข้อมูลและลงนาม
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
                            onClick={() => handleGeneratePDF('download')}
                            disabled={generatingPdf}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {generatingPdf ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileDown className="w-4 h-4 mr-2" />}
                            ดาวน์โหลด PDF
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
                                    witness1Signature={witness1Signature}
                                    witness2Signature={witness2Signature}
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
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">วันที่</label>
                                        <input
                                            type="text"
                                            value={formData.day}
                                            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="วันที่"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">เดือน</label>
                                        <input
                                            type="text"
                                            value={formData.month}
                                            onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="เดือน"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">พ.ศ.</label>
                                        <input
                                            type="text"
                                            value={formData.year}
                                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="พ.ศ."
                                        />
                                    </div>
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

                                <div className="border-t pt-4">
                                    <h3 className="font-semibold text-slate-800 mb-4">ข้อมูลพยาน</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">ชื่อพยานคนที่ 1</label>
                                            <input
                                                type="text"
                                                value={formData.witnessName1}
                                                onChange={(e) => setFormData({ ...formData, witnessName1: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                                                placeholder="ชื่อ-สกุล พยานคนที่ 1"
                                            />
                                            <label className="block text-sm font-medium text-slate-700 mb-2">ลายเซ็นพยานคนที่ 1</label>
                                            <SignaturePad 
                                                signatureUrl={witness1Signature}
                                                onSave={(url) => setWitness1Signature(url)}
                                                onDelete={() => setWitness1Signature('')}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">ชื่อพยานคนที่ 2</label>
                                            <input
                                                type="text"
                                                value={formData.witnessName2}
                                                onChange={(e) => setFormData({ ...formData, witnessName2: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                                                placeholder="ชื่อ-สกุล พยานคนที่ 2"
                                            />
                                            <label className="block text-sm font-medium text-slate-700 mb-2">ลายเซ็นพยานคนที่ 2</label>
                                            <SignaturePad 
                                                signatureUrl={witness2Signature}
                                                onSave={(url) => setWitness2Signature(url)}
                                                onDelete={() => setWitness2Signature('')}
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
                                        onClick={() => setShowForm(false)}
                                        className="bg-indigo-600 hover:bg-indigo-700"
                                    >
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