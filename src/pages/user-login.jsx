import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Lock, User, Calendar } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function UserLogin() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [idCardLast6, setIdCardLast6] = useState('');
    const [error, setError] = useState('');

    const { data: applicants = [] } = useQuery({
        queryKey: ['applicants_for_login'],
        queryFn: () => base44.entities.Applicant.list()
    });

    // Filter applicants based on search
    const filteredApplicants = applicants.filter(app => {
        if (!searchTerm) return false;
        const fullName = app.full_name?.toLowerCase() || '';
        const englishName = app.personal_data?.english_name?.toLowerCase() || '';
        return fullName.includes(searchTerm.toLowerCase()) || 
               englishName.includes(searchTerm.toLowerCase());
    });

    // Format date to show only day and month (no year)
    const formatDayMonth = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('th-TH', { day: 'numeric', month: 'long' });
    };

    const handleSelectApplicant = (applicant) => {
        setSelectedApplicant(applicant);
        setError('');
        setIdCardLast6('');
    };

    const handleLogin = () => {
        if (!selectedApplicant) {
            setError('กรุณาเลือกชื่อของคุณ');
            return;
        }

        if (idCardLast6.length !== 6) {
            setError('กรุณากรอกเลขบัตรประชาชน 6 ตัวท้าย');
            return;
        }

        const idCard = selectedApplicant.personal_data?.id_card || '';
        const last6 = idCard.slice(-6);

        if (idCardLast6 === last6) {
            // Login successful
            localStorage.setItem('user_applicant_id', selectedApplicant.id);
            navigate('/user-dashboard');
        } else {
            setError('เลขบัตรประชาชนไม่ถูกต้อง');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-xl">
                <CardHeader className="text-center pb-4">
                    <CardTitle className="text-3xl font-bold text-slate-800">เข้าสู่ระบบพนักงานใหม่</CardTitle>
                    <p className="text-slate-500 mt-2">กรุณาค้นหาชื่อของคุณและยืนยันตัวตน</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Search Section */}
                    {!selectedApplicant && (
                        <div className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                <Input 
                                    placeholder="ค้นหาชื่อของคุณ (ชื่อไทยหรืออังกฤษ)"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 h-12 text-lg"
                                />
                            </div>

                            {/* Search Results */}
                            {searchTerm && (
                                <div className="border border-slate-200 rounded-lg max-h-96 overflow-y-auto">
                                    {filteredApplicants.length === 0 ? (
                                        <div className="p-8 text-center text-slate-400">
                                            ไม่พบข้อมูล
                                        </div>
                                    ) : (
                                        <div className="divide-y">
                                            {filteredApplicants.map(applicant => (
                                                <div
                                                    key={applicant.id}
                                                    onClick={() => handleSelectApplicant(applicant)}
                                                    className="p-4 hover:bg-indigo-50 cursor-pointer transition-colors"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                                            {applicant.photo_url ? (
                                                                <img src={applicant.photo_url} className="w-full h-full rounded-full object-cover" alt="" />
                                                            ) : (
                                                                <User className="w-6 h-6 text-slate-400" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-semibold text-slate-800">{applicant.full_name}</div>
                                                            <div className="text-sm text-slate-500">
                                                                {applicant.personal_data?.english_name}
                                                            </div>
                                                            <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                                                <Calendar className="w-3 h-3" />
                                                                {formatDayMonth(applicant.personal_data?.dob)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ID Card Verification */}
                    {selectedApplicant && (
                        <div className="space-y-6">
                            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0">
                                        {selectedApplicant.photo_url ? (
                                            <img src={selectedApplicant.photo_url} className="w-full h-full rounded-full object-cover" alt="" />
                                        ) : (
                                            <User className="w-8 h-8 text-slate-400" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-slate-800 text-lg">{selectedApplicant.full_name}</div>
                                        <div className="text-sm text-slate-600">{selectedApplicant.personal_data?.english_name}</div>
                                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                            <Calendar className="w-3 h-3" />
                                            {formatDayMonth(selectedApplicant.personal_data?.dob)}
                                        </div>
                                    </div>
                                    <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => setSelectedApplicant(null)}
                                    >
                                        เปลี่ยน
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Lock className="w-4 h-4" />
                                    กรอกเลขบัตรประชาชน 6 ตัวท้าย
                                </label>
                                <Input 
                                    type="text"
                                    placeholder="••••••"
                                    value={idCardLast6}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        if (value.length <= 6) {
                                            setIdCardLast6(value);
                                            setError('');
                                        }
                                    }}
                                    className="h-12 text-lg text-center tracking-widest"
                                    maxLength={6}
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <Button 
                                onClick={handleLogin}
                                className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-700"
                            >
                                เข้าสู่ระบบ
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}