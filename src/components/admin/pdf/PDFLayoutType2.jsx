import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Check } from 'lucide-react';

export default function PDFLayoutType2({ applicant }) {
    const { data: settings } = useQuery({
        queryKey: ['system_settings_layout'], // Use same key as Layout to ensure cache hit
        queryFn: () => base44.entities.SystemSetting.list(),
        staleTime: 1000 * 60 * 5 
    });
    
    const appLogo = settings?.find(s => s.key === 'app_logo')?.value;
    const p = applicant.personal_data || {};
    const f = applicant.family_data || {};

    // --- Helpers ---
    const DottedLine = ({ value, className = "", center = false }) => (
        <div className={`border-b-[1.5px] border-dotted border-slate-400 px-1 pb-0.5 min-h-[1.4em] ${center ? 'text-center' : ''} ${className}`}>
            {value || ""}
        </div>
    );

    const Field = ({ label, value, width = "auto", labelWidth="auto" }) => (
        <div className="flex items-end text-[12px] leading-tight" style={{ width }}>
            <span className="font-bold text-slate-800 mr-1 whitespace-nowrap" style={{ width: labelWidth }}>{label}</span>
            <div className="flex-1 border-b-[1.5px] border-dotted border-slate-400 text-slate-900 px-2 pb-0.5 text-center truncate relative top-[2px]">
                {value || "-"}
            </div>
        </div>
    );

    const CheckBox = ({ label, checked, textSize="text-[11px]" }) => (
        <div className="flex items-center gap-1.5">
            <div className={`w-3 h-3 border border-slate-600 flex items-center justify-center shrink-0 rounded-[1px] ${checked ? 'bg-slate-200' : 'bg-white'}`}>
                {checked && <div className="w-1.5 h-1.5 bg-slate-800 rounded-[0.5px]" />}
            </div>
            <span className={`${textSize} text-slate-900 leading-none -mt-[2px]`}>{label}</span>
        </div>
    );

    return (
        <div 
            className="bg-white text-slate-900 p-[10mm] mx-auto relative text-[12px] font-sans"
            style={{ 
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'Sarabun, sans-serif'
            }}
        >
            {/* --- Top Section --- */}
            <div className="flex justify-between items-start mb-4">
                {/* Top Left Box */}
                <div className="border border-slate-800 p-2 w-[40mm] text-[11px] space-y-1">
                    <CheckBox label="Web HR" />
                    <CheckBox label="สปส.(เข้า)......" />
                    <CheckBox label="B-plus" />
                    <CheckBox label="สปส.(ออก)......" />
                </div>

                {/* Center Title */}
                <div className="flex-1 text-center pt-2">
                    <h1 className="text-2xl font-bold text-slate-900 underline underline-offset-4">ใบสมัครงาน</h1>
                </div>

                {/* Logo */}
                <div className="w-[40mm] flex justify-end">
                     {appLogo ? (
                        <img src={appLogo} alt="Logo" crossOrigin="anonymous" className="h-[80px] w-auto object-contain" />
                    ) : (
                        <div className="h-[80px] w-[80px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">LOGO</div>
                    )}
                </div>
            </div>

            {/* Application Date */}
            <div className="mb-4 font-bold text-[12px]">
                วันที่เขียนใบสมัครงาน &nbsp;&nbsp; {p.application_date || "____________________"}
            </div>

            {/* Disclaimer Text */}
            <div className="text-[10px] text-justify leading-snug mb-4">
                ใบสมัครงานเป็นส่วนหนึ่งในการพิจารณา โปรดกรอกข้อความตามจริงด้วยตัวเองให้ครบถ้วน อนึ่งในกรณีที่ท่าน ไม่ผ่านการพิจารณา รับเข้าทำงาน ข้อมูลในใบสมัครจะถูกเก็บรักษาไว้เป็นระยะเวลา 1 เดือน หากมีการพิจารณาตำแหน่งอื่นๆ อีกครั้งตามความเหมาะสม อนึ่งในกรณีที่ท่านผ่าน การพิจารณารับเข้าทำงาน ข้อมูลในใบสมัครจะถูกเก็บรักษาไว้ตลอดระยะเวลาการเป็นพนักงาน/ลูกจ้างของ บริษัทฯและหากท่านพ้นสภาพจากการเป็นพนักงาน/ลูกจ้างแล้วนั้น บริษัทฯจะเก็บรักษาไว้ต่อเนื่องอีกเป็นระยะเวลา 2 ปี หากมีกรณี ต้องใช้เป็นหลักฐานประกอบการพิจารณาตามกฎหมาย พนักงานหรือผู้มาติดต่อสมัครงาน ยินยอมให้เก็บรวบรวมข้อมูลส่วนบุคคลใน นามของบริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด เป็นผู้ควบคุมข้อมูลส่วนบุคคล ประมวลผลเก็บรวบรวมหรือเปิดเผยข้อมูล ส่วนบุคคล (PDPA) รวมถึงข้อมูลอื่นใดตามที่ได้ระบุไว้ใน พรบ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 “กฎหมายคุ้มครองข้อมูลส่วน บุคคล” และ “ข้อมูลส่วนบุคคลที่มีความอ่อนไหวเป็นพิเศษ”เพื่อเป็นส่วนหนึ่งของการพิจารณาบุคลากรตามเงื่อนไขบริษัทฯ
            </div>

            {/* --- HR / Staff Section Box --- */}
            <div className="border border-slate-800 p-3 mb-2 rounded-sm relative">
                <div className="absolute -top-2 left-2 bg-white px-1 font-bold text-[12px]">(สำหรับ จนท.)</div>
                
                <div className="grid grid-cols-12 gap-2 mb-3 mt-1">
                    <div className="col-span-4 flex items-center">
                        <span className="font-bold mr-2">รหัสพนักงาน</span>
                        <DottedLine className="flex-1" />
                    </div>
                    <div className="col-span-4 flex items-center">
                        <span className="font-bold mr-2">วันที่เริ่มงานจริง</span>
                        <DottedLine className="flex-1" />
                    </div>
                    <div className="col-span-4 flex items-center">
                        <span className="font-bold mr-2">หน่วยงาน/สังกัด</span>
                        <DottedLine className="flex-1" />
                    </div>
                </div>

                <div className="flex gap-4 mb-3">
                    <div className="flex items-center gap-2">
                        <span className="font-bold">ไซด์เสื้อ</span>
                        <DottedLine className="w-16 text-center" />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold">จำนวน</span>
                        <DottedLine className="w-16 text-center" />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-x-1 gap-y-1 text-[11px]">
                    <CheckBox label="รูปถ่าย 1-3 รูป" />
                    <CheckBox label="สำเนาบัตรประชาชน 3 ฉบับ" />
                    <CheckBox label="สำเนาทะเบียนบ้าน" />
                    
                    <CheckBox label="สำเนาวุฒิการศึกษา" />
                    <CheckBox label="หนังสือรับรองการศึกษา" />
                    <CheckBox label="หลักฐานการเปลี่ยนชื่อ-นามสกุล (ถ้ามี)" />
                    
                    <CheckBox label="สำเนาใบ สด. (ชาย)" />
                    <CheckBox label="สัญญาจ้าง" />
                    <CheckBox label="บันทึกข้อตกลงเข้ารับการฝึกอบรม" />
                    
                    <CheckBox label="แบบฟอร์มประเมินผล" />
                    <CheckBox label="หนังสือยินยอมการตรวจสุขภาพ" />
                    <CheckBox label="ใบรับรองแพทย์การตรวจสุขภาพ" />
                    
                    <CheckBox label="สำเนาบัญชีธนาคาร" />
                    <CheckBox label="หนังสือรับรองการทำงาน (ถ้ามี)" />
                    <div className="flex items-start gap-1.5 col-span-1">
                         <div className={`w-3 h-3 border border-slate-600 flex items-center justify-center shrink-0 rounded-[1px] bg-white mt-[1px]`}></div>
                         <span className="text-[11px] text-slate-900 leading-tight">หนังสือยินยอมเปิดเผยข้อมูลฯ (PDPA)</span>
                    </div>
                    
                    <CheckBox label="JD" />
                    <CheckBox label="เอกสาร Support อื่นๆ" />
                </div>
            </div>

            <div className="text-center font-bold text-[14px] my-2">ประวัติส่วนตัว</div>

            {/* --- Main Info Box --- */}
            <div className="border border-slate-800 rounded-sm">
                
                {/* Position Row */}
                <div className="p-3 border-b border-slate-800 bg-slate-50/50">
                    <div className="flex gap-4 items-end">
                        <div className="font-bold whitespace-nowrap">สมัครงานในตำแหน่ง 1</div>
                        <div className="border-b-[1.5px] border-dotted border-slate-400 flex-1 px-2 text-center font-medium">{p.position_1}</div>
                        <div className="font-bold whitespace-nowrap">2</div>
                        <div className="border-b-[1.5px] border-dotted border-slate-400 flex-1 px-2 text-center font-medium">{p.position_2}</div>
                        <div className="font-bold whitespace-nowrap">อัตราเงินเดือนที่ต้องการ</div>
                        <div className="border-b-[1.5px] border-dotted border-slate-400 w-32 px-2 text-center font-medium">{p.expected_salary}</div>
                    </div>
                    <div className="text-right text-[10px] text-slate-400 mt-0.5">wpaomgpoewmgeopmo</div>
                </div>

                {/* Personal Data & Photo */}
                <div className="p-3 grid grid-cols-12 gap-4">
                    
                    {/* Left Details */}
                    <div className="col-span-9 space-y-3">
                        <div className="flex gap-2">
                             <Field label="ชื่อ-สกุล (ภาษาไทย)" value={`${p.prefix || ''} ${p.first_name || ''} ${p.last_name || ''}`} width="60%" />
                             <Field label="ชื่อเล่น" value={p.thai_nickname} width="40%" />
                        </div>
                        <div className="flex gap-2">
                             <Field label="Name in English" value={p.english_name} width="60%" />
                             <Field label="เบอร์โทรศัพท์" value={p.mobile_phone} width="40%" />
                        </div>
                        <div className="flex gap-2">
                            <Field label="วันเดือนปีเกิด" value={p.dob} width="30%" />
                            <Field label="อายุ" value={p.age} width="15%" />
                            <Field label="ส่วนสูง" value={p.height} width="20%" />
                            <Field label="น้ำหนัก" value={p.weight} width="20%" />
                            <Field label="สัญชาติ" value={p.nationality} width="15%" />
                        </div>
                        <div className="flex gap-2">
                            <Field label="ศาสนา" value={p.religion} width="30%" />
                            <Field label="(Email) อีเมล์ที่ติดต่อได้" value={p.email} width="70%" />
                        </div>
                    </div>

                    {/* Photo Box */}
                    <div className="col-span-2">
                        <div className="border border-slate-400 w-[50px] h-[66px] flex items-center justify-center bg-slate-50 relative mx-auto">
                             {applicant.photo_url ? (
                                <img src={applicant.photo_url} alt="Photo" className="w-full h-full object-cover absolute inset-0" />
                            ) : (
                                <span className="text-slate-300 text-[10px]">รูปภาพ</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Address Section */}
                <div className="border-t border-slate-800 p-3 space-y-3">
                     {/* Registered */}
                     <div className="flex flex-wrap gap-x-2 gap-y-1 items-end">
                        <span className="font-bold whitespace-nowrap">ที่อยู่ตามทะเบียนบ้าน</span>
                        <span className="whitespace-nowrap">เลขที่</span> <DottedLine value={p.registered_address?.number} className="w-16 text-center" />
                        <span className="whitespace-nowrap">หมู่</span> <DottedLine value={p.registered_address?.moo} className="w-12 text-center" />
                        <span className="whitespace-nowrap">ถนน</span> <DottedLine value={p.registered_address?.road} className="w-32 text-center" />
                        <span className="whitespace-nowrap">ตำบล/แขวง</span> <DottedLine value={p.registered_address?.subdistrict} className="flex-1 text-center" />
                     </div>
                     <div className="flex flex-wrap gap-x-2 gap-y-1 items-end">
                        <span className="whitespace-nowrap">อำเภอ/เขต</span> <DottedLine value={p.registered_address?.district} className="w-40 text-center" />
                        <span className="whitespace-nowrap">จังหวัด</span> <DottedLine value={p.registered_address?.province} className="w-40 text-center" />
                        <span className="whitespace-nowrap">รหัสไปรษณีย์</span> <DottedLine value={p.registered_address?.zipcode} className="flex-1 text-center" />
                     </div>

                     {/* Current */}
                     <div className="flex flex-wrap gap-x-2 gap-y-1 items-end pt-2">
                        <span className="font-bold whitespace-nowrap">ที่อยู่ปัจจุบัน เป็น</span>
                        <div className="flex items-center gap-4 px-2">
                            <CheckBox label="บ้านตนเอง" checked={p.current_address_type === 'own'} />
                            <CheckBox label="บ้านเช่า / หอพัก" checked={p.current_address_type === 'rent'} />
                        </div>
                     </div>
                     <div className="flex flex-wrap gap-x-2 gap-y-1 items-end">
                        <span className="whitespace-nowrap">เลขที่</span> <DottedLine value={p.current_address?.number} className="w-16 text-center" />
                        <span className="whitespace-nowrap">หมู่</span> <DottedLine value={p.current_address?.moo} className="w-12 text-center" />
                        <span className="whitespace-nowrap">ถนน</span> <DottedLine value={p.current_address?.road} className="w-32 text-center" />
                        <span className="whitespace-nowrap">ตำบล/แขวง</span> <DottedLine value={p.current_address?.subdistrict} className="flex-1 text-center" />
                     </div>
                     <div className="flex flex-wrap gap-x-2 gap-y-1 items-end">
                        <span className="whitespace-nowrap">อำเภอ/เขต</span> <DottedLine value={p.current_address?.district} className="w-40 text-center" />
                        <span className="whitespace-nowrap">จังหวัด</span> <DottedLine value={p.current_address?.province} className="w-40 text-center" />
                        <span className="whitespace-nowrap">รหัสไปรษณีย์</span> <DottedLine value={p.current_address?.zipcode} className="flex-1 text-center" />
                     </div>
                </div>

                {/* Status Section */}
                <div className="border-t border-slate-800 p-3">
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                             <div className="font-bold underline mb-2">สถานภาพ (ชาย)</div>
                             <div className="space-y-1.5 pl-1">
                                 <div className="flex gap-4">
                                     <CheckBox label="ได้รับการยกเว้นทางทหาร" checked={p.military_status === 'exempted'} />
                                     <CheckBox label="เกณฑ์ทหารแล้ว" checked={p.military_status === 'served'} />
                                 </div>
                                 <CheckBox label="ยังไม่ได้รับการเกณฑ์" checked={p.military_status === 'not_served'} />
                                 <div className="flex gap-4">
                                     <CheckBox label="ยังไม่สมรส" checked={f.marital_status === 'single'} />
                                     <CheckBox label="สมรสแล้ว" checked={f.marital_status === 'married'} />
                                 </div>
                             </div>
                        </div>
                        <div>
                             <div className="font-bold underline mb-2">สถานภาพ (หญิง)</div>
                             <div className="space-y-1.5 pl-1">
                                 <div className="flex gap-4">
                                     <CheckBox label="ไม่อยู่ระหว่างการตั้งครรภ์" />
                                     <CheckBox label="มีบุตรแล้ว" checked={f.has_children === 'yes'} />
                                     <CheckBox label="ยังไม่มีบุตร" checked={f.has_children === 'no'} />
                                 </div>
                                 <CheckBox label="อยู่ระหว่างการตั้งครรภ์ ระบุ สัปดาห์ที่ตั้งครรภ์" />
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Graphic Decoration (Optional) - As seen in image corners */}
            <div className="absolute bottom-[5mm] left-[10mm] flex gap-2">
                 {/* Placeholder for certifications/ISO logos if needed */}
                 <div className="h-8 w-8 rounded-full border border-slate-300"></div>
                 <div className="h-8 w-8 rounded-full border border-slate-300"></div>
            </div>
            <div className="absolute bottom-[5mm] right-[10mm] text-[10px] text-slate-500">
                1 | 6
            </div>
            <div className="absolute bottom-[5mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                 FM-HRD-10 Rev.03 10/10/66 <br/>
                 www.ko.in.th Strategy . AI . DX . Sustainability
            </div>
        </div>
    );
}