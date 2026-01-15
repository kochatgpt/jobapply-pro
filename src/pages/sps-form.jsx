import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, Loader2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SPS103Document from '@/components/application/pdf/SPS103Document';
import SPS902Document from '@/components/application/pdf/SPS902Document';
import SignaturePad from '@/components/admin/SignaturePad';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

export default function SPSFormPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [applicantId, setApplicantId] = useState(null);
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        // For SPS 1-03
        employerName: '',
        accountNumber: '',
        branchOrder: '',
        employmentType: '',
        previousEmployer: '',
        previousEmployerId: '',
        lastWorkDate: '',
        newEmployer: '',
        newEmployerId: '',
        salary: '',
        signatureDate: '',
        
        // For SPS 1-03 - Foreigner section
        hasPassport: false,
        passportNumber: '',
        workPermitNumber: '',
        otherDocumentType: '',
        otherDocumentNumber: '',
        otherWorkPermitNumber: '',
        
        // For SPS 1-03 - Hospital selection
        hospitalChoice1: '',
        hospitalChoice2: '',
        
        // For SPS 1-03 - Children birth years
        childBirthYear1: '',
        childBirthYear2: '',
        childBirthYear3: '',
        
        // For SPS 9-02
        receiptNumber: '',
        receiptDate: '',
        receiptTime: '',
        receivedBy: '',
        educationLevel: '',
        educationMajor: '',
        showSection33: true,
        showSection39: true,

        // For SPS 9-02 - Section 39
        section39AccountNumber: '',
        section39BranchNumber: '',

        // For SPS 9-02 - Hospital Selection
        hospitalSelection: '',
        changeReason: '',
        changeReasonDetail: '',
        otherReason: '',
        selectHospital: '',
        hospital1: '',
        hospital1Code: '',
        hospital2: '',
        hospital2Code: '',
        hospital3: '',
        hospital3Code: '',
        disabledPerson: '',
        declarationSignatureDate: '',
        declarationSignature: '',
        staffDecision: '',
        staffSignatureDate: '',
        staffSignature: '',
        reasonLine1: ''
        });

    useEffect(() => {
        const id = localStorage.getItem('user_applicant_id');
        if (!id) {
            navigate('/user-login');
        } else {
            setApplicantId(id);
        }
    }, [navigate]);

    const { data: applicant } = useQuery({
        queryKey: ['user_applicant', applicantId],
        queryFn: async () => {
            const applicants = await base44.entities.Applicant.list();
            return applicants.find(a => a.id === applicantId);
        },
        enabled: !!applicantId
    });

    // Get SPS type from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const spsTypeFromUrl = urlParams.get('type') || '1-03';

    const { data: pdfData } = useQuery({
        queryKey: ['sps_pdf_data', applicantId, spsTypeFromUrl],
        queryFn: async () => {
            const pdfs = await base44.entities.PdfBase.list();
            return pdfs.find(p => p.applicant_id === applicantId && p.pdf_type === `SPS-${spsTypeFromUrl}`);
        },
        enabled: !!applicantId
    });

    // Load saved form data into form on component mount or when pdf data changes
    useEffect(() => {
        if (pdfData?.data) {
            setFormData(prevData => ({
                ...prevData,
                ...pdfData.data
            }));
        }
    }, [pdfData]);

    const saveMutation = useMutation({
        mutationFn: async (data) => {
            const pdfType = `SPS-${spsTypeFromUrl}`;
            
            if (pdfData?.id) {
                // Update existing record
                return await base44.entities.PdfBase.update(pdfData.id, { data });
            } else {
                // Create new record
                return await base44.entities.PdfBase.create({
                    applicant_id: applicantId,
                    pdf_type: pdfType,
                    data,
                    status: 'draft'
                });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sps_pdf_data', applicantId, spsTypeFromUrl] });
            setShowForm(false);
            toast.success('บันทึกข้อมูลเรียบร้อยแล้ว');
        },
        onError: () => {
            toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    });

    const submitMutation = useMutation({
        mutationFn: async (data) => {
            return await base44.entities.PdfBase.update(data.pdf_data, { 
                status: 'submitted',
                submitted_date: data.submitted_date
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sps_pdf_data', applicantId, spsTypeFromUrl] });
            toast.success('ส่งเอกสารเรียบร้อยแล้ว');
            navigate('/user-dashboard');
        },
        onError: () => {
            toast.error('เกิดข้อผิดพลาดในการส่งเอกสาร');
        }
    });

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
                pdf.save(`SPS_${spsTypeFromUrl}_${applicant?.full_name || 'Document'}.pdf`);
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

    const handleSubmit = () => {
        if (pdfData?.id) {
            submitMutation.mutate({
                pdf_data: pdfData.id,
                pdf_status: 'submitted',
                submitted_date: new Date().toISOString()
            });
        }
    };

    if (!applicant) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-slate-400">กำลังโหลด...</div>
            </div>
        );
    }

    const spsType = spsTypeFromUrl;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <Button 
                        variant="outline" 
                        onClick={() => navigate('/user-dashboard')}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        กลับ
                    </Button>
                    <div className="flex gap-2">
                        <Button 
                            onClick={() => setShowForm(true)}
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            กรอกเอกสาร
                        </Button>
                        <Button 
                            variant="outline"
                            onClick={() => handleGeneratePDF('preview')}
                            disabled={generatingPdf}
                        >
                            {generatingPdf ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Eye className="w-4 h-4 mr-2" />}
                            Preview
                        </Button>
                        <Button 
                            onClick={handleSubmit}
                            disabled={submitMutation.isPending}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {submitMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                            ส่งเอกสาร
                        </Button>
                    </div>
                </div>

                {/* Document Preview Card */}
                <Card className="shadow-xl">
                    <CardHeader className="border-b bg-slate-50">
                        <CardTitle>แบบฟอร์ม สปส. {spsType}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-auto max-h-[800px] bg-slate-100 p-8 flex justify-center">
                            <div id="sps-content">
                                {spsType === '1-03' ? (
                                    <SPS103Document 
                                        applicant={applicant}
                                        formData={formData}
                                    />
                                ) : (
                                    <SPS902Document 
                                        applicant={applicant}
                                        formData={formData}
                                    />
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <CardHeader className="border-b bg-slate-50">
                                <CardTitle>กรอกข้อมูล สปส. {spsType}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                {spsType === '1-03' ? (
                                    // Form for SPS 1-03
                                    <div className="space-y-4">
                                        <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                                            <p className="text-sm font-medium">แบบฟอร์มแจ้งการเปลี่ยนแปลงประกันสังคม (สปส. 1-03)</p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-slate-800 mb-3">ข้อมูลนายจ้าง</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <Label>ชื่อสถานประกอบการ</Label>
                                                    <Input
                                                        value={formData.employerName}
                                                        onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                                                        placeholder="ชื่อบริษัท/ห้างร้าน"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>เลขที่บัญชี (10 หลัก)</Label>
                                                    <Input
                                                        value={formData.accountNumber}
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(/\D/g, '');
                                                            if (value.length <= 10) {
                                                                setFormData({ ...formData, accountNumber: value });
                                                            }
                                                        }}
                                                        placeholder="เลขที่บัญชี (10 หลัก)"
                                                        maxLength="10"
                                                    />
                                                    {formData.accountNumber && formData.accountNumber.length !== 10 && (
                                                        <p className="text-red-500 text-sm mt-1">ต้องเป็น 10 หลัก ({formData.accountNumber.length}/10)</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <Label>ลำดับที่สาขา</Label>
                                                    <Input
                                                        value={formData.branchOrder}
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(/\D/g, '');
                                                            if (value.length <= 5) {
                                                                setFormData({ ...formData, branchOrder: value });
                                                            }
                                                        }}
                                                        placeholder="ลำดับที่สาขา (5 หลัก)"
                                                        maxLength="5"
                                                    />
                                                    {formData.branchOrder && formData.branchOrder.length !== 5 && (
                                                        <p className="text-red-500 text-sm mt-1">ต้องเป็น 5 หลัก ({formData.branchOrder.length}/5)</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <Label>วันที่ผู้ประกันตนเข้าทำงาน</Label>
                                                    <Input
                                                        type="date"
                                                        value={formData.employmentStartDate || (applicant?.start_work_date ? new Date(applicant.start_work_date).toISOString().split('T')[0] : '')}
                                                        onChange={(e) => setFormData({ ...formData, employmentStartDate: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <Label>ประเภทการจ้าง</Label>
                                                    <select
                                                        value={formData.employmentType}
                                                        onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                                                        className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                                    >
                                                        <option value="">-- เลือก --</option>
                                                        <option value="daily">รายวัน</option>
                                                        <option value="monthly">รายเดือน</option>
                                                        <option value="other">อื่นๆ</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <Label>อัตราค่าจ้าง (บาท/เดือน)</Label>
                                            <Input
                                                value={formData.salary}
                                                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                                placeholder="เงินเดือน"
                                                type="number"
                                            />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-slate-800 mb-3">ลายเซ็นผู้ประกันตน</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <Label>วันที่ลงนาม</Label>
                                                    <Input
                                                        type="date"
                                                        value={formData.signatureDate}
                                                        onChange={(e) => setFormData({ ...formData, signatureDate: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t pt-4">
                                            <h3 className="font-semibold text-slate-800 mb-3">เกิดปี พ.ศ.</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <Label>เกิดปี พ.ศ. ที่ 1</Label>
                                                    <Input
                                                        value={formData.childBirthYear1}
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(/\D/g, '');
                                                            if (value.length <= 4) {
                                                                setFormData({ ...formData, childBirthYear1: value });
                                                            }
                                                        }}
                                                        placeholder="ปีพ.ศ. (4 หลัก)"
                                                        maxLength="4"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>เกิดปี พ.ศ. ที่ 2</Label>
                                                    <Input
                                                        value={formData.childBirthYear2}
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(/\D/g, '');
                                                            if (value.length <= 4) {
                                                                setFormData({ ...formData, childBirthYear2: value });
                                                            }
                                                        }}
                                                        placeholder="ปีพ.ศ. (4 หลัก)"
                                                        maxLength="4"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>เกิดปี พ.ศ. ที่ 3</Label>
                                                    <Input
                                                        value={formData.childBirthYear3}
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(/\D/g, '');
                                                            if (value.length <= 4) {
                                                                setFormData({ ...formData, childBirthYear3: value });
                                                            }
                                                        }}
                                                        placeholder="ปีพ.ศ. (4 หลัก)"
                                                        maxLength="4"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t pt-4">
                                            <h3 className="font-semibold text-slate-800 mb-3">ข้อมูลการเลือกสถานพยาบาล</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <Label>ขอเลือกสถานพยาบาลประกันสังคม</Label>
                                                    <Input
                                                        value={formData.hospitalChoice1}
                                                        onChange={(e) => setFormData({ ...formData, hospitalChoice1: e.target.value })}
                                                        placeholder="ลำดับที่ 1"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>ลำดับที่ 2 ชื่อ</Label>
                                                    <Input
                                                        value={formData.hospitalChoice2}
                                                        onChange={(e) => setFormData({ ...formData, hospitalChoice2: e.target.value })}
                                                        placeholder="ลำดับที่ 2"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t pt-4">
                                            <h3 className="font-semibold text-slate-800 mb-3">ข้อมูลสำหรับคนต่างด้าว (ถ้ามี)</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.hasPassport}
                                                            onChange={(e) => setFormData({ ...formData, hasPassport: e.target.checked })}
                                                            className="w-4 h-4 rounded"
                                                        />
                                                        <span className="text-sm font-medium">หนังสือเดินทาง (PASSPORT)</span>
                                                    </label>
                                                </div>
                                                {formData.hasPassport && (
                                                    <>
                                                        <div>
                                                            <Label>หนังสือเดินทาง (PASSPORT) เลขที่</Label>
                                                            <Input
                                                                value={formData.passportNumber}
                                                                onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                                                                placeholder="เลขที่หนังสือเดินทาง"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>ใบอนุญาตทำงาน (WORK PERMIT) เลขที่</Label>
                                                            <Input
                                                                value={formData.workPermitNumber}
                                                                onChange={(e) => setFormData({ ...formData, workPermitNumber: e.target.value })}
                                                                placeholder="เลขที่ใบอนุญาตทำงาน"
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                                <div>
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={!!formData.otherDocumentType}
                                                            onChange={(e) => setFormData({ ...formData, otherDocumentType: e.target.checked ? 'other' : '' })}
                                                            className="w-4 h-4 rounded"
                                                        />
                                                        <span className="text-sm font-medium">อื่นๆ (ระบุ)</span>
                                                    </label>
                                                </div>
                                                {formData.otherDocumentType && (
                                                    <>
                                                        <div>
                                                            <Label>อื่นๆ (ระบุประเภท)</Label>
                                                            <Input
                                                                value={formData.otherDocumentType}
                                                                onChange={(e) => setFormData({ ...formData, otherDocumentType: e.target.value })}
                                                                placeholder="ระบุเอกสาร"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>เลขที่</Label>
                                                            <Input
                                                                value={formData.otherDocumentNumber}
                                                                onChange={(e) => setFormData({ ...formData, otherDocumentNumber: e.target.value })}
                                                                placeholder="เลขที่เอกสาร"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>ใบอนุญาตทำงาน (WORK PERMIT) เลขที่</Label>
                                                            <Input
                                                                value={formData.otherWorkPermitNumber}
                                                                onChange={(e) => setFormData({ ...formData, otherWorkPermitNumber: e.target.value })}
                                                                placeholder="เลขที่ใบอนุญาตทำงาน"
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // Form for SPS 9-02
                                    <div className="space-y-4">
                                        <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                                            <p className="text-sm font-medium">แบบฟอร์มนี้สำหรับผู้ที่ยังไม่เคยมีประกันสังคม</p>
                                        </div>

                                        <div className="border-t pt-4">
                                            <h3 className="font-semibold text-slate-800 mb-3">ข้อมูลการรับเอกสาร</h3>
                                            <div>
                                                <div className="mb-3">
                                                    <Label>เลขที่รับ</Label>
                                                    <Input
                                                        value={formData.receiptNumber}
                                                        onChange={(e) => setFormData({ ...formData, receiptNumber: e.target.value })}
                                                        placeholder="เลขที่รับ"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-3 mb-3">
                                                    <div>
                                                        <Label>วันที่</Label>
                                                        <Input
                                                            type="date"
                                                            value={formData.receiptDate}
                                                            onChange={(e) => setFormData({ ...formData, receiptDate: e.target.value })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>เวลา</Label>
                                                        <Input
                                                            type="time"
                                                            value={formData.receiptTime}
                                                            onChange={(e) => setFormData({ ...formData, receiptTime: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label>ลงชื่อ/ผู้รับ</Label>
                                                    <Input
                                                        value={formData.receivedBy}
                                                        onChange={(e) => setFormData({ ...formData, receivedBy: e.target.value })}
                                                        placeholder="ลงชื่อ/ผู้รับ"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3 p-3 bg-blue-50 border border-blue-200 rounded">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.showSection33}
                                                    onChange={(e) => {
                                                        if (!e.target.checked) {
                                                            setFormData({ 
                                                                ...formData, 
                                                                showSection33: false,
                                                                employerName: '',
                                                                accountNumber: '',
                                                                branchNumber: '',
                                                                employmentStartDate: '',
                                                                lastSalaryMonth: '',
                                                                salary: ''
                                                            });
                                                        } else {
                                                            setFormData({ ...formData, showSection33: true });
                                                        }
                                                    }}
                                                    className="w-4 h-4 rounded"
                                                />
                                                <span className="text-sm font-medium">สำหรับผู้ประกันตนมาตรา 33</span>
                                            </label>
                                        </div>

                                        {formData.showSection33 && (
                                            <div>
                                                <h3 className="font-semibold text-slate-800 mb-3">ข้อมูลนายจ้าง</h3>
                                                <div className="space-y-3">
                                                    <div>
                                                        <Label>ชื่อสถานประกอบการ</Label>
                                                        <Input
                                                            value={formData.employerName}
                                                            onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                                                            placeholder="ชื่อบริษัท/ห้างร้าน"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>เลขที่บัญชี (10 หลัก)</Label>
                                                        <Input
                                                            value={formData.accountNumber}
                                                            onChange={(e) => {
                                                                const value = e.target.value.replace(/\D/g, '');
                                                                if (value.length <= 10) {
                                                                    setFormData({ ...formData, accountNumber: value });
                                                                }
                                                            }}
                                                            placeholder="เลขที่บัญชี (10 หลัก)"
                                                            maxLength="10"
                                                        />
                                                        {formData.accountNumber && formData.accountNumber.length !== 10 && (
                                                            <p className="text-red-500 text-sm mt-1">ต้องเป็น 10 หลัก ({formData.accountNumber.length}/10)</p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <Label>ลำดับที่สาขา (5 หลัก)</Label>
                                                        <Input
                                                            value={formData.branchNumber}
                                                            onChange={(e) => {
                                                                const value = e.target.value.replace(/\D/g, '');
                                                                if (value.length <= 5) {
                                                                    setFormData({ ...formData, branchNumber: value });
                                                                }
                                                            }}
                                                            placeholder="ลำดับที่สาขา (5 หลัก)"
                                                            maxLength="5"
                                                        />
                                                        {formData.branchNumber && formData.branchNumber.length !== 5 && (
                                                            <p className="text-red-500 text-sm mt-1">ต้องเป็น 5 หลัก ({formData.branchNumber.length}/5)</p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <Label>เข้างานเมื่อวันที่</Label>
                                                        <Input
                                                            type="date"
                                                            value={formData.employmentStartDate || (applicant?.start_work_date ? new Date(applicant.start_work_date).toISOString().split('T')[0] : '')}
                                                            onChange={(e) => setFormData({ ...formData, employmentStartDate: e.target.value })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>ได้รับค่าจ้างงวดสุดท้ายเมื่อเดือน</Label>
                                                        <Input
                                                            type="month"
                                                            value={formData.lastSalaryMonth}
                                                            onChange={(e) => setFormData({ ...formData, lastSalaryMonth: e.target.value })}
                                                            placeholder="เลือกเดือนและปี"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>อัตราค่าจ้าง (บาท/เดือน)</Label>
                                                        <Input
                                                            value={formData.salary}
                                                            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                                            placeholder="เงินเดือน"
                                                            type="number"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="space-y-3 p-3 bg-purple-50 border border-purple-200 rounded">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.showSection39}
                                                    onChange={(e) => {
                                                        if (!e.target.checked) {
                                                            setFormData({ 
                                                                ...formData, 
                                                                showSection39: false,
                                                                lastEmployerName: '',
                                                                employmentEndDate: '',
                                                                section39AccountNumber: '',
                                                                section39BranchNumber: ''
                                                            });
                                                        } else {
                                                            setFormData({ ...formData, showSection39: true });
                                                        }
                                                    }}
                                                    className="w-4 h-4 rounded"
                                                />
                                                <span className="text-sm font-medium">สำหรับผู้ประกันตนมาตรา 39 และบุคคลตามมาตรา 38 และมาตรา 41</span>
                                            </label>
                                        </div>

                                        {formData.showSection39 && (
                                            <div>
                                                <h3 className="font-semibold text-slate-800 mb-3">ข้อมูลการทำงานเดิม (ถ้ามี)</h3>
                                                <div className="space-y-3">
                                                    <div>
                                                        <Label>ชื่อสถานประกอบการสุดท้ายที่ทำงาน</Label>
                                                        <Input
                                                            value={formData.lastEmployerName}
                                                            onChange={(e) => setFormData({ ...formData, lastEmployerName: e.target.value })}
                                                            placeholder="ชื่อบริษัทที่ทำงานเดิม"
                                                        />
                                                    </div>
                                                    <div>
                                                         <Label>สิ้นสภาพความเป็นลูกจ้างเมื่อวันที่</Label>
                                                         <Input
                                                             type="date"
                                                             value={formData.employmentEndDate}
                                                             onChange={(e) => setFormData({ ...formData, employmentEndDate: e.target.value })}
                                                         />
                                                     </div>
                                                     <div>
                                                         <Label>เลขที่บัญชี (10 หลัก)</Label>
                                                         <Input
                                                             value={formData.section39AccountNumber}
                                                             onChange={(e) => {
                                                                 const value = e.target.value.replace(/\D/g, '');
                                                                 if (value.length <= 10) {
                                                                     setFormData({ ...formData, section39AccountNumber: value });
                                                                 }
                                                             }}
                                                             placeholder="เลขที่บัญชี (10 หลัก)"
                                                             maxLength="10"
                                                         />
                                                         {formData.section39AccountNumber && formData.section39AccountNumber.length !== 10 && (
                                                             <p className="text-red-500 text-sm mt-1">ต้องเป็น 10 หลัก ({formData.section39AccountNumber.length}/10)</p>
                                                         )}
                                                     </div>
                                                     <div>
                                                         <Label>ลำดับที่สาขา (5 หลัก)</Label>
                                                         <Input
                                                             value={formData.section39BranchNumber}
                                                             onChange={(e) => {
                                                                 const value = e.target.value.replace(/\D/g, '');
                                                                 if (value.length <= 5) {
                                                                     setFormData({ ...formData, section39BranchNumber: value });
                                                                 }
                                                             }}
                                                             placeholder="ลำดับที่สาขา (5 หลัก)"
                                                             maxLength="5"
                                                         />
                                                         {formData.section39BranchNumber && formData.section39BranchNumber.length !== 5 && (
                                                             <p className="text-red-500 text-sm mt-1">ต้องเป็น 5 หลัก ({formData.section39BranchNumber.length}/5)</p>
                                                         )}
                                                     </div>
                                                    </div>
                                                    </div>
                                                    )}

                                                    <div>
                                            <Label>วันที่ลงนาม</Label>
                                            <Input
                                                type="date"
                                                value={formData.signatureDate}
                                                onChange={(e) => setFormData({ ...formData, signatureDate: e.target.value })}
                                            />
                                        </div>

                                        <div className="border-t pt-4">
                                            <h3 className="font-semibold text-slate-800 mb-3">2. การเลือกสถานพยาบาล</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="radio"
                                                            name="hospitalSelection"
                                                            checked={formData.hospitalSelection === 'not_selected'}
                                                            onChange={() => setFormData({ ...formData, hospitalSelection: 'not_selected' })}
                                                            className="w-4 h-4"
                                                        />
                                                        <span className="text-sm font-medium">ยังไม่ได้เลือกสถานพยาบาล</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="radio"
                                                            name="hospitalSelection"
                                                            checked={formData.hospitalSelection === 'use_old'}
                                                            onChange={() => setFormData({ ...formData, hospitalSelection: 'use_old' })}
                                                            className="w-4 h-4"
                                                        />
                                                        <span className="text-sm font-medium">ขอใช้สถานพยาบาลเดิม (กรณี มาตรา 38 และ 41)</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="radio"
                                                            name="hospitalSelection"
                                                            checked={formData.hospitalSelection === 'change'}
                                                            onChange={() => setFormData({ ...formData, hospitalSelection: 'change' })}
                                                            className="w-4 h-4"
                                                        />
                                                        <span className="text-sm font-medium">ขอเปลี่ยนสถานพยาบาล (โปรดระบุเหตุผล)</span>
                                                    </label>
                                                </div>

                                                {formData.hospitalSelection === 'change' && (
                                                    <div className="ml-6 space-y-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                                                        <div>
                                                            <label className="flex items-center gap-2">
                                                                <input
                                                                    type="radio"
                                                                    name="changeReason"
                                                                    checked={formData.changeReason === 'annual'}
                                                                    onChange={() => setFormData({ ...formData, changeReason: 'annual' })}
                                                                    className="w-4 h-4"
                                                                />
                                                                <span className="text-sm">เปลี่ยนสถานพยาบาลประจำปี</span>
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <label className="flex items-center gap-2">
                                                                <input
                                                                    type="radio"
                                                                    name="changeReason"
                                                                    checked={formData.changeReason === 'during_year'}
                                                                    onChange={() => setFormData({ ...formData, changeReason: 'during_year' })}
                                                                    className="w-4 h-4"
                                                                />
                                                                <span className="text-sm">เปลี่ยนสถานพยาบาลระหว่างปี</span>
                                                            </label>
                                                        </div>

                                                        {formData.changeReason && (
                                                            <div className="ml-6 space-y-3 p-3 bg-orange-50 border border-orange-200 rounded">
                                                                <div>
                                                                    <label className="flex items-center gap-2">
                                                                        <input
                                                                            type="radio"
                                                                            name="changeReasonDetail"
                                                                            checked={formData.changeReasonDetail === 'address'}
                                                                            onChange={() => setFormData({ ...formData, changeReasonDetail: 'address' })}
                                                                            className="w-4 h-4"
                                                                        />
                                                                        <span className="text-sm">ย้ายที่อยู่</span>
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <label className="flex items-center gap-2">
                                                                        <input
                                                                            type="radio"
                                                                            name="changeReasonDetail"
                                                                            checked={formData.changeReasonDetail === 'workplace'}
                                                                            onChange={() => setFormData({ ...formData, changeReasonDetail: 'workplace' })}
                                                                            className="w-4 h-4"
                                                                        />
                                                                        <span className="text-sm">เปลี่ยนสถานที่ทำงาน</span>
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <label className="flex items-center gap-2">
                                                                        <input
                                                                            type="radio"
                                                                            name="changeReasonDetail"
                                                                            checked={formData.changeReasonDetail === 'other'}
                                                                            onChange={() => setFormData({ ...formData, changeReasonDetail: 'other' })}
                                                                            className="w-4 h-4"
                                                                        />
                                                                        <span className="text-sm">อื่นๆ (ระบุ)</span>
                                                                    </label>
                                                                </div>
                                                                {formData.changeReasonDetail === 'other' && (
                                                                    <div>
                                                                        <Label>ระบุรายละเอียด</Label>
                                                                        <Input
                                                                            value={formData.otherReason}
                                                                            onChange={(e) => setFormData({ ...formData, otherReason: e.target.value })}
                                                                            placeholder="ระบุเหตุผลอื่นๆ"
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="border-t pt-4">
                                            <h3 className="font-semibold text-slate-800 mb-3">การเลือกสถานพยาบาล</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.selectHospital === 'yes'}
                                                            onChange={(e) => setFormData({ ...formData, selectHospital: e.target.checked ? 'yes' : '' })}
                                                            className="w-4 h-4 rounded"
                                                        />
                                                        <span className="text-sm font-medium">ข้าพเจ้าขอเลือกสถานพยาบาล</span>
                                                    </label>
                                                </div>

                                                {formData.selectHospital === 'yes' && (
                                                    <div className="ml-6 space-y-3 p-3 bg-blue-50 border border-blue-200 rounded">
                                                        <div>
                                                            <Label>ลำดับที่ 1 ชื่อสถานพยาบาล</Label>
                                                            <Input
                                                                value={formData.hospital1}
                                                                onChange={(e) => setFormData({ ...formData, hospital1: e.target.value })}
                                                                placeholder="ชื่อสถานพยาบาล"
                                                            />
                                                            <Label className="mt-2">รหัสสถานพยาบาล (7 หลัก)</Label>
                                                            <Input
                                                                value={formData.hospital1Code}
                                                                onChange={(e) => {
                                                                    const value = e.target.value.replace(/\D/g, '');
                                                                    if (value.length <= 7) {
                                                                        setFormData({ ...formData, hospital1Code: value });
                                                                    }
                                                                }}
                                                                placeholder="รหัสสถานพยาบาล"
                                                                maxLength="7"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>ลำดับที่ 2 ชื่อสถานพยาบาล</Label>
                                                            <Input
                                                                value={formData.hospital2}
                                                                onChange={(e) => setFormData({ ...formData, hospital2: e.target.value })}
                                                                placeholder="ชื่อสถานพยาบาล"
                                                            />
                                                            <Label className="mt-2">รหัสสถานพยาบาล (7 หลัก)</Label>
                                                            <Input
                                                                value={formData.hospital2Code}
                                                                onChange={(e) => {
                                                                    const value = e.target.value.replace(/\D/g, '');
                                                                    if (value.length <= 7) {
                                                                        setFormData({ ...formData, hospital2Code: value });
                                                                    }
                                                                }}
                                                                placeholder="รหัสสถานพยาบาล"
                                                                maxLength="7"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>ลำดับที่ 3 ชื่อสถานพยาบาล</Label>
                                                            <Input
                                                                value={formData.hospital3}
                                                                onChange={(e) => setFormData({ ...formData, hospital3: e.target.value })}
                                                                placeholder="ชื่อสถานพยาบาล"
                                                            />
                                                            <Label className="mt-2">รหัสสถานพยาบาล (7 หลัก)</Label>
                                                            <Input
                                                                value={formData.hospital3Code}
                                                                onChange={(e) => {
                                                                    const value = e.target.value.replace(/\D/g, '');
                                                                    if (value.length <= 7) {
                                                                        setFormData({ ...formData, hospital3Code: value });
                                                                    }
                                                                }}
                                                                placeholder="รหัสสถานพยาบาล"
                                                                maxLength="7"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                <div>
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.disabledPerson === 'yes'}
                                                            onChange={(e) => setFormData({ ...formData, disabledPerson: e.target.checked ? 'yes' : '' })}
                                                            className="w-4 h-4 rounded"
                                                        />
                                                        <span className="text-sm font-medium">ข้าพเจ้าคนพิการ ขอรับบริการจาก สปสช.</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t pt-4">
                                            <h3 className="font-semibold text-slate-800 mb-3">ลายเซ็นและวันที่</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <Label className="mb-2 block">ลายเซ็นผู้ประกันตน</Label>
                                                    <SignaturePad
                                                        signatureUrl={formData.declarationSignature}
                                                        onSave={(sig) => setFormData({ ...formData, declarationSignature: sig })}
                                                        label="ลายเซ็นผู้ประกันตน"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>ลงวันที่ประกาศ</Label>
                                                    <Input
                                                        type="date"
                                                        value={formData.declarationSignatureDate}
                                                        onChange={(e) => setFormData({ ...formData, declarationSignatureDate: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end gap-2 pt-4">
                                    <Button 
                                        variant="outline"
                                        onClick={() => setShowForm(false)}
                                    >
                                        ปิด
                                    </Button>
                                    <Button 
                                        onClick={() => saveMutation.mutate(formData)}
                                        disabled={saveMutation.isPending}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        {saveMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                        บันทึก
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}