import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Check, Square } from 'lucide-react';

export default function PDFLayout({ applicant }) {
    const { data: settings } = useQuery({
        queryKey: ['system_settings_pdf'],
        queryFn: () => base44.entities.SystemSetting.list(),
        staleTime: 1000 * 60 * 5 
    });
    
    const appLogo = settings?.find(s => s.key === 'app_logo')?.value;
    const p = applicant.personal_data || {};
    const f = applicant.family_data || {};
    const e = applicant.education_data || {};
    const s = applicant.skills_data || {};
    const w = applicant.experience_data || {};
    const h = applicant.health_data || {};
    const st = applicant.statement_data || {};
    const parents = applicant.parents_data || {};
    const referral = applicant.referral_data || {};

    // --- Helpers ---
    const Field = ({ label, value, className = "", fullWidth = false }) => (
        <div className={`flex flex-col ${className} ${fullWidth ? 'w-full' : ''}`}>
            <div className="flex items-end text-[12px] leading-tight">
                <span className="font-semibold text-slate-700 mr-2 whitespace-nowrap">{label}:</span>
                <span className="flex-1 border-b border-slate-300 text-slate-900 px-1 pb-0.5 min-h-[18px]">
                    {value || "-"}
                </span>
            </div>
        </div>
    );

    const CheckBox = ({ label, checked }) => (
        <div className="flex items-center gap-1.5 min-w-fit">
            <div className={`w-3.5 h-3.5 border border-slate-400 rounded-sm flex items-center justify-center ${checked ? 'bg-slate-800 border-slate-800' : 'bg-white'}`}>
                {checked && <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />}
            </div>
            <span className="text-[12px] text-slate-700 pt-0.5">{label}</span>
        </div>
    );

    const SectionHeader = ({ title }) => (
        <div className="bg-slate-100 border-l-4 border-slate-800 px-2 py-1 mt-4 mb-2 page-break-avoid">
            <h3 className="text-[14px] font-bold text-slate-800 uppercase tracking-wide">{title}</h3>
        </div>
    );

    const TableHeader = ({ children }) => (
        <th className="border border-slate-300 bg-slate-50 px-2 py-1 text-[11px] font-bold text-slate-700 text-center">{children}</th>
    );

    const TableCell = ({ children, className = "" }) => (
        <td className={`border border-slate-300 px-2 py-1 text-[11px] text-slate-900 ${className}`}>{children || "-"}</td>
    );

    return (
        <div 
            className="bg-white text-slate-900 p-[10mm] mx-auto shadow-2xl"
            style={{ 
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'Sarabun, sans-serif'
            }}
        >
            {/* --- Header --- */}
            <div className="flex justify-between items-start mb-4 border-b-2 border-slate-800 pb-4">
                <div className="flex items-center gap-4">
                    {appLogo ? (
                        <img src={appLogo} alt="Logo" className="h-16 w-auto object-contain" />
                    ) : (
                        <div className="h-16 w-16 bg-slate-100 rounded flex items-center justify-center text-xs text-slate-400">
                            NO LOGO
                        </div>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">ใบสมัครงาน</h1>
                        <p className="text-slate-500 text-sm font-medium tracking-wider uppercase">Employment Application</p>
                    </div>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                    <div className="border-2 border-slate-200 rounded p-1 w-[2.5cm] h-[3.2cm] flex items-center justify-center bg-slate-50">
                        {applicant.photo_url ? (
                            <img src={applicant.photo_url} alt="Applicant" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-xs text-slate-300">รูปถ่าย 1 นิ้ว</span>
                        )}
                    </div>
                </div>
            </div>

            {/* --- Application Info --- */}
            <div className="grid grid-cols-3 gap-x-6 gap-y-3 mb-4 bg-slate-50 p-3 rounded border border-slate-100 text-[12px]">
                <Field label="วันที่เขียนใบสมัคร" value={p.application_date} />
                <Field label="ตำแหน่งที่ 1" value={p.position_1} />
                <Field label="เงินเดือนที่ต้องการ" value={p.expected_salary} />
                <Field label="ตำแหน่งที่ 2" value={p.position_2} className="col-start-2" />
            </div>

            {/* --- 1. Personal Details --- */}
            <SectionHeader title="1. ประวัติส่วนตัว (Personal Details)" />
            <div className="grid grid-cols-12 gap-x-4 gap-y-3 mb-4">
                <div className="col-span-6 flex gap-2">
                     <Field label="ชื่อ-สกุล (ไทย)" value={`${p.prefix || ''} ${p.first_name || ''} ${p.last_name || ''}`} className="flex-1" />
                     <Field label="ชื่อเล่น" value={p.thai_nickname} className="w-20" />
                </div>
                <div className="col-span-6">
                    <Field label="Name (English)" value={p.english_name} fullWidth />
                </div>

                <div className="col-span-4"><Field label="เลขบัตรประชาชน" value={p.id_card} fullWidth /></div>
                <div className="col-span-3"><Field label="วันเกิด" value={p.dob} fullWidth /></div>
                <div className="col-span-2"><Field label="อายุ" value={p.age} fullWidth /></div>
                <div className="col-span-3 flex gap-2">
                    <Field label="ส่วนสูง" value={p.height} className="flex-1" />
                    <Field label="น้ำหนัก" value={p.weight} className="flex-1" />
                </div>

                <div className="col-span-3"><Field label="เชื้อชาติ" value={p.race} fullWidth /></div>
                <div className="col-span-3"><Field label="สัญชาติ" value={p.nationality} fullWidth /></div>
                <div className="col-span-3"><Field label="ศาสนา" value={p.religion} fullWidth /></div>
                <div className="col-span-3"><Field label="สถานะการบวช" value={p.ordination_status === 'ordained' ? 'บวชแล้ว' : 'ยังไม่บวช'} fullWidth /></div>
            </div>

            {/* --- Contact Info --- */}
            <div className="mb-4 space-y-3">
                <div className="grid grid-cols-2 gap-6">
                    <Field label="เบอร์โทรศัพท์มือถือ" value={p.mobile_phone} fullWidth />
                    <Field label="อีเมล" value={p.email} fullWidth />
                </div>
                
                <div className="space-y-2 text-[12px]">
                    <div className="flex gap-2 items-start">
                        <span className="font-semibold text-slate-700 whitespace-nowrap w-28 pt-0.5">ที่อยู่ตามทะเบียนบ้าน:</span>
                        <span className="flex-1 border-b border-slate-300 pb-0.5 leading-snug">
                            {p.registered_address ? 
                                `เลขที่ ${p.registered_address.number || '-'} หมู่ ${p.registered_address.moo || '-'} ถนน ${p.registered_address.road || '-'} 
                                แขวง/ตำบล ${p.registered_address.subdistrict || '-'} เขต/อำเภอ ${p.registered_address.district || '-'} 
                                จังหวัด ${p.registered_address.province || '-'} ${p.registered_address.zipcode || '-'}`
                                : '-'
                            }
                        </span>
                    </div>
                    <div className="flex gap-2 items-start">
                        <span className="font-semibold text-slate-700 whitespace-nowrap w-28 pt-0.5">ที่อยู่ปัจจุบัน:</span>
                        <span className="flex-1 border-b border-slate-300 pb-0.5 leading-snug">
                            {p.current_address ? 
                                `เลขที่ ${p.current_address.number || '-'} หมู่ ${p.current_address.moo || '-'} ถนน ${p.current_address.road || '-'} 
                                แขวง/ตำบล ${p.current_address.subdistrict || '-'} เขต/อำเภอ ${p.current_address.district || '-'} 
                                จังหวัด ${p.current_address.province || '-'} ${p.current_address.zipcode || '-'}`
                                : '-'
                            }
                        </span>
                    </div>
                </div>
            </div>

            {/* --- 2. Family Status (Columns) --- */}
            <SectionHeader title="2. สถานภาพครอบครัว (Family Status)" />
            <div className="border border-slate-200 rounded p-4 mb-4">
                <div className="grid grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-4">
                        <div>
                            <div className="font-bold text-[13px] text-slate-800 mb-2 border-b border-slate-100 pb-1">การเกณฑ์ทหาร (สำหรับชาย)</div>
                            <div className="grid grid-cols-2 gap-2">
                                <CheckBox label="ได้รับการยกเว้น" checked={p.military_status === 'exempted'} />
                                <CheckBox label="เกณฑ์ทหารแล้ว" checked={p.military_status === 'served'} />
                                <CheckBox label="ยังไม่ได้รับการเกณฑ์" checked={p.military_status === 'not_served'} />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold text-[13px] text-slate-800 mb-2 border-b border-slate-100 pb-1">สถานภาพสมรส</div>
                            <div className="grid grid-cols-2 gap-2">
                                <CheckBox label="โสด" checked={f.marital_status === 'single'} />
                                <CheckBox label="สมรส" checked={f.marital_status === 'married'} />
                                <CheckBox label="หย่าร้าง" checked={f.marital_status === 'divorced'} />
                                <CheckBox label="หม้าย" checked={f.marital_status === 'widowed'} />
                            </div>
                        </div>
                    </div>
                    {/* Right Column */}
                    <div className="space-y-4">
                        <div>
                            <div className="font-bold text-[13px] text-slate-800 mb-2 border-b border-slate-100 pb-1">สถานภาพ (สำหรับหญิง)</div>
                            <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <CheckBox label="ไม่อยู่ระหว่างการตั้งครรภ์" />
                                    <CheckBox label="อยู่ระหว่างการตั้งครรภ์" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="font-bold text-[13px] text-slate-800 mb-2 border-b border-slate-100 pb-1">บุตร-ธิดา</div>
                            <div className="grid grid-cols-2 gap-2 mb-2">
                                <CheckBox label="ไม่มีบุตร" checked={f.has_children === 'no'} />
                                <CheckBox label="มีบุตร" checked={f.has_children === 'yes'} />
                            </div>
                            {f.has_children === 'yes' && (
                                <div className="text-[12px] text-slate-600 pl-6">
                                    จำนวน <span className="border-b border-slate-300 px-2 text-slate-900 mx-1">{f.children_count || '-'}</span> คน
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Family Details Table --- */}
             <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-4">
                <Field label="ชื่อบิดา" value={parents.father?.name} />
                <Field label="อาชีพ" value={parents.father?.occupation} />
                <Field label="ชื่อมารดา" value={parents.mother?.name} />
                <Field label="อาชีพ" value={parents.mother?.occupation} />
                <Field label="ชื่อคู่สมรส" value={f.spouse_name} />
                <Field label="อาชีพ" value={f.spouse_occupation} />
                <div className="col-span-2">
                     <Field label="สถานที่ทำงานคู่สมรส" value={`${f.spouse_workplace || ''} ${f.spouse_phone ? `(โทร: ${f.spouse_phone})` : ''}`} fullWidth />
                </div>
                <Field label="จำนวนพี่น้อง" value={`${parents.siblings_count || '-'} คน`} />
                <Field label="เป็นบุตรคนที่" value={parents.birth_order} />
            </div>


            {/* --- 3. Education --- */}
            <SectionHeader title="3. ประวัติการศึกษา (Education)" />
            <table className="w-full border-collapse border border-slate-300 mb-4">
                <thead>
                    <tr>
                        <TableHeader>ระดับการศึกษา</TableHeader>
                        <TableHeader>ชื่อสถานศึกษา</TableHeader>
                        <TableHeader>สาขาวิชา / วุฒิที่ได้รับ</TableHeader>
                        <TableHeader>ปีที่เริ่ม - จบ</TableHeader>
                        <TableHeader>เกรดเฉลี่ย</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {['primary', 'secondary', 'vocational', 'diploma', 'bachelor'].map((level) => {
                        const edu = e.history?.[level] || {};
                        const labelMap = {
                            primary: 'ประถมศึกษา', secondary: 'มัธยมศึกษา', vocational: 'ปวช.', 
                            diploma: 'ปวส.', bachelor: 'ปริญญาตรี', master: 'ปริญญาโท'
                        };
                        return (
                            <tr key={level}>
                                <TableCell className="font-medium bg-slate-50">{labelMap[level] || level}</TableCell>
                                <TableCell>{edu.institute}</TableCell>
                                <TableCell>{edu.major}</TableCell>
                                <TableCell>{edu.start_year && edu.end_year ? `${edu.start_year} - ${edu.end_year}` : '-'}</TableCell>
                                <TableCell className="text-center">{edu.gpa}</TableCell>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* --- 4. Work Experience --- */}
            <SectionHeader title="4. ประวัติการทำงาน (Work Experience)" />
            <table className="w-full border-collapse border border-slate-300 mb-4">
                <thead>
                    <tr>
                        <TableHeader>ระยะเวลา (ด/ป)</TableHeader>
                        <TableHeader>สถานที่ทำงาน</TableHeader>
                        <TableHeader>ตำแหน่ง</TableHeader>
                        <TableHeader>เงินเดือน</TableHeader>
                        <TableHeader>สาเหตุที่ออก</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {w.history && w.history.length > 0 ? (
                        w.history.map((job, i) => (
                            <tr key={i}>
                                <TableCell>{job.period}</TableCell>
                                <TableCell>{job.workplace}</TableCell>
                                <TableCell>{job.position}</TableCell>
                                <TableCell className="text-center">{job.salary_out}</TableCell>
                                <TableCell>{job.reason}</TableCell>
                            </tr>
                        ))
                    ) : (
                        <tr><TableCell className="text-center text-slate-400 py-4" colSpan={5}>ไม่มีข้อมูลประวัติการทำงาน</TableCell></tr>
                    )}
                </tbody>
            </table>

            {/* --- 5. Skills --- */}
            <SectionHeader title="5. ความสามารถพิเศษ (Skills)" />
            <div className="grid grid-cols-2 gap-6 mb-4">
                <div className="border border-slate-200 rounded p-3">
                    <h4 className="font-bold text-[12px] mb-2 underline">ภาษา (Language)</h4>
                    <div className="space-y-1 text-[12px]">
                        <div className="flex justify-between">
                            <span>อังกฤษ (English):</span>
                            <span className="font-medium">{s.languages?.english || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>จีน (Chinese):</span>
                            <span className="font-medium">{s.languages?.chinese || '-'}</span>
                        </div>
                         <div className="flex justify-between">
                            <span>อื่นๆ (Other):</span>
                            <span className="font-medium">{s.languages?.other_name ? `${s.languages.other_name} (${s.languages.other_level})` : '-'}</span>
                        </div>
                    </div>
                </div>
                <div className="border border-slate-200 rounded p-3">
                     <h4 className="font-bold text-[12px] mb-2 underline">ความสามารถอื่นๆ (Others)</h4>
                     <div className="grid grid-cols-2 gap-2">
                        <CheckBox label="พิมพ์ดีดไทย" checked={s.office?.typewriter_thai} />
                        <CheckBox label="พิมพ์ดีดอังกฤษ" checked={s.office?.typewriter_eng} />
                        <CheckBox label="คอมพิวเตอร์" checked={s.office?.computer} />
                        <CheckBox label="ขับรถยนต์" checked={s.driving?.car} />
                        <CheckBox label="ขับมอเตอร์ไซค์" checked={s.driving?.motorcycle} />
                        <CheckBox label="มีใบขับขี่" checked={s.driving?.car || s.driving?.motorcycle} />
                     </div>
                </div>
            </div>

            {/* --- 6. Health & General Info --- */}
            <SectionHeader title="6. ข้อมูลทั่วไปและสุขภาพ (General & Health)" />
            <div className="space-y-2 text-[12px] mb-6">
                 <div className="flex gap-4">
                    <span className="font-semibold w-40 shrink-0">โรคประจำตัว:</span>
                    <span className="border-b border-slate-300 flex-1">{h.diseases || 'ไม่มี'}</span>
                 </div>
                 <div className="flex gap-4">
                    <span className="font-semibold w-40 shrink-0">ประวัติอาชญากรรม:</span>
                    <span className="border-b border-slate-300 flex-1">{st.has_legal_cases === 'ever' ? `เคย (${st.has_legal_cases_details})` : 'ไม่เคย'}</span>
                 </div>
                 <div className="flex gap-4">
                    <span className="font-semibold w-40 shrink-0">บุคคลอ้างอิง:</span>
                    <span className="border-b border-slate-300 flex-1">
                        {referral.referred_by ? `${referral.referred_by} (${referral.referred_by_relationship})` : '-'}
                    </span>
                 </div>
                 <div className="flex gap-4">
                    <span className="font-semibold w-40 shrink-0">ผู้ติดต่อฉุกเฉิน:</span>
                    <span className="border-b border-slate-300 flex-1">
                        {applicant.emergency_contacts?.[0] ? 
                            `${applicant.emergency_contacts[0].name} (${applicant.emergency_contacts[0].relationship}) โทร: ${applicant.emergency_contacts[0].phone}` 
                            : '-'}
                    </span>
                 </div>
            </div>

            {/* --- Signature --- */}
            <div className="grid grid-cols-2 gap-10 mt-8">
                 <div className="text-center">
                    <div className="h-16 border-b border-dotted border-slate-400 mb-2 flex items-end justify-center">
                         {applicant.signature_url && <img src={applicant.signature_url} className="h-14 object-contain" alt="Signature" />}
                    </div>
                    <div className="text-[12px] font-medium">({applicant.full_name})</div>
                    <div className="text-[11px] text-slate-500">ผู้สมัคร (Applicant)</div>
                    <div className="text-[11px] text-slate-500 mt-1">วันที่: {applicant.signature_date}</div>
                 </div>
                 <div className="text-center">
                    <div className="h-16 border-b border-dotted border-slate-400 mb-2"></div>
                    <div className="text-[12px] font-medium">(เจ้าหน้าที่ฝ่ายบุคคล)</div>
                    <div className="text-[11px] text-slate-500">ผู้สัมภาษณ์ (Interviewer)</div>
                     <div className="text-[11px] text-slate-500 mt-1">วันที่: ______/______/______</div>
                 </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex justify-between text-[10px] text-slate-400">
                <span>Ref: {applicant.id}</span>
                <span>Generated via JobPortal System</span>
            </div>
        </div>
    );
}