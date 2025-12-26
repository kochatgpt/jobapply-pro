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
                <h1 className="text-[18px] font-bold mb-1">หนังสือตกลงเข้ารับการทำเรียกอบรม</h1>
                <h2 className="text-[18px] font-bold">"หลักสูตรปฐมนิเทศพนักงานใหม่"</h2>
                <p className="text-[14px] mt-2">(แบบคำขอแบบหนึ่งฉบับสูตร 14 ข้อ)</p>
            </div>

            {/* Date */}
            <div className="mb-6 leading-[1.4] flex justify-end">
                <div>วันที่ <span className="border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2">{formData.day || ''}</span> 
                เดือน <span className="border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2">{formData.month || ''}</span> 
                พ.ศ. <span className="border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2">{formData.year || ''}</span>
                </div>
            </div>

            {/* Recipient */}
            <div className="mb-4 text-justify leading-[1.4]">
                <p className="indent-8">
                    ข้าพเจ้า นาย/นาง/นางสาว <span className="border-b border-dotted border-slate-400 inline-block min-w-[400px] text-center px-2">{applicant?.full_name || ''}</span> ได้รับ
                </p>
                <p>
                    การอนุมัติจากผู้มีอำนาจของหน่วยงาน/หน่วยทำงานของข้าพเจ้าให้เข้ารับการทำเรียกอบรมตามหลักสูตร 15 ท่วงมา 
                    คอร์ซ0 ชั่วโมงทำงานต่อหน้าท่านผู้ควบคุมของหน่วยงานหรือหน่วยทำงานของข้าพเจ้าตามข้อ 7600 โดย 662-860-6618 
                    FAX: 662-860-6617 โดยไม่มีในปัญญาการบริหารการจับงาน "บริษัทไข่เปิด" หรือจนถึงใน ความรับผิดชอบ
                    <span className="border-b border-dotted border-slate-400 inline-block min-w-[250px] text-center px-2">{formData.position || ''}</span> แผ่นงาน
                    <span className="border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2">{formData.department || ''}</span>
                </p>
            </div>

            {/* Terms */}
            <div className="mb-4 text-justify leading-[1.4] space-y-2">
                <p className="indent-8">
                    ตระหนักและเข้าข้อเปลี่ยนแปลงอบรมดำเนินการขัดในความรับผิดชอบของผู้จัดเองฝังผู้อำนวยความรู้จักดีในอบรม ต้องเหนื่อยต่างเหนื่อยด้วยใจศรัทธาแล้ว เพื่อให้บรรดาความรู้ความข่าวและเทคโนโลยีใหม่ทางได้ทำงานยังบริหารข้อมาบางใน งงเงียงถังหรือผู้งงทางหลักษกร่วมมำสุลยเบราฟอกอยล์ในทุลก่านบางหลังอคทักจากใจต่างข้างด้วยบงคปร้องย้อนด้วยทับยวดใจบวง
                </p>
                
                <p className="font-bold">ข้าพเจ้าได้อ่านเระบบสรุปและเกณฑุณะดังนี้</p>

                <div className="ml-6 space-y-1.5">
                    <p>1. ความสนใจในเรียบรับครงของสถิ พัฒนามาครุยหงสัปดกัตพัฒนา 4 ทุปหสกงและ อย่าปหนาก</p>
                    <p>2. ความตุ้นในการต้นเปลี่ยงอนื่อง ที่ให้ ร้องได้ฐาประกอบการทัปคำอนหลายการงานอาหกรการปปฏิบัติฐกอน</p>
                    <p>3. กรึกษกอนรันเว็บสะดับปรัทแบบปรันกรณ์ทั้งการกำฒนการวก้าทมุงทั้งแกน</p>
                    <p>4. ปัจนแจับจริงการคอบอันแผนการบากจัดนับสผลุกแผยเพิดับพิดำให้ใครมาพครงงาน</p>
                </div>
            </div>

            {/* Agreement Statement */}
            <div className="mb-6 text-justify leading-[1.4]">
                <p className="indent-8">
                    ข้าพเจ้าได้อ่านและระบบสรุปดันมขับตรงตังนี้และยกีแปร็จปทการใจทับการคับจับครงมาระวายอย่นระตถหินถังดัคุปจัตจตจนี้ 
                    ปจัปแบบยรกรขับแผยแบบจัดเหบครบอันแผยฐิตงรังคับย์ะ องปรมาจัดดำเนับการอ้อแผยปครงวการตถกกจัตังด์้กทั้งกรณ์ตับันจับไซหทัปะทัครันยขอ 
                    ปถทกรับปันยินอันยัถุภกจปริ์บุควดับปวส์ตูป์ท์งกรงทันพับแผยจันดังตใจจักปทบับดัตใดปราก์กรแผยชุอปขับจัท เย็ยจับตงดันจับรัถ
                </p>
            </div>

            {/* Certification */}
            <div className="mb-4 text-center leading-[1.4]">
                <p className="mb-2">
                    ลงช่อ
                    {signatureUrl ? (
                        <span className="inline-block mx-2">
                            <img src={signatureUrl} alt="Signature" crossOrigin="anonymous" className="inline-block max-h-[50px] object-contain" />
                        </span>
                    ) : (
                        <span className="inline-block border-b border-dotted border-slate-400 w-[300px] h-[50px] mx-2"></span>
                    )}
                    ปรัมปณ์์ปถบำกรพูตต์นประมัตัมนถกูต
                </p>
                <p className="mt-2">
                    ลงท์อ <span className="border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center px-2"></span> กำร์บักปัตนับบกล้บถ็ถปรคับตักรับบาระฐัตดำร์
                </p>
            </div>

            {/* Witnesses */}
            <div className="mt-8">
                <p className="text-center mb-4">(ปจปันตัน จำแนณพีด โอ อันดำกลันปม แน้พตัล ครบถ์กรถดัปดำ ค์ำกใคฎ์)</p>
                
                <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                        <div className="mb-2">ลงช่อ
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
                        <div className="mb-2">ลงช่อ
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
    );
}