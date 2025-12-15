import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormStep2({ data, updateData }) {
    return (
    <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-900 border-b pb-2 mb-4">ส่วนที่ 2: ประวัติการศึกษา</h3>
        <div className="space-y-2">
            <Label>มหาวิทยาลัย / สถาบัน</Label>
            <Input value={data.university} onChange={(e) => updateData('education_data', 'university', e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>คณะ</Label>
                <Input value={data.faculty} onChange={(e) => updateData('education_data', 'faculty', e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>สาขาวิชา</Label>
                <Input value={data.major} onChange={(e) => updateData('education_data', 'major', e.target.value)} />
            </div>
        </div>
        <div className="space-y-2">
            <Label>เกรดเฉลี่ย (GPA)</Label>
            <Input value={data.gpa} onChange={(e) => updateData('education_data', 'gpa', e.target.value)} placeholder="0.00" />
        </div>
    </div>
    );
}