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

function DocumentsView({ onReviewNDA, onReviewPDPA, onReviewFMHRD19 }) {
    const { data: applicants = [], isLoading } = useQuery({
        queryKey: ['applicants'],
        queryFn: () => base44.entities.Applicant.list()
    });

    const ndaDocs = applicants.filter(a => 
        a.nda_document?.status === 'submitted' || a.nda_document?.status === 'completed'
    );
    
    const pdpaDocs = applicants.filter(a => 
        a.pdpa_document?.status === 'submitted' || a.pdpa_document?.status === 'completed'
    );
    
    const fmhrd19Docs = applicants.filter(a => 
        a.fmhrd19_document?.status === 'submitted' || a.fmhrd19_document?.status === 'completed'
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

                {/* FM-HRD-19 Documents */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">เอกสาร FM-HRD-19</h2>
                    {fmhrd19Docs.length === 0 ? (
                        <Card>
                            <CardContent className="p-8 text-center text-slate-500">
                                ยังไม่มีเอกสารที่ส่งมา
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {fmhrd19Docs.map(applicant => (
                                <Card key={applicant.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                                    <FileCheck className="w-6 h-6 text-green-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg">{applicant.full_name}</h3>
                                                    <p className="text-sm text-slate-500">
                                                        ส่งเมื่อ: {applicant.fmhrd19_document?.submitted_date ? 
                                                            new Date(applicant.fmhrd19_document.submitted_date).toLocaleDateString('th-TH', {
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
                                                <Badge variant={applicant.fmhrd19_document?.status === 'completed' ? 'success' : 'default'}>
                                                    {applicant.fmhrd19_document?.status === 'completed' ? 'เสร็จสิ้น' : 'รอดำเนินการ'}
                                                </Badge>
                                                <Button 
                                                    onClick={() => onReviewFMHRD19(applicant)}
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
                        onReviewNDA={setReviewingApplicant}
                        onReviewPDPA={setReviewingPDPA}
                        onReviewFMHRD19={setReviewingFMHRD19}
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
        </div>
    );
}