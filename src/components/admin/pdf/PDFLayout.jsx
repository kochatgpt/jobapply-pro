import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Square, CheckSquare } from "lucide-react";

export default function PDFLayout({ applicant }) {
    // Fetch Logo
    const { data: settings } = useQuery({
        queryKey: ['system_settings_pdf'],
        queryFn: () => base44.entities.SystemSetting.list()
    });
    const appLogo = settings?.find(s => s.key === 'app_logo')?.value;

    const p = applicant?.personal_data || {};
    const f = applicant?.family_data || {};

    // Helper for dotted line values
    const DataField = ({ label, value, width = "auto", className = "" }) => (
        <div className={`flex items-end gap-2 ${className}`} style={{ width }}>
            <span className="font-bold whitespace-nowrap text-sm">{label}</span>
            <div className="border-b border-dotted border-slate-400 px-2 flex-1 text-center text-sm min-h-[24px]">
                {value || "-"}
            </div>
        </div>
    );

    const CheckBox = ({ label, checked }) => (
        <div className="flex items-center gap-2">
            <div className={`w-4 h-4 border border-slate-400 flex items-center justify-center ${checked ? 'bg-slate-200' : ''}`}>
                {checked && <div className="w-2 h-2 bg-slate-600" />}
            </div>
            <span className="text-xs">{label}</span>
        </div>
    );

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white p-[10mm] pt-[15mm] text-slate-900 font-sans relative text-xs leading-none">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-2">
                <div className="border border-slate-800 p-2 w-40 text-[10px] space-y-0.5">
                    <CheckBox label="Web HR" />
                    <CheckBox label="สปส.(เข้า)......" />
                    <CheckBox label="B-plus" />
                    <CheckBox label="สปส.(ออก)......" />
                </div>
                
                <div className="text-center mt-4">
                    <h1 className="text-2xl font-bold underline decoration-1 underline-offset-4">ใบสมัครงาน</h1>
                </div>

                <div className="w-40 flex justify-end">
                    {appLogo ? (
                        <img src={appLogo} alt="Logo" className="h-24 object-contain scale-125 origin-top-right" />
                    ) : (
                        <div className="h-24 w-24 bg-slate-100 flex items-center justify-center text-xs">NO LOGO</div>
                    )}
                </div>
            </div>

            {/* Application Date */}
            <div className="mb-2 text-xs">
                <span className="font-bold">วันที่เขียนใบสมัคร</span> <span className="ml-2 border-b border-dotted border-slate-400 px-4">{applicant.submission_date || p.application_date}</span>
            </div>

            {/* Disclaimer Text */}
            <div className="text-[9px] text-justify leading-tight tracking-tight mb-2">
                ใบสมัครงานเป็นส่วนหนึ่งในการพิจารณา โปรดกรอกข้อความตามจริงด้วยตัวเองให้ครบถ้วน อนึ่งในกรณีที่ท่าน ไม่ผ่าน การพิจารณา รับเข้าทำงาน 
                ข้อมูลในใบสมัครจะถูกเก็บรักษาไว้เป็นระยะเวลา 1 เดือน หากมีการพิจารณาตำแหน่งอื่นๆ อีกครั้งตามความเหมาะสม อนึ่งในกรณีที่ท่านผ่าน การพิจารณารับเข้าทำงาน 
                ข้อมูลในใบสมัครจะถูกเก็บรักษาไว้ตลอดระยะเวลาการเป็นพนักงาน/ลูกจ้างของ บริษัทฯและหากท่านพ้นสภาพจากการเป็นพนักงาน/ลูกจ้างแล้วนั้น บริษัทฯจะ
                เก็บรักษาไว้ต่อเนื่องอีกเป็นระยะเวลา 2 ปี หากมีกรณี ต้องใช้เป็นหลักฐานประกอบการพิจารณาตามกฎหมาย พนักงานหรือผู้มาติดต่อสมัครงาน ยินยอมให้เก็บรวบรวมข้อมูลส่วนบุคคล 
                ใน นามของบริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด เป็นผู้ควบคุมข้อมูลส่วนบุคคล ประมวลผลเก็บรวบรวมหรือเปิดเผยข้อมูล ส่วนบุคคล (PDPA) 
                รวมถึงข้อมูลอื่นใดตามที่ได้ระบุไว้ใน พรบ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 "กฎหมายคุ้มครองข้อมูลส่วนบุคคล" และ "ข้อมูลส่วนบุคคลที่มีความอ่อนไหวเป็นพิเศษ"
                เพื่อเป็นส่วนหนึ่งของการพิจารณาบุคลากรตามเงื่อนไขบริษัทฯ
            </div>

            {/* HR Section (Admin Only) */}
            <div className="border border-slate-800 p-1.5 mb-2 text-[10px]">
                <div className="grid grid-cols-12 gap-2 mb-2">
                    <div className="col-span-4 font-bold">(สำหรับ จนท.) รหัสพนักงาน EMP........</div>
                    <div className="col-span-4">วันที่เริ่มงานจริง ........................................</div>
                    <div className="col-span-4">หน่วยงาน/สังกัด ........................................</div>
                </div>
                <div className="mb-2">
                    ไซซ์เสื้อ <span className="mx-2">.........</span> จำนวน <span className="mx-2">.........</span>
                </div>
                <div className="grid grid-cols-3 gap-y-0.5 gap-x-2">
                    <CheckBox label="รูปถ่าย 1-3 รูป" />
                    <CheckBox label="สำเนาบัตรประชาชน 3 ฉบับ" />
                    <CheckBox label="สำเนาทะเบียนบ้าน" />
                    <CheckBox label="สำเนาวุฒิการศึกษา" />
                    <CheckBox label="หนังสือรับรองการศึกษา" />
                    <CheckBox label="หลักฐานการเปลี่ยนชื่อ-นามสกุล (ถ้ามี)" />
                    <CheckBox label="สำเนาใบ ก.พ.7 (ชาย)" />
                    <CheckBox label="สัญญาจ้าง" />
                    <CheckBox label="บันทึกข้อตกลงเข้ารับการฝึกอบรม" />
                    <CheckBox label="แบบฟอร์มประเมินผล" />
                    <CheckBox label="หนังสือยินยอมการตรวจสุขภาพ" />
                    <CheckBox label="ใบรับรองแพทย์การตรวจสุขภาพ" />
                    <CheckBox label="สำเนาบัญชีธนาคาร" />
                    <CheckBox label="หนังสือรับรองการทำงาน (ถ้ามี)" />
                    <CheckBox label="หนังสือยินยอมเปิดเผยข้อมูลฯ (PDPA)" />
                    <CheckBox label="JD" />
                    <CheckBox label="เอกสาร Support อื่นๆ" />
                </div>
            </div>

            {/* Personal History Header */}
            <div className="text-center font-bold mb-1 text-sm">ประวัติส่วนตัว</div>

            {/* Position Box */}
            <div className="border border-slate-800 p-1.5 mb-2 text-xs">
                <div className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-4 flex items-end gap-2">
                        <span className="font-bold">สมัครงานในตำแหน่ง 1</span>
                        <div className="border-b border-dotted border-slate-400 flex-1 text-center">{p.position_1}</div>
                    </div>
                    <div className="col-span-4 flex items-end gap-2">
                        <span className="font-bold">2</span>
                        <div className="border-b border-dotted border-slate-400 flex-1 text-center">{p.position_2}</div>
                    </div>
                    <div className="col-span-4 flex items-end gap-2">
                        <span className="font-bold">อัตราเงินเดือนที่ต้องการ</span>
                        <div className="border-b border-dotted border-slate-400 flex-1 text-center">{p.expected_salary}</div>
                    </div>
                </div>
            </div>

            {/* Main Bio Data */}
            <div className="border border-slate-800 p-2 mb-2 relative text-xs">
                {/* Photo Placeholder */}
                <div className="absolute top-2 right-2 w-24 h-32 border border-slate-300 flex items-center justify-center bg-slate-50">
                    {applicant.photo_url ? (
                        <img src={applicant.photo_url} className="w-full h-full object-cover" alt="Photo" />
                    ) : (
                        <span className="text-[10px] text-slate-400">รูปภาพ</span>
                    )}
                </div>

                <div className="space-y-2 pr-28"> {/* Right padding for photo */}
                    <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-8">
                             <DataField label="ชื่อ-สกุล (ภาษาไทย)" value={`${p.prefix || ''} ${p.first_name || ''} ${p.last_name || ''}`} width="100%" />
                        </div>
                        <div className="col-span-4">
                             <DataField label="ชื่อเล่น" value={p.thai_nickname} width="100%" />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2">
                         <div className="col-span-8">
                             <DataField label="Name in English" value={p.english_name} width="100%" />
                         </div>
                         <div className="col-span-4">
                             <DataField label="เบอร์โทรศัพท์" value={p.mobile_phone} width="100%" />
                        </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        <DataField label="วันเดือนปีเกิด" value={p.dob} width="160px" />
                        <DataField label="อายุ" value={p.age} width="60px" />
                        <span className="pt-1">ปี</span>
                        <DataField label="ส่วนสูง" value={p.height} width="80px" />
                        <span className="pt-1">ซม.</span>
                        <DataField label="น้ำหนัก" value={p.weight} width="80px" />
                        <span className="pt-1">กก.</span>
                        <DataField label="สัญชาติ" value={p.nationality} width="100px" />
                    </div>

                    <div className="flex gap-2">
                        <DataField label="ศาสนา" value={p.religion} width="120px" />
                        <DataField label="(Email) อีเมล์ที่ติดต่อได้" value={p.email} className="flex-1" />
                    </div>
                </div>

                <hr className="my-2 border-slate-300" />

                {/* Addresses */}
                <div className="space-y-2">
                    {/* Registered Address */}
                    <div className="flex gap-1 items-end flex-wrap">
                        <span className="font-bold">ที่อยู่ตามทะเบียนบ้าน เลขที่</span>
                        <span className="border-b border-dotted border-slate-400 px-2 min-w-[50px]">{p.registered_address?.number}</span>
                        <span className="font-bold">หมู่</span>
                        <span className="border-b border-dotted border-slate-400 px-2 min-w-[30px]">{p.registered_address?.moo}</span>
                        <span className="font-bold">ถนน</span>
                        <span className="border-b border-dotted border-slate-400 px-2 flex-1 min-w-[100px]">{p.registered_address?.road}</span>
                        <span className="font-bold">ตำบล/แขวง</span>
                        <span className="border-b border-dotted border-slate-400 px-2 flex-1 min-w-[100px]">{p.registered_address?.subdistrict}</span>
                    </div>
                    <div className="flex gap-1 items-end flex-wrap">
                        <span className="font-bold">อำเภอ/เขต</span>
                        <span className="border-b border-dotted border-slate-400 px-2 flex-1">{p.registered_address?.district}</span>
                        <span className="font-bold">จังหวัด</span>
                        <span className="border-b border-dotted border-slate-400 px-2 flex-1">{p.registered_address?.province}</span>
                        <span className="font-bold">รหัสไปรษณีย์</span>
                        <span className="border-b border-dotted border-slate-400 px-2 w-32">{p.registered_address?.zipcode}</span>
                    </div>

                    {/* Current Address */}
                    <div className="flex gap-4 items-center mt-2">
                        <span className="font-bold">ที่อยู่ปัจจุบัน เป็น</span>
                        <CheckBox label="บ้านตนเอง" checked={p.current_address_type === 'own'} />
                        <CheckBox label="บ้านเช่า / หอพัก" checked={p.current_address_type === 'rent'} />
                    </div>
                    
                    <div className="flex gap-1 items-end flex-wrap">
                        <span className="font-bold">เลขที่</span>
                        <span className="border-b border-dotted border-slate-400 px-2 min-w-[50px]">{p.current_address?.number}</span>
                        <span className="font-bold">หมู่</span>
                        <span className="border-b border-dotted border-slate-400 px-2 min-w-[30px]">{p.current_address?.moo}</span>
                        <span className="font-bold">ถนน</span>
                        <span className="border-b border-dotted border-slate-400 px-2 flex-1 min-w-[100px]">{p.current_address?.road}</span>
                        <span className="font-bold">ตำบล/แขวง</span>
                        <span className="border-b border-dotted border-slate-400 px-2 flex-1 min-w-[100px]">{p.current_address?.subdistrict}</span>
                    </div>
                    <div className="flex gap-1 items-end flex-wrap">
                        <span className="font-bold">อำเภอ/เขต</span>
                        <span className="border-b border-dotted border-slate-400 px-2 flex-1">{p.current_address?.district}</span>
                        <span className="font-bold">จังหวัด</span>
                        <span className="border-b border-dotted border-slate-400 px-2 flex-1">{p.current_address?.province}</span>
                        <span className="font-bold">รหัสไปรษณีย์</span>
                        <span className="border-b border-dotted border-slate-400 px-2 w-32">{p.current_address?.zipcode}</span>
                    </div>
                </div>

                <hr className="my-2 border-slate-300" />

                {/* Status Section */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="font-bold mb-1 underline">สถานภาพ (ชาย)</div>
                        <div className="space-y-1">
                            <CheckBox label="ได้รับการยกเว้นทางทหาร" checked={p.military_status === 'exempted'} />
                            <CheckBox label="เกณฑ์ทหารแล้ว" checked={p.military_status === 'conscripted'} />
                            <CheckBox label="ยังไม่ได้รับการเกณฑ์" checked={p.military_status === 'not_yet'} />
                        </div>
                        <div className="mt-2 space-y-1">
                             <CheckBox label="ยังไม่สมรส" checked={f.marital_status === 'single'} />
                             <CheckBox label="สมรสแล้ว" checked={f.marital_status === 'married'} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold mb-1 underline">สถานภาพ (หญิง)</div>
                        <div className="space-y-1">
                             <CheckBox label="ไม่อยู่ระหว่างการตั้งครรภ์" />
                             <CheckBox label="มีบุตรแล้ว" checked={f.has_children === 'yes'} />
                             <CheckBox label="ยังไม่มีบุตร" checked={f.has_children === 'no'} />
                             <CheckBox label="อยู่ระหว่างการตั้งครรภ์ ระบุ สัปดาห์ที่ตั้งครรภ์" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Page Number */}
            <div className="absolute bottom-[10mm] right-[15mm] text-xs text-slate-500">
                1 | 6
            </div>
            
             <div className="absolute bottom-[10mm] left-[15mm] text-xs text-slate-500">
                FM-HRD-10 Rev.03 10/10/66
            </div>
        </div>
    );
}