import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Filter, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

export default function ApplicantList({ onSelect, selectedId }) {
    const [filterDate, setFilterDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [searchTerm, setSearchTerm] = useState("พีรพล สมชาย");

    const { data: applicants, isLoading } = useQuery({
        queryKey: ['applicants_list'],
        queryFn: async () => {
             return await base44.entities.Applicant.list('-submission_date'); 
        }
    });

    const filteredApplicants = applicants?.filter(app => {
        const matchesDate = filterDate ? app.submission_date === filterDate : true;
        const matchesSearch = searchTerm ? 
            app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            app.personal_data?.email?.toLowerCase().includes(searchTerm.toLowerCase())
            : true;
        return matchesDate && matchesSearch;
    });

    return (
        <div className="flex flex-col h-full bg-white border-r border-slate-200 w-full md:w-80 lg:w-96 shrink-0">
            <div className="p-4 border-b border-slate-200 space-y-3 bg-slate-50/50">
                <h2 className="font-bold text-slate-800">ผู้สมัคร ({filteredApplicants?.length || 0})</h2>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input 
                        placeholder="ค้นหาชื่อ..." 
                        className="pl-9 bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <Input 
                            type="date" 
                            className="bg-white"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {isLoading ? (
                    <div className="p-4 text-center text-slate-400">กำลังโหลด...</div>
                ) : filteredApplicants?.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-sm">ไม่พบผู้สมัคร</div>
                ) : (
                    filteredApplicants?.map(app => (
                        <div 
                            key={app.id}
                            onClick={() => onSelect(app)}
                            className={`
                                group p-3 rounded-xl cursor-pointer transition-all duration-200 border
                                ${selectedId === app.id 
                                    ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                                    : 'bg-white border-transparent hover:border-slate-200 hover:bg-slate-50'
                                }
                            `}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`
                                    w-10 h-10 rounded-full flex items-center justify-center shrink-0 overflow-hidden border
                                    ${selectedId === app.id ? 'border-indigo-200' : 'border-slate-100'}
                                `}>
                                    {app.photo_url ? (
                                        <img src={app.photo_url} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-5 h-5 text-slate-400" />
                                    )}
                                </div>
                                <div className="overflow-hidden min-w-0 flex-1">
                                    <h3 className={`font-semibold text-sm truncate ${selectedId === app.id ? 'text-indigo-900' : 'text-slate-900'}`}>
                                        {app.full_name}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant="secondary" className="text-[10px] px-1.5 h-5 font-normal bg-slate-100 text-slate-500">
                                            {app.submission_date}
                                        </Badge>
                                        <span className={`text-xs truncate ${selectedId === app.id ? 'text-indigo-600' : 'text-slate-500'}`}>
                                            {app.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}