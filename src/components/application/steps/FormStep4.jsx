import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignatureCanvas from 'react-signature-canvas';
import { Plus, Trash2, Upload, PenLine } from "lucide-react";
import { base44 } from '@/api/base44Client';

export default function FormStep4({ data, setGlobalData }) {
    const sigCanvas = useRef({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    
    // Emergency Contact Handlers
    const contacts = data.emergency_contacts || [];
    
    const handleAddContact = () => {
        setGlobalData(prev => ({
            ...prev,
            emergency_contacts: [...contacts, { name: '', relationship: '', address: '', phone: '', position: '' }]
        }));
    };

    const handleRemoveContact = (index) => {
        setGlobalData(prev => ({
            ...prev,
            emergency_contacts: contacts.filter((_, i) => i !== index)
        }));
    };

    const handleContactChange = (index, field, value) => {
        const newContacts = [...contacts];
        newContacts[index] = { ...newContacts[index], [field]: value };
        setGlobalData(prev => ({
            ...prev,
            emergency_contacts: newContacts
        }));
    };

    // Signature Handlers
    const handleSaveDraw = () => {
        if (!sigCanvas.current.isEmpty()) {
            const signatureUrl = sigCanvas.current.toDataURL();
            setGlobalData(prev => ({ ...prev, signature_url: signatureUrl }));
            setIsDialogOpen(false);
        }
    };

    const handleClearDraw = () => {
        sigCanvas.current.clear();
    };

    const handleUploadFile = async () => {
        if (!uploadFile) return;
        setIsUploading(true);
        try {
            const { file_url } = await base44.integrations.Core.UploadFile({ file: uploadFile });
            setGlobalData(prev => ({ ...prev, signature_url: file_url }));
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Upload failed", error);
            // Fallback for preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setGlobalData(prev => ({ ...prev, signature_url: reader.result }));
                setIsDialogOpen(false);
            };
            reader.readAsDataURL(uploadFile);
        } finally {
            setIsUploading(false);
        }
    };

    // Table Styles
    const thClass = "border border-slate-300 bg-slate-100 text-slate-700 h-9 px-2 font-semibold text-center align-middle";
    const tdClass = "border border-slate-300 p-0";
    const inputClass = "border-none shadow-none focus-visible:ring-0 h-9 w-full rounded-none bg-transparent px-2";

    return (
        <div className="space-y-8">
            {/* Emergency Contacts */}
            <div className="space-y-4">
                <div className="border-b pb-2">
                    <h3 className="text-lg font-bold text-slate-900">กรณีฉุกเฉินเร่งด่วน (Emergency Contact)</h3>
                    <p className="text-slate-500 text-sm mt-1">สามารถติดต่อบุคคลที่ข้าพเจ้าอ้างอิงได้ที่</p>
                </div>
                
                <div className="border border-slate-300 rounded-md overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className={thClass}>ชื่อ-สกุล</TableHead>
                                <TableHead className={thClass}>ความสัมพันธ์</TableHead>
                                <TableHead className={thClass}>ที่อยู่/ที่ทำงาน</TableHead>
                                <TableHead className={thClass}>โทรศัพท์</TableHead>
                                <TableHead className={thClass}>ตำแหน่ง</TableHead>
                                <TableHead className={thClass + " w-10"}></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contacts.map((contact, index) => (
                                <TableRow key={index}>
                                    <TableCell className={tdClass}>
                                        <Input 
                                            className={inputClass}
                                            value={contact.name}
                                            onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell className={tdClass}>
                                        <Input 
                                            className={inputClass}
                                            value={contact.relationship}
                                            onChange={(e) => handleContactChange(index, 'relationship', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell className={tdClass}>
                                        <Input 
                                            className={inputClass}
                                            value={contact.address}
                                            onChange={(e) => handleContactChange(index, 'address', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell className={tdClass}>
                                        <Input 
                                            className={inputClass}
                                            value={contact.phone}
                                            onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell className={tdClass}>
                                        <Input 
                                            className={inputClass}
                                            value={contact.position}
                                            onChange={(e) => handleContactChange(index, 'position', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell className={tdClass + " text-center"}>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => handleRemoveContact(index)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {contacts.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center p-4 text-slate-400 bg-slate-50">
                                        ยังไม่มีข้อมูลผู้ติดต่อ
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <div className="p-2 bg-slate-50 border-t border-slate-300">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleAddContact}
                            className="w-full text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                        >
                            <Plus className="w-4 h-4 mr-2" /> เพิ่มรายชื่อผู้ติดต่อ
                        </Button>
                    </div>
                </div>
            </div>

            {/* Attitude */}
            <div className="space-y-3">
                <Label className="text-lg font-bold text-slate-900">ทัศนคติในการทำงานของท่านที่ทำให้บริษัทฯได้รู้จักท่านมากขึ้น</Label>
                <Textarea 
                    className="min-h-[120px]" 
                    placeholder="ระบุทัศนคติหรือแนวคิดในการทำงานของท่าน..."
                    value={data.attitude || ''}
                    onChange={(e) => setGlobalData(prev => ({ ...prev, attitude: e.target.value }))}
                />
            </div>

            {/* Disclaimer & Signature */}
            <div className="space-y-6 pt-6 border-t">
                <div className="bg-slate-50 p-6 rounded-xl border space-y-4">
                    <p className="text-sm text-slate-700 leading-relaxed text-justify">
                        ข้าพเจ้าขอรับรองว่า ข้อความดังกล่าวทั้งหมดในใบสมัครงานและเอกสารแนบนี้เป็นความจริงทุกประการ หลังจากบริษัทฯได้เข้ามาทำงานแล้วหากปรากฏว่า ข้อความในใบสมัครงานและเอกสารแนบที่นำมาแสดงต่างๆ หรือรายละเอียดที่ให้ไว้ไม่เป็นความจริง หรือเป็นเท็จ บริษัทฯ มีสิทธิ์ที่เลิกจ้างข้าพเจ้าได้ โดยไม่ต้องจ่ายเงินชดเชยหรือค่าเสียหายใดๆ ทั้งสิ้น ข้าพเจ้ายินยอมให้บริษัทฯตรวจสอบ ข้อมูลย้อนหลังจากการทำงานที่เดิม รวมถึงยินยอมให้ตรวจสอบประวัติอาญากรรมและเครดิตบูโรทั้งสิ้น และข้าพเจ้ายินยอมให้แพทย์ หรือโรงพยาบาลให้ข้อมูลที่จำเป็นเกี่ยวกับสุขภาพของข้าพเจ้า ซึ่งมีผลกระทบต่อการปฏิบัติงานในบริษัท
                    </p>
                    <p className="font-semibold text-slate-900 text-right pt-2 pr-4">
                        ข้าพเจ้าขอลงนามรับรองการให้ข้อมูลตามจริงทุกประการ
                    </p>

                    <div className="flex flex-col items-end gap-6 pt-4 pr-4">
                        <div className="flex flex-col items-end gap-4">
                            {data.signature_url ? (
                                <div className="relative group">
                                    <div className="border-2 border-slate-300 rounded-lg p-2 bg-white">
                                        <img src={data.signature_url} alt="Signature" className="h-32 object-contain" />
                                    </div>
                                    <Button 
                                        variant="secondary" 
                                        size="sm"
                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => setIsDialogOpen(true)}
                                    >
                                        แก้ไข
                                    </Button>
                                </div>
                            ) : (
                                <Button onClick={() => setIsDialogOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 w-40">
                                    <PenLine className="w-4 h-4 mr-2" /> ลงนามลายเซ็น
                                </Button>
                            )}

                            <div className="flex items-center gap-2">
                                <Label htmlFor="sig_date" className="whitespace-nowrap">วันที่:</Label>
                                <Input 
                                    id="sig_date"
                                    type="date" 
                                    className="w-40"
                                    value={data.signature_date || ''}
                                    onChange={(e) => setGlobalData(prev => ({ ...prev, signature_date: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Start Date */}
            <div className="flex items-center justify-center gap-4 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
                <Label htmlFor="start_date" className="text-lg font-bold text-indigo-900 whitespace-nowrap">ข้าพเจ้าพร้อมปฏิบัติงานกับบริษัทฯ ในวันที่</Label>
                <Input 
                    id="start_date"
                    type="date" 
                    className="w-48 bg-white border-indigo-200"
                    value={data.start_work_date || ''}
                    onChange={(e) => setGlobalData(prev => ({ ...prev, start_work_date: e.target.value }))}
                />
            </div>

            {/* Signature Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>ลงนามลายเซ็น</DialogTitle>
                    </DialogHeader>
                    
                    <Tabs defaultValue="draw" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="draw">วาดลายเซ็น</TabsTrigger>
                            <TabsTrigger value="upload">อัปโหลดรูปภาพ</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="draw" className="space-y-4 py-4">
                            <div className="border-2 border-slate-200 border-dashed rounded-lg bg-slate-50 overflow-hidden relative">
                                <SignatureCanvas 
                                    ref={sigCanvas}
                                    penColor="black"
                                    canvasProps={{
                                        width: 450, 
                                        height: 200, 
                                        className: 'sigCanvas w-full h-48 cursor-crosshair'
                                    }}
                                />
                                <div className="absolute top-2 right-2">
                                    <Button 
                                        variant="secondary" 
                                        size="sm" 
                                        onClick={handleClearDraw}
                                        className="h-8 text-xs"
                                    >
                                        ล้าง
                                    </Button>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleSaveDraw} className="w-full bg-indigo-600 hover:bg-indigo-700">บันทึกที่วาด</Button>
                            </DialogFooter>
                        </TabsContent>
                        
                        <TabsContent value="upload" className="space-y-4 py-4">
                            <div className="flex flex-col items-center justify-center h-48 border-2 border-slate-200 border-dashed rounded-lg bg-slate-50">
                                <Input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => setUploadFile(e.target.files[0])}
                                    className="max-w-xs"
                                />
                                <p className="text-sm text-slate-500 mt-2">รองรับไฟล์ .jpg, .png</p>
                            </div>
                            <DialogFooter>
                                <Button 
                                    onClick={handleUploadFile} 
                                    disabled={!uploadFile || isUploading}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                                >
                                    {isUploading ? "กำลังอัปโหลด..." : "อัปโหลดและบันทึก"}
                                </Button>
                            </DialogFooter>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </div>
    );
}