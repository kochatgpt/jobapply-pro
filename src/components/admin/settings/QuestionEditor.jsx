import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Video, Type, CheckSquare, List } from "lucide-react";

export default function QuestionEditor({ onSave, onCancel, initialData, jobId = null }) {
    const [text, setText] = useState(initialData?.text || "");
    const [answerType, setAnswerType] = useState(initialData?.answer_type || "text");
    const [options, setOptions] = useState(initialData?.options || [""]);

    const handleAddOption = () => setOptions([...options, ""]);
    const handleRemoveOption = (index) => setOptions(options.filter((_, i) => i !== index));
    const handleOptionChange = (index, value) => {
        const newOpts = [...options];
        newOpts[index] = value;
        setOptions(newOpts);
    };

    const handleSave = () => {
        if (!text.trim()) return;
        
        const payload = {
            text,
            answer_type: answerType,
            type: jobId ? 'position_specific' : 'general',
            job_position_id: jobId,
            is_active: true,
            // Filter out empty options if choice type
            options: (answerType === 'single_choice' || answerType === 'multiple_choice') 
                ? options.filter(o => o.trim()) 
                : []
        };
        onSave(payload);
    };

    return (
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="space-y-2">
                <Label>คำถาม</Label>
                <Input 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder="ระบุคำถาม..."
                    autoFocus
                />
            </div>

            <div className="space-y-2">
                <Label>รูปแบบคำตอบ</Label>
                <Select value={answerType} onValueChange={setAnswerType}>
                    <SelectTrigger className="bg-white">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="text">
                            <div className="flex items-center gap-2"><Type className="w-4 h-4"/> ข้อความ (Text)</div>
                        </SelectItem>
                        <SelectItem value="single_choice">
                            <div className="flex items-center gap-2"><List className="w-4 h-4"/> ตัวเลือกเดียว (Single Choice)</div>
                        </SelectItem>
                        <SelectItem value="multiple_choice">
                            <div className="flex items-center gap-2"><CheckSquare className="w-4 h-4"/> หลายตัวเลือก (Multiple Choice)</div>
                        </SelectItem>
                        <SelectItem value="video">
                            <div className="flex items-center gap-2"><Video className="w-4 h-4"/> อัดวิดีโอ (Video)</div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {(answerType === 'single_choice' || answerType === 'multiple_choice') && (
                <div className="space-y-2 pl-4 border-l-2 border-indigo-200">
                    <Label>ตัวเลือกคำตอบ</Label>
                    {options.map((opt, i) => (
                        <div key={i} className="flex gap-2">
                            <Input 
                                value={opt} 
                                onChange={(e) => handleOptionChange(i, e.target.value)}
                                placeholder={`ตัวเลือกที่ ${i + 1}`}
                                className="bg-white"
                            />
                            {options.length > 1 && (
                                <Button variant="ghost" size="icon" onClick={() => handleRemoveOption(i)} className="text-slate-400 hover:text-red-500">
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={handleAddOption} className="mt-2 text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                        <Plus className="w-4 h-4 mr-2" /> เพิ่มตัวเลือก
                    </Button>
                </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={onCancel}>ยกเลิก</Button>
                <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">บันทึก</Button>
            </div>
        </div>
    );
}