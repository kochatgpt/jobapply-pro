import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";

export default function FormStep3({ data, experienceData, updateData }) {
    
    // Experience Logic
    const history = experienceData?.history || [];
    const hasExperience = experienceData?.has_experience || 'no';

    const handleHasExpChange = (hasExp) => {
        updateData('experience_data', 'has_experience', hasExp ? 'yes' : 'no');
        if (hasExp && history.length === 0) {
             handleAddRow();
        }
    };

    const handleAddRow = () => {
        const newHistory = [...history, { period: '', workplace: '', employer: '', position: '', reason: '', salary_in: '', salary_out: '' }];
        updateData('experience_data', 'history', newHistory);
    };

    const handleRemoveRow = (index) => {
        const newHistory = history.filter((_, i) => i !== index);
        updateData('experience_data', 'history', newHistory);
    };

    const handleRowChange = (index, field, value) => {
        const newHistory = [...history];
        newHistory[index] = { ...newHistory[index], [field]: value };
        updateData('experience_data', 'history', newHistory);
    };

    // Table Styles
    const thClass = "border border-slate-300 bg-slate-100 text-slate-700 h-9 px-2 font-semibold text-center align-middle";
    const tdClass = "border border-slate-300 p-0";
    const inputClass = "border-none shadow-none focus-visible:ring-0 h-9 w-full rounded-none bg-transparent px-2";

    return (
    <div className="space-y-8">
        {/* Work Experience Section - Moved from Step 4 */}
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-2">ประวัติการทำงาน (Work Experience)</h3>
            <div className="border border-slate-300 rounded-md overflow-hidden">
                <Table className="min-w-[1000px] border-collapse">
                    <TableHeader>
                        <TableRow>
                            <TableHead colSpan={5} className="border border-slate-300 bg-slate-50 p-3 h-auto">
                                <div className="flex items-center gap-6">
                                    <div className="font-bold text-slate-900">ประวัติการทำงาน</div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox 
                                            id="no_exp" 
                                            checked={hasExperience === 'no'}
                                            onCheckedChange={(c) => handleHasExpChange(!c)}
                                        />
                                        <Label htmlFor="no_exp" className="cursor-pointer font-normal">ไม่มีประสบการณ์ทำงาน</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox 
                                            id="has_exp" 
                                            checked={hasExperience === 'yes'}
                                            onCheckedChange={(c) => handleHasExpChange(c)}
                                        />
                                        <Label htmlFor="has_exp" className="cursor-pointer font-normal">มีประสบการณ์ทำงานระบุ (เรียงลำดับจากล่าสุด)</Label>
                                    </div>
                                </div>
                            </TableHead>
                            <TableHead colSpan={2} className="border border-slate-300 bg-slate-50 p-3 h-auto text-center font-bold text-slate-900">
                                เงินเดือน
                            </TableHead>
                        </TableRow>
                        <TableRow>
                            {/* Column 1-5 (Exp) */}
                            <TableHead className={thClass + " w-[180px]"}>วัน/เดือน/ปี<br/>เริ่มงาน - ออก</TableHead>
                            <TableHead className={thClass}>ชื่อสถานที่ทำงาน</TableHead>
                            <TableHead className={thClass}>ชื่อ - นามสกุล(นายจ้าง)</TableHead>
                            <TableHead className={thClass}>ตำแหน่งสุดท้าย</TableHead>
                            <TableHead className={thClass}>สาเหตุที่ออก</TableHead>
                            
                            {/* Column 6-7 (Salary) */}
                            <TableHead className={thClass + " w-[100px]"}>บาท/เข้า</TableHead>
                            <TableHead className={thClass + " w-[100px]"}>บาท/ออก</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {hasExperience === 'yes' ? (
                            <>
                                {history.map((item, index) => (
                                    <TableRow key={index} className="hover:bg-transparent">
                                        <TableCell className={tdClass}>
                                            <Input 
                                                className={inputClass} 
                                                value={item.period} 
                                                onChange={(e) => handleRowChange(index, 'period', e.target.value)}
                                                placeholder="วว/ดด/ปป - วว/ดด/ปป"
                                            />
                                        </TableCell>
                                        <TableCell className={tdClass}>
                                            <Input 
                                                className={inputClass} 
                                                value={item.workplace} 
                                                onChange={(e) => handleRowChange(index, 'workplace', e.target.value)} 
                                            />
                                        </TableCell>
                                        <TableCell className={tdClass}>
                                            <Input 
                                                className={inputClass} 
                                                value={item.employer} 
                                                onChange={(e) => handleRowChange(index, 'employer', e.target.value)} 
                                            />
                                        </TableCell>
                                        <TableCell className={tdClass}>
                                            <Input 
                                                className={inputClass} 
                                                value={item.position} 
                                                onChange={(e) => handleRowChange(index, 'position', e.target.value)} 
                                            />
                                        </TableCell>
                                        <TableCell className={tdClass}>
                                            <div className="flex items-center">
                                                <Input 
                                                    className={inputClass} 
                                                    value={item.reason} 
                                                    onChange={(e) => handleRowChange(index, 'reason', e.target.value)} 
                                                />
                                                {history.length > 1 && (
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 mr-1"
                                                        onClick={() => handleRemoveRow(index)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className={tdClass}>
                                            <Input 
                                                className={inputClass} 
                                                value={item.salary_in} 
                                                onChange={(e) => handleRowChange(index, 'salary_in', e.target.value)} 
                                            />
                                        </TableCell>
                                        <TableCell className={tdClass}>
                                            <Input 
                                                className={inputClass} 
                                                value={item.salary_out} 
                                                onChange={(e) => handleRowChange(index, 'salary_out', e.target.value)} 
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={7} className="p-2 bg-slate-50 border border-slate-300">
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            onClick={handleAddRow}
                                            className="w-full text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                                        >
                                            <Plus className="w-4 h-4 mr-2" /> เพิ่มประวัติการทำงาน
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-slate-400 border border-slate-300 bg-slate-50">
                                    เลือก "ไม่มีประสบการณ์ทำงาน"
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="space-y-2 max-w-2xl pt-2">
                <Label>คติประจำใจในการทำงาน</Label>
                <Textarea 
                    value={experienceData?.motto || ''} 
                    onChange={(e) => updateData('experience_data', 'motto', e.target.value)}
                    placeholder="ระบุคติประจำใจ"
                    className="bg-white"
                />
            </div>
        </div>

        {/* Health Data Section */}
        <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-2 mb-4">ข้อมูลสุขภาพ (Health Information)</h3>
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
    </div>
    );
}