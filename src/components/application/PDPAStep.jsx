import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import SignaturePad from '@/components/admin/SignaturePad';
import PDPADocument from '@/components/application/pdf/PDPADocument';
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function PDPAStep({ globalData, setGlobalData, onNext, onBack }) {
    const [formData, setFormData] = useState({
        writtenAt: '',
        writtenDate: new Date().toISOString().split('T')[0],
        lineId: '',
        agreed: false
    });
    const [signatureUrl, setSignatureUrl] = useState(globalData.signature_url || '');
    const [signatureDate, setSignatureDate] = useState(globalData.signature_date || new Date().toISOString().split('T')[0]);

    const handleNext = () => {
        if (!formData.agreed || !signatureUrl) {
            alert('กรุณาอ่านและยอมรับนโยบายความเป็นส่วนตัว และลงนามก่อนดำเนินการต่อ');
            return;
        }

        setGlobalData(prev => ({
            ...prev,
            signature_url: signatureUrl,
            signature_date: signatureDate,
            pdpa_data: {
                ...formData,
                status: 'accepted',
                accepted_date: new Date().toISOString()
            }
        }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onNext();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Progress */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">นโยบายความเป็นส่วนตัว (PDPA)</h2>
                    <p className="text-slate-500">กรุณาอ่านและยอมรับนโยบายความเป็นส่วนตัวก่อนดำเนินการต่อ</p>
                </div>

                <Card className="shadow-xl">
                    <CardHeader className="border-b bg-slate-50">
                        <CardTitle>แบบฟอร์มแสดงเจตนายินยอมให้เก็บรวมรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคล</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        {/* PDPA Document Preview */}
                        <div className="border rounded-lg bg-slate-100 p-8 max-h-[700px] overflow-y-auto">
                            <div className="flex flex-col items-center gap-8">
                                <PDPADocument 
                                    applicant={{
                                        full_name: `${globalData.personal_data?.first_name} ${globalData.personal_data?.last_name}`,
                                        personal_data: globalData.personal_data
                                    }}
                                    signatureUrl={signatureUrl}
                                    signatureDate={signatureDate}
                                    formData={formData}
                                />
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                            <div className="space-y-2">
                                <Label>เขียนที่</Label>
                                <Input
                                    value={formData.writtenAt}
                                    onChange={(e) => setFormData({ ...formData, writtenAt: e.target.value })}
                                    placeholder="สถานที่เขียนเอกสาร"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>วันที่เขียน</Label>
                                <Input
                                    type="date"
                                    value={formData.writtenDate}
                                    onChange={(e) => setFormData({ ...formData, writtenDate: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Line ID (ถ้ามี)</Label>
                                <Input
                                    value={formData.lineId}
                                    onChange={(e) => setFormData({ ...formData, lineId: e.target.value })}
                                    placeholder="Line ID ของคุณ"
                                />
                            </div>
                        </div>

                        {/* Signature */}
                        <div className="space-y-4 pt-4 border-t">
                            <div className="space-y-2">
                                <Label>ลายเซ็นผู้ยินยอม</Label>
                                <SignaturePad 
                                    signatureUrl={signatureUrl}
                                    onSave={(url) => setSignatureUrl(url)}
                                    onDelete={() => setSignatureUrl('')}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>วันที่ลงนาม</Label>
                                <Input
                                    type="date"
                                    value={signatureDate}
                                    onChange={(e) => setSignatureDate(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Checkbox Agreement */}
                        <div className="flex items-start space-x-3 pt-4 border-t">
                            <Checkbox 
                                id="pdpa-agree"
                                checked={formData.agreed}
                                onCheckedChange={(checked) => setFormData({ ...formData, agreed: checked })}
                            />
                            <label htmlFor="pdpa-agree" className="text-sm cursor-pointer leading-relaxed">
                                ข้าพเจ้าได้อ่านและเข้าใจนโยบายความเป็นส่วนตัวแล้ว และข้าพเจ้ายินยอมให้บริษัทเก็บรวบรวม ใช้ 
                                และ/หรือเปิดเผยข้อมูลส่วนบุคคลของข้าพเจ้าตามที่ระบุไว้ในนโยบายนี้
                            </label>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-6 border-t">
                            <Button 
                                variant="outline"
                                onClick={onBack}
                                className="flex items-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                ย้อนกลับ
                            </Button>
                            <Button 
                                onClick={handleNext}
                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
                                disabled={!formData.agreed || !signatureUrl}
                            >
                                ดำเนินการต่อ
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}