import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown, Eye, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import PDPADocument from '@/components/application/pdf/PDPADocument';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function PDPAForm() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [applicantId, setApplicantId] = useState(null);
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [signatureUrl, setSignatureUrl] = useState('');
    const [signatureDate, setSignatureDate] = useState('');

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

    // Set signature from applicant data if available
    useEffect(() => {
        if (applicant) {
            setSignatureUrl(applicant.signature_url || '');
            setSignatureDate(applicant.signature_date || new Date().toLocaleDateString('th-TH'));
        }
    }, [applicant]);

    const updateApplicantMutation = useMutation({
        mutationFn: (data) => base44.entities.Applicant.update(applicantId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user_applicant', applicantId] });
        }
    });

    const handleGeneratePDF = async (action) => {
        const input = document.getElementById('pdpa-printable-content');
        if (!input) return;

        setGeneratingPdf(true);
        try {
            const canvas = await html2canvas(input, {
                scale: 2,
                useCORS: true,
                logging: false,
                windowWidth: 1200
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            if (action === 'download') {
                pdf.save(`PDPA_${applicant?.full_name || 'Document'}.pdf`);
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
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            {generatingPdf ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileDown className="w-4 h-4 mr-2" />}
                            ดาวน์โหลด PDF
                        </Button>
                    </div>
                </div>

                {/* Document Preview Card */}
                <Card className="shadow-xl">
                    <CardHeader className="border-b bg-slate-50">
                        <CardTitle>เอกสาร PDPA</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-auto max-h-[800px] bg-slate-100 p-8 flex justify-center">
                            <div id="pdpa-printable-content">
                                <PDPADocument 
                                    applicant={applicant}
                                    signatureUrl={signatureUrl}
                                    signatureDate={signatureDate}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Instructions */}
                <Card>
                    <CardContent className="p-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-800">
                                <strong>คำแนะนำ:</strong> กรุณาตรวจสอบข้อมูลในเอกสารให้ถูกต้อง จากนั้นดาวน์โหลด PDF เพื่อพิมพ์และลงนามจริง
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}