import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function FormStep2({ data, familyData, skillsData, trainingData, updateData }) {
    
    // Helper to update education history safely
    const updateEdu = (key, field, value) => {
        const currentHistory = data?.history || {};
        const updatedRow = { ...currentHistory[key], [field]: value };
        updateData('education_data', 'history', { ...currentHistory, [key]: updatedRow });
    };

    // Helper to update skills
    const updateSkills = (category, field, value) => {
        const currentCategory = skillsData?.[category] || {};
        updateData('skills_data', category, { ...currentCategory, [field]: value });
    };
    
    // Helper to update training
    const updateTraining = (index, field, value) => {
        const currentHistory = [...(trainingData?.history || [])];
        if (!currentHistory[index]) currentHistory[index] = { course: '', institute: '', duration: '' };
        currentHistory[index] = { ...currentHistory[index], [field]: value };
        updateData('training_data', 'history', currentHistory);
    };

    const eduLevels = [
        { key: 'primary', label: 'ประถมศึกษา' },
        { key: 'secondary', label: 'มัธยมศึกษา' },
        { key: 'vocational', label: 'ปวช.' },
        { key: 'diploma', label: 'ปวส.' },
        { key: 'bachelor', label: 'ปริญญาตรี' },
        { key: 'master', label: 'ปริญญาโท' },
        { key: 'doctoral', label: 'ปริญญาเอก' },
        { key: 'current', label: 'กำลังศึกษา' },
    ];

    return (
    <div className="space-y-5">
        {/* 1. Family Status */}
        <div className="space-y-3">
             <h3 className="text-lg font-bold text-slate-900 border-b pb-1">สถานะครอบครัว</h3>
             <div className="grid md:grid-cols-2 gap-4 items-end">
                 <div className="space-y-1">
                     <Label>สถานภาพ</Label>
                     <Select 
                        value={familyData?.marital_status} 
                        onValueChange={(val) => updateData('family_data', 'marital_status', val)}
                     >
                        <SelectTrigger className="h-9">
                            <SelectValue placeholder="เลือกสถานะ" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="single">โสด</SelectItem>
                            <SelectItem value="married">แต่งงานแล้ว</SelectItem>
                        </SelectContent>
                     </Select>
                 </div>

                 <div className="flex items-center space-x-2 pb-2">
                     <Checkbox 
                        id="has_children" 
                        checked={familyData?.has_children === 'yes'} 
                        onCheckedChange={(checked) => updateData('family_data', 'has_children', checked ? 'yes' : 'no')} 
                     />
                     <Label htmlFor="has_children" className="font-normal cursor-pointer text-sm">มีบุตรแล้ว</Label>
                 </div>
             </div>
             
             {/* Conditional Fields for Married */}
             {familyData?.marital_status === 'married' && (
                <div className="bg-slate-50 p-3 rounded-lg border grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <div className="space-y-1">
                        <Label>ชื่อ-สกุล (สามี/ภรรยา)</Label>
                        <Input 
                            className="h-9"
                            value={familyData?.spouse_name || ''} 
                            onChange={(e) => updateData('family_data', 'spouse_name', e.target.value)}
                            placeholder="กรุณาระบุชื่อ-สกุล"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>อาชีพ</Label>
                        <Input 
                            className="h-9"
                            value={familyData?.spouse_occupation || ''} 
                            onChange={(e) => updateData('family_data', 'spouse_occupation', e.target.value)}
                            placeholder="กรุณาระบุอาชีพ"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>สถานที่ทำงาน</Label>
                        <Input 
                            className="h-9"
                            value={familyData?.spouse_workplace || ''} 
                            onChange={(e) => updateData('family_data', 'spouse_workplace', e.target.value)}
                            placeholder="กรุณาระบุสถานที่ทำงาน"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>เบอร์โทรศัพท์ที่สามารถติดต่อได้</Label>
                        <Input 
                            className="h-9"
                            value={familyData?.spouse_phone || ''} 
                            onChange={(e) => updateData('family_data', 'spouse_phone', e.target.value)}
                            placeholder="กรุณาระบุเบอร์โทรศัพท์"
                        />
                    </div>
                </div>
             )}

             {/* Conditional Fields for Children */}
             {familyData?.has_children === 'yes' && (
                <div className="bg-slate-50 p-3 rounded-lg border grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                     <div className="space-y-1">
                        <Label>จำนวนบุตร (คน)</Label>
                        <Input 
                            className="h-9"
                            type="number"
                            value={familyData?.children_count || ''} 
                            onChange={(e) => updateData('family_data', 'children_count', e.target.value)}
                            placeholder="ระบุจำนวนบุตร"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>ปัจจุบันอยู่ในความดูแลของบุคคลใด</Label>
                        <Input 
                            className="h-9"
                            value={familyData?.children_caretaker || ''} 
                            onChange={(e) => updateData('family_data', 'children_caretaker', e.target.value)}
                            placeholder="เช่น คุณย่า / คนอื่น หรือตนเอง"
                        />
                    </div>
                </div>
             )}
        </div>

        {/* 2. Education History */}
        <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-1">ประวัติการศึกษา</h3>
            <div className="rounded-md border overflow-x-auto">
                <Table className="min-w-[800px]">
                    <TableHeader>
                        <TableRow className="bg-slate-50 hover:bg-slate-50">
                            <TableHead className="w-[150px] py-2 h-9">ระดับ</TableHead>
                            <TableHead className="py-2 h-9">ชื่อสถานศึกษา</TableHead>
                            <TableHead className="py-2 h-9">สาขาวิชา</TableHead>
                            <TableHead className="w-[100px] py-2 h-9">เริ่ม (พ.ศ.)</TableHead>
                            <TableHead className="w-[100px] py-2 h-9">จบ (พ.ศ.)</TableHead>
                            <TableHead className="w-[80px] py-2 h-9">เกรด</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {eduLevels.map((level) => (
                            <TableRow key={level.key}>
                                <TableCell className="font-medium py-2">{level.label}</TableCell>
                                <TableCell className="py-2"><Input className="h-8" value={data?.history?.[level.key]?.institute || ''} onChange={e => updateEdu(level.key, 'institute', e.target.value)} /></TableCell>
                                <TableCell className="py-2"><Input className="h-8" value={data?.history?.[level.key]?.major || ''} onChange={e => updateEdu(level.key, 'major', e.target.value)} /></TableCell>
                                <TableCell className="py-2"><Input className="h-8" value={data?.history?.[level.key]?.start_year || ''} onChange={e => updateEdu(level.key, 'start_year', e.target.value)} /></TableCell>
                                <TableCell className="py-2"><Input className="h-8" value={data?.history?.[level.key]?.end_year || ''} onChange={e => updateEdu(level.key, 'end_year', e.target.value)} /></TableCell>
                                <TableCell className="py-2"><Input className="h-8" value={data?.history?.[level.key]?.gpa || ''} onChange={e => updateEdu(level.key, 'gpa', e.target.value)} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>

        {/* 3. General Skills */}
        <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-1">ความสามารถทั่วไป</h3>
            <div className="grid md:grid-cols-3 gap-4">
                
                {/* 3.1 Language Skills */}
                <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-slate-700">1. ความรู้ภาษา</h4>
                    <div className="border rounded-md overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50 hover:bg-slate-50">
                                    <TableHead className="h-8 py-1">ภาษา</TableHead>
                                    <TableHead className="h-8 py-1">ความสามารถ</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="py-1">ไทย</TableCell>
                                    <TableCell className="py-1"><Input className="h-7" value={skillsData?.languages?.thai || ''} onChange={e => updateSkills('languages', 'thai', e.target.value)} /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="py-1">อังกฤษ</TableCell>
                                    <TableCell className="py-1"><Input className="h-7" value={skillsData?.languages?.english || ''} onChange={e => updateSkills('languages', 'english', e.target.value)} /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="py-1">จีน</TableCell>
                                    <TableCell className="py-1"><Input className="h-7" value={skillsData?.languages?.chinese || ''} onChange={e => updateSkills('languages', 'chinese', e.target.value)} /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="p-1"><Input placeholder="อื่นๆ" className="h-7" value={skillsData?.languages?.other_name || ''} onChange={e => updateSkills('languages', 'other_name', e.target.value)} /></TableCell>
                                    <TableCell className="py-1"><Input className="h-7" value={skillsData?.languages?.other_level || ''} onChange={e => updateSkills('languages', 'other_level', e.target.value)} /></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* 3.2 Office Equipment */}
                <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-slate-700">2. เครื่องใช้สำนักงาน</h4>
                    <div className="border rounded-md overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50 hover:bg-slate-50">
                                    <TableHead className="h-8 py-1">ประเภท</TableHead>
                                    <TableHead className="text-center w-16 h-8 py-1">ใช้เป็น</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { k: 'typewriter_thai', l: 'พิมพ์ดีดไทย' },
                                    { k: 'typewriter_eng', l: 'พิมพ์ดีดอังกฤษ' },
                                    { k: 'calculator', l: 'เครื่องคิดเลข' },
                                    { k: 'fax_copier', l: 'เครื่องแฟกซ์/ถ่ายเอกสาร' },
                                    { k: 'computer', l: 'คอมพิวเตอร์' },
                                ].map(item => (
                                    <TableRow key={item.k}>
                                        <TableCell className="py-1 text-sm">{item.l}</TableCell>
                                        <TableCell className="text-center py-1">
                                            <Checkbox 
                                                className="h-4 w-4"
                                                checked={skillsData?.office?.[item.k] || false} 
                                                onCheckedChange={c => updateSkills('office', item.k, c)} 
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* 3.3 Special Skills */}
                <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-slate-700">3. ความสามารถพิเศษอื่นๆ</h4>
                    <div className="border rounded-md overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50 hover:bg-slate-50">
                                    <TableHead className="h-8 py-1">ประเภท</TableHead>
                                    <TableHead className="text-center w-16 h-8 py-1">ขับเป็น</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="py-1 text-sm">จักรยานยนต์</TableCell>
                                    <TableCell className="text-center py-1">
                                        <Checkbox className="h-4 w-4" checked={skillsData?.driving?.motorcycle || false} onCheckedChange={c => updateSkills('driving', 'motorcycle', c)} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="py-1 text-sm">รถยนต์</TableCell>
                                    <TableCell className="text-center py-1">
                                        <Checkbox className="h-4 w-4" checked={skillsData?.driving?.car || false} onCheckedChange={c => updateSkills('driving', 'car', c)} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="py-1 text-sm">รถบรรทุก</TableCell>
                                    <TableCell className="text-center py-1">
                                        <Checkbox className="h-4 w-4" checked={skillsData?.driving?.truck || false} onCheckedChange={c => updateSkills('driving', 'truck', c)} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="p-1"><Input placeholder="อื่นๆ" className="h-7" value={skillsData?.driving?.other_name || ''} onChange={e => updateSkills('driving', 'other_name', e.target.value)} /></TableCell>
                                    <TableCell className="text-center py-1">
                                        <Checkbox className="h-4 w-4" checked={skillsData?.driving?.other_check || false} onCheckedChange={c => updateSkills('driving', 'other_check', c)} />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            {/* 3.4 Computer Programs */}
            <div className="space-y-1 pt-1">
                <Label>4. ความรู้ความสามารถทางด้านภาษา/โปรแกรมคอมพิวเตอร์</Label>
                <Input 
                    className="h-9"
                    value={skillsData?.computer_capability || ''} 
                    onChange={e => updateData('skills_data', 'computer_capability', e.target.value)} 
                    placeholder="ระบุโปรแกรมคอมพิวเตอร์หรือภาษาที่ใช้งานได้"
                />
            </div>
        </div>

        {/* 4. Training History */}
        <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-1">ประวัติการฝึกอบรม</h3>
            <div className="rounded-md border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 hover:bg-slate-50">
                            <TableHead className="w-16 text-center h-9 py-2">ลำดับ</TableHead>
                            <TableHead className="h-9 py-2">หลักสูตร</TableHead>
                            <TableHead className="h-9 py-2">สถาบัน</TableHead>
                            <TableHead className="h-9 py-2">ระยะเวลา</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[0, 1, 2, 3].map((index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center py-2">{index + 1}</TableCell>
                                <TableCell className="py-2"><Input className="h-8" value={trainingData?.history?.[index]?.course || ''} onChange={e => updateTraining(index, 'course', e.target.value)} /></TableCell>
                                <TableCell className="py-2"><Input className="h-8" value={trainingData?.history?.[index]?.institute || ''} onChange={e => updateTraining(index, 'institute', e.target.value)} /></TableCell>
                                <TableCell className="py-2"><Input className="h-8" value={trainingData?.history?.[index]?.duration || ''} onChange={e => updateTraining(index, 'duration', e.target.value)} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>

    </div>
    );
}