import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash, Plus, Video, Type, List, CheckSquare, Edit2 } from "lucide-react";
import QuestionEditor from './QuestionEditor';

export default function QuestionList({ questions, jobId = null, title = "คำถาม" }) {
    const queryClient = useQueryClient();
    const [isAdding, setIsAdding] = useState(false);

    const createQuestion = useMutation({
        mutationFn: (data) => base44.entities.Question.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['questions_admin']);
            setIsAdding(false);
        }
    });

    const deleteQuestion = useMutation({
        mutationFn: (id) => base44.entities.Question.delete(id),
        onSuccess: () => queryClient.invalidateQueries(['questions_admin'])
    });

    const getIcon = (type) => {
        switch (type) {
            case 'video': return <Video className="w-4 h-4 text-purple-500" />;
            case 'single_choice': return <List className="w-4 h-4 text-blue-500" />;
            case 'multiple_choice': return <CheckSquare className="w-4 h-4 text-green-500" />;
            default: return <Type className="w-4 h-4 text-slate-500" />;
        }
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case 'video': return 'Video';
            case 'single_choice': return 'Choice';
            case 'multiple_choice': return 'Multi-Select';
            default: return 'Text';
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-slate-700">{title}</h3>
                {!isAdding && (
                    <Button size="sm" onClick={() => setIsAdding(true)} variant="outline" className="border-dashed border-indigo-300 text-indigo-600 bg-indigo-50 hover:bg-indigo-100">
                        <Plus className="w-4 h-4 mr-2" /> เพิ่มคำถาม
                    </Button>
                )}
            </div>

            {isAdding && (
                <QuestionEditor 
                    onSave={(data) => createQuestion.mutate(data)}
                    onCancel={() => setIsAdding(false)}
                    jobId={jobId}
                />
            )}

            <div className="space-y-2">
                {questions.length === 0 && !isAdding && (
                    <div className="text-center p-4 text-slate-400 text-sm bg-slate-50 rounded-lg border border-dashed">
                        ยังไม่มีคำถามในส่วนนี้
                    </div>
                )}
                {questions.map(q => (
                    <div key={q.id} className="flex items-start justify-between p-3 bg-white rounded-lg border border-slate-200 shadow-sm group hover:border-indigo-200 transition-colors">
                        <div className="space-y-1">
                            <div className="font-medium text-slate-800 flex items-center gap-2">
                                {getIcon(q.answer_type)}
                                <span>{q.text}</span>
                            </div>
                            <div className="flex gap-2">
                                <Badge variant="secondary" className="text-[10px] h-5 font-normal">
                                    {getTypeLabel(q.answer_type)}
                                </Badge>
                                {(q.answer_type === 'single_choice' || q.answer_type === 'multiple_choice') && (
                                    <span className="text-xs text-slate-500">
                                        {q.options?.length || 0} ตัวเลือก
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
        </div>
    );
}