import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import SignaturePad from '@/components/admin/SignaturePad';
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
                        {/* PDPA Content */}
                        <ScrollArea className="h-[400px] border rounded-lg p-6 bg-white">
                            <div className="prose prose-sm max-w-none space-y-4 text-slate-700">
                                <p className="text-center font-semibold text-lg">แบบฟอร์มแสดงเจตนายินยอมให้เก็บรวมรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคล</p>
                                
                                <p className="indent-8">
                                    ข้าพเจ้า <strong>{globalData.personal_data?.first_name} {globalData.personal_data?.last_name}</strong> อายุ <strong>{globalData.personal_data?.age}</strong> ปี 
                                    หมายเลขบัตรประจำตัวประชาชน <strong>{globalData.personal_data?.id_card}</strong> ซึ่งต่อไปนี้เรียกว่า "เจ้าของข้อมูลส่วนบุคคล" 
                                    ขอแสดงเจตนายินยอมให้บริษัท (ชื่อบริษัท) จำกัด ซึ่งต่อไปนี้เรียกว่า "บริษัท" เก็บรวบรวม ใช้ และ/หรือ เปิดเผยข้อมูลส่วนบุคคลของข้าพเจ้าตามรายละเอียดดังต่อไปนี้
                                </p>

                                <div className="space-y-3">
                                    <p className="font-semibold">1. วัตถุประสงค์</p>
                                    <p className="indent-8">
                                        บริษัทจะเก็บรวบรวม ใช้ และ/หรือ เปิดเผยข้อมูลส่วนบุคคลของข้าพเจ้า เพื่อวัตถุประสงค์ ดังต่อไปนี้
                                    </p>
                                    <ul className="list-disc pl-12 space-y-1">
                                        <li>เพื่อพิจารณาการจ้างงานและการบริหารทรัพยากรบุคคล</li>
                                        <li>เพื่อการปฏิบัติตามกฎหมาย ระเบียบ ข้อบังคับที่เกี่ยวข้อง</li>
                                        <li>เพื่อการติดต่อสื่อสารที่เกี่ยวข้องกับการจ้างงาน</li>
                                        <li>เพื่อการจัดสวัสดิการและผลประโยชน์ของพนักงาน</li>
                                        <li>เพื่อการพัฒนาและฝึกอบรมพนักงาน</li>
                                    </ul>

                                    <p className="font-semibold mt-4">2. ประเภทข้อมูลส่วนบุคคล</p>
                                    <p className="indent-8">ข้อมูลส่วนบุคคลที่บริษัทจะเก็บรวบรวม ใช้ และ/หรือ เปิดเผย ได้แก่</p>
                                    <ul className="list-disc pl-12 space-y-1">
                                        <li>ข้อมูลส่วนตัว เช่น ชื่อ นามสกุล อายุ วันเดือนปีเกิด เพศ สัญชาติ</li>
                                        <li>ข้อมูลติดต่อ เช่น ที่อยู่ อีเมล หมายเลขโทรศัพท์</li>
                                        <li>ข้อมูลการศึกษาและประวัติการทำงาน</li>
                                        <li>ข้อมูลสุขภาพที่จำเป็นต่อการจ้างงาน</li>
                                        <li>รูปถ่าย ลายเซ็น</li>
                                        <li>ข้อมูลบัญชีธนาคารสำหรับการจ่ายเงินเดือน</li>
                                        <li>ข้อมูลบัตรประชาชน และเอกสารทางราชการอื่นๆ</li>
                                    </ul>

                                    <p className="font-semibold mt-4">3. การเปิดเผยข้อมูลส่วนบุคคล</p>
                                    <p className="indent-8">บริษัทอาจเปิดเผยข้อมูลส่วนบุคคลของข้าพเจ้าให้กับ</p>
                                    <ul className="list-disc pl-12 space-y-1">
                                        <li>หน่วยงานราชการที่เกี่ยวข้อง เช่น สำนักงานประกันสังคม กรมสรรพากร</li>
                                        <li>บุคคลหรือนิติบุคคลที่ให้บริการแก่บริษัท เช่น สถาบันการเงิน บริษัทประกันภัย</li>
                                        <li>ผู้ตรวจสอบบัญชี ที่ปรึกษากฎหมาย</li>
                                    </ul>

                                    <p className="font-semibold mt-4">4. ระยะเวลาในการเก็บรักษาข้อมูล</p>
                                    <p className="indent-8">
                                        บริษัทจะเก็บรักษาข้อมูลส่วนบุคคลของข้าพเจ้าตลอดระยะเวลาที่จำเป็นเพื่อให้บรรลุวัตถุประสงค์ที่กำหนดไว้ 
                                        หรือตามที่กฎหมายกำหนด โดยหลังจากสิ้นสุดการจ้างงาน บริษัทจะเก็บข้อมูลไว้เป็นระยะเวลาอย่างน้อย 10 ปี
                                    </p>

                                    <p className="font-semibold mt-4">5. สิทธิของเจ้าของข้อมูลส่วนบุคคล</p>
                                    <p className="indent-8">ข้าพเจ้าทราบว่ามีสิทธิในการ</p>
                                    <ul className="list-disc pl-12 space-y-1">
                                        <li>เข้าถึงและขอรับสำเนาข้อมูลส่วนบุคคลของข้าพเจ้า</li>
                                        <li>ขอให้แก้ไขข้อมูลส่วนบุคคลที่ไม่ถูกต้อง</li>
                                        <li>ขอให้ลบหรือทำลายข้อมูลส่วนบุคคลในกรณีที่กฎหมายอนุญาต</li>
                                        <li>ขอให้ระงับการใช้ข้อมูลส่วนบุคคลในกรณีที่กฎหมายอนุญาต</li>
                                        <li>คัดค้านการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคล</li>
                                        <li>ถอนความยินยอมในการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคล</li>
                                    </ul>

                                    <p className="font-semibold mt-4">6. การติดต่อบริษัท</p>
                                    <p className="indent-8">
                                        หากข้าพเจ้ามีข้อสงสัยหรือต้องการใช้สิทธิของเจ้าของข้อมูลส่วนบุคคล สามารถติดต่อบริษัทได้ที่<br/>
                                        อีเมล: hr@company.com<br/>
                                        โทร: 02-XXX-XXXX
                                    </p>
                                </div>

                                <p className="mt-6 indent-8">
                                    ข้าพเจ้าได้อ่านและเข้าใจข้อความในแบบฟอร์มนี้โดยละเอียดแล้ว และข้าพเจ้ายินยอมให้บริษัทเก็บรวบรวม ใช้ 
                                    และ/หรือ เปิดเผยข้อมูลส่วนบุคคลของข้าพเจ้าตามที่ระบุไว้ในแบบฟอร์มนี้
                                </p>
                            </div>
                        </ScrollArea>

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