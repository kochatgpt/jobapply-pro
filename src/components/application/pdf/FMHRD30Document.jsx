import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function FMHRD30Document({ applicant, formData = {} }) {
    const { data: settings } = useQuery({
        queryKey: ['system_settings_layout'],
        queryFn: () => base44.entities.SystemSetting.list(),
        staleTime: 1000 * 60 * 5 
    });
    
    const appLogo = settings?.find(s => s.key === 'app_logo')?.value;
    const personalData = applicant?.personal_data || {};

    return (
        <div 
            className="pdpa-page bg-white text-slate-900 mx-auto relative text-[16px] font-sans shadow-sm print:shadow-none"
            style={{ 
                padding: '20mm',
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'TH Sarabun New, Sarabun, sans-serif',
                lineHeight: '1.8'
            }}
        >
            {/* Header with Logo */}
            <div className="flex justify-end mb-8">
                {appLogo ? (
                    <img src={appLogo} alt="Logo" crossOrigin="anonymous" className="h-[80px] w-auto object-contain" />
                ) : (
                    <div className="h-[80px] w-[120px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">LOGO</div>
                )}
            </div>

            {/* Title */}
            <div className="text-center mb-8">
                <h1 className="text-[18px] font-bold mb-4">หนังสือยินยอมให้หักเงินเดือน</h1>
                <div className="text-right">
                    <p>
                        วันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[250px] text-center px-2 ${formData.date ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(formData.date && { minHeight: '1.2em' }) }}>{formData.date || '\u00A0'}</span>
                    </p>
                </div>
            </div>

            {/* Subject */}
            <div className="mb-6">
                <p><strong>เรื่อง</strong> ยินยอมให้หักเงินเดือนเพื่อนำส่งการตรวจประวัติอาชญากรรม</p>
            </div>

            {/* Recipient */}
            <div className="mb-6">
                <p><strong>เรียน</strong> พนักงานทุกท่าน</p>
            </div>

            {/* Employee Info */}
            <div className="mb-6 space-y-2">
                <p className="indent-8">
                    ข้าพเจ้า นาย/นาง/นางสาว/อื่นๆ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center px-2 ${applicant?.full_name ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!applicant?.full_name && { minHeight: '1.2em' }) }}>{applicant?.full_name || '\u00A0'}</span> รหัสพนักงาน <span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 ${formData.employeeId ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.employeeId && { minHeight: '1.2em' }) }}>{formData.employeeId || '\u00A0'}</span>
                </p>
                <p>
                    เป็นพนักงานประจำตำแหน่ง <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 ${(formData.position || personalData.position_1) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((formData.position || personalData.position_1) && { minHeight: '1.2em' }) }}>{formData.position || personalData.position_1 || '\u00A0'}</span> แผนก <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 ${formData.department ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.department && { minHeight: '1.2em' }) }}>{formData.department || '\u00A0'}</span> เริ่มงานเมื่อวันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 ${(formData.startDate || applicant?.start_work_date) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((formData.startDate || applicant?.start_work_date) && { minHeight: '1.2em' }) }}>{formData.startDate || (applicant?.start_work_date ? new Date(applicant.start_work_date).toLocaleDateString('th-TH') : '\u00A0')}</span>
                </p>
            </div>

            {/* Content */}
            <div className="space-y-4 text-justify">
                <p className="indent-8">
                    ข้าพเจ้าขอทำหนังสือฉบับนี้มอบไว้ให้แก่ บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด มีข้อความดังต่อไปนี้
                </p>

                <p className="indent-8">
                    ข้าพเจ้ายินยอมให้บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด หักเงินเดือนจำนวน 130 บาท เพื่อนำส่งตรวจประวัติอาชญากรรม ให้กับบริษัทฯ ดังนี้
                </p>

                <div className="ml-12 space-y-1">
                    <p>- ค่าตรวจประวัติอาชญากรรม ท่านละ 100 บาท</p>
                    <p>- หนังสือมอบอำนาจ (ค่าแสตมป์อากรท่านละ 30 บาท)</p>
                    <p>- รวมเป็นท่านละ 130 บาท ทางบริษัทจะหักจากรอบเงินเดือนแรกของพนักงาน</p>
                </div>

                <p className="indent-8">
                    หนังสือยินยอมฉบับนี้ทำขึ้นโดยความสมัครใจ และข้าพเจ้าได้ตรวจสอบข้อความและถ้อยคำในหนังสือนี้ทั้งหมดแล้ว ตรงตามเจตนารมณ์ของข้าพเจ้าทุกประการ จึงลงลายมือชื่อไว้เป็นหลักฐาน
                </p>
            </div>

            {/* Signature Section */}
            <div className="mt-16 text-center">
                <p className="mb-4">
                    (ลงชื่อ) 
                    {applicant?.signature_url ? (
                        <img src={applicant.signature_url} alt="Employee signature" crossOrigin="anonymous" className="inline-block h-[50px] object-contain mx-2" />
                    ) : (
                        <span className="inline-block border-b border-dotted border-slate-400 w-[250px] mx-2" style={{ minHeight: '50px', display: 'inline-block' }}>&nbsp;</span>
                    )}
                    ผู้ให้ความยินยอม
                </p>
                <p className="mb-2">({applicant?.full_name || '........................................'})</p>
                <p className="mb-2">
                    ตำแหน่ง <span className={`border-b border-dotted border-slate-400 inline-block min-w-[250px] text-center px-2`}>{formData.position || personalData.position_1 || '\u00A0'}</span>
                </p>
                <p>
                    วันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2`}>{formData.signatureDay || '\u00A0'}</span> เดือน <span className={`border-b border-dotted border-slate-400 inline-block min-w-[120px] text-center px-2`}>{formData.signatureMonth || '\u00A0'}</span> พ.ศ. <span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2`}>{formData.signatureYear || '\u00A0'}</span>
                </p>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] left-0 right-0 flex items-center justify-between px-[20mm]">
                <div className="flex items-center gap-2">
                    <div className="w-[50px] h-[50px] bg-slate-100 rounded"></div>
                </div>
                <div className="text-[9px] text-slate-400 text-right">
                    FM-HRD-30 Rev.02 06/02/66<br/>
                    Strategy . AI . DX . Sustainability
                </div>
            </div>
        </div>
    );
}