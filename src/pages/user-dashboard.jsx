import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Calendar, Briefcase, FileText, CheckCircle, LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
    const navigate = useNavigate();
    const [applicantId, setApplicantId] = useState(null);

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

    const { data: pdfDocuments } = useQuery({
        queryKey: ['pdf_documents', applicantId],
        queryFn: async () => {
            if (!applicantId) return {};
            const pdfs = await base44.entities.PdfBase.filter({ applicant_id: applicantId });
            const pdfMap = {};
            pdfs.forEach(pdf => {
                pdfMap[pdf.pdf_type] = pdf;
            });
            return pdfMap;
        },
        enabled: !!applicantId
    });

    const handleLogout = () => {
        localStorage.removeItem('user_applicant_id');
        navigate('/user-login');
    };

    if (!applicant) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-slate-400">กำลังโหลด...</div>
            </div>
        );
    }

    const personalData = applicant.personal_data || {};
    const calculateAge = (dob) => {
        if (!dob) return '';
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const documents = [
        { id: 1, name: 'PDPA', description: 'หนังสือยินยอมข้อมูลส่วนบุคคล', link: '/pdpa-form', pdfType: 'PDPA' },
        { id: 2, name: 'FM-HRD-19', description: 'แบบฟอร์มการเข้าทำงาน', link: '/fm-hrd-19', pdfType: 'FM-HRD-19' },
        { id: 3, name: 'สัญญาจ้าง', description: 'สัญญาจ้างงาน', link: '/employment-contract', pdfType: 'Employment-Contract' },
        { id: 4, name: 'FM-HRD-27', description: 'สัญญา NDA (ไม่เปิดเผยข้อมูล)', link: '/fm-hrd-27', pdfType: 'FM-HRD-27' },
        { id: 5, name: 'FM-HRD-30', description: 'การตรวจประวัติอาชญากรรม', link: '/fm-hrd-30', pdfType: 'FM-HRD-30' },
        { id: 6, name: 'หนังสือมอบอำนาจในการตรวจประวัติอาชญากรรม', description: 'หนังสือมอบอำนาจตรวจประวัติ', link: '/criminal-check-form', pdfType: 'Criminal-Check' },
        { id: 7, name: 'แบบสปส.', description: 'แบบฟอร์มประกันสังคม', link: '/sps-form', pdfType: 'SPS-1-03', spsType: applicant?.admin_data?.sps_form_type || '1-03' },
        { id: 8, name: 'ใบขอเอาประกัน', description: 'แบบฟอร์มประกันภัยพนักงาน', link: '/insurance-enrollment', pdfType: 'Insurance-Enrollment' }
    ];

    const getDocumentStatus = (pdfType) => {
        return pdfDocuments?.[pdfType]?.status || null;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Logout Button */}
                <div className="flex justify-end">
                    <Button 
                        variant="outline" 
                        onClick={handleLogout}
                        className="flex items-center gap-2"
                    >
                        <LogOut className="w-4 h-4" />
                        ออกจากระบบ
                    </Button>
                </div>

                {/* User Info Card */}
                <Card className="shadow-xl border-2 border-indigo-100">
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            {/* Photo */}
                            <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-100 border-4 border-white shadow-lg shrink-0">
                                {applicant.photo_url ? (
                                    <img src={applicant.photo_url} className="w-full h-full object-cover" alt={applicant.full_name} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <User className="w-16 h-16 text-slate-300" />
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-3xl font-bold text-slate-800 mb-2">{applicant.full_name}</h1>
                                <p className="text-lg text-slate-600 mb-4">{personalData.english_name}</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="flex items-center justify-center md:justify-start gap-2 text-slate-600">
                                        <Calendar className="w-5 h-5 text-indigo-500" />
                                        <div>
                                            <div className="text-xs text-slate-500">วันเดือนปีเกิด</div>
                                            <div className="font-semibold">
                                                {personalData.dob ? new Date(personalData.dob).toLocaleDateString('th-TH', { 
                                                    year: 'numeric', 
                                                    month: 'long', 
                                                    day: 'numeric' 
                                                }) : '-'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center md:justify-start gap-2 text-slate-600">
                                        <User className="w-5 h-5 text-indigo-500" />
                                        <div>
                                            <div className="text-xs text-slate-500">อายุ</div>
                                            <div className="font-semibold">{calculateAge(personalData.dob)} ปี</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center md:justify-start gap-2 text-slate-600">
                                        <Briefcase className="w-5 h-5 text-indigo-500" />
                                        <div>
                                            <div className="text-xs text-slate-500">ตำแหน่งที่สมัคร</div>
                                            <div className="font-semibold">{personalData.position_1 || '-'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Documents Section */}
                <Card className="shadow-xl">
                    <CardHeader className="border-b bg-slate-50">
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="w-6 h-6 text-indigo-600" />
                            เอกสารที่ต้องกรอก
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {documents.map((doc) => {
                                const status = getDocumentStatus(doc.pdfType);
                                const isApproved = status === 'approved';
                                const isDisabled = isApproved;

                                return (
                                    <div 
                                        key={doc.id}
                                        onClick={() => !isDisabled && doc.link && navigate(doc.link)}
                                        className={`border border-slate-200 rounded-lg p-4 transition-all ${
                                            isDisabled
                                                ? 'opacity-60 cursor-not-allowed bg-slate-50'
                                                : doc.link ? 'cursor-pointer hover:shadow-md hover:border-indigo-300' : 'cursor-default opacity-60'
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold ${
                                                isApproved 
                                                    ? 'bg-green-100 text-green-600' 
                                                    : 'bg-indigo-100 text-indigo-600'
                                            }`}>
                                                {isApproved ? <CheckCircle className="w-5 h-5" /> : doc.id}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-slate-800 mb-1">{doc.name}</h3>
                                                <p className="text-sm text-slate-500 mb-3">{doc.description}</p>
                                                <div className="flex items-center gap-2">
                                                    {isApproved ? (
                                                        <Badge className="bg-green-100 text-green-800 border-green-300">
                                                            <CheckCircle className="w-3 h-3 mr-1" />
                                                            อนุมัติแล้ว
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline" className="text-amber-600 border-amber-300">
                                                            {doc.link ? 'คลิกเพื่อดำเนินการ' : 'รอดำเนินการ'}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800">
                                <strong>หมายเหตุ:</strong> กรุณาอ่านและกรอกข้อมูลในเอกสารทั้งหมดให้ครบถ้วน
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}