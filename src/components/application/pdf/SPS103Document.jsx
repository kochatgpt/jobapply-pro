import React from 'react';
import PDFCheckbox from './PDFCheckbox';

export default function SPS103Document({ applicant, formData = {} }) {
    const personalData = applicant?.personal_data || {};
    const familyData = applicant?.family_data || {};
    
    return (
        <div 
            className="pdpa-page bg-white mx-auto relative shadow-sm print:shadow-none"
            style={{ 
                fontSize: "12px",
                padding: '5mm 8mm',
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'TH Sarabun New, Sarabun, sans-serif',
                lineHeight: '1.1'
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6937c0bd189dcfc8f3a84e3b/7e3f209fb_image.png" 
                    alt="สำนักงานประกันสังคม" 
                    className="h-16 w-auto object-contain"
                    crossOrigin="anonymous"
                />
                <h1 className="text-[18px]">แบบขึ้นทะเบียนผู้ประกันตน</h1>
                <span className="text-[14px]">สปส. 1-03</span>
            </div>

            {/* ส่วนบน: ข้อมูลนายจ้าง และ สำหรับเจ้าหน้าที่ */}
            <div>
                <div className="grid grid-cols-6">
                    {/* ซ้าย - ข้อมูลนายจ้าง */}
                    <div className="col-span-3 border-l grid border-t border-r border-slate-900">
                        <h3 className="font-bold border-b border-slate-900 text-center items-center py-2">ข้อมูลนายจ้าง</h3>
                        <div className="space-y-0 p-2">
                            <div className="flex items-center">
                                <span className="mb-2">ชื่อสถานประกอบการ</span>
                                <span className={`border-b border-dotted border-slate-400 flex-1 ml-2 text-center px-2 pb-1 inline-block ${formData.employerName}`} style={{ verticalAlign: 'baseline', ...(formData.employerName && { minHeight: '1.2em' }) }}>
                                    {formData.employerName || '\u00A0'}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="mb-2">เลขที่บัญชี</span>
                                <div className="flex items-center ml-2 mt-2">
                                    {Array(10).fill('').map((_, idx) => (
                                        <React.Fragment key={idx}>
                                            <div className="pb-1 border border-black text-center text-xs font-semibold min-w-[20px]">
                                                {formData.accountNumber ? formData.accountNumber[idx] : '\u00A0'}
                                            </div>
                                            {(idx === 1 || idx === 8) && <div className="w-2 border-b border-black mb-0.5"></div>}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className="mb-2">ลำดับที่สาขา</span>
                                <div className="flex ml-2 mt-2">
                                    {Array(5).fill('').map((_, idx) => (
                                        <div key={idx} className="pb-1 border border-black text-center text-xs font-semibold min-w-[20px]">
                                            {formData.branchOrder ? formData.branchOrder[idx] : '\u00A0'}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className="mb-2">วันที่ผู้ประกันตนเข้าทำงาน</span>
                                <span className={`border-b border-dotted border-slate-400 flex-1 ml-2 text-center px-2 pb-1 inline-block`} style={{ verticalAlign: 'baseline', ...(applicant?.start_work_date && { minHeight: '1.2em' }) }}>
                                    {applicant?.start_work_date ? new Date(applicant.start_work_date).toLocaleDateString('th-TH', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('/') : '\u00A0'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="mb-2">ประเภทการจ้าง</span>
                                <div className="flex items-center gap-1">
                                    <PDFCheckbox checked={formData.employmentType === 'daily'} checkType={'check'} />
                                    <span className="mb-2">รายวัน</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <PDFCheckbox checked={formData.employmentType === 'monthly'} checkType={'check'} />
                                    <span className="mb-2">รายเดือน</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <PDFCheckbox checked={formData.employmentType === 'other'} checkType={'check'} />
                                    <span className="mb-2">อื่นๆ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* ขวา - สำหรับเจ้าหน้าที่ */}
                    <div className="col-span-3 border-t border-r border-slate-900">
                        <h3 className="font-bold border-b border-slate-900 text-center items-center py-2">สำหรับเจ้าหน้าที่</h3>
                        <div className="mt-12 p-1">
                            <div className="flex items-center">
                                <span>เลขที่บัตรประกันสังคม</span>
                                <div className="flex items-center ml-1">
                                    {Array(13).fill('').map((_, idx) => (
                                        <React.Fragment key={idx}>
                                            <div className="p-2 border border-black"></div>
                                            {(idx === 2 || idx === 4 || idx === 11) && <div className="w-2 border-b border-black mb-0.5"></div>}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ข้อมูลผู้ประกันตน */}
            <div>
                <div className="grid grid-cols-3">
                    {/* Left Column - 2 ส่วน */}
                    <div className="col-span-2 border border-slate-900">
                        {/* 1. ชื่อ */}
                        <h3 className="font-bold text-center py-2 border-b border-slate-900">ข้อมูลผู้ประกันตน</h3>
                        <div className="space-y-0 p-2">
                            <div className="flex items-center gap-2">
                                <span className="mb-2">1. ชื่อ</span>
                                <label className="flex items-center gap-1">
                                    <PDFCheckbox checked={personalData.prefix === 'นาย'} checkType={'check'}/>
                                    <span className="mb-2">นาย</span>
                                </label>
                                <label className="flex items-center gap-1">
                                    <PDFCheckbox checked={personalData.prefix === 'นางสาว'} checkType={'check'}/>
                                    <span className="mb-2">นางสาว</span>
                                </label>
                                <label className="flex items-center gap-1">
                                    <PDFCheckbox checked={personalData.prefix === 'นาง'} checkType={'check'}/>
                                    <span className="mb-2">นาง</span>
                                </label>
                                <span className={`border-b border-dotted border-black flex-1 text-center px-2 pb-1 inline-block ml-1`} style={{ verticalAlign: 'baseline', ...(personalData.first_name && { minHeight: '1.2em' }) }}>
                                    {personalData.first_name || '\u00A0'}
                                </span>
                                <span className="mb-2">ชื่อสกุล</span>
                                <span className={`border-b border-dotted border-black flex-1 text-center px-2 pb-1 inline-block ml-1`} style={{ verticalAlign: 'baseline', ...(personalData.last_name && { minHeight: '1.2em' }) }}>
                                    {personalData.last_name || '\u00A0'}
                                </span>
                            </div>
                        

                            {/* 2. เพศ */}
                            <div className="flex items-center gap-2">
                                <span className="mb-2">2. เพศ</span>
                                <label className="flex items-center gap-1">
                                    <PDFCheckbox checked={personalData.gender === 'male'} checkType={'check'} />
                                    <span className="mb-2">ชาย</span>
                                </label>
                                <label className="flex items-center gap-1">
                                    <PDFCheckbox checked={personalData.gender === 'female'} checkType={'check'} />
                                    <span className="mb-2">หญิง</span>
                                </label>
                            </div>

                            {/* 3. สัญชาติ */}
                            <div className="flex items-center gap-2">
                                <span className="mb-2">3. สัญชาติ</span>
                                <span className={`border-b border-dotted border-slate-400 flex-1 text-center px-2 pb-1 inline-block`} style={{ verticalAlign: 'baseline', ...(personalData.nationality && { minHeight: '1.2em' }) }}>
                                    {personalData.nationality || '\u00A0'}
                                </span>
                            </div>

                            {/* 4. เกิดวันที่ */}
                            <div className="flex items-center gap-2">
                                <span className="mb-2">4. เกิดวันที่</span>
                                <span className={`border-b border-dotted border-slate-400 w-20 text-center px-2 pb-1 inline-block`} style={{ verticalAlign: 'baseline', ...(personalData.dob && { minHeight: '1.2em' }) }}>
                                    {personalData.dob ? new Date(personalData.dob).toLocaleDateString('th-TH', { day: 'numeric' }) : '\u00A0'}
                                </span>
                                <span className="mb-2">เดือน</span>
                                <span className={`border-b border-dotted border-slate-400 flex-1 text-center px-2 pb-1 inline-block`} style={{ verticalAlign: 'baseline', ...(personalData.dob && { minHeight: '1.2em' }) }}>
                                    {personalData.dob ? new Date(personalData.dob).toLocaleDateString('th-TH', { month: 'long' }) : '\u00A0'}
                                </span>
                                <span className="mb-2">พ.ศ.</span>
                                <span className={`border-b border-dotted border-slate-400 w-24 text-center px-2 pb-1 inline-block`} style={{ verticalAlign: 'baseline', ...(personalData.dob && { minHeight: '1.2em' }) }}>
                                    {personalData.dob ? (new Date(personalData.dob).getFullYear() + 543) : '\u00A0'}
                                </span>
                            </div>

                            {/* 5. เลขประจำตัวประชาชน */}
                            <div className="flex items-center gap-2">
                                <span className="mb-2">5. เลขประจำตัวประชาชน</span>
                                <div className="flex items-center">
                                    {Array(13).fill('').map((_, idx) => (
                                        <React.Fragment key={idx}>
                                            <div className="pb-1 border border-black text-center text-xs font-semibold min-w-[20px]">
                                                {personalData.id_card ? personalData.id_card[idx] : '\u00A0'}
                                            </div>
                                            {(idx === 0 || idx === 4 || idx === 9 || idx === 11) && <div className="w-2 border-b border-black mb-0.5"></div>}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - 1 ส่วน */}
                    <div className="col-span-1 p-3 flex flex-col border-r border-slate-900 items-start justify-center">
                        {/* บรรทัดแรก: 3 ช่อง */}
                        <div className="flex mb-2">
                            {Array(3).fill('').map((_, idx) => (
                                <div key={idx} className="p-2 border border-black"></div>
                            ))}
                        </div>
                        
                        {/* บรรทัดที่ 2: 1 ช่อง */}
                        <div className="flex mb-2">
                            <div className="p-2 border border-black"></div>
                        </div>
                        
                        {/* บรรทัดที่ 3: 3 ช่อง */}
                        <div className="flex mb-2">
                            {Array(3).fill('').map((_, idx) => (
                                <div key={idx} className="p-2 border border-black"></div>
                            ))}
                        </div>
                        
                        {/* บรรทัดที่ 4: 8 ช่อง (มีเส้นแบ่งที่ช่อง 2 และ 4) */}
                        <div className="flex items-center">
                            {Array(8).fill('').map((_, idx) => (
                                <React.Fragment key={idx}>
                                    <div className="p-2 border border-black"></div>
                                    {(idx === 1 || idx === 3) && <div className="w-2 border-b border-black mb-0.5"></div>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="grid grid-cols-3">
                    {/* 6. สถานภาพครอบครัว */}
                    <div className="col-span-2 border-l border-r border-b border-slate-900">
                        <span className="ml-2 pt-1">6. สถานภาพครอบครัว</span>
                        <div className="space-y-0.5 p-2">
                            <div className="items-center gap-2">
                                <div className="ml-2 flex gap-2">
                                    <div className="flex items-center gap-1">
                                        <PDFCheckbox checked={familyData.marital_status === 'single'} checkType={'check'} />
                                        <span className="mb-2">1. โสด</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <PDFCheckbox checked={familyData.marital_status === 'married'} checkType={'check'} />
                                        <span className="mb-2">2. สมรส</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <PDFCheckbox checked={familyData.marital_status === 'widowed'} checkType={'check'} />
                                        <span className="mb-2">3. หม้าย</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <PDFCheckbox checked={familyData.marital_status === 'divorced'} checkType={'check'} />
                                        <span className="mb-2">4. หย่า</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <PDFCheckbox checked={familyData.marital_status === 'separated'} checkType={'check'} />
                                        <span className="mb-2">5. แยกกันอยู่</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 pl-8">
                                <div className="flex items-center gap-1">
                                    <PDFCheckbox checked={familyData.has_children === 'no'} checkType={'check'} />
                                    <span className="mb-2">ไม่มีบุตร</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <PDFCheckbox checked={familyData.has_children === 'yes'} checkType={'check'} />
                                    <span className="mb-2">มีบุตรอายุไม่เกิน 6 ปี จำนวน</span>
                                </div>
                                <div className={`border-b border-dotted border-black w-12 text-center px-2 pb-1`} style={{ verticalAlign: 'baseline', ...(familyData.children_count && { minHeight: '1.2em' }) }}>
                                    {familyData.children_count || '\u00A0'}
                                </div>
                                <span className="mb-2">คน</span>
                            </div>
                            <div className="flex items-center gap-3 pl-10">
                                <div className="flex items-center gap-0.5">
                                    <span className="mb-2">เกิดปี พ.ศ.</span>
                                    <div className="flex">
                                        {Array(4).fill('').map((_, idx) => (
                                            <div key={idx} className="w-4 h-5 border border-black"></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="mb-2">เกิดปี พ.ศ.</span>
                                    <div className="flex">
                                        {Array(4).fill('').map((_, idx) => (
                                            <div key={idx} className="w-4 h-5 border border-black"></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="mb-2">เกิดปี พ.ศ.</span>
                                    <div className="flex">
                                        {Array(4).fill('').map((_, idx) => (
                                            <div key={idx} className="w-4 h-5 border border-black"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 border-r border-slate-900">
                    </div>
                </div>
            </div>
            
            <div>
                <div className="grid grid-cols-3">
                    {/* 7. สำหรับคนต่างด้าว */}
                    <div className="col-span-2 border-l border-r border-b border-slate-900">
                        <span className="ml-2">7. สำหรับคนต่างด้าว ให้กรอกข้อความ ดังนี้</span>
                        <div>
                            <div className="space-y-0.5 px-4 py-2">
                                <div className="flex items-center gap-2">
                                    <PDFCheckbox size="w-4 h-4" />
                                    <span className="mb-2">หนังสือเดินทาง (PASSPORT) เลขที่</span>
                                    <div className="border-b border-dotted border-slate-400 flex-1 px-2 pb-1" style={{ minHeight: '1.2em' }}></div>
                                    <span className="mb-2">และ</span>
                                </div>
                                <div className="flex items-center gap-2 pl-4">
                                    <span className="mb-2">ใบอนุญาตทำงาน (WORK PERMIT) เลขที่</span>
                                    <div className="border-b border-dotted border-slate-400 flex-1 px-2 pb-1" style={{ minHeight: '1.2em' }}></div>
                                    <span className="mb-2">หรือ</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <PDFCheckbox size="w-4 h-4" checkType={'check'}/>
                                    <span className="mb-2">อื่นๆ (ระบุ)</span>
                                    <div className="border-b border-dotted border-slate-400 w-48 px-2 pb-1" style={{ minHeight: '1.2em' }}></div>
                                    <span className="mb-2">เลขที่</span>
                                    <div className="border-b border-dotted border-slate-400 flex-1 px-2 pb-1" style={{ minHeight: '1.2em' }}></div>
                                    <span className="mb-2">และ</span>
                                </div>
                                <div className="flex items-center gap-2 pl-4">
                                    <span className="mb-2">ใบอนุญาตทำงาน (WORK PERMIT) เลขที่</span>
                                    <div className="border-b border-dotted border-slate-400 flex-1 px-2 pb-1" style={{ minHeight: '1.2em' }}></div>
                                </div>
                            </div>
                            <div className="bordor-t"></div>
                            {/* ลายเซ็นนายจ้าง */}
                            <div className="mt-1">
                                <p className="text-center pt-1 border-t border-black">ข้าพเจ้าขอรับรองว่าข้อความดังกล่าวข้างต้น ถูกต้องตามความเป็นจริงทุกประการ</p>
                                <div className="flex gap-4 px-5 py-2 items-center justify-center">
                                    <div className="flex justify-center">
                                        <div className="w-[80px] h-[80px] rounded-full border-2 border-slate-300 flex items-center justify-center text-center">
                                            <div>
                                                <p className="text-[8px] font-bold">ประทับตรา</p>
                                                <p className="text-[8px]">นิติบุคคล</p>
                                                <p className="text-[8px]">(ถ้ามี)</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-y-1">
                                        <div className="text-center">
                                            <div>ลงชื่อ<div className="inline-block border-b border-dotted border-slate-400 w-48 mx-2 px-2 pb-2" style={{ minHeight: '1.2em' }}></div>นายจ้าง</div>
                                            <div>(<div className="inline-block border-b border-dotted border-slate-400 w-48 px-2 pb-2" style={{ minHeight: '1.2em' }}></div>)</div>
                                            <div>ตำแหน่ง<div className="inline-block border-b border-dotted border-slate-400 w-40 mx-2 px-2 pb-2" style={{ minHeight: '1.2em' }}></div></div>
                                            <div>วันที่<div className="inline-block border-b border-dotted border-slate-400 w-40 mx-2 px-2 pb-2" style={{ minHeight: '1.2em' }}></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 border-r border-slate-900">
                        <h3 className="font-bold underline text-center py-2">เอกสารที่แนบ</h3>
                        <div className="p-2">
                            <div className="gird grid-col-6 gap-2">
                                <div className="flex gap-2">
                                    <PDFCheckbox size="w-4 h-4" checkType={'check'}/>
                                    <span className="mb-2">สำเนาบัตรประจำตัวประชาชน</span>
                                </div>
                                <div className="flex gap-2">
                                    <PDFCheckbox size="w-4 h-4" checkType={'check'}/>
                                    <span className="mb-2">สำเนาทะเบียนบ้าน</span>
                                </div>
                                <div className="flex gap-2">
                                    <PDFCheckbox size="w-4 h-4" checkType={'check'}/>
                                    <span className="mb-2">สำเนาใบสำคัญประจำตัวคนต่างด้าว</span>
                                </div>
                                <div className="flex gap-2">
                                    <PDFCheckbox size="w-4 h-4" checkType={'check'}/>
                                    <span className="mb-2">สำเนาหนังสือเดินทาง</span>
                                </div>
                                <div className="flex gap-2">
                                    <PDFCheckbox size="w-4 h-4" checkType={'check'}/>
                                    <span className="mb-2">สำเนาใบอนุญาตทำงานคนต่างด้าว</span>
                                </div>
                                <div className="flex gap-2">
                                    <PDFCheckbox size="w-4 h-4" checkType={'check'}/>
                                    <span className="mb-2">อื่น ๆ ............................</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ข้อมูลการเลือกสถานพยาบาล */}
            <div>
                <div className="grid grid-cols-3">
                    <div className="col-span-2 border-l border-r border-b border-slate-900">
                        <h3 className="font-bold border-b border-slate-900 text-center items-center py-2">ข้อมูลการเลือกสถานพยาบาล</h3>
                        <div className="space-y-0 p-2">
                            <div>
                                <p>8. ขอเลือกสถานพยาบาลประกันสังคม<span className="border-b border-dotted border-slate-400 inline-block w-[80px] mx-2 px-2 pb-1" style={{ minHeight: '1.2em' }}></span>(ผู้ประกันตนเป็นผู้เลือกสถานพยาบาล)</p>
                                <p className="pl-4 mt-2">หากไม่สามารถจัดสถานพยาบาลที่เลือกให้ได้ ขอเลือกสถานพยาบาลสำรองคือ</p>
                                <div className="pl-8 space-y-1 mt-1">
                                    <p>ลำดับที่ 1 ชื่อ<span className="border-b border-dotted border-slate-400 inline-block w-[300px] mx-1 px-2 pb-1" style={{ minHeight: '1.2em' }}></span>หรือ</p>
                                    <p>ลำดับที่ 2 ชื่อ<span className="border-b border-dotted border-slate-400 inline-block w-[300px] mx-1 px-2 pb-1" style={{ minHeight: '1.2em' }}></span></p>
                                </div>
                            </div>
                            
                            {/* ลายเซ็นผู้ประกันตน */}
                            <div className="flex justify-end mt-2">
                                <div className="text-center">
                                    <div className="">ลงชื่อ
                                        {applicant ? (
                                            <span className="inline-block mx-2" style={{ verticalAlign: 'baseline' }}>
                                                <img src={applicant.signature_url} alt="Signature" crossOrigin="anonymous" className="inline-block max-h-[50px] object-contain" />
                                            </span>
                                        ) : (
                                            <span className="inline-block border-b border-dotted border-slate-400 w-[300px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '50px', display: 'inline-block' }}>&nbsp;</span>
                                        )}
                                        ผู้ประกันตน
                                    </div>
                                    <p>({personalData.first_name && personalData.last_name ? `${personalData.first_name} ${personalData.last_name}` : '............................................'})</p>
                                    <p className="mt-1">วันที่{formData.signatureDate ? new Date(formData.signatureDate).toLocaleDateString('th-TH') : '..............................'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 border-r border-b border-slate-900 p-2">
                        <div className="grid mt-1 grid-col-4">
                            <div className="flex ml-2 mt-2">
                                {Array(6).fill('').map((_, idx) => (
                                    <div key={idx} className="p-2 border border-black"></div>
                                ))}
                            </div>
                            <div className="flex ml-2 mt-2">
                                {Array(6).fill('').map((_, idx) => (
                                    <div key={idx} className="p-2 border border-black"></div>
                                ))}
                            </div>
                            <div className="flex ml-2 mt-2">
                                {Array(6).fill('').map((_, idx) => (
                                    <div key={idx} className="p-2 border border-black"></div>
                                ))}
                            </div>
                            <div className="text-center space-y-0">
                                <div>ลงชื่อ<div className="inline-block border-b border-dotted border-slate-400 w-32 mx-2 px-2 pb-2" style={{ minHeight: '1.2em' }}></div>เจ้าหน้าที่</div>
                                <div>(<div className="inline-block border-b border-dotted border-slate-400 w-32 px-2 pb-2" style={{ minHeight: '1.2em' }}></div>)</div>
                                <div>ตำแหน่ง<div className="inline-block border-b border-dotted border-slate-400 w-28 mx-2 px-2 pb-2" style={{ minHeight: '1.2em' }}></div></div>
                                <div>วันที่<div className="inline-block border-b border-dotted border-slate-400 w-28 mx-2 px-2 pb-2" style={{ minHeight: '1.2em' }}></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* คำเตือน */}
            <div className="mb-4 flex p-4">
                <p className="font-bold underline mr-1 min-w-[55px]">คำเตือน</p>
                <div className="space-y-1.5">
                    <p>1. นายจ้างผู้ลงชื่อรับรองข้อมูลผู้ประกันตน กรณีนิติบุคคลต้องเป็นผู้มีอำนาจกระทำการผูกพันนิติบุคคลหรือผู้ได้รับมอบอำนาจ</p>
                    <p>2. การขึ้นทะเบียนผู้ประกันตนต่อสำนักงานประกันสังคมให้แจ้ง ภายใน 30 วัน นับแต่วันที่ลูกจ้างนั้นเป็นผู้ประกันตนตามแบบ สปส.1-03 เมื่อข้อเท็จจริงที่แจ้งไว้เปลี่ยนแปลง เช่น ลูกจ้างลาออกหรือถูกเลิกจ้าง ให้แจ้งต่อสำนักงานประกันสังคมภายในวันที่ 15 ของเดือนถัดจากเดือนที่มีการเปลี่ยนแปลงตามแบบ สปส.6-09 หากฝ่าฝืนอาจมีความผิดต้องระวางโทษจำคุกไม่เกิน 6 เดือน หรือปรับไม่เกิน 20,000 บาท หรือทั้งจำทั้งปรับ</p>
                    <p>3. การยื่นแบบเป็นเท็จ เช่น นำบุคคลที่ไม่ใช่ลูกจ้างขึ้นทะเบียนเป็นผู้ประกันตน อาจมีความผิดต้องระวางโทษจำคุกไม่เกิน 6 เดือน หรือปรับไม่เกิน 20,000 บาท หรือทั้งจำทั้งปรับ</p>
                </div>
            </div>
        </div>
    );
}