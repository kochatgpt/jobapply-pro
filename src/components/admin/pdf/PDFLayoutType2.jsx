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
    const admin = applicant.admin_data || { hr_systems: {}, hr_info: {}, documents: {}, test_results: {}, interview: {}, approvals: { recruiter: {}, committee: {}, hr_manager: {}, department_head: {}, final_decision: {} } };

    // Helper function to format date as DD/MM/YYYY
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString; // Return original if invalid
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // --- Helpers ---
    const DottedLine = ({ value, className = "", center = false }) => (
        <div className={`border-b-[1.5px] border-dotted border-black px-1 pb-2 min-h-[1.4em] ${center ? 'text-center' : ''} ${className}`}>
            {value || ""}
        </div>
    );

    const Field = ({ label, value, width = "auto", labelWidth="auto", className = "" }) => (
        <div className={`flex items-end leading-tight ${className}`} style={{ width: className ? 'auto' : width }}>
            <span className="font-bold text-slate-800 mr-1 whitespace-nowrap pb-1" style={{ width: labelWidth }}>{label}</span>
            <div className="flex-1 border-b-[1.5px] border-dotted border-black text-slate-900 px-2 pb-1 text-center truncate">
                {value || "-"}
            </div>
        </div>
    );

    const CheckBox = ({ label, checked, width="w-[300px]" }) => (
        <div className={`relative pl-5 h-4 flex items-center ${width}`}>
            <div className={`absolute left-0 top-2.5 w-3 h-3 border-[0.5px] border-black rounded-[1px] bg-white flex items-center justify-center`}>
                {checked && <Check className="w-2.5 h-2.5" />}
            </div>
            <span className="text-slate-900 pt-1">{label}</span>
        </div>
    );

    const PageContainer = ({ children, pageNum, totalPages = 4, pageHeight = '297mm', showLogo = true, logoTopOffset = "top-[-2mm]" }) => {
        const footerBottom = pageNum === 2 ? 'bottom-[20mm]' : pageNum === 3 || pageNum === 4 ? 'bottom-[25mm]' : 'bottom-[10mm]';
        return (
            <div 
                className="bg-white text-slate-900 p-[10mm] mx-auto relative mb-8 shadow-sm print:shadow-none print:mb-0"
                style={{ 
                    fontSize: '12px',
                    width: '210mm', 
                    minHeight: pageHeight,
                    height: pageHeight,
                    maxHeight: pageHeight,
                    fontFamily: 'TH Sarabun New, Sarabun, sans-serif',
                    ...(pageNum < totalPages && { pageBreakAfter: 'always' }),
                    overflow: 'visible'
                }}
            >
                {showLogo && (
                    <div className={`absolute ${logoTopOffset} right-[10mm] w-[40mm] flex justify-end`}>
                        {appLogo ? (
                            <img src={appLogo} alt="Logo" crossOrigin="anonymous" className="h-[60px] w-auto object-contain" />
                        ) : (
                            <div className="h-[60px] w-[80px] bg-slate-100 rounded flex items-center justify-center text-slate-400">LOGO</div>
                        )}
                    </div>
                )}
                {children}

                {/* Footer */}
                <div className={`absolute ${footerBottom} right-[10mm] text-slate-500`}>
                    {pageNum} | {totalPages}
                </div>
                <div className={`absolute ${footerBottom} left-[50%] -translate-x-1/2 text-slate-400 text-center`}>
                     FM-HRD-10 Rev.03 10/10/66 <br/>
                     www.ko.in.th Strategy . AI . DX . Sustainability
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center">
            {/* ================= PAGE 1 ================= */}
            <PageContainer pageNum={1} totalPages={4} showLogo={true} pageHeight="300mm" logoTopOffset="top-[15mm]">
                 {/* --- Top Section --- */}
                <div className="flex justify-between items-start mb-1">
                    {/* Top Left Box */}
                    <div className="border-[0.5px] border-black p-2 w-[40mm] space-y-1">
                        <div className="relative pl-5 h-4 flex items-center">
                            <div className={`absolute left-0 top-0.5 w-3 h-3 border border-black rounded-[1px] bg-white flex items-center justify-center`}>
                                {admin.hr_systems?.web_hr && <Check className="w-2.5 h-2.5" />}
                            </div>
                            <span className="leading-none absolute bottom-2.5">Web HR</span>
                        </div>
                        <div className="relative pl-5 h-4 flex items-center">
                            <div className={`absolute left-0 top-0.5 w-3 h-3 border border-black rounded-[1px] bg-white flex items-center justify-center`}>
                                {admin.hr_systems?.sps_in && <Check className="w-2.5 h-2.5" />}
                            </div>
                            <span className="leading-none absolute bottom-2.5">สปส.(เข้า){admin.hr_systems?.sps_in_details ? admin.hr_systems.sps_in_details : '......'}</span>
                        </div>
                        <div className="relative pl-5 h-4 flex items-center">
                            <div className={`absolute left-0 top-0.5 w-3 h-3 border border-black rounded-[1px] bg-white flex items-center justify-center`}>
                                {admin.hr_systems?.b_plus && <Check className="w-2.5 h-2.5" />}
                            </div>
                            <span className="leading-none absolute bottom-2.5">B-plus</span>
                        </div>
                        <div className="relative pl-5 h-4 flex items-center">
                            <div className={`absolute left-0 top-0.5 w-3 h-3 border border-black rounded-[1px] bg-white flex items-center justify-center`}>
                                {admin.hr_systems?.sps_out && <Check className="w-2.5 h-2.5" />}
                            </div>
                            <span className="leading-none absolute bottom-2.5">สปส.(ออก){admin.hr_systems?.sps_out_details ? admin.hr_systems.sps_out_details : '......'}</span>
                        </div>
                    </div>

                    {/* Center Title */}
                    <div className="flex-1 text-center pt-2">
                        <h1 className="text-2xl font-bold text-slate-900 underline underline-offset-4">ใบสมัครงาน</h1>
                    </div>
                </div>

                {/* Application Date */}
                <div className="mb-1 font-bold text-[14px]">
                    วันที่เขียนใบสมัครงาน &nbsp;&nbsp; {p.application_date || "____________________"}
                </div>

                {/* Disclaimer */}
                <div className="text-justify leading-snug mb-3">
                    ใบสมัครงานเป็นส่วนหนึ่งในการพิจารณา โปรดกรอกข้อความตามจริงด้วยตัวเองให้ครบถ้วน อนึ่งในกรณีที่ท่าน ไม่ผ่านการพิจารณา รับเข้าทำงาน ข้อมูลในใบสมัครจะถูกเก็บรักษาไว้เป็นระยะเวลา 1 เดือน หากมีการพิจารณาตำแหน่งอื่นๆ อีกครั้งตามความเหมาะสม อนึ่งในกรณีที่ท่านผ่าน การพิจารณารับเข้าทำงาน ข้อมูลในใบสมัครจะถูกเก็บรักษาไว้ตลอดระยะเวลาการเป็นพนักงาน/ลูกจ้างของ บริษัทฯและหากท่านพ้นสภาพจากการเป็นพนักงาน/ลูกจ้างแล้วนั้น บริษัทฯจะเก็บรักษาไว้ต่อเนื่องอีกเป็นระยะเวลา 2 ปี หากมีกรณี ต้องใช้เป็นหลักฐานประกอบการพิจารณาตามกฎหมาย พนักงานหรือผู้มาติดต่อสมัครงาน ยินยอมให้เก็บรวบรวมข้อมูลส่วนบุคคลใน นามของบริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด เป็นผู้ควบคุมข้อมูลส่วนบุคคล ประมวลผลเก็บรวบรวมหรือเปิดเผยข้อมูล ส่วนบุคคล (PDPA) รวมถึงข้อมูลอื่นใดตามที่ได้ระบุไว้ใน พรบ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 "กฎหมายคุ้มครองข้อมูลส่วน บุคคล" และ "ข้อมูลส่วนบุคคลที่มีความอ่อนไหวเป็นพิเศษ"เพื่อเป็นส่วนหนึ่งของการพิจารณาบุคลากรตามเงื่อนไขบริษัทฯ
                </div>

                {/* --- HR Section --- */}
                <div className="border-[0.5px] border-black p-3 mb-1 rounded-sm relative">
                    <div className="absolute -top-2 left-2 px-12 py-2 bg-white text-[14px]"></div>
                    <div className="absolute -top-4 left-2 px-1 font-bold text-[14px]">(สำหรับ จนท.)</div>
                    <div className="grid grid-cols-12 gap-2 mb-1">
                        <div className="col-span-4 flex items-end"><span className="font-bold mr-2 pb-1">รหัสพนักงาน</span><DottedLine value={admin.hr_info?.employee_id} className="flex-1" /></div>
                        <div className="col-span-4 flex items-end"><span className="font-bold mr-2 pb-1">วันที่เริ่มงานจริง</span><DottedLine value={admin.hr_info?.actual_start_date} className="flex-1" /></div>
                        <div className="col-span-4 flex items-end"><span className="font-bold mr-2 pb-1">หน่วยงาน/สังกัด</span><DottedLine value={admin.hr_info?.department} className="flex-1" /></div>
                    </div>
                    <div className="flex gap-4 mb-1">
                        <div className="flex items-end gap-2"><span className="font-bold pb-1">ไซด์เสื้อ</span><DottedLine value={admin.hr_info?.shirt_size} className="w-16 text-center" /></div>
                        <div className="flex items-end gap-2"><span className="font-bold pb-1">จำนวน</span><DottedLine value={admin.hr_info?.shirt_quantity} className="w-16 text-center" /></div>
                    </div>
                    <div className="grid grid-cols-3 gap-x-1 gap-y-1">
                        <CheckBox label="รูปถ่าย 1-3 รูป" checked={admin.documents?.photos} />
                        <CheckBox label="สำเนาบัตรประชาชน 3 ฉบับ" checked={admin.documents?.id_card_copy} />
                        <CheckBox label="สำเนาทะเบียนบ้าน" checked={admin.documents?.house_registration} />
                        <CheckBox label="สำเนาวุฒิการศึกษา" checked={admin.documents?.education_cert} />
                        <CheckBox label="หนังสือรับรองการศึกษา" checked={admin.documents?.education_confirmation} />
                        <CheckBox label="หลักฐานการเปลี่ยนชื่อ-นามสกุล (ถ้ามี)" checked={admin.documents?.name_change_proof} />
                        <CheckBox label="สำเนาใบเกณฑ์ทหาร (ชาย)" checked={admin.documents?.military_cert} />
                        <CheckBox label="สัญญาจ้าง" checked={admin.documents?.employment_contract} />
                        <CheckBox label="บันทึกข้อตกลงเข้ารับการฝึกอบรม" checked={admin.documents?.training_agreement} />
                        <CheckBox label="แบบฟอร์มประกันสังคม" checked={admin.documents?.social_security_form} />
                        <CheckBox label="หนังสือยินยอมการตรวจอาชญากรรม" checked={admin.documents?.criminal_check_consent} />
                        <CheckBox label="ใบรับรองแพทย์การตรวจสุขภาพ" checked={admin.documents?.health_cert} />
                        <CheckBox label="สำเนาบุ๊คแบงค์" checked={admin.documents?.bank_book_copy} />
                        <CheckBox label="หนังสือรับรองการทำงาน (ถ้ามี)" checked={admin.documents?.work_cert} />
                        <CheckBox label="JD" checked={admin.documents?.jd} />
                        <CheckBox label="หนังสือยินยอมข้อมตกลงให้ประมวลผลเก็บรวบรวมหรือเปิดเผยข้อมูลส่วนบุคคล (PDPA)" checked={admin.documents?.pdpa_consent} width="col-span-2" />
                        <CheckBox label={`เอกสาร Support อื่นๆ ${admin.documents?.other_support_details ? admin.documents.other_support_details : '.......................................'}`} checked={admin.documents?.other_support} width="col-span-2"/>
                    </div>
                </div>

                <div className="text-center font-bold text-[14px] my-1">ประวัติส่วนตัว</div>

                {/* --- Main Info Box --- */}
                <div className="border-[0.5px] border-black rounded-sm">
                    {/* Position Row */}
                    <div className="p-3 border-b-[0.5px] border-black bg-slate-50/50">
                        <div className="flex gap-1 items-end leading-tight">
                            <div className="font-bold whitespace-nowrap pb-1">สมัครงานในตำแหน่ง 1</div>
                            <div className="border-b-[1.5px] border-dotted border-black flex-1 px-2 pb-1 text-center font-medium truncate">{p.position_1}</div>
                            <div className="font-bold whitespace-nowrap pb-1">2</div>
                            <div className="border-b-[1.5px] border-dotted border-black flex-1 px-2 pb-1 text-center font-medium truncate">{p.position_2}</div>
                            <div className="font-bold whitespace-nowrap pb-1">อัตราเงินเดือนที่ต้องการ</div>
                            <div className="border-b-[1.5px] border-dotted border-black w-32 px-2 pb-1 text-center font-medium truncate">{p.expected_salary}</div>
                        </div>
                    </div>

                    {/* Personal Data & Photo */}
                    <div className="p-3 grid grid-cols-12 gap-1">
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
                                <Field label="วันเดือนปีเกิด" value={formatDate(p.dob)} className="flex-[2]" />
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
                                    <span className="text-slate-300 text-[14px]">รูปภาพ</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="border-t-[0.5px] border-black p-3 space-y-3">
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
                                    <div className={`absolute left-0 top-2 w-3 h-3 border border-black flex items-center justify-center rounded-[1px] bg-white`}>
                                        {p.current_address_type === 'own' && <Check className="w-2.5 h-2.5" />}
                                    </div>
                                    <span className="text-slate-900">บ้านตนเอง</span>
                                </div>
                                <div className="relative pl-5 h-4 flex items-center w-[150px]">
                                    <div className={`absolute left-0 top-2 w-3 h-3 border border-black flex items-center justify-center rounded-[1px] bg-white`}>
                                        {p.current_address_type === 'rent' && <Check className="w-2.5 h-2.5" />}
                                    </div>
                                    <span className="text-slate-900">บ้านเช่า / หอพัก</span>
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
                    <div className="border-t-[0.5px] border-black p-3">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                 <div className="font-bold underline mb-2">สถานภาพ (ชาย)</div>
                                 <div className="space-y-1.5 pl-1">
                                     <div className="flex gap-4">
                                         <div className="relative pl-5 h-4 flex items-center mr-4">
                                            <div className={`absolute left-0 top-2 w-3 h-3 border border-black flex items-center justify-center rounded-[1px] bg-white`}>
                                                {p.military_status === 'exempted' && <Check className="w-2.5 h-2.5" />}
                                            </div>
                                            <span className="text-slate-900">ได้รับการยกเว้นทางทหาร</span>
                                         </div>
                                         <div className="relative pl-5 h-4 flex items-center">
                                            <div className={`absolute left-0 top-2 w-3 h-3 border border-black flex items-center justify-center rounded-[1px] bg-white`}>
                                                {p.military_status === 'served' && <Check className="w-2.5 h-2.5" />}
                                            </div>
                                            <span className="text-slate-900">เกณฑ์ทหารแล้ว</span>
                                         </div>
                                     </div>
                                     <div className="relative pl-5 h-4 flex items-center">
                                        <div className={`absolute left-0 top-2 w-3 h-3 border border-black flex items-center justify-center rounded-[1px] bg-white`}>
                                            {p.military_status === 'not_served' && <Check className="w-2.5 h-2.5" />}
                                        </div>
                                        <span className="text-slate-900">ยังไม่ได้รับการเกณฑ์</span>
                                     </div>
                                     <div className="flex gap-4">
                                         <div className="relative pl-5 h-4 flex items-center mr-4">
                                            <div className={`absolute left-0 top-2 w-3 h-3 border border-black flex items-center justify-center rounded-[1px] bg-white`}>
                                                {f.marital_status === 'single' && <Check className="w-2.5 h-2.5" />}
                                            </div>
                                            <span className="text-slate-900">ยังไม่สมรส</span>
                                         </div>
                                         <div className="relative pl-5 h-4 flex items-center">
                                            <div className={`absolute left-0 top-2 w-3 h-3 border border-black flex items-center justify-center rounded-[1px] bg-white`}>
                                                {f.marital_status === 'married' && <Check className="w-2.5 h-2.5" />}
                                            </div>
                                            <span className="text-slate-900">สมรสแล้ว</span>
                                         </div>
                                     </div>
                                 </div>
                            </div>
                            <div>
                                 <div className="font-bold underline mb-2">สถานภาพ (หญิง)</div>
                                 <div className="space-y-1.5 pl-1">
                                     <div className="flex gap-4">
                                         <div className="relative pl-5 h-4 flex items-center w-[250px]">
                                            <div className={`absolute left-0 top-2 w-3 h-3 border border-black flex items-center justify-center rounded-[1px] bg-white`}>
                                            </div>
                                            <span className="text-slate-900">ไม่อยู่ระหว่างการตั้งครรภ์</span>
                                         </div>
                                     </div>
                                     <div className="flex gap-4">
                                         <div className="relative pl-5 h-4 flex items-center mr-4">
                                            <div className={`absolute left-0 top-2 w-3 h-3 border border-black flex items-center justify-center rounded-[1px] bg-white`}>
                                                {f.has_children === 'yes' && <Check className="w-2.5 h-2.5" />}
                                            </div>
                                            <span className="text-slate-900">มีบุตรแล้ว</span>
                                         </div>
                                         <div className="relative pl-5 h-4 flex items-center">
                                            <div className={`absolute left-0 top-2 w-3 h-3 border border-black flex items-center justify-center rounded-[1px] bg-white`}>
                                                {f.has_children === 'no' && <Check className="w-2.5 h-2.5" />}
                                            </div>
                                            <span className="text-slate-900">ยังไม่มีบุตร</span>
                                         </div>
                                     </div>
                                     <div className="relative pl-5 h-4 flex items-center">
                                        <div className={`absolute left-0 top-2 w-3 h-3 border border-black flex items-center justify-center rounded-[1px] bg-white`}>
                                        </div>
                                        <span className="text-slate-900">อยู่ระหว่างการตั้งครรภ์ ระบุ สัปดาห์ที่ตั้งครรภ์</span>
                                     </div>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageContainer>

            {/* ================= PAGE 2 ================= */}
            <PageContainer pageNum={2} totalPages={4}>
                <div className="mt-[5mm] space-y-0.5">
                    {/* --- Family Status --- */}
                    <div className="border-[0.5px] border-black px-2 py-1 rounded-sm">
                        <div className="flex items-center gap-2 mb-2">
                             <span className="font-bold underline">สถานะทางครอบครัว</span>
                             <div className="flex gap-4 ml-4 items-end">
                                <div className="relative pl-5 h-4 flex items-center w-[60px]">
                                    <div className={`absolute left-0 top-2.5 w-3 h-3 border-[0.5px] border-black flex items-center justify-center rounded-[1px] bg-white`}>
                                        {f.marital_status === 'single' && <Check className="w-2.5 h-2.5" />}
                                    </div>
                                    <span className="text-slate-900 pt-1">โสด</span>
                                </div>
                                <div className="relative pl-5 h-4 flex items-center w-[100px]">
                                    <div className={`absolute left-0 top-2.5 w-3 h-3 border-[0.5px] border-black flex items-center justify-center rounded-[1px] bg-white`}>
                                        {f.marital_status === 'married' && <Check className="w-2.5 h-2.5" />}
                                    </div>
                                    <span className="text-slate-900 pt-1">แต่งงานแล้ว</span>
                                </div>
                             </div>
                        </div>
                        <div className="flex gap-2 mb-1">
                            <span className="font-bold underline">กรุณาระบุ</span>
                            <Field label="ชื่อ-สกุล สามี/ภรรยา/แฟน (ถ้ามี)" value={f.spouse_name} className="flex-1" />
                            <Field label="อาชีพ" value={f.spouse_occupation} className="w-[150px]" />
                        </div>
                        <div className="flex gap-2 mb-1">
                            <Field label="สถานที่ทำงาน" value={f.spouse_workplace} className="flex-1" />
                            <Field label="เบอร์โทรศัพท์ที่สามารถติดต่อได้สะดวก" value={f.spouse_phone} className="flex-1" />
                        </div>
                         <div className="flex gap-2">
                            <span className="font-bold">กรณีมีบุตรแล้ว</span>
                            <Field label="จำนวนบุตร" value={f.children_count} className="w-[80px]" labelWidth="auto" />
                            <span className="">คน</span>
                            <Field label="ปัจจุบันบุตรอยู่ในความดูแลของบุคคลใด เช่น คุณยาย / คุณย่า หรือตนเอง" value={f.children_caretaker} className="flex-1" />
                        </div>
                    </div>

                    {/* --- Education History --- */}
                    <div>
                        <div className="text-center font-bold text-[14px] mb-0.5 pb-[1px]">ประวัติการศึกษา</div>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-center">
                                    <th className="border-l-[0.5px] border-b-[0.5px] border-t-[0.5px] border-black p-1 w-[15%]">ระดับ</th>
                                    <th className="border-l-[0.5px] border-b-[0.5px] border-t-[0.5px] border-black p-1 w-[30%]">ชื่อสถานศึกษา</th>
                                    <th className="border-l-[0.5px] border-b-[0.5px] border-t-[0.5px] border-black p-1 w-[25%]">สาขาวิชา</th>
                                    <th className="border-l-[0.5px] border-b-[0.5px] border-t-[0.5px] border-black p-1 w-[10%]">เริ่มปีพ.ศ.</th>
                                    <th className="border-l-[0.5px] border-b-[0.5px] border-t-[0.5px] border-black p-1 w-[10%]">สำเร็จปีพ.ศ.</th>
                                    <th className="border-[0.5px] border-black p-1 w-[10%]">เกรด<br/>เฉลี่ย</th>
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
                                            <td className="border-l-[0.5px] border-b-[0.5px] border-black p-1 pb-2 bg-slate-50">{row.label}</td>
                                            <td className="border-l-[0.5px] border-b-[0.5px] border-black p-1 pb-2">{ed.institute || ""}</td>
                                            <td className="border-l-[0.5px] border-b-[0.5px] border-black p-1 pb-2">{ed.major || ""}</td>
                                            <td className="border-l-[0.5px] border-b-[0.5px] border-black p-1 pb-2 text-center">{ed.start_year || ""}</td>
                                            <td className="border-l-[0.5px] border-b-[0.5px] border-black p-1 pb-2 text-center">{ed.end_year || ""}</td>
                                            <td className="border-l-[0.5px] border-b-[0.5px] border-r-[0.5px] border-black p-1 pb-2 text-center">{ed.gpa || ""}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* --- General Skills --- */}
                    <div>
                         <div className="text-center font-bold text-[14px] mb-1">ความสามารถทั่วไป</div>
                         <div className="border-[0.5px] border-black rounded-sm">
                             <div className="grid grid-cols-12 border-b-[0.5px] border-black">
                                 {/* Language */}
                                 <div className="col-span-4 border-r-[0.5px] border-black p-1 text-center font-bold">ความรู้ในการใช้ภาษา</div>
                                 {/* Office */}
                                 <div className="col-span-4 border-r-[0.5px] border-black p-1 text-center font-bold">เครื่องใช้สำนักงาน (เลือก <Check className="inline w-3 h-3 absolute top-3"/> )</div>
                                 {/* Special */}
                                 <div className="col-span-4 p-1 text-center font-bold">ความสามารถพิเศษอื่นๆ (เลือก <Check className="inline w-3 h-3"/> )</div>
                             </div>
                             
                             <div className="grid grid-cols-12">
                                 {/* Language Table */}
                                 <div className="col-span-4 border-r-[0.5px] border-black">
                                     <div className="grid grid-cols-5 border-b-[0.5px] border-black text-center bg-slate-50 h-[40px]">
                                         <div className="col-span-2 p-1 border-r-[0.5px] border-black font-bold flex items-center justify-center">ภาษา</div>
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
                                         <div key={idx} className="grid grid-cols-5 border-b-[0.5px] border-black last:border-b-0 h-[28px]">
                                             <div className="col-span-2 pl-1 border-r-[0.5px] border-black font-medium flex items-center h-full truncate">
                                                 {item.l}
                                                 {item.n && s.languages?.[item.n] && <span className="ml-1 text-slate-600">({s.languages[item.n]})</span>}
                                             </div>
                                             <div className="col-span-3 h-full flex items-center justify-center px-2">
                                                 {s.languages?.[item.k] || ''}
                                             </div>
                                         </div>
                                     ))}
                                 </div>

                                 {/* Office Equipment */}
                                 <div className="col-span-4 border-r-[0.5px] border-black">
                                     <div className="grid grid-cols-5 border-b-[0.5px] border-black font-bold text-center bg-slate-50 h-[40px]">
                                         <div className="col-span-3 p-1 border-r-[0.5px] border-black flex items-center justify-center">ประเภท</div>
                                         <div className="p-1 border-r-[0.5px] border-black flex items-center justify-center">ได้</div>
                                         <div className="p-1 flex items-center justify-center">ไม่ได้</div>
                                     </div>
                                     {[
                                         {l: 'พิมพ์ดีดไทย/อังกฤษ', k: 'typewriter'},
                                         {l: 'เครื่องคิดเลข', k: 'calculator'},
                                         {l: 'เครื่องแฟกซ์/ถ่ายเอกสาร', k: 'fax_copier'},
                                         {l: 'เครื่องคอมพิวเตอร์', k: 'computer'}
                                     ].map((item, idx) => (
                                         <div key={idx} className="grid grid-cols-5 border-b-[0.5px] border-black last:border-b-0 h-[28px]">
                                             <div className="col-span-3 pl-1 border-r-[0.5px] border-black flex items-center h-full truncate">{item.l}</div>
                                             <div className="border-r-[0.5px] border-black h-full flex justify-center items-center">{s.office?.[item.k] ? <Check className="w-3 h-3"/> : ''}</div>
                                             <div className="h-full"></div>
                                         </div>
                                     ))}
                                 </div>

                                 {/* Special Skills */}
                                 <div className="col-span-4">
                                     <div className="grid grid-cols-5 border-b-[0.5px] border-black font-bold text-center bg-slate-50 h-[40px]">
                                         <div className="col-span-3 p-1 border-r-[0.5px] border-black flex items-center justify-center">ประเภท</div>
                                         <div className="p-1 border-r-[0.5px] border-black flex items-center justify-center">ได้</div>
                                         <div className="p-1 flex items-center justify-center">ไม่ได้</div>
                                     </div>
                                     {[
                                         {l: 'ขับจักรยานยนต์', k: 'motorcycle'},
                                         {l: 'ขับรถยนต์', k: 'car'},
                                         {l: 'ขับรถบรรทุก', k: 'truck'},
                                         {l: <span key="other">อื่นๆ<span className="invisible">.............</span></span>, k: 'other'}
                                     ].map((item, idx) => (
                                         <div key={idx} className="grid grid-cols-5 border-b-[0.5px] border-black last:border-b-0 h-[28px]">
                                             <div className="col-span-3 pl-1 border-r-[0.5px] border-black flex items-center h-full truncate">{item.l}</div>
                                             <div className="border-r-[0.5px] border-black h-full flex justify-center items-center">{s.driving?.[item.k] ? <Check className="w-3 h-3"/> : ''}</div>
                                             <div className="h-full"></div>
                                         </div>
                                     ))}
                                 </div>
                                 </div>

                                 <div className="p-2 pb-8 border-t-[0.5px] border-black bg-slate-50/30">
                                     <div className="font-bold mb-1">ความรู้ความสามารถทางด้านภาษา/โปรแกรมคอมพิวเตอร์:</div>
                                     <DottedLine value={s.computer_capability} className="mb-2 w-full" />
                                     <DottedLine value="" className="w-full" />
                                 </div>
                         </div>
                    </div>

                    {/* --- Training History --- */}
                    <div>
                        <div className="text-center font-bold text-[14px] mb-1">ประวัติการฝึกอบรม</div>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-center">
                                    <th className="border-l-[0.5px] border-b-[0.5px] border-t-[0.5px] border-black p-1 w-[10%]">ลำดับ</th>
                                    <th className="border-l-[0.5px] border-b-[0.5px] border-t-[0.5px] border-black p-1 w-[35%]">หลักสูตร</th>
                                    <th className="border-l-[0.5px] border-b-[0.5px] border-t-[0.5px] border-black p-1 w-[35%]">สถาบัน</th>
                                    <th className="border-[0.5px] border-black p-1 w-[20%]">ระยะเวลา</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[0, 1, 2, 3].map((i) => {
                                    const tr = t.history?.[i] || {};
                                    return (
                                        <tr key={i} className="h-[28px]">
                                            <td className="border-l-[0.5px] border-b-[0.5px] border-black p-1 text-center">{i + 1}.</td>
                                            <td className="border-l-[0.5px] border-b-[0.5px] border-black p-1">{tr.course || ""}</td>
                                            <td className="border-l-[0.5px] border-b-[0.5px] border-black p-1">{tr.institute || ""}</td>
                                            <td className="border-l-[0.5px] border-b-[0.5px] border-r-[0.5px] border-black p-1 text-center">{tr.duration || ""}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </PageContainer>

            {/* ================= PAGE 3 ================= */}
            <PageContainer pageNum={3} totalPages={4} logoTopOffset="top-[-50px]">
                <div className="mt-[3mm] space-y-1">

                     {/* --- Work History --- */}
                     <div>
                        <table className="w-full border-collapse border-[0.5px] border-black">
                            <thead>
                                <tr>
                                    <th colSpan={5} className="border-r-[0.5px] border-b-[0.5px] border-black p-2 align-top">
                                        <div className="text-center font-bold underline mb-1">ประวัติการทำงาน</div>
                                        <div className="flex justify-center gap-6 font-normal">
                                            <div className="relative pl-5 h-4 flex items-center">
                                                <div className={`absolute left-0 top-2.5 w-3 h-3 border-[0.5px] border-black flex items-center justify-center rounded-[1px] bg-white`}>
                                                    {exp.has_experience === 'no' && <Check className="w-2.5 h-2.5" />}
                                                </div>
                                                <span className=" text-slate-900 pt-1">ไม่มีประสบการณ์ทำงาน</span>
                                            </div>
                                            <div className="relative pl-5 h-4 flex items-center">
                                                <div className={`absolute left-0 top-2.5 w-3 h-3 border-[0.5px] border-black flex items-center justify-center rounded-[1px] bg-white`}>
                                                    {exp.has_experience === 'yes' && <Check className="w-2.5 h-2.5" />}
                                                </div>
                                                <span className=" text-slate-900 pt-1">มีประสบการณ์ทำงานระบุ (เรียงลำดับจากล่าสุด)</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th colSpan={2} className="border-b-[0.5px] border-black p-2 align-middle text-center font-bold">
                                        เงินเดือน/บาท
                                    </th>
                                </tr>
                                <tr className="text-center bg-slate-50">
                                    <th className="border-r-[0.5px] border-b-[0.5px] border-l-[0.5px] border-black p-1 w-[12%]">วัน/เดือน/ปี<br/>เริ่มงาน - ออก</th>
                                    <th className="border-r-[0.5px] border-b-[0.5px] border-black p-1 w-[18%]">ชื่อสถานที่ทำงาน</th>
                                    <th className="border-r-[0.5px] border-b-[0.5px] border-black p-1 w-[18%]">ชื่อ - เบอร์โทร<br/>(นายจ้าง)</th>
                                    <th className="border-r-[0.5px] border-b-[0.5px] border-black p-1 w-[15%]">ตำแหน่งสุดท้าย</th>
                                    <th className="border-r-[0.5px] border-b-[0.5px] border-black p-1 w-[15%]">สาเหตุที่ลาออก</th>
                                    <th className="border-r-[0.5px] border-b-[0.5px] border-black p-1 w-[11%]">เข้า/บาท</th>
                                    <th className="border-b-[0.5px] border-r-[0.5px] border-black p-1 w-[11%]">ออก/บาท</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[0, 1, 2, 3].map((i) => {
                                    const job = exp.history?.[i] || {};
                                    return (
                                        <tr key={i} className="h-[24px]">
                                            <td className="border-r-[0.5px] border-b-[0.5px] border-black p-1 text-center">{job.period || ""}</td>
                                            <td className="border-r-[0.5px] border-b-[0.5px] border-black p-1">{job.workplace || ""}</td>
                                            <td className="border-r-[0.5px] border-b-[0.5px] border-black p-1">{job.employer || ""}</td>
                                            <td className="border-r-[0.5px] border-b-[0.5px] border-black p-1 text-center">{job.position || ""}</td>
                                            <td className="border-r-[0.5px] border-b-[0.5px] border-black p-1">{job.reason || ""}</td>
                                            <td className="border-r-[0.5px] border-b-[0.5px] border-black p-1 text-center">{job.salary_in || ""}</td>
                                            <td className="border-b-[0.5px] border-black p-1 text-center">{job.salary_out || ""}</td>
                                        </tr>
                                    );
                                })}
                                {/* Footer / Consent Row */}
                                <tr>
                                    <td colSpan={7} className="p-2 align-top">
                                        <div className="space-y-1">
                                            <div>
                                                <span>ท่านจะขัดข้องหรือไม่ถ้าหากทางบริษัทฯ จะติดต่อสอบถามไปยังบริษัทฯ(เดิม)หรือบริษัทฯปัจจุบัน</span>
                                                <span className="ml-4 inline-block align-middle"><CheckBox label="ไม่ขัดข้อง" checked={exp.contact_previous_employer?.status === 'allowed'} width="w-[100px] textSize=12px"/></span>
                                                <span className="ml-4 inline-block align-middle"><CheckBox label="ขัดข้อง" checked={exp.contact_previous_employer?.status === 'not_allowed'} width="w-[80px] textSize=12px"/></span>
                                            </div>
                                            <div className="flex">
                                                <span className="relative top-[-2px]">เพราะ</span>
                                                <span className="border-b border-dotted border-black inline-block w-[600px] px-2 pb-1">{exp.contact_previous_employer?.status === 'not_allowed' ? exp.contact_previous_employer?.reason : ''}</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                     </div>

                     {/* --- Statement --- */}
                     <div>
                        <div className="text-center font-bold text-[14px] border-[0.5px] border-black bg-slate-50 py-1 mb-[-0.5px]">คำแถลง (กรุณาระบุตามจริงเท่านั้น)</div>
                        <div className="border-[0.5px] border-black p-3 space-y-0.5">
                            <div className="flex gap-1 items-center flex-nowrap">
                                <span className="w-5 shrink-0 relative top-[1px]">1.</span>
                                <span className="whitespace-nowrap relative top-[1px]">ท่านสามารถปฏิบัติงานล่วงเวลาได้หรือไม่</span>
                                <CheckBox label="ได้" checked={st.can_work_overtime === 'yes'} width="w-[50px] textSize=[12px]" />
                                <CheckBox label="ไม่ได้" checked={st.can_work_overtime === 'no'} width="w-[60px] textSize=[12px]" />
                                <span className="whitespace-nowrap relative top-[1px]">เพราะ</span>
                                <span className="border-b border-dotted border-black flex-1 min-w-0 px-1 pb-1 relative top-2">{st.can_work_overtime === 'no' ? st.can_work_overtime_reason : ''}</span>
                            </div>

                            <div className="flex gap-1 items-center flex-wrap">
                                <span className="w-5 shrink-0 relative top-[1px]">2.</span>
                                <span className="whitespace-nowrap relative top-[1px]">ท่านเคยเป็นผู้ต้องหาหรือต้องคำพิพากษาในคดีอาญา/แพ่งหรือไม่</span>
                                <CheckBox label="ไม่เคย" checked={st.has_legal_cases === 'never'} width="w-[60px] textSize=[12px]" />
                                <CheckBox label="เคย" checked={st.has_legal_cases === 'ever'} width="w-[50px] textSize=[12px]" />
                                <span className="relative top-[1px]">ด้วยคดี</span>
                                <span className="border-b border-dotted border-black min-w-[150px] px-1 pb-1 relative top-2">{st.has_legal_cases === 'ever' ? st.has_legal_cases_details : ''}</span>
                                <span className="relative top-[1px]">เมื่อปี พ.ศ.</span>
                                <span className="border-b border-dotted border-black min-w-[60px] px-1 pb-1 relative top-2">{st.has_legal_cases === 'ever' ? st.has_legal_cases_year : ''}</span>
                            </div>

                            <div className="flex gap-1 items-center flex-wrap">
                                <span className="w-5 shrink-0 relative top-[1px]">3.</span>
                                <span className="whitespace-nowrap relative top-[1px]">ท่านเคยเสพสารเสพติดหรือเคยรับการบำบัด</span>
                                <CheckBox label="ไม่เคย" checked={st.has_drug_history === 'never'} width="w-[60px] textSize=[12px]" />
                                <CheckBox label="เคย" checked={st.has_drug_history === 'ever'} width="w-[50px] textSize=[12px]" />
                                <span className="relative top-[1px]">ระบุประเภท</span>
                                <span className="border-b border-dotted border-black min-w-[80px] px-1 pb-1 relative top-2">{st.has_drug_history === 'ever' ? st.has_drug_history_type : ''}</span>
                                <span className="relative top-[1px]">สถานที่บำบัด</span>
                                <span className="border-b border-dotted border-black min-w-[80px] px-1 pb-1 relative top-2">{st.has_drug_history === 'ever' ? st.has_drug_history_place : ''}</span>
                                <span className="relative top-[1px]">เมื่อปี พ.ศ.</span>
                                <span className="border-b border-dotted border-black min-w-[60px] px-1 pb-1 relative top-2">{st.has_drug_history === 'ever' ? st.has_drug_history_year : ''}</span>
                            </div>

                            <div className="flex gap-1 items-center flex-wrap">
                                <span className="w-5 shrink-0 relative top-[1px]">4.</span>
                                <span className="whitespace-nowrap relative top-[1px]">ในปัจจุบันท่านสูบบุหรี่หรือไม่</span>
                                <CheckBox label="ไม่สูบ" checked={st.smoking_habit?.status === 'no'} width="w-[60px] textSize=[12px]" />
                                <CheckBox label="สูบประจำเฉลี่ยต่อวันระบุ.......ม้วน/กล่อง" checked={st.smoking_habit?.status === 'regular'} width="w-auto textSize=[12px]" />
                                <CheckBox label="สูบเฉพาะเที่ยว" checked={st.smoking_habit?.status === 'social'} width="w-[120px] textSize=[12px]" />
                                <CheckBox label="สูบบ้างบางครั้ง" checked={st.smoking_habit?.status === 'occasional'} width="w-[120px] textSize=[12px]" />
                            </div>

                            <div className="flex gap-1 items-center flex-nowrap">
                                <span className="w-5 shrink-0 relative top-[1px]">5.</span>
                                <span className="whitespace-nowrap relative top-[1px]">ท่านดื่มแอลกอฮอล์หรือไม่</span>
                                <CheckBox label="ไม่ดื่ม" checked={st.alcohol_habit === 'no'} width="w-[60px] textSize=[12px]" />
                                <CheckBox label="ดื่ม" checked={st.alcohol_habit === 'yes'} width="w-[50px] textSize=[12px]" />
                                <CheckBox label="ดื่มบ้าง" checked={st.alcohol_habit === 'occasional'} width="w-[70px] textSize=[12px]" />
                                <span className="whitespace-nowrap relative top-[1px]">ความถี่................วัน/ต่อสัปดาห์</span>
                            </div>
                            
                            <div className="flex gap-1 items-center flex-wrap">
                                <span className="w-5 shrink-0 relative top-[1px]">6.</span>
                                <span className="whitespace-nowrap relative top-[1px]">สุขภาพของท่าน</span>
                                <CheckBox label="แข็งแรงสมบูรณ์ดีทุกอย่าง" checked={st.health_status?.status === 'good'} width="w-auto textSize=[12px]" />
                                <CheckBox label="ไม่มีโรคประจำตัว" checked={st.health_status?.status === 'no_disease'} width="w-[130px] textSize=[12px]" />
                                <CheckBox label="มีโรคประจำตัว ระบุ" checked={st.health_status?.status === 'has_disease'} width="w-auto textSize=[12px]" />
                                <span className="border-b border-dotted border-black flex-1 min-w-[100px] pb-1 relative top-2">{st.health_status?.details}</span>
                            </div>

                            <div className="flex gap-1 items-center flex-wrap">
                                <span className="w-5 shrink-0 relative top-[1px]">7.</span>
                                <span className="whitespace-nowrap relative top-[1px]">ท่านเคยเจ็บป่วยมากกว่า 3 วันติดต่อกันในรอบ 12 เดือนที่ผ่านมาหรือไม่</span>
                                <CheckBox label="ไม่เคย" checked={st.recent_major_illness === 'never'} width="w-[60px] textSize=[12px]" />
                                <CheckBox label="เคย" checked={st.recent_major_illness === 'ever'} width="w-[50px] textSize=[12px]" />
                                <span className="relative top-[1px]">ระบุโรค</span>
                                <span className="border-b border-dotted border-black min-w-[150px] px-1 pb-1 relative top-2">{st.recent_major_illness === 'ever' ? st.recent_major_illness_details : ''}</span>
                            </div>

                            <div className="flex gap-1 items-center flex-wrap">
                                <span className="w-5 shrink-0 relative top-[1px]">8.</span>
                                <span className="relative top-[1px]">ท่านมีโรคติดต่อร้ายแรงหรือไม่ เช่น กาฬโรค/ไข้ทรพิษหรือฝีดาษ/วัณโรค /HIV/Covid-19</span>
                                <CheckBox label="ไม่มี" checked={st.has_contagious_disease === 'no'} width="w-[60px] textSize=[12px]" />
                                <CheckBox label="มี" checked={st.has_contagious_disease === 'yes'} width="w-[50px] textSize=[12px]" />
                                <span className="relative top-[1px]">อื่นๆ โปรดระบุให้ชัดเจน</span>
                                <span className="border-b border-dotted border-black flex-1 min-w-[100px] px-1 pb-1 relative top-2">{st.has_contagious_disease === 'yes' ? st.has_contagious_disease_details : ''}</span>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-1 flex-wrap">
                                    <span className="w-5 shrink-0 relative top-[1px]">9.</span>
                                    <span className="relative top-[1px]">ท่านมีข้อบกพร่องเกี่ยวกับร่างกาย หรือไม่</span>
                                </div>
                                <div className="flex items-center gap-1 ml-6 flex-wrap">
                                    <CheckBox label="สายตาปกติ" checked={st.physical_conditions?.eyes === 'normal'} width="w-[110px] textSize=[12px]" />
                                    <CheckBox label="สายตาไม่ปกติ ระบุ.........." checked={st.physical_conditions?.eyes === 'abnormal'} width="w-auto textSize=[12px]" />
                                    <CheckBox label="การฟังปกติ" checked={st.physical_conditions?.hearing === 'normal'} width="w-[110px] textSize=[12px]" />
                                    <CheckBox label="การฟังไม่ปกติ ระบุ.........." checked={st.physical_conditions?.hearing === 'abnormal'} width="w-auto textSize=[12px]" />
                                </div>
                                <div className="flex items-center gap-1 ml-6 flex-wrap">
                                    <CheckBox label="การพูดปกติ" checked={st.physical_conditions?.speaking === 'normal'} width="w-[110px] textSize=[12px]" />
                                    <CheckBox label="การพูดไม่ปกติ ระบุ............................" checked={st.physical_conditions?.speaking === 'abnormal'} width="w-auto textSize=[12px]" />
                                    <CheckBox label="การเคลื่อนไหวปกติ" checked={st.physical_conditions?.movement === 'normal'} width="w-[110px] textSize=[12px]" />
                                    <CheckBox label="การเคลื่อนไหวไม่ปกติ ระบุ............." checked={st.physical_conditions?.movement === 'abnormal'} width="w-auto textSize=[12px]" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex gap-1 items-center flex-wrap">
                                    <span className="w-5 shrink-0 relative top-[1px]">10.</span>
                                    <span className="whitespace-nowrap relative top-[1px]">ท่านมีหนี้สินหรือภาระด้านใด อาทิ</span>
                                    <CheckBox label="กู้นอกระบบ" checked={st.debt_status?.outside_system} width="w-[90px] textSize=[12px]" />
                                    <CheckBox label="กู้ในระบบ บัตรเครดิต/สินเชื่อต่างๆ" checked={st.debt_status?.inside_system} width="w-auto textSize=[12px]" />
                                    <CheckBox label="ภาระการผ่อนส่งบ้าน/คอนโด" checked={st.debt_status?.house} width="w-auto textSize=[12px]" />
                                </div>
                                <div className="flex items-center ml-6 gap-1 flex-wrap">
                                    <CheckBox label="ภาระการผ่อนส่งรถยนต์ / รถมอเตอร์ไซค์" checked={st.debt_status?.car} width="w-auto textSize=[12px]" />
                                    <CheckBox label="เงินกู้ยืมเพื่อการศึกษา กยศ." checked={st.debt_status?.student_loan} width="w-auto textSize=[12px]" />
                                    <CheckBox label="อื่นๆ ระบุ................" checked={st.debt_status?.other} width="w-auto textSize=[12px]" />
                                    <span className="whitespace-nowrap relative top-[1px]">รวมภาระต่อเดือน.................บาท</span>
                                </div>
                            </div>

                            <div className="flex gap-1 items-center flex-wrap">
                                <span className="w-5 shrink-0 relative top-[1px]">11.</span>
                                <span className="whitespace-nowrap relative top-[1px]">ท่านยินยอมให้บริษัทฯตรวจสอบประวัติอาชญากรรมหรือไม่</span>
                                <CheckBox label="ยินยอม" checked={st.criminal_record_check_consent === 'agree'} width="w-[70px] textSize=[12px]" />
                                <CheckBox label="ไม่ยินยอม" checked={st.criminal_record_check_consent === 'disagree'} width="w-[80px] textSize=[12px]" />
                                <span className="relative top-[1px]">เพราะ</span>
                                <span className="border-b border-dotted border-black flex-1 min-w-[150px] px-1 pb-1 relative top-2">{st.criminal_record_check_consent === 'disagree' ? st.criminal_record_check_consent_reason : ''}</span>
                            </div>

                            <div className="flex gap-1 items-center flex-wrap">
                                <span className="w-5 shrink-0 relative top-[1px]">12.</span>
                                <span className="whitespace-nowrap relative top-[1px]">ท่านยินยอมให้บริษัทฯตรวจสอบเครดิตบูโรหรือไม่</span>
                                <CheckBox label="ยินยอม" checked={st.credit_bureau_check_consent === 'agree'} width="w-[70px] textSize=[12px]" />
                                <CheckBox label="ไม่ยินยอม" checked={st.credit_bureau_check_consent === 'disagree'} width="w-[80px] textSize=[12px]" />
                                <span className="relative top-[1px]">เพราะ</span>
                                <span className="border-b border-dotted border-black flex-1 min-w-[150px] px-1 pb-1 relative top-2">{st.credit_bureau_check_consent === 'disagree' ? st.credit_bureau_check_consent_reason : ''}</span>
                            </div>

                        </div>
                     </div>

                     {/* --- Referral --- */}
                     <div className="border-[0.5px] border-black px-2 pb-1 space-y-0.5">
                         <div className="flex items-end">
                            <span className="relative top-[-4px]">ข้าพเจ้ายื่นใบสมัครโดยการแนะนำของ</span>
                            <DottedLine value={ref.referred_by} className="flex-1 text-center relative top-[-4px]" />
                            <span className="relative top-[-4px]">ความสัมพันธ์</span>
                            <DottedLine value={ref.referred_by_relationship} className="w-[40mm] text-center relative top-[-4px]" />
                         </div>
                         <div className="flex items-end">
                            <span className="relative top-[-4px]">บุคคลในองค์กรนี้ที่ข้าพเจ้ารู้จักคุ้นเคย</span>
                            <DottedLine value={ref.acquaintance_name} className="flex-1 text-center relative top-[-4px]" />
                            <span className="relative top-[-4px]">ความสัมพันธ์</span>
                            <DottedLine value={ref.acquaintance_relationship} className="w-[40mm] text-center relative top-[-4px]" />
                         </div>
                     </div>

                     {/* --- Parents --- */}
                     <div className="border-[0.5px] border-black p-2 space-y-0.5">
                         <div className="font-bold underline text-center">ประวัติครอบครัว</div>
                         
                         {/* Father - 3 lines */}
                         <div className="flex flex-wrap items-end gap-1">
                             <span>ชื่อ-สกุล บิดา</span>
                             <DottedLine value={par.father?.name} className="w-[50mm] relative top-[3px]" />
                             <CheckBox label="ถึงแก่กรรม" checked={par.father?.status === 'deceased'} width="w-[22mm] textSize=[12px]" />
                             <CheckBox label="มีชีวิตอยู่" checked={par.father?.status === 'alive'} width="w-[22mm] textSize=[12px]" />
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
                         <div className="flex flex-wrap items-end gap-1">
                             <span>ชื่อ-สกุล มารดา</span>
                             <DottedLine value={par.mother?.name} className="w-[48mm] relative top-[3px]" />
                             <CheckBox label="ถึงแก่กรรม" checked={par.mother?.status === 'deceased'} width="w-[22mm]" textSize="text-[12px]" />
                             <CheckBox label="มีชีวิตอยู่" checked={par.mother?.status === 'alive'} width="w-[22mm]" textSize="text-[12px]" />
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
                         <div className="flex items-end gap-2">
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

            {/* ================= PAGE 4 ================= */}
            <PageContainer pageNum={4} totalPages={4} pageHeight={"290mm"} logoTopOffset="top-[-20mm]">
                <div className="mt-[-15mm] space-y-1">
                    
                    {/* Emergency Contact Table */}
                    <div className="text-[14px] mb-1">
                        <span className="font-bold">กรณี <span className="underline">ฉุกเฉิน เร่งด่วน</span> สามารถติดต่อบุคคลอ้างอิงได้ที่</span>
                    </div>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="border-l-[0.5px] border-b-[0.5px] border-t-[0.5px] border-black p-1 text-center w-[20%]">ชื่อ-สกุล</th>
                                <th className="border-l-[0.5px] border-b-[0.5px] border-t-[0.5px] border-black p-1 text-center w-[15%]">ความสัมพันธ์</th>
                                <th className="border-l-[0.5px] border-b-[0.5px] border-t-[0.5px] border-black p-1 text-center w-[30%]">ที่อยู่/ที่ทำงาน</th>
                                <th className="border-l-[0.5px] border-b-[0.5px] border-t-[0.5px] border-black p-1 text-center w-[20%]">โทรศัพท์</th>
                                <th className="border-[0.5px] border-black p-1 text-center w-[15%]">ตำแหน่ง</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applicant.emergency_contacts?.slice(0, 2).map((contact, idx) => (
                                <tr key={idx} className="h-[24px]">
                                    <td className="border-l-[0.5px] border-b-[0.5px] border-black p-1 text-center">{contact.name || ""}</td>
                                    <td className="border-l-[0.5px] border-b-[0.5px] border-black p-1 text-center">{contact.relationship || ""}</td>
                                    <td className="border-l-[0.5px] border-b-[0.5px] border-black p-1 text-center">{contact.address || ""}</td>
                                    <td className="border-l-[0.5px] border-b-[0.5px] border-black p-1 text-center">{contact.phone || ""}</td>
                                    <td className="border-l-[0.5px] border-b-[0.5px] border-r-[0.5px] border-black p-1 text-center">{contact.position || ""}</td>
                                </tr>
                            ))}
                            {(!applicant.emergency_contacts || applicant.emergency_contacts.length < 2) && 
                                [...Array(2 - (applicant.emergency_contacts?.length || 0))].map((_, idx) => (
                                    <tr key={`empty-${idx}`} className="h-[24px]">
                                        <td className="border-l-[0.5px] border-b-[0.5px] border-black p-1 text-center"></td>
                                        <td className="border-l-[0.5px] border-b-[0.5px] border-black p-1 text-center"></td>
                                        <td className="border-l-[0.5px] border-b-[0.5px] border-black p-1 text-center"></td>
                                        <td className="border-l-[0.5px] border-b-[0.5px] border-black p-1 text-center"></td>
                                        <td className="border-l-[0.5px] border-b-[0.5px] border-r-[0.5px] border-black p-1 text-center"></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    {/* Attitude Section */}
                    <div className="border-[0.5px] border-black p-2">
                        <div className="font-bold mb-2">ทัศนคติในการทำงานของท่านที่ทำให้บริษัทฯได้รู้จักท่านมากขึ้น</div>
                        <DottedLine value={applicant.attitude} className="mb-1 w-full" />
                        <DottedLine value="" className="w-full" />
                    </div>

                    {/* Declaration with Signature */}
                    <div className="border-[0.5px] border-black p-2">
                        <div className="text-justify leading-snug mb-1">
                            <p>
                                ข้าพเจ้าขอรับรองว่า ข้อความดังกล่าวทั้งหมดในใบสมัครงานและเอกสารแนบนี้เป็นความจริงทุกประการ หลังจากบริษัทฯได้เข้ามาทำงานแล้วหากปรากฏว่า ข้อความในใบสมัครงานและเอกสารแนบที่นำมาแสดงต่างๆ หรือรายละเอียดที่ให้ไว้ไม่เป็นความจริง หรือเป็นเท็จ บริษัทฯ มีสิทธิ์ที่เลิกจ้างข้าพเจ้าได้ โดยไม่ต้องจ่ายเงินชดเชยหรือค่าเสียหายใดๆ ทั้งสิ้น ข้าพเจ้ายินยอมให้บริษัทฯตรวจสอบข้อมูลย้อนหลังจากการทำงานที่เดิม รวมถึงยินยอมให้ตรวจสอบประวัติอาญากรรมและเครดิตบูโรทั้งสิ้น และข้าพเจ้ายินยอมให้แพทย์หรือโรงพยาบาลให้ข้อมูลที่จำเป็นเกี่ยวกับสุขภาพของข้าพเจ้า ซึ่งมีผลกระทบต่อการปฏิบัติงานในบริษัท
                            </p>
                        </div>
                        
                        <div className="text-right mb-1">
                            <div className="font-bold mb-2">ข้าพเจ้าขอลงนามรับรองการให้ข้อมูลตามจริงทุกประการ</div>
                        </div>

                        <div className="text-right space-y-1">
                            <div className="flex justify-end items-center gap-2">
                                <span>ลงชื่อ</span>
                                {applicant.signature_url ? (
                                    <div className="inline-flex flex-col items-center w-[200px]">
                                        <img src={applicant.signature_url} alt="Signature" crossOrigin="anonymous" className="max-h-8 object-contain mb-1" />
                                        <div className="border-b-[1.5px] border-dotted border-black w-full"></div>
                                    </div>
                                ) : (
                                    <div className="border-b-[1.5px] border-dotted border-black w-[200px] h-[30px] inline-block"></div>
                                )}
                                <span>ผู้สมัคร</span>
                            </div>
                            
                            <div className="flex justify-end items-end gap-2">
                                <span className="relative top-[1px]">ตัวบรรจง (</span>
                                <DottedLine value={applicant.full_name} className="w-[200px] relative top-[1px] text-center" />
                                <span className="relative top-[1px]">)</span>
                            </div>
                            
                            <div className="flex justify-end items-end gap-2">
                                <span className="relative top-[1px]">วันที่</span>
                                <DottedLine value={formatDate(applicant.signature_date)} className="w-[120px] relative top-[4px] text-center" />
                            </div>
                            
                            <div className="flex justify-end items-end gap-2">
                                <span className="relative top-[1px]">ข้าพเจ้าพร้อมปฏิบัติงานกับบริษัทฯ ในวันที่</span>
                                <DottedLine value={formatDate(applicant.start_work_date)} className="w-[120px] relative top-[1px] text-center" />
                            </div>
                        </div>
                    </div>

                    {/* HR Section */}
                    <div className="text-center font-bold bg-slate-50 border-[0.5px] border-black py-1">
                        สำหรับบริษัทฯ ใช้กรอกรายละเอียดบันทึกการสัมภาษณ์
                    </div>

                    {/* Test Results */}
                    <div className="border-[0.5px] border-black p-2">
                        <div className="font-bold mb-1">(ทดสอบผู้สมัครงาน)</div>
                        <div className="space-y-1 ml-4">
                            <div className="flex items-end gap-2">
                                <span>(บันทึกการทดสอบครั้งที่ 1)</span>
                                <span>ตัวเลข</span><DottedLine value={admin.test_results?.test1_number} className="w-20" />
                                <span>ไทย</span><DottedLine value={admin.test_results?.test1_thai} className="w-20" />
                                <span>อังกฤษ</span><DottedLine value={admin.test_results?.test1_english} className="flex-1" />
                            </div>
                            <div className="flex items-end gap-2">
                                <span>(บันทึกการทดสอบครั้งที่ 2)</span>
                                <span>ตัวเลข</span><DottedLine value={admin.test_results?.test2_number} className="w-20" />
                                <span>ไทย</span><DottedLine value={admin.test_results?.test2_thai} className="w-20" />
                                <span>อังกฤษ</span><DottedLine value={admin.test_results?.test2_english} className="flex-1" />
                            </div>
                            <div className="flex items-end gap-2">
                                <span>(ทดสอบอื่นๆ)</span>
                                <span>ระบุ</span><DottedLine value={admin.test_results?.other_test} className="flex-1" />
                            </div>
                        </div>
                    </div>

                    {/* Interview Notes */}
                    <div className="border-[0.5px] border-black p-2">
                        <div className="flex items-start gap-2 mb-1">
                            <span className="font-bold">(บันทึกการผู้สัมภาษณ์)</span>
                            <span>: ลงชื่อ ผู้สัมภาษณ์</span>
                            <DottedLine value={admin.interview?.interviewer_name} className="w-32" />
                            <span>รายละเอียดในการสัมภาษณ์</span>
                        </div>
                        <DottedLine value={admin.interview?.interview_details} className="w-full mb-1" />
                    </div>

                    {/* Approval Section */}
                    <div className="grid grid-cols-3 gap-0">
                        {/* First Row - 3 columns */}
                        <div className="border-[0.5px] border-black p-1.5">
                            <div className="font-bold text-center mb-1 pb-1 border-b border-black">เจ้าหน้าที่สรรหาว่าจ้าง</div>
                            <div className="text-center mb-2">ผู้ดำเนินการ</div>
                            <div className="flex flex-col items-center gap-1 mb-1">
                                <span>ลงชื่อ</span>
                                {admin.approvals?.recruiter?.signature ? (
                                    <div className="flex flex-col items-center w-32">
                                        <img src={admin.approvals.recruiter.signature} alt="Signature" crossOrigin="anonymous" className="max-h-6 object-contain mb-1" />
                                        <div className="border-b-[1px] border-dotted border-black w-full"></div>
                                    </div>
                                ) : (
                                    <div className="border-b-[1px] border-dotted border-black w-32 h-6"></div>
                                )}
                                <div className="text-center">({admin.approvals?.recruiter?.name || "..........................................."})</div>
                            </div>
                            <div className="text-center">วันที่ {admin.approvals?.recruiter?.date || ".........../.........../..........."}</div>
                        </div>
                        
                        <div className="border-[0.5px] border-black border-l-0 p-1.5">
                            <div className="font-bold text-center mb-1 pb-1 border-b border-black">กรรมการ</div>
                            <div className="flex gap-2 mb-2 justify-center">
                                <CheckBox label="อนุมัติรับ" checked={admin.approvals?.committee?.decision === 'approved'} width="w-auto" textSize="text-[12px]" />
                                <CheckBox label="ไม่รับ" checked={admin.approvals?.committee?.decision === 'rejected'} width="w-auto" textSize="text-[12px]" />
                            </div>
                            <div className="flex flex-col items-center gap-1 mb-1">
                                <span>ลงชื่อ</span>
                                {admin.approvals?.committee?.signature ? (
                                    <div className="flex flex-col items-center w-32">
                                        <img src={admin.approvals.committee.signature} alt="Signature" crossOrigin="anonymous" className="max-h-6 object-contain mb-1" />
                                        <div className="border-b-[1px] border-dotted border-black w-full"></div>
                                    </div>
                                ) : (
                                    <div className="border-b-[1px] border-dotted border-black w-32 h-6"></div>
                                )}
                                <div className="text-center">({admin.approvals?.committee?.name || "..........................................."})</div>
                            </div>
                            <div className="text-center">วันที่ {admin.approvals?.committee?.date || ".........../.........../..........."}</div>
                        </div>
                        
                        <div className="border-[0.5px] border-black border-l-0 p-1.5">
                            <div className="font-bold text-center mb-2 pb-1 border-b border-black">ผู้จัดการฝ่ายบุคคล</div>
                            <div className="flex gap-2 mb-2 justify-center">
                                <CheckBox label="อนุมัติรับ" checked={admin.approvals?.hr_manager?.decision === 'approved'} width="w-auto" textSize="text-[12px]" />
                                <CheckBox label="ไม่รับ" checked={admin.approvals?.hr_manager?.decision === 'rejected'} width="w-auto" textSize="text-[12px]" />
                            </div>
                            <div className="flex flex-col items-center gap-1 mb-1">
                                <span>ลงชื่อ</span>
                                {admin.approvals?.hr_manager?.signature ? (
                                    <div className="flex flex-col items-center w-32">
                                        <img src={admin.approvals.hr_manager.signature} alt="Signature" crossOrigin="anonymous" className="max-h-6 object-contain mb-1" />
                                        <div className="border-b-[1px] border-dotted border-black w-full"></div>
                                    </div>
                                ) : (
                                    <div className="border-b-[1px] border-dotted border-black w-32 h-6"></div>
                                )}
                                <div className="text-center">({admin.approvals?.hr_manager?.name || "..........................................."})</div>
                            </div>
                            <div className="text-center">วันที่ {admin.approvals?.hr_manager?.date || ".........../.........../..........."}</div>
                        </div>

                        {/* Second Row - 2 columns */}
                        <div className="border-[0.5px] border-black border-t-0 p-1.5">
                            <div className="font-bold text-center mb-1 pb-1 border-b border-black">หัวหน้าแผนก/หัวหน้างานต้นสังกัด</div>
                            <div className="flex gap-2 mb-2 justify-center">
                                <CheckBox label="อนุมัติรับ" checked={admin.approvals?.department_head?.decision === 'approved'} width="w-auto" textSize="text-[12px]" />
                                <CheckBox label="ไม่รับ" checked={admin.approvals?.department_head?.decision === 'rejected'} width="w-auto" textSize="text-[12px]" />
                            </div>
                            <div className="flex flex-col items-center gap-1 mb-1">
                                <span>ลงชื่อ</span>
                                {admin.approvals?.department_head?.signature ? (
                                    <div className="flex flex-col items-center w-32">
                                        <img src={admin.approvals.department_head.signature} alt="Signature" crossOrigin="anonymous" className="max-h-6 object-contain mb-1" />
                                        <div className="border-b-[1px] border-dotted border-black w-full"></div>
                                    </div>
                                ) : (
                                    <div className="border-b-[1px] border-dotted border-black w-32 h-6"></div>
                                )}
                                <div className="text-center">({admin.approvals?.department_head?.name || "..........................................."})</div>
                            </div>
                            <div className="text-center">วันที่ {admin.approvals?.department_head?.date || ".........../.........../..........."}</div>
                        </div>

                        <div className="border-[0.5px] border-black border-l-0 border-t-0 p-1.5 col-span-2">
                            <div className="font-bold text-center mb-1 pb-1 border-b border-black">ความเห็นกรรมการผู้อนุมัติ หรือผู้ดำเนินการกระทำแทน</div>
                            <div className="flex gap-4 mb-1 justify-start">
                                <span>ผลการพิจารณา</span>
                                <CheckBox label="ผ่าน" checked={admin.approvals?.final_decision?.result === 'passed'} width="w-auto" textSize="text-[12px]" />
                                <CheckBox label="ไม่ผ่าน" checked={admin.approvals?.final_decision?.result === 'failed'} width="w-auto" textSize="text-[12px]" />
                                <CheckBox label="รอพิจารณา" checked={admin.approvals?.final_decision?.result === 'pending'} width="w-auto" textSize="text-[12px]" />
                            </div>
                            <div className="mb-0.5">สังกัด/แผนก<DottedLine value={admin.approvals?.final_decision?.department} className="inline-block w-24 ml-1 align-middle relative top-[4px]" />รับพิจารณา ตำแหน่ง<DottedLine value={admin.approvals?.final_decision?.position} className="inline-block w-24 ml-1 align-middle relative top-[4px]" /></div>
                            <div className="mb-0.5">อัตราเงินเดือน<DottedLine value={admin.approvals?.final_decision?.salary} className="inline-block w-60 ml-1 align-middle relative top-[4px]" /></div>
                            <div>เหตุผลการพิจารณาอื่นๆ<DottedLine value={admin.approvals?.final_decision?.other_reason} className="inline-block w-60 ml-1 align-middle relative top-[4px] mb-2" /></div>
                        </div>
                    </div>

                </div>
            </PageContainer>

        </div>
    );
}