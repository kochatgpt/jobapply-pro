import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function CriminalCheckDocument({ applicant, formData = {} }) {
    const { data: settings } = useQuery({
        queryKey: ['system_settings_layout'],
        queryFn: () => base44.entities.SystemSetting.list(),
        staleTime: 1000 * 60 * 5 
    });
    
    const appLogo = settings?.find(s => s.key === 'app_logo')?.value;
    const p = applicant?.personal_data || {};
    const companyData = applicant?.criminal_check_document?.company_data || {};

    return (
        <>
        {/* Single Page - Both Documents */}
        <div 
            className="pdpa-page bg-white text-slate-900 mx-auto relative text-[14px] font-sans p-[20mm] shadow-sm print:shadow-none"
            style={{ 
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'TH Sarabun New, Sarabun, sans-serif',
                lineHeight: '1.5'
            }}
        >
            {/* Title and Date Section */}
            <div className="mb-1 relative" style={{ minHeight: '90px' }}>
                {/* Stamp Box - Absolute positioned on left */}
                <div className="absolute left-0 top-[-5px] border-2 border-slate-400 w-[180px] h-[70px] flex items-center justify-center">
                    <div className="text-center text-[12px] text-slate-500">
                        <p>ติดอากรแสตมป์</p>
                        <p>30 บาท</p>
                    </div>
                </div>
                
                {/* Title and Date */}
                <div>
                    <h1 className="text-[16px] font-bold text-center mb-4">หนังสือมอบอำนาจ</h1>
                    <div className="text-right space-y-1 absolute right-0 top-[10px]">
                        <p>
                            ทำที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 ${(companyData.companyLocation || formData.companyLocation) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((companyData.companyLocation || formData.companyLocation) && { minHeight: '1.2em' }) }}>{companyData.companyLocation || formData.companyLocation || '\u00A0'}</span>
                        </p>
                        <p>
                            วันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 ${(companyData.poaDate || formData.poaDate) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((companyData.poaDate || formData.poaDate) && { minHeight: '1.2em' }) }}>{companyData.poaDate || formData.poaDate || '\u00A0'}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-2 text-justify">
                <p>
                    ข้าพเจ้า <span className={`border-b border-dotted border-slate-400 inline-block min-w-[400px] text-center px-2 ${applicant?.full_name ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!applicant?.full_name && { minHeight: '1.2em' }) }}>{applicant?.full_name || '\u00A0'}</span> บัตรประจำตัวประชาชนเลขที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[250px] text-center px-2 ${p.id_card ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!p.id_card && { minHeight: '1.2em' }) }}>{p.id_card || '\u00A0'}</span> ออกให้โดย <span className={`border-b border-dotted border-slate-400 inline-block min-w-[320px] text-center px-2 ${formData.idIssuedBy ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.idIssuedBy && { minHeight: '1.2em' }) }}>{formData.idIssuedBy || '\u00A0'}</span> วันหมดอายุ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[130px] text-center px-2 ${formData.idExpiry ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.idExpiry && { minHeight: '1.2em' }) }}>{formData.idExpiry || '\u00A0'}</span> ขอมอบอำนาจให้บริษัท <span className={`border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center px-2 ${(companyData.companyName || formData.companyName) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((companyData.companyName || formData.companyName) && { minHeight: '1.2em' }) }}>{companyData.companyName || formData.companyName || '\u00A0'}</span> โดย <span className={`border-b border-dotted border-slate-400 inline-block min-w-[230px] text-center px-2 ${(companyData.authorizedPerson || formData.authorizedPerson) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((companyData.authorizedPerson || formData.authorizedPerson) && { minHeight: '1.2em' }) }}>{companyData.authorizedPerson || formData.authorizedPerson || '\u00A0'}</span> บัตรประจำตัวประชาชนเลขที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[190px] text-center px-2 ${(companyData.authorizedId || formData.authorizedId) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((companyData.authorizedId || formData.authorizedId) && { minHeight: '1.2em' }) }}>{companyData.authorizedId || formData.authorizedId || '\u00A0'}</span> ออกให้โดย <span className={`border-b border-dotted border-slate-400 inline-block min-w-[210px] text-center px-2 ${(companyData.authIdIssuedBy || formData.authIdIssuedBy) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((companyData.authIdIssuedBy || formData.authIdIssuedBy) && { minHeight: '1.2em' }) }}>{companyData.authIdIssuedBy || formData.authIdIssuedBy || '\u00A0'}</span> วันหมดอายุ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 ${(companyData.authIdExpiry || formData.authIdExpiry) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((companyData.authIdExpiry || formData.authIdExpiry) && { minHeight: '1.2em' }) }}>{companyData.authIdExpiry || formData.authIdExpiry || '\u00A0'}</span> ซึ่งเป็นผู้มีอำนาจลงนามผูกพันบริษัทให้กระทำการแทนในการติดต่อ ชี้แจง ยื่น ส่ง เอกสารที่เกี่ยวกับหนังสือขอตรวจสอบประวัติอาชญากรรม หนังสือยินยอมตรวจสอบประวัติอาชญากรรม และรับเอกสารผลการตรวจสอบประวัติอาชญากรรมของข้าพเจ้า กับกองทะเบียนประวัติอาชญากร สำนักงานตำรวจแห่งชาติ ตลอดจนการมอบอำนาจช่วงและดำเนินการอื่นใดในส่วนที่เกี่ยวข้องกับเรื่องดังกล่าวข้างต้นแทนข้าพเจ้าจนเสร็จการ
                </p>
                <p className="indent-8">
                    
                </p>
                <p className="indent-8">
                    ให้หนังสือมอบอำนาจฉบับนี้มีผลเริ่มใช้บังคับตั้งแต่วันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 ${(companyData.effectiveDate || formData.effectiveDate) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((companyData.effectiveDate || formData.effectiveDate) && { minHeight: '1.2em' }) }}>{companyData.effectiveDate || formData.effectiveDate || '\u00A0'}</span> เป็นต้นไป จนกว่าการดำเนินการกับเรื่องดังกล่าวข้างต้นในครั้งนี้จะเสร็จการ ซึ่งการใดๆ ที่ผู้รับมอบอำนาจได้กระทำภายใต้เงื่อนไขหนังสือมอบอำนาจฉบับนี้ ให้มีผลผูกพันผู้มอบอำนาญ เสมือนหนึ่งว่าผู้มอบอำนาจ ได้กระทำการดังกล่าวด้วยตนเองทุกประการ เพื่อเป็นหลักฐานแห่งการนี้ จึงได้ลงลายมือชื่อในหนังสือมอบอำนาจฉบับนี้ไว้ต่อหน้าพยานเป็นสำคัญ
                </p>
            </div>

            {/* Signatures */}
            <div className="mt-2 grid grid-cols-2 gap-4">
                <div className="text-center">
                    <p className="mb-0.5">
                        (ลงชื่อ) 
                        {applicant?.signature_url ? (
                            <img src={applicant.signature_url} alt="Employee signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" />
                        ) : (
                            <span className="inline-block border-b border-dotted border-slate-400 w-[140px] mx-2" style={{ minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                        )}
                        ผู้มอบอำนาจ
                    </p>
                    <p>({applicant?.full_name || '.................................'})</p>
                </div>
                <div className="text-center">
                    <p className="mb-2">
                        (ลงชื่อ) 
                        {companyData.receiverSignature ? (
                            <img src={companyData.receiverSignature} alt="Receiver signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" />
                        ) : (
                            <span className="inline-block border-b border-dotted border-slate-400 w-[140px] mx-2" style={{ minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                        )}
                        ผู้รับมอบอำนาจ
                    </p>
                    <p>({companyData.authorizedPerson || '.................................'})</p>
                </div>
            </div>

            {/* Witnesses */}
            <div className="mt-4 grid grid-cols-2 gap-8">
                <div className="text-center">
                    <p className="mb-2">
                        (ลงชื่อ) 
                        {companyData.witness1Signature ? (
                            <img src={companyData.witness1Signature} alt="Witness 1" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" />
                        ) : (
                            <span className="inline-block border-b border-dotted border-slate-400 w-[140px] mx-2" style={{ minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                        )}
                        พยาน
                    </p>
                    <p>({companyData.witnessName1 || '...................................'})</p>
                </div>
                <div className="text-center">
                    <p className="mb-2">
                        (ลงชื่อ) 
                        {companyData.witness2Signature ? (
                            <img src={companyData.witness2Signature} alt="Witness 2" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" />
                        ) : (
                            <span className="inline-block border-b border-dotted border-slate-400 w-[140px] mx-2" style={{ minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                        )}
                        พยาน
                    </p>
                    <p>({companyData.witnessName2 || '...................................'})</p>
                </div>
            </div>

            {/* Note */}
            <div className="mt-4 text-[12px]">
                <p className="font-semibold">หมายเหตุ:</p>
                <p>กรุณาเขียนให้ชัดเจน พร้อมแนบสำเนาบัตรประชาชนผู้มอบและผู้รับมอบ อย่างละ 1 ฉบับ (พร้อมรับรองสำเนาถูกต้อง) การมอบอำนาจให้มีพยานอย่างน้อย 1 คน ถ้าผู้มอบอำนาจพิมพ์ลายนิ้วมือ ต้องมีพยาน 2 คน</p>
            </div>

            {/* Divider */}
            <div className="my-6 border-t-2 border-slate-300"></div>

            {/* Title for second document */}
            <div className="mb-4">
                <h1 className="text-[16px] font-bold text-center mb-2">หนังสือยินยอมในการเข้าตรวจดูข้อมูลข่าวสารส่วนบุคคล (ประวัติอาชญากรรม)</h1>
                <h2 className="text-[14px] font-bold text-center mb-3">(ผ่านหน่วยงาน/บริษัท)</h2>
                <div className="text-right space-y-1">
                    <p>
                        ทำที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[250px] text-center px-2 ${(companyData.companyLocation || formData.companyLocation) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((companyData.companyLocation || formData.companyLocation) && { minHeight: '1.2em' }) }}>{companyData.companyLocation || formData.companyLocation || '\u00A0'}</span>
                    </p>
                    <p>
                        วันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[250px] text-center px-2 ${(companyData.consentDate || formData.consentDate) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((companyData.consentDate || formData.consentDate) && { minHeight: '1.2em' }) }}>{companyData.consentDate || formData.consentDate || '\u00A0'}</span>
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-2 text-justify">
                <p className="font-semibold">เรียน ผู้บังคับการกองทะเบียนประวัติอาชญากร</p>
                <p>
                    ข้าพเจ้า (นาย/นาง/น.ส.) <span className={`border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center px-2 ${applicant?.full_name ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!applicant?.full_name && { minHeight: '1.2em' }) }}>{applicant?.full_name || '\u00A0'}</span> บัตรประจำตัวประชาชนเลขที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 ${p.id_card ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!p.id_card && { minHeight: '1.2em' }) }}>{p.id_card || '\u00A0'}</span>
                </p>
                <p>
                    อยู่บ้านเลขที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2 ${(formData.houseNumber || p.current_address?.number) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((formData.houseNumber || p.current_address?.number) && { minHeight: '1.2em' }) }}>{formData.houseNumber || p.current_address?.number || '\u00A0'}</span> หมู่ที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[60px] text-center px-2 ${(formData.moo || p.current_address?.moo) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((formData.moo || p.current_address?.moo) && { minHeight: '1.2em' }) }}>{formData.moo || p.current_address?.moo || '\u00A0'}</span> ซอย <span className={`border-b border-dotted border-slate-400 inline-block min-w-[120px] text-center px-2 ${(formData.soi || p.current_address?.soi) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((formData.soi || p.current_address?.soi) && { minHeight: '1.2em' }) }}>{formData.soi || p.current_address?.soi || '\u00A0'}</span> ถนน <span className={`border-b border-dotted border-slate-400 inline-block min-w-[120px] text-center px-2 ${(formData.road || p.current_address?.road) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((formData.road || p.current_address?.road) && { minHeight: '1.2em' }) }}>{formData.road || p.current_address?.road || '\u00A0'}</span>
                </p>
                <p>
                    ตำบล/แขวง <span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 ${(formData.subdistrict || p.current_address?.subdistrict) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((formData.subdistrict || p.current_address?.subdistrict) && { minHeight: '1.2em' }) }}>{formData.subdistrict || p.current_address?.subdistrict || '\u00A0'}</span> อำเภอ/เขต <span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 ${(formData.district || p.current_address?.district) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((formData.district || p.current_address?.district) && { minHeight: '1.2em' }) }}>{formData.district || p.current_address?.district || '\u00A0'}</span> จังหวัด <span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 ${(formData.province || p.current_address?.province) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((formData.province || p.current_address?.province) && { minHeight: '1.2em' }) }}>{formData.province || p.current_address?.province || '\u00A0'}</span>
                </p>
                <p>
                    โทรศัพท์ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 ${p.mobile_phone ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!p.mobile_phone && { minHeight: '1.2em' }) }}>{p.mobile_phone || '\u00A0'}</span>
                </p>
                <p className="font-semibold">โดยหนังสือฉบับนี้</p>
                <p>
                    1. ข้าพเจ้ายินยอมให้ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center px-2 ${(companyData.companyName || formData.companyName) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((companyData.companyName || formData.companyName) && { minHeight: '1.2em' }) }}>{companyData.companyName || formData.companyName || '\u00A0'}</span> ซึ่งเป็นหน่วยงานของรัฐหรือบริษัทสำนักงานตั้งอยู่ที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[500px] text-center px-2 ${(companyData.companyAddress || formData.companyAddress) ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...((companyData.companyAddress || formData.companyAddress) && { minHeight: '1.2em' }) }}>{companyData.companyAddress || formData.companyAddress || '\u00A0'}</span>
                </p>
                <p className="indent-8">
                    ซึ่งเป็นหน่วยงาน ที่ข้าพเจ้าได้ขออนุญาต หรือสมัครงาน มีสิทธิ์ดำเนินการใด ๆ เข้าตรวจดูข้อมูล ข่าวสารส่วนบุคคล (ประวัติอาชญากรรม) ของข้าพเจ้าเพื่อวัตถุประสงค์ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center px-2 ${formData.purpose ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.purpose && { minHeight: '1.2em' }) }}>{formData.purpose || '\u00A0'}</span>
                </p>
                <p>
                    2. ข้าพเจ้ายินยอมให้สำนักงานตำรวจแห่งชาติ หรือสำนักงานพิสูจน์หลักฐานตำรวจ หรือ กองทะเบียนประวัติอาชญากร หรือเจ้าหน้าที่ตรวจสอบประวัติ ดำเนินการจัดเก็บข้อมูล และลายพิมพ์นิ้วมือของข้าพเจ้า รวมทั้งเปิดเผยข้อมูลของข้าพเจ้าแก่หน่วยงานของรัฐเพื่อใช้ขออนุญาต หรือสมัครงานตามอำนาจหน้าที่ของหน่วยงานของรัฐนั้น หรือบริษัทที่ข้าพเจ้าใช้สมัครงาน และดำเนินการใด ๆ ที่เกี่ยวข้องได้ ข้าพเจ้าจะไม่เรียกร้อง ร้องเรียน หรือฟ้องร้องทั้งในความผิดทางแพ่ง ทางอาญา และทางปกครอง
                </p>
                <p className="indent-8">
                    ข้าพเจ้าได้เข้าใจข้อความในหนังสือยินยอมฉบับนี้โดยตลอดแล้ว จึงได้ลงลายมือชื่อไว้เป็นหลักฐาน ณ วันเดือนปี ที่ระบุข้างต้น
                </p>
            </div>

            {/* Signature */}
            <div className="mt-8 text-center">
                <p className="mb-2">
                    (ลงชื่อ) 
                    {applicant?.signature_url ? (
                        <img src={applicant.signature_url} alt="Employee signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" />
                    ) : (
                        <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                    )}
                    ผู้ให้ความยินยอม
                </p>
                <p>({applicant?.full_name || '........................................'})</p>
            </div>

            {/* Note */}
            <div className="mt-4 text-[12px]">
                <p className="font-semibold">หมายเหตุ:</p>
                <p>กรุณากรอกรายละเอียดให้ครบทุกช่อง</p>
            </div>
        </div>
        </>
    );
}