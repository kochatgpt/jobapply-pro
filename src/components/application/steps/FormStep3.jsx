import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FormStep3({ data, updateData }) {
    return (
    <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-900 border-b pb-2 mb-4">ส่วนที่ 3: ข้อมูลเพิ่มเติม</h3>
        <div className="space-y-2">
            <Label>โรคประจำตัว</Label>
            <Input value={data.diseases} onChange={(e) => updateData('health_data', 'diseases', e.target.value)} placeholder="ไม่มี ให้ระบุว่า -" />
        </div>
        <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label>การดื่มแอลกอฮอล์</Label>
                <Select value={data.alcohol} onValueChange={(v) => updateData('health_data', 'alcohol', v)}>
                    <SelectTrigger><SelectValue placeholder="เลือก" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ไม่ดื่ม">ไม่ดื่ม</SelectItem>
                        <SelectItem value="ดื่มสังสรรค์">ดื่มสังสรรค์</SelectItem>
                        <SelectItem value="ดื่มเป็นประจำ">ดื่มเป็นประจำ</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label>การสูบบุหรี่</Label>
                 <Select value={data.smoking} onValueChange={(v) => updateData('health_data', 'smoking', v)}>
                    <SelectTrigger><SelectValue placeholder="เลือก" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ไม่สูบ">ไม่สูบ</SelectItem>
                        <SelectItem value="สูบ">สูบ</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div className="space-y-2">
            <Label>ประวัติครอบครัว (โดยย่อ)</Label>
            <Textarea value={data.family_history} onChange={(e) => updateData('health_data', 'family_history', e.target.value)} placeholder="บิดา/มารดา อาชีพ..." />
        </div>
    </div>
    );
}