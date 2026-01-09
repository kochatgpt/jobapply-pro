import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Loader2, FileDown, Eye } from "lucide-react";
import EmploymentContractDocument from '@/components/application/pdf/EmploymentContractDocument';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';
import { numberToThai } from '@/components/utils/numberToThai';

export default function EmploymentContractReviewModal({ applicant, isOpen, onClose }) {
    const queryClient = useQueryClient();
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [formData, setFormData] = useState({
        contractDate: '',
        position: '',
        department: '',
        division: '',
        startDate: '',
        endDate: '',
        workStartDate: '',
        probationDays: '',
        workTimeStart: '',
        workTimeEnd: '',
        workTimeAlt1: '',
        workTimeAlt2: '',
        dailyRate: '',
        dailyRateText: '',
        monthlyRate: '',
        monthlyRateText: '',
        bankName: '',
        accountNumber: '',
        accountName: '',
        checkAccountName: ''
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
        if (pdfDoc?.data) {
            setFormData(pdfDoc.data);
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
            data: formData,
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
                    {/* Admin Form */}
                    <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                        <h3 className="font-semibold text-lg">กรอกข้อมูลสัญญาจ้างงาน</h3>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>วันที่ทำสัญญา</Label>
                                <Input
                                    type="date"
                                    value={formData.contractDate}
                                    onChange={(e) => setFormData({ ...formData, contractDate: e.target.value })}
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
                                <Label>หน่วยงาน</Label>
                                <Input
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label>แผนก/ฝ่าย</Label>
                                <Input
                                    value={formData.division}
                                    onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label>วันที่เริ่มโครงการ</Label>
                                <Input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label>วันที่สิ้นสุด</Label>
                                <Input
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label>วันที่เริ่มงาน</Label>
                                <Input
                                    type="date"
                                    value={formData.workStartDate}
                                    onChange={(e) => setFormData({ ...formData, workStartDate: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label>ระยะทดลองงาน (วัน)</Label>
                                <Input
                                    value={formData.probationDays}
                                    onChange={(e) => setFormData({ ...formData, probationDays: e.target.value })}
                                    placeholder="เช่น 120"
                                />
                            </div>
                            <div>
                                <Label>เวลาเข้างาน</Label>
                                <Input
                                    type="time"
                                    value={formData.workTimeStart}
                                    onChange={(e) => setFormData({ ...formData, workTimeStart: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label>เวลาออกงาน</Label>
                                <Input
                                    type="time"
                                    value={formData.workTimeEnd}
                                    onChange={(e) => setFormData({ ...formData, workTimeEnd: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label>เวลาเข้างาน (ทางเลือก)</Label>
                                <Input
                                    type="time"
                                    value={formData.workTimeAlt1}
                                    onChange={(e) => setFormData({ ...formData, workTimeAlt1: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label>เวลาออกงาน (ทางเลือก)</Label>
                                <Input
                                    type="time"
                                    value={formData.workTimeAlt2}
                                    onChange={(e) => setFormData({ ...formData, workTimeAlt2: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label>ค่าจ้างรายวัน</Label>
                                <Input
                                    value={formData.dailyRate}
                                    onChange={(e) => setFormData({ ...formData, dailyRate: e.target.value, dailyRateText: numberToThai(e.target.value) })}
                                    placeholder="เช่น 300"
                                />
                            </div>
                            <div>
                                <Label>ค่าจ้างรายเดือน</Label>
                                <Input
                                    value={formData.monthlyRate}
                                    onChange={(e) => setFormData({ ...formData, monthlyRate: e.target.value, monthlyRateText: numberToThai(e.target.value) })}
                                    placeholder="เช่น 15000"
                                />
                            </div>
                            <div>
                                <Label>ธนาคาร</Label>
                                <Input
                                    value={formData.bankName}
                                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label>เลขบัญชี</Label>
                                <Input
                                    value={formData.accountNumber}
                                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label>ชื่อบัญชี</Label>
                                <Input
                                    value={formData.accountName}
                                    onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label>ชื่อบัญชี (สำหรับเช็ค)</Label>
                                <Input
                                    value={formData.checkAccountName}
                                    onChange={(e) => setFormData({ ...formData, checkAccountName: e.target.value })}
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
                            <EmploymentContractDocument 
                                applicant={applicant}
                                formData={formData}
                            />
                        </div>
                    </div>

                    {/* Hidden div for PDF generation */}
                    <div className="hidden">
                        <div id="employment-contract-content">
                            <EmploymentContractDocument
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