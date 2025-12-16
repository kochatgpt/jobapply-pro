import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Users, Settings as SettingsIcon, LayoutDashboard } from "lucide-react";

import ApplicantList from '@/components/admin/ApplicantList';
import ApplicantDetail from '@/components/admin/ApplicantDetail';
import SettingsPanel from '@/components/admin/SettingsPanel';

export default function AdminPage() {
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [activeView, setActiveView] = useState("dashboard"); // dashboard, settings

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
                ) : (
                    <div className="h-full overflow-y-auto">
                        <SettingsPanel />
                    </div>
                )}
            </div>
        </div>
    );
}