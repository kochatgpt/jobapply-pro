import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileDown, Eye, Loader2, ArrowLeft, Send } from "lucide-react";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import NDADocument from '@/components/application/pdf/NDADocument';
import SignaturePad from '@/components/admin/SignaturePad';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function NDAForm() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [applicantId, setApplicantId] = useState(null);
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        contractDate: '',
        employeeSignDate: '',
        // Address fields
        number: '',
        moo: '',
        soi: '',
        road: '',
        subdistrict: '',
        district: '',
        province: '',
        zipcode: '',
        mobile_phone: '',
        id_card: ''
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

    // Fetch existing NDA document data
    const { data: ndaDoc } = useQuery({
        queryKey: ['nda_pdf', applicantId],
        queryFn: async () => {
            const docs = await base44.entities.PdfBase.filter({ 
                applicant_id: applicantId, 
                pdf_type: 'NDA' 
            });
            return docs[0] || null;
        },
        enabled: !!applicantId
    });

    // Initialize form data from applicant and existing document
    useEffect(() => {
        if (applicant) {
            const p = applicant.personal_data || {};
            const currentAddr = p.current_address || {};
            
            setFormData(prev => ({
                ...prev,
                contractDate: ndaDoc?.data?.contractDate || new Date().toISOString().split('T')[0],
                employeeSignDate: ndaDoc?.data?.employeeSignDate || new Date().toISOString().split('T')[0],
                number: currentAddr.number || '',
                moo: currentAddr.moo || '',
                soi: currentAddr.soi || '',
                road: currentAddr.road || '',
                subdistrict: currentAddr.subdistrict || '',
                district: currentAddr.district || '',
                province: currentAddr.province || '',
                zipcode: currentAddr.zipcode || '',
                mobile_phone: p.mobile_phone || '',
                id_card: p.id_card || ''
            }));
        }
    }, [applicant, ndaDoc]);

    const saveDocumentMutation = useMutation({
        mutationFn: async (data) => {
            if (ndaDoc) {
                return await base44.entities.PdfBase.update(ndaDoc.id, data);
            } else {
                return await base44.entities.PdfBase.create(data);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['nda_pdf', applicantId]);
            toast.success('บันทึกข้อมูลเรียบร้อยแล้ว');
        }
    });

    const submitMutation = useMutation({
        mutationFn: async (data) => {
            if (ndaDoc) {
                return await base44.entities.PdfBase.update(ndaDoc.id, data);
            } else {
                return await base44.entities.PdfBase.create(data);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['nda_pdf', applicantId]);
            toast.success('ส่งเอกสารเรียบร้อยแล้ว');
            navigate('/user-dashboard');
        },
        onError: () => {
            toast.error('เกิดข้อผิดพลาดในการส่งเอกสาร');
        }
    });

    const handleSubmit = () => {
        const ndaData = {
            applicant_id: applicantId,
            pdf_type: 'NDA',
            data: {
                ...formData,
                // Store address in a structured way
                current_address: {
                    number: formData.number,
                    moo: formData.moo,
                    soi: formData.soi,
                    road: formData.road,
                    subdistrict: formData.subdistrict,
                    district: formData.district,
                    province: formData.province,
                    zipcode: formData.zipcode
                }
            },
            status: 'submitted',
            submitted_date: new Date().toISOString()
        };
        submitMutation.mutate(ndaData);
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
                pdf.save(`NDA_${applicant?.full_name || 'Document'}.pdf`);
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

    if (!applicant) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-slate-400">กำลังโหลด...</div>
            </div>
        );
    }

    // Merge form data with applicant data for document rendering
    const mergedApplicant = {
        ...applicant,
        personal_data: {
            ...applicant.personal_data,
            id_card: formData.id_card || applicant.personal_data?.id_card,
            mobile_phone: formData.mobile_phone || applicant.personal_data?.mobile_phone,
            current_address: {
                number: formData.number,
                moo: formData.moo,
                soi: formData.soi,
                road: formData.road,
                subdistrict: formData.subdistrict,
                district: formData.district,
                province: formData.province,
                zipcode: formData.zipcode
            }
        }
    };

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
                        <CardTitle>เอกสาร NDA (สัญญาข้อตกลงไม่เปิดเผยข้อมูล)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-auto max-h-[800px] bg-slate-100 p-8 flex justify-center">
                            <div id="nda-printable-content">
                                <NDADocument 
                                    applicant={mergedApplicant}
                                    formData={formData}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                            <CardHeader className="border-b bg-slate-50">
                                <CardTitle>กรอกข้อมูลเอกสาร NDA</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                {/* Date Fields */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-slate-800">ข้อมูลวันที่</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label>วันที่ทำสัญญา</Label>
                                            <Input
                                                type="date"
                                                value={formData.contractDate}
                                                onChange={(e) => setFormData({ ...formData, contractDate: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <Label>วันที่ลงนามพนักงาน</Label>
                                            <Input
                                                type="date"
                                                value={formData.employeeSignDate}
                                                onChange={(e) => setFormData({ ...formData, employeeSignDate: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Info */}
                                <div className="space-y-4 border-t pt-4">
                                    <h3 className="font-semibold text-slate-800">ข้อมูลส่วนตัว</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label>เลขบัตรประชาชน</Label>
                                            <Input
                                                value={formData.id_card}
                                                onChange={(e) => setFormData({ ...formData, id_card: e.target.value })}
                                                placeholder="เลขบัตรประชาชน 13 หลัก"
                                            />
                                        </div>
                                        <div>
                                            <Label>เบอร์โทรศัพท์มือถือ</Label>
                                            <Input
                                                value={formData.mobile_phone}
                                                onChange={(e) => setFormData({ ...formData, mobile_phone: e.target.value })}
                                                placeholder="เบอร์โทรศัพท์"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Address Fields */}
                                <div className="space-y-4 border-t pt-4">
                                    <h3 className="font-semibold text-slate-800">ที่อยู่ปัจจุบัน</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label>บ้านเลขที่</Label>
                                            <Input
                                                value={formData.number}
                                                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                                placeholder="บ้านเลขที่"
                                            />
                                        </div>
                                        <div>
                                            <Label>หมู่</Label>
                                            <Input
                                                value={formData.moo}
                                                onChange={(e) => setFormData({ ...formData, moo: e.target.value })}
                                                placeholder="หมู่"
                                            />
                                        </div>
                                        <div>
                                            <Label>ซอย</Label>
                                            <Input
                                                value={formData.soi}
                                                onChange={(e) => setFormData({ ...formData, soi: e.target.value })}
                                                placeholder="ซอย"
                                            />
                                        </div>
                                        <div>
                                            <Label>ถนน</Label>
                                            <Input
                                                value={formData.road}
                                                onChange={(e) => setFormData({ ...formData, road: e.target.value })}
                                                placeholder="ถนน"
                                            />
                                        </div>
                                        <div>
                                            <Label>ตำบล/แขวง</Label>
                                            <Input
                                                value={formData.subdistrict}
                                                onChange={(e) => setFormData({ ...formData, subdistrict: e.target.value })}
                                                placeholder="ตำบล/แขวง"
                                            />
                                        </div>
                                        <div>
                                            <Label>อำเภอ/เขต</Label>
                                            <Input
                                                value={formData.district}
                                                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                                placeholder="อำเภอ/เขต"
                                            />
                                        </div>
                                        <div>
                                            <Label>จังหวัด</Label>
                                            <Input
                                                value={formData.province}
                                                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                                                placeholder="จังหวัด"
                                            />
                                        </div>
                                        <div>
                                            <Label>รหัสไปรษณีย์</Label>
                                            <Input
                                                value={formData.zipcode}
                                                onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}
                                                placeholder="รหัสไปรษณีย์"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 pt-4">
                                    <Button 
                                        variant="outline"
                                        onClick={() => setShowForm(false)}
                                    >
                                        ยกเลิก
                                    </Button>
                                    <Button 
                                        onClick={() => {
                                            setShowForm(false);
                                            toast.success('บันทึกข้อมูลแล้ว');
                                        }}
                                        className="bg-indigo-600 hover:bg-indigo-700"
                                    >
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