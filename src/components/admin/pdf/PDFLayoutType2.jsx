import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Check } from 'lucide-react';

export default function PDFLayoutType2({ applicant }) {
    const { data: settings } = useQuery({
        queryKey: ['system_settings_layout'],
        queryFn: () => base44.entities.SystemSetting.list(),
        staleTime: 1000 * 60 * 5 
    });
    
    const appLogo = settings?.find(s => s.key === 'app_logo')?.value;
    const p = applicant.personal_data || {};
    const f = applicant.family_data || {};
    const e = applicant.education_data || { history: {} };
    const s = applicant.skills_data || { languages: {}, office: {}, driving: {} };
    const t = applicant.training_data || { history: [] };

    // --- Helpers ---
    const DottedLine = ({ value, className = "", center = false }) => (
        <div className={`border-b-[1.5px] border-dotted border-slate-400 px-1 pb-1 min-h-[1.4em] ${center ? 'text-center' : ''} ${className}`}>
            {value || ""}
        </div>
    );

    const Field = ({ label, value, width = "auto", labelWidth="auto", className = "" }) => (
        <div className={`flex items-end text-[12px] leading-tight ${className}`} style={{ width: className ? 'auto' : width }}>
            <span className="font-bold text-slate-800 mr-1 whitespace-nowrap pb-1" style={{ width: labelWidth }}>{label}</span>
            <div className="flex-1 border-b-[1.5px] border-dotted border-slate-400 text-slate-900 px-2 pb-1 text-center truncate">
                {value || "-"}
            </div>
        </div>
    );

    const CheckBox = ({ label, checked, textSize="text-[11px]", width="w-[300px]" }) => (
        <div className={`relative pl-5 h-4 flex items-center ${width}`}>
            <div className={`absolute left-0 top-0.5 w-3 h-3 border-[0.5px] border-slate-400 flex items-center justify-center rounded-[1px] ${checked ? 'bg-slate-200' : 'bg-white'}`}>
                {checked && <div className="w-1.5 h-1.5 bg-slate-800 rounded-[0.5px]" />}
            </div>
            <span className={`leading-none absolute bottom-2.5 ${textSize} text-slate-900`}>{label}</span>
        </div>
    );

    const PageContainer = ({ children, pageNum, totalPages = 4 }) => (
        <div 
            className="bg-white text-slate-900 p-[10mm] mx-auto relative text-[12px] font-sans mb-8 shadow-sm print:shadow-none print:mb-0"
            style={{ 
                width: '210mm', 
                minHeight: '297mm',
                height: '297mm',
                fontFamily: 'Sarabun, sans-serif',
                pageBreakAfter: 'always',
                overflow: 'hidden'
            }}
        >
            {children}
            
            {/* Footer */}
            <div className="absolute bottom-[5mm] left-[10mm] flex gap-2">
                 <div className="h-8 w-8 rounded-full border border-slate-300"></div>
                 <div className="h-8 w-8 rounded-full border border-slate-300"></div>
            </div>
            <div className="absolute bottom-[5mm] right-[10mm] text-[10px] text-slate-500">
                {pageNum} | {totalPages}
            </div>
            <div className="absolute bottom-[5mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                 FM-HRD-10 Rev.03 10/10/66 <br/>
                 www.ko.in.th Strategy . AI . DX . Sustainability
            </div>
        </div>
    );

    const LogoHeader = () => (
         <div className="absolute top-[10mm] right-[10mm] w-[40mm] flex justify-end">
             {appLogo ? (
                <img src={appLogo} alt="Logo" crossOrigin="anonymous" className="h-[60px] w-auto object-contain" />
            ) : (
                <div className="h-[60px] w-[80px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">LOGO</div>
            )}
        </div>
    );

    return (
        <div className="flex flex-col items-center">
            {/* ================= PAGE 1 ================= */}
            <PageContainer pageNum={1} totalPages={4}>
                 {/* --- Top Section --- */}
                <div className="flex justify-between items-start mb-4">
                    {/* Top Left Box */}
                    <div className="border-[0.5px] border-slate-400 p-2 w-[40mm] text-[11px] space-y-1">
                        <div className="relative pl-5 h-4 flex items-center">
                            <div className="absolute left-0 top-0.5 w-3 h-3 border border-slate-600 bg-white rounded-[1px]"></div>
                            <span className="leading-none absolute bottom-2.5">Web HR</span>
                        </div>
                        <div className="relative pl-5 h-4 flex items-center">
                            <div className="absolute left-0 top-0.5 w-3 h-3 border border-slate-600 bg-white rounded-[1px]"></div>
                            <span className="leading-none absolute bottom-2.5">สปส.(เข้า)......</span>
                        </div>
                        <div className="relative pl-5 h-4 flex items-center">
                            <div className="absolute left-0 top-0.5 w-3 h-3 border border-slate-600 bg-white rounded-[1px]"></div>
                            <span className="leading-none absolute bottom-2.5">B-plus</span>
                        </div>
                        <div className="relative pl-5 h-4 flex items-center">
                            <div className="absolute left-0 top-0.5 w-3 h-3 border border-slate-600 bg-white rounded-[1px]"></div>
                            <span className="leading-none absolute bottom-2.5">สปส.(ออก)......</span>
                        </div>
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

                {/* Disclaimer */}
                <div className="text-[10px] text-justify leading-snug mb-4">
                    ใบสมัครงานเป็นส่วนหนึ่งในการพิจารณา โปรดกรอกข้อความตามจริงด้วยตัวเองให้ครบถ้วน อนึ่งในกรณีที่ท่าน ไม่ผ่านการพิจารณา รับเข้าทำงาน ข้อมูลในใบสมัครจะถูกเก็บรักษาไว้เป็นระยะเวลา 1 เดือน หากมีการพิจารณาตำแหน่งอื่นๆ อีกครั้งตามความเหมาะสม อนึ่งในกรณีที่ท่านผ่าน การพิจารณารับเข้าทำงาน ข้อมูลในใบสมัครจะถูกเก็บรักษาไว้ตลอดระยะเวลาการเป็นพนักงาน/ลูกจ้างของ บริษัทฯและหากท่านพ้นสภาพจากการเป็นพนักงาน/ลูกจ้างแล้วนั้น บริษัทฯจะเก็บรักษาไว้ต่อเนื่องอีกเป็นระยะเวลา 2 ปี หากมีกรณี ต้องใช้เป็นหลักฐานประกอบการพิจารณาตามกฎหมาย พนักงานหรือผู้มาติดต่อสมัครงาน ยินยอมให้เก็บรวบรวมข้อมูลส่วนบุคคลใน นามของบริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด เป็นผู้ควบคุมข้อมูลส่วนบุคคล ประมวลผลเก็บรวบรวมหรือเปิดเผยข้อมูล ส่วนบุคคล (PDPA) รวมถึงข้อมูลอื่นใดตามที่ได้ระบุไว้ใน พรบ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 “กฎหมายคุ้มครองข้อมูลส่วน บุคคล” และ “ข้อมูลส่วนบุคคลที่มีความอ่อนไหวเป็นพิเศษ”เพื่อเป็นส่วนหนึ่งของการพิจารณาบุคลากรตามเงื่อนไขบริษัทฯ
                </div>

                {/* --- HR Section --- */}
                <div className="border-[0.5px] border-slate-400 p-3 mb-2 rounded-sm relative">
                    <div className="absolute -top-2 left-2 bg-white px-1 font-bold text-[12px]">(สำหรับ จนท.)</div>
                    <div className="grid grid-cols-12 gap-2 mb-3 mt-1">
                        <div className="col-span-4 flex items-end"><span className="font-bold mr-2 pb-1">รหัสพนักงาน</span><DottedLine className="flex-1" /></div>
                        <div className="col-span-4 flex items-end"><span className="font-bold mr-2 pb-1">วันที่เริ่มงานจริง</span><DottedLine className="flex-1" /></div>
                        <div className="col-span-4 flex items-end"><span className="font-bold mr-2 pb-1">หน่วยงาน/สังกัด</span><DottedLine className="flex-1" /></div>
                    </div>
                    <div className="flex gap-4 mb-3">
                        <div className="flex items-end gap-2"><span className="font-bold pb-1">ไซด์เสื้อ</span><DottedLine className="w-16 text-center" /></div>
                        <div className="flex items-end gap-2"><span className="font-bold pb-1">จำนวน</span><DottedLine className="w-16 text-center" /></div>
                    </div>
                    <div className="grid grid-cols-3 gap-x-1 gap-y-1 text-[11px]">
                        <CheckBox label="รูปถ่าย 1-3 รูป" /><CheckBox label="สำเนาบัตรประชาชน 3 ฉบับ" /><CheckBox label="สำเนาทะเบียนบ้าน" />
                        <CheckBox label="สำเนาวุฒิการศึกษา" /><CheckBox label="หนังสือรับรองการศึกษา" /><CheckBox label="หลักฐานการเปลี่ยนชื่อ-นามสกุล (ถ้ามี)" />
                        <CheckBox label="สำเนาใบ สด. (ชาย)" /><CheckBox label="สัญญาจ้าง" /><CheckBox label="บันทึกข้อตกลงเข้ารับการฝึกอบรม" />
                        <CheckBox label="แบบฟอร์มประเมินผล" /><CheckBox label="หนังสือยินยอมการตรวจสุขภาพ" /><CheckBox label="ใบรับรองแพทย์การตรวจสุขภาพ" />
                        <CheckBox label="สำเนาบัญชีธนาคาร" /><CheckBox label="หนังสือรับรองการทำงาน (ถ้ามี)" />
                        <div className="relative pl-5 h-4 flex items-center col-span-1">
                             <div className={`absolute left-0 top-0.5 w-3 h-3 border border-slate-600 flex items-center justify-center rounded-[1px] bg-white`}></div>
                             <span className="leading-none absolute bottom-2.5 text-[11px] text-slate-900">หนังสือยินยอมเปิดเผยข้อมูลฯ (PDPA)</span>
                        </div>
                        <CheckBox label="JD" /><CheckBox label="เอกสาร Support อื่นๆ" />
                    </div>
                </div>

                <div className="text-center font-bold text-[14px] my-2">ประวัติส่วนตัว</div>

                {/* --- Main Info Box --- */}
                <div className="border-[0.5px] border-slate-400 rounded-sm">
                    {/* Position Row */}
                    <div className="p-3 border-b-[0.5px] border-slate-400 bg-slate-50/50">
                        <div className="flex gap-4 items-end text-[12px] leading-tight">
                            <div className="font-bold whitespace-nowrap pb-1">สมัครงานในตำแหน่ง 1</div>
                            <div className="border-b-[1.5px] border-dotted border-slate-400 flex-1 px-2 pb-1 text-center font-medium truncate">{p.position_1}</div>
                            <div className="font-bold whitespace-nowrap pb-1">2</div>
                            <div className="border-b-[1.5px] border-dotted border-slate-400 flex-1 px-2 pb-1 text-center font-medium truncate">{p.position_2}</div>
                            <div className="font-bold whitespace-nowrap pb-1">อัตราเงินเดือนที่ต้องการ</div>
                            <div className="border-b-[1.5px] border-dotted border-slate-400 w-32 px-2 pb-1 text-center font-medium truncate">{p.expected_salary}</div>
                        </div>
                    </div>

                    {/* Personal Data & Photo */}
                    <div className="p-3 grid grid-cols-12 gap-2">
                        <div className="col-span-10 space-y-3">
                            <div className="flex gap-2">
                                 <Field label="ชื่อ-สกุล (ภาษาไทย)" value={`${p.prefix || ''} ${p.first_name || ''} ${p.last_name || ''}`} className="flex-[3]" />
                                 <Field label="ชื่อเล่น" value={p.thai_nickname} className="flex-[2]" />
                            </div>
                            <div className="flex gap-2">
                                 <Field label="Name in English" value={p.english_name} className="flex-[3]" />
                                 <Field label="เบอร์โทรศัพท์" value={p.mobile_phone} className="flex-[2]" />
                            </div>
                            <div className="flex gap-2">
                                <Field label="วันเดือนปีเกิด" value={p.dob} className="flex-[2]" />
                                <Field label="อายุ" value={p.age} className="flex-1" />
                                <Field label="ส่วนสูง" value={p.height} className="flex-1" />
                                <Field label="น้ำหนัก" value={p.weight} className="flex-1" />
                                <Field label="สัญชาติ" value={p.nationality} className="flex-[1.5]" />
                            </div>
                            <div className="flex gap-2">
                                <Field label="ศาสนา" value={p.religion} className="flex-[1.5]" />
                                <Field label="(Email) อีเมล์ที่ติดต่อได้" value={p.email} className="flex-[3]" />
                            </div>
                        </div>
                        <div className="col-span-2 flex justify-end">
                            <div className="w-[100px] h-[130px] flex items-center justify-center bg-slate-50 relative">
                                 {applicant.photo_url ? (
                                    <img src={applicant.photo_url} alt="Photo" className="w-full h-full object-cover absolute inset-0" />
                                ) : (
                                    <span className="text-slate-300 text-[10px]">รูปภาพ</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="border-t-[0.5px] border-slate-400 p-3 space-y-3">
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

                         <div className="flex flex-wrap gap-x-2 gap-y-1 items-end pt-2">
                            <span className="font-bold whitespace-nowrap">ที่อยู่ปัจจุบัน เป็น</span>
                            <div className="flex items-center gap-4 px-2">
                                <div className="relative pl-5 h-4 flex items-center w-[80px]">
                                    <div className={`absolute left-0 top-2 w-3 h-3 border border-slate-600 flex items-center justify-center rounded-[1px] ${p.current_address_type === 'own' ? 'bg-slate-200' : 'bg-white'}`}>
                                        {p.current_address_type === 'own' && <div className="w-1.5 h-1.5 bg-slate-800 rounded-[0.5px]" />}
                                    </div>
                                    <span className="text-[11px] text-slate-900">บ้านตนเอง</span>
                                </div>
                                <div className="relative pl-5 h-4 flex items-center w-[150px]">
                                    <div className={`absolute left-0 top-2 w-3 h-3 border border-slate-600 flex items-center justify-center rounded-[1px] ${p.current_address_type === 'rent' ? 'bg-slate-200' : 'bg-white'}`}>
                                        {p.current_address_type === 'rent' && <div className="w-1.5 h-1.5 bg-slate-800 rounded-[0.5px]" />}
                                    </div>
                                    <span className="text-[11px] text-slate-900">บ้านเช่า / หอพัก</span>
                                </div>
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
                    <div className="border-t-[0.5px] border-slate-400 p-3">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                 <div className="font-bold underline mb-2">สถานภาพ (ชาย)</div>
                                 <div className="space-y-1.5 pl-1">
                                     <div className="flex gap-4">
                                         <div className="relative pl-5 h-4 flex items-center mr-4">
                                            <div className={`absolute left-0 top-2 w-3 h-3 border border-slate-600 flex items-center justify-center rounded-[1px] ${p.military_status === 'exempted' ? 'bg-slate-200' : 'bg-white'}`}>
                                                {p.military_status === 'exempted' && <div className="w-1.5 h-1.5 bg-slate-800 rounded-[0.5px]" />}
                                            </div>
                                            <span className="text-[11px] text-slate-900">ได้รับการยกเว้นทางทหาร</span>
                                         </div>
                                         <div className="relative pl-5 h-4 flex items-center">
                                            <div className={`absolute left-0 top-2 w-3 h-3 border border-slate-600 flex items-center justify-center rounded-[1px] ${p.military_status === 'served' ? 'bg-slate-200' : 'bg-white'}`}>
                                                {p.military_status === 'served' && <div className="w-1.5 h-1.5 bg-slate-800 rounded-[0.5px]" />}
                                            </div>
                                            <span className="text-[11px] text-slate-900">เกณฑ์ทหารแล้ว</span>
                                         </div>
                                     </div>
                                     <div className="relative pl-5 h-4 flex items-center">
                                        <div className={`absolute left-0 top-2 w-3 h-3 border border-slate-600 flex items-center justify-center rounded-[1px] ${p.military_status === 'not_served' ? 'bg-slate-200' : 'bg-white'}`}>
                                            {p.military_status === 'not_served' && <div className="w-1.5 h-1.5 bg-slate-800 rounded-[0.5px]" />}
                                        </div>
                                        <span className="text-[11px] text-slate-900">ยังไม่ได้รับการเกณฑ์</span>
                                     </div>
                                     <div className="flex gap-4">
                                         <div className="relative pl-5 h-4 flex items-center mr-4">
                                            <div className={`absolute left-0 top-2 w-3 h-3 border border-slate-600 flex items-center justify-center rounded-[1px] ${f.marital_status === 'single' ? 'bg-slate-200' : 'bg-white'}`}>
                                                {f.marital_status === 'single' && <div className="w-1.5 h-1.5 bg-slate-800 rounded-[0.5px]" />}
                                            </div>
                                            <span className="text-[11px] text-slate-900">ยังไม่สมรส</span>
                                         </div>
                                         <div className="relative pl-5 h-4 flex items-center">
                                            <div className={`absolute left-0 top-2 w-3 h-3 border border-slate-600 flex items-center justify-center rounded-[1px] ${f.marital_status === 'married' ? 'bg-slate-200' : 'bg-white'}`}>
                                                {f.marital_status === 'married' && <div className="w-1.5 h-1.5 bg-slate-800 rounded-[0.5px]" />}
                                            </div>
                                            <span className="text-[11px] text-slate-900">สมรสแล้ว</span>
                                         </div>
                                     </div>
                                 </div>
                            </div>
                            <div>
                                 <div className="font-bold underline mb-2">สถานภาพ (หญิง)</div>
                                 <div className="space-y-1.5 pl-1">
                                     <div className="flex gap-4">
                                         <div className="relative pl-5 h-4 flex items-center w-[250px]">
                                            <div className={`absolute left-0 top-2 w-3 h-3 border border-slate-600 flex items-center justify-center rounded-[1px] bg-white`}>
                                            </div>
                                            <span className="text-[11px] text-slate-900">ไม่อยู่ระหว่างการตั้งครรภ์</span>
                                         </div>
                                     </div>
                                     <div className="flex gap-4">
                                         <div className="relative pl-5 h-4 flex items-center mr-4">
                                            <div className={`absolute left-0 top-2 w-3 h-3 border border-slate-600 flex items-center justify-center rounded-[1px] ${f.has_children === 'yes' ? 'bg-slate-200' : 'bg-white'}`}>
                                                {f.has_children === 'yes' && <div className="w-1.5 h-1.5 bg-slate-800 rounded-[0.5px]" />}
                                            </div>
                                            <span className="text-[11px] text-slate-900">มีบุตรแล้ว</span>
                                         </div>
                                         <div className="relative pl-5 h-4 flex items-center">
                                            <div className={`absolute left-0 top-2 w-3 h-3 border border-slate-600 flex items-center justify-center rounded-[1px] ${f.has_children === 'no' ? 'bg-slate-200' : 'bg-white'}`}>
                                                {f.has_children === 'no' && <div className="w-1.5 h-1.5 bg-slate-800 rounded-[0.5px]" />}
                                            </div>
                                            <span className="text-[11px] text-slate-900">ยังไม่มีบุตร</span>
                                         </div>
                                     </div>
                                     <div className="relative pl-5 h-4 flex items-center">
                                        <div className={`absolute left-0 top-2 w-3 h-3 border border-slate-600 flex items-center justify-center rounded-[1px] bg-white`}>
                                        </div>
                                        <span className="text-[11px] text-slate-900">อยู่ระหว่างการตั้งครรภ์ ระบุ สัปดาห์ที่ตั้งครรภ์</span>
                                     </div>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageContainer>

            {/* ================= PAGE 2 ================= */}
            <PageContainer pageNum={2} totalPages={4}>
                <LogoHeader />
                <div className="mt-[20mm] space-y-4">
                    
                    {/* --- Family Status --- */}
                    <div className="border-[0.5px] border-slate-400 p-3 rounded-sm">
                        <div className="flex items-center gap-2 mb-2">
                             <span className="font-bold underline">สถานะทางครอบครัว</span>
                             <div className="flex gap-4 ml-4 items-end">
                                <div className="relative pl-5 h-4 flex items-center w-[60px]">
                                    <div className={`absolute left-0 top-2 w-3 h-3 border-[0.5px] border-slate-400 flex items-center justify-center rounded-[1px] ${f.marital_status === 'single' ? 'bg-slate-200' : 'bg-white'}`}>
                                        {f.marital_status === 'single' && <div className="w-1.5 h-1.5 bg-slate-800 rounded-[0.5px]" />}
                                    </div>
                                    <span className="text-[11px] text-slate-900 pt-1">โสด</span>
                                </div>
                                <div className="relative pl-5 h-4 flex items-center w-[100px]">
                                    <div className={`absolute left-0 top-2 w-3 h-3 border-[0.5px] border-slate-400 flex items-center justify-center rounded-[1px] ${f.marital_status === 'married' ? 'bg-slate-200' : 'bg-white'}`}>
                                        {f.marital_status === 'married' && <div className="w-1.5 h-1.5 bg-slate-800 rounded-[0.5px]" />}
                                    </div>
                                    <span className="text-[11px] text-slate-900 pt-1">แต่งงานแล้ว</span>
                                </div>
                             </div>
                        </div>
                        <div className="flex gap-2 mb-1">
                            <span className="font-bold whitespace-nowrap underline">กรุณาระบุ</span>
                            <Field label="ชื่อ-สกุล สามี/ภรรยา/แฟน (ถ้ามี)" value={f.spouse_name} className="flex-1" />
                            <Field label="อาชีพ" value={f.spouse_occupation} className="w-[150px]" />
                        </div>
                        <div className="flex gap-2 mb-1">
                            <Field label="สถานที่ทำงาน" value={f.spouse_workplace} className="flex-1" />
                            <Field label="เบอร์โทรศัพท์ที่สามารถติดต่อได้สะดวก" value={f.spouse_phone} className="w-[250px]" />
                        </div>
                         <div className="flex gap-2">
                            <span className="font-bold whitespace-nowrap">กรณีมีบุตรแล้ว</span>
                            <Field label="จำนวนบุตร" value={f.children_count} className="w-[80px]" labelWidth="auto" />
                            <span className="text-[12px] pt-1">คน</span>
                            <Field label="ปัจจุบันบุตรอยู่ในความดูแลของบุคคลใด เช่น คุณยาย / คุณย่า หรือตนเอง" value={f.children_caretaker} className="flex-1" />
                        </div>
                    </div>

                    {/* --- Education History --- */}
                    <div>
                        <div className="text-center font-bold text-[14px] mb-1">ประวัติการศึกษา</div>
                        <table className="w-full border-collapse text-[11px]">
                            <thead>
                                <tr className="bg-slate-50 text-center">
                                    <th className="border-[0.5px] border-slate-400 p-1 w-[15%]">ระดับ</th>
                                    <th className="border-[0.5px] border-slate-400 p-1 w-[30%]">ชื่อสถานศึกษา</th>
                                    <th className="border-[0.5px] border-slate-400 p-1 w-[25%]">สาขาวิชา</th>
                                    <th className="border-[0.5px] border-slate-400 p-1 w-[10%]">เริ่มปีพ.ศ.</th>
                                    <th className="border-[0.5px] border-slate-400 p-1 w-[10%]">สำเร็จปีพ.ศ.</th>
                                    <th className="border-[0.5px] border-slate-400 p-1 w-[10%]">เกรด<br/>เฉลี่ย</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { k: 'primary', label: 'ประถมศึกษา' },
                                    { k: 'secondary', label: 'มัธยมศึกษา' },
                                    { k: 'vocational', label: 'ปวช.' },
                                    { k: 'diploma', label: 'ปวส.' },
                                    { k: 'bachelor', label: 'ปริญญาตรี' },
                                    { k: 'master', label: 'ปริญญาโท' },
                                    { k: 'current', label: 'กำลังศึกษา' }
                                ].map((row) => {
                                    const ed = e.history?.[row.k] || {};
                                    return (
                                        <tr key={row.k}>
                                            <td className="border-[0.5px] border-slate-400 p-1 bg-slate-50">{row.label}</td>
                                            <td className="border-[0.5px] border-slate-400 p-1"><DottedLine value={ed.institute} className="border-0 border-b border-dotted" /></td>
                                            <td className="border-[0.5px] border-slate-400 p-1"><DottedLine value={ed.major} className="border-0 border-b border-dotted" /></td>
                                            <td className="border-[0.5px] border-slate-400 p-1 text-center"><DottedLine value={ed.start_year} className="border-0 border-b border-dotted text-center" /></td>
                                            <td className="border-[0.5px] border-slate-400 p-1 text-center"><DottedLine value={ed.end_year} className="border-0 border-b border-dotted text-center" /></td>
                                            <td className="border-[0.5px] border-slate-400 p-1 text-center"><DottedLine value={ed.gpa} className="border-0 border-b border-dotted text-center" /></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* --- General Skills --- */}
                    <div>
                         <div className="text-center font-bold text-[14px] mb-1">ความสามารถทั่วไป</div>
                         <div className="border-[0.5px] border-slate-400 rounded-sm">
                             <div className="grid grid-cols-12 border-b-[0.5px] border-slate-400">
                                 {/* Language */}
                                 <div className="col-span-4 border-r-[0.5px] border-slate-400 p-1 text-center font-bold">ความรู้ในการใช้ภาษา</div>
                                 {/* Office */}
                                 <div className="col-span-4 border-r-[0.5px] border-slate-400 p-1 text-center font-bold">เครื่องใช้สำนักงาน (เลือก <Check className="inline w-3 h-3"/> )</div>
                                 {/* Special */}
                                 <div className="col-span-4 p-1 text-center font-bold">ความสามารถพิเศษอื่นๆ (เลือก <Check className="inline w-3 h-3"/> )</div>
                             </div>
                             
                             <div className="grid grid-cols-12 min-h-[160px]">
                                 {/* Language Table */}
                                 <div className="col-span-4 border-r-[0.5px] border-slate-400 text-[10px]">
                                     <div className="grid grid-cols-4 border-b-[0.5px] border-slate-400 text-center bg-slate-50">
                                         <div className="p-1 border-r-[0.5px] border-slate-400 font-bold">ภาษา</div>
                                         <div className="col-span-3 p-1">ระบุว่า (<u>ดี</u> <u>พอใช้</u> <u>น้อย</u>)<br/>
                                             <div className="grid grid-cols-3 mt-1">
                                                 <span className="border-r border-slate-300">พูด</span>
                                                 <span className="border-r border-slate-300">เขียน</span>
                                                 <span>อ่าน</span>
                                             </div>
                                         </div>
                                     </div>
                                     {['ไทย', 'อังกฤษ', 'จีน', 'อื่นๆ......'].map((lang, idx) => (
                                         <div key={idx} className="grid grid-cols-4 border-b-[0.5px] border-slate-400 last:border-b-0 h-[28px] items-center">
                                             <div className="pl-1 border-r-[0.5px] border-slate-400 font-medium truncate">{lang}</div>
                                             <div className="border-r-[0.5px] border-slate-400 h-full"></div>
                                             <div className="border-r-[0.5px] border-slate-400 h-full"></div>
                                             <div className="h-full"></div>
                                         </div>
                                     ))}
                                 </div>

                                 {/* Office Equipment */}
                                 <div className="col-span-4 border-r-[0.5px] border-slate-400 text-[11px]">
                                     <div className="grid grid-cols-5 border-b-[0.5px] border-slate-400 font-bold text-center bg-slate-50">
                                         <div className="col-span-3 p-1 border-r-[0.5px] border-slate-400">ประเภท</div>
                                         <div className="p-1 border-r-[0.5px] border-slate-400">ได้</div>
                                         <div className="p-1">ไม่ได้</div>
                                     </div>
                                     {[
                                         {l: 'พิมพ์ดีดไทย/อังกฤษ', k: 'typewriter'},
                                         {l: 'เครื่องคิดเลข', k: 'calculator'},
                                         {l: 'เครื่องแฟกซ์/ถ่ายเอกสาร', k: 'fax_copier'},
                                         {l: 'เครื่องคอมพิวเตอร์', k: 'computer'}
                                     ].map((item, idx) => (
                                         <div key={idx} className="grid grid-cols-5 border-b-[0.5px] border-slate-400 last:border-b-0 h-[28px] items-center">
                                             <div className="col-span-3 pl-1 border-r-[0.5px] border-slate-400 truncate">{item.l}</div>
                                             <div className="border-r-[0.5px] border-slate-400 h-full flex justify-center items-center">{s.office?.[item.k] ? <Check className="w-3 h-3"/> : ''}</div>
                                             <div className="h-full"></div>
                                         </div>
                                     ))}
                                 </div>

                                 {/* Special Skills */}
                                 <div className="col-span-4 text-[11px]">
                                     <div className="grid grid-cols-5 border-b-[0.5px] border-slate-400 font-bold text-center bg-slate-50">
                                         <div className="col-span-3 p-1 border-r-[0.5px] border-slate-400">ประเภท</div>
                                         <div className="p-1 border-r-[0.5px] border-slate-400">ได้</div>
                                         <div className="p-1">ไม่ได้</div>
                                     </div>
                                     {[
                                         {l: 'ขับจักรยานยนต์', k: 'motorcycle'},
                                         {l: 'ขับรถยนต์', k: 'car'},
                                         {l: 'ขับรถบรรทุก', k: 'truck'},
                                         {l: 'อื่นๆ.............', k: 'other'}
                                     ].map((item, idx) => (
                                         <div key={idx} className="grid grid-cols-5 border-b-[0.5px] border-slate-400 last:border-b-0 h-[28px] items-center">
                                             <div className="col-span-3 pl-1 border-r-[0.5px] border-slate-400 truncate">{item.l}</div>
                                             <div className="border-r-[0.5px] border-slate-400 h-full flex justify-center items-center">{s.driving?.[item.k] ? <Check className="w-3 h-3"/> : ''}</div>
                                             <div className="h-full"></div>
                                         </div>
                                     ))}
                                 </div>
                             </div>
                             
                             <div className="p-2 border-t-[0.5px] border-slate-400 bg-slate-50/30">
                                 <div className="font-bold mb-1">ความรู้ความสามารถทางด้านภาษา/โปรแกรมคอมพิวเตอร์:</div>
                                 <DottedLine value={s.computer_capability} className="mb-2" />
                                 <DottedLine value="" />
                             </div>
                         </div>
                    </div>

                    {/* --- Training History --- */}
                    <div>
                        <div className="text-center font-bold text-[14px] mb-1">ประวัติการฝึกอบรม</div>
                        <table className="w-full border-collapse text-[11px]">
                            <thead>
                                <tr className="bg-slate-50 text-center">
                                    <th className="border-[0.5px] border-slate-400 p-1 w-[10%]">ลำดับ</th>
                                    <th className="border-[0.5px] border-slate-400 p-1 w-[35%]">หลักสูตร</th>
                                    <th className="border-[0.5px] border-slate-400 p-1 w-[35%]">สถาบัน</th>
                                    <th className="border-[0.5px] border-slate-400 p-1 w-[20%]">ระยะเวลา</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[0, 1, 2, 3].map((i) => {
                                    const tr = t.history?.[i] || {};
                                    return (
                                        <tr key={i} className="h-[28px]">
                                            <td className="border-[0.5px] border-slate-400 p-1 text-center">{i + 1}.</td>
                                            <td className="border-[0.5px] border-slate-400 p-1"><DottedLine value={tr.course} className="border-0 border-b border-dotted" /></td>
                                            <td className="border-[0.5px] border-slate-400 p-1"><DottedLine value={tr.institute} className="border-0 border-b border-dotted" /></td>
                                            <td className="border-[0.5px] border-slate-400 p-1 text-center"><DottedLine value={tr.duration} className="border-0 border-b border-dotted text-center" /></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </PageContainer>

        </div>
    );
}