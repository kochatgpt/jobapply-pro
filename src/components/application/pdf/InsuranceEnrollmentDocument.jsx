import React from 'react';
import PDFCheckbox from './PDFCheckbox';

export default function InsuranceEnrollmentDocument({ applicant, formData = {} }) {
    const personalData = applicant?.personal_data || {};
    const familyData = applicant?.family_data || {};

    return (
        <div 
            className="pdpa-page bg-white mx-auto relative shadow-sm print:shadow-none"
            style={{ 
                fontSize: "12px",
                padding: '6mm',
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'TH Sarabun New, Sarabun, sans-serif',
                lineHeight: '1.3'
            }}
        >
            {/* Header */}
            <div className="grid grid-cols-2 gap-8 mb-6">
                {/* Left - Company Info */}
                <div className="flex flex-col justify-center">
                    <p className="text-[16px] font-bold">บริษัท วิริยะประกันภัย</p>
                    <p className="text-[14px]">ฝ่ายประกันกลุ่ม</p>
                </div>
                
                {/* Right - Document Title */}
                <div className="text-center flex flex-col justify-center">
                    <h1 className="text-[20px] font-bold">ใบสมัครขอเอาประกันภัยพนักงาน</h1>
                    <p className="text-[218x]">Employee Enrollment Form</p>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: '55fr 45fr' }}>
                {/* Left Column - Main Information */}
                <div className="space-y-3">
                    {/* Employer Name */}
                    <div className="border border-slate-900 p-2">
                        <p className="mb-1">นามนายจ้าง (ชื่อบริษัท หรือ ห้างร้าน)</p>
                        <p className="mb-1">Name of Employer</p>
                        <div className="min-h-[24px] pb-1">
                            {formData.employerName || '\u00A0'}
                        </div>
                    </div>

                    {/* Employee Name */}
                    <div className="border border-slate-900 p-2">
                        <p className="mb-1">ชื่อพนักงาน</p>
                        <p className="mb-1">Name of Employee</p>
                        <div className="min-h-[24px] pb-1">
                            {applicant?.full_name || '\u00A0'}
                        </div>
                    </div>

                    {/* ID Card */}
                    <div className="border border-slate-900 p-1">
                        <div className="mb-1">
                            <p className="">เลขที่บัตรประชาชน</p>
                            <div className="flex items-center justify-between">
                                <p className="">ID Card</p>
                                <div className="flex">
                                    {(personalData.id_card || '').split('').concat(Array(13).fill('')).slice(0, 13).map((digit, idx) => (
                                        <div key={idx} className="py-1 px-1.5 mt-2 border border-slate-400 flex items-center justify-center text-center text-[12px]">
                                            {digit}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sex, Status, DOB, Employment Date */}
                    <div className="border border-slate-900">
                        <div className="flex grid-col-4 gap-1">
                            {/* Sex */}
                            <div className="border-r p-2">
                                <p className=" mb-1">เพศ Sex</p>
                                <div className="space-y-1">
                                    <label className="flex space-between items-center gap-1 ">
                                        <div className="grid">
                                            <span>ชาย</span>
                                            <span>Male</span>
                                        </div>
                                        <PDFCheckbox checked={personalData.gender === 'male'} checkType={'check'} />
                                    </label>
                                    <label className="flex space-between items-center gap-1 ">
                                        <div className="grid">
                                            <span>หญิง</span>
                                            <span>Female</span>
                                        </div>
                                        <PDFCheckbox checked={personalData.gender === 'female'} checkType={'check'} />
                                    </label>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="border-r p-2">
                                <p className=" mb-1 invisible">.</p>
                                <div className="space-y-1">
                                    <label className="flex space-between items-center gap-1 ">
                                        <div className="grid">
                                            <span>โสด</span>
                                            <span>Single</span>
                                        </div>
                                        <PDFCheckbox checked={familyData.marital_status === 'single'} checkType={'check'} />
                                    </label>
                                    <label className="flex space-between items-center gap-1 ">
                                        <div className="grid">
                                            <span>สมรส</span>
                                            <span>Married</span>
                                        </div>
                                        <PDFCheckbox checked={familyData.marital_status === 'married'} checkType={'check'} />
                                    </label>
                                </div>
                            </div>

                            {/* Date of Birth */}
                            <div className="border-r p-2">
                                <p className=" mb-1">วัน เดือน ปี เกิด</p>
                                <p className=" mb-1">Date of Birth</p>
                                <div className="flex mt-2">
                                    {(() => {
                                        const dateStr = formData.dateOfBirth || personalData.dob || '';
                                        const [year, month, day] = dateStr.split('-');
                                        const shortYear = year ? year.slice(-2) : '';
                                        return (day + month + shortYear).split('').concat(Array(6).fill('')).slice(0, 6).map((digit, idx) => (
                                            <div key={idx} className="py-1 px-1 m-auto border border-slate-400 text-center text-[12px]">{digit || '\u00A0'}</div>
                                        ));
                                    })()}
                                </div>
                                <p className="mt-1">ว D ด M ป Y</p>
                            </div>

                            {/* Date of Employment */}
                            <div className="p-2">
                                <p className=" mb-1">วันที่เริ่มทำงาน</p>
                                <p className=" mb-1">Date of employment</p>
                                <div className="flex mt-2">
                                    {(() => {
                                        const dateStr = formData.employmentDate || applicant?.start_work_date || '';
                                        const [year, month, day] = dateStr.split('-');
                                        const shortYear = year ? year.slice(-2) : '';
                                        return (day + month + shortYear).split('').concat(Array(6).fill('')).slice(0, 6).map((digit, idx) => (
                                            <div key={idx} className="py-1 px-1 m-auto border border-slate-400 text-center text-[12px]">{digit || '\u00A0'}</div>
                                        ));
                                    })()}
                                </div>
                                <p className="mt-1">ว D ด M ป Y</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Insurance Info */}
                <div>
                    <div className="border border-slate-900 p-3 mb-3">
                        <p className=" mb-2 text-center">สำหรับ บริษัท วิริยะประกันภัย</p>
                        <div className="space-y-2">
                            <div>
                                <p className="">กรมธรรม์ประกันกลุ่มเลขที่</p>
                                <p className="">Group No.</p>
                                <div className="min-h-[20px]"></div>
                            </div>
                            <div>
                                <p className="">ใบรับรองเลขที่</p>
                                <p className="">Certificate No.</p>
                                <div className="min-h-[20px]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Beneficiary Section */}
                    <div className="p-3">
                        <p className="mb-2">โปรดแจ้งผู้รับประโยชน์และระบุความสัมพันธ์</p>
                        <p className="mb-3">* กรณีที่มีการแก้ไข ขีดฆ่า ขูดลบ โปรดเซ็นชื่อกำกับด้วย</p>
                        
                        <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-3">
                                <p>ชื่อผู้รับประโยชน์<br/>Beneficiary</p>
                                <p>ความสัมพันธ์<br/>Relationship</p>
                            </div>
                            {(formData.beneficiaries || Array(2).fill({ name: '', relationship: '' })).map((ben, idx) => (
                                <div key={idx} className="grid grid-cols-2 gap-3">
                                    <div className="border-b border-dotted border-slate-400 min-h-[28px] px-1 pb-1">
                                        {ben.name || '\u00A0'}
                                    </div>
                                    <div className="border-b border-dotted border-slate-400 min-h-[28px] px-1 pb-1">
                                        {ben.relationship || '\u00A0'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Terms and Conditions */}
            <div className="p-3 text-justify leading-tight">
                <p className="mb-2">ในกรณีที่ท่านมีส่วนออกเงินสมทบสำหรับตัวท่านเอง และผู้อยู่ในอุปการะของท่าน โปรดอ่านข้อความข้างล่างนี้ :</p>
                <p className="indent-8">
                    ณ ที่นี้ ข้าพเจ้าตกลง และรับใบสมัครขอเอาประกันภัยพนักงาน และจำนวนเงินเอาประกันภัยกลุ่มที่ข้าพเจ้ามีสิทธิภายใต้สัญญาที่ออกโดย บริษัท เอไอเอ จำกัด และข้าพเจ้าอนุญาตให้นายจ้างหักเงินรายได้ของข้าพเจ้า เพื่อชำระเบี้ยประกันภัยส่วนของข้าพเจ้า ข้าพเจ้าสงวนสิทธิที่จะไม่อนุญาตให้นายจ้างหักเงินรายได้ของข้าพเจ้าเมื่อไรก็ได้ โดยแจ้งให้บริษัททราบล่วงหน้าเป็นลายลักษณ์อักษร อนึ่ง เป็นที่ตกลงและเข้าใจว่าสิทธิดังกล่าวข้างต้นจะมีผลก็ต่อเมื่อได้แจ้งให้นายจ้างทราบเป็นลายลักษณ์อักษรล่วงหน้า 30 วัน และการคุ้มครองตามกรมธรรม์ประกันภัยกลุ่มที่ข้าพเจ้ามีส่วนร่วมออกเงินสมทบจะสิ้นสุดลงตั้งแต่วันที่ไม่ได้หักเงินรายได้ของข้าพเจ้า
                </p>
            </div>

            {/* Dependent Coverage Notice */}
            <div className="p-3 mb-6">
                <div className="grid grid-cols-2">
                    <div className="border border-dotted border-slate-400 p-2 flex items-center">
                        <div>
                            <p className="mb-2">ถ้าท่านประสงค์ให้มีประกันภัยผู้อยู่ในอุปการะ โปรดกรอกใบสมัครขอเอาประกันภัยผู้อยู่ในอุปการะด้วย</p>
                            <p className="text-[14px] italic">If you are provided with dependent coverage and are enrolling your dependents, please complete a "Dependent Enrollment Form".</p>
                        </div>
                    </div>
                    <div className="flex gap-3 justify-center">
                        <div className="text-center">
                            <div className="border-b border-slate-400 min-h-[50px] min-w-[70px] mb-2 mx-4 flex items-center justify-center">
                                {formData.signatureDate ? new Date(formData.signatureDate).toLocaleDateString('th-TH', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                }) : '\u00A0'}
                            </div>
                            <p>วันที่ Date</p>
                        </div>
                        <div className="text-center">
                            <div className="border-b border-slate-400 min-h-[50px] mb-2 mx-4 flex items-center justify-center">
                                {applicant?.signature_url ? (
                                    <img src={applicant.signature_url} alt="Signature" crossOrigin="anonymous" className="h-[40px] object-contain" />
                                ) : (
                                    '\u00A0'
                                )}
                            </div>
                            <p>ลายเซ็นพนักงานผู้สมัคร / ผู้เอาประกันภัย</p>
                            <p>Signature of Employee</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}