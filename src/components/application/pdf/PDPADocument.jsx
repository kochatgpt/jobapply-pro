import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function PDPADocument({ applicant, signatureUrl, signatureDate, formData = {} }) {
    const { data: settings } = useQuery({
        queryKey: ['system_settings_layout'],
        queryFn: () => base44.entities.SystemSetting.list(),
        staleTime: 1000 * 60 * 5 
    });
    
    const appLogo = settings?.find(s => s.key === 'app_logo')?.value;
    const p = applicant?.personal_data || {};

    return (
        <div 
            className="bg-white text-slate-900 mx-auto relative text-[14px] font-sans p-[20mm] shadow-sm print:shadow-none"
            style={{ 
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'Sarabun, sans-serif'
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
            <div className="text-center mb-8">
                <h1 className="text-[16px] font-bold mb-2">หนังสือยินยอมข้อตกลงให้ประมวลผลเก็บรวบรวมหรือเปิดเผยข้อมูลส่วนบุคคล</h1>
                <h2 className="text-[14px] font-semibold">Personal Data Protection Act (PDPA)</h2>
            </div>

            {/* Date and Place */}
            <div className="mb-6 text-center leading-relaxed">
                <div>เขียนที่ <span className="border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center px-2">{formData.writtenAt || ''}</span></div>
                <div>เมื่อวันที่ <span className="border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2">
                    {formData.writtenDate ? new Date(formData.writtenDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                </span></div>
            </div>

            {/* Introduction */}
            <div className="mb-6 text-justify leading-relaxed">
                <p className="indent-8 mb-2">
                    การเก็บรวบรวมข้อมูลส่วนบุคคลในขณะสมัครงาน งก แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด เป็นผู้ควบคุมข้อมูลส่วนบุคคล ในการเก็บรวบรวมข้อมูลส่วนบุคคลของท่านผู้สมัครงานที่ถือว่ามีความจำเป็นต่อการดำเนินการสมัครงาน กับบริษัทฯ และเกี่ยวเนื่องกับการพิจารณาคัดเลือกบุคคลเข้าทำงาน โดยมีการจัดให้มีการจัดทำนโยบายและมาตรการด้านการคุ้มครองข้อมูลส่วนบุคคล ในเนื้อหาอันเกี่ยวกับวัตถุประสงค์และวิธีการเก็บรวบรวมข้อมูลส่วนบุคคล ระยะเวลาในการจัดเก็บข้อมูลส่วนบุคคล การส่งหรือโอนข้อมูลส่วนบุคคลของท่านไปยังประเทศที่สามในทางที่เหมาะสมกับกฎหมาย ข้อมูลการติดต่อ มาตรการรักษาความปลอดภัยของข้อมูลส่วนบุคคล เป็นต้นซึ่งบันทึกได้แสดงถ้อยคำและข้อสมัติคือข้อมูลส่วนบุคคลของท่าน เป็นระยะของสาธารณะตนสามารถใช้สิทธิตามพร้อยที่กฎหมายกำหนดให้ไว้ได้ ดังต่อไปนี้
                </p>
            </div>

            {/* Applicant Information */}
            <div className="mb-6">
                <p className="mb-3">
                    ข้าพเจ้า (นาย/นาง/นางสาว) <span className="border-b border-dotted border-slate-400 inline-block w-[150px] text-center">{applicant?.full_name || ''}</span> 
                    เลขบัตรประจำตัวประชาชน <span className="border-b border-dotted border-slate-400 inline-block w-[150px] text-center">{p.id_card || ''}</span>
                </p>
                <p>
                    เบอร์โทร <span className="border-b border-dotted border-slate-400 inline-block w-[100px] text-center">{p.mobile_phone || ''}</span> Line ID <span className="border-b border-dotted border-slate-400 inline-block w-[150px] text-center">{formData.lineId || ''}</span> เป็นข้าพจจมูลผู้ส่วนบุคคล ข้าพเจ้า ยินยอมให้ทีทริทยข้อมูลส่วนบุคคล ไข่ให้ลงข่ามอื่นยหรือบุคคลสามที่จับความสำคัญส่วนตัวของข้าพเจ้าได้ ข้าพเจ้ายินยอมให้บริษัท งก แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด เป็นผู้ควบคุมข้อมูลส่วนบุคคล เก็บรวบรวมข้อมูลส่วนบุคคล รวมถึงข้อมูลที่มีความอ่อนไหวของข้าพเจ้าที่สูงของข้าพเจ้า เพื่อใช้ตามวัตถุประสงค์ที่เกี่ยวนามเว้นข้างต้นข้าพเจ้ายินยอมให้ประมวลผลเก็บรวบรวมหรือนางหรือเปิดเผยข้อมูลส่วนบุคคล เพื่อเสมือนพจก้าเวลางกตามช่อมตกพการประดูพรชส่วน Line ID ของข้าพเจ้าข้าให้เปินอยู่ในบรรดาที่ต้องข่อมนองเก็าทลาฉะบส่วนบุคคล
                </p>
            </div>

            {/* List of Personal Data */}
            <div className="mb-6">
                <p className="font-bold mb-3 underline">รายละเอียดข้อมูลส่วนบุคคลที่ขอรับการประมวลผลข้อมูลส่วนบุคคล</p>
                <p className="mb-2">1. ประเภทข้อมูลส่วนบุคคลของผู้สมัครและข้อมูลส่วนบุคคลที่มีความอ่อนไหวมอื่นข้อบุญเพื่อมีจัดการใช้ เก็บรวบรวมใช้ ดังที่คุณสมะจะนามมาใด</p>
                
                <div className="ml-8 space-y-1">
                    <p>1.1 ข้อมูลบัตรประจำตัวประชาชน</p>
                    <p>1.2 ข้อมูลทะเบียนบ้าน</p>
                    <p>1.3 เอกสารการเปลี่ยนชื่อ-สกุล</p>
                    <p>1.4 วัน/เดือน/ปีเกิด</p>
                    <p>1.5 อายุ</p>
                    <p>1.6 ทะเบียนสมรส</p>
                    <p>1.7 เชื้อชาติ / สัญชาติ / ชาติพันธุ์</p>
                    <p>1.8 ศาสนา</p>
                    <p>1.9 กรุ๊ปเลือด</p>
                    <p>1.10 ภาพถ่าย</p>
                    <p>1.11 เพศ</p>
                    <p>1.12 ความพิการของร่างกาย</p>
                    <p>1.13 ใบรับรองแพทย์ ประวัติ หรือข้อมูลทางการแพทย์ หรือสุขภาพ</p>
                    <p>1.14 เอกสารประกอบด้านการศึกษา</p>
                    <p>1.15 หนังสือรับรองการศึกษา</p>
                </div>
            </div>

            {/* Signature Section */}
            <div className="mt-12">
                <div className="flex justify-end items-center gap-4 mb-2">
                    <span>ลงชื่อ</span>
                    {signatureUrl ? (
                        <div className="inline-flex flex-col items-center w-[200px]">
                            <img src={signatureUrl} alt="Signature" crossOrigin="anonymous" className="max-h-[50px] object-contain mb-1" />
                            <div className="border-b-[1.5px] border-dotted border-slate-400 w-full"></div>
                        </div>
                    ) : (
                        <div className="border-b-[1.5px] border-dotted border-slate-400 w-[200px] h-[50px] inline-block"></div>
                    )}
                    <span>ผู้สมัคร</span>
                </div>
                
                <div className="flex justify-end items-end gap-2 mb-2">
                    <span>ตัวบรรจง (</span>
                    <div className="border-b-[1.5px] border-dotted border-slate-400 w-[200px] text-center">{applicant?.full_name || ''}</div>
                    <span>)</span>
                </div>
                
                <div className="flex justify-end items-end gap-2">
                    <span>วันที่</span>
                    <div className="border-b-[1.5px] border-dotted border-slate-400 w-[150px] text-center">{signatureDate || ''}</div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] right-[10mm] text-[10px] text-slate-500">
                หน้าที่ 1 | 4
            </div>
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-14 Rev.04 03/05/66<br/>
                www.ko.in.th Strategy . AI . DX . Sustainability
            </div>
        </div>

        {/* Page 2 */}
        <div 
            className="bg-white text-slate-900 mx-auto relative text-[14px] font-sans p-[20mm] shadow-sm print:shadow-none mt-8"
            style={{ 
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'Sarabun, sans-serif',
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

            {/* Continued List */}
            <div className="mb-6 ml-8 space-y-1">
                <p>1.16 หนังสือเดินทางหรือเอกสารแสดงฐานะ</p>
                <p>1.17 ที่อยู่ / ประวัติที่อยู่ / Email / line ID</p>
                <p>1.18 ข้อมูลเกี่ยวกับครอบครัว</p>
                <p>1.19 ข้อมูลเกี่ยวกับบิดามารดา</p>
                <p>1.20 ข้อมูลความสามารถเฉพาะตัว อุปนิสัย การงานอดิเรก</p>
                <p>1.21 ข้อมูลค่าใช้จ่าย</p>
                <p>1.22 ข้อมูลประวัติอาชญากร</p>
                <p>1.23 ข้อมูลเกี่ยวกับการทำงานในอดีต</p>
                <p>1.24 ข้อมูลการตรวจสอบประวัติเครดิตอื่นๆ แนวหรือ</p>
                <p>1.25 ข้อมูลการวิจัยในเชิงพาณิชย์และสิทธิในทรัพย์สินทางปัญญา</p>
                <p>1.26 ข้อมูลพื้นฐานเจ้าหน้าบ้าน</p>
                <p>1.27 ข้อมูลค่าจ้าง และค่าตอบแทนทางสากล</p>
                <p>1.28 การตรวจสอบบุคคลอ้างอิงเป็นบุคคลที่น่าเชื่อถือของยามท่านเค้าขึ้นในปัจจุบัน</p>
                <p>1.29 หนังสือเดินทางหรือเอกสารหมายชนิดอื่นใดทางการที่ท่านยื่นเพื่อนำสำแจ้งขึ้นในท่านสารู้ และทางที่ตรวจทางความถูกต้อง ข</p>
                <p>1.30 ประวัติการสมรสบรรจม</p>
                <p>1.31 สำหรับเข้ามี้ธุปจกาจท่าน</p>
                <p>1.32 ภูมิลำรของทรสินตั๋ว</p>
                <p>1.33 ภูมิสลำของทางรับผิด</p>
                <p>1.34 LOG ด้านบอกอยืบใช้มอื่นดี</p>
                <p>1.35 ข้อมูลอื่นใด ติดความที่ประดิปเป็น พจนโทษและหรือข้อมูลส่วนบุคคลน พ.ศ. 2562</p>
            </div>

            {/* Section 1 */}
            <div className="mb-6">
                <p className="font-bold mb-3">1. ที่มาของข้อมูลส่วนบุคคล</p>
                <div className="ml-8 text-justify leading-relaxed space-y-3">
                    <p className="mb-2">
                        <span className="font-bold">ข้อมูลส่วนบุคคลและข้อมูลส่วนบุคคล</span> นอมอย่างซี่ กบาวนาม กยอเนินบิว กยมเฉพาที่ ประมบกาช รวมถ้งเมี่ยนจึดีท่จัดเจมิร 
                        พรอรากันขัมมู้ธุยิพนิงกระดั้าข้อมูลส่วนบุคคล พ.ศ. 2562 (และจกาส้อถึงมื้อชุดทางสำเป็นในนามช่อจมา) กบจ มอนัดถึงชีช้อสอ 
                        ภายใต้พจรจากัมขั้มู้ธิติพระธดีข้อมูลส่วนบุคคล พ.ศ. 2562 โดยคอนอยรอระมตการฐ่ากฐกรจข้อมูลส่วนบุคคล หวือ 
                        การเปิดเผยมายใช้อื่นป้ายมบ้าว พจรากันขัมมู้ธุปิจกระดำชินขอมโรงไบม คพ.ศ. 2562 รวมถังอาอยการปิยวให้และ 
                        บรึไษัชยาการกับเนุบากบท. กบจ มอนัดถำข่อบั่อว หรือให้มั่สื่งบ่ากสมุองผละจอข้อมูลส่วนบุคคล
                    </p>
                    
                    <p>
                        <span className="font-bold">1.2 "ข้อมูลส่วนบุคคลที่มีความอ่อนไหวเป็นพิเศษ"</span> หมายถึง ข้อมูลส่วนบุคคลส่วยเรรียว์นี้บข้มบํอาเพื่อดี ต่างๆซึมขั้น 
                        ต่างๆมานอีธึง ความเจิ้นไข้ยไม้รมั้ว ต่างๆ ต่ามไปยมิ้มักบิ่น หมบการกายงนพศ จุดวาการสมรรบรกิ่ม ข้อมูลสมารกาช ความอิติเคา 
                        ข้อมูลยากรท์การงายบิว ข้อมูลพิ่อบกการกจม ข้อมูลขีข้อภาคงาณ เค้าบิดงดอบเขี้นหกับอยู่ หรือความยจดระดำงเอบจิด 
                        เพื่อความดีเชิอยนมญบํอม หรือคุดกระดั้าข้อมูลส่วนบุคคลท์อกบาถอข
                    </p>
                    
                    <p>
                        <span className="font-bold">1.3 "เจ้าของข้อมูลส่วนบุคคล"</span> หมายถึง ท่านได้บุถ / ผู้มาติทิดซมอนีม๊าบในเนื้อผู้ทรับกับข้อมูลส่วนบุคคล และทุถยกถต 
                        รวมสามท่ถ่ยมครตกระทำที่ม้กใต้กับข้อมูลส่วนบุคคล
                    </p>
                    
                    <p>
                        <span className="font-bold">1.4 "ผู้รับมอบข้อมูลส่วนบุคคล"</span> หมายถึง บริจิท ณณ แบนด์ และ ซิธเต็มส์ แบนด์ คอนซันติ้ง ตำดัถ หรือบนุคสมถื่อจึมป้ายมี 
                        ต้างำจดลีถึงมิ้มีมงไบท์ในการงาที่ประกอบรมบม ให้ ตรวจเปิดและมข้อมูลส่วนบุคคล
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] right-[10mm] text-[10px] text-slate-500">
                หน้าที่ 2 | 4
            </div>
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-14 Rev.04 03/05/66<br/>
                www.ko.in.th Strategy . AI . DX . Sustainability
            </div>
        </div>
    );
}