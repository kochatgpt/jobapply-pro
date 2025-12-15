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

    // Styles for table with borders and borderless inputs
    const thClass = "border border-slate-300 bg-slate-100 text-slate-700 h-9 px-2 font-semibold";
    const tdClass = "border border-slate-300 p-0"; // No padding for input cells
    const tdTextClass = "border border-slate-300 p-2"; // For text/checkbox cells
    const inputClass = "border-none shadow-none focus-visible:ring-0 h-9 w-full rounded-none bg-transparent px-2";

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
            <div className="rounded-md overflow-x-auto">
                <Table className="min-w-[800px] border-collapse border border-slate-300">
                    <TableHeader>
                        <TableRow className="bg-slate-100 hover:bg-slate-100">
                            <TableHead className={thClass + " w-[150px]"}>ระดับ</TableHead>
                            <TableHead className={thClass}>ชื่อสถานศึกษา</TableHead>
                            <TableHead className={thClass}>สาขาวิชา</TableHead>
                            <TableHead className={thClass + " w-[100px]"}>เริ่ม (พ.ศ.)</TableHead>
                            <TableHead className={thClass + " w-[100px]"}>จบ (พ.ศ.)</TableHead>
                            <TableHead className={thClass + " w-[80px]"}>เกรด</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {eduLevels.map((level) => (
                            <TableRow key={level.key} className="hover:bg-transparent">
                                <TableCell className={tdTextClass + " bg-slate-50 font-medium"}>{level.label}</TableCell>
                                <TableCell className={tdClass}><Input className={inputClass} value={data?.history?.[level.key]?.institute || ''} onChange={e => updateEdu(level.key, 'institute', e.target.value)} /></TableCell>
                                <TableCell className={tdClass}><Input className={inputClass} value={data?.history?.[level.key]?.major || ''} onChange={e => updateEdu(level.key, 'major', e.target.value)} /></TableCell>
                                <TableCell className={tdClass}><Input className={inputClass} value={data?.history?.[level.key]?.start_year || ''} onChange={e => updateEdu(level.key, 'start_year', e.target.value)} /></TableCell>
                                <TableCell className={tdClass}><Input className={inputClass} value={data?.history?.[level.key]?.end_year || ''} onChange={e => updateEdu(level.key, 'end_year', e.target.value)} /></TableCell>
                                <TableCell className={tdClass}><Input className={inputClass} value={data?.history?.[level.key]?.gpa || ''} onChange={e => updateEdu(level.key, 'gpa', e.target.value)} /></TableCell>
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
                    <div className="rounded-md overflow-hidden">
                        <Table className="border-collapse border border-slate-300">
                            <TableHeader>
                                <TableRow className="bg-slate-100 hover:bg-slate-100">
                                    <TableHead className={thClass}>ภาษา</TableHead>
                                    <TableHead className={thClass}>ความสามารถ</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="hover:bg-transparent">
                                    <TableCell className={tdTextClass}>ไทย</TableCell>
                                    <TableCell className={tdClass}><Input className={inputClass} value={skillsData?.languages?.thai || ''} onChange={e => updateSkills('languages', 'thai', e.target.value)} /></TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-transparent">
                                    <TableCell className={tdTextClass}>อังกฤษ</TableCell>
                                    <TableCell className={tdClass}><Input className={inputClass} value={skillsData?.languages?.english || ''} onChange={e => updateSkills('languages', 'english', e.target.value)} /></TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-transparent">
                                    <TableCell className={tdTextClass}>จีน</TableCell>
                                    <TableCell className={tdClass}><Input className={inputClass} value={skillsData?.languages?.chinese || ''} onChange={e => updateSkills('languages', 'chinese', e.target.value)} /></TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-transparent">
                                    <TableCell className={tdClass}><Input placeholder="อื่นๆ" className={inputClass} value={skillsData?.languages?.other_name || ''} onChange={e => updateSkills('languages', 'other_name', e.target.value)} /></TableCell>
                                    <TableCell className={tdClass}><Input className={inputClass} value={skillsData?.languages?.other_level || ''} onChange={e => updateSkills('languages', 'other_level', e.target.value)} /></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* 3.2 Office Equipment */}
                <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-slate-700">2. เครื่องใช้สำนักงาน</h4>
                    <div className="rounded-md overflow-hidden">
                        <Table className="border-collapse border border-slate-300">
                            <TableHeader>
                                <TableRow className="bg-slate-100 hover:bg-slate-100">
                                    <TableHead className={thClass}>ประเภท</TableHead>
                                    <TableHead className={thClass + " text-center w-16"}>ใช้เป็น</TableHead>
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
                                    <TableRow key={item.k} className="hover:bg-transparent">
                                        <TableCell className={tdTextClass + " text-sm"}>{item.l}</TableCell>
                                        <TableCell className="border border-slate-300 p-0 text-center align-middle">
                                            <div 
                                                className="flex items-center justify-center w-full h-full py-1 hover:bg-slate-50 cursor-pointer transition-colors"
                                                onClick={() => updateSkills('office', item.k, !skillsData?.office?.[item.k])}
                                            >
                                                <Checkbox 
                                                    className="h-5 w-5 border-2 border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                                                    checked={skillsData?.office?.[item.k] || false} 
                                                    onCheckedChange={c => updateSkills('office', item.k, c)} 
                                                />
                                            </div>
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
                    <div className="rounded-md overflow-hidden">
                        <Table className="border-collapse border border-slate-300">
                            <TableHeader>
                                <TableRow className="bg-slate-100 hover:bg-slate-100">
                                    <TableHead className={thClass}>ประเภท</TableHead>
                                    <TableHead className={thClass + " text-center w-16"}>ขับเป็น</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="hover:bg-transparent">
                                    <TableCell className={tdTextClass + " text-sm"}>จักรยานยนต์</TableCell>
                                    <TableCell className="border border-slate-300 p-0 text-center align-middle">
                                        <div 
                                            className="flex items-center justify-center w-full h-full py-1 hover:bg-slate-50 cursor-pointer transition-colors"
                                            onClick={() => updateSkills('driving', 'motorcycle', !skillsData?.driving?.motorcycle)}
                                        >
                                            <Checkbox 
                                                className="h-5 w-5 border-2 border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                                                checked={skillsData?.driving?.motorcycle || false} 
                                                onCheckedChange={c => updateSkills('driving', 'motorcycle', c)} 
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-transparent">
                                    <TableCell className={tdTextClass + " text-sm"}>รถยนต์</TableCell>
                                    <TableCell className="border border-slate-300 p-0 text-center align-middle">
                                        <div 
                                            className="flex items-center justify-center w-full h-full py-1 hover:bg-slate-50 cursor-pointer transition-colors"
                                            onClick={() => updateSkills('driving', 'car', !skillsData?.driving?.car)}
                                        >
                                            <Checkbox 
                                                className="h-5 w-5 border-2 border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                                                checked={skillsData?.driving?.car || false} 
                                                onCheckedChange={c => updateSkills('driving', 'car', c)} 
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-transparent">
                                    <TableCell className={tdTextClass + " text-sm"}>รถบรรทุก</TableCell>
                                    <TableCell className="border border-slate-300 p-0 text-center align-middle">
                                        <div 
                                            className="flex items-center justify-center w-full h-full py-1 hover:bg-slate-50 cursor-pointer transition-colors"
                                            onClick={() => updateSkills('driving', 'truck', !skillsData?.driving?.truck)}
                                        >
                                            <Checkbox 
                                                className="h-5 w-5 border-2 border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                                                checked={skillsData?.driving?.truck || false} 
                                                onCheckedChange={c => updateSkills('driving', 'truck', c)} 
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-transparent">
                                    <TableCell className={tdClass}><Input placeholder="อื่นๆ" className={inputClass} value={skillsData?.driving?.other_name || ''} onChange={e => updateSkills('driving', 'other_name', e.target.value)} /></TableCell>
                                    <TableCell className="border border-slate-300 p-0 text-center align-middle">
                                        <div 
                                            className="flex items-center justify-center w-full h-full py-1 hover:bg-slate-50 cursor-pointer transition-colors"
                                            onClick={() => updateSkills('driving', 'other_check', !skillsData?.driving?.other_check)}
                                        >
                                            <Checkbox 
                                                className="h-5 w-5 border-2 border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                                                checked={skillsData?.driving?.other_check || false} 
                                                onCheckedChange={c => updateSkills('driving', 'other_check', c)} 
                                            />
                                        </div>
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
            <div className="rounded-md overflow-hidden">
                <Table className="border-collapse border border-slate-300">
                    <TableHeader>
                        <TableRow className="bg-slate-100 hover:bg-slate-100">
                            <TableHead className={thClass + " w-16 text-center"}>ลำดับ</TableHead>
                            <TableHead className={thClass}>หลักสูตร</TableHead>
                            <TableHead className={thClass}>สถาบัน</TableHead>
                            <TableHead className={thClass}>ระยะเวลา</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[0, 1, 2, 3].map((index) => (
                            <TableRow key={index} className="hover:bg-transparent">
                                <TableCell className={tdTextClass + " text-center"}>{index + 1}</TableCell>
                                <TableCell className={tdClass}><Input className={inputClass} value={trainingData?.history?.[index]?.course || ''} onChange={e => updateTraining(index, 'course', e.target.value)} /></TableCell>
                                <TableCell className={tdClass}><Input className={inputClass} value={trainingData?.history?.[index]?.institute || ''} onChange={e => updateTraining(index, 'institute', e.target.value)} /></TableCell>
                                <TableCell className={tdClass}><Input className={inputClass} value={trainingData?.history?.[index]?.duration || ''} onChange={e => updateTraining(index, 'duration', e.target.value)} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>

    </div>
    );
}