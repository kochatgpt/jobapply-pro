import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Users, Settings as SettingsIcon, LayoutDashboard, FileCheck, Download, Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import JSZip from 'jszip';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import ApplicantList from '@/components/admin/ApplicantList';
import ApplicantDetail from '@/components/admin/ApplicantDetail';
import SettingsPanel from '@/components/admin/SettingsPanel';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import NDAReviewModal from '@/components/admin/NDAReviewModal';
import PDPAReviewModal from '@/components/admin/PDPAReviewModal';
import FMHRD19ReviewModal from '@/components/admin/FMHRD19ReviewModal';
import CriminalCheckReviewModal from '@/components/admin/CriminalCheckReviewModal';
import EmploymentContractReviewModal from '@/components/admin/EmploymentContractReviewModal';
import FMHRD30ReviewModal from '@/components/admin/FMHRD30ReviewModal';
import SPSReviewModal from '@/components/admin/SPSReviewModal';
import SPS902ReviewModal from '@/components/admin/SPS902ReviewModal';
import InsuranceEnrollmentReviewModal from '@/components/admin/InsuranceEnrollmentReviewModal';

function DocumentsView({ selectedApplicant, onReviewNDA, onReviewPDPA, onReviewFMHRD19, onReviewCriminalCheck, onReviewEmploymentContract, onSelectApplicant, onReviewFMHRD27, onReviewFMHRD30, onSetCriminalCheckDoc, onReviewSPS103, onReviewSPS902, onReviewInsurance }) {
    const [downloadingAll, setDownloadingAll] = useState(false);
    
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

    const { data: employmentContractDocuments = [] } = useQuery({
        queryKey: ['employment_contract_documents'],
        queryFn: async () => {
            const docs = await base44.entities.PdfBase.filter({ pdf_type: 'Employment-Contract' });
            return docs;
        }
    });

    const { data: fmhrd30Documents = [] } = useQuery({
        queryKey: ['fmhrd30_documents'],
        queryFn: async () => {
            const docs = await base44.entities.PdfBase.filter({ pdf_type: 'FM-HRD-30' });
            return docs;
        }
    });

    const { data: criminalCheckDocuments = [] } = useQuery({
        queryKey: ['criminal_check_documents'],
        queryFn: async () => {
            const docs = await base44.entities.PdfBase.filter({ pdf_type: 'Criminal-Check' });
            return docs;
        }
    });

    const { data: fmhrd27Documents = [] } = useQuery({
                queryKey: ['fmhrd27_documents'],
                queryFn: async () => {
                    const docs = await base44.entities.PdfBase.filter({ pdf_type: 'NDA' });
                    return docs;
                }
            });

    const { data: sps103Documents = [] } = useQuery({
        queryKey: ['sps_103_documents'],
        queryFn: async () => {
            const docs = await base44.entities.PdfBase.filter({ pdf_type: 'SPS-1-03' });
            return docs;
        }
    });

    const { data: sps902Documents = [] } = useQuery({
        queryKey: ['sps_902_documents'],
        queryFn: async () => {
            const docs = await base44.entities.PdfBase.filter({ pdf_type: 'SPS-9-02' });
            return docs;
        }
    });

    const { data: insuranceDocuments = [] } = useQuery({
        queryKey: ['insurance_documents'],
        queryFn: async () => {
            const docs = await base44.entities.PdfBase.filter({ pdf_type: 'Insurance-Enrollment' });
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

    const filteredFMHRD19 = fmhrd19Documents.filter(doc => doc.applicant_id === selectedApplicant.id && (doc.status === 'submitted' || doc.status === 'approved'));
    const filteredEmploymentContract = employmentContractDocuments.filter(doc => doc.applicant_id === selectedApplicant.id && (doc.status === 'submitted' || doc.status === 'approved'));
    const filteredFMHRD30 = fmhrd30Documents.filter(doc => doc.applicant_id === selectedApplicant.id && (doc.status === 'submitted' || doc.status === 'approved'));
    const filteredFMHRD27 = fmhrd27Documents.filter(doc => doc.applicant_id === selectedApplicant.id && (doc.status === 'submitted' || doc.status === 'approved'));
    const filteredCriminalCheck = criminalCheckDocuments.filter(doc => doc.applicant_id === selectedApplicant.id && (doc.status === 'submitted' || doc.status === 'approved'));
    const filteredSPS103 = sps103Documents.filter(doc => doc.applicant_id === selectedApplicant.id && (doc.status === 'submitted' || doc.status === 'approved'));
    const filteredSPS902 = sps902Documents.filter(doc => doc.applicant_id === selectedApplicant.id && (doc.status === 'submitted' || doc.status === 'approved'));
    const filteredInsurance = insuranceDocuments.filter(doc => doc.applicant_id === selectedApplicant.id && (doc.status === 'submitted' || doc.status === 'approved'));
    const ndaDocs = [selectedApplicant].filter(a => 
        a.nda_document?.status === 'submitted' || a.nda_document?.status === 'completed'
    );
    
    const pdpaDocs = [selectedApplicant].filter(a => 
        a.pdpa_document?.status === 'submitted' || a.pdpa_document?.status === 'completed'
    );
    
    const criminalCheckDocs = [selectedApplicant].filter(a => 
        a.criminal_check_document?.status === 'submitted' || a.criminal_check_document?.status === 'completed'
    );

    const handleDownloadAll = async () => {
        if (!selectedApplicant) return;
        
        setDownloadingAll(true);
        try {
            const zip = new JSZip();
            const documentsFolder = zip.folder(selectedApplicant.full_name);
            
            // Collect all document data as JSON
            const allDocuments = {
                applicant_info: {
                    full_name: selectedApplicant.full_name,
                    email: selectedApplicant.personal_data?.email,
                    phone: selectedApplicant.personal_data?.mobile_phone,
                    submission_date: selectedApplicant.submission_date
                },
                nda_documents: filteredFMHRD27.map(doc => ({ id: doc.id, data: doc.data, status: doc.status })),
                fmhrd19_documents: filteredFMHRD19.map(doc => ({ id: doc.id, data: doc.data, status: doc.status })),
                sps103_documents: filteredSPS103.map(doc => ({ id: doc.id, data: doc.data, status: doc.status })),
                sps902_documents: filteredSPS902.map(doc => ({ id: doc.id, data: doc.data, status: doc.status })),
                insurance_documents: filteredInsurance.map(doc => ({ id: doc.id, data: doc.data, status: doc.status })),
                employment_contracts: filteredEmploymentContract.map(doc => ({ id: doc.id, data: doc.data, status: doc.status })),
                fmhrd30_documents: filteredFMHRD30.map(doc => ({ id: doc.id, data: doc.data, status: doc.status })),
                criminal_check_documents: filteredCriminalCheck.map(doc => ({ id: doc.id, data: doc.data, status: doc.status }))
            };
            
            // Add summary JSON
            documentsFolder.file('summary.json', JSON.stringify(allDocuments, null, 2));
            
            // Create a text summary
            let textSummary = `สรุปเอกสารของ ${selectedApplicant.full_name}\n`;
            textSummary += `=`.repeat(50) + '\n\n';
            textSummary += `จำนวนเอกสารทั้งหมด:\n`;
            textSummary += `- NDA (FM-HRD-27): ${filteredFMHRD27.length} เอกสาร\n`;
            textSummary += `- FM-HRD-19: ${filteredFMHRD19.length} เอกสาร\n`;
            textSummary += `- SPS 1-03: ${filteredSPS103.length} เอกสาร\n`;
            textSummary += `- SPS 9-02: ${filteredSPS902.length} เอกสาร\n`;
            textSummary += `- ใบสมัครประกัน: ${filteredInsurance.length} เอกสาร\n`;
            textSummary += `- สัญญาจ้างงาน: ${filteredEmploymentContract.length} เอกสาร\n`;
            textSummary += `- FM-HRD-30: ${filteredFMHRD30.length} เอกสาร\n`;
            textSummary += `- หนังสือมอบอำนาจ: ${filteredCriminalCheck.length} เอกสาร\n\n`;
            textSummary += `หมายเหตุ: กรุณาเข้าระบบเพื่อดูและดาวน์โหลดเอกสาร PDF แต่ละฉบับ\n`;
            
            documentsFolder.file('README.txt', textSummary);
            
            // Generate and download ZIP
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            const url = URL.createObjectURL(zipBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${selectedApplicant.full_name}_Documents.zip`;
            link.click();
            URL.revokeObjectURL(url);
            
            alert(`ดาวน์โหลดข้อมูลเอกสารเรียบร้อยแล้ว\nรวม ${filteredFMHRD27.length + filteredFMHRD19.length + filteredSPS103.length + filteredSPS902.length + filteredInsurance.length + filteredEmploymentContract.length + filteredFMHRD30.length + filteredCriminalCheck.length} เอกสาร`);
            
        } catch (error) {
            console.error('Error downloading documents:', error);
            alert('เกิดข้อผิดพลาดในการดาวน์โหลดเอกสาร');
        } finally {
            setDownloadingAll(false);
        }
    };

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
                {/* Download All Button */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-slate-800">เอกสารของ {selectedApplicant.full_name}</h1>
                    <Button 
                        onClick={handleDownloadAll}
                        disabled={downloadingAll}
                        className="bg-indigo-600 hover:bg-indigo-700"
                    >
                        {downloadingAll ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                กำลังดาวน์โหลด...
                            </>
                        ) : (
                            <>
                                <Download className="w-4 h-4 mr-2" />
                                ดาวน์โหลดทุกเอกสาร
                            </>
                        )}
                    </Button>
                </div>
                {/* NDA Documents - FM-HRD-27 */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">เอกสาร NDA (FM-HRD-27)</h2>
                    {filteredFMHRD27.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredFMHRD27.map(doc => {
                                const applicant = selectedApplicant;
                                return (
                                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                                        <FileCheck className="w-6 h-6 text-indigo-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-lg">{applicant?.full_name || '-'}</h3>
                                                        <p className="text-sm text-slate-500">
                                                            สถานะ: {doc.status === 'approved' ? 'อนุมัติแล้ว' : doc.status === 'submitted' ? 'รอดำเนินการ' : 'แบบร่าง'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Badge variant={doc.status === 'approved' ? 'success' : doc.status === 'submitted' ? 'default' : 'secondary'}>
                                                        {doc.status === 'approved' ? 'อนุมัติแล้ว' : doc.status === 'submitted' ? 'รอดำเนินการ' : 'แบบร่าง'}
                                                    </Badge>
                                                    <Button 
                                                        onClick={() => onReviewFMHRD27?.(doc)}
                                                        size="sm"
                                                    >
                                                        ดูและเซ็น
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="p-8 text-center text-slate-500">
                                ยังไม่มีเอกสารที่ส่งมา
                            </CardContent>
                        </Card>
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

                {/* SPS 1-03 Documents */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">เอกสารประกันสังคม สปส. 1-03 (มีประกันอยู่แล้ว)</h2>
                    {filteredSPS103.length === 0 ? (
                        <Card>
                            <CardContent className="p-8 text-center text-slate-500">
                                ยังไม่มีเอกสารที่ส่งมา
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredSPS103.map(doc => {
                                const applicant = selectedApplicant;
                                const docData = doc.data || {};
                                return (
                                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                                                        <FileCheck className="w-6 h-6 text-pink-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-lg">{applicant?.full_name || '-'}</h3>
                                                        <div className="grid grid-cols-3 gap-4 mt-2 text-sm text-slate-600">
                                                            <div>
                                                                <p className="text-xs text-slate-500">ประเภทแบบฟอร์ม</p>
                                                                <p className="font-medium">{doc.pdf_type}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-slate-500">วันที่ส่ง</p>
                                                                <p className="font-medium">{doc.submitted_date ? new Date(doc.submitted_date).toLocaleDateString('th-TH') : '-'}</p>
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
                                                        onClick={() => applicant && onReviewSPS103?.(doc)}
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

                {/* SPS 9-02 Documents */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">เอกสารประกันสังคม สปส. 9-02 (ยังไม่มีประกัน)</h2>
                    {filteredSPS902.length === 0 ? (
                        <Card>
                            <CardContent className="p-8 text-center text-slate-500">
                                ยังไม่มีเอกสารที่ส่งมา
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredSPS902.map(doc => {
                                const applicant = selectedApplicant;
                                const docData = doc.data || {};
                                return (
                                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                                                        <FileCheck className="w-6 h-6 text-purple-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-lg">{applicant?.full_name || '-'}</h3>
                                                        <div className="grid grid-cols-3 gap-4 mt-2 text-sm text-slate-600">
                                                            <div>
                                                                <p className="text-xs text-slate-500">ประเภทแบบฟอร์ม</p>
                                                                <p className="font-medium">{doc.pdf_type}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-slate-500">วันที่ส่ง</p>
                                                                <p className="font-medium">{doc.submitted_date ? new Date(doc.submitted_date).toLocaleDateString('th-TH') : '-'}</p>
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
                                                        onClick={() => applicant && onReviewSPS902?.(doc)}
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

                {/* Insurance Enrollment Documents */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">ใบสมัครขอเอาประกันภัยพนักงาน</h2>
                    {filteredInsurance.length === 0 ? (
                        <Card>
                            <CardContent className="p-8 text-center text-slate-500">
                                ยังไม่มีเอกสารที่ส่งมา
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredInsurance.map(doc => {
                                const applicant = selectedApplicant;
                                const docData = doc.data || {};
                                return (
                                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center">
                                                        <FileCheck className="w-6 h-6 text-cyan-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-lg">{applicant?.full_name || '-'}</h3>
                                                        <div className="grid grid-cols-3 gap-4 mt-2 text-sm text-slate-600">
                                                            <div>
                                                                <p className="text-xs text-slate-500">บริษัท</p>
                                                                <p className="font-medium">{docData.employerName || '-'}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-slate-500">วันที่ส่ง</p>
                                                                <p className="font-medium">{doc.submitted_date ? new Date(doc.submitted_date).toLocaleDateString('th-TH') : '-'}</p>
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
                                                        onClick={() => applicant && onReviewInsurance?.(doc)}
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

                {/* Employment Contract Documents */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">สัญญาจ้างงาน</h2>
                    {filteredEmploymentContract.length === 0 ? (
                        <Card>
                            <CardContent className="p-8 text-center text-slate-500">
                                ยังไม่มีเอกสารที่ส่งมา
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredEmploymentContract.map(doc => {
                                const applicant = selectedApplicant;
                                const docData = doc.data || {};
                                return (
                                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                                        <FileCheck className="w-6 h-6 text-green-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-lg">{applicant?.full_name || '-'}</h3>
                                                        <div className="grid grid-cols-3 gap-4 mt-2 text-sm text-slate-600">
                                                            <div>
                                                                <p className="text-xs text-slate-500">ตำแหน่ง</p>
                                                                <p className="font-medium">{docData.position || '-'}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-slate-500">แผนก</p>
                                                                <p className="font-medium">{docData.department || '-'}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-slate-500">วันเริ่มงาน</p>
                                                                <p className="font-medium">{docData.workStartDate ? new Date(docData.workStartDate).toLocaleDateString('th-TH') : '-'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Badge variant={doc.status === 'approved' ? 'success' : doc.status === 'submitted' ? 'default' : 'secondary'}>
                                                        {doc.status === 'approved' ? 'อนุมัติแล้ว' : doc.status === 'submitted' ? 'รอดำเนินการ' : 'แบบร่าง'}
                                                    </Badge>
                                                    <Button 
                                                        onClick={() => applicant && onReviewEmploymentContract(applicant)}
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

                {/* FM-HRD-30 Documents */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">เอกสาร FM-HRD-30 (การตรวจประวัติอาชญากรรม)</h2>
                    {filteredFMHRD30.length === 0 ? (
                        <Card>
                            <CardContent className="p-8 text-center text-slate-500">
                                ยังไม่มีเอกสารที่ส่งมา
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredFMHRD30.map(doc => {
                                const applicant = selectedApplicant;
                                const docData = doc.data || {};
                                return (
                                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                                                        <FileCheck className="w-6 h-6 text-orange-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-lg">{applicant?.full_name || '-'}</h3>
                                                        <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-slate-600">
                                                            <div>
                                                                <p className="text-xs text-slate-500">รหัสพนักงาน</p>
                                                                <p className="font-medium">{docData.employeeId || '-'}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-slate-500">ตำแหน่ง</p>
                                                                <p className="font-medium">{docData.position || '-'}</p>
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
                                                        onClick={() => applicant && onReviewFMHRD30?.(applicant)}
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
                    {filteredCriminalCheck.length === 0 && criminalCheckDocs.length === 0 ? (
                        <Card>
                            <CardContent className="p-8 text-center text-slate-500">
                                ยังไม่มีเอกสารที่ส่งมา
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredCriminalCheck.map(doc => {
                                 const applicant = selectedApplicant;
                                 const docData = doc.data || {};
                                 return (
                                     <Card key={doc.id} className="hover:shadow-md transition-shadow">
                                         <CardContent className="p-6">
                                             <div className="flex items-center justify-between">
                                                 <div className="flex items-center gap-4 flex-1">
                                                     <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                                                         <FileCheck className="w-6 h-6 text-amber-600" />
                                                     </div>
                                                     <div className="flex-1">
                                                         <h3 className="font-semibold text-lg">{applicant?.full_name || '-'}</h3>
                                                         <div className="grid grid-cols-3 gap-4 mt-2 text-sm text-slate-600">
                                                             <div>
                                                                 <p className="text-xs text-slate-500">ชื่อบริษัท</p>
                                                                 <p className="font-medium">{docData.companyName || '-'}</p>
                                                             </div>
                                                             <div>
                                                                 <p className="text-xs text-slate-500">วัตถุประสงค์</p>
                                                                 <p className="font-medium">{docData.purpose || '-'}</p>
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
                                                         onClick={() => applicant && (onSetCriminalCheckDoc?.(doc), onReviewCriminalCheck?.(applicant))}
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
    const [reviewingCriminalCheckDoc, setReviewingCriminalCheckDoc] = useState(null);
    const [reviewingEmploymentContract, setReviewingEmploymentContract] = useState(null);
    const [reviewingFMHRD27Doc, setReviewingFMHRD27Doc] = useState(null);
    const [reviewingFMHRD30, setReviewingFMHRD30] = useState(null);
    const [reviewingSPS103Doc, setReviewingSPS103Doc] = useState(null);
    const [reviewingSPS902Doc, setReviewingSPS902Doc] = useState(null);
    const [reviewingInsuranceDoc, setReviewingInsuranceDoc] = useState(null);

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
                         onReviewEmploymentContract={setReviewingEmploymentContract}
                         onReviewFMHRD27={setReviewingFMHRD27Doc}
                         onReviewFMHRD30={setReviewingFMHRD30}
                         onSetCriminalCheckDoc={setReviewingCriminalCheckDoc}
                         onReviewSPS103={setReviewingSPS103Doc}
                         onReviewSPS902={setReviewingSPS902Doc}
                         onReviewInsurance={setReviewingInsuranceDoc}
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
                pdfDoc={reviewingCriminalCheckDoc}
                isOpen={!!reviewingCriminalCheck}
                onClose={() => {
                    setReviewingCriminalCheck(null);
                    setReviewingCriminalCheckDoc(null);
                }}
            />

            {/* Employment Contract Review Modal */}
             <EmploymentContractReviewModal 
                 applicant={reviewingEmploymentContract}
                 isOpen={!!reviewingEmploymentContract}
                 onClose={() => setReviewingEmploymentContract(null)}
             />

             {/* FM-HRD-27 NDA Review Modal */}
             {reviewingFMHRD27Doc && selectedApplicant && (
                 <NDAReviewModal
                     applicant={selectedApplicant}
                     isOpen={!!reviewingFMHRD27Doc}
                     onClose={() => setReviewingFMHRD27Doc(null)}
                 />
             )}

             {/* FM-HRD-30 Review Modal */}
             <FMHRD30ReviewModal 
                 applicant={reviewingFMHRD30}
                 isOpen={!!reviewingFMHRD30}
                 onClose={() => setReviewingFMHRD30(null)}
             />

             {/* SPS 1-03 Review Modal */}
             <SPSReviewModal 
                applicant={selectedApplicant}
                pdfDoc={reviewingSPS103Doc}
                isOpen={!!reviewingSPS103Doc}
                onClose={() => setReviewingSPS103Doc(null)}
             />

             {/* SPS 9-02 Review Modal */}
             <SPS902ReviewModal 
                applicant={selectedApplicant}
                pdfDoc={reviewingSPS902Doc}
                isOpen={!!reviewingSPS902Doc}
                onClose={() => setReviewingSPS902Doc(null)}
             />

             {/* Insurance Enrollment Review Modal */}
             <InsuranceEnrollmentReviewModal 
                applicant={selectedApplicant}
                pdfDoc={reviewingInsuranceDoc}
                isOpen={!!reviewingInsuranceDoc}
                onClose={() => setReviewingInsuranceDoc(null)}
             />
             </div>
            );
            }