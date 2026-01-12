import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Loader2, FileDown, Eye, Trash2 } from "lucide-react";
import NDADocument from '@/components/application/pdf/NDADocument';
import SignaturePad from '@/components/admin/SignaturePad';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

export default function NDAReviewModal({ applicant, isOpen, onClose }) {
    const queryClient = useQueryClient();
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const signaturePadRef = useRef(null);
    const [companyData, setCompanyData] = useState({
        signerName: applicant?.nda_document?.company_data?.signerName || '',
        companySignature: applicant?.nda_document?.company_data?.companySignature || '',
        companySignDate: applicant?.nda_document?.company_data?.companySignDate || ''
    });

    const { data: pdfBaseDoc } = useQuery({
        queryKey: ['nda_pdf_base', applicant?.id],
        queryFn: async () => {
            const docs = await base44.entities.PdfBase.filter({ 
                applicant_id: applicant.id, 
                pdf_type: 'NDA' 
            });
            return docs[0] || null;
        },
        enabled: !!applicant?.id
    });

    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await base44.entities.Applicant.update(applicant.id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['applicants']);
            toast.success('บันทึกข้อมูลเรียบร้อยแล้ว');
            onClose();
        },
        onError: () => {
            toast.error('เกิดข้อผิดพลาดในการบันทึก');
        }
    });

    const handleSave = () => {
        const updatedData = {
            nda_document: {
                ...applicant.nda_document,
                status: 'completed',
                company_data: companyData,
                completed_date: new Date().toISOString()
            }
        };
        updateMutation.mutate(updatedData);
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

    if (!applicant) return null;

    const mergedFormData = {
        ...pdfBaseDoc?.data,
        ...applicant.nda_document?.data,
        ...applicant.nda_document?.employee_data,
        ...companyData
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl">ตรวจสอบและเซ็นเอกสาร NDA - {applicant.full_name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Admin Form */}
                    <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                        <h3 className="font-semibold text-lg">กรอกข้อมูลบริษัท</h3>
                        
                        <div>
                            <Label>ชื่อกรรมการผู้มีอำนาจลงนาม</Label>
                            <Input
                                value={companyData.signerName}
                                onChange={(e) => setCompanyData({ ...companyData, signerName: e.target.value })}
                                placeholder="ระบุชื่อกรรมการ"
                            />
                        </div>

                        <div>
                            <Label>ลายเซ็นกรรมการ</Label>
                            <SignaturePad 
                                signatureUrl={companyData.companySignature}
                                onSave={(signature) => {
                                    setCompanyData({ ...companyData, companySignature: signature });
                                }}
                                label="ลายเซ็นกรรมการผู้มีอำนาจลงนาม"
                            />
                        </div>

                        <div>
                            <Label>วันที่ลงนาม (บริษัท)</Label>
                            <Input
                                type="date"
                                value={companyData.companySignDate}
                                onChange={(e) => setCompanyData({ ...companyData, companySignDate: e.target.value })}
                            />
                        </div>
                    </div>

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
                        
                        <div className="max-h-[500px] overflow-auto bg-white p-4">
                            <NDADocument 
                                applicant={{
                                    ...applicant,
                                    nda_document: {
                                        ...applicant.nda_document,
                                        company_data: companyData
                                    }
                                }}
                                formData={mergedFormData}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            ยกเลิก
                        </Button>
                        <Button 
                            onClick={handleSave}
                            disabled={updateMutation.isPending}
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