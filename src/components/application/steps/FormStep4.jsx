import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import SignatureCanvas from 'react-signature-canvas';

export default function FormStep4({ data, updateData, setSignature }) {
    const sigCanvas = useRef({});
    
    // Ensure history exists
    const history = data?.history || [];
    const hasExperience = data?.has_experience || 'no';

    const clearSig = () => {
        sigCanvas.current.clear();
        setSignature(null);
    };

    const saveSig = () => {
        if (!sigCanvas.current.isEmpty()) {
            setSignature(sigCanvas.current.toDataURL());
        }
    };

    const handleHasExpChange = (hasExp) => {
        updateData('experience_data', 'has_experience', hasExp ? 'yes' : 'no');
        if (!hasExp) {
            // Optional: clear history if switching to no? 
            // Better to keep it but hide it, or maybe clear it.
            // keeping it for now to avoid data loss on accidental click
        } else {
             if (history.length === 0) {
                 handleAddRow();
             }
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
            <h3 className="text-lg font-bold text-slate-900 border-b pb-2">ประวัติการทำงาน (Work Experience)</h3>
            
            <div className="space-y-4">
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

                <div className="space-y-2 max-w-2xl">
                    <Label>คติประจำใจในการทำงาน</Label>
                    <Textarea 
                        value={data?.motto || ''} 
                        onChange={(e) => updateData('experience_data', 'motto', e.target.value)}
                        placeholder="ระบุคติประจำใจ"
                        className="bg-white"
                    />
                </div>
            </div>

            <div className="pt-6 border-t space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">ลายเซ็นผู้สมัคร</Label>
                    {data?.submission_date && <span className="text-sm text-slate-500">วันที่สมัคร: {data.submission_date}</span>}
                </div>
                
                <div className="border-2 border-slate-300 border-dashed rounded-lg bg-slate-50 overflow-hidden relative">
                    <SignatureCanvas 
                        ref={sigCanvas}
                        penColor="black"
                        canvasProps={{
                            width: 600, 
                            height: 200, 
                            className: 'sigCanvas w-full h-48 cursor-crosshair'
                        }}
                        onEnd={saveSig}
                    />
                    <div className="absolute top-2 right-2">
                        <Button 
                            variant="secondary" 
                            size="sm" 
                            onClick={clearSig}
                            className="bg-white/80 hover:bg-white text-slate-600"
                        >
                            ล้างลายเซ็น
                        </Button>
                    </div>
                    {!sigCanvas.current?.isEmpty?.() && !data?.signature_url && (
                        <div className="absolute bottom-2 left-2 text-xs text-slate-400 pointer-events-none">
                            เซ็นชื่อในกรอบด้านบน
                        </div>
                    )}
                </div>
                <p className="text-xs text-slate-500 text-right">* กรุณาเซ็นชื่อเพื่อรับรองข้อมูล</p>
            </div>
        </div>
    );
}