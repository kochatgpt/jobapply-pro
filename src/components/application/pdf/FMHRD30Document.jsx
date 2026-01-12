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
        <>
        {/* Page 1 */}
        <div 
            className="pdpa-page bg-white text-slate-900 mx-auto relative shadow-sm print:shadow-none"
            style={{ 
                fontSize: "12px" ,
                padding: '20mm',
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'TH Sarabun New, Sarabun, sans-serif',
                lineHeight: '1.2'
            }}
        >
            {/* Header with Logo */}
            <div className="flex justify-end mb-6">
                {appLogo ? (
                    <img src={appLogo} alt="Logo" crossOrigin="anonymous" className="h-[60px] w-auto object-contain" />
                ) : (
                    <div className="h-[60px] w-[100px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">LOGO</div>
                )}
            </div>

            {/* Title */}
            <div className="text-center mb-6">
                <h1 className="text-[14px] font-bold mb-4">การตรวจประวัติอาชญากรรม</h1>
                <div className="text-right mb-1">
                    <p>วันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 pb-1 ${formData.proclamationDate}`} style={{ verticalAlign: 'baseline', ...(!formData.proclamationDate && { minHeight: '1.2em' }) }}>{formData.proclamationDate ? new Date(formData.proclamationDate).toLocaleDateString('th-TH', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/') : '\u00A0'}</span></p>
                </div>
                <div className="text-right mb-4">
                    <p><strong>เลขที่ประกาศ:</strong> <span className={`inline-block min-w-[150px] text-center ${formData.proclamationNumber}`} style={{ verticalAlign: 'baseline', ...(!formData.proclamationNumber && { minHeight: '1.2em' }) }}>{formData.proclamationNumber || '\u00A0'}</span></p>
                </div>
            </div>

            {/* Subject */}
            <div className="mb-1">
                <p><strong>เรื่อง</strong> การตรวจประวัติอาชญากรรม</p>
            </div>

            {/* Recipient */}
            <div className="mb-4">
                <p><strong>เรียน</strong> พนักงานทุกท่าน</p>
            </div>

            {/* Content */}
            <div className="space-y-3 text-justify">
                <p className="indent-8">
                    ทางบริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด ได้มีมาตรฐานการในการตรวจสอบประวัติอาชญากรรมของพนักงานในบริษัทก่อนเริ่มงาน และพนักงานที่ปฏิบัติงานอยู่ในปัจจุบันส่งตรวจไม่น้อยกว่าปีละ 1 ครั้ง ถือเป็นกระบวนการที่สำคัญ เพื่อให้บริษัทได้มีข้อมูลที่เป็นประโยชน์เกี่ยวกับความเสี่ยงทางกฎหมายและการดำเนินงานที่มีความปลอดภัยประสิทธิภาพในการจ้างงานบุคคลในองค์กร เพื่อส่งเสริมคุณภาพ ประสิทธิภาพของการบริการหรือผลิตภัณฑ์ มาตรฐานบางประการที่เกี่ยวข้องกับการจัดการทรัพยากรมนุษย์และการบริหารจัดการธุรกิจบริษัท อีกทั้ง เพื่อให้สอดคล้องกับมาตรฐานสากล ระบบคุณภาพ นโยบายคุณภาพ อาทิ
                </p>

                {/* ISO Standards */}
                <div className="ml-6 space-y-2">
                    <p>
                        <strong>• ISO 9001</strong> มาตรฐานที่เกี่ยวข้องกับการจัดการคุณภาพของผลิตภัณฑ์หรือบริการ การตรวจสอบประวัติอาชญากรรมของพนักงานเป็นส่วนหนึ่งของการจัดการทรัพยากรมนุษย์ เพื่อให้ผลิตภัณฑ์หรือบริการมีคุณภาพ
                    </p>
                    <p>
                        <strong>• ISO 26000</strong> เน้นถึงความรับผิดชอบทางสังคมขององค์กร การตรวจสอบประวัติอาชญากรรมเป็นส่วนหนึ่งของการดูแลสังคมและความรับผิดชอบขององค์กรต่อสังคม
                    </p>
                    <p>
                        <strong>• ISO 45001</strong> เกี่ยวข้องกับการบริหารความปลอดภัยและสุขภาพทางการทำงาน การตรวจสอบประวัติอาชญากรรมอาจมีบทบาทในการประเมินความเสี่ยงและการจัดการความปลอดภัยในองค์กร
                    </p>
                </div>

                <p className="indent-8">
                    ทั้งนี้ บริษัทได้นำส่งตรวจประวัติอาชญากรรมต่อสำนักงานตำรวจแห่งชาติ โดยมีการดำเนินงานดังนี้
                </p>

                {/* Procedures */}
                <div className="space-y-3">
                    <div>
                        <p>
                            <strong>1.</strong> พนักงานสามารถตรวจประวัติอาชญากรรมได้ด้วยตนเอง และส่งผลประวัติอาชญากรรมก่อนวันเริ่มปฏิบัติงาน ช่องทางการตรวจประวัติอาชญากรรม ดังนี้
                        </p>
                        <p className="ml-8">- ลงทะเบียนออนไลน์ <a href="http://www.crd-check.com" className="underline">www.crd-check.com</a></p>
                    </div>

                    <div>
                        <p>
                            <strong>2.</strong> พนักงานท่านใดที่ไม่สะดวก ให้ทางบริษัทนำส่งตรวจประวัติอาชญากรรมได้ โดยมีค่าตรวจประวัติอาชญากรรม ดังนี้
                        </p>
                        <div className="ml-8 space-y-1">
                            <p>- ค่าตรวจประวัติอาชญากรรม ท่านละ 100 บาท</p>
                            <p>- หนังสือมอบอำนาจ (ค่าแสตมป์อากรท่านละ 30 บาท)</p>
                            <p className="font-semibold">รวมเป็นท่านละ 130 บาท ทางบริษัทจะหักจากรอบเงินเดือนแรกของพนักงาน</p>
                        </div>
                    </div>
                </div>

                <p className="font-semibold">
                    ให้มีผลบังคับใช้ ตั้งแต่ 2 มกราคม 2567 เป็นต้นไป
                </p>
            </div>

            {/* Contact and Signature - Grid Layout */}
            <div className="grid grid-cols-2 gap-8 mt-8">
                {/* Contact - Left */}
                <div className="mt-8">
                    <div>
                        <p className="font-semibold">ติดต่อสอบถามเพิ่มเติม</p>
                        <p>แผนก HRD: นางสาวณัฎฐณิชา มาวงศ์</p>
                        <p>E-mail: hr@ko.in.th</p>
                    </div>
                    
                </div>

                {/* Signature - Right */}
                <div className="text-center">
                    <p className="mt-12">จึงเรียนมาเพื่อทราบโดยทั่วกัน</p>
                    <p className="mb-6">
                        ลงชื่อ: 
                        {formData.approverSignature ? (
                            <img src={formData.approverSignature} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                        ) : (
                            <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ minHeight: '40px', display: 'inline-block', verticalAlign: 'baseline' }}>&nbsp;</span>
                        )}
                         (ผู้อนุมัติ)
                    </p>
                    <p>( <span className={`inline-block border-b border-dotted border-slate-400 min-w-[250px] text-center ${formData.approverName}`} style={{ verticalAlign: 'baseline', ...(!formData.approverName && { minHeight: '1.2em' }) }}>{formData.approverName || '\u00A0'}</span> )</p>
                    <p>{formData.approverPosition || 'กรรมการผู้จัดการ'}</p>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-30 Rev.00<br/>
                www.ko.in.th Strategy . AI . DX . Sustainability
            </div>
        </div>

        {/* Page 2 - หนังสือยินยอมให้หักเงินเดือน */}
        <div 
            className="pdpa-page bg-white text-slate-900 mx-auto relative shadow-sm print:shadow-none mt-8"
            style={{ 
                fontSize: "12px" ,
                padding: '20mm',
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'TH Sarabun New, Sarabun, sans-serif',
                lineHeight: '1.2'
            }}
        >
            {/* Header with Logo */}
            <div className="flex justify-end mb-6">
                {appLogo ? (
                    <img src={appLogo} alt="Logo" crossOrigin="anonymous" className="h-[60px] w-auto object-contain" />
                ) : (
                    <div className="h-[60px] w-[100px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">LOGO</div>
                )}
            </div>

            {/* Title */}
            <div className="text-center mb-6">
                <h1 className="text-[14px] font-bold mb-4">หนังสือยินยอมให้หักเงินเดือน</h1>
                <div className="text-right mb-4">
                    <p>วันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 pb-1 ${formData.consentLetterDate}`} style={{ verticalAlign: 'baseline', ...(!formData.consentLetterDate && { minHeight: '1.2em' }) }}>{formData.consentLetterDate ? new Date(formData.consentLetterDate).toLocaleDateString('th-TH', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/') : '\u00A0'}</span></p>
                </div>
            </div>

            {/* Subject */}
            <div className="mb-4">
                <p><strong>เรื่อง</strong> ยินยอมให้หักเงินเดือนเพื่อนำส่งการตรวจประวัติอาชญากรรม</p>
            </div>

            {/* Recipient */}
            <div className="mb-4">
                <p><strong>เรียน</strong> พนักงานทุกท่าน</p>
            </div>

            {/* Employee Information */}
            <div className="mb-4">
                <p className="mb-2">
                    ข้าพเจ้า นาย/นาง/นางสาว/อื่นๆ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center px-2 pb-1 ${applicant?.full_name}`} style={{ verticalAlign: 'baseline', ...(!applicant?.full_name && { minHeight: '1.2em' }) }}>{applicant?.full_name || '\u00A0'}</span> รหัสพนักงาน <span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 pb-1 ${formData.employeeId}`} style={{ verticalAlign: 'baseline', ...(!formData.employeeId && { minHeight: '1.2em' }) }}>{formData.employeeId || '\u00A0'}</span>
                </p>
                <p>
                    เป็นพนักงานประจำตำแหน่ง <span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 pb-1 ${formData.position || personalData.position_1}`} style={{ verticalAlign: 'baseline', ...(!formData.position && !personalData.position_1 && { minHeight: '1.2em' }) }}>{formData.position || personalData.position_1 || '\u00A0'}</span> แผนก <span className="inline-block border-b border-dotted border-slate-400 min-w-[150px] text-center">&nbsp;</span> เริ่มงานเมื่อวันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[120px] text-center px-2 pb-1 ${applicant?.start_work_date}`} style={{ verticalAlign: 'baseline', ...(!applicant?.start_work_date && { minHeight: '1.2em' }) }}>{applicant?.start_work_date ? new Date(applicant.start_work_date).toLocaleDateString('th-TH', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/') : '\u00A0'}</span>
                </p>
            </div>

            {/* Content */}
            <div className="space-y-3 text-justify">
                <p className="indent-8">
                    ข้าพเจ้าขอทำหนังสือฉบับนี้มอบไว้ให้แก่ บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด มีข้อความดังต่อไปนี้
                </p>

                <p className="indent-8">
                    ข้าพเจ้ายินยอมให้บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด หักเงินเดือนจำนวน 130 บาท เพื่อนำส่งตรวจประวัติอาชญากรรม ให้กับบริษัทฯ ดังนี้
                </p>

                <div className="ml-8 space-y-1">
                    <p>- ค่าตรวจประวัติอาชญากรรม ท่านละ 100 บาท</p>
                    <p>- หนังสือมอบอำนาจ (ค่าแสตมป์อากรท่านละ 30 บาท)</p>
                    <p>- รวมเป็นท่านละ 130 บาท ทางบริษัทจะหักจากรอบเงินเดือนแรกของพนักงาน</p>
                </div>

                <p className="indent-8 mt-4">
                    หนังสือยินยอมฉบับนี้ทำขึ้นโดยความสมัครใจ และข้าพเจ้าได้ตรวจสอบข้อความและถ้อยคำในหนังสือนี้ทั้งหมดแล้ว ตรงตามเจตนารมณ์ของข้าพเจ้าทุกประการ จึงลงลายมือชื่อไว้เป็นหลักฐาน
                </p>
            </div>

            {/* Signature */}
           <div className="mt-16">
                <div className="grid grid-cols-2 items-start">
                    {/* ซ้าย (เว้นว่าง) */}
                    <div />

                    {/* ขวา (ข้อมูลทั้งหมด) */}
                    <div className="text-end">
                    <p className="mb-2">
                        (ลงชื่อ)
                        {applicant?.signature_url ? (
                        <img
                            src={applicant.signature_url}
                            alt="Employee signature"
                            crossOrigin="anonymous"
                            className="inline-block h-[40px] object-contain mx-2 align-middle"
                        />
                        ) : (
                        <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2 min-h-[40px] align-middle">
                            &nbsp;
                        </span>
                        )}
                        ผู้ให้ความยินยอม
                    </p>

                    <p className="mb-2 text-center">
                        ({applicant?.full_name || "........................................"})
                    </p>

                    <p className="mb-2">
                        ตำแหน่ง{" "}
                        <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 pb-1 ${formData.signaturePosition}`} style={{ verticalAlign: 'baseline', ...(!formData.signaturePosition && { minHeight: '1.2em' }) }}>
                        {formData.signaturePosition || '\u00A0'}
                        </span>
                    </p>

                    <p>
                        วันที่{" "}
                        <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 pb-1 ${formData.signatureDate}`} style={{ verticalAlign: 'baseline', ...(!formData.signatureDate && { minHeight: '1.2em' }) }}>
                        {formData.signatureDate ? new Date(formData.signatureDate).toLocaleDateString('th-TH', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/') : '\u00A0'}
                        </span>
                    </p>
                    </div>
                </div>
            </div>


            {/* Footer */}
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-30 Rev.00<br/>
                www.ko.in.th Strategy . AI . DX . Sustainability
            </div>
        </div>
        </>
    );
}