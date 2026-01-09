import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function FMH19Document({ applicant, signatureUrl, signatureDate, formData = {}, witness1Signature, witness2Signature }) {
    const { data: settings } = useQuery({
        queryKey: ['system_settings_layout'],
        queryFn: () => base44.entities.SystemSetting.list(),
        staleTime: 1000 * 60 * 5 
    });
    
    const appLogo = settings?.find(s => s.key === 'app_logo')?.value;
    const p = applicant?.personal_data || {};
    const companyData = applicant?.fmhrd19_document?.company_data || {};

    // แปลง documentDate เป็น day, month, year ถ้ามี
    let displayDay = formData.day;
    let displayMonth = formData.month;
    let displayYear = formData.year;

    if (formData.documentDate && !formData.day) {
        const date = new Date(formData.documentDate);
        displayDay = date.getDate();
        displayMonth = date.toLocaleDateString('th-TH', { month: 'long' });
        displayYear = date.getFullYear() + 543;
    }

    return (
        <>
        <div 
            className="pdpa-page bg-white text-slate-900 mx-auto relative p-[20mm] shadow-sm print:shadow-none"
            style={{ 
                fontSize: '16px',
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'TH Sarabun New, Sarabun, sans-serif'
            }}
        >
            {/* Header with Logo */}
            <div className="flex justify-end mb-8">
                {appLogo ? (
                    <img src={appLogo} alt="Logo" crossOrigin="anonymous" className="h-[80px] w-auto object-contain" />
                ) : (
                    <div className="h-[60px] w-[100px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">LOGO</div>
                )}
            </div>

            {/* Title */}
            <div className="text-center mb-6">
                <h1 className="text-[18px] font-bold mb-1">บันทึกข้อตกลงเข้ารับการฝึกอบรม</h1>
                <h2 className="text-[18px] font-bold">"หลักสูตรปฐมนิเทศพนักงานใหม"</h2>
                <p className="text-[14px] mt-2">(เอกสารแนบท้ายสัญญาจ้าง)</p>
            </div>

            {/* Date */}
            <div className="mb-6 leading-[1.4] flex justify-end">
                <div>วันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[50px] text-center px-2 pb-1 ${displayDay}`} style={{ verticalAlign: 'baseline', ...(!displayDay && { minHeight: '1.2em' }) }}>{displayDay || '\u00A0'}</span> 
                เดือน <span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 pb-1 ${displayMonth}`} style={{ verticalAlign: 'baseline', ...(!displayMonth && { minHeight: '1.2em' }) }}>{displayMonth || '\u00A0'}</span> 
                พ.ศ. <span className={`border-b border-dotted border-slate-400 inline-block min-w-[50px] text-center px-2 pb-1 ${displayYear}`} style={{ verticalAlign: 'baseline', ...(!displayYear && { minHeight: '1.2em' }) }}>{displayYear || '\u00A0'}</span>
                </div>
            </div>

            {/* Recipient */}
            <div className="mb-1 text-justify leading-[1.4]">
                <p className="indent-8">
                    ข้าพเจ้า นาย/นาง/นางสาว <span className={`border-b border-dotted border-slate-400 inline-block min-w-[400px] text-center px-2 ${applicant?.full_name ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!applicant?.full_name && { minHeight: '1.2em' }) }}>{applicant?.full_name || '\u00A0'}</span>
                </p>
                <p>
                    ได้รับการว่าจ้างจาก บริษัท เค แอนด์โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด ที่ตั้งสำนักงานใหญ่ เลขที่ 15,17 ซอยกรุง 
                    ธนบุรี 4 ถนนกรุงธนบุรี แขวงบางลำภูล่าง เขตคลองสาน กรุงเทพมหานคร 10600 โทร. 662-860-6618
                    FAX. 662-860-6617 ซึ่งต่อไปนี้ในสัญญานี้เรียกว่า "บริษัท"ให้เริ่มปฏิบัติงานในวันที่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 pb-1 ${formData.startDate}`} style={{ verticalAlign: 'baseline', ...(!formData.startDate && { minHeight: '1.2em' }) }}>{formData.startDate ? new Date(formData.startDate).toLocaleDateString('th-TH') : '\u00A0'}</span> ตำแหน่ง
                    <span className={`border-b border-dotted border-slate-400 inline-block min-w-[170px] text-center px-2 pb-1 ${formData.position}`} style={{ verticalAlign: 'baseline', ...(!formData.position && { minHeight: '1.2em' }) }}>{formData.position || '\u00A0'}</span> แผนก
                    <span className={`border-b border-dotted border-slate-400 inline-block min-w-[170px] text-center px-2 pb-1 ${formData.department}`} style={{ verticalAlign: 'baseline', ...(!formData.department && { minHeight: '1.2em' }) }}>{formData.department || '\u00A0'}</span> ตกลงและ
                </p>
            </div>

            {/* Terms */}
            <div className="mb-4 text-justify leading-[1.4] space-y-2">
                <p className="indent-8">
                    ยินยอมเข้ารับการฝึกอบรม "หลักสูตรปฐมนิเทศพนักงานใหม่" ตามระเบียบของบริษัทฯมีกำหนดระยะเวลาการฝึกอบรม 3 วัน(ไม่นับรวมวันหยุด) เริ่มตั้งแต่วันที่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 pb-1 ${formData.trainingStartDate}`} style={{ verticalAlign: 'baseline', ...(!formData.trainingStartDate && { minHeight: '1.2em' }) }}>{formData.trainingStartDate ? new Date(formData.trainingStartDate).toLocaleDateString('th-TH') : '\u00A0'}</span>ถึงวันที่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 ${formData.trainingEndDate ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.trainingEndDate && { minHeight: '1.2em' }) }}>{formData.trainingEndDate ? new Date(formData.trainingEndDate).toLocaleDateString('th-TH') : '\u00A0'}</span>โดยไม่ได้รับค่าจ้างหรือค่าตอบแทนใดๆ เพื่อเป็นการเตรียมความพร้อมให้กับพนักงานใหม่ก่อนเริ่มปฏิบัติงานจริงโดยการฝึกอบรมแบ่ง
                </p>
                
                <p className="font-bold">ออกเป็น 4 หัวข้อหลัก ดังนี้</p>

                <div className="ml-6 space-y-1.5">
                    <p>1. ความรู้ทั่วไปเกี่ยวกับองค์กร หรือความรู้เกี่ยวกับสิทธิ์ต่างๆ ที่พนักงานจะได้รับ</p>
                    <p>2. ความรู้เกี่ยวกับระเบียบวินัย ข้อบังคับการทำงานและมาตรฐานการปฏิบัติงาน</p>
                    <p>3. พื้นฐานความรู้ทางเทคนิคและกระบวนการทำงานในขั้นตอนต่างๆ</p>
                    <p>4. ปัจจัยและวิธีการประเมินผลงานตามลักษณะงานแต่ละตำแหน่งเพื่อให้ผ่านทดลองงาน</p>
                </div>
            </div>

            {/* Agreement Statement */}
            <div className="mb-6 text-justify leading-[1.4]">
                <p className="indent-8">
                    ข้าพเจ้าได้อ่านรายละเอียดและยินยอมตกลงที่จะเข้ารับการฝึกอบรมหลักสูตรดังกล่าวตามระเบียบของ
                    บริษัทฯ จึงได้ลงลายมือชื่อไว้เป็นหลักฐาน หากข้าพเจ้าไม่ปฏิบัติตามระเบียบและเกิดความเสียหายแก่บริษัทฯ
                    ข้าพเจ้ายินยอมรับผิดในความเสียหายเป็นการส่วนตัวทุกประการ
                </p>
            </div>

            {/* Signatures */}
            <div className="mb-6 leading-[1.4]">
                <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                        <div className="mb-2">ลงชื่อ
                            <span className="inline-block border-b border-dotted border-slate-400 w-[155px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            บริษัท/นายจ้าง
                        </div>
                        <p>({companyData.authorizedPerson || formData.authorizedPerson || '........................................'})</p>
                    </div>
                    <div className="text-center mb-2">
                        <div className="mb-2">ลงชื่อ
                            {signatureUrl ? (
                                <span className="inline-block mx-2" style={{ verticalAlign: 'baseline' }}>
                                    <img src={signatureUrl} alt="Employee Signature" crossOrigin="anonymous" className="inline-block max-h-[40px] object-contain" />
                                </span>
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            ลูกจ้าง
                        </div>
                        <p>({applicant?.full_name || '...................................................'})</p>
                    </div>
                </div>
            </div>

            {/* HR Person Certification */}
            <div className="mb-8 text-center leading-[1.4]">
                <p className="mb-8">
                    โดย <span className={`border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center px-2 ${(companyData.hrPerson || formData.hrPerson) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((companyData.hrPerson || formData.hrPerson) && { minHeight: '1.2em' }) }}>{companyData.hrPerson || formData.hrPerson || '\u00A0'}</span> กรรมการผู้มีอำนาจลงนามแทน
                </p>
            </div>

            {/* Witnesses */}
            <div className="mb-6 leading-[1.4]">
                <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                        <div className="mb-2">ลงชื่อ
                            {witness1Signature ? (
                                <span className="inline-block mx-2" style={{ verticalAlign: 'baseline' }}>
                                    <img src={witness1Signature} alt="Witness 1" crossOrigin="anonymous" className="inline-block max-h-[40px] object-contain" />
                                </span>
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            พยาน
                        </div>
                        <p>({companyData?.witnessName1 || formData?.witnessName1 || '...................................................'})</p>
                    </div>
                    <div className="text-center">
                        <div className="mb-2">ลงชื่อ
                            {witness2Signature ? (
                                <span className="inline-block mx-2" style={{ verticalAlign: 'baseline' }}>
                                    <img src={witness2Signature} alt="Witness 2" crossOrigin="anonymous" className="inline-block max-h-[40px] object-contain" />
                                </span>
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            พยาน
                        </div>
                        <p>({companyData?.witnessName2 || formData?.witnessName2 || '...................................................'})</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-19 Rev.00<br/>
                www.ko.in.th Strategy . AI . DX . Sustainability
            </div>
        </div>
        </>
    );
}