import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Trash, Briefcase, FileQuestion, ChevronDown, ChevronRight, Image as ImageIcon, Upload } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import QuestionList from './settings/QuestionList';

export default function SettingsPanel() {
    const queryClient = useQueryClient();

    // Data Fetching
    const { data: jobs } = useQuery({
        queryKey: ['jobs_admin'],
        queryFn: () => base44.entities.JobPosition.list()
    });

    const { data: questions } = useQuery({
        queryKey: ['questions_admin'],
        queryFn: () => base44.entities.Question.list()
    });

    const { data: systemSettings } = useQuery({
        queryKey: ['system_settings'],
        queryFn: () => base44.entities.SystemSetting.list()
    });

    // Logo Management
    const [uploadingLogo, setUploadingLogo] = useState(false);
    
    const updateLogo = useMutation({
        mutationFn: async (file) => {
            setUploadingLogo(true);
            try {
                const { file_url } = await base44.integrations.Core.UploadFile({ file });
                const logoSetting = systemSettings?.find(s => s.key === 'app_logo');
                
                if (logoSetting) {
                    await base44.entities.SystemSetting.update(logoSetting.id, { value: file_url });
                } else {
                    await base44.entities.SystemSetting.create({ 
                        key: 'app_logo', 
                        value: file_url,
                        description: 'Application Logo'
                    });
                }
                return file_url;
            } finally {
                setUploadingLogo(false);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['system_settings']);
            // Force reload to update layout if needed, or rely on react-query if layout uses it
             window.dispatchEvent(new Event('logo-updated'));
        }
    });

    const appLogo = systemSettings?.find(s => s.key === 'app_logo')?.value;

    // Mutations
    const createJob = useMutation({
        mutationFn: (data) => base44.entities.JobPosition.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['jobs_admin']);
            setNewJobTitle("");
        }
    });

    const deleteJob = useMutation({
        mutationFn: (id) => base44.entities.JobPosition.delete(id),
        onSuccess: () => queryClient.invalidateQueries(['jobs_admin'])
    });

    const updateJob = useMutation({
        mutationFn: ({ id, ...data }) => base44.entities.JobPosition.update(id, data),
        onSuccess: () => queryClient.invalidateQueries(['jobs_admin'])
    });

    const [newJobTitle, setNewJobTitle] = useState("");
    const [openJobId, setOpenJobId] = useState(null);

    // Derived Data
    const generalQuestions = questions?.filter(q => q.type === 'general') || [];
    
    const getJobQuestions = (jobId) => {
        return questions?.filter(q => q.type === 'position_specific' && q.job_position_id === jobId) || [];
    };

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">ตั้งค่าระบบ (System Settings)</h2>
                <p className="text-slate-500">จัดการชุดคำถามทั่วไปและตำแหน่งงาน</p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-xl mb-6">
                    <TabsTrigger value="branding" className="gap-2">
                        <ImageIcon className="w-4 h-4"/> โลโก้ (Branding)
                    </TabsTrigger>
                    <TabsTrigger value="general" className="gap-2">
                        <FileQuestion className="w-4 h-4"/> คำถามทั่วไป (General)
                    </TabsTrigger>
                    <TabsTrigger value="jobs" className="gap-2">
                        <Briefcase className="w-4 h-4"/> ตำแหน่งงาน (Positions)
                    </TabsTrigger>
                </TabsList>

                {/* Part 0: Branding */}
                <TabsContent value="branding" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>ตั้งค่าโลโก้ (Default Logo)</CardTitle>
                            <CardDescription>
                                โลโก้นี้จะแสดงที่ส่วนหัวของเว็บไซต์และในเอกสาร PDF
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-8">
                                <div className="w-32 h-32 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 overflow-hidden relative group">
                                    {appLogo ? (
                                        <img src={appLogo} alt="App Logo" className="w-full h-full object-contain p-2" />
                                    ) : (
                                        <ImageIcon className="w-8 h-8 text-slate-300" />
                                    )}
                                    {uploadingLogo && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">
                                            Uploading...
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-slate-900">อัปโหลดโลโก้ใหม่</h4>
                                        <p className="text-sm text-slate-500">แนะนำขนาด 512x512px หรือไฟล์ PNG พื้นหลังใส</p>
                                    </div>
                                    <div className="relative">
                                        <Input 
                                            type="file" 
                                            accept="image/*"
                                            className="hidden" 
                                            id="logo-upload"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) updateLogo.mutate(file);
                                            }}
                                        />
                                        <Button asChild variant="outline" disabled={uploadingLogo}>
                                            <label htmlFor="logo-upload" className="cursor-pointer">
                                                <Upload className="w-4 h-4 mr-2" />
                                                เลือกรูปภาพ
                                            </label>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Part 1: General Questions */}
                <TabsContent value="general" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>คำถามส่วนกลาง</CardTitle>
                            <CardDescription>
                                คำถามเหล่านี้จะถูกถามกับผู้สมัครทุกคน ไม่ว่าจะสมัครตำแหน่งใด
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <QuestionList questions={generalQuestions} title="รายการคำถามทั่วไป" />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Part 2: Job Positions & Specific Questions */}
                <TabsContent value="jobs" className="space-y-6">
                    {/* Add Job Section */}
                    <Card className="bg-slate-50 border-dashed">
                        <CardContent className="p-6 flex gap-4 items-end">
                            <div className="flex-1 space-y-2">
                                <label className="text-sm font-medium text-slate-700">เพิ่มตำแหน่งงานใหม่</label>
                                <Input 
                                    placeholder="ชื่อตำแหน่งงาน... (เช่น Sales Manager)" 
                                    value={newJobTitle}
                                    onChange={(e) => setNewJobTitle(e.target.value)}
                                    className="bg-white"
                                />
                            </div>
                            <Button 
                                onClick={() => newJobTitle && createJob.mutate({ title: newJobTitle, is_active: true })}
                                disabled={!newJobTitle.trim()}
                                className="bg-indigo-600 hover:bg-indigo-700"
                            >
                                <Plus className="w-4 h-4 mr-2" /> สร้างตำแหน่ง
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Jobs List */}
                    <div className="grid gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {jobs?.map(job => (
                            <Collapsible 
                                key={job.id} 
                                open={openJobId === job.id}
                                onOpenChange={(isOpen) => setOpenJobId(isOpen ? job.id : null)}
                                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                            >
                                <div className="flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors">
                                    <CollapsibleTrigger asChild>
                                        <button className="flex items-center gap-3 flex-1 text-left">
                                            {openJobId === job.id ? <ChevronDown className="w-5 h-5 text-indigo-500"/> : <ChevronRight className="w-5 h-5 text-slate-400"/>}
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className={`font-semibold ${!job.is_active ? 'text-slate-400' : 'text-slate-900'}`}>{job.title}</h3>
                                                    {!job.is_active && <Badge variant="secondary" className="text-[10px]">Inactive</Badge>}
                                                </div>
                                                <p className="text-sm text-slate-500">{getJobQuestions(job.id).length} คำถามเฉพาะตำแหน่ง</p>
                                            </div>
                                        </button>
                                    </CollapsibleTrigger>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                            <Switch 
                                                checked={job.is_active !== false}
                                                onCheckedChange={(checked) => updateJob.mutate({ id: job.id, is_active: checked })}
                                            />
                                        </div>
                                        <Button 
                                            variant="ghost" 
                                            size="icon"
                                            className="text-slate-400 hover:text-red-500 border-l pl-2 ml-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if(confirm('คุณแน่ใจหรือไม่ที่จะลบตำแหน่งนี้?')) deleteJob.mutate(job.id);
                                            }}
                                        >
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                <CollapsibleContent className="border-t border-slate-100 bg-slate-50/50 p-6 animate-in slide-in-from-top-2">
                                    <QuestionList 
                                        questions={getJobQuestions(job.id)} 
                                        jobId={job.id} 
                                        title={`คำถามสำหรับ ${job.title}`} 
                                    />
                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}