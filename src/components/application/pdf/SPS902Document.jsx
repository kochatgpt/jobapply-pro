import React from 'react';

export default function SPS902Document({ applicant, formData = {} }) {
    const personalData = applicant?.personal_data || {};
    
    return (
        <div 
            className="pdpa-page bg-white mx-auto relative shadow-sm print:shadow-none"
            style={{ 
                fontSize: "14px",
                padding: '8mm',
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'TH Sarabun New, Sarabun, sans-serif',
                lineHeight: '1.4'
            }}
        >
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-[20px] font-bold mb-2">แบบ สปส. 9-02</h1>
                <h2 className="text-[18px] font-bold mb-1">แบบรายงานการเข้าเป็นผู้ประกันตน</h2>
                <p className="text-[14px]">(กรณีไม่เคยมีประกันสังคม)</p>
            </div>

            {/* เลขที่กรมธรรม์ - Row 1 (col-1) */}
            <div className="mb-4 border border-slate-900 p-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-sm">เลขประจำตัวประชาชน</span>
                    <div className="flex gap-1">
                        {(personalData.id_card || '').split('').concat(Array(13).fill('')).slice(0, 13).map((digit, idx) => (
                            <div key={idx} className="w-6 h-8 border border-slate-400 flex items-center justify-center text-sm">
                                {digit}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ข้อมูลผู้ประกันตน */}
            <div className="border border-slate-900 p-4 mb-4">
                <h3 className="font-bold mb-3">ข้อมูลผู้ประกันตน</h3>
                
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm">คำนำหน้า</label>
                            <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                                {personalData.prefix || '\u00A0'}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm">ชื่อ</label>
                            <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                                {personalData.first_name || '\u00A0'}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm">นามสกุล</label>
                            <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                                {personalData.last_name || '\u00A0'}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm">วัน/เดือน/ปีเกิด</label>
                            <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                                {personalData.dob ? new Date(personalData.dob).toLocaleDateString('th-TH', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) : '\u00A0'}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm">สัญชาติ</label>
                            <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                                {personalData.nationality || '\u00A0'}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm">เพศ</label>
                            <div className="flex gap-4 mt-2">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={personalData.gender === 'male'} readOnly className="w-4 h-4" />
                                    <span>ชาย</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={personalData.gender === 'female'} readOnly className="w-4 h-4" />
                                    <span>หญิง</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm">หมายเลขโทรศัพท์</label>
                            <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                                {personalData.mobile_phone || '\u00A0'}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm">ที่อยู่ตามทะเบียนบ้าน</label>
                        <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                            {personalData.registered_address ? 
                                `${personalData.registered_address.number || ''} หมู่ ${personalData.registered_address.moo || ''} ถนน ${personalData.registered_address.road || ''} ตำบล/แขวง ${personalData.registered_address.subdistrict || ''} อำเภอ/เขต ${personalData.registered_address.district || ''} จังหวัด ${personalData.registered_address.province || ''} ${personalData.registered_address.zipcode || ''}`
                                : '\u00A0'
                            }
                        </div>
                    </div>

                    <div>
                        <label className="text-sm">ที่อยู่ปัจจุบัน</label>
                        <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                            {personalData.current_address ? 
                                `${personalData.current_address.number || ''} หมู่ ${personalData.current_address.moo || ''} ถนน ${personalData.current_address.road || ''} ตำบล/แขวง ${personalData.current_address.subdistrict || ''} อำเภอ/เขต ${personalData.current_address.district || ''} จังหวัด ${personalData.current_address.province || ''} ${personalData.current_address.zipcode || ''}`
                                : '\u00A0'
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* ข้อมูลนายจ้าง */}
            <div className="border border-slate-900 p-4 mb-4">
                <h3 className="font-bold mb-3">ข้อมูลนายจ้าง</h3>
                <div className="space-y-3">
                    <div>
                        <label className="text-sm">ชื่อสถานประกอบการ</label>
                        <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                            {formData.employerName || '\u00A0'}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm">เลขที่นายจ้าง (10 หลัก)</label>
                        <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                            {formData.employerId || '\u00A0'}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm">วันที่เริ่มทำงาน</label>
                        <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                            {applicant?.start_work_date ? new Date(applicant.start_work_date).toLocaleDateString('th-TH', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }) : '\u00A0'}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm">ตำแหน่งงาน</label>
                        <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                            {personalData.position_1 || '\u00A0'}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm">อัตราค่าจ้าง (บาท/เดือน)</label>
                        <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                            {formData.salary || personalData.expected_salary || '\u00A0'}
                        </div>
                    </div>
                </div>
            </div>

            {/* ข้อมูลการศึกษา */}
            <div className="border border-slate-900 p-4 mb-4">
                <h3 className="font-bold mb-3">วุฒิการศึกษาสูงสุด</h3>
                <div className="space-y-2">
                    <div>
                        <label className="text-sm">ระดับการศึกษา</label>
                        <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                            {formData.educationLevel || '\u00A0'}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm">สาขาวิชา</label>
                        <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                            {formData.educationMajor || '\u00A0'}
                        </div>
                    </div>
                </div>
            </div>

            {/* ลายเซ็น */}
            <div className="mt-8 grid grid-cols-2 gap-8">
                <div className="text-center">
                    <div className="border-b border-slate-400 min-h-[60px] mb-2 mx-8 flex items-center justify-center">
                        {applicant?.signature_url ? (
                            <img src={applicant.signature_url} alt="Signature" crossOrigin="anonymous" className="h-[50px] object-contain" />
                        ) : (
                            '\u00A0'
                        )}
                    </div>
                    <p>ลายมือชื่อผู้ประกันตน</p>
                    <p className="text-sm text-slate-600 mt-2">
                        วันที่ {formData.signatureDate ? new Date(formData.signatureDate).toLocaleDateString('th-TH', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }) : '................................'}
                    </p>
                </div>
                <div className="text-center">
                    <div className="border-b border-slate-400 min-h-[60px] mb-2 mx-8">
                        \u00A0
                    </div>
                    <p>ลายมือชื่อนายจ้าง/ผู้มีอำนาจลงนาม</p>
                    <p className="text-sm text-slate-600 mt-2">
                        วันที่ ................................
                    </p>
                </div>
            </div>

            {/* หมายเหตุ */}
            <div className="mt-6 p-4 bg-slate-50 border border-slate-300 rounded">
                <p className="text-sm"><strong>หมายเหตุ:</strong></p>
                <ul className="text-sm list-disc list-inside space-y-1 mt-2">
                    <li>ต้องแนบสำเนาบัตรประจำตัวประชาชน และสำเนาทะเบียนบ้าน</li>
                    <li>กรณีชาวต่างชาติ ต้องแนบสำเนาใบอนุญาตทำงาน</li>
                </ul>
            </div>
        </div>
    );
}