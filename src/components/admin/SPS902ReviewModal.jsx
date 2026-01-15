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

export default function SPS902ReviewModal({ isOpen, onClose, applicant, pdfData }) {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        staffDecision: '',
        reasonLine1: '',
        reasonLine2: '',
        staffName: '',
        staffSignature: '',
        staffSignatureDate: ''
    });

    useEffect(() => {
        if (pdfData?.data) {
            setFormData(prev => ({
                ...prev,
                staffDecision: pdfData.data.staffDecision || '',
                reasonLine1: pdfData.data.reasonLine1 || '',
                reasonLine2: pdfData.data.reasonLine2 || '',
                staffName: pdfData.data.staffName || '',
                staffSignature: pdfData.data.staffSignature || '',
                staffSignatureDate: pdfData.data.staffSignatureDate || ''
            }));
        }
    }, [pdfData]);

    const saveMutation = useMutation({
        mutationFn: async (data) => {
            const mergedData = { ...pdfData.data, ...data };
            return await base44.entities.PdfBase.update(pdfData.id, { data: mergedData });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sps_pdf_data'] });
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

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>ตรวจสอบและลงนามเอกสาร สปส. 9-02 - {applicant?.full_name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
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
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <Input
                                    type="number"
                                    min="1"
                                    max="31"
                                    placeholder="วัน"
                                    value={formData.staffSignatureDate ? new Date(formData.staffSignatureDate).getDate() : ''}
                                    onChange={(e) => {
                                        const date = new Date(formData.staffSignatureDate || new Date());
                                        date.setDate(parseInt(e.target.value) || 1);
                                        setFormData({ ...formData, staffSignatureDate: date.toISOString().split('T')[0] });
                                    }}
                                />
                            </div>
                            <div>
                                <select
                                    value={formData.staffSignatureDate ? new Date(formData.staffSignatureDate).getMonth() : ''}
                                    onChange={(e) => {
                                        const date = new Date(formData.staffSignatureDate || new Date());
                                        date.setMonth(parseInt(e.target.value) || 0);
                                        setFormData({ ...formData, staffSignatureDate: date.toISOString().split('T')[0] });
                                    }}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                                >
                                    <option value="">-- เลือก --</option>
                                    {['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 
                                      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'].map((m, i) => (
                                        <option key={i} value={i}>{m}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Input
                                    type="number"
                                    min="2500"
                                    max="2700"
                                    placeholder="ปี พ.ศ."
                                    value={formData.staffSignatureDate ? new Date(formData.staffSignatureDate).getFullYear() + 543 : ''}
                                    onChange={(e) => {
                                        const buddhistYear = parseInt(e.target.value) || new Date().getFullYear() + 543;
                                        const date = new Date(formData.staffSignatureDate || new Date());
                                        date.setFullYear(buddhistYear - 543);
                                        setFormData({ ...formData, staffSignatureDate: date.toISOString().split('T')[0] });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>
                        ยกเลิก
                    </Button>
                    <Button 
                        onClick={handleSave}
                        disabled={saveMutation.isPending}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {saveMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                        บันทึก
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}