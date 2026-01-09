import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Eye, Download, Loader2 } from 'lucide-react';
import EmploymentContractDocument from '@/components/application/pdf/EmploymentContractDocument';
import { numberToThai } from '@/components/utils/numberToThai';

export default function EmploymentContractReviewModal({ applicant, isOpen, onClose }) {
    const [formData, setFormData] = useState({
        contractDate: '',
        houseNumber: '',
        moo: '',
        soi: '',
        road: '',
        subdistrict: '',
        district: '',
        province: '',
        zipcode: '',
        startDate: '',
        endDate: '',
        workStartDate: '',
        position: '',
        department: '',
        division: '',
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
        checkAccountName: '',
        probationDays: ''
    });

    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    // Fetch existing document data
    const { data: existingDoc } = useQuery({
        queryKey: ['employment_contract_doc', applicant?.id],
        queryFn: async () => {
            if (!applicant?.id) return null;
            const docs = await base44.entities.PdfBase.filter({
                applicant_id: applicant.id,
                pdf_type: 'Employment-Contract'
            });
            return docs[0] || null;
        },
        enabled: !!applicant?.id
    });

    useEffect(() => {
        if (existingDoc?.data) {
            setFormData(existingDoc.data);
        }
    }, [existingDoc]);

    const saveMutation = useMutation({
        mutationFn: async (data) => {
            if (existingDoc) {
                return await base44.entities.PdfBase.update(existingDoc.id, data);
            } else {
                return await base44.entities.PdfBase.create(data);
            }
        },
        onSuccess: () => {
            toast.success('บันทึกข้อมูลเรียบร้อยแล้ว');
        },
        onError: () => {
            toast.error('เกิดข้อผิดพลาดในการบันทึก');
        }
    });

    const handleSave = () => {
        const pdfData = {
            applicant_id: applicant.id,
            pdf_type: 'Employment-Contract',
            data: formData,
            status: 'submitted',
            submitted_date: new Date().toISOString()
        };
        saveMutation.mutate(pdfData);
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
            toast.error('เกิดข้อผิดพลาดในการสร้าง PDF');
        } finally {
            setGeneratingPdf(false);
        }
    };

    if (!applicant) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>สัญญาจ้างงาน - {applicant.full_name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Form Section */}
                    <Card>
                        <CardHeader className="bg-slate-50">
                            <CardTitle className="text-lg">กรอกข้อมูลสัญญาจ้างงาน</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">วันที่ทำสัญญา</label>
                                    <Input
                                        type="date"
                                        value={formData.contractDate}
                                        onChange={(e) => setFormData({ ...formData, contractDate: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">ตำแหน่ง</label>
                                    <Input
                                        value={formData.position}
                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">หน่วยงาน</label>
                                    <Input
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">แผนก/ฝ่าย</label>
                                    <Input
                                        value={formData.division}
                                        onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">วันที่เริ่มโครงการ</label>
                                    <Input
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">วันที่สิ้นสุด</label>
                                    <Input
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">วันที่เริ่มงาน</label>
                                    <Input
                                        type="date"
                                        value={formData.workStartDate}
                                        onChange={(e) => setFormData({ ...formData, workStartDate: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">ระยะทดลองงาน (วัน)</label>
                                    <Input
                                        value={formData.probationDays}
                                        onChange={(e) => setFormData({ ...formData, probationDays: e.target.value })}
                                        placeholder="เช่น 120"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">เวลาเข้างาน</label>
                                    <Input
                                        type="time"
                                        value={formData.workTimeStart}
                                        onChange={(e) => setFormData({ ...formData, workTimeStart: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">เวลาออกงาน</label>
                                    <Input
                                        type="time"
                                        value={formData.workTimeEnd}
                                        onChange={(e) => setFormData({ ...formData, workTimeEnd: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">ค่าจ้างรายวัน</label>
                                    <Input
                                        value={formData.dailyRate}
                                        onChange={(e) => setFormData({ ...formData, dailyRate: e.target.value, dailyRateText: numberToThai(e.target.value) })}
                                        placeholder="เช่น 300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">ค่าจ้างรายเดือน</label>
                                    <Input
                                        value={formData.monthlyRate}
                                        onChange={(e) => setFormData({ ...formData, monthlyRate: e.target.value, monthlyRateText: numberToThai(e.target.value) })}
                                        placeholder="เช่น 15000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">ธนาคาร</label>
                                    <Input
                                        value={formData.bankName}
                                        onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">เลขบัญชี</label>
                                    <Input
                                        value={formData.accountNumber}
                                        onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">ชื่อบัญชี</label>
                                    <Input
                                        value={formData.accountName}
                                        onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Preview Section */}
                    {showPreview && (
                        <Card>
                            <CardHeader className="bg-slate-50">
                                <CardTitle className="text-lg">ตัวอย่างเอกสาร</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="overflow-auto max-h-[400px] bg-slate-100 p-4 flex justify-center">
                                    <div id="contract-preview">
                                        <EmploymentContractDocument
                                            applicant={applicant}
                                            formData={formData}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Hidden div for PDF generation */}
                    <div className="hidden">
                        <div id="employment-contract-content">
                            <EmploymentContractDocument
                                applicant={applicant}
                                formData={formData}
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex gap-2 justify-end">
                    <Button
                        variant="outline"
                        onClick={() => setShowPreview(!showPreview)}
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        {showPreview ? 'ซ่อน' : 'ดู'}ตัวอย่าง
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => handleGeneratePDF('preview')}
                        disabled={generatingPdf}
                    >
                        {generatingPdf ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Eye className="w-4 h-4 mr-2" />}
                        Preview PDF
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => handleGeneratePDF('download')}
                        disabled={generatingPdf}
                    >
                        {generatingPdf ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                        ดาวน์โหลด PDF
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={saveMutation.isPending}
                        className="bg-indigo-600 hover:bg-indigo-700"
                    >
                        {saveMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                        บันทึก
                    </Button>
                    <Button
                        variant="outline"
                        onClick={onClose}
                    >
                        ปิด
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}