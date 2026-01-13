import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Eye, Loader2, FileDown } from "lucide-react";
import InsuranceEnrollmentDocument from '@/components/application/pdf/InsuranceEnrollmentDocument';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

export default function InsuranceEnrollmentReviewModal({ applicant, pdfDoc, isOpen, onClose }) {
    const queryClient = useQueryClient();
    const [generatingPdf, setGeneratingPdf] = useState(false);

    const { data: insuranceData } = useQuery({
        queryKey: ['insurance_enrollment_detail', pdfDoc?.id],
        queryFn: async () => {
            if (!pdfDoc?.id) return null;
            const doc = await base44.entities.PdfBase.read(pdfDoc.id);
            return doc;
        },
        enabled: !!pdfDoc?.id && isOpen
    });

    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await base44.entities.PdfBase.update(pdfDoc.id, {
                status: data.status,
                approved_date: data.approved_date
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['insurance_documents']);
            toast.success('อัปเดตสถานะเรียบร้อยแล้ว');
            onClose();
        },
        onError: () => {
            toast.error('เกิดข้อผิดพลาดในการอัปเดต');
        }
    });

    const handleGeneratePDF = async (action) => {
        const pages = document.querySelectorAll('.insurance-enrollment-review-page');
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
            toast.error("เกิดข้อผิดพลาดในการสร้าง PDF");
        } finally {
            setGeneratingPdf(false);
        }
    };

    const handleApprove = () => {
        updateMutation.mutate({
            status: 'approved',
            approved_date: new Date().toISOString()
        });
    };

    if (!applicant) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl">ใบสมัครขอเอาประกันภัยพนักงาน - {applicant.full_name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Document Preview */}
                    <div className="bg-slate-100 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">ตัวอย่างเอกสาร</h3>
                            <div className="flex gap-2">
                                <Button 
                                    variant="outline"
                                    onClick={() => handleGeneratePDF('preview')}
                                    disabled={generatingPdf}
                                    size="sm"
                                >
                                    {generatingPdf ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Eye className="w-4 h-4 mr-2" />}
                                    Preview
                                </Button>
                                <Button 
                                    onClick={() => handleGeneratePDF('download')}
                                    disabled={generatingPdf}
                                    size="sm"
                                >
                                    {generatingPdf ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileDown className="w-4 h-4 mr-2" />}
                                    ดาวน์โหลด
                                </Button>
                            </div>
                        </div>
                        
                        <div className="max-h-[600px] overflow-auto bg-white p-4 flex justify-center">
                            <div className="insurance-enrollment-review-page">
                                <InsuranceEnrollmentDocument 
                                    applicant={applicant}
                                    formData={insuranceData?.data || {}}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            ยกเลิก
                        </Button>
                        <Button 
                            onClick={handleApprove}
                            disabled={updateMutation.isPending || insuranceData?.status === 'approved'}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                            บันทึกและอนุมัติเอกสาร
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}