import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, FileDown, Eye } from "lucide-react";
import SignaturePad from './SignaturePad';
import SPS902Document from '@/components/application/pdf/SPS902Document';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

export default function SPS902ReviewModal({ isOpen, onClose, applicant, pdfDoc }) {
    const queryClient = useQueryClient();
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [formData, setFormData] = useState({
        staffDecision: '',
        reasonLine1: '',
        reasonLine2: '',
        staffName: '',
        staffSignature: '',
        staffSignatureDate: ''
    });

    useEffect(() => {
        console.log('pdfDoc:', pdfDoc);
        console.log('pdfDoc?.data:', pdfDoc?.data);
        if (pdfDoc?.data) {
            const staffData = pdfDoc.data.staff_data || pdfDoc.data;
            console.log('staffData:', staffData);
            setFormData({
                staffDecision: staffData.staffDecision || '',
                reasonLine1: staffData.reasonLine1 || '',
                reasonLine2: staffData.reasonLine2 || '',
                staffName: staffData.staffName || '',
                staffSignature: staffData.staffSignature || '',
                staffSignatureDate: staffData.staffSignatureDate || ''
            });
        }
    }, [pdfDoc]);

    const saveMutation = useMutation({
        mutationFn: async (data) => {
            if (!pdfDoc) return null;
            const updatedData = {
                data: {
                    ...(pdfDoc.data || {}),
                    staff_data: data
                },
                status: 'approved',
                approved_date: new Date().toISOString()
            };
            return await base44.entities.PdfBase.update(pdfDoc.id, updatedData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sps_902_documents'] });
            toast.success('บันทึกข้อมูลเรียบร้อยแล้ว');
            onClose();
        },
        onError: () => {
            toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    });

    const handleSave = () => {
        if (!formData.staffDecision) {
            toast.error('กรุณาเลือกความเห็นเจ้าหน้าที่');
            return;
        }

        if (formData.staffDecision === 'disapprove' && !formData.reasonLine1) {
            toast.error('กรุณาระบุเหตุผลในการไม่เห็นสมควร');
            return;
        }

        if (!formData.staffSignatureDate) {
            toast.error('กรุณาระบุวันที่');
            return;
        }

        saveMutation.mutate(formData);
    };

    const handleGeneratePDF = async (action) => {
        const content = document.querySelector('#sps902-review-content');
        if (!content) return;

        setGeneratingPdf(true);
        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            
            const canvas = await html2canvas(content, {
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
                pdf.save(`SPS-9-02_${applicant?.full_name || 'Document'}.pdf`);
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

    const previewFormData = {
        ...(pdfDoc?.data || {}),
        ...formData
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl">ตรวจสอบและลงนามเอกสาร สปส. 9-02 - {applicant?.full_name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Admin Form */}
                    <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                        <h3 className="font-semibold text-lg">ส่วนสำหรับเจ้าหน้าที่</h3>
                        
                        {/* Staff Decision */}
                        <div className="space-y-2">
                            <Label className="font-semibold">ความเห็นเจ้าหน้าที่</Label>
                            <div className="space-y-2 ml-2">
                                <label className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="staffDecision"
                                        value="approve"
                                        checked={formData.staffDecision === 'approve'}
                                        onChange={(e) => setFormData({ ...formData, staffDecision: e.target.value })}
                                        className="w-4 h-4"
                                    />
                                    <span className="text-sm">เห็นสมควรจัดสถานพยาบาล</span>
                                </label>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="staffDecision"
                                        value="disapprove"
                                        checked={formData.staffDecision === 'disapprove'}
                                        onChange={(e) => setFormData({ ...formData, staffDecision: e.target.value })}
                                        className="w-4 h-4"
                                    />
                                    <span className="text-sm">ไม่เห็นสมควรจัดสถานพยาบาล ระบุเหตุผล</span>
                                </label>
                            </div>
                        </div>

                        {/* Reason Section */}
                        {formData.staffDecision === 'disapprove' && (
                            <div className="space-y-2 ml-6">
                                <Textarea
                                    value={formData.reasonLine1}
                                    onChange={(e) => setFormData({ ...formData, reasonLine1: e.target.value })}
                                    placeholder="ระบุเหตุผล"
                                    className="min-h-16"
                                />
                                <Textarea
                                    value={formData.reasonLine2}
                                    onChange={(e) => setFormData({ ...formData, reasonLine2: e.target.value })}
                                    placeholder="ระบุเหตุผล (ต่อ)"
                                    className="min-h-16"
                                />
                            </div>
                        )}

                        {/* Staff Name */}
                        <div className="space-y-2">
                            <Label className="font-semibold">ชื่อเจ้าหน้าที่</Label>
                            <Input
                                value={formData.staffName}
                                onChange={(e) => setFormData({ ...formData, staffName: e.target.value })}
                                placeholder="ชื่อ-สกุล"
                            />
                        </div>

                        {/* Signature Section */}
                        <div className="space-y-2">
                            <Label className="font-semibold">ลายเซ็นเจ้าหน้าที่</Label>
                            <SignaturePad
                                signatureUrl={formData.staffSignature}
                                onSave={(sig) => setFormData({ ...formData, staffSignature: sig })}
                                label="ลายเซ็นเจ้าหน้าที่"
                            />
                        </div>

                        {/* Date Section */}
                        <div className="space-y-2">
                            <Label className="font-semibold">วันที่ลงนาม</Label>
                            <Input
                                type="date"
                                value={formData.staffSignatureDate || ''}
                                onChange={(e) => setFormData({ ...formData, staffSignatureDate: e.target.value })}
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
                        
                        <div className="max-h-[600px] overflow-auto bg-white p-4 flex justify-center">
                            <div id="sps902-review-content">
                                <SPS902Document 
                                    applicant={applicant}
                                    formData={previewFormData}
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
                            onClick={handleSave}
                            disabled={saveMutation.isPending}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {saveMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                            บันทึกและอนุมัติเอกสาร
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}