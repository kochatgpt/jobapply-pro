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

    return (
        <>
        <div 
            className="pdpa-page bg-white text-slate-900 mx-auto relative text-[16px] font-sans p-[20mm] shadow-sm print:shadow-none"
            style={{ 
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'TH Sarabun New, Sarabun, sans-serif'
            }}
        >
            {/* Header with Logo */}
            <div className="flex justify-end mb-8">
                {appLogo ? (
                    <img src={appLogo} alt="Logo" crossOrigin="anonymous" className="h-[60px] w-auto object-contain" />
                ) : (
                    <div className="h-[60px] w-[100px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">LOGO</div>
                )}
            </div>

            {/* Title */}
            <div className="text-center mb-6">
                <h1 className="text-[18px] font-bold mb-1">หนังสือตกลงเข้ารับการทำงานทดลองงาน</h1>
                <h2 className="text-[18px] font-bold">"หลักสูตรปฐมนิเทศพนักงานใหม่"</h2>
                <p className="text-[14px] mt-2">(ฉบับกรณีสำหรับพนักงานทำงาน)</p>
            </div>

            {/* Date */}
            <div className="mb-6 leading-[1.4] flex justify-end">
                <div>วัน <span className="border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2">{formData.day || ''}</span> 
                เดือน <span className="border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2">{formData.month || ''}</span> 
                พ.ศ. <span className="border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2">{formData.year || ''}</span>
                </div>
            </div>

            {/* Recipient */}
            <div className="mb-4 text-justify leading-[1.4]">
                <p className="indent-8">
                    ได้รับความอนุเคราะห์จากท่าน นาย/นาง/นางสาว <span className="border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center px-2">{applicant?.full_name || ''}</span> ได้รับ
                </p>
                <p>
                    การอนุมัติให้เข้ารับการทำงานกับบริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด (เลขที่ 76/00 เขตหนองแขม กรุงเทพฯ 10160 โทร. 662-860-6618 
                    FAX. 662-860-6617) ซึ่งต่อไปนี้ในสัญญานี้เรียกว่า "บริษัท"ให้เริ่มปฏิบัติงานในวันที่<span className="border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2">{formData.startDate || ''}</span> 
                    ตำแหน่ง <span className="border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2">{formData.position || ''}</span> แผนก <span className="border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2">{formData.department || ''}</span> ตกลงและ
                </p>
                <p>
                    ยินยอมเข้ารับการฝึกอบรม "หลักสูตรปฐมนิเทศพนักงานใหม่" ตามระเบียบของบริษัทฯ มีกำหนดระยะเวลาการ
                    ฝึกอบรม 3 วัน(ไม่นับรวมวันหยุด) เริ่มตั้งแต่วันที่<span className="border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2">{formData.trainingStartDate || ''}</span> ถึง วันที่<span className="border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2">{formData.trainingEndDate || ''}</span> โดยไม่ได้รับค่าจ้าง
                    หรือค่าตอบแทนใดๆ เพื่อเป็นการเตรียมความพร้อมให้กับพนักงานใหม่ก่อนเริ่มปฏิบัติงานจริง โดยการฝึกอบรมแบ่ง
                    ออกเป็น 4 หัวข้อหลัก ดังนี้
                </p>
            </div>

            {/* Terms */}
            <div className="mb-4 text-justify leading-[1.4] space-y-2">
                <div className="ml-6 space-y-1.5">
                    <p>1. ความตั้งใจจริงในการเข้าทำงาน ซึ่งพร้อมจะปฏิบัติงานตามหน้าที่ให้ดีที่สุด</p>
                    <p>2. ความเต็มใจในการเข้ารับอบรม ที่ทางบริษัทมีความจำเป็นด้านความรู้ ความเข้าใจและปฏิบัติงานอื่น</p>
                    <p>3. กรณีเลิกจ้าง เพื่อผลจากผลการปฏิบัติงานที่ไม่เป็นไปตามเกณฑ์ว่าจะต้องมีการคืนเงินค่าอบรม</p>
                    <p>4. พึงสำนึกการศีลธรรมในอันที่จะอยู่ร่วมกับองค์กร ภายใต้ประมวลจริยธรรมที่ดี ใส่ใจต่อสังคมและชุมชนอย่างสม่ำเสมอ</p>
                </div>
            </div>

            {/* Agreement Statement */}
            <div className="mb-6 text-justify leading-[1.4]">
                <p className="indent-8">
                    ข้าพเจ้าได้อ่านและเข้าใจเงื่อนไขดังกล่าวข้างต้นนี้เป็นอย่างดีแล้ว และยินดีพร้อมใจจะปฏิบัติตามข้อกำหนด ระเบียบ และเงื่อนไขการทำงานต่างๆ อันดังได้กล่าวนี้ทุกประการ โดยมิอาจปฏิเสธ คัดค้าน แก้ไขเปลี่ยนแปลงได้ทางหนึ่งทางใด ข้าพเจ้าจะทุ่มเทปฏิบัติหน้าที่อื่นใดเพราะมีศรัทธาต่อบริษัท ในทุกข้อกำหนดและยินดีรับผิดชอบหากทำผิดใดปรากฏขึ้น เป็นเหตุให้บริษัทพิจารณาสั่งเลิกจ้างได้ทันที
                </p>
            </div>

            {/* Signatures Section - Page 1 */}
            <div className="mb-6 leading-[1.4]">
                <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                        <div className="mb-2">ลงชื่อ
                            <span className="inline-block border-b border-dotted border-slate-400 w-[200px] h-[40px] mx-2"></span>
                            บริษัท/นายจ้าง
                        </div>
                        <p className="text-sm">(บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด)</p>
                        <p className="mt-2">({formData.authorizedPerson || '...................................................'})</p>
                    </div>
                    <div className="text-center">
                        <div className="mb-2">ลงชื่อ
                            {signatureUrl ? (
                                <span className="inline-block mx-2">
                                    <img src={signatureUrl} alt="Employee Signature" crossOrigin="anonymous" className="inline-block max-h-[40px] object-contain" />
                                </span>
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[200px] h-[40px] mx-2"></span>
                            )}
                            ลูกจ้าง
                        </div>
                        <p className="mt-2">({applicant?.full_name || '...................................................'})</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-19 Rev.00<br/>
                www.ko.in.th Strategy . AI . DX . Sustainability
            </div>
        </div>

        {/* Page 2 */}
        <div 
            className="pdpa-page bg-white text-slate-900 mx-auto relative text-[16px] font-sans p-[20mm] shadow-sm print:shadow-none mt-8"
            style={{ 
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'TH Sarabun New, Sarabun, sans-serif',
                pageBreakBefore: 'always'
            }}
        >
            {/* Header with Logo */}
            <div className="flex justify-end mb-8">
                {appLogo ? (
                    <img src={appLogo} alt="Logo" crossOrigin="anonymous" className="h-[60px] w-auto object-contain" />
                ) : (
                    <div className="h-[60px] w-[100px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">LOGO</div>
                )}
            </div>

            {/* HR Person Certification */}
            <div className="mb-8 text-center leading-[1.4]">
                <p className="mb-8">
                    โดย <span className="border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center px-2">{formData.hrPerson || ''}</span> กรรมการผู้มีอำนาจลงนามแทน
                </p>
            </div>

            {/* Witnesses */}
            <div className="mb-6 leading-[1.4]">
                <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                        <div className="mb-2">ลงชื่อ
                            {witness1Signature ? (
                                <span className="inline-block mx-2">
                                    <img src={witness1Signature} alt="Witness 1" crossOrigin="anonymous" className="inline-block max-h-[40px] object-contain" />
                                </span>
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[200px] h-[40px] mx-2"></span>
                            )}
                            พยาน
                        </div>
                        <p>({formData?.witnessName1 || '...................................................'})</p>
                    </div>
                    <div className="text-center">
                        <div className="mb-2">ลงชื่อ
                            {witness2Signature ? (
                                <span className="inline-block mx-2">
                                    <img src={witness2Signature} alt="Witness 2" crossOrigin="anonymous" className="inline-block max-h-[40px] object-contain" />
                                </span>
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[200px] h-[40px] mx-2"></span>
                            )}
                            พยาน
                        </div>
                        <p>({formData?.witnessName2 || '...................................................'})</p>
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