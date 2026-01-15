import React from 'react';
import PDFCheckbox from './PDFCheckbox';

export default function SPS902Document({ applicant, formData = {} }) {
    const personalData = applicant?.personal_data || {};
    
    return (
        <div 
            className="pdpa-page bg-white mx-auto relative shadow-sm print:shadow-none"
            style={{ 
                fontSize: "12px",
                padding: '3mm 6mm',
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'TH Sarabun New, Sarabun, sans-serif',
                lineHeight: '1.3'
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-1 pb-2">
                <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6937c0bd189dcfc8f3a84e3b/7e3f209fb_image.png" 
                    alt="สำนักงานประกันสังคม" 
                    className="h-16 w-auto object-contain"
                    crossOrigin="anonymous"
                />
                <h1 className="text-[18px] font-bold">แบบเลือกสถานพยาบาลในการรับบริการทางการแพทย์</h1>
                <div className="text-right text-xs space-y-1">
                    <div className="font-bold mt-1 mb-1">สปส. 9-02</div>
                    <div className="border border-black rounded-lg p-2 text-start w-[200px] ml-auto">
                        {/* เลขที่รับ */}
                        <div className="flex items-end gap-2">
                        <span className="whitespace-nowrap">เลขที่รับ</span>
                        <span className="flex-1 border-b border-dotted border-black h-3" />
                        </div>

                        {/* วันที่ / เวลา */}
                        <div className="flex items-end gap-2 mt-1">
                        <span className="whitespace-nowrap">วันที่</span>
                        <span className="flex-1 border-b border-dotted border-black h-3" />
                        <span className="whitespace-nowrap">เวลา</span>
                        <span className="w-20 border-b border-dotted border-black h-3" />
                        </div>

                        {/* ลงชื่อ / ผู้รับ */}
                        <div className="flex items-end gap-2 mt-1">
                        <span className="whitespace-nowrap">ลงชื่อ</span>
                        <span className="flex-1 border-b border-dotted border-black h-3" />
                        <span className="whitespace-nowrap">ผู้รับ</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 1: รายละเอียดผู้ประกันตน */}
            <div className="border border-slate-900">
                <div className="border-b border-slate-900 px-2 pb-2 font-bold text-sm">
                    1. รายละเอียดผู้ประกันตน
                </div>

                {/* Basic Information - Single Column */}
                <div className="p-2 border-b border-slate-900">
                    {/* Name and Prefix */}
                    <div className="flex gap-2 items-center text-xs mb-1">
                        <span className="mb-1">ข้าพเจ้า</span>
                        <label className="flex items-center gap-1">
                            <PDFCheckbox checked={personalData.prefix === 'นาย'} checkType={'check'}/>
                            <span className="text-xs mb-1">นาย</span>
                        </label>
                        <label className="flex items-center gap-1">
                            <PDFCheckbox checked={personalData.prefix === 'นางสาว'} checkType={'check'}/>
                            <span className="text-xs mb-1">นางสาว</span>
                        </label>
                        <label className="flex items-center gap-1">
                            <PDFCheckbox checked={personalData.prefix === 'นาง'} checkType={'check'}/>
                            <span className="text-xs mb-1">นาง</span>
                        </label>
                        <span className={`border-b border-dotted border-slate-400 inline-block flex-1 text-center px-2 pb-1 mx-1 ${personalData.first_name}`} style={{ verticalAlign: 'baseline', ...(!personalData.first_name && { minHeight: '1.2em' }) }}>
                            {personalData.first_name || '\u00A0'}
                        </span>
                        <span>ชื่อสกุล</span>
                        <span className={`border-b border-dotted border-slate-400 inline-block flex-1 text-center px-2 pb-1 ml-1 ${personalData.last_name}`} style={{ verticalAlign: 'baseline', ...(!personalData.last_name && { minHeight: '1.2em' }) }}>
                            {personalData.last_name || '\u00A0'}
                        </span>
                    </div>

                    {/* ID Card and DOB */}
                    <div className="flex items-center gap-1 text-xs">
                        <span>เลขประจำตัวประชาชน</span>
                        <div className="flex items-center">
                            {Array(13).fill('').map((_, idx) => (
                                <React.Fragment key={idx}>
                                    <div className="pb-1 border border-black text-center text-xs font-semibold min-w-[20px] min-h-[20px]">
                                        {personalData.id_card ? personalData.id_card[idx] : '\u00A0'}
                                    </div>
                                    {(idx === 0 || idx === 4 || idx === 9 || idx === 11) && <div className="w-2 border-b border-black mb-1"></div>}
                                </React.Fragment>
                            ))}
                        </div>
                        <span className="ml-2">เกิด วันที่</span>
                        <span className={`border-b border-dotted border-slate-400 inline-block w-8 text-center px-2 pb-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>
                            {personalData.dob ? new Date(personalData.dob).toLocaleDateString('th-TH').split('/')[0] : '\u00A0'}
                        </span>
                        <span>เดือน</span>
                        <span className={`border-b border-dotted border-slate-400 inline-block w-12 text-center px-2 pb-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>
                            {personalData.dob ? new Date(personalData.dob).toLocaleDateString('th-TH').split('/')[1] : '\u00A0'}
                        </span>
                        <span>พ.ศ.</span>
                        <span className={`border-b border-dotted border-slate-400 inline-block w-10 text-center px-2 pb-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>
                            {personalData.dob ? (new Date(personalData.dob).getFullYear() + 543) : '\u00A0'}
                        </span>
                    </div>
                    <div className="text-xs italic mt-1">(สำหรับคนต่างด้าวให้กรอกเลขที่บัตรประกันสังคม)</div>
                </div>

                <div className="grid grid-cols-5 gap-0 divide-x divide-slate-900">
                    {/* Left Column - Section 33 */}
                    <div className="col-span-2 border-slate-900">
                            <div className="text-xs font-bold px-3 pb-3 mr-28 pt-1 border-b border-r border-slate-900">
                                สำหรับผู้ประกันตนมาตรา 33
                            </div>
                            <div className="p-2">

                                {/* Current Employer */}
                                <div>
                                    <div className="text-xs">ปัจจุบันทำงานกับสถานประกอบการชื่อ</div>
                                    <div className={`border-b border-dotted border-slate-400 inline-block w-full text-center px-2 pb-1 mb-1 ${formData.showSection33 ? formData.employerName : ''}`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>
                                        {formData.showSection33 ? (formData.employerName || '\u00A0') : '\u00A0'}
                                    </div>
                                </div>

                                {/* Account and Branch */}
                                <div className="">
                                    <div>
                                        <div className="text-xs mb-1">เลขที่บัญชี</div>
                                        <div className="flex items-center ml-2 mt-1.5">
                                            {Array(10).fill('').map((_, idx) => (
                                                <React.Fragment key={idx}>
                                                    <div className="pb-1 border border-black text-center text-xs font-semibold min-w-[20px] min-h-[20px]">
                                                        {formData.showSection33 && formData.accountNumber && formData.accountNumber[idx] ? formData.accountNumber[idx] : '\u00A0'}
                                                    </div>
                                                    {(idx === 1 || idx === 8) && <div className="w-2 border-b border-black mb-1"></div>}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <div className="text-xs mb-1">ลำดับที่สาขา</div>
                                        <div className="flex ml-2 mt-1.5">
                                            {Array(5).fill('').map((_, idx) => (
                                                <div key={idx} className="pb-1 border border-black text-center text-xs font-semibold min-w-[20px] min-h-[20px]">
                                                    {formData.showSection33 && formData.branchNumber && formData.branchNumber[idx] ? formData.branchNumber[idx] : '\u00A0'}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Start Date and Last Pay */}
                                <div className="text-xs">
                                    <div className="mb-1">
                                        <span>เข้างานเมื่อวันที่</span>
                                        <span className={`border-b border-dotted border-slate-400 inline-block min-w-[40px] text-center px-2 pb-1 mx-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>
                                            {formData.showSection33 && formData.employmentStartDate ? new Date(formData.employmentStartDate).toLocaleDateString('th-TH').split('/')[0] : '\u00A0'}
                                        </span>
                                        <span>เดือน</span>
                                        <span className={`border-b border-dotted border-slate-400 inline-block min-w-[40px] text-center px-2 pb-1 mx-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>
                                            {formData.showSection33 && formData.employmentStartDate ? new Date(formData.employmentStartDate).toLocaleDateString('th-TH').split('/')[1] : '\u00A0'}
                                        </span>
                                        <span>พ.ศ.</span>
                                        <span className={`border-b border-dotted border-slate-400 inline-block min-w-[40px] text-center px-2 pb-1 mx-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>
                                            {formData.showSection33 && formData.employmentStartDate ? (new Date(formData.employmentStartDate).getFullYear() + 543) : '\u00A0'}
                                        </span>
                                    </div>
                                    <div>
                                        <span>ได้รับค่าจ้างงวดสุดท้ายเมื่อเดือน</span>
                                        <span className={`border-b border-dotted border-slate-400 inline-block min-w-[40px] text-center px-2 pb-1 mx-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>
                                            {formData.showSection33 && formData.lastSalaryMonth ? new Date(formData.lastSalaryMonth).toLocaleDateString('th-TH', { month: 'short' }) : '\u00A0'}
                                        </span>
                                        <span>พ.ศ.</span>
                                        <span className={`border-b border-dotted border-slate-400 inline-block min-w-[40px] text-center px-2 pb-1 mx-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>
                                            {formData.showSection33 && formData.lastSalaryMonth ? (new Date(formData.lastSalaryMonth).getFullYear() + 543) : '\u00A0'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>

                    {/* Right Column - Section 39 and 38, 41 */}
                    <div className="col-span-3">
                            <div className="text-xs font-bold px-3 pb-3 pt-1 border-b border-slate-900">
                                สำหรับผู้ประกันตนมาตรา 39 และบุคคลตามมาตรา 38 และมาตรา 41
                            </div>

                            <div className="px-2">

                                {/* Address */}
                                <div className="text-xs">
                                    <div className="mb-1">
                                        <span>ที่อยู่ปัจจุบันเลขที่</span>
                                        <span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2 pb-1 mx-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>{formData.showSection39 ? (personalData.current_address?.number || '\u00A0') : '\u00A0'}</span>
                                        <span>หมู่ที่</span>
                                        <span className={`border-b border-dotted border-slate-400 inline-block min-w-[60px] text-center px-2 pb-1 mx-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>{formData.showSection39 ? (personalData.current_address?.moo || '\u00A0') : '\u00A0'}</span>
                                        <span>ตรอก/ซอย</span>
                                        <span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 pb-1 mx-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>{formData.showSection39 ? (personalData.current_address?.road || '\u00A0') : '\u00A0'}</span>
                                    </div>
                                    <div className="mb-1">
                                        <span>ถนน</span>
                                        <span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 pb-1 mx-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>{'\u00A0'}</span>
                                        <span>แขวง/ตำบล</span>
                                        <span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 pb-1 mx-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>{formData.showSection39 ? (personalData.current_address?.subdistrict || '\u00A0') : '\u00A0'}</span>
                                    </div>
                                    <div className="mb-1">
                                        <span>เขต/อำเภอ</span>
                                        <span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 pb-1 mx-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>{formData.showSection39 ? (personalData.current_address?.district || '\u00A0') : '\u00A0'}</span>
                                        <span>จังหวัด</span>
                                        <span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 pb-1 mx-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>{formData.showSection39 ? (personalData.current_address?.province || '\u00A0') : '\u00A0'}</span>
                                    </div>
                                    <div className="mb-1">
                                        <span>รหัสไปรษณีย์</span>
                                        <span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2 pb-1 mx-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>{formData.showSection39 ? (personalData.current_address?.zipcode || '\u00A0') : '\u00A0'}</span>
                                        <span>โทรศัพท์มือถือ</span>
                                        <span className={`border-b border-dotted border-slate-400 inline-block min-w-[120px] text-center px-2 pb-1 mx-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>{formData.showSection39 ? (personalData.mobile_phone || '\u00A0') : '\u00A0'}</span>
                                    </div>
                                </div>

                                {/* Last Employer */}
                                <div className="text-xs">
                                    <span>ชื่อสถานประกอบการสุดท้ายที่ทำงาน</span>
                                    <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 pb-1 mx-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>{formData.showSection39 ? (formData.lastEmployerName || '\u00A0') : '\u00A0'}</span>
                                </div>

                                {/* Account and Branch */}
                                <div>
                                    <div className="flex gap-2">
                                        <div className="text-xs mb-1">เลขที่บัญชี</div>
                                        <div className="flex items-center ml-2 mt-1.5">
                                            {Array(10).fill('').map((_, idx) => (
                                                <React.Fragment key={idx}>
                                                    <div className="pb-1 border border-black text-center text-xs font-semibold min-w-[20px] min-h-[20px]">
                                                        {formData.showSection39 && formData.section39AccountNumber && formData.section39AccountNumber[idx] ? formData.section39AccountNumber[idx] : '\u00A0'}
                                                    </div>
                                                    {(idx === 1 || idx === 8) && <div className="w-2 border-b border-black mb-1"></div>}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex gap-2">
                                        <div className="text-xs mb-1">ลำดับที่สาขา</div>
                                        <div className="flex ml-2 mt-1.5">
                                            {Array(5).fill('').map((_, idx) => (
                                                <div key={idx} className="pb-1 border border-black text-center text-xs font-semibold min-w-[20px] min-h-[20px]">
                                                    {formData.showSection39 && formData.section39BranchNumber && formData.section39BranchNumber[idx] ? formData.section39BranchNumber[idx] : '\u00A0'}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* End Date */}
                                <div className="text-xs mb-1">
                                    <span>สิ้นสภาพความเป็นลูกจ้างเมื่อวันที่</span>
                                    <span className={`border-b border-dotted border-slate-400 inline-block min-w-[40px] text-center px-2 pb-1 mx-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>
                                        {formData.showSection39 && formData.employmentEndDate ? new Date(formData.employmentEndDate).toLocaleDateString('th-TH').split('/')[0] : '\u00A0'}
                                    </span>
                                    <span>เดือน</span>
                                    <span className={`border-b border-dotted border-slate-400 inline-block min-w-[60px] text-center px-2 pb-1 mx-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>
                                        {formData.showSection39 && formData.employmentEndDate ? new Date(formData.employmentEndDate).toLocaleDateString('th-TH').split('/')[1] : '\u00A0'}
                                    </span>
                                    <span>พ.ศ.</span>
                                    <span className={`border-b border-dotted border-slate-400 inline-block min-w-[40px] text-center px-2 pb-1 mx-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>
                                        {formData.showSection39 && formData.employmentEndDate ? (new Date(formData.employmentEndDate).getFullYear() + 543) : '\u00A0'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            {/* Section 2: Hospital Selection */}
            <div className="border-l border-r border-slate-900">
                <div className="border-b border-slate-900 px-2 pb-3 font-bold text-sm">
                    2. การเลือกสถานพยาบาล
                </div>

                <div className="grid grid-cols-5 gap-0 divide-x divide-slate-900">
                    {/* Left Column - 40% */}
                    <div className="col-span-2 p-2">
                        <div className="text-xs">
                            <label className="flex items-start gap-2">
                                <PDFCheckbox checked={formData.hospitalSelection === 'not_selected'} checkType={'check'}/>
                                <span className="mb-1">ยังไม่ได้เลือกสถานพยาบาล</span>
                            </label>
                            <label className="flex items-start gap-2">
                                <PDFCheckbox checked={formData.hospitalSelection === 'use_old'} checkType={'check'}/>
                                <span className="mb-1">ขอใช้สถานพยาบาลเดิม (กรณี มาตรา 38 และ 41)</span>
                            </label>
                            <label className="flex items-start gap-2">
                                <PDFCheckbox checked={formData.hospitalSelection === 'change'} checkType={'check'}/>
                                <span className="mb-1">ขอเปลี่ยนสถานพยาบาล (โปรดระบุเหตุผล)</span>
                            </label>
                            <div className="ml-4 space-y-1">
                                <div className="font-bold mb-1">เหตุผล</div>
                                <label className="flex items-start gap-2">
                                    <PDFCheckbox checked={formData.changeReason === 'annual'} checkType={'check'}/>
                                    <span className="mb-1">เปลี่ยนสถานพยาบาลประจำปี</span>
                                </label>
                                <label className="flex items-start gap-2">
                                    <PDFCheckbox checked={formData.changeReason === 'during_year'} checkType={'check'}/>
                                    <span className="mb-1">เปลี่ยนสถานพยาบาลระหว่างปี</span>
                                </label>
                                <div className="ml-4 space-y-1">
                                    <div className="font-bold mb-1">เนื่องจาก</div>
                                    <label className="flex items-start gap-2">
                                        <PDFCheckbox checked={formData.changeReasonDetail === 'address'} checkType={'check'}/>
                                        <span className="mb-1">ย้ายที่อยู่</span>
                                    </label>
                                    <label className="flex items-start gap-2">
                                        <PDFCheckbox checked={formData.changeReasonDetail === 'workplace'} checkType={'check'}/>
                                        <span className="mb-1">เปลี่ยนสถานที่ทำงาน</span>
                                    </label>
                                    <label className="flex items-center gap-1">
                                        <PDFCheckbox checked={formData.changeReasonDetail === 'other'} checkType={'check'}/>
                                        <span className="mb-0">อื่นๆ (ระบุ)</span>
                                        <span className={`border-b border-dotted border-slate-400 inline-block w-28 text-center px-2 pb-1`} style={{ minHeight: '1.2em' }}>
                                            {formData.otherReason || '\u00A0'}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - 60% */}
                    <div className="col-span-3 p-2">
                        {/* Hospital Selection */}
                        <div className="mb-3 text-xs">
                            <label className="flex items-start gap-2 mb-1">
                                <PDFCheckbox checked={formData.selectHospital === 'yes'} checkType={'check'}/>
                                <span className=" mb-1">ข้าพเจ้า (ผู้ประกันตน/คนพิการซึ่งเป็นผู้ประกันตน/ผู้มีสิทธิ)ขอเลือกสถานพยาบาล</span>
                            </label>
                            <div className="space-y-2 ml-1">
                                <div className="flex items-center gap-1">
                                    <span className="text-xs">ลำดับที่ 1 ชื่อ</span>
                                    <span className={`border-b border-dotted border-slate-400 inline-block w-40 text-center px-2 pb-1`} style={{ minHeight: '1.2em' }}>
                                        {formData.hospital1 || '\u00A0'}
                                    </span>
                                    <div className="flex">
                                        {Array(7).fill('').map((_, idx) => (
                                            <div key={idx} className="pb-1 border border-black text-center text-xs font-semibold min-w-[20px] min-h-[20px]">
                                                {formData.hospital1Code && formData.hospital1Code[idx] ? formData.hospital1Code[idx] : '\u00A0'}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-xs italic ml-0">หากไม่สามารถจัดสถานพยาบาลลำดับที่ 1 ให้ได้ จะจัดสถานพยาบาลลำดับถัดไปให้ตามลำดับ</div>
                                <div className="flex items-center gap-1">
                                    <span className="text-xs">ลำดับที่ 2 ชื่อ</span>
                                    <span className={`border-b border-dotted border-slate-400 inline-block w-40 text-center px-2 pb-1`} style={{ minHeight: '1.2em' }}>
                                        {formData.hospital2 || '\u00A0'}
                                    </span>
                                    <div className="flex">
                                        {Array(7).fill('').map((_, idx) => (
                                            <div key={idx} className="pb-1 border border-black text-center text-xs font-semibold min-w-[20px] min-h-[20px]">
                                                {formData.hospital2Code && formData.hospital2Code[idx] ? formData.hospital2Code[idx] : '\u00A0'}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-xs">ลำดับที่ 3 ชื่อ</span>
                                    <span className={`border-b border-dotted border-slate-400 inline-block w-40 text-center px-2 pb-1`} style={{ minHeight: '1.2em' }}>
                                        {formData.hospital3 || '\u00A0'}
                                    </span>
                                    <div className="flex">
                                        {Array(7).fill('').map((_, idx) => (
                                            <div key={idx} className="pb-1 border border-black text-center text-xs font-semibold min-w-[20px] min-h-[20px]">
                                                {formData.hospital3Code && formData.hospital3Code[idx] ? formData.hospital3Code[idx] : '\u00A0'}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Disabled Person Section */}
                        <div className="text-xs">
                            <label className="flex items-start gap-2">
                                <PDFCheckbox checked={formData.disabledPerson === 'yes'} checkType={'check'}/>
                                <span className="mb-1">ข้าพเจ้าคนพิการซึ่งเป็นผู้ประกันตน ขอรับบริการสาธารณสุขจาก สำนักงานหลักประกันสุขภาพแห่งชาติ (สปสช.)</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: Declaration */}
            <div className="border-t border-l border-r border-slate-900">
                <div className="px-3 text-xs space-y-1">
                    <div>
                        <span>ขณะที่ข้าพเจ้าเลือกหรือเปลี่ยนสถานพยาบาลใหม่ ข้าพเจ้าไม่ได้นอนพักรักษาตัวเป็นผู้ป่วยใน ณ สถานพยาบาลใดๆ</span>
                    </div>
                    <div>
                        <span>และขอรับรองว่าข้อความข้างต้นเป็นจริงทุกประการ</span>
                    </div>
                    <div className="grid justify-end items-end pt-1 gap-1">
                        <div className="flex items-baseline gap-2 text-xs">
                            <span>ลงชื่อ</span>
                            {formData.declarationSignature ? (
                                <img src={formData.declarationSignature} alt="Signature" className="h-10 object-contain" />
                            ) : (
                                <div className="border-b border-dotted border-slate-400 w-40 inline-block pb-1"></div>
                            )}
                            <span>ผู้ประกันตน/ ผู้มีสิทธิ</span>
                        </div>
                        <p className="mb-2 text-center">(<span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 pb-1 ${applicant?.full_name}`} style={{ verticalAlign: 'baseline', ...(!applicant?.full_name && { minHeight: '1.2em' }) }}>{applicant?.full_name || '\u00A0'}</span>)</p>
                        <div className="flex items-center gap-1 text-xs mb-1">
                            <span>ลงวันที่</span>
                            <span className={`border-b border-dotted border-slate-400 inline-block w-8 text-center px-1 pb-1`} style={{ minHeight: '1.2em' }}>{formData.declarationSignatureDate ? new Date(formData.declarationSignatureDate).toLocaleDateString('th-TH').split('/')[0] : '\u00A0'}</span>
                            <span>เดือน</span>
                            <span className={`border-b border-dotted border-slate-400 inline-block w-20 text-center px-1 pb-1`} style={{ minHeight: '1.2em' }}>{formData.declarationSignatureDate ? new Date(formData.declarationSignatureDate).toLocaleDateString('th-TH').split('/')[1] : '\u00A0'}</span>
                            <span>พ.ศ.</span>
                            <span className={`border-b border-dotted border-slate-400 inline-block w-8 text-center px-1 pb-1`} style={{ minHeight: '1.2em' }}>{formData.declarationSignatureDate ? (new Date(formData.declarationSignatureDate).getFullYear() + 543) : '\u00A0'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 4: Staff Remarks */}
            <div className="border border-slate-900">
                <div className="border-b border-slate-900 px-2 pb-2 py-1 font-bold text-sm text-center">
                    สำหรับเจ้าหน้าที่
                </div>
                
                <div className="px-3">
                    <div className="text-xs font-bold mb-1">ความเห็นเจ้าหน้าที่</div>
                    <div className="space-y-0.5 mb-1">
                        <label className="flex items-center gap-1 text-xs">
                            <PDFCheckbox checked={formData.staffDecision === 'approve'} checkType={'check'}/>
                            <span className="mb-1">เห็นสมควรจัดสถานพยาบาล</span>
                        </label>
                        <div className="flex items-baseline gap-2 text-xs mb-1">
                            <PDFCheckbox checked={formData.staffDecision === 'disapprove'} checkType={'check'}/>
                            <span className="mb-1">ไม่เห็นสมควรจัดสถานพยาบาล ระบุเหตุผล</span>
                            <div className={`border-b border-dotted border-slate-400 flex-1 pb-1`} style={{ minHeight: '1.2em' }}>{formData.reasonLine1 || '\u00A0'}</div>
                        </div>
                        <div className="ml-5">
                            <div className={`border-b border-dotted border-slate-400 w-full text-center px-2 pb-1`} style={{ minHeight: '1.2em' }}>{formData.reasonLine2 || '\u00A0'}</div>
                        </div>
                    </div>

                    <div className="grid justify-end items-end pt-1 gap-1">
                        <div className="flex items-baseline gap-2 text-xs">
                            <span>ลงชื่อ</span>
                            <div className="border-b border-dotted border-slate-400 w-40 inline-block pb-1"></div>
                            <span>เจ้าหน้าที่</span>
                        </div>
                        <p className="mb-1 text-center">(<span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 pb-1 ${applicant?.full_name}`} style={{ verticalAlign: 'baseline', ...(!applicant?.full_name && { minHeight: '1.2em' }) }}>{applicant?.full_name || '\u00A0'}</span>)</p>
                        <div className="flex items-center gap-1 text-xs mb-1">
                             <div className="text-xs">ลงวันที่</div>
                             <div className={`border-b border-dotted border-slate-400 inline-block w-8 text-center px-1 pb-1`} style={{ minHeight: '1.2em' }}>{formData.staffSignatureDate ? new Date(formData.staffSignatureDate).toLocaleDateString('th-TH').split('/')[0] : '\u00A0'}</div>
                             <div className="text-xs">เดือน</div>
                             <div className={`border-b border-dotted border-slate-400 inline-block w-20 text-center px-1 pb-1`} style={{ minHeight: '1.2em' }}>{formData.staffSignatureDate ? new Date(formData.staffSignatureDate).toLocaleDateString('th-TH').split('/')[1] : '\u00A0'}</div>
                             <div className="text-xs">พ.ศ.</div>
                             <div className={`border-b border-dotted border-slate-400 inline-block w-8 text-center px-1 pb-1`} style={{ minHeight: '1.2em' }}>{formData.staffSignatureDate ? (new Date(formData.staffSignatureDate).getFullYear() + 543) : '\u00A0'}</div>
                         </div>
                    </div>
                </div>
            </div>

            {/* Footer Note */}
            <div className="text-xs mt-3 text-center text-slate-600">
                สำนักงานประกันสังคมยกเลิกการพิมพ์บัตรรับรองสิทธิการรักษาพยาบาล ตั้งแต่ปี 2561 เป็นต้นไป
                โดยสามารถตรวจสอบสิทธิการรักษาพยาบาลได้ที่ www.sso.go.th หรือ สายด่วนประกันสังคม โทร. 1506
            </div>
        </div>
    );
}