import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Trash, Briefcase, HelpCircle, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SettingsPanel() {
    const queryClient = useQueryClient();

    // Job Positions
    const { data: jobs } = useQuery({
        queryKey: ['jobs_admin'],
        queryFn: () => base44.entities.JobPosition.list()
    });

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

    // Questions
    const { data: questions } = useQuery({
        queryKey: ['questions_admin'],
        queryFn: () => base44.entities.Question.list()
    });

    const createQuestion = useMutation({
        mutationFn: (data) => base44.entities.Question.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['questions_admin']);
            setNewQuestionText("");
        }
    });
    
    const deleteQuestion = useMutation({
        mutationFn: (id) => base44.entities.Question.delete(id),
        onSuccess: () => queryClient.invalidateQueries(['questions_admin'])
    });

    const [newJobTitle, setNewJobTitle] = useState("");
    const [newQuestionText, setNewQuestionText] = useState("");
    const [targetJobId, setTargetJobId] = useState("all");

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">ตั้งค่าระบบ</h2>
                <p className="text-slate-500">จัดการตำแหน่งงานและชุดคำถามสำหรับผู้สมัคร</p>
            </div>

            <div className="grid gap-8">
                {/* Job Positions Card */}
                <Card className="border-slate-200 shadow-sm overflow-hidden">
                    <CardHeader className="bg-slate-50 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-indigo-600" />
                            <CardTitle>ตำแหน่งงานที่เปิดรับ</CardTitle>
                        </div>
                        <CardDescription>เพิ่มหรือลบตำแหน่งงานที่ต้องการรับสมัคร</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="flex gap-3 mb-6">
                            <Input 
                                placeholder="ระบุชื่อตำแหน่งงานใหม่..." 
                                value={newJobTitle}
                                onChange={(e) => setNewJobTitle(e.target.value)}
                                className="max-w-md"
                            />
                            <Button onClick={() => newJobTitle && createJob.mutate({ title: newJobTitle, is_active: true })}>
                                <Plus className="w-4 h-4 mr-2" /> เพิ่มตำแหน่ง
                            </Button>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {jobs?.map(job => (
                                <div key={job.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-indigo-200 hover:shadow-sm transition-all group">
                                    <span className="font-medium text-slate-700">{job.title}</span>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => deleteJob.mutate(job.id)}
                                    >
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Questions Card */}
                <Card className="border-slate-200 shadow-sm overflow-hidden">
                    <CardHeader className="bg-slate-50 border-b border-slate-100">
                         <div className="flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-indigo-600" />
                            <CardTitle>ชุดคำถามสัมภาษณ์</CardTitle>
                        </div>
                        <CardDescription>จัดการคำถามสำหรับวิดีโอสัมภาษณ์</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100 mb-6">
                            <div className="space-y-2">
                                <Label>คำถามใหม่</Label>
                                <Input 
                                    placeholder="พิมพ์คำถามที่ต้องการ..." 
                                    value={newQuestionText}
                                    onChange={(e) => setNewQuestionText(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 space-y-2">
                                    <Label>ใช้สำหรับตำแหน่ง</Label>
                                    <Select value={targetJobId} onValueChange={setTargetJobId}>
                                        <SelectTrigger className="bg-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">ทุกตำแหน่ง (General)</SelectItem>
                                            {jobs?.map(job => (
                                                <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-end">
                                    <Button 
                                        onClick={() => newQuestionText && createQuestion.mutate({
                                            text: newQuestionText, 
                                            type: targetJobId === 'all' ? 'general' : 'position_specific',
                                            job_position_id: targetJobId === 'all' ? null : targetJobId,
                                            is_active: true
                                        })}
                                        className="w-full sm:w-auto"
                                    >
                                        <Plus className="w-4 h-4 mr-2" /> เพิ่มคำถาม
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                             {questions?.map(q => (
                                <div key={q.id} className="flex items-start justify-between p-4 bg-white rounded-lg border border-slate-200 hover:border-indigo-200 hover:shadow-sm transition-all group">
                                    <div className="space-y-1">
                                        <p className="font-medium text-slate-800">{q.text}</p>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="text-[10px] font-normal bg-slate-100 text-slate-500">
                                                {q.type === 'general' ? 'General' : 'Specific Position'}
                                            </Badge>
                                            {q.job_position_id && (
                                                <span className="text-xs text-indigo-600 font-medium">
                                                    For: {jobs?.find(j => j.id === q.job_position_id)?.title || q.job_position_id}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => deleteQuestion.mutate(q.id)}
                                    >
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}