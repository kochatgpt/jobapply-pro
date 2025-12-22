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
    const exp = applicant.experience_data || { history: [], contact_previous_employer: {} };
    const st = applicant.statement_data || {};
    const ref = applicant.referral_data || {};
    const par = applicant.parents_data || { father: {}, mother: {} };

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
            <div className={`absolute left-0 top-2.5 w-3 h-3 border-[0.5px] border-slate-400 flex items-center justify-center rounded-[1px] ${checked ? 'bg-slate-200' : 'bg-white'}`}>
                {checked && <div className="w-1.5 h-1.5 bg-slate-800 rounded-[0.5px]" />}
            </div>
            <span className={`${textSize} text-slate-900 pt-1`}>{label}</span>
        </div>
    );

    const PageContainer = ({ children, pageNum, totalPages = 4 }) => {
        const footerBottom = pageNum === 2 ? 'bottom-[20mm]' : 'bottom-[10mm]';
        return (
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
                <div className={`absolute ${footerBottom} left-[10mm] flex gap-2`}>
                     <div className="h-8 w-8 rounded-full border border-slate-300"></div>
                     <div className="h-8 w-8 rounded-full border border-slate-300"></div>
                </div>
                <div className={`absolute ${footerBottom} right-[10mm] text-[10px] text-slate-500`}>
                    {pageNum} | {totalPages}
                </div>
                <div className={`absolute ${footerBottom} left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center`}>
                     FM-HRD-10 Rev.03 10/10/66 <br/>
                     www.ko.in.th Strategy . AI . DX . Sustainability
                </div>
            </div>
        );
    };

    const LogoHeader = ({ topOffset = "top-[-2mm]", height = "h-[60px]", zIndex = "" }) => (
         <div className={`absolute ${topOffset} right-[10mm] w-[40mm] flex justify-end ${zIndex}`}>
             {appLogo ? (
                <img src={appLogo} alt="Logo" crossOrigin="anonymous" className={`${height} w-auto object-contain`} />
            ) : (
                <div className={`${height} w-[80px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400`}>LOGO</div>
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
                    ใบสมัครงานเป็นส่วนหนึ่งในการพิจารณา โปรดกรอกข้อความตามจริงด้วยตัวเองให้ครบถ้วน อนึ่งในกรณีที่ท่าน ไม่ผ่านการพิจารณา รับเข้าทำงาน ข้อมูลในใบสมัครจะถูกเก็บรักษาไว้เป็นระยะเวลา 1 เดือน หากมีการพิจารณาตำแหน่งอื่นๆ อีกครั้งตามความเหมาะสม อนึ่งในกรณีที่ท่านผ่าน การพิจารณารับเข้าทำงาน ข้อมูลในใบสมัครจะถูกเก็บรักษาไว้ตลอดระยะเวลาการเป็นพนักงาน/ลูกจ้างของ บริษัทฯและหากท่านพ้นสภาพจากการเป็นพนักงาน/ลูกจ้างแล้วนั้น บริษัทฯจะเก็บรักษาไว้ต่อเนื่องอีกเป็นระยะเวลา 2 ปี หากมีกรณี ต้องใช้เป็นหลักฐานประกอบการพิจารณาตามกฎหมาย พนักงานหรือผู้มาติดต่อสมัครงาน ยินยอมให้เก็บรวบรวมข้อมูลส่วนบุคคลใน นามของบริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด เป็นผู้ควบคุมข้อมูลส่วนบุคคล ประมวลผลเก็บรวบรวมหรือเปิดเผยข้อมูล ส่วนบุคคล (PDPA) รวมถึงข้อมูลอื่นใดตามที่ได้ระบุไว้ใน พรบ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 "กฎหมายคุ้มครองข้อมูลส่วน บุคคล" และ "ข้อมูลส่วนบุคคลที่มีความอ่อนไหวเป็นพิเศษ"เพื่อเป็นส่วนหนึ่งของการพิจารณาบุคลากรตามเงื่อนไขบริษัทฯ
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
                <div className="mt-[5mm] space-y-1">


                    {/* --- Family Status --- */}
                    <div className="border-[0.5px] border-slate-400 p-2 rounded-sm text-[11px]">
                        <div className="flex items-center gap-2 mb-1">
                             <span className="font-bold underline">สถานะทางครอบครัว</span>
                             <div className="flex gap-4 ml-4 items-end">
                                <div className="relative pl-5 h-4 flex items-center w-[60px]">
                                    <div className={`absolute left-0 top-2.5 w-3 h-3 border-[0.5px] border-slate-400 flex items-center justify-center rounded-[1px] ${f.marital_status === 'single' ? 'bg-slate-200' : 'bg-white'}`}>
                                        {f.marital_status === 'single' && <div className="w-1.5 h-1.5 bg-slate-800 rounded-[0.5px]" />}
                                    </div>
                                    <span className="text-[11px] text-slate-900 pt-1">โสด</span>
                                </div>
                                <div className="relative pl-5 h-4 flex items-center w-[100px]">
                                    <div className={`absolute left-0 top-2.5 w-3 h-3 border-[0.5px] border-slate-400 flex items-center justify-center rounded-[1px] ${f.marital_status === 'married' ? 'bg-slate-200' : 'bg-white'}`}>
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
                        <div className="text-center font-bold text-[14px] mb-0.5 pb-[1px]">ประวัติการศึกษา</div>
                        <table className="w-full border-collapse text-[11px]">
                            <thead>
                                <tr className="bg-slate-50 text-center">
                                    <th className="border-l-[0.5px] border-b-[0.5px] border-t-[0.5px] border-slate-400 p-1 w-[15%]">ระดับ</th>
                                    <th className="border-l-[0.5px] border-b-[0.5px] border-t-[0.5px] border-slate-400 p-1 w-[30%]">ชื่อสถานศึกษา</th>
                                    <th className="border-l-[0.5px] border-b-[0.5px] border-t-[0.5px] border-slate-400 p-1 w-[25%]">สาขาวิชา</th>
                                    <th className="border-l-[0.5px] border-b-[0.5px] border-t-[0.5px] border-slate-400 p-1 w-[10%]">เริ่มปีพ.ศ.</th>
                                    <th className="border-l-[0.5px] border-b-[0.5px] border-t-[0.5px] border-slate-400 p-1 w-[10%]">สำเร็จปีพ.ศ.</th>
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
                                            <td className="border-l-[0.5px] border-b-[0.5px] border-slate-400 p-1 pb-2 bg-slate-50">{row.label}</td>
                                            <td className="border-l-[0.5px] border-b-[0.5px] border-slate-400 p-1 pb-2">{ed.institute || ""}</td>
                                            <td className="border-l-[0.5px] border-b-[0.5px] border-slate-400 p-1 pb-2">{ed.major || ""}</td>
                                            <td className="border-l-[0.5px] border-b-[0.5px] border-slate-400 p-1 pb-2 text-center">{ed.start_year || ""}</td>
                                            <td className="border-l-[0.5px] border-b-[0.5px] border-slate-400 p-1 pb-2 text-center">{ed.end_year || ""}</td>
                                            <td className="border-l-[0.5px] border-b-[0.5px] border-r-[0.5px] border-slate-400 p-1 pb-2 text-center">{ed.gpa || ""}</td>
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
                                 <div className="col-span-4 border-r-[0.5px] border-slate-400 p-1 text-center font-bold">เครื่องใช้สำนักงาน (เลือก <Check className="inline w-3 h-3 absolute top-3"/> )</div>
                                 {/* Special */}
                                 <div className="col-span-4 p-1 text-center font-bold">ความสามารถพิเศษอื่นๆ (เลือก <Check className="inline w-3 h-3"/> )</div>
                             </div>
                             
                             <div className="grid grid-cols-12">
                                 {/* Language Table */}
                                 <div className="col-span-4 border-r-[0.5px] border-slate-400 text-[10px]">
                                     <div className="grid grid-cols-5 border-b-[0.5px] border-slate-400 text-center bg-slate-50 h-[40px]">
                                         <div className="col-span-2 p-1 border-r-[0.5px] border-slate-400 font-bold flex items-center justify-center">ภาษา</div>
                                         <div className="col-span-3 p-1 flex items-center justify-center font-bold">
                                             ระดับความสามารถ
                                         </div>
                                     </div>
                                     {[
                                         { l: 'ไทย', k: 'thai' },
                                         { l: 'อังกฤษ', k: 'english' },
                                         { l: 'จีน', k: 'chinese' },
                                         { l: <span key="other">อื่นๆ<span className="invisible">......</span></span>, k: 'other_level', n: 'other_name' }
                                     ].map((item, idx) => (
                                         <div key={idx} className="grid grid-cols-5 border-b-[0.5px] border-slate-400 last:border-b-0 h-[28px]">
                                             <div className="col-span-2 pl-1 border-r-[0.5px] border-slate-400 font-medium flex items-center h-full truncate">
                                                 {item.l}
                                                 {item.n && s.languages?.[item.n] && <span className="ml-1 text-[9px] text-slate-600">({s.languages[item.n]})</span>}
                                             </div>
                                             <div className="col-span-3 h-full flex items-center justify-center px-2">
                                                 {s.languages?.[item.k] || ''}
                                             </div>
                                         </div>
                                     ))}
                                 </div>

                                 {/* Office Equipment */}
                                 <div className="col-span-4 border-r-[0.5px] border-slate-400 text-[11px]">
                                     <div className="grid grid-cols-5 border-b-[0.5px] border-slate-400 font-bold text-center bg-slate-50 h-[40px]">
                                         <div className="col-span-3 p-1 border-r-[0.5px] border-slate-400 flex items-center justify-center">ประเภท</div>
                                         <div className="p-1 border-r-[0.5px] border-slate-400 flex items-center justify-center">ได้</div>
                                         <div className="p-1 flex items-center justify-center">ไม่ได้</div>
                                     </div>
                                     {[
                                         {l: 'พิมพ์ดีดไทย/อังกฤษ', k: 'typewriter'},
                                         {l: 'เครื่องคิดเลข', k: 'calculator'},
                                         {l: 'เครื่องแฟกซ์/ถ่ายเอกสาร', k: 'fax_copier'},
                                         {l: 'เครื่องคอมพิวเตอร์', k: 'computer'}
                                     ].map((item, idx) => (
                                         <div key={idx} className="grid grid-cols-5 border-b-[0.5px] border-slate-400 last:border-b-0 h-[28px]">
                                             <div className="col-span-3 pl-1 border-r-[0.5px] border-slate-400 flex items-center h-full truncate">{item.l}</div>
                                             <div className="border-r-[0.5px] border-slate-400 h-full flex justify-center items-center">{s.office?.[item.k] ? <Check className="w-3 h-3"/> : ''}</div>
                                             <div className="h-full"></div>
                                         </div>
                                     ))}
                                 </div>

                                 {/* Special Skills */}
                                 <div className="col-span-4 text-[11px]">
                                     <div className="grid grid-cols-5 border-b-[0.5px] border-slate-400 font-bold text-center bg-slate-50 h-[40px]">
                                         <div className="col-span-3 p-1 border-r-[0.5px] border-slate-400 flex items-center justify-center">ประเภท</div>
                                         <div className="p-1 border-r-[0.5px] border-slate-400 flex items-center justify-center">ได้</div>
                                         <div className="p-1 flex items-center justify-center">ไม่ได้</div>
                                     </div>
                                     {[
                                         {l: 'ขับจักรยานยนต์', k: 'motorcycle'},
                                         {l: 'ขับรถยนต์', k: 'car'},
                                         {l: 'ขับรถบรรทุก', k: 'truck'},
                                         {l: <span key="other">อื่นๆ<span className="invisible">.............</span></span>, k: 'other'}
                                     ].map((item, idx) => (
                                         <div key={idx} className="grid grid-cols-5 border-b-[0.5px] border-slate-400 last:border-b-0 h-[28px]">
                                             <div className="col-span-3 pl-1 border-r-[0.5px] border-slate-400 flex items-center h-full truncate">{item.l}</div>
                                             <div className="border-r-[0.5px] border-slate-400 h-full flex justify-center items-center">{s.driving?.[item.k] ? <Check className="w-3 h-3"/> : ''}</div>
                                             <div className="h-full"></div>
                                         </div>
                                     ))}
                                 </div>
                                 </div>

                                 <div className="p-2 pb-8 border-t-[0.5px] border-slate-400 bg-slate-50/30">
                                     <div className="font-bold mb-1">ความรู้ความสามารถทางด้านภาษา/โปรแกรมคอมพิวเตอร์:</div>
                                     <DottedLine value={s.computer_capability} className="mb-2 w-full" />
                                     <DottedLine value="" className="w-full" />
                                 </div>
                         </div>
                    </div>

                    {/* --- Training History --- */}
                    <div>
                        <div className="text-center font-bold text-[14px] mb-1">ประวัติการฝึกอบรม</div>
                        <table className="w-full border-collapse text-[11px]">
                            <thead>
                                <tr className="bg-slate-50 text-center">
                                    <th className="border-l-[0.5px] border-b-[0.5px] border-t-[0.5px] border-slate-400 p-1 w-[10%]">ลำดับ</th>
                                    <th className="border-l-[0.5px] border-b-[0.5px] border-t-[0.5px] border-slate-400 p-1 w-[35%]">หลักสูตร</th>
                                    <th className="border-l-[0.5px] border-b-[0.5px] border-t-[0.5px] border-slate-400 p-1 w-[35%]">สถาบัน</th>
                                    <th className="border-[0.5px] border-slate-400 p-1 w-[20%]">ระยะเวลา</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[0, 1, 2, 3].map((i) => {
                                    const tr = t.history?.[i] || {};
                                    return (
                                        <tr key={i} className="h-[28px]">
                                            <td className="border-l-[0.5px] border-b-[0.5px] border-slate-400 p-1 text-center">{i + 1}.</td>
                                            <td className="border-l-[0.5px] border-b-[0.5px] border-slate-400 p-1">{tr.course || ""}</td>
                                            <td className="border-l-[0.5px] border-b-[0.5px] border-slate-400 p-1">{tr.institute || ""}</td>
                                            <td className="border-l-[0.5px] border-b-[0.5px] border-r-[0.5px] border-slate-400 p-1 text-center">{tr.duration || ""}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </PageContainer>

            {/* ================= PAGE 3 ================= */}
            <PageContainer pageNum={3} totalPages={4}>
                <LogoHeader />
                <div className="mt-[5mm] space-y-1">

                     {/* --- Work History --- */}
                     <div>
                        <table className="w-full border-collapse border-[0.5px] border-slate-400 text-[10px]">
                            <thead>
                                <tr>
                                    <th colSpan={5} className="border-r-[0.5px] border-b-[0.5px] border-slate-400 p-2 align-top">
                                        <div className="text-center font-bold text-[12px] underline mb-1">ประวัติการทำงาน</div>
                                        <div className="flex justify-center gap-6 font-normal">
                                            <div className="relative pl-5 h-4 flex items-center">
                                                <div className={`absolute left-0 top-2.5 w-3 h-3 border-[0.5px] border-slate-400 flex items-center justify-center rounded-[1px] ${exp.has_experience === 'no' ? 'bg-slate-200' : 'bg-white'}`}>
                                                    {exp.has_experience === 'no' && <div className="w-1.5 h-1.5 bg-slate-800 rounded-[0.5px]" />}
                                                </div>
                                                <span className="text-[11px] text-slate-900 pt-1">ไม่มีประสบการณ์ทำงาน</span>
                                            </div>
                                            <div className="relative pl-5 h-4 flex items-center">
                                                <div className={`absolute left-0 top-2.5 w-3 h-3 border-[0.5px] border-slate-400 flex items-center justify-center rounded-[1px] ${exp.has_experience === 'yes' ? 'bg-slate-200' : 'bg-white'}`}>
                                                    {exp.has_experience === 'yes' && <div className="w-1.5 h-1.5 bg-slate-800 rounded-[0.5px]" />}
                                                </div>
                                                <span className="text-[11px] text-slate-900 pt-1">มีประสบการณ์ทำงานระบุ (เรียงลำดับจากล่าสุด)</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th colSpan={2} className="border-b-[0.5px] border-slate-400 p-2 align-middle text-center font-bold text-[11px]">
                                        เงินเดือน/บาท
                                    </th>
                                </tr>
                                <tr className="text-center bg-slate-50">
                                    <th className="border-r-[0.5px] border-b-[0.5px] border-slate-400 p-1 w-[12%]">วัน/เดือน/ปี<br/>เริ่มงาน - ออก</th>
                                    <th className="border-r-[0.5px] border-b-[0.5px] border-slate-400 p-1 w-[18%]">ชื่อสถานที่ทำงาน</th>
                                    <th className="border-r-[0.5px] border-b-[0.5px] border-slate-400 p-1 w-[18%]">ชื่อ - เบอร์โทร<br/>(นายจ้าง)</th>
                                    <th className="border-r-[0.5px] border-b-[0.5px] border-slate-400 p-1 w-[15%]">ตำแหน่งสุดท้าย</th>
                                    <th className="border-r-[0.5px] border-b-[0.5px] border-slate-400 p-1 w-[15%]">สาเหตุที่ลาออก</th>
                                    <th className="border-r-[0.5px] border-b-[0.5px] border-slate-400 p-1 w-[11%]">เข้า/บาท</th>
                                    <th className="border-b-[0.5px] border-slate-400 p-1 w-[11%]">ออก/บาท</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[0, 1, 2, 3].map((i) => {
                                    const job = exp.history?.[i] || {};
                                    return (
                                        <tr key={i} className="h-[24px]">
                                            <td className="border-r-[0.5px] border-b-[0.5px] border-slate-400 p-1 text-center">{job.period || ""}</td>
                                            <td className="border-r-[0.5px] border-b-[0.5px] border-slate-400 p-1">{job.workplace || ""}</td>
                                            <td className="border-r-[0.5px] border-b-[0.5px] border-slate-400 p-1">{job.employer || ""}</td>
                                            <td className="border-r-[0.5px] border-b-[0.5px] border-slate-400 p-1 text-center">{job.position || ""}</td>
                                            <td className="border-r-[0.5px] border-b-[0.5px] border-slate-400 p-1">{job.reason || ""}</td>
                                            <td className="border-r-[0.5px] border-b-[0.5px] border-slate-400 p-1 text-center">{job.salary_in || ""}</td>
                                            <td className="border-b-[0.5px] border-slate-400 p-1 text-center">{job.salary_out || ""}</td>
                                        </tr>
                                    );
                                })}
                                {/* Footer / Consent Row */}
                                <tr>
                                    <td colSpan={7} className="p-2 align-top">
                                        <div className="text-[10px] space-y-1">
                                            <div>
                                                <span>ท่านจะขัดข้องหรือไม่ถ้าหากทางบริษัทฯ จะติดต่อสอบถามไปยังบริษัทฯ(เดิม)หรือบริษัทฯปัจจุบัน</span>
                                                <span className="ml-4 inline-block align-middle"><CheckBox label="ไม่ขัดข้อง" checked={exp.contact_previous_employer?.status === 'allowed'} width="w-[100px]" textSize="text-[10px]" /></span>
                                                <span className="ml-4 inline-block align-middle"><CheckBox label="ขัดข้อง" checked={exp.contact_previous_employer?.status === 'not_allowed'} width="w-[80px]" textSize="text-[10px]" /></span>
                                            </div>
                                            <div className="flex">
                                                <span className="relative top-[-2px]">เพราะ</span>
                                                <span className="border-b border-dotted border-slate-400 inline-block w-[600px] px-2 pb-1">{exp.contact_previous_employer?.status === 'not_allowed' ? exp.contact_previous_employer?.reason : ''}</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                     </div>

                     {/* --- Statement --- */}
                     <div>
                        <div className="text-center font-bold text-[14px] border-[0.5px] border-slate-400 bg-slate-50 py-1 mb-[-0.5px]">คำแถลง (กรุณาระบุตามจริงเท่านั้น)</div>
                        <div className="border-[0.5px] border-slate-400 p-3 text-[11px] space-y-1.5">
                            <div className="flex gap-1 items-center flex-nowrap">
                                <span className="w-5 shrink-0 relative top-[1px]">1.</span>
                                <span className="whitespace-nowrap relative top-[1px]">ท่านสามารถปฏิบัติงานล่วงเวลาได้หรือไม่</span>
                                <CheckBox label="ได้" checked={st.can_work_overtime === 'yes'} width="w-[50px]" />
                                <CheckBox label="ไม่ได้" checked={st.can_work_overtime === 'no'} width="w-[60px]" />
                                <span className="whitespace-nowrap relative top-[1px]">เพราะ</span>
                                <span className="border-b border-dotted border-slate-400 flex-1 min-w-0 px-1 pb-1 relative top-2">{st.can_work_overtime === 'no' ? st.can_work_overtime_reason : ''}</span>
                            </div>

                            <div className="flex gap-1 items-center flex-wrap">
                                <span className="w-5 shrink-0 relative top-[1px]">2.</span>
                                <span className="whitespace-nowrap relative top-[1px]">ท่านเคยเป็นผู้ต้องหาหรือต้องคำพิพากษาในคดีอาญา/แพ่งหรือไม่</span>
                                <CheckBox label="ไม่เคย" checked={st.has_legal_cases === 'never'} width="w-[60px]" />
                                <CheckBox label="เคย" checked={st.has_legal_cases === 'ever'} width="w-[50px]" />
                                <span className="relative top-[1px]">ด้วยคดี.......................................................เมื่อปี พ.ศ..........</span>
                            </div>

                            <div className="flex gap-1 items-center flex-wrap">
                                <span className="w-5 shrink-0 relative top-[1px]">3.</span>
                                <span className="whitespace-nowrap relative top-[1px]">ท่านเคยเสพสารเสพติดหรือเคยรับการบำบัด</span>
                                <CheckBox label="ไม่เคย" checked={st.has_drug_history === 'never'} width="w-[60px]" />
                                <CheckBox label="เคย" checked={st.has_drug_history === 'ever'} width="w-[50px]" />
                                <span className="relative top-[1px]">ระบุประเภท.............................สถานที่บำบัด.....................เมื่อปี พ.ศ..........</span>
                            </div>

                            <div className="flex gap-1 items-center flex-wrap">
                                <span className="w-5 shrink-0 relative top-[1px]">4.</span>
                                <span className="whitespace-nowrap relative top-[1px]">ในปัจจุบันท่านสูบบุหรี่หรือไม่</span>
                                <CheckBox label="ไม่สูบ" checked={st.smoking_habit?.status === 'no'} width="w-[60px]" />
                                <CheckBox label="สูบประจำเฉลี่ยต่อวันระบุ.......ม้วน/กล่อง" checked={st.smoking_habit?.status === 'regular'} width="w-auto" />
                                <CheckBox label="สูบเฉพาะเที่ยว" checked={st.smoking_habit?.status === 'social'} width="w-[120px]" />
                                <CheckBox label="สูบบ้างบางครั้ง" checked={st.smoking_habit?.status === 'occasional'} width="w-[120px]" />
                            </div>

                            <div className="flex gap-1 items-center flex-nowrap">
                                <span className="w-5 shrink-0 relative top-[1px]">5.</span>
                                <span className="whitespace-nowrap relative top-[1px]">ท่านดื่มแอลกอฮอล์หรือไม่</span>
                                <CheckBox label="ไม่ดื่ม" checked={st.alcohol_habit === 'no'} width="w-[60px]" />
                                <CheckBox label="ดื่ม" checked={st.alcohol_habit === 'yes'} width="w-[50px]" />
                                <CheckBox label="ดื่มบ้าง" checked={st.alcohol_habit === 'occasional'} width="w-[70px]" />
                                <span className="whitespace-nowrap relative top-[1px]">ความถี่................วัน/ต่อสัปดาห์</span>
                            </div>
                            
                            <div className="flex gap-1 items-center flex-wrap">
                                <span className="w-5 shrink-0 relative top-[1px]">6.</span>
                                <span className="whitespace-nowrap relative top-[1px]">สุขภาพของท่าน</span>
                                <CheckBox label="แข็งแรงสมบูรณ์ดีทุกอย่าง" checked={st.health_status?.status === 'good'} width="w-auto" />
                                <CheckBox label="ไม่มีโรคประจำตัว" checked={st.health_status?.status === 'no_disease'} width="w-[130px]" />
                                <CheckBox label="มีโรคประจำตัว ระบุ" checked={st.health_status?.status === 'has_disease'} width="w-auto" />
                                <span className="border-b border-dotted border-slate-400 flex-1 min-w-[100px] pb-1 relative top-2">{st.health_status?.details}</span>
                            </div>

                            <div className="flex gap-1 items-center flex-wrap">
                                <span className="w-5 shrink-0 relative top-[1px]">7.</span>
                                <span className="whitespace-nowrap relative top-[1px]">ท่านเคยเจ็บป่วยมากกว่า 3 วันติดต่อกันในรอบ 12 เดือนที่ผ่านมาหรือไม่</span>
                                <CheckBox label="ไม่เคย" checked={st.recent_major_illness === 'never'} width="w-[60px]" />
                                <CheckBox label="เคย" checked={st.recent_major_illness === 'ever'} width="w-[50px]" />
                                <span className="relative top-[1px]">ระบุโรค.........................................</span>
                            </div>

                            <div className="flex gap-1 items-center">
                                <span className="w-5 shrink-0 relative top-[1px]">8.</span>
                                <span className="relative top-[1px]">ท่านมีโรคติดต่อร้ายแรงหรือไม่ เช่น กาฬโรค/ไข้ทรพิษหรือฝีดาษ/วัณโรค /HIV/Covid-19 อื่นๆ โปรดระบุให้ชัดเจน...............................</span>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-1 flex-wrap">
                                    <span className="w-5 shrink-0 relative top-[1px]">9.</span>
                                    <span className="whitespace-nowrap relative top-[1px]">ท่านมีข้อบกพร่องเกี่ยวกับร่างกาย หรือไม่</span>
                                    <CheckBox label="สายตาปกติ" checked={st.physical_conditions?.eyes === 'normal'} width="w-[90px]" />
                                    <CheckBox label="สายตาไม่ปกติ ระบุ.........." checked={st.physical_conditions?.eyes === 'abnormal'} width="w-auto" />
                                    <CheckBox label="การฟังปกติ" checked={st.physical_conditions?.hearing === 'normal'} width="w-[90px]" />
                                    <CheckBox label="การฟังไม่ปกติ ระบุ.........." checked={st.physical_conditions?.hearing === 'abnormal'} width="w-auto" />
                                </div>
                                <div className="flex items-center gap-1 ml-6 flex-wrap">
                                    <CheckBox label="การพูดปกติ" checked={st.physical_conditions?.speaking === 'normal'} width="w-[90px]" />
                                    <CheckBox label="การพูดไม่ปกติ ระบุ............................" checked={st.physical_conditions?.speaking === 'abnormal'} width="w-auto" />
                                    <CheckBox label="การเคลื่อนไหวปกติ" checked={st.physical_conditions?.movement === 'normal'} width="w-[120px]" />
                                    <CheckBox label="การเคลื่อนไหวไม่ปกติ ระบุ............." checked={st.physical_conditions?.movement === 'abnormal'} width="w-auto" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex gap-1 items-center flex-wrap">
                                    <span className="w-5 shrink-0 relative top-[1px]">10.</span>
                                    <span className="whitespace-nowrap relative top-[1px]">ท่านมีหนี้สินหรือภาระด้านใด อาทิ</span>
                                    <CheckBox label="กู้นอกระบบ" checked={st.debt_status?.outside_system} width="w-[90px]" />
                                    <CheckBox label="กู้ในระบบ บัตรเครดิต/สินเชื่อต่างๆ" checked={st.debt_status?.inside_system} width="w-auto" />
                                    <CheckBox label="ภาระการผ่อนส่งบ้าน/คอนโด" checked={st.debt_status?.house} width="w-auto" />
                                </div>
                                <div className="flex items-center ml-6 gap-1 flex-wrap">
                                    <CheckBox label="ภาระการผ่อนส่งรถยนต์ / รถมอเตอร์ไซค์" checked={st.debt_status?.car} width="w-auto" />
                                    <CheckBox label="เงินกู้ยืมเพื่อการศึกษา กยศ." checked={st.debt_status?.student_loan} width="w-auto" />
                                    <CheckBox label="อื่นๆ ระบุ................" checked={st.debt_status?.other} width="w-auto" />
                                    <span className="whitespace-nowrap relative top-[1px]">รวมภาระต่อเดือน.................บาท</span>
                                </div>
                            </div>

                            <div className="flex gap-1 items-center flex-wrap">
                                <span className="w-5 shrink-0 relative top-[1px]">11.</span>
                                <span className="whitespace-nowrap relative top-[1px]">ท่านยินยอมให้บริษัทฯตรวจสอบประวัติอาชญากรรมหรือไม่</span>
                                <CheckBox label="ยินยอม" checked={st.criminal_record_check_consent === 'agree'} width="w-[70px]" />
                                <CheckBox label="ไม่ยินยอม เพราะ........................................" checked={st.criminal_record_check_consent === 'disagree'} width="w-auto" />
                            </div>

                            <div className="flex gap-1 items-center flex-wrap">
                                <span className="w-5 shrink-0 relative top-[1px]">12.</span>
                                <span className="whitespace-nowrap relative top-[1px]">ท่านยินยอมให้บริษัทฯตรวจสอบเครดิตบูโรหรือไม่</span>
                                <CheckBox label="ยินยอม" checked={st.credit_bureau_check_consent === 'agree'} width="w-[70px]" />
                                <CheckBox label="ไม่ยินยอม เพราะ........................................" checked={st.credit_bureau_check_consent === 'disagree'} width="w-auto" />
                            </div>

                        </div>
                     </div>

                     {/* --- Referral --- */}
                     <div className="border-[0.5px] border-slate-400 p-2 pb-3 text-[11px] space-y-2">
                         <div className="flex items-end">
                            <span className="relative top-[1px]">ข้าพเจ้ายื่นใบสมัครโดยการแนะนำของ</span>
                            <DottedLine value={ref.referred_by} className="flex-1 text-center relative top-2" />
                            <span className="relative top-[1px]">ความสัมพันธ์</span>
                            <DottedLine value={ref.referred_by_relationship} className="w-[40mm] text-center relative top-2" />
                         </div>
                         <div className="flex items-end">
                            <span className="relative top-[1px]">บุคคลในองค์กรนี้ที่ข้าพเจ้ารู้จักคุ้นเคย</span>
                            <DottedLine value={ref.acquaintance_name} className="flex-1 text-center relative top-2" />
                            <span className="relative top-[1px]">ความสัมพันธ์</span>
                            <DottedLine value={ref.acquaintance_relationship} className="w-[40mm] text-center relative top-2" />
                         </div>
                     </div>

                     {/* --- Parents --- */}
                     <div className="border-[0.5px] border-slate-400 p-2 text-[11px] space-y-2">
                         <div className="font-bold underline text-center text-[12px]">ประวัติครอบครัว</div>
                         
                         {/* Father - 3 lines */}
                         <div className="flex flex-wrap items-end gap-1">
                             <span>ชื่อ-สกุล บิดา</span>
                             <DottedLine value={par.father?.name} className="w-[50mm] relative top-[3px]" />
                             <CheckBox label="ถึงแก่กรรม" checked={par.father?.status === 'deceased'} width="w-[22mm]" textSize="text-[11px]" />
                             <CheckBox label="มีชีวิตอยู่" checked={par.father?.status === 'alive'} width="w-[22mm]" textSize="text-[11px]" />
                             <span>อายุ</span>
                             <DottedLine value={par.father?.age} className="w-[12mm] text-center relative top-[3px]" />
                             <span>ปี</span>
                             <span>สัญชาติ</span>
                             <DottedLine value={par.father?.nationality} className="w-[25mm] relative top-[3px]" />
                         </div>
                         <div className="flex flex-wrap items-end gap-1">
                             <span>อาชีพ</span>
                             <DottedLine value={par.father?.occupation} className="w-[35mm] relative top-[3px]" />
                             <span>ที่อยู่เลขที่</span>
                             <DottedLine value={par.father?.address?.number} className="w-[18mm] relative top-[3px]" />
                             <span>หมู่</span>
                             <DottedLine value={par.father?.address?.moo} className="w-[12mm] relative top-[3px]" />
                             <span>ตำบล/แขวง</span>
                             <DottedLine value={par.father?.address?.subdistrict} className="w-[30mm] relative top-[3px]" />
                             <span>ถนน</span>
                             <DottedLine value={par.father?.address?.road} className="w-[30mm] relative top-[3px]" />
                         </div>
                         <div className="flex flex-wrap items-end gap-1">
                             <span>อำเภอ/เขต</span>
                             <DottedLine value={par.father?.address?.district} className="w-[30mm] relative top-[3px]" />
                             <span>จังหวัด</span>
                             <DottedLine value={par.father?.address?.province} className="w-[30mm] relative top-[3px]" />
                             <span>รหัสไปรษณีย์</span>
                             <DottedLine value={par.father?.address?.zipcode} className="w-[20mm] relative top-[3px]" />
                             <span>โทรศัพท์</span>
                             <DottedLine value={par.father?.phone} className="flex-1 relative top-[3px]" />
                         </div>

                         {/* Mother - 3 lines */}
                         <div className="flex flex-wrap items-end gap-1 pt-2">
                             <span>ชื่อ-สกุล มารดา</span>
                             <DottedLine value={par.mother?.name} className="w-[48mm] relative top-[3px]" />
                             <CheckBox label="ถึงแก่กรรม" checked={par.mother?.status === 'deceased'} width="w-[22mm]" textSize="text-[11px]" />
                             <CheckBox label="มีชีวิตอยู่" checked={par.mother?.status === 'alive'} width="w-[22mm]" textSize="text-[11px]" />
                             <span>อายุ</span>
                             <DottedLine value={par.mother?.age} className="w-[12mm] text-center relative top-[3px]" />
                             <span>ปี</span>
                             <span>สัญชาติ</span>
                             <DottedLine value={par.mother?.nationality} className="w-[25mm] relative top-[3px]" />
                         </div>
                         <div className="flex flex-wrap items-end gap-1">
                             <span>อาชีพ</span>
                             <DottedLine value={par.mother?.occupation} className="w-[35mm] relative top-[3px]" />
                             <span>ที่อยู่เลขที่</span>
                             <DottedLine value={par.mother?.address?.number} className="w-[18mm] relative top-[3px]" />
                             <span>หมู่</span>
                             <DottedLine value={par.mother?.address?.moo} className="w-[12mm] relative top-[3px]" />
                             <span>ตำบล/แขวง</span>
                             <DottedLine value={par.mother?.address?.subdistrict} className="w-[30mm] relative top-[3px]" />
                             <span>ถนน</span>
                             <DottedLine value={par.mother?.address?.road} className="w-[30mm] relative top-[3px]" />
                         </div>
                         <div className="flex flex-wrap items-end gap-1">
                             <span>อำเภอ/เขต</span>
                             <DottedLine value={par.mother?.address?.district} className="w-[30mm] relative top-[3px]" />
                             <span>จังหวัด</span>
                             <DottedLine value={par.mother?.address?.province} className="w-[30mm] relative top-[3px]" />
                             <span>รหัสไปรษณีย์</span>
                             <DottedLine value={par.mother?.address?.zipcode} className="w-[20mm] relative top-[3px]" />
                             <span>โทรศัพท์</span>
                             <DottedLine value={par.mother?.phone} className="flex-1 relative top-[3px]" />
                         </div>

                         {/* Siblings */}
                         <div className="flex items-end gap-2 pt-2">
                            <span>ข้าพเจ้ามีพี่น้องร่วมบิดามารดา</span>
                            <DottedLine value={par.siblings_count} className="w-[20mm] text-center" />
                            <span>คน</span>
                            <span>ข้าพเจ้าเป็นบุตรคนที่</span>
                            <DottedLine value={par.birth_order} className="w-[20mm] text-center" />
                            <span>คน</span>
                         </div>
                     </div>
                </div>
            </PageContainer>

        </div>
    );
}