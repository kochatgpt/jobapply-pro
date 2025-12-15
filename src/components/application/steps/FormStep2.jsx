import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function FormStep2({ data, familyData, updateData }) {
    return (
    <div className="space-y-6">
        {/* Family Status Section */}
        <div className="space-y-3">
             <h3 className="text-xl font-bold text-slate-900 border-b pb-2 mb-3">สถานะครอบครัว</h3>
             <div className="grid md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                     <Label>สถานภาพ</Label>
                     <RadioGroup 
                        value={familyData?.marital_status} 
                        onValueChange={(val) => updateData('family_data', 'marital_status', val)}
                        className="flex gap-4"
                     >
                         <div className="flex items-center space-x-2">
                             <RadioGroupItem value="single" id="single" />
                             <Label htmlFor="single" className="font-normal cursor-pointer">โสด</Label>
                         </div>
                         <div className="flex items-center space-x-2">
                             <RadioGroupItem value="married" id="married" />
                             <Label htmlFor="married" className="font-normal cursor-pointer">แต่งงานแล้ว</Label>
                         </div>
                     </RadioGroup>
                 </div>

                 <div className="space-y-2">
                      <Label>บุตร</Label>
                      <div className="flex items-center space-x-2">
                         <Checkbox 
                            id="has_children" 
                            checked={familyData?.has_children === 'yes'} 
                            onCheckedChange={(checked) => updateData('family_data', 'has_children', checked ? 'yes' : 'no')} 
                         />
                         <Label htmlFor="has_children" className="font-normal cursor-pointer">มีบุตรแล้ว</Label>
                      </div>
                 </div>
             </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 border-b pb-2 mb-3">ส่วนที่ 2: ประวัติการศึกษา</h3>
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