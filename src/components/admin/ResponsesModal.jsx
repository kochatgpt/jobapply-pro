import React from 'react';
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { X, MessageSquare, Video, CheckSquare } from "lucide-react";

export default function ResponsesModal({ applicant, onClose }) {
    if (!applicant) return null;

    const responses = applicant.responses || [];

    const getAnswerTypeIcon = (type) => {
        switch(type) {
            case 'video': return <Video className="w-4 h-4" />;
            case 'text': return <MessageSquare className="w-4 h-4" />;
            case 'single_choice':
            case 'multiple_choice': return <CheckSquare className="w-4 h-4" />;
            default: return <MessageSquare className="w-4 h-4" />;
        }
    };

    const getAnswerTypeBadge = (type) => {
        const badges = {
            'video': { label: 'วิดีโอ', color: 'bg-purple-100 text-purple-700' },
            'text': { label: 'ข้อความ', color: 'bg-blue-100 text-blue-700' },
            'single_choice': { label: 'เลือกคำตอบเดียว', color: 'bg-green-100 text-green-700' },
            'multiple_choice': { label: 'เลือกหลายคำตอบ', color: 'bg-amber-100 text-amber-700' }
        };
        const badge = badges[type] || badges['text'];
        return <Badge className={`${badge.color} hover:${badge.color}`}>{badge.label}</Badge>;
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-lg z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">คำตอบของผู้สมัคร</h2>
                        <p className="text-sm text-slate-500 mt-1">{applicant.full_name}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {responses.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                            <MessageSquare className="w-16 h-16 mb-4" />
                            <p>ไม่มีคำตอบ</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {responses.map((response, index) => (
                                <div key={index} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                                    {/* Question Header */}
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold text-sm">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                {getAnswerTypeIcon(response.type)}
                                                {getAnswerTypeBadge(response.type)}
                                            </div>
                                            <h3 className="font-semibold text-slate-900 text-lg">
                                                {response.question}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Answer Content */}
                                    <div className="ml-11 pl-4 border-l-2 border-slate-200">
                                        {response.type === 'video' && response.url ? (
                                            <div className="space-y-3">
                                                <video 
                                                    controls 
                                                    className="w-full max-w-2xl rounded-lg border border-slate-200"
                                                    src={response.url}
                                                >
                                                    Your browser does not support the video tag.
                                                </video>
                                                {response.answer && (
                                                    <p className="text-sm text-slate-500 italic">
                                                        หมายเหตุ: {response.answer}
                                                    </p>
                                                )}
                                            </div>
                                        ) : response.answer ? (
                                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                                <p className="text-slate-700 whitespace-pre-wrap">
                                                    {response.answer}
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="text-slate-400 italic">ไม่มีคำตอบ</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex justify-end rounded-b-lg">
                    <Button onClick={onClose} variant="outline">
                        ปิด
                    </Button>
                </div>
            </div>
        </div>
    );
}