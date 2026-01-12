import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Loader2, FileDown, Eye } from "lucide-react";
import FMHRD30Document from '@/components/application/pdf/FMHRD30Document';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

export default function FMHRD30ReviewModal({ applicant, isOpen, onClose }) {
    const queryClient = useQueryClient();
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [formData, setFormData] = useState({
        criminalCheckDate: '',
        consentLetterDate: '',
        employeeId: '',
        position: '',
        signaturePosition: '',
        signatureDate: ''
    });

    const { data: pdfBaseDoc } = useQuery({
        queryKey: ['fmhrd30_pdf_base', applicant?.id],
        queryFn: async () => {
            const docs = await base44.entities.PdfBase.filter({ 
                applicant_id: applicant.id, 
                pdf_type: 'FM-HRD-30' 
            });
            return docs[0] || null;
        },
        enabled: !!applicant?.id
    });

    useEffect(() => {
        if (pdfBaseDoc?.data) {
            setFormData(pdfBaseDoc.data);
        }
    }, [pdfBaseDoc]);

    const updateMutation = useMutation({
        mutationFn: async (data) => {
            if (pdfBaseDoc) {
                await base44.entities.PdfBase.update(pdfBaseDoc.id, data);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['fmhrd30_pdf_base', applicant?.id]);
            toast.success('บันทึกข้อมูลเรียบร้อยแล้ว');
            onClose();
        },
        onError: (error) => {
            console.error('Save error:', error);
            toast.error('เกิดข้อผิดพลาดในการบันทึก');
        }
    });

    const handleSave = () => {
        const pdfData = {
            status: 'approved',
            data: formData,
            approved_date: new Date().toISOString()
        };
        updateMutation.mutate(pdfData);
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
                pdf.save(`FM-HRD-30_${applicant?.full_name || 'Document'}.pdf`);
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
                    <DialogTitle className="text-xl">ตรวจสอบเอกสาร FM-HRD-30 - {applicant.full_name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Admin Form */}
                    <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                        <h3 className="font-semibold text-lg">กรอกข้อมูลเอกสาร FM-HRD-30</h3>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>วันที่ขึ้นต้นประกาศการตรวจประวัติอาชญากรรม</Label>
                                <Input
                                    type="date"
                                    value={formData.criminalCheckDate}
                                    onChange={(e) => setFormData({ ...formData, criminalCheckDate: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label>วันที่หนังสือยินยอมให้หักเงินเดือน</Label>
                                <Input
                                    type="date"
                                    value={formData.consentLetterDate}
                                    onChange={(e) => setFormData({ ...formData, consentLetterDate: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label>รหัสพนักงาน</Label>
                                <Input
                                    value={formData.employeeId}
                                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label>ตำแหน่ง</Label>
                                <Input
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label>ตำแหน่งลายเซ็น</Label>
                                <Input
                                    value={formData.signaturePosition}
                                    onChange={(e) => setFormData({ ...formData, signaturePosition: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label>วันที่ลายเซ็น</Label>
                                <Input
                                    type="date"
                                    value={formData.signatureDate}
                                    onChange={(e) => setFormData({ ...formData, signatureDate: e.target.value })}
                                />
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
                            <FMHRD30Document 
                                applicant={applicant}
                                formData={formData}
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