import React from 'react';

export default function SPS103Document({ applicant, formData = {} }) {
    const personalData = applicant?.personal_data || {};
    const familyData = applicant?.family_data || {};
    
    return (
        <div 
            className="pdpa-page bg-white mx-auto relative shadow-sm print:shadow-none"
            style={{ 
                fontSize: "13px",
                padding: '10mm',
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'TH Sarabun New, Sarabun, sans-serif',
                lineHeight: '1.3'
            }}
        >
            {/* Header */}
            <div className="text-right mb-2">
                <span className="text-[12px]">สปส. 1-03</span>
            </div>
            <div className="text-center mb-4">
                <h1 className="text-[18px] font-bold">แบบขึ้นทะเบียนผู้ประกันตน</h1>
            </div>

            {/* ส่วนบน: ข้อมูลนายจ้าง และ สถานพยาบาลที่ */}
            <div className="border border-slate-900 mb-3">
                <div className="grid grid-cols-6">
                    {/* ซ้าย - ข้อมูลนายจ้าง สำหรับเจ้าหน้าที่ */}
                    <div className="col-span-3 border-r border-slate-900 p-3">
                        <h3 className="font-bold mb-2">ข้อมูลนายจ้าง สำหรับเจ้าหน้าที่</h3>
                        <div className="space-y-2 text-[12px]">
                            <div>
                                <span>ชื่อสถานประกอบการ</span>
                                <div className="border-b border-dotted border-slate-400 min-h-[20px]">
                                    {formData.employerName || '\u00A0'}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span>เลขที่บัญชี</span>
                                <div className="flex">
                                    {Array(10).fill('').map((_, idx) => (
                                        <div key={idx} className="w-5 h-6 border border-slate-400"></div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="flex items-center">
                                    <span>ลำดับที่สาขา</span>
                                    <div className="flex">
                                        {Array(5).fill('').map((_, idx) => (
                                            <div key={idx} className="w-5 h-6 border border-slate-400"></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-[11px]">เลขที่บัตรประกันสังคม</span>
                                    <div className="flex">
                                        {Array(10).fill('').map((_, idx) => (
                                            <div key={idx} className="w-4 h-6 border border-slate-400"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span>วันที่ผู้ประกันตนเข้าทำงาน</span>
                                <div className="border-b border-dotted border-slate-400 min-h-[20px]">
                                    {applicant?.start_work_date ? new Date(applicant.start_work_date).toLocaleDateString('th-TH') : '\u00A0'}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span>ประเภทการจ้าง</span>
                                <label className="flex items-center">
                                    <input type="checkbox" className="w-3 h-3" />
                                    <span>รายวัน</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="w-3 h-3" />
                                    <span>รายเดือน</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="w-3 h-3" />
                                    <span>อื่นๆ</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    {/* ขวา - สถานพยาบาลที่ */}
                    <div className="col-span-3 p-3">
                        <h3 className="font-bold mb-2">สถานพยาบาลที่</h3>
                        <div className="flex">
                            {Array(16).fill('').map((_, idx) => (
                                <div key={idx} className="w-4 h-6 border border-slate-400"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ข้อมูลผู้ประกันตน */}
            <div className="border border-slate-900 p-3 mb-3">
                <h3 className="font-bold mb-2 text-center bg-slate-100 py-1">ข้อมูลผู้ประกันตน</h3>
                
                <div className="space-y-2 text-[12px]">
                    {/* 1. ชื่อ */}
                    <div className="flex items-center gap-2">
                        <span>1. ชื่อ</span>
                        <label className="flex items-center gap-1">
                            <input type="checkbox" checked={personalData.prefix === 'นาย'} readOnly className="w-3 h-3" />
                            <span>นาย</span>
                        </label>
                        <label className="flex items-center gap-1">
                            <input type="checkbox" checked={personalData.prefix === 'นางสาว'} readOnly className="w-3 h-3" />
                            <span>นางสาว</span>
                        </label>
                        <label className="flex items-center gap-1">
                            <input type="checkbox" checked={personalData.prefix === 'นาง'} readOnly className="w-3 h-3" />
                            <span>นาง</span>
                        </label>
                        <div className="border-b border-dotted border-slate-400 flex-1 min-h-[20px]">
                            {personalData.first_name || '\u00A0'}
                        </div>
                        <span>ชื่อสกุล</span>
                        <div className="border-b border-dotted border-slate-400 flex-1 min-h-[20px]">
                            {personalData.last_name || '\u00A0'}
                        </div>
                    </div>

                    {/* 2. เพศ */}
                    <div className="flex items-center gap-2">
                        <span>2. เพศ</span>
                        <label className="flex items-center gap-1">
                            <input type="checkbox" checked={personalData.gender === 'male'} readOnly className="w-3 h-3" />
                            <span>ชาย</span>
                        </label>
                        <label className="flex items-center gap-1">
                            <input type="checkbox" checked={personalData.gender === 'female'} readOnly className="w-3 h-3" />
                            <span>หญิง</span>
                        </label>
                    </div>

                    {/* 3. สัญชาติ */}
                    <div className="flex items-center gap-2">
                        <span>3. สัญชาติ</span>
                        <div className="border-b border-dotted border-slate-400 flex-1 min-h-[20px]">
                            {personalData.nationality || '\u00A0'}
                        </div>
                    </div>

                    {/* 4. เกิดวันที่ */}
                    <div className="flex items-center gap-2">
                        <span>4. เกิดวันที่</span>
                        <div className="border-b border-dotted border-slate-400 w-20 min-h-[20px]">
                            {personalData.dob ? new Date(personalData.dob).toLocaleDateString('th-TH', { day: 'numeric' }) : '\u00A0'}
                        </div>
                        <span>เดือน</span>
                        <div className="border-b border-dotted border-slate-400 flex-1 min-h-[20px]">
                            {personalData.dob ? new Date(personalData.dob).toLocaleDateString('th-TH', { month: 'long' }) : '\u00A0'}
                        </div>
                        <span>พ.ศ.</span>
                        <div className="border-b border-dotted border-slate-400 w-24 min-h-[20px]">
                            {personalData.dob ? (new Date(personalData.dob).getFullYear() + 543) : '\u00A0'}
                        </div>
                    </div>

                    {/* 5. เลขประจำตัวประชาชน */}
                    <div className="flex items-center gap-2">
                        <span>5. เลขประจำตัวประชาชน</span>
                        <div className="flex gap-1">
                            {(personalData.id_card || '').split('').concat(Array(13).fill('')).slice(0, 13).map((digit, idx) => (
                                <div key={idx} className="w-5 h-6 border border-slate-400 flex items-center justify-center text-[11px]">
                                    {digit}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 6. สถานภาพครอบครัว */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span>6. สถานภาพครอบครัว</span>
                            <label className="flex items-center gap-1">
                                <input type="checkbox" checked={familyData.marital_status === 'single'} readOnly className="w-3 h-3" />
                                <span>1. โสด</span>
                            </label>
                            <label className="flex items-center gap-1">
                                <input type="checkbox" checked={familyData.marital_status === 'married'} readOnly className="w-3 h-3" />
                                <span>2. สมรส</span>
                            </label>
                            <label className="flex items-center gap-1">
                                <input type="checkbox" className="w-3 h-3" />
                                <span>3. หม้าย</span>
                            </label>
                            <label className="flex items-center gap-1">
                                <input type="checkbox" className="w-3 h-3" />
                                <span>4. หย่า</span>
                            </label>
                            <label className="flex items-center gap-1">
                                <input type="checkbox" className="w-3 h-3" />
                                <span>5. แยกกันอยู่</span>
                            </label>
                        </div>
                        <div className="flex items-center gap-2 pl-8">
                            <label className="flex items-center gap-1">
                                <input type="checkbox" checked={familyData.has_children === 'no'} readOnly className="w-3 h-3" />
                                <span>ไม่มีบุตร</span>
                            </label>
                            <label className="flex items-center gap-1">
                                <input type="checkbox" checked={familyData.has_children === 'yes'} readOnly className="w-3 h-3" />
                                <span>มีบุตรอายุไม่เกิน 6 ปี จำนวน</span>
                            </label>
                            <div className="border-b border-dotted border-slate-400 w-12 text-center">
                                {familyData.children_count || '\u00A0'}
                            </div>
                            <span>คน</span>
                        </div>
                        <div className="flex items-center gap-4 pl-16">
                            <div className="flex items-center gap-1">
                                <span>ลำดับที่ 1 เกิดปี พ.ศ.</span>
                                <div className="flex gap-0.5">
                                    {Array(4).fill('').map((_, idx) => (
                                        <div key={idx} className="w-4 h-5 border border-slate-400"></div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <span>ลำดับที่ 2 เกิดปี พ.ศ.</span>
                                <div className="flex gap-0.5">
                                    {Array(4).fill('').map((_, idx) => (
                                        <div key={idx} className="w-4 h-5 border border-slate-400"></div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <span>ลำดับที่ 3 เกิดปี พ.ศ.</span>
                                <div className="flex gap-0.5">
                                    {Array(4).fill('').map((_, idx) => (
                                        <div key={idx} className="w-4 h-5 border border-slate-400"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 7. สำหรับคนต่างด้าว */}
                    <div className="space-y-1 text-[11px]">
                        <p>7. สำหรับคนต่างด้าว ให้กรอกข้อความ ดังนี้</p>
                        <div className="pl-4 space-y-1">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" className="w-3 h-3" />
                                <span>หนังสือเดินทาง (PASSPORT) เลขที่</span>
                                <div className="border-b border-dotted border-slate-400 flex-1 min-h-[18px]"></div>
                                <span>และ</span>
                            </div>
                            <div className="flex items-center gap-2 pl-4">
                                <span>ใบอนุญาตทำงาน (WORK PERMIT) เลขที่</span>
                                <div className="border-b border-dotted border-slate-400 flex-1 min-h-[18px]"></div>
                                <span>หรือ</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" className="w-3 h-3" />
                                <span>อื่นๆ (ระบุ)</span>
                                <div className="border-b border-dotted border-slate-400 w-48 min-h-[18px]"></div>
                                <span>เลขที่</span>
                                <div className="border-b border-dotted border-slate-400 flex-1 min-h-[18px]"></div>
                                <span>และ</span>
                            </div>
                            <div className="flex items-center gap-2 pl-4">
                                <span>ใบอนุญาตทำงาน (WORK PERMIT) เลขที่</span>
                                <div className="border-b border-dotted border-slate-400 flex-1 min-h-[18px]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ลายเซ็นนายจ้าง */}
                <div className="mt-4 text-[12px]">
                    <p className="mb-2">ข้าพเจ้าขอรับรองว่าข้อความดังกล่าวข้างต้น ถูกต้องตามความเป็นจริงทุกประการ</p>
                    <div className="flex justify-end">
                        <div className="text-center">
                            <div className="mb-1">ลงชื่อ<div className="inline-block border-b border-dotted border-slate-400 w-48 mx-2 min-h-[20px]"></div>นายจ้าง</div>
                            <div className="mb-1">(<div className="inline-block border-b border-dotted border-slate-400 w-48 min-h-[20px]"></div>)</div>
                            <div className="mb-1">ตำแหน่ง<div className="inline-block border-b border-dotted border-slate-400 w-40 mx-2 min-h-[20px]"></div></div>
                            <div>วันที่<div className="inline-block border-b border-dotted border-slate-400 w-40 mx-2 min-h-[20px]"></div></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ข้อมูลการเลือกสถานพยาบาล */}
            <div className="border border-slate-900 p-3 mb-3">
                <h3 className="font-bold mb-2 text-center bg-slate-100 py-1">ข้อมูลการเลือกสถานพยาบาล</h3>
                <div className="space-y-2 text-[12px]">
                    <div>
                        <p>8. ขอเลือกสถานพยาบาลประกันสังคม<span className="border-b border-dotted border-slate-400 inline-block w-64 mx-2"></span>(ผู้ประกันตนเป็นผู้เลือกสถานพยาบาล)</p>
                        <p className="pl-4 mt-2">หากไม่สามารถจัดสถานพยาบาลที่เลือกให้ได้ ขอเลือกสถานพยาบาลสำรองคือ</p>
                        <div className="pl-8 space-y-1 mt-1">
                            <p>ลำดับที่ 1 ชื่อ<span className="border-b border-dotted border-slate-400 inline-block w-96 mx-2"></span>หรือ</p>
                            <p>ลำดับที่ 2 ชื่อ<span className="border-b border-dotted border-slate-400 inline-block w-96 mx-2"></span></p>
                        </div>
                    </div>
                    
                    {/* ลายเซ็นผู้ประกันตน */}
                    <div className="flex justify-end mt-4">
                        <div className="text-center">
                            <div className="border-b border-slate-400 min-h-[50px] w-48 mb-1 flex items-center justify-center">
                                {applicant?.signature_url ? (
                                    <img src={applicant.signature_url} alt="Signature" crossOrigin="anonymous" className="h-[40px] object-contain" />
                                ) : (
                                    '\u00A0'
                                )}
                            </div>
                            <p>ลงชื่อ............................................ผู้ประกันตน</p>
                            <p>(............................................)</p>
                            <p>วันที่{formData.signatureDate ? new Date(formData.signatureDate).toLocaleDateString('th-TH') : '..............................'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* คำเตือน */}
            <div className="border border-slate-900 p-2 mb-2 text-[10px]">
                <p className="font-bold mb-1">คำเตือน</p>
                <ol className="list-decimal list-inside space-y-1 pl-2">
                    <li>นายจ้างผู้ลงชื่อรับรองข้อมูลผู้ประกันตน กรณีนิติบุคคลต้องเป็นผู้มีอำนาจกระทำการผูกพันนิติบุคคลหรือผู้ได้รับมอบอำนาจ</li>
                    <li>การขึ้นทะเบียนผู้ประกันตนต่อสำนักงานประกันสังคมให้แจ้ง ภายใน 30 วัน นับแต่วันที่ลูกจ้างนั้นเป็นผู้ประกันตนตามแบบ สปส.1-03 เมื่อข้อเท็จจริงที่แจ้งไว้เปลี่ยนแปลง เช่น ลูกจ้างลาออกหรือถูกเลิกจ้าง ให้แจ้งต่อสำนักงานประกันสังคมภายในวันที่ 15 ของเดือนถัดจากเดือนที่มีการเปลี่ยนแปลงตามแบบ สปส.6-09 หากฝ่าฝืนอาจมีความผิดต้องระวางโทษจำคุกไม่เกิน 6 เดือน หรือปรับไม่เกิน 20,000 บาท หรือทั้งจำทั้งปรับ</li>
                    <li>การยื่นแบบเป็นเท็จ เช่น นำบุคคลที่ไม่ใช่ลูกจ้างขึ้นทะเบียนเป็นผู้ประกันตน อาจมีความผิดต้องระวางโทษจำคุกไม่เกิน 6 เดือน หรือปรับไม่เกิน 20,000 บาท หรือทั้งจำทั้งปรับ</li>
                </ol>
            </div>

            {/* ส่วนล่าง: เอกสารแนบ และ ลายเซ็นเจ้าหน้าที่ */}
            <div className="grid grid-cols-2 gap-4 text-[11px]">
                <div>
                    <p className="font-bold mb-1">เอกสารที่แนบ</p>
                    <div className="space-y-0.5 pl-2">
                        <label className="flex items-center gap-1">
                            <input type="checkbox" className="w-3 h-3" />
                            <span>สำเนาบัตรประจำตัวประชาชน</span>
                        </label>
                        <label className="flex items-center gap-1">
                            <input type="checkbox" className="w-3 h-3" />
                            <span>สำเนาทะเบียนบ้าน</span>
                        </label>
                        <label className="flex items-center gap-1">
                            <input type="checkbox" className="w-3 h-3" />
                            <span>สำเนาใบสำคัญประจำตัวคนต่างด้าว</span>
                        </label>
                        <label className="flex items-center gap-1">
                            <input type="checkbox" className="w-3 h-3" />
                            <span>สำเนาหนังสือเดินทาง</span>
                        </label>
                        <label className="flex items-center gap-1">
                            <input type="checkbox" className="w-3 h-3" />
                            <span>สำเนาใบอนุญาตทำงานคนต่างด้าว</span>
                        </label>
                        <div className="flex items-center gap-1">
                            <input type="checkbox" className="w-3 h-3" />
                            <span>อื่น ๆ</span>
                            <div className="border-b border-dotted border-slate-400 flex-1 min-h-[16px]"></div>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <p className="mb-1">สำนักงานประกันสังคม</p>
                    <div className="mb-1">ลงชื่อ<div className="inline-block border-b border-dotted border-slate-400 w-40 mx-2 min-h-[20px]"></div>เจ้าหน้าที่</div>
                    <div className="mb-1">(<div className="inline-block border-b border-dotted border-slate-400 w-40 min-h-[20px]"></div>)</div>
                    <div className="mb-1">ตำแหน่ง<div className="inline-block border-b border-dotted border-slate-400 w-32 mx-2 min-h-[20px]"></div></div>
                    <div>วันที่<div className="inline-block border-b border-dotted border-slate-400 w-32 mx-2 min-h-[20px]"></div></div>
                </div>
            </div>
        </div>
    );
}