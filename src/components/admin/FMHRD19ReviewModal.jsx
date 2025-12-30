import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, FileDown, Eye } from "lucide-react";
import FMH19Document from '@/components/application/pdf/FMH19Document';
import SignaturePad from '@/components/admin/SignaturePad';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

export default function FMHRD19ReviewModal({ applicant, isOpen, onClose }) {
    const queryClient = useQueryClient();
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [companyData, setCompanyData] = useState({
        witnessName1: applicant?.fmhrd19_document?.company_data?.witnessName1 || '',
        witness1Signature: applicant?.fmhrd19_document?.company_data?.witness1Signature || '',
        witnessName2: applicant?.fmhrd19_document?.company_data?.witnessName2 || '',
        witness2Signature: applicant?.fmhrd19_document?.company_data?.witness2Signature || ''
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
            fmhrd19_document: {
                ...applicant.fmhrd19_document,
                status: 'completed',
                company_data: companyData,
                completed_date: new Date().toISOString()
            }
        };
        updateMutation.mutate(updatedData);
    };

    const handleGeneratePDF = async (action) => {
        const page = document.querySelector('.pdpa-page');
        if (!page) return;

        setGeneratingPdf(true);
        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();

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

    if (!applicant) return null;

    const employeeData = applicant.fmhrd19_document?.employee_data || {};

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl">ตรวจสอบและกรอกข้อมูลพยาน FM-HRD-19 - {applicant.full_name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Admin Form */}
                    <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                        <h3 className="font-semibold text-lg">กรอกข้อมูลพยาน</h3>
                        
                        <div>
                            <Label>ชื่อพยานคนที่ 1</Label>
                            <Input
                                value={companyData.witnessName1}
                                onChange={(e) => setCompanyData({ ...companyData, witnessName1: e.target.value })}
                                placeholder="ชื่อ-สกุล พยานคนที่ 1"
                            />
                        </div>

                        <div>
                            <Label>ลายเซ็นพยานคนที่ 1</Label>
                            <SignaturePad 
                                signatureUrl={companyData.witness1Signature}
                                onSave={(url) => setCompanyData({ ...companyData, witness1Signature: url })}
                                onDelete={() => setCompanyData({ ...companyData, witness1Signature: '' })}
                            />
                        </div>

                        <div>
                            <Label>ชื่อพยานคนที่ 2</Label>
                            <Input
                                value={companyData.witnessName2}
                                onChange={(e) => setCompanyData({ ...companyData, witnessName2: e.target.value })}
                                placeholder="ชื่อ-สกุล พยานคนที่ 2"
                            />
                        </div>

                        <div>
                            <Label>ลายเซ็นพยานคนที่ 2</Label>
                            <SignaturePad 
                                signatureUrl={companyData.witness2Signature}
                                onSave={(url) => setCompanyData({ ...companyData, witness2Signature: url })}
                                onDelete={() => setCompanyData({ ...companyData, witness2Signature: '' })}
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
                            <FMH19Document 
                                applicant={applicant}
                                signatureUrl={employeeData.signatureUrl}
                                signatureDate={employeeData.signatureDate}
                                formData={employeeData}
                                witness1Signature={companyData.witness1Signature}
                                witness2Signature={companyData.witness2Signature}
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