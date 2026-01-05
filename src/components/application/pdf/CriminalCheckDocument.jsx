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
            <div className="mb-6 relative" style={{ minHeight: '120px' }}>
                {/* Stamp Box - Absolute positioned on left */}
                <div className="absolute left-0 top-0 border-2 border-slate-400 w-[180px] h-[100px] flex items-center justify-center">
                    <div className="text-center text-[12px] text-slate-500">
                        <p>ติดอากรแสตมป์</p>
                        <p>30 บาท</p>
                    </div>
                </div>
                
                {/* Title and Date */}
                <div>
                    <h1 className="text-[16px] font-bold text-center mb-4">หนังสือมอบอำนาจ</h1>
                    <div className="text-right space-y-1">
                        <p>
                            ทำที่ <span className="border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center">{companyData.companyLocation || formData.companyLocation || '\u00A0'}</span>
                        </p>
                        <p>
                            วันที่ <span className="border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center">{companyData.poaDate || formData.poaDate || '\u00A0'}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-2 text-justify">
                <p>
                    ข้าพเจ้า <span className="border-b border-dotted border-slate-400 inline-block min-w-[450px] text-center">{applicant?.full_name || '\u00A0'}</span> บัตรประจำตัวประชาชนเลขที่ <span className="border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center">{p.id_card || '\u00A0'}</span>
                </p>
                <p>
                    ออกให้โดย <span className="border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center">{formData.idIssuedBy || '\u00A0'}</span> วันหมดอายุ <span className="border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center">{formData.idExpiry || '\u00A0'}</span>
                </p>
                <p>
                    ขอมอบอำนาจให้บริษัท <span className="border-b border-dotted border-slate-400 inline-block min-w-[500px] text-center">{companyData.companyName || formData.companyName || '\u00A0'}</span>
                </p>
                <p>
                    โดย <span className="border-b border-dotted border-slate-400 inline-block min-w-[400px] text-center">{companyData.authorizedPerson || formData.authorizedPerson || '\u00A0'}</span> บัตรประจำตัวประชาชนเลขที่ <span className="border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center">{companyData.authorizedId || formData.authorizedId || '\u00A0'}</span>
                </p>
                <p>
                    ออกให้โดย <span className="border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center">{companyData.authIdIssuedBy || formData.authIdIssuedBy || '\u00A0'}</span> วันหมดอายุ <span className="border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center">{companyData.authIdExpiry || formData.authIdExpiry || '\u00A0'}</span> ซึ่งเป็นผู้มีอำนาจลงนามผูกพันบริษัท
                </p>
                <p className="indent-8">
                    ให้กระทำการแทน ในการติดต่อ ชี้แจง ยื่น ส่ง เอกสารที่เกี่ยวกับหนังสือขอตรวจสอบประวัติอาชญากรรม หนังสือยินยอมตรวจสอบประวัติอาชญากรรม และรับเอกสารผลการตรวจสอบประวัติอาชญากรรมของข้าพเจ้า กับกองทะเบียนประวัติอาชญากร สำนักงานตำรวจแห่งชาติ ตลอดจนการมอบอำนาจช่วง และดำเนินการอื่นใดในส่วนที่เกี่ยวข้องกับเรื่องดังกล่าวข้างต้นแทนข้าพเจ้าจนเสร็จการ
                </p>
                <p className="indent-8">
                    ให้หนังสือมอบอำนาจฉบับนี้มีผลเริ่มใช้บังคับตั้งแต่วันที่ <span className="border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center">{companyData.effectiveDate || formData.effectiveDate || '\u00A0'}</span> เป็นต้นไป จนกว่าการดำเนินการกับเรื่องดังกล่าวข้างต้นในครั้งนี้จะเสร็จการ ซึ่งการใดๆ ที่ผู้รับมอบอำนาจได้กระทำภายใต้เงื่อนไขหนังสือมอบอำนาจฉบับนี้ ให้มีผลผูกพันผู้มอบอำนาญ เสมือนหนึ่งว่าผู้มอบอำนาจ ได้กระทำการดังกล่าวด้วยตนเองทุกประการ เพื่อเป็นหลักฐานแห่งการนี้ จึงได้ลงลายมือชื่อในหนังสือมอบอำนาจฉบับนี้ไว้ต่อหน้าพยานเป็นสำคัญ
                </p>
            </div>

            {/* Signatures */}
            <div className="mt-8 grid grid-cols-2 gap-8">
                <div className="text-center">
                    <p className="mb-2">
                        (ลงชื่อ) 
                        {applicant?.signature_url ? (
                            <img src={applicant.signature_url} alt="Employee signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" />
                        ) : (
                            <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                        )}
                        ผู้มอบอำนาจ
                    </p>
                    <p>({applicant?.full_name || '........................................'})</p>
                </div>
                <div className="text-center">
                    <p className="mb-2">
                        (ลงชื่อ) 
                        {companyData.receiverSignature ? (
                            <img src={companyData.receiverSignature} alt="Receiver signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" />
                        ) : (
                            <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                        )}
                        ผู้รับมอบอำนาจ
                    </p>
                    <p>({companyData.authorizedPerson || '........................................'})</p>
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
                            <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                        )}
                        พยาน
                    </p>
                    <p>({companyData.witnessName1 || '........................................'})</p>
                </div>
                <div className="text-center">
                    <p className="mb-2">
                        (ลงชื่อ) 
                        {companyData.witness2Signature ? (
                            <img src={companyData.witness2Signature} alt="Witness 2" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" />
                        ) : (
                            <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                        )}
                        พยาน
                    </p>
                    <p>({companyData.witnessName2 || '........................................'})</p>
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
                        ทำที่ <span className="border-b border-dotted border-slate-400 inline-block min-w-[250px] text-center">{companyData.companyLocation || formData.companyLocation || '\u00A0'}</span>
                    </p>
                    <p>
                        วันที่ <span className="border-b border-dotted border-slate-400 inline-block min-w-[250px] text-center">{companyData.consentDate || formData.consentDate || '\u00A0'}</span>
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-2 text-justify">
                <p className="font-semibold">เรียน ผู้บังคับการกองทะเบียนประวัติอาชญากร</p>
                <p>
                    ข้าพเจ้า (นาย/นาง/น.ส.) <span className="border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center">{applicant?.full_name || '\u00A0'}</span> บัตรประจำตัวประชาชนเลขที่ <span className="border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center">{p.id_card || '\u00A0'}</span>
                </p>
                <p>
                    อยู่บ้านเลขที่ <span className="border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center">{formData.houseNumber || p.current_address?.number || '\u00A0'}</span> หมู่ที่ <span className="border-b border-dotted border-slate-400 inline-block min-w-[60px] text-center">{formData.moo || p.current_address?.moo || '\u00A0'}</span> ซอย <span className="border-b border-dotted border-slate-400 inline-block min-w-[120px] text-center">{formData.soi || p.current_address?.soi || '\u00A0'}</span> ถนน <span className="border-b border-dotted border-slate-400 inline-block min-w-[120px] text-center">{formData.road || p.current_address?.road || '\u00A0'}</span>
                </p>
                <p>
                    ตำบล/แขวง <span className="border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center">{formData.subdistrict || p.current_address?.subdistrict || '\u00A0'}</span> อำเภอ/เขต <span className="border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center">{formData.district || p.current_address?.district || '\u00A0'}</span> จังหวัด <span className="border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center">{formData.province || p.current_address?.province || '\u00A0'}</span>
                </p>
                <p>
                    โทรศัพท์ <span className="border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center">{p.mobile_phone || '\u00A0'}</span>
                </p>
                <p className="font-semibold">โดยหนังสือฉบับนี้</p>
                <p>
                    1. ข้าพเจ้ายินยอมให้ <span className="border-b border-dotted border-slate-400 inline-block min-w-[400px] text-center">{companyData.companyName || formData.companyName || '\u00A0'}</span> ซึ่งเป็นหน่วยงานของรัฐ หรือบริษัท สำนักงานตั้งอยู่ที่ <span className="border-b border-dotted border-slate-400 inline-block min-w-[500px] text-center">{companyData.companyAddress || formData.companyAddress || '\u00A0'}</span>
                </p>
                <p className="indent-8">
                    ซึ่งเป็นหน่วยงาน ที่ข้าพเจ้าได้ขออนุญาต หรือสมัครงาน มีสิทธิ์ดำเนินการใด ๆ เข้าตรวจดูข้อมูล ข่าวสารส่วนบุคคล (ประวัติอาชญากรรม) ของข้าพเจ้าเพื่อวัตถุประสงค์ <span className="border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center">{formData.purpose || '\u00A0'}</span>
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