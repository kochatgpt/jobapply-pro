import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Loader2, FileDown, Eye } from "lucide-react";
import CriminalCheckDocument from '@/components/application/pdf/CriminalCheckDocument';
import SignaturePad from '@/components/admin/SignaturePad';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

export default function CriminalCheckReviewModal({ applicant, isOpen, onClose }) {
    const queryClient = useQueryClient();
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [companyData, setCompanyData] = useState({
        companyLocation: applicant?.criminal_check_document?.company_data?.companyLocation || '',
        companyName: applicant?.criminal_check_document?.company_data?.companyName || '',
        companyAddress: applicant?.criminal_check_document?.company_data?.companyAddress || '',
        authorizedPerson: applicant?.criminal_check_document?.company_data?.authorizedPerson || '',
        authorizedId: applicant?.criminal_check_document?.company_data?.authorizedId || '',
        authIdIssuedBy: applicant?.criminal_check_document?.company_data?.authIdIssuedBy || '',
        authIdExpiry: applicant?.criminal_check_document?.company_data?.authIdExpiry || '',
        receiverSignature: applicant?.criminal_check_document?.company_data?.receiverSignature || '',
        witnessName1: applicant?.criminal_check_document?.company_data?.witnessName1 || '',
        witness1Signature: applicant?.criminal_check_document?.company_data?.witness1Signature || '',
        witnessName2: applicant?.criminal_check_document?.company_data?.witnessName2 || '',
        witness2Signature: applicant?.criminal_check_document?.company_data?.witness2Signature || ''
    });

    const { data: existingPdfDoc } = useQuery({
        queryKey: ['criminal_check_pdf', applicant?.id],
        queryFn: async () => {
            const docs = await base44.entities.PdfBase.filter({ 
                applicant_id: applicant.id, 
                pdf_type: 'Criminal-Check' 
            });
            return docs[0] || null;
        },
        enabled: !!applicant?.id
    });

    const employeeData = existingPdfDoc?.data || applicant.criminal_check_document?.employee_data || {};

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
            criminal_check_document: {
                ...applicant.criminal_check_document,
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

    if (!applicant) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl">ตรวจสอบและกรอกข้อมูลหนังสือมอบอำนาจฯ - {applicant.full_name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Admin Form */}
                    <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                        <h3 className="font-semibold text-lg">กรอกข้อมูลบริษัทและผู้รับมอบอำนาจ</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>ทำที่</Label>
                                <Input
                                    value={companyData.companyLocation}
                                    onChange={(e) => setCompanyData({ ...companyData, companyLocation: e.target.value })}
                                    placeholder="เช่น กรุงเทพมหานคร"
                                />
                            </div>
                            <div>
                                <Label>ชื่อบริษัท</Label>
                                <Input
                                    value={companyData.companyName}
                                    onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <Label>ที่อยู่บริษัท</Label>
                                <Input
                                    value={companyData.companyAddress}
                                    onChange={(e) => setCompanyData({ ...companyData, companyAddress: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <h4 className="font-medium mb-3">ผู้รับมอบอำนาจ</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label>ชื่อผู้รับมอบอำนาจ</Label>
                                    <Input
                                        value={companyData.authorizedPerson}
                                        onChange={(e) => setCompanyData({ ...companyData, authorizedPerson: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label>เลขบัตรประชาชน</Label>
                                    <Input
                                        value={companyData.authorizedId}
                                        onChange={(e) => setCompanyData({ ...companyData, authorizedId: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label>บัตรออกให้โดย</Label>
                                    <Input
                                        value={companyData.authIdIssuedBy}
                                        onChange={(e) => setCompanyData({ ...companyData, authIdIssuedBy: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label>บัตรหมดอายุ</Label>
                                    <Input
                                        type="date"
                                        value={companyData.authIdExpiry}
                                        onChange={(e) => setCompanyData({ ...companyData, authIdExpiry: e.target.value })}
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-4">
                                <Label>ลายเซ็นผู้รับมอบอำนาจ</Label>
                                <SignaturePad 
                                    signatureUrl={companyData.receiverSignature}
                                    onSave={(url) => setCompanyData({ ...companyData, receiverSignature: url })}
                                />
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <h4 className="font-medium mb-3">ข้อมูลพยาน</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label>ชื่อพยานคนที่ 1</Label>
                                    <Input
                                        value={companyData.witnessName1}
                                        onChange={(e) => setCompanyData({ ...companyData, witnessName1: e.target.value })}
                                    />
                                    <div className="mt-2">
                                        <Label>ลายเซ็นพยานคนที่ 1</Label>
                                        <SignaturePad 
                                            signatureUrl={companyData.witness1Signature}
                                            onSave={(url) => setCompanyData({ ...companyData, witness1Signature: url })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label>ชื่อพยานคนที่ 2</Label>
                                    <Input
                                        value={companyData.witnessName2}
                                        onChange={(e) => setCompanyData({ ...companyData, witnessName2: e.target.value })}
                                    />
                                    <div className="mt-2">
                                        <Label>ลายเซ็นพยานคนที่ 2</Label>
                                        <SignaturePad 
                                            signatureUrl={companyData.witness2Signature}
                                            onSave={(url) => setCompanyData({ ...companyData, witness2Signature: url })}
                                        />
                                    </div>
                                </div>
                            </div>
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
                            <CriminalCheckDocument 
                                applicant={{
                                    ...applicant,
                                    criminal_check_document: {
                                        ...applicant.criminal_check_document,
                                        company_data: companyData
                                    }
                                }}
                                formData={employeeData}
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