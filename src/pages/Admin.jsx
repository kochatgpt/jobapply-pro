import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Users, Settings as SettingsIcon, LayoutDashboard, FileCheck } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import ApplicantList from '@/components/admin/ApplicantList';
import ApplicantDetail from '@/components/admin/ApplicantDetail';
import SettingsPanel from '@/components/admin/SettingsPanel';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import NDAReviewModal from '@/components/admin/NDAReviewModal';
import PDPAReviewModal from '@/components/admin/PDPAReviewModal';
import FMHRD19ReviewModal from '@/components/admin/FMHRD19ReviewModal';
import CriminalCheckReviewModal from '@/components/admin/CriminalCheckReviewModal';

function DocumentsView({ selectedApplicant, onReviewNDA, onReviewPDPA, onReviewFMHRD19, onReviewCriminalCheck, onSelectApplicant }) {
    const { data: applicants = [], isLoading } = useQuery({
        queryKey: ['applicants'],
        queryFn: () => base44.entities.Applicant.list()
    });

    const { data: fmhrd19Documents = [] } = useQuery({
        queryKey: ['fmhrd19_documents'],
        queryFn: async () => {
            const docs = await base44.entities.PdfBase.filter({ pdf_type: 'FM-HRD-19' });
            return docs;
        }
    });

    if (!selectedApplicant) {
        return (
            <div className="h-full flex items-center justify-center">
                <Card className="max-w-md">
                    <CardContent className="p-8 text-center">
                        <FileCheck className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-slate-800 mb-2">เลือกผู้สมัครก่อน</h2>
                        <p className="text-slate-500 mb-6">กรุณากลับไปที่แท็บ "ผู้สมัคร" และเลือกผู้สมัครเพื่อดูเอกสาร</p>
                        <Button 
                            onClick={onSelectApplicant}
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            ไปที่ผู้สมัคร
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const filteredFMHRD19 = fmhrd19Documents.filter(doc => doc.applicant_id === selectedApplicant.id);
    const ndaDocs = [selectedApplicant].filter(a => 
        a.nda_document?.status === 'submitted' || a.nda_document?.status === 'completed'
    );
    
    const pdpaDocs = [selectedApplicant].filter(a => 
        a.pdpa_document?.status === 'submitted' || a.pdpa_document?.status === 'completed'
    );
    
    const criminalCheckDocs = [selectedApplicant].filter(a => 
        a.criminal_check_document?.status === 'submitted' || a.criminal_check_document?.status === 'completed'
    );

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-slate-400">กำลังโหลด...</div>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* NDA Documents */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">เอกสาร NDA (FM-HRD-27)</h2>
                    {ndaDocs.length === 0 ? (
                        <Card>
                            <CardContent className="p-8 text-center text-slate-500">
                                ยังไม่มีเอกสารที่ส่งมา
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {ndaDocs.map(applicant => (
                                <Card key={applicant.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                                    <FileCheck className="w-6 h-6 text-indigo-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg">{applicant.full_name}</h3>
                                                    <p className="text-sm text-slate-500">
                                                        ส่งเมื่อ: {applicant.nda_document?.submitted_date ? 
                                                            new Date(applicant.nda_document.submitted_date).toLocaleDateString('th-TH', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            }) : '-'
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Badge variant={applicant.nda_document?.status === 'completed' ? 'success' : 'default'}>
                                                    {applicant.nda_document?.status === 'completed' ? 'เสร็จสิ้น' : 'รอดำเนินการ'}
                                                </Badge>
                                                <Button 
                                                    onClick={() => onReviewNDA(applicant)}
                                                    size="sm"
                                                >
                                                    ดูและเซ็น
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* PDPA Documents */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">เอกสาร PDPA</h2>
                    {pdpaDocs.length === 0 ? (
                        <Card>
                            <CardContent className="p-8 text-center text-slate-500">
                                ยังไม่มีเอกสารที่ส่งมา
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {pdpaDocs.map(applicant => (
                                <Card key={applicant.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                                                    <FileCheck className="w-6 h-6 text-purple-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg">{applicant.full_name}</h3>
                                                    <p className="text-sm text-slate-500">
                                                        ส่งเมื่อ: {applicant.pdpa_document?.submitted_date ? 
                                                            new Date(applicant.pdpa_document.submitted_date).toLocaleDateString('th-TH', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            }) : '-'
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Badge variant={applicant.pdpa_document?.status === 'completed' ? 'success' : 'default'}>
                                                    {applicant.pdpa_document?.status === 'completed' ? 'เสร็จสิ้น' : 'รอดำเนินการ'}
                                                </Badge>
                                                <Button 
                                                    onClick={() => onReviewPDPA(applicant)}
                                                    size="sm"
                                                >
                                                    กรอกข้อมูลพยาน
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* FM-HRD-19 Documents - Card View */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">เอกสาร FM-HRD-19</h2>
                    {filteredFMHRD19.length === 0 ? (
                        <Card>
                            <CardContent className="p-8 text-center text-slate-500">
                                ยังไม่มีเอกสารที่ส่งมา
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredFMHRD19.map(doc => {
                                const applicant = selectedApplicant;
                                const docData = doc.data || {};
                                return (
                                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <FileCheck className="w-6 h-6 text-blue-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-lg">{applicant?.full_name || '-'}</h3>
                                                        <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-slate-600">
                                                            <div>
                                                                <p className="text-xs text-slate-500">วันที่เอกสาร</p>
                                                                <p className="font-medium">{docData.document_date ? new Date(docData.document_date).toLocaleDateString('th-TH') : '-'}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-slate-500">ตำแหน่ง / แผนก</p>
                                                                <p className="font-medium">{docData.position || '-'} / {docData.department || '-'}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-slate-500">วันฝึกอบรม</p>
                                                                <p className="font-medium">{docData.training_start_date && docData.training_end_date ? `${new Date(docData.training_start_date).toLocaleDateString('th-TH')} - ${new Date(docData.training_end_date).toLocaleDateString('th-TH')}` : '-'}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-slate-500">ID เอกสาร</p>
                                                                <p className="font-medium text-xs">{doc.id.substring(0, 8)}...</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Badge variant={doc.status === 'approved' ? 'success' : doc.status === 'submitted' ? 'default' : 'secondary'}>
                                                        {doc.status === 'approved' ? 'อนุมัติแล้ว' : doc.status === 'submitted' ? 'รอดำเนินการ' : 'แบบร่าง'}
                                                    </Badge>
                                                    <Button 
                                                        onClick={() => applicant && onReviewFMHRD19(applicant)}
                                                        size="sm"
                                                        disabled={!applicant}
                                                    >
                                                        ดูเอกสาร
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Criminal Check Documents */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">หนังสือมอบอำนาจและยินยอมตรวจประวัติอาชญากรรม</h2>
                    {criminalCheckDocs.length === 0 ? (
                        <Card>
                            <CardContent className="p-8 text-center text-slate-500">
                                ยังไม่มีเอกสารที่ส่งมา
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {criminalCheckDocs.map(applicant => (
                                <Card key={applicant.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                                                    <FileCheck className="w-6 h-6 text-amber-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg">{applicant.full_name}</h3>
                                                    <p className="text-sm text-slate-500">
                                                        ส่งเมื่อ: {applicant.criminal_check_document?.submitted_date ? 
                                                            new Date(applicant.criminal_check_document.submitted_date).toLocaleDateString('th-TH', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            }) : '-'
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Badge variant={applicant.criminal_check_document?.status === 'completed' ? 'success' : 'default'}>
                                                    {applicant.criminal_check_document?.status === 'completed' ? 'เสร็จสิ้น' : 'รอดำเนินการ'}
                                                </Badge>
                                                <Button 
                                                    onClick={() => onReviewCriminalCheck(applicant)}
                                                    size="sm"
                                                >
                                                    กรอกข้อมูลและเซ็น
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function AdminPage() {
    const navigate = useNavigate();
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [activeView, setActiveView] = useState("dashboard"); // dashboard, settings, documents
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [reviewingApplicant, setReviewingApplicant] = useState(null);
    const [reviewingPDPA, setReviewingPDPA] = useState(null);
    const [reviewingFMHRD19, setReviewingFMHRD19] = useState(null);
    const [reviewingCriminalCheck, setReviewingCriminalCheck] = useState(null);

    useEffect(() => {
        const checkAccess = async () => {
            // Check if employee is logged in
            const employeeId = localStorage.getItem('user_applicant_id');
            if (employeeId) {
                // Employee logged in, redirect to user dashboard
                navigate('/user-dashboard');
                return;
            }

            // Check if admin is logged in
            try {
                const user = await base44.auth.me();
                if (user) {
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                }
            } catch (error) {
                setIsAuthorized(false);
            }
        };
        checkAccess();
    }, [navigate]);

    if (isAuthorized === null) {
        return (
            <div className="h-[calc(100vh-64px)] flex items-center justify-center">
                <div className="text-slate-400">กำลังตรวจสอบสิทธิ์...</div>
            </div>
        );
    }

    if (isAuthorized === false) {
        return <UserNotRegisteredError />;
    }

    return (
        <div className="h-[calc(100vh-64px)] bg-slate-100 flex flex-col overflow-hidden">
             {/* Admin Sub-Header */}
             <div className="bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between shrink-0 z-20">
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                    <LayoutDashboard className="w-5 h-5 text-indigo-600" />
                    Admin Portal
                </div>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button 
                        onClick={() => setActiveView("dashboard")}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeView === "dashboard" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        <Users className="w-4 h-4" /> ผู้สมัคร
                    </button>
                    <button 
                        onClick={() => setActiveView("documents")}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeView === "documents" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        <FileCheck className="w-4 h-4" /> เอกสาร
                    </button>
                    <button 
                        onClick={() => setActiveView("settings")}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeView === "settings" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        <SettingsIcon className="w-4 h-4" /> ตั้งค่า
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden relative">
                {activeView === "dashboard" ? (
                    <div className="flex h-full">
                        <ApplicantList 
                            onSelect={setSelectedApplicant} 
                            selectedId={selectedApplicant?.id} 
                        />
                        <ApplicantDetail applicant={selectedApplicant} />
                    </div>
                ) : activeView === "documents" ? (
                    <DocumentsView 
                        selectedApplicant={selectedApplicant}
                        onSelectApplicant={() => setActiveView("dashboard")}
                        onReviewNDA={setReviewingApplicant}
                        onReviewPDPA={setReviewingPDPA}
                        onReviewFMHRD19={setReviewingFMHRD19}
                        onReviewCriminalCheck={setReviewingCriminalCheck}
                    />
                ) : (
                    <div className="h-full overflow-y-auto">
                        <SettingsPanel />
                    </div>
                )}
            </div>

            {/* NDA Review Modal */}
            <NDAReviewModal 
                applicant={reviewingApplicant}
                isOpen={!!reviewingApplicant}
                onClose={() => setReviewingApplicant(null)}
            />

            {/* PDPA Review Modal */}
            <PDPAReviewModal 
                applicant={reviewingPDPA}
                isOpen={!!reviewingPDPA}
                onClose={() => setReviewingPDPA(null)}
            />

            {/* FM-HRD-19 Review Modal */}
            <FMHRD19ReviewModal 
                applicant={reviewingFMHRD19}
                isOpen={!!reviewingFMHRD19}
                onClose={() => setReviewingFMHRD19(null)}
            />

            {/* Criminal Check Review Modal */}
            <CriminalCheckReviewModal 
                applicant={reviewingCriminalCheck}
                isOpen={!!reviewingCriminalCheck}
                onClose={() => setReviewingCriminalCheck(null)}
            />
        </div>
    );
}