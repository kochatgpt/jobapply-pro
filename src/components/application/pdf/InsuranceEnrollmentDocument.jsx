import React from 'react';

export default function InsuranceEnrollmentDocument({ applicant, formData = {} }) {
    const personalData = applicant?.personal_data || {};

    return (
        <div 
            className="pdpa-page bg-white text-slate-900 mx-auto relative shadow-sm print:shadow-none"
            style={{ 
                fontSize: "16px",
                padding: '15mm',
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'TH Sarabun New, Sarabun, sans-serif',
                lineHeight: '1.3'
            }}
        >
            {/* Header */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Left - Company Info */}
                <div>
                    <p className="text-[16px] font-bold">บริษัท วิริยะประกันภัย</p>
                    <p className="text-[16px]">ฝ่ายประกันกลุ่ม</p>
                </div>
                
                {/* Right - Document Title */}
                <div className="text-right">
                    <h1 className="text-[20px] font-bold">ใบสมัครขอเอาประกันภัยพนักงาน</h1>
                    <p className="text-[16px] font-semibold">Employee Enrollment Form</p>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                {/* Left Column - Main Information */}
                <div className="col-span-2 space-y-3">
                    {/* Employer Name */}
                    <div className="border border-slate-900 p-2">
                        <p className="text-[14px] mb-1">นามนายจ้าง (ชื่อบริษัท หรือ ห้างร้าน)</p>
                        <p className="text-[12px] mb-1">Name of Employer</p>
                        <div className="min-h-[24px] border-b border-dotted border-slate-400">
                            {formData.employerName || '\u00A0'}
                        </div>
                    </div>

                    {/* Employee Name */}
                    <div className="border border-slate-900 p-2">
                        <p className="text-[14px] mb-1">ชื่อพนักงาน</p>
                        <p className="text-[12px] mb-1">Name of Employee</p>
                        <div className="min-h-[24px] border-b border-dotted border-slate-400">
                            {applicant?.full_name || '\u00A0'}
                        </div>
                    </div>

                    {/* ID Card */}
                    <div className="border border-slate-900 p-2">
                        <p className="text-[14px] mb-1">เลขที่บัตรประชาชน</p>
                        <p className="text-[12px] mb-1">ID Card</p>
                        <div className="flex gap-1">
                            {(personalData.id_card || '').split('').concat(Array(13).fill('')).slice(0, 13).map((digit, idx) => (
                                <div key={idx} className="w-6 h-8 border border-slate-400 flex items-center justify-center text-center">
                                    {digit}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sex, Status, DOB, Employment Date */}
                    <div className="border border-slate-900 p-2">
                        <div className="grid grid-cols-4 gap-2">
                            {/* Sex */}
                            <div>
                                <p className="text-[14px] mb-1">เพศ Sex</p>
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1 text-[14px]">
                                        <input type="checkbox" checked={personalData.gender === 'male'} readOnly className="w-4 h-4" />
                                        <span>ชาย Male</span>
                                    </label>
                                    <label className="flex items-center gap-1 text-[14px]">
                                        <input type="checkbox" checked={personalData.gender === 'female'} readOnly className="w-4 h-4" />
                                        <span>หญิง Female</span>
                                    </label>
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <p className="text-[14px] mb-1 invisible">.</p>
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1 text-[14px]">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>โสด Single</span>
                                    </label>
                                    <label className="flex items-center gap-1 text-[14px]">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span>สมรส Married</span>
                                    </label>
                                </div>
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <p className="text-[14px] mb-1">วัน เดือน ปี เกิด</p>
                                <p className="text-[12px] mb-1">Date of Birth</p>
                                <div className="flex gap-1 mt-2">
                                    {Array(8).fill('').map((_, idx) => (
                                        <div key={idx} className="w-5 h-6 border border-slate-400"></div>
                                    ))}
                                </div>
                                <p className="text-[10px] mt-1">ว D ด M ป Y</p>
                            </div>

                            {/* Date of Employment */}
                            <div>
                                <p className="text-[14px] mb-1">วันที่เริ่มทำงาน</p>
                                <p className="text-[12px] mb-1">Date of employment</p>
                                <div className="flex gap-1 mt-2">
                                    {Array(8).fill('').map((_, idx) => (
                                        <div key={idx} className="w-5 h-6 border border-slate-400"></div>
                                    ))}
                                </div>
                                <p className="text-[10px] mt-1">ว D ด M ป Y</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Insurance Info */}
                <div className="col-span-1">
                    <div className="border border-slate-900 p-3 mb-3">
                        <p className="text-[14px] font-semibold mb-2 text-center">สำหรับ บริษัท วิริยะประกันภัย</p>
                        <div className="space-y-2">
                            <div>
                                <p className="text-[12px]">กรมธรรม์ประกันกลุ่มเลขที่</p>
                                <p className="text-[11px]">Group No.</p>
                                <div className="border-b border-dotted border-slate-400 min-h-[20px]"></div>
                            </div>
                            <div>
                                <p className="text-[12px]">ใบรับรองเลขที่</p>
                                <p className="text-[11px]">Certificate No.</p>
                                <div className="border-b border-dotted border-slate-400 min-h-[20px]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Beneficiary Section */}
                    <div className="border border-slate-900 p-3">
                        <p className="text-[13px] font-semibold mb-2">โปรดแจ้งผู้รับประโยชน์และระบุความสัมพันธ์</p>
                        <p className="text-[10px] mb-2">* กรณีที่มีการแก้ไข ขีดฆ่า ขูดลบ โปรดเซ็นชื่อกำกับด้วย</p>
                        
                        <div className="space-y-1 text-[12px]">
                            <div className="grid grid-cols-2 gap-1 font-semibold">
                                <p>ชื่อผู้รับประโยชน์<br/>Beneficiary</p>
                                <p>ความสัมพันธ์<br/>Relationship</p>
                            </div>
                            {Array(4).fill('').map((_, idx) => (
                                <div key={idx} className="grid grid-cols-2 gap-1">
                                    <div className="border-b border-dotted border-slate-400 min-h-[20px]"></div>
                                    <div className="border-b border-dotted border-slate-400 min-h-[20px]"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Terms and Conditions */}
            <div className="border border-slate-900 p-3 mb-4 text-[13px] text-justify leading-tight">
                <p className="font-semibold mb-2">ในกรณีที่ท่านมีส่วนออกเงินสมทบสำหรับตัวท่านเอง และผู้อยู่ในอุปการะของท่าน โปรดอ่านข้อความข้างล่างนี้ :</p>
                <p className="indent-8">
                    ณ ที่นี้ ข้าพเจ้าตกลง และรับใบสมัครขอเอาประกันภัยพนักงาน และจำนวนเงินเอาประกันภัยกลุ่มที่ข้าพเจ้ามีสิทธิภายใต้สัญญาที่ออกโดย บริษัท เอไอเอ จำกัด และข้าพเจ้าอนุญาตให้นายจ้างหักเงินรายได้ของข้าพเจ้า เพื่อชำระเบี้ยประกันภัยส่วนของข้าพเจ้า ข้าพเจ้าสงวนสิทธิที่จะไม่อนุญาตให้นายจ้างหักเงินรายได้ของข้าพเจ้าเมื่อไรก็ได้ โดยแจ้งให้บริษัททราบล่วงหน้าเป็นลายลักษณ์อักษร อนึ่ง เป็นที่ตกลงและเข้าใจว่าสิทธิดังกล่าวข้างต้นจะมีผลก็ต่อเมื่อได้แจ้งให้นายจ้างทราบเป็นลายลักษณ์อักษรล่วงหน้า 30 วัน และการคุ้มครองตามกรมธรรม์ประกันภัยกลุ่มที่ข้าพเจ้ามีส่วนร่วมออกเงินสมทบจะสิ้นสุดลงตั้งแต่วันที่ไม่ได้หักเงินรายได้ของข้าพเจ้า
                </p>
            </div>

            {/* Dependent Coverage Notice */}
            <div className="border border-slate-900 p-3 mb-6 text-[13px]">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="font-semibold mb-1">ถ้าท่านประสงค์ให้มีประกันภัยผู้อยู่ในอุปการะ โปรดกรอกใบสมัครขอเอาประกันภัยผู้อยู่ในอุปการะด้วย</p>
                        <p className="text-[11px] italic">If you are provided with dependent coverage and are enrolling your dependents, please complete a "Dependent Enrollment Form".</p>
                    </div>
                    <div className="text-right">
                        <div className="border-b border-dotted border-slate-400 min-h-[30px] mb-2"></div>
                        <p className="text-[12px]">วันที่ Date</p>
                        <div className="border-b border-dotted border-slate-400 min-h-[40px] mt-4 mb-2"></div>
                        <p className="text-[12px]">ลายเซ็นพนักงานผู้สมัคร / ผู้เอาประกันภัย</p>
                        <p className="text-[11px]">Signature of Employee</p>
                    </div>
                </div>
            </div>
        </div>
    );
}