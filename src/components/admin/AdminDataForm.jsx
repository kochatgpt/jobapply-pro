import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Save, X, Loader2 } from "lucide-react";
import SignaturePad from './SignaturePad';

export default function AdminDataForm({ applicant, onSave, onCancel, isSaving = false }) {
    const [adminData, setAdminData] = useState(applicant.admin_data || {
        hr_systems: {},
        hr_info: {},
        documents: {},
        test_results: {},
        interview: {},
        approvals: {
            recruiter: {},
            committee: {},
            hr_manager: {},
            department_head: {},
            final_decision: {}
        }
    });

    const handleSave = () => {
        onSave(adminData);
    };

    const updateField = (path, value) => {
        const newData = { ...adminData };
        const keys = path.split('.');
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        setAdminData(newData);
    };

    const getField = (path) => {
        const keys = path.split('.');
        let current = adminData;
        for (const key of keys) {
            if (!current || !current[key]) return '';
            current = current[key];
        }
        return current || '';
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8">
                <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-lg z-10">
                    <h2 className="text-xl font-bold">กรอกข้อมูลสำหรับ Admin</h2>
                    <Button variant="ghost" size="icon" onClick={onCancel}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <div className="px-6 py-4 space-y-6 max-h-[70vh] overflow-y-auto">
                    {/* 1. HR Systems */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm border-b pb-2">1. ระบบ HR</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <Checkbox 
                                    checked={getField('hr_systems.web_hr')}
                                    onCheckedChange={(checked) => updateField('hr_systems.web_hr', checked)}
                                />
                                <Label>Web HR</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox 
                                    checked={getField('hr_systems.b_plus')}
                                    onCheckedChange={(checked) => updateField('hr_systems.b_plus', checked)}
                                />
                                <Label>B-plus</Label>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Checkbox 
                                        checked={getField('hr_systems.sps_in')}
                                        onCheckedChange={(checked) => updateField('hr_systems.sps_in', checked)}
                                    />
                                    <Label>สปส.(เข้า)</Label>
                                </div>
                                {getField('hr_systems.sps_in') && (
                                    <Input 
                                        placeholder="ระบุรายละเอียด"
                                        value={getField('hr_systems.sps_in_details')}
                                        onChange={(e) => updateField('hr_systems.sps_in_details', e.target.value)}
                                    />
                                )}
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Checkbox 
                                        checked={getField('hr_systems.sps_out')}
                                        onCheckedChange={(checked) => updateField('hr_systems.sps_out', checked)}
                                    />
                                    <Label>สปส.(ออก)</Label>
                                </div>
                                {getField('hr_systems.sps_out') && (
                                    <Input 
                                        placeholder="ระบุรายละเอียด"
                                        value={getField('hr_systems.sps_out_details')}
                                        onChange={(e) => updateField('hr_systems.sps_out_details', e.target.value)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 1.5. SPS Form Type */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm border-b pb-2">1.5. ประเภทแบบฟอร์ม สปส.</h3>
                        <div className="space-y-2">
                            <Label>เลือกประเภทแบบฟอร์ม สปส. สำหรับผู้สมัครคนนี้</Label>
                            <RadioGroup 
                                value={getField('sps_form_type') || '1-03'}
                                onValueChange={(value) => updateField('sps_form_type', value)}
                            >
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                                        <RadioGroupItem value="1-03" id="sps-1-03" />
                                        <Label htmlFor="sps-1-03" className="cursor-pointer flex-1">
                                            <div className="font-semibold">สปส. 1-03</div>
                                            <div className="text-xs text-slate-500">มีประกันสังคมอยู่แล้ว (ย้ายจากที่อื่น)</div>
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                                        <RadioGroupItem value="9-02" id="sps-9-02" />
                                        <Label htmlFor="sps-9-02" className="cursor-pointer flex-1">
                                            <div className="font-semibold">สปส. 9-02</div>
                                            <div className="text-xs text-slate-500">ยังไม่มีการทำประกันสังคมไว้</div>
                                        </Label>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* 2. HR Info */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm border-b pb-2">2. ข้อมูล HR</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>รหัสพนักงาน</Label>
                                <Input 
                                    value={getField('hr_info.employee_id')}
                                    onChange={(e) => updateField('hr_info.employee_id', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>วันที่เริ่มงานจริง</Label>
                                <Input 
                                    type="date"
                                    value={getField('hr_info.actual_start_date')}
                                    onChange={(e) => updateField('hr_info.actual_start_date', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>หน่วยงาน/สังกัด</Label>
                                <Input 
                                    value={getField('hr_info.department')}
                                    onChange={(e) => updateField('hr_info.department', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>ไซด์เสื้อ</Label>
                                <Input 
                                    value={getField('hr_info.shirt_size')}
                                    onChange={(e) => updateField('hr_info.shirt_size', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>จำนวน (ตัว)</Label>
                                <Input 
                                    value={getField('hr_info.shirt_quantity')}
                                    onChange={(e) => updateField('hr_info.shirt_quantity', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Documents Checklist */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm border-b pb-2">เอกสารประกอบ</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { key: 'photos', label: 'รูปถ่าย 1-3 รูป' },
                                { key: 'id_card_copy', label: 'สำเนาบัตรประชาชน 3 ฉบับ' },
                                { key: 'house_registration', label: 'สำเนาทะเบียนบ้าน' },
                                { key: 'education_cert', label: 'สำเนาวุฒิการศึกษา' },
                                { key: 'education_confirmation', label: 'หนังสือรับรองการศึกษา' },
                                { key: 'name_change_proof', label: 'หลักฐานการเปลี่ยนชื่อ-นามสกุล (ถ้ามี)' },
                                { key: 'military_cert', label: 'สำเนาใบเกณฑ์ทหาร (ชาย)' },
                                { key: 'employment_contract', label: 'สัญญาจ้าง' },
                                { key: 'training_agreement', label: 'บันทึกข้อตกลงเข้ารับการฝึกอบรม' },
                                { key: 'social_security_form', label: 'แบบฟอร์มประกันสังคม' },
                                { key: 'criminal_check_consent', label: 'หนังสือยินยอมการตรวจอาชญากรรม' },
                                { key: 'health_cert', label: 'ใบรับรองแพทย์การตรวจสุขภาพ' },
                                { key: 'bank_book_copy', label: 'สำเนาบุ๊คแบงค์' },
                                { key: 'work_cert', label: 'หนังสือรับรองการทำงาน (ถ้ามี)' },
                                { key: 'pdpa_consent', label: 'หนังสือยินยอมข้อมตกลงให้ประมวลผลเก็บรวบรวมหรือเปิดเผยข้อมูลส่วนบุคคล (PDPA)' },
                                { key: 'jd', label: 'JD' }
                            ].map(doc => (
                                <div key={doc.key} className="flex items-center gap-2">
                                    <Checkbox 
                                        checked={getField(`documents.${doc.key}`)}
                                        onCheckedChange={(checked) => updateField(`documents.${doc.key}`, checked)}
                                    />
                                    <Label className="text-sm">{doc.label}</Label>
                                </div>
                            ))}
                            <div className="flex items-center gap-2 col-span-2">
                                <Checkbox 
                                    checked={getField('documents.other_support')}
                                    onCheckedChange={(checked) => updateField('documents.other_support', checked)}
                                />
                                <Label className="text-sm">เอกสาร Support อื่นๆ</Label>
                                {getField('documents.other_support') && (
                                    <Input 
                                        placeholder="ระบุ"
                                        className="flex-1"
                                        value={getField('documents.other_support_details')}
                                        onChange={(e) => updateField('documents.other_support_details', e.target.value)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 3. Test Results */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm border-b pb-2">3. ผลการทดสอบ</h3>
                        <div className="space-y-2">
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <Label>ทดสอบครั้งที่ 1 - ตัวเลข</Label>
                                    <Input 
                                        value={getField('test_results.test1_number')}
                                        onChange={(e) => updateField('test_results.test1_number', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>ไทย</Label>
                                    <Input 
                                        value={getField('test_results.test1_thai')}
                                        onChange={(e) => updateField('test_results.test1_thai', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>อังกฤษ</Label>
                                    <Input 
                                        value={getField('test_results.test1_english')}
                                        onChange={(e) => updateField('test_results.test1_english', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <Label>ทดสอบครั้งที่ 2 - ตัวเลข</Label>
                                    <Input 
                                        value={getField('test_results.test2_number')}
                                        onChange={(e) => updateField('test_results.test2_number', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>ไทย</Label>
                                    <Input 
                                        value={getField('test_results.test2_thai')}
                                        onChange={(e) => updateField('test_results.test2_thai', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>อังกฤษ</Label>
                                    <Input 
                                        value={getField('test_results.test2_english')}
                                        onChange={(e) => updateField('test_results.test2_english', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label>ทดสอบอื่นๆ</Label>
                                <Input 
                                    value={getField('test_results.other_test')}
                                    onChange={(e) => updateField('test_results.other_test', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 4. Interview */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm border-b pb-2">4. การสัมภาษณ์</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>ลงชื่อ ผู้สัมภาษณ์</Label>
                                <Input 
                                    value={getField('interview.interviewer_name')}
                                    onChange={(e) => updateField('interview.interviewer_name', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>รายละเอียดในการสัมภาษณ์</Label>
                                <Textarea 
                                    value={getField('interview.interview_details')}
                                    onChange={(e) => updateField('interview.interview_details', e.target.value)}
                                    rows={2}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 5. Recruiter Approval */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm border-b pb-2">5. เจ้าหน้าที่สรรหาว่าจ้าง</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>ลายเซ็น</Label>
                                <SignaturePad 
                                    signatureUrl={getField('approvals.recruiter.signature')}
                                    onSave={(url) => updateField('approvals.recruiter.signature', url)}
                                    label="ลงชื่อผู้ดำเนินการ"
                                />
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <Label>ชื่อ-นามสกุล (ตัวบรรจง)</Label>
                                    <Input 
                                        value={getField('approvals.recruiter.name')}
                                        onChange={(e) => updateField('approvals.recruiter.name', e.target.value)}
                                        placeholder="ชื่อ-นามสกุล"
                                    />
                                </div>
                                <div>
                                    <Label>วันที่</Label>
                                    <Input 
                                        type="date"
                                        value={getField('approvals.recruiter.date')}
                                        onChange={(e) => updateField('approvals.recruiter.date', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 6. Committee */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm border-b pb-2">6. กรรมการ</h3>
                        <RadioGroup 
                            value={getField('approvals.committee.decision')}
                            onValueChange={(value) => updateField('approvals.committee.decision', value)}
                        >
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="approved" id="committee-approved" />
                                    <Label htmlFor="committee-approved">อนุมัติรับ</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="rejected" id="committee-rejected" />
                                    <Label htmlFor="committee-rejected">ไม่รับ</Label>
                                </div>
                            </div>
                        </RadioGroup>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>ลายเซ็น</Label>
                                <SignaturePad 
                                    signatureUrl={getField('approvals.committee.signature')}
                                    onSave={(url) => updateField('approvals.committee.signature', url)}
                                    label="ลงชื่อกรรมการ"
                                />
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <Label>ชื่อ-นามสกุล (ตัวบรรจง)</Label>
                                    <Input 
                                        value={getField('approvals.committee.name')}
                                        onChange={(e) => updateField('approvals.committee.name', e.target.value)}
                                        placeholder="ชื่อ-นามสกุล"
                                    />
                                </div>
                                <div>
                                    <Label>วันที่</Label>
                                    <Input 
                                        type="date"
                                        value={getField('approvals.committee.date')}
                                        onChange={(e) => updateField('approvals.committee.date', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 7. HR Manager */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm border-b pb-2">7. ผู้จัดการฝ่ายบุคคล</h3>
                        <RadioGroup 
                            value={getField('approvals.hr_manager.decision')}
                            onValueChange={(value) => updateField('approvals.hr_manager.decision', value)}
                        >
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="approved" id="hr-approved" />
                                    <Label htmlFor="hr-approved">อนุมัติรับ</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="rejected" id="hr-rejected" />
                                    <Label htmlFor="hr-rejected">ไม่รับ</Label>
                                </div>
                            </div>
                        </RadioGroup>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>ลายเซ็น</Label>
                                <SignaturePad 
                                    signatureUrl={getField('approvals.hr_manager.signature')}
                                    onSave={(url) => updateField('approvals.hr_manager.signature', url)}
                                    label="ลงชื่อผู้จัดการฝ่ายบุคคล"
                                />
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <Label>ชื่อ-นามสกุล (ตัวบรรจง)</Label>
                                    <Input 
                                        value={getField('approvals.hr_manager.name')}
                                        onChange={(e) => updateField('approvals.hr_manager.name', e.target.value)}
                                        placeholder="ชื่อ-นามสกุล"
                                    />
                                </div>
                                <div>
                                    <Label>วันที่</Label>
                                    <Input 
                                        type="date"
                                        value={getField('approvals.hr_manager.date')}
                                        onChange={(e) => updateField('approvals.hr_manager.date', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 8. Department Head */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm border-b pb-2">8. หัวหน้าแผนก/หัวหน้างานต้นสังกัด</h3>
                        <RadioGroup 
                            value={getField('approvals.department_head.decision')}
                            onValueChange={(value) => updateField('approvals.department_head.decision', value)}
                        >
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="approved" id="dept-approved" />
                                    <Label htmlFor="dept-approved">อนุมัติรับ</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="rejected" id="dept-rejected" />
                                    <Label htmlFor="dept-rejected">ไม่รับ</Label>
                                </div>
                            </div>
                        </RadioGroup>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>ลายเซ็น</Label>
                                <SignaturePad 
                                    signatureUrl={getField('approvals.department_head.signature')}
                                    onSave={(url) => updateField('approvals.department_head.signature', url)}
                                    label="ลงชื่อหัวหน้าแผนก"
                                />
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <Label>ชื่อ-นามสกุล (ตัวบรรจง)</Label>
                                    <Input 
                                        value={getField('approvals.department_head.name')}
                                        onChange={(e) => updateField('approvals.department_head.name', e.target.value)}
                                        placeholder="ชื่อ-นามสกุล"
                                    />
                                </div>
                                <div>
                                    <Label>วันที่</Label>
                                    <Input 
                                        type="date"
                                        value={getField('approvals.department_head.date')}
                                        onChange={(e) => updateField('approvals.department_head.date', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 9. Final Decision */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm border-b pb-2">9. ความเห็นกรรมการผู้อนุมัติ</h3>
                        <RadioGroup 
                            value={getField('approvals.final_decision.result')}
                            onValueChange={(value) => updateField('approvals.final_decision.result', value)}
                        >
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="passed" id="final-passed" />
                                    <Label htmlFor="final-passed">ผ่าน</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="failed" id="final-failed" />
                                    <Label htmlFor="final-failed">ไม่ผ่าน</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="pending" id="final-pending" />
                                    <Label htmlFor="final-pending">รอพิจารณา</Label>
                                </div>
                            </div>
                        </RadioGroup>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>สังกัด/แผนก</Label>
                                <Input 
                                    value={getField('approvals.final_decision.department')}
                                    onChange={(e) => updateField('approvals.final_decision.department', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>รับพิจารณา ตำแหน่ง</Label>
                                <Input 
                                    value={getField('approvals.final_decision.position')}
                                    onChange={(e) => updateField('approvals.final_decision.position', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>อัตราเงินเดือน</Label>
                                <Input 
                                    value={getField('approvals.final_decision.salary')}
                                    onChange={(e) => updateField('approvals.final_decision.salary', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>เหตุผลการพิจารณาอื่นๆ</Label>
                                <Input 
                                    value={getField('approvals.final_decision.other_reason')}
                                    onChange={(e) => updateField('approvals.final_decision.other_reason', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex justify-end gap-3 rounded-b-lg">
                    <Button variant="outline" onClick={onCancel} disabled={isSaving}>
                        ยกเลิก
                    </Button>
                    <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700" disabled={isSaving}>
                        {isSaving ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                กำลังบันทึก...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                บันทึก
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}