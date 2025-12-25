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
        <>
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
                    การเก็บรวบรวมข้อมูลส่วนบุคคลในนามของบริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด เป็นผู ้ควบคุมข้อมูลส่วนบุคคล ในกรณีที่ผู้ควบคุมข้อมูลส่วนบุคคลประมวลผลข้อมูลส่วนบุคคลเป็นผู้เก็บรวบรวมข้อมูลส่วนบุคคลของ พนักงาน/ผู้มาติดต่อ สมัครงาน รับทราบถึงวัตถุประสงค์ของการยินยอม กรอกแบบฟอร์มให้ความยินยอมในการเก็บรวบรวม ใช้และเปิดเผยข้อมูลส่วนบุคคลตามแบบและวิธีการที่ทางผู้ควบคุมข้อมูลส่วนบุคคลกำหนดก่อนที่จะมีการเก็บรวมรวมใช้และเปิดเผยข้อมูลส่วนบุคคลนั้น
                </p>
            </div>

            {/* Applicant Information */}
            <div className="mb-6">
                <p className="mb-3">
                    ข้าพเจ้า (นาย/นาง/นางสาว) <span className="border-b border-dotted border-slate-400 inline-block w-[150px] text-center">{applicant?.full_name || ''}</span> 
                    เลขบัตรประจำตัวประชาชน <span className="border-b border-dotted border-slate-400 inline-block w-[150px] text-center">{p.id_card || ''}</span>
                </p>
                <p>
                    เบอร์โทร <span className="border-b border-dotted border-slate-400 inline-block w-[100px] text-center">{p.mobile_phone || ''}</span> Line ID <span className="border-b border-dotted border-slate-400 inline-block w-[150px] text-center">{formData.lineId || ''}</span> เป็นเจ้าของมูลส่วนบุคคล ข้าพเจ้า ยินยอมให้ใช้หรือเปิดเผยข้อมูล ส่วนบุคคลที่เกี่ยวข้องกับข้าพเจ้า ถือเป็น ข้อตกลงให้ประมวลผลข้อมูลส่วนบุคคล ให้กับ บริษัท เค แอนด์ โอ ซิส เต็มส์ แอนด์ คอนซัลติ้ง จำกัด เพื่อจัดเก็บ รวบรวมข้อมูล ประกอบการพิจารณาคัดเลือกเข้าทำงาน รวมถึงตลอดระยะเวลาที่เป็น พนักงานบริษัทฯ และกรณีที่สิ้นสุดการเป็นพนักงานของบริษัทฯ เป็นระยะเวลาสองปี ดังต่อไปนี้
                </p>
            </div>

            {/* List of Personal Data */}
            <div className="mb-6">
                <p className="font-bold mb-3 underline">รายละเอียดข้อมูลส่วนบุคคลสำหรับการประมวลผลข้อมูลส่วนบุคคล</p>
                <p className="mb-2">1. ประเภทของข้อมูลส่วนบุคคลและข้อมูลส่วนบุคคลที่มีความอ่อนไหวเป็นพิเศษ ที ่จะมีการเข้าถึง เก็บรวบรวม ใช้ ส่งต่อและ</p>
                <p className="mb-2">เปิดเผย ได้แก่</p>

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
                <p>1.16 หนังสือรับรองการเกณฑ์ทหาร</p>
                <p>1.17 ที่อยู่ / เบอร์โทร / Email / line ID</p>
                <p>1.18 ข้อมูลตามชุดสมัครงาน</p>
                <p>1.19 ข้อมูลสถานะทางครอบครัว</p>
                <p>1.20 ข้อมูลความสามารถ ทักษะ การอบรม</p>
                <p>1.21 ข้อมูลคำแถลง</p>
                <p>1.22 ข้อมูลประกันสังคม</p>
                <p>1.23 ข้อมูลบันทึกการสัมภาษณ์งาน</p>
                <p>1.24 ข้อมูลการตรวจสอบโรคติดต่อร้ายแรง</p>
                <p>1.25 ข้อมูลการรับวัคซีนการป้องกันโรคติดต่อร้ายแรง</p>
                <p>1.26 ข้อมูลสัญญาจ้างงาน</p>
                <p>1.27 ข้อมูลค่าจ้างค่าตอบแทนต่างๆ</p>
                <p>1.28 การตรวจสอบบุคคลอ้างอิง/บุคคลที่เกี่ยวข้องตามที่ได้ระบุไว้ในใบสมัคร</p>
                <p>1.29 หนังสือรับรองการทำงาน ประวัติการทำงานที่ผ่านมาของข้าพเจ้าไปยังบุคคล และ/หรือหน่วยงานต่าง ๆ</p>
                <p>1.30 ประวัติอาชญากรรม</p>
                <p>1.31 สำเนาบัญชีธนาคาร</p>
                <p>1.32 กล้องวงจรปิด</p>
                <p>1.33 กล้องสแกนใบหน้า</p>
                <p>1.34 LOG ด้านคอมพิวเตอร์</p>
                <p>1.35 ข้อมูลอื่นใด ตามที่ได้ระบุไว้ใน พรบ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562</p>
            </div>

            {/* Section 1 */}
            <div className="mb-6">
                <p className="font-bold mb-3">1. ทั้งสองฝ่ายตกลงกันดังนี้</p>
                <div className="ml-8 text-justify leading-relaxed space-y-3">
                    <p className="mb-2">
                      <span className="font-bold">กฎหมายคุ ้มครองข้อมูลส่วนบุคคล</span> หมายถึง กฎหมาย กฎระเบียบ กฏเกณฑ์ ประกาศ รวมถึงแต่ไม่จำกัดเพียง
                      พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (และตามที่จะได้มีการแก้ไขในภายหน้า) กฎ ระเบียบที่จะออก
                      ภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 โดยคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล หรือ
                      หน่วยงานอื่นใดที่มีอำนาจ พระราชบัญญัติความมั่นคงปลอดภัยไซเบอร์ พ.ศ. 2562 รวมถึงกฎหมายอื่นใดที่จำต้องมา
                      ปรับใช้ร่วมกับกฎหมาย กฎ ระเบียบข้างต้น หรือใช้สำหรับการประมวลผลข้อมูลส่วนบุคคล 
                    </p>
                    
                    <p>
                      <span className="font-bold">1.2 "ข้อมูลส่วนบุคคลที ่มีความอ่อนไหวเป็นพิเศษ"</span> หมายถึง ข้อมูลส่วนบุคคลเกี่ยวกับเชื้อชาติ เผ่าพันธุ์ ความคิดเห็น
                      ทางการเมือง ความเชื่อในลัทธิ ศาสนา หรือปรัชญา พฤติกรรมทางเพศ ประวัติอาชญากรรม ข้อมูลสุขภาพ ความพิการ 
                      ข้อมูลสหภาพแรงงาน ข้อมูลพันธุกรรม ข้อมูลชีวภาพ หรือข้อมูลอื่นใด ซึ่งกระทบต่อเจ้าของข้อมูลส่วนบุคคลในทำนอง
                      เดียวกันตามที่กฎหมายคุ้มครองข้อมูลส่วนบุคคลกำหนด 
                    </p>
                    
                    <p>
                      <span className="font-bold">1.3 "เจ้าของข้อมูลส่วนบุคคล"</span> หมายถึง พนักงาน / ผู้มาติดต่อสมัครงานของผู้ ควบคุมข้อมูลส่วนบุคคล และบุคคล
                      ธรรมดาซึ่งถูกระบุตัวได้โดยข้อมูลส่วนบุคคล
                    </p>
                    
                    <p>
                      <span className="font-bold">1.4 "ผู ้ควบคุมข้อมูลส่วนบุคคล"</span> หมายถึง บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด หรือบุคคลอื่นซึ่งม
                      อำนาจตัดสินใจเกี่ยวกับการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคล
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

        {/* Page 3 */}
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

            {/* Continued Definitions */}
            <div className="mb-6 ml-8 text-justify leading-relaxed space-y-3">
                <p>
                  <span className="font-bold">1.5 "ผู้ประมวลผลข้อมูลส่วนบุคคล"</span> หมายถึง บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด ที่ดำเนินการเกี่ยวกับ
                  การเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลตามคำสั่ง หรือในนามของผู้ควบคุมข้อมูลส่วนบุคคล
                </p>
                
                <p>
                  <span className="font-bold">1.6 "ผู ้ประมวลผลข้อมูลส่วนบุคคลช่วง"</span> หมายถึง บุคคลหรือนิติบุคคลที่แต่งตั้งขึ้นหรือได้รับมอบหมายโดยผู้
                  ประมวลผลข้อมูลส่วนบุคคลเพื่อให้มีส่วนช่วยหรือสนับสนุนในการปฏิบัติการตามข้อตกลงประมวลข้อมูลส่วนบุคคล
                </p>
                
                <p>
                  <span className="font-bold">1.7 "เหตุละเมิดข้อมูลส่วนบุคคล"</span> หมายถึง การที่ข้อมูลส่วนบุคคลรั่วไหล หรือสูญหาย หรือถูกทำลาย หรือการเข้าถึงโดย 
                  ไม่มีอำนาจหรือโดยมิชอบด้วยกฎหมาย ทั้งที่เจตนาหรือไม่เจตนา รวมถึง การเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วน
                  บุคคล การแก้ไขหรือการประมวลผลข้อมูลส่วนบุคคลโดยไม่มีสิทธิหรือผิดวัตถุประสงค์ การปฏิเสธสิทธิของเจ้าของ
                  ข้อมูลส่วนบุคคลที่เจ้าของข้อมูลส่วนบุคคลพึงมีตามกฎหมายคุ้มครองข้อมูลส่วนบุคคลโดยไม่มีเหตุอันพึงกล่าวอ้างได้
                  ตามกฎหมาย หรือ การกระทำอื่นใดที่ขัดต่อกฎหมาย 
                </p>
                
                <p>
                  <span className="font-bold">1.8 "การประมวลผลข้อมูลส่วนบุคคล"</span> หมายถึง การดำเนินการหรือชุดการดำเนินการใดๆ ซึ่งเป็นการเข้าถึงข้อมูลส่วน
                  บุคคล การเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคล การกระทำการต่อข้อมูลส่วนบุคคลในทุกรูปแบบ รวมถึงแต่ไม่
                  จำกัดเฉพาะ การบันทึก การจัดระบบ การจัดโครงสร้าง การเก็บรักษา การดัดแปลง การแก้ไข การทำสำเนา การโอน 
                  การเผยแพร่ข้อมูลส่วนบุคคล การนำข้อมูลส่วนบุคคลกลับมาใช้ใหม่ หรือการกระทำอื่นใดซึ ่งทำให้เกิดความพร้อมใช้
                  งาน การจัดวางหรือผสมเข้าด้วยกัน การจำกัด การลบ หรือทำลาย รวมถึงการกระทำดังกล่าวทั้งหมดผ่านระบบ
                  อัตโนมัติ 
                </p>
            </div>

            {/* Section 2 */}
            <div className="mb-6">
                <p className="font-bold mb-3">2. สิทธิของเจ้าของข้อมูลส่วนบุคคล</p>
                
                <div className="ml-4 space-y-4">
                    <div>
                        <p className="font-bold mb-2">2.1 การเข้าถึงข้อมูลส่วนบุคคล</p>
                        <p className="ml-4 text-justify leading-relaxed">
                          ผู ้ประมวลผลข้อมูลส่วนบุคคลจะสนับสนุนให้ผู ้ควบคุมข้อมูลส่วนบุคคลสามารถเข้าถึงข้อมูลส่วนบุคคลของเจ้าของ
                          ข้อมูลส่วนบุคคลได้ ทั้งนี้ เพื่อให้ผู้ควบคุมข้อมูลส่วนบุคคลสามารถดำเนินการใดๆ เพื ่อตอบสนองต่อคำร้องขอของ
                          เจ้าของข้อมูลส่วนบุคคลซึ่งอาจมีสิทธิที่จะเรียกดู แก้ไข หรือลบข้อมูลส่วนบุคคลของตนได้ตามกฎหมาย
                        </p>
                    </div>
                    
                    <div>
                        <p className="font-bold mb-2">2.2 การร้องขอโดยเจ้าของข้อมูลส่วนบุคคล</p>
                        <p className="ml-4 text-justify leading-relaxed">
                          หากเจ้าของข้อมูลส่วนบุคคล ต้องการยื่นคำขอใช้สิทธิใดๆ ที่เป็นสิทธิของเจ้าของข้อมูลส่วนบุคคลตามกฎหมายคุ้มครอง
                          ข้อมูลส่วนบุคคล ให้ผู้ประมวลผลข้อมูลส่วนบุคคลแจ้งวิธีการยื่นคำขอดังกล่าวแก่เจ้าของข้อมูลส่วนบุคคลและแจ้งให้ผู้
                          ควบคุมข้อมูลส่วนบุคคลทราบทันที ท Email: <span className="underline">hr@ko.in.th</span> ทั้งนี้ ผู้ประมวลผลข้อมูลส่วนบุคคลไม่มีสิทธิดำเนินการ
                          ใดๆ ต่อข้อมูลส่วนบุคคลตามคำขอใช้สิทธินั ้นแทนผู ้ควบคุมข้อมูลส่วนบุคคลทั ้งสิ ้น และในกรณีที่คำขอเป็นคำขอ
                          ยกเลิกความยินยอมในการเก็บรวบรวม ใช้ เปิดเผยข้อมูลส่วนบุคคล ให้ผู ้ประมวลผลข้อมูลส่วนบุคคลระงับการ
                          ดำเนินการใดๆ เกี่ยวกับข้อมูลส่วนบุคคลนั้นไว้ชั่วคราว จนกว่าจะได้รับคำสั่งอื่นจากผู้ควบคุมข้อมูลส่วนบุคคล
                        </p>
                    </div>
                </div>
            </div>

            {/* Section 3 */}
            <div className="mb-6">
                <p className="font-bold mb-3">3. มาตรการคุ้มครองความปลอดภัยของข้อมูลส่วนบุคคล</p>
                
                <div className="ml-4">
                    <p className="font-bold mb-2">3.1 มาตรการรักษาความปลอดภัย</p>
                    <p className="ml-4 text-justify leading-relaxed">
                      หากผู ้ประมวลผลข้อมูลส่วนบุคคลจะต้องจัดเก็บข้อมูลส่วนบุคคลใดๆ ตามที่ผู้ควบคุมข้อมูลส่วนบุคคลให้สิทธิ หรือมี
                      คำสั่งเป็นลายลักษณ์อักษร ให้ผู้ประมวลผลข้อมูลส่วนบุคคลจัดเก็บอย่างระมัดระวัง ต้องตรวจสอบ จัดให้มีและคงไว้ซึ่ง
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] right-[10mm] text-[10px] text-slate-500">
                หน้าที่ 3 | 4
            </div>
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-14 Rev.04 03/05/66<br/>
                www.ko.in.th Strategy . AI . DX . Sustainability
            </div>
        </div>

        {/* Page 4 */}
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

            {/* Content */}
            <div className="space-y-4">
                <p className="text-justify leading-relaxed ml-4">
                  มาตรการรักษาความมั ่นคงปลอดภัยที ่รัดกุมเพื ่อป้องกันเหตุละเมิดข้อมูลส่วนบุคคล โดยระบบรักษาความมั ่นคง
                  ปลอดภัยขั้นต่ำ อาทิ ระบบและมาตรการที่มีประสิทธิภาพเพื่อป้องกันการเข้าถึงข้อมูลส่วนบุคคลโดยไม่มีสิทธ
                </p>

                <div>
                    <p className="font-bold mb-2">3.2 การรักษาความลับของข้อมูลส่วนบุคคล</p>
                    <p className="text-justify leading-relaxed ml-4">
                      นอกเหนือจากหน้าที่รักษาความลับตามที่ระบุไว้ในสัญญาแล้ว ผู้ประมวลผลข้อมูลส่วนบุคคลมีหน้าที่ต้องรักษาความลับ
                      ของข้อมูลส่วนบุคคลอย่างเคร่งครัดภายใต้ข้อตกลงเรื่องการรักษาความลับที่จัดทำขึ้นเป็นลายลักษณ์อักษร
                    </p>
                </div>

                <div>
                    <p className="font-bold mb-2">4. สิทธิในการตรวจสอบ</p>
                    <p className="text-justify leading-relaxed ml-4">
                      ผู้ประมวลผลข้อมูลส่วนบุคคลตกลงให้ผู้ควบคุมข้อมูลส่วนบุคคลมีสิทธิในการตรวจสอบ ออดิท ระบบปฏิบัติการ มาตรการและ
                      ระบบรักษาความปลอดภัยของข้อมูลส่วนบุคคลของผู้ประมวลผลข้อมูลส่วนบุคคลได
                    </p>
                </div>

                <p className="text-justify leading-relaxed">
                    5. ในกรณีที่บริษัท เค แอนด์ โอซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด มีความจำเป็นต้องส่งหรือโอนข้อมูลส่วนบุคคลไปยังต่างประเทศ 
                    (ถ้ามี)  ข้าพเจ้ายินยอมให้บริษัท เค แอนด์ โอซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด สามารถดำเนินการส่งข้อมูลได
                </p>

                <p className="text-justify leading-relaxed">
                    6. วิธีเพิกถอนความยินยอมและผลการเพิกถอนความยินยอม ข้าพเจ้าอาจเพิกถอนความยินยอมทั้งหมดหรือส่วนใดส่วนหนึ่งตาม
                    หนังสือฉบับนี้โดยข้าพเจ้าจะแจ้งให้บริษัท เค แอนด์ โอซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด ทราบเป็นหนังสือและบริษัท เค แอนด์ 
                    โอซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด อาจทราบถึงเหตุผลแห่งการนั้น
                </p>

                <p className="text-justify leading-relaxed">
                    7. การเพิกถอนความยินยอมของข้าพเจ้าไม่มีผลกระทบต่อการดำเนินการใดๆ ที ่บริษัท เค แอนด์ โอซิสเต็มส์ แอนด์ คอนซัลติ้ง
                    จำกัด ได้ดำเนินการไปแล้ว
                </p>

                <p className="text-justify leading-relaxed">
                    8. ในกรณีที่ การเพิกถอนความยินยอมเกิดผลกระทบต่อสิทธิหรือหน้าที่ใดๆของข้าพเจ้า ข้าพเจ้ายอมรับผลกระทบที่เกิดขึ้นจาก
                    การนั้นได้
                </p>

                <p className="text-justify leading-relaxed ml-4">
                    ข้าพเจ้าขอยืนยันว่าข้อมูลส่วนบุคคลที่ให้ไว้กับบริษัท เค แอนด์ โอซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด เป็นข้อมูลที่ถูกต้องแท้จริง
                    หากเกิดความเสียหายใดๆ อันเนื่องมาจากการให้ข้อมูลที่ไม่ถูกต้อง ข้าพเจ้าจะรับผิดชอบในความเสียหายที่เกิดขึ้น
                </p>

                <p className="text-center mt-8">
                    ข้าพเจ้าได้อ่านและเข้าใจข้อความดังกล่าวโดยตลอดแล้วจึงได้ลงลายมือชื่อไว้เป็นสำคัญต่อหน้าพยาน
                </p>

                <div className="text-center mt-6 leading-relaxed">
                    <p>ลงชื่อ........................................................................................ผู้ยินยอม</p>
                    <p className="mt-2">(...........................................................)</p>
                </div>

                <div className="text-center mt-6">
                    <p>ขอรับรองว่าผู้มีสิทธิให้ความยินยอมได้ให้ความยินยอมต่อหน้าพยานจริง</p>
                </div>

                <div className="grid grid-cols-2 gap-8 mt-6">
                    <div className="text-center">
                        <p>ลงชื่อ................................................. พยาน</p>
                        <p className="mt-2">({formData?.witnessName1 || '...........................................................'})</p>
                    </div>
                    <div className="text-center">
                        <p>ลงชื่อ................................................. พยาน</p>
                        <p className="mt-2">({formData?.witnessName2 || '...........................................................'})</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] right-[10mm] text-[10px] text-slate-500">
                หน้าที่ 4 | 4
            </div>
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-14 Rev.04 03/05/66<br/>
                www.ko.in.th Strategy . AI . DX . Sustainability
            </div>
        </div>
        </>
    );
}