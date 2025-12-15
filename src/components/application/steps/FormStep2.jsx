import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FormStep2({ data, familyData, skillsData, trainingData, updateData }) {

    const updateEducation = (index, field, value) => {
        const newData = [...data];
        newData[index][field] = value;
        updateData('education_data', null, newData);
    };

    const updateSkills = (category, index, field, value) => {
        const newSkills = { ...skillsData };
        if (field === null) {
            // Direct array update if needed, but here we update object inside array
        } else {
            newSkills[category][index][field] = value;
        }
        updateData('skills_data', null, newSkills);
    };

    const updateComputerSkills = (val) => {
        const newSkills = { ...skillsData, computer_skills: val };
        updateData('skills_data', null, newSkills);
    };

    const updateTraining = (index, field, value) => {
        const newTraining = [...trainingData];
        newTraining[index][field] = value;
        updateData('training_data', null, newTraining);
    };

    return (
        <div className="space-y-8">
            {/* Family Status */}
            <div>
                <h3 className="text-xl font-bold text-slate-900 border-b pb-2 mb-4">สถานะครอบครัว</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>สถานภาพ</Label>
                        <Select 
                            value={familyData?.marital_status} 
                            onValueChange={(val) => updateData('family_data', 'marital_status', val)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="เลือกสถานภาพ" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="single">โสด</SelectItem>
                                <SelectItem value="married">แต่งงานแล้ว</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>บุตร</Label>
                        <div className="flex items-center space-x-2 pt-2">
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

            {/* Education History */}
            <div>
                <h3 className="text-xl font-bold text-slate-900 border-b pb-2 mb-4">ประวัติการศึกษา</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-slate-100 text-slate-700">
                                <th className="border p-2 text-left">ระดับการศึกษา</th>
                                <th className="border p-2 text-left">ชื่อสถานศึกษา</th>
                                <th className="border p-2 text-left">สาขาวิชา</th>
                                <th className="border p-2 text-center w-20">เริ่ม (พ.ศ.)</th>
                                <th className="border p-2 text-center w-20">จบ (พ.ศ.)</th>
                                <th className="border p-2 text-center w-20">เกรด</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((edu, index) => (
                                <tr key={index}>
                                    <td className="border p-2 font-medium bg-slate-50">{edu.level}</td>
                                    <td className="border p-1">
                                        <Input className="h-8" value={edu.institution} onChange={(e) => updateEducation(index, 'institution', e.target.value)} />
                                    </td>
                                    <td className="border p-1">
                                        <Input className="h-8" value={edu.major} onChange={(e) => updateEducation(index, 'major', e.target.value)} />
                                    </td>
                                    <td className="border p-1">
                                        <Input className="h-8 text-center" value={edu.start_year} onChange={(e) => updateEducation(index, 'start_year', e.target.value)} />
                                    </td>
                                    <td className="border p-1">
                                        <Input className="h-8 text-center" value={edu.end_year} onChange={(e) => updateEducation(index, 'end_year', e.target.value)} />
                                    </td>
                                    <td className="border p-1">
                                        <Input className="h-8 text-center" value={edu.gpa} onChange={(e) => updateEducation(index, 'gpa', e.target.value)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* General Skills */}
            <div>
                <h3 className="text-xl font-bold text-slate-900 border-b pb-2 mb-4">ความสามารถทั่วไป</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    {/* 1. Language */}
                    <div>
                        <h4 className="font-semibold mb-2">1. ความรู้ในการใช้ภาษา</h4>
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-slate-100">
                                    <th className="border p-2 text-left">ภาษา</th>
                                    <th className="border p-2 text-left">ความสามารถ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {skillsData?.languages?.map((lang, idx) => (
                                    <tr key={idx}>
                                        <td className="border p-2">
                                            {lang.is_other ? (
                                                 <Input 
                                                    className="h-7 text-xs" 
                                                    placeholder="อื่นๆ" 
                                                    value={lang.language}
                                                    onChange={(e) => updateSkills('languages', idx, 'language', e.target.value)}
                                                 />
                                            ) : (
                                                lang.language
                                            )}
                                        </td>
                                        <td className="border p-1">
                                            <Input 
                                                className="h-7 text-xs" 
                                                placeholder="ระบุ (ดี/พอใช้)"
                                                value={lang.level}
                                                onChange={(e) => updateSkills('languages', idx, 'level', e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 2. Office Equipment */}
                    <div>
                        <h4 className="font-semibold mb-2">2. เครื่องใช้สำนักงาน</h4>
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-slate-100">
                                    <th className="border p-2 text-left">ประเภท</th>
                                    <th className="border p-2 text-center w-16">ใช้ได้</th>
                                </tr>
                            </thead>
                            <tbody>
                                {skillsData?.office_equipment?.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="border p-2">{item.name}</td>
                                        <td className="border p-2 text-center">
                                            <Checkbox 
                                                checked={item.can_use}
                                                onCheckedChange={(checked) => updateSkills('office_equipment', idx, 'can_use', checked)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 3. Driving */}
                    <div>
                        <h4 className="font-semibold mb-2">3. ความสามารถพิเศษอื่นๆ</h4>
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-slate-100">
                                    <th className="border p-2 text-left">ประเภท</th>
                                    <th className="border p-2 text-center w-16">ได้</th>
                                </tr>
                            </thead>
                            <tbody>
                                {skillsData?.driving?.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="border p-2">
                                            {item.is_other ? (
                                                <div className="flex items-center gap-1">
                                                    <span>อื่นๆ</span>
                                                    <Input 
                                                        className="h-6 text-xs w-20"
                                                        placeholder="ระบุ"
                                                        value={item.other_text}
                                                        onChange={(e) => updateSkills('driving', idx, 'other_text', e.target.value)}
                                                    />
                                                </div>
                                            ) : item.name}
                                        </td>
                                        <td className="border p-2 text-center">
                                            <Checkbox 
                                                checked={item.can_drive}
                                                onCheckedChange={(checked) => updateSkills('driving', idx, 'can_drive', checked)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 4. Computer Skills */}
                <div className="mt-6">
                    <Label className="font-semibold mb-2 block">4. ความรู้ความสามารถทางด้านภาษา/โปรแกรมคอมพิวเตอร์</Label>
                    <Input 
                        value={skillsData?.computer_skills} 
                        onChange={(e) => updateComputerSkills(e.target.value)} 
                        placeholder="ระบุโปรแกรมคอมพิวเตอร์ที่ใช้งานได้"
                    />
                </div>
            </div>

            {/* Training History */}
            <div>
                <h3 className="text-xl font-bold text-slate-900 border-b pb-2 mb-4">ประวัติการฝึกอบรม</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-slate-100 text-slate-700">
                                <th className="border p-2 w-16 text-center">ลำดับ</th>
                                <th className="border p-2 text-left">หลักสูตร</th>
                                <th className="border p-2 text-left">สถาบันฝึกอบรม</th>
                                <th className="border p-2 text-center w-40">ระยะเวลา</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainingData?.map((train, idx) => (
                                <tr key={idx}>
                                    <td className="border p-2 text-center bg-slate-50">{train.no}</td>
                                    <td className="border p-1">
                                        <Input className="h-8" value={train.course} onChange={(e) => updateTraining(idx, 'course', e.target.value)} />
                                    </td>
                                    <td className="border p-1">
                                        <Input className="h-8" value={train.institution} onChange={(e) => updateTraining(idx, 'institution', e.target.value)} />
                                    </td>
                                    <td className="border p-1">
                                        <Input className="h-8 text-center" value={train.duration} onChange={(e) => updateTraining(idx, 'duration', e.target.value)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}