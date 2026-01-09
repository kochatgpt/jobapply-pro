import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Loader2, FileDown, Eye } from "lucide-react";
import EmploymentContractDocument from '@/components/application/pdf/EmploymentContractDocument';
import SignaturePad from '@/components/admin/SignaturePad';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

export default function EmploymentContractReviewModal({ applicant, isOpen, onClose }) {
    const queryClient = useQueryClient();
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [companyData, setCompanyData] = useState({
        authorizedPerson: '',
        authorizedPersonSignature: '',
        witnessName1: '',
        witness1Signature: '',
        witnessName2: '',
        witness2Signature: ''
    });

    const { data: pdfDoc } = useQuery({
        queryKey: ['employment_contract_pdf', applicant?.id],
        queryFn: async () => {
            const docs = await base44.entities.PdfBase.filter({ applicant_id: applicant.id, pdf_type: 'Employment-Contract' });
            return docs[0] || null;
        },
        enabled: !!applicant?.id && isOpen
    });

    useEffect(() => {
        if (pdfDoc?.data?.company_data) {
            setCompanyData({
                authorizedPerson: pdfDoc.data.company_data.authorizedPerson || '',
                authorizedPersonSignature: pdfDoc.data.company_data.authorizedPersonSignature || '',
                witnessName1: pdfDoc.data.company_data.witnessName1 || '',
                witness1Signature: pdfDoc.data.company_data.witness1Signature || '',
                witnessName2: pdfDoc.data.company_data.witnessName2 || '',
                witness2Signature: pdfDoc.data.company_data.witness2Signature || ''
            });
        }
    }, [pdfDoc]);

    const updateMutation = useMutation({
        mutationFn: async (data) => {
            if (pdfDoc) {
                return await base44.entities.PdfBase.update(pdfDoc.id, data);
            } else {
                return await base44.entities.PdfBase.create(data);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['employment_contract_documents']);
            queryClient.invalidateQueries(['employment_contract_pdf', applicant.id]);
            toast.success('บันทึกข้อมูลเรียบร้อยแล้ว');
            onClose();
        },
        onError: () => {
            toast.error('เกิดข้อผิดพลาดในการบันทึก');
        }
    });

    const handleSave = () => {
        const updatedData = {
            applicant_id: applicant.id,
            pdf_type: 'Employment-Contract',
            data: {
                ...(pdfDoc?.data || {}),
                company_data: companyData
            },
            status: 'approved',
            approved_date: new Date().toISOString()
        };
        updateMutation.mutate(updatedData);
    };

    const handleGeneratePDF = async (action) => {
        const pages = document.querySelectorAll('.employment-contract-page');
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
                pdf.save(`EmploymentContract_${applicant?.full_name || 'Document'}.pdf`);
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
                    <DialogTitle className="text-xl">ตรวจสอบและกรอกข้อมูลสัญญาจ้างงาน - {applicant.full_name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Admin Form - Witnesses Only */}
                    <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                        <h3 className="font-semibold text-lg">ลายเซ็นบริษัทฯและพยาน</h3>
                        
                        <div>
                            <Label>กรรมการผู้มีอำนาจลงนามแทน (บริษัทฯ)</Label>
                            <Input
                                value={companyData.authorizedPerson}
                                onChange={(e) => setCompanyData({ ...companyData, authorizedPerson: e.target.value })}
                                placeholder="ชื่อ-สกุล กรรมการผู้มีอำนาจ"
                            />
                        </div>

                        <div>
                            <Label>ลายเซ็นกรรมการผู้มีอำนาจลงนามแทน (บริษัทฯ)</Label>
                            <SignaturePad 
                                signatureUrl={companyData.authorizedPersonSignature}
                                onSave={(url) => setCompanyData({ ...companyData, authorizedPersonSignature: url })}
                                onDelete={() => setCompanyData({ ...companyData, authorizedPersonSignature: '' })}
                            />
                        </div>

                        <div className="border-t pt-4">
                            <h4 className="font-medium mb-3">ข้อมูลพยาน</h4>
                        </div>

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

                        <div className="border-t pt-4">
                            <h4 className="font-medium mb-3">พยานคนที่ 2</h4>
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
                            <EmploymentContractDocument 
                                applicant={applicant}
                                formData={pdfDoc?.data || {}}
                                companyData={companyData}
                            />
                        </div>
                    </div>

                    {/* Hidden div for PDF generation */}
                    <div className="hidden">
                        <div id="employment-contract-content">
                            <EmploymentContractDocument
                                applicant={applicant}
                                formData={pdfDoc?.data || {}}
                                companyData={companyData}
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