import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Check, Loader2 } from 'lucide-react';

export default function ApplicationPreview() {
    const [searchParams] = useSearchParams();
    const applicantId = searchParams.get('applicantId');

    const { data: applicant, isLoading } = useQuery({
        queryKey: ['applicant', applicantId],
        queryFn: async () => {
            const applicants = await base44.entities.Applicant.list();
            return applicants.find(a => a.id === applicantId);
        },
        enabled: !!applicantId
    });

    const { data: settings } = useQuery({
        queryKey: ['system_settings_layout'],
        queryFn: () => base44.entities.SystemSetting.list(),
        staleTime: 1000 * 60 * 5
    });

    const appLogo = settings?.find(s => s.key === 'app_logo')?.value;

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (!applicant) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-slate-800 mb-2">ไม่พบข้อมูลผู้สมัคร</h2>
                    <p className="text-slate-500">กรุณาเลือกผู้สมัครจากหน้า Admin Dashboard</p>
                </div>
            </div>
        );
    }

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

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const CheckBox = ({ label, checked }) => (
        <div className="relative pl-5 h-4 flex items-center">
            <div className={`absolute left-0 top-2.5 w-3 h-3 border-[0.5px] border-black rounded-[1px] bg-white flex items-center justify-center`}>
                {checked && <Check className="w-2.5 h-2.5" />}
            </div>
            <span className="text-sm text-slate-900 pt-1">{label}</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 py-8" style={{ fontFamily: 'TH Sarabun New, Sarabun, sans-serif' }}>
            <div className="max-w-[210mm] mx-auto bg-white shadow-lg">
                {/* Page 1 */}
                <div className="p-8 border-b-4 border-slate-200">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        {/* HR Systems Checkboxes */}
                        <div className="border border-black p-3 text-sm space-y-1">
                            <CheckBox label="Web HR" checked={admin.hr_systems?.web_hr} />
                            <CheckBox label={`สปส.(เข้า)${admin.hr_systems?.sps_in_details || '......'}`} checked={admin.hr_systems?.sps_in} />
                            <CheckBox label="B-plus" checked={admin.hr_systems?.b_plus} />
                            <CheckBox label={`สปส.(ออก)${admin.hr_systems?.sps_out_details || '......'}`} checked={admin.hr_systems?.sps_out} />
                        </div>

                        {/* Logo and Title */}
                        <div className="flex-1 text-center">
                            {appLogo && <img src={appLogo} alt="Logo" className="h-16 mx-auto mb-2" />}
                            <h1 className="text-2xl font-bold underline">ใบสมัครงาน</h1>
                        </div>
                    </div>

                    {/* Application Date */}
                    <div className="mb-3 font-bold">
                        วันที่เขียนใบสมัครงาน: {p.application_date || "____________________"}
                    </div>

                    {/* Disclaimer */}
                    <div className="text-sm text-justify leading-snug mb-3">
                        ใบสมัครงานเป็นส่วนหนึ่งในการพิจารณา โปรดกรอกข้อความตามจริงด้วยตัวเองให้ครบถ้วน...
                    </div>

                    {/* HR Section */}
                    <div className="border border-black p-4 mb-3 rounded relative">
                        <div className="absolute -top-3 left-2 bg-white px-2 font-bold">(สำหรับ จนท.)</div>
                        <div className="grid grid-cols-3 gap-3 mb-2">
                            <div><span className="font-bold">รหัสพนักงาน:</span> {admin.hr_info?.employee_id || '-'}</div>
                            <div><span className="font-bold">วันที่เริ่มงานจริง:</span> {admin.hr_info?.actual_start_date || '-'}</div>
                            <div><span className="font-bold">หน่วยงาน/สังกัด:</span> {admin.hr_info?.department || '-'}</div>
                        </div>
                        <div className="flex gap-4 mb-2">
                            <div><span className="font-bold">ไซด์เสื้อ:</span> {admin.hr_info?.shirt_size || '-'}</div>
                            <div><span className="font-bold">จำนวน:</span> {admin.hr_info?.shirt_quantity || '-'}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                            <CheckBox label="รูปถ่าย 1-3 รูป" checked={admin.documents?.photos} />
                            <CheckBox label="สำเนาบัตรประชาชน 3 ฉบับ" checked={admin.documents?.id_card_copy} />
                            <CheckBox label="สำเนาทะเบียนบ้าน" checked={admin.documents?.house_registration} />
                            <CheckBox label="สำเนาวุฒิการศึกษา" checked={admin.documents?.education_cert} />
                            <CheckBox label="หนังสือรับรองการศึกษา" checked={admin.documents?.education_confirmation} />
                            <CheckBox label="สัญญาจ้าง" checked={admin.documents?.employment_contract} />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center font-bold text-lg my-3">ประวัติส่วนตัว</div>

                    {/* Main Info */}
                    <div className="border border-black rounded">
                        {/* Position */}
                        <div className="p-3 border-b border-black bg-slate-50">
                            <div className="flex gap-3 items-center text-base">
                                <span className="font-bold">สมัครงานในตำแหน่ง 1:</span>
                                <span className="border-b-2 border-dotted border-black flex-1 px-2">{p.position_1}</span>
                                <span className="font-bold">2:</span>
                                <span className="border-b-2 border-dotted border-black flex-1 px-2">{p.position_2}</span>
                                <span className="font-bold">อัตราเงินเดือนที่ต้องการ:</span>
                                <span className="border-b-2 border-dotted border-black w-32 px-2">{p.expected_salary}</span>
                            </div>
                        </div>

                        {/* Personal Data with Photo */}
                        <div className="p-4 grid grid-cols-12 gap-3">
                            <div className="col-span-10 space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div><span className="font-bold">ชื่อ-สกุล (ภาษาไทย):</span> {`${p.prefix || ''} ${p.first_name || ''} ${p.last_name || ''}`}</div>
                                    <div><span className="font-bold">ชื่อเล่น:</span> {p.thai_nickname}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><span className="font-bold">Name in English:</span> {p.english_name}</div>
                                    <div><span className="font-bold">เบอร์โทรศัพท์:</span> {p.mobile_phone}</div>
                                </div>
                                <div className="grid grid-cols-5 gap-2">
                                    <div><span className="font-bold">วันเกิด:</span> {formatDate(p.dob)}</div>
                                    <div><span className="font-bold">อายุ:</span> {p.age}</div>
                                    <div><span className="font-bold">ส่วนสูง:</span> {p.height}</div>
                                    <div><span className="font-bold">น้ำหนัก:</span> {p.weight}</div>
                                    <div><span className="font-bold">สัญชาติ:</span> {p.nationality}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><span className="font-bold">ศาสนา:</span> {p.religion}</div>
                                    <div><span className="font-bold">อีเมล:</span> {p.email}</div>
                                </div>
                            </div>
                            <div className="col-span-2">
                                {applicant.photo_url ? (
                                    <img src={applicant.photo_url} alt="Photo" className="w-full h-32 object-cover border border-slate-300" />
                                ) : (
                                    <div className="w-full h-32 bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-400 text-sm">รูปภาพ</div>
                                )}
                            </div>
                        </div>

                        {/* Address */}
                        <div className="border-t border-black p-4 space-y-2">
                            <div>
                                <span className="font-bold">ที่อยู่ตามทะเบียนบ้าน:</span> 
                                เลขที่ {p.registered_address?.number} หมู่ {p.registered_address?.moo} ถนน {p.registered_address?.road} 
                                ตำบล/แขวง {p.registered_address?.subdistrict} อำเภอ/เขต {p.registered_address?.district} 
                                จังหวัด {p.registered_address?.province} {p.registered_address?.zipcode}
                            </div>
                            <div>
                                <span className="font-bold">ที่อยู่ปัจจุบัน:</span> 
                                เลขที่ {p.current_address?.number} หมู่ {p.current_address?.moo} ถนน {p.current_address?.road} 
                                ตำบล/แขวง {p.current_address?.subdistrict} อำเภอ/เขต {p.current_address?.district} 
                                จังหวัด {p.current_address?.province} {p.current_address?.zipcode}
                            </div>
                        </div>

                        {/* Status */}
                        <div className="border-t border-black p-4">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <div className="font-bold underline mb-2">สถานภาพ (ชาย)</div>
                                    <div className="space-y-1">
                                        <CheckBox label="ได้รับการยกเว้นทางทหาร" checked={p.military_status === 'exempted'} />
                                        <CheckBox label="เกณฑ์ทหารแล้ว" checked={p.military_status === 'served'} />
                                        <CheckBox label="ยังไม่ได้รับการเกณฑ์" checked={p.military_status === 'not_served'} />
                                        <CheckBox label="ยังไม่สมรส" checked={f.marital_status === 'single'} />
                                        <CheckBox label="สมรสแล้ว" checked={f.marital_status === 'married'} />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold underline mb-2">สถานภาพ (หญิง)</div>
                                    <div className="space-y-1">
                                        <CheckBox label="มีบุตรแล้ว" checked={f.has_children === 'yes'} />
                                        <CheckBox label="ยังไม่มีบุตร" checked={f.has_children === 'no'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page 2 - Education & Skills */}
                <div className="p-8 border-b-4 border-slate-200">
                    <h2 className="text-center font-bold text-lg mb-4">ประวัติการศึกษา</h2>
                    <table className="w-full border-collapse text-sm mb-6">
                        <thead>
                            <tr className="bg-slate-100">
                                <th className="border border-black p-2">ระดับ</th>
                                <th className="border border-black p-2">ชื่อสถานศึกษา</th>
                                <th className="border border-black p-2">สาขาวิชา</th>
                                <th className="border border-black p-2">เริ่มปีพ.ศ.</th>
                                <th className="border border-black p-2">สำเร็จปีพ.ศ.</th>
                                <th className="border border-black p-2">เกรดเฉลี่ย</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { k: 'primary', label: 'ประถมศึกษา' },
                                { k: 'secondary', label: 'มัธยมศึกษา' },
                                { k: 'bachelor', label: 'ปริญญาตรี' }
                            ].map((row) => {
                                const ed = e.history?.[row.k] || {};
                                return (
                                    <tr key={row.k}>
                                        <td className="border border-black p-2">{row.label}</td>
                                        <td className="border border-black p-2">{ed.institute || ""}</td>
                                        <td className="border border-black p-2">{ed.major || ""}</td>
                                        <td className="border border-black p-2 text-center">{ed.start_year || ""}</td>
                                        <td className="border border-black p-2 text-center">{ed.end_year || ""}</td>
                                        <td className="border border-black p-2 text-center">{ed.gpa || ""}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <h2 className="text-center font-bold text-lg mb-4">ประวัติการทำงาน</h2>
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-slate-100">
                                <th className="border border-black p-2">ระยะเวลา</th>
                                <th className="border border-black p-2">สถานที่ทำงาน</th>
                                <th className="border border-black p-2">ตำแหน่ง</th>
                                <th className="border border-black p-2">เงินเดือนเข้า</th>
                                <th className="border border-black p-2">เงินเดือนออก</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[0, 1, 2].map((i) => {
                                const job = exp.history?.[i] || {};
                                return (
                                    <tr key={i}>
                                        <td className="border border-black p-2">{job.period || ""}</td>
                                        <td className="border border-black p-2">{job.workplace || ""}</td>
                                        <td className="border border-black p-2">{job.position || ""}</td>
                                        <td className="border border-black p-2 text-center">{job.salary_in || ""}</td>
                                        <td className="border border-black p-2 text-center">{job.salary_out || ""}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Page 3 - Declaration & Signature */}
                <div className="p-8">
                    <h2 className="text-center font-bold text-lg mb-4">คำแถลง</h2>
                    <div className="border border-black p-4 space-y-2 text-sm mb-6">
                        <div>1. ท่านสามารถปฏิบัติงานล่วงเวลาได้หรือไม่: {st.can_work_overtime === 'yes' ? '✓ ได้' : st.can_work_overtime === 'no' ? '✓ ไม่ได้' : '-'}</div>
                        <div>2. สุขภาพของท่าน: {st.health_status?.status === 'good' ? '✓ แข็งแรงสมบูรณ์' : st.health_status?.status === 'has_disease' ? `✓ มีโรคประจำตัว: ${st.health_status?.details}` : '-'}</div>
                    </div>

                    <div className="border border-black p-4 mb-6">
                        <h3 className="font-bold mb-2">ประวัติครอบครัว</h3>
                        <div className="space-y-2 text-sm">
                            <div><span className="font-bold">บิดา:</span> {par.father?.name} (อายุ {par.father?.age} ปี) อาชีพ: {par.father?.occupation}</div>
                            <div><span className="font-bold">มารดา:</span> {par.mother?.name} (อายุ {par.mother?.age} ปี) อาชีพ: {par.mother?.occupation}</div>
                        </div>
                    </div>

                    <div className="border border-black p-4">
                        <div className="text-sm text-justify mb-4">
                            ข้าพเจ้าขอรับรองว่า ข้อความดังกล่าวทั้งหมดในใบสมัครงานและเอกสารแนบนี้เป็นความจริงทุกประการ...
                        </div>
                        <div className="text-right">
                            <div className="mb-2">
                                {applicant.signature_url && (
                                    <img src={applicant.signature_url} alt="Signature" className="inline-block max-h-12 mb-2" />
                                )}
                            </div>
                            <div>ลงชื่อ _________________________ ผู้สมัคร</div>
                            <div className="mt-2">({applicant.full_name})</div>
                            <div className="mt-2">วันที่ {formatDate(applicant.signature_date)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}