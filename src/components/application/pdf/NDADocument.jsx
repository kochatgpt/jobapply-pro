import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function NDADocument({ applicant, formData = {} }) {
    const { data: settings } = useQuery({
        queryKey: ['system_settings_layout'],
        queryFn: () => base44.entities.SystemSetting.list(),
        staleTime: 1000 * 60 * 5 
    });
    
    const appLogo = settings?.find(s => s.key === 'app_logo')?.value;
    const p = applicant?.personal_data || {};
    const currentAddr = p.current_address || {};
    const companyData = applicant?.nda_document?.company_data || {};

    return (
        <>
        {/* Page 1 */}
        <div 
            className="pdpa-page bg-white text-slate-900 mx-auto relative font-sans p-[20mm] shadow-sm print:shadow-none"
            style={{ 
                fontSize: '12px' ,
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'TH Sarabun New, Sarabun, sans-serif'
            }}
        >
            {/* Header with Logo */}
            <div className="flex justify-end mb-8">
                {appLogo ? (
                    <img src={appLogo} alt="Logo" crossOrigin="anonymous" className="h-[100px] w-auto object-contain" />
                ) : (
                    <div className="h-[100px] w-[100px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">LOGO</div>
                )}
            </div>

            {/* Title */}
            <div className="text-center mb-6">
                <h1 className="text-[16px] font-bold">สัญญาข้อตกลงไม่เปิดเผยข้อมูล (Non-Disclosure Agreement : NDA) สำหรับพนักงาน</h1>
            </div>

            {/* Contract Date */}
            <div className="mb-4 leading-[1.4] text-right">
                <p>สัญญาฉบับนี้ทำขึ้นที่ บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด</p>
                <p>เมื่อวันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 pb-1 ${formData.contractDate}`} style={{ verticalAlign: 'baseline', ...(!formData.contractDate && { minHeight: '1.2em' }) }}>{formData.contractDate || '\u00A0'}</span></p>
            </div>

            {/* Company Info */}
            <div className="mb-4 text-justify leading-[1.4]">
                <p className="indent-8">
                    ระหว่าง บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด สำนักงานตั้งอยู่เลขที่ 15, 17 ซอยกรุงธนบุรี 4 
                    ถนนกรุงธนบุรี แขวงบางลำภูล่าง เขตคลองสาน กรุงเทพมหานคร 10600 โดย นายกฤษณ์พงษ์ สุคันโธ หรือ 
                    นางสาวอรนภา บุญพิพัฒนาพงศ์ กรรมการผู้มีอำนาจกระทำการแทนบริษัทฯ ซึ่งต่อไปในสัญญานี้เรียกว่า "บริษัท" 
                    ฝ่ายหนึ่ง กับ
                </p>
            </div>

            {/* Employee Info */}
            <div className="mb-4 text-justify leading-[1.4]">
                <p className="indent-8">
                    นาย/นาง/นางสาว<span className={`border-b border-dotted border-slate-400 inline-block min-w-[250px] text-center px-2 pb-1 ${applicant?.full_name}`} style={{ verticalAlign: 'baseline', ...(!applicant?.full_name && { minHeight: '1.2em' }) }}>{applicant?.full_name || '\u00A0'}</span>เลขที่บัตรประชาชน <span className={`border-b border-dotted border-slate-400 inline-block min-w-[160px] text-center px-2 pb-1 ${p.id_card}`} style={{ verticalAlign: 'baseline', ...(!p.id_card && { minHeight: '1.2em' }) }}>{p.id_card || '\u00A0'}</span>
                </p>
                <p>
                    อยู่บ้านเลขที่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[60px] text-center px-2 pb-1 ${currentAddr.number}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.number && { minHeight: '1.2em' }) }}>{currentAddr.number || '\u00A0'}</span>หมู่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[50px] text-center px-2 pb-1 ${currentAddr.moo}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.moo && { minHeight: '1.2em' }) }}>{currentAddr.moo || '\u00A0'}</span>ซอย<span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 pb-1 ${currentAddr.soi}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.soi && { minHeight: '1.2em' }) }}>{currentAddr.soi || '\u00A0'}</span>ถนน<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 pb-1 ${currentAddr.road}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.road && { minHeight: '1.2em' }) }}>{currentAddr.road || '\u00A0'}</span>
                </p>
                <p>
                    ตำบล/แขวง<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 pb-1 ${currentAddr.subdistrict}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.subdistrict && { minHeight: '1.2em' }) }}>{currentAddr.subdistrict || '\u00A0'}</span>อำเภอ/เขต<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 pb-1 ${currentAddr.district}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.district && { minHeight: '1.2em' }) }}>{currentAddr.district || '\u00A0'}</span>จังหวัด<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 pb-1 ${currentAddr.province}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.province && { minHeight: '1.2em' }) }}>{currentAddr.province || '\u00A0'}</span>
                </p>
                <p>
                    รหัสไปรษณีย์<span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 pb-1 ${currentAddr.zipcode}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.zipcode && { minHeight: '1.2em' }) }}>{currentAddr.zipcode || '\u00A0'}</span>เบอร์โทรศัพท์มือถือ<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 pb-1 ${p.mobile_phone}`} style={{ verticalAlign: 'baseline', ...(!p.mobile_phone && { minHeight: '1.2em' }) }}>{p.mobile_phone || '\u00A0'}</span>ซึ่งต่อไปในสัญญานี้เรียกว่า "ลูกจ้าง" อีกฝ่ายหนึ่ง
                </p>
            </div>

            {/* Intro Statement */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p className="indent-8">
                    คู่สัญญาทั้งสองฝ่ายตกลงทำสัญญากัน เพื่อเป็นการรับประกันว่าข้อมูลที่ได้รับระหว่างการทำงานจะถูกเก็บเป็น
                    ความลับและไม่เปิดเผยต่อบุคคลภายนอกโดยไม่ได้รับอนุญาต โดยมีข้อความกันดังต่อไปนี้
                </p>
            </div>

            {/* Clause 1 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 1  วัตถุประสงค์ของสัญญา</p>
            </div>

            {/* Clause 1.1 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p className="mb-1">1.1 บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด (ต่อไปนี้เรียกว่า "บริษัท") เป็นผู้ให้บริการจัดหา
                    บุคลากร เพื่อปฏิบัติงานในด้านต่าง ๆ ตามความต้องการของคู่ค้า/ลูกค้า ซึ่งอาจรวมถึงการสแกน
                    เอกสาร จัดเก็บข้อมูล บันทึกข้อมูลเข้าระบบ และงานบริการอื่น ๆ ที่เกี่ยวข้อง ตามขอบเขตที่คู่ค้า/
                    ลูกค้ากำหนด</p>
            </div>

            {/* Clause 1.2 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>1.2 บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด ได้ทำสัญญาความลับ (NDA) และสัญญา 
                    ที่เกี่ยวข้องกับการคุ้มครองข้อมูลส่วนบุคคล (PDPA) กับคู่ค้า/ลูกค้า ตามกฎหมายและข้อบังคับที่มีผล
                    บังคับใช้ เพื่อรับรองว่าข้อมูลของคู่ค้า/ลูกค้า และข้อมูลของลูกค้าของคู่ค้า/ลูกค้า จะได้รับการคุ้มครอง
                    อย่างเหมาะสม</p>
            </div>

            {/* Clause 1.3 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>1.3 พนักงาน (ต่อไปนี้เรียกว่า "พนักงาน") ซึ่งลงนามในสัญญาฉบับนี้ ตกลงที่จะรักษาความลับของข้อมูล
                    ทั้งหมดที่ได้รับหรือรับทราบจากบริษัท และ/หรือคู่ค้า/ลูกค้า และจะไม่เปิดเผย เผยแพร่ หรือกระทำ
                    การใด ๆ ที่เป็นการละเมิดต่อความลับดังกล่าว เว้นแต่จะได้รับความยินยอมเป็นลายลักษณ์อักษรจาก
                    และ/หรือคู่ค้า/ลูกค้าแล้ว</p>
            </div>

            {/* Clause 1.4 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>1.4 คู่ค้า/ลูกค้า คือ ในที่นี้ หมายถึง องค์กร บริษัท หรือบุคคลใด ๆ ซึ่งได้ว่าจ้างหรือทำข้อตกลงกับบริษัท
                    เพื่อรับบริการจัดหาบุคลากร หรือมอบหมายงานต่าง ๆ ให้บริษัทดำเนินการ ซึ่งรวมถึงหน่วยงานในเครือ 
                    บริษัทในเครือ หรือผู้แทนที่ได้รับมอบอำนาจอย่างเป็นทางการของลูกค้า</p>
            </div>

            {/* Clause 1.5 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>1.5 ลูกค้าของคู่ค้า/ลูกค้า หมายถึง บุคคล บริษัท หรือหน่วยงานใด ๆ ซึ่งเป็นผู้ที่คู่ค้า/ลูกค้าให้บริการอยู่
                    ก่อนแล้ว หรือต้องการให้บริการต่อ โดยที่อาจมีการส่งมอบข้อมูลหรือเอกสารของ ลูกค้าของคู่ค้า/ลูกค้า 
                    นั้นมาให้บริษัทดำเนินการตามคำสั่งคู่ค้า/ลูกค้า ซึ่งข้อมูลส่วนบุคคลและข้อมูลทางธุรกิจของ ลูกค้าของ 
                    คู่ค้า/ลูกค้า ยังคงได้รับการคุ้มครองภายใต้สัญญาฉบับนี้</p>
            </div>

            {/* Clause 1.6 */}
            <div className="mb-4 ml-4 leading-[1.4] text-justify">
                <p>1.6 สัญญาฉบับนี้จัดทำขึ้นเพื่อให้พนักงานรับทราบและตระหนักถึงความสำคัญของการรักษาข้อมูลความลับ 
                    การคุ้มครองข้อมูลส่วนบุคคลตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA) และการปฏิบัติตาม
                    พระราชบัญญัติว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์ โดยพนักงานจะต้องถือปฏิบัติตาม
                    สัญญานี้อย่างเคร่งครัด เพื่อหลีกเลี่ยงการละเมิดสิทธิของบุคคลอื่น รวมถึงป้องกันความเสียหายที่อาจ
                    เกิดขึ้นกับบริษัทและคู่ค้า/ลูกค้า</p>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] right-[10mm] text-[10px] text-slate-500">
                หน้าที่ 1 | 4
            </div>
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-27 Rev.02 17/06/66<br/>
                www.ko.in.th Strategy . AI . DX . Sustainability
            </div>
        </div>

        {/* Page 2 */}
        <div 
            className="pdpa-page bg-white text-slate-900 mx-auto relative text-[12px] font-sans p-[20mm] shadow-sm print:shadow-none mt-8"
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
                    <img src={appLogo} alt="Logo" crossOrigin="anonymous" className="h-[100px] w-auto object-contain" />
                ) : (
                    <div className="h-[100px] w-[100px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">LOGO</div>
                )}
            </div>

            {/* Clause 2 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 2  คำนิยาม</p>
            </div>

            {/* Clause 2.1 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>2.1 "ข้อมูลลับ" หมายความรวมถึง ข้อมูลใดๆ ที่บริษัท และคู่ค้า/ลูกค้าเปิดเผยหรือให้พนักงานเข้าถึง
                    ระหว่างการทำงาน รวมถึง แต่ไม่จำกัดเฉพาะ เอกสาร บันทึก สื่ออิเล็กทรอนิกส์ รูปภาพ ไฟล์เสียง ไฟล์
                    วิดีโอ ข้อมูลส่วนบุคคล ข้อมูลของลูกค้าของคู่ค้า/ลูกค้า ข้อมูลทางธุรกิจ ข้อมูลทางเทคนิค ข้อมูล
                    เงินเดือนหรือค่าตอบแทนใด ๆ รวมถึงข้อมูลเกี่ยวกับสัญญาระหว่างบริษัทกับคู่ค้า/ลูกค้า ทั้งที่อยู่ใน
                    รูปแบบเป็นลายลักษณ์อักษร หรือเป็นข้อมูลที่อาจได้รับจากการสนทนา การสื่อสาร หรือการเข้าถึง
                    ระบบของบริษัทหรือคู่ค้า/ลูกค้า รวมถึงบรรดาผลงานต่าง ๆ รวมถึงลิขสิทธิ์ เช่น งานวรรณกรรม 
                    งานวิจัย งานวิเคราะห์ งานเขียนโครงการ งานโปรแกรมคอมพิวเตอร์ หรืองานอื่นใดอันมีลักษณะอย่าง
                    เดียวกัน สิทธิบัตร เครื่องหมายการค้า ความลับทางการค้า ตลอดจนทรัพย์สินทางปัญญาอื่น ๆ เช่น 
                    ภายถ่าย วีดีโอ ภาพนิ่ง งานออกแบบต่างๆ ภาพเคลื่อนไหว บทความ งานเขียน เป็นต้น ซึ่งพนักงานได้
                    รู้หรือได้รับมาไม่ว่าทางตรงหรือทางอ้อม</p>
            </div>

            {/* Clause 2.2 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>2.2 "การเปิดเผย" หมายถึง การกระทำใด ๆ ที่ทำให้ข้อมูลลับไปสู่บุคคลที่สาม ซึ่งมิใช่บริษัทหรือ 
                    ผู้มีอำนาจ ผู้แทน ของคู่ค้า/ลูกค้า โดยขาดสิทธิหรืออำนาจตามกฎหมายหรือสัญญา ไม่ว่าจะโดยการ
                    พูด เขียน พิมพ์ ส่งอีเมล หรือการเผยแพร่ด้วยวิธีอื่นใด</p>
            </div>

            {/* Clause 2.3 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>2.3 "บุคคลที่สาม" หมายรวมถึง นิติบุคคลหรือบุคคลใด ๆ ที่ไม่ใช่คู่สัญญาในสัญญาฉบับนี้</p>
            </div>

            {/* Clause 2.4 */}
            <div className="mb-4 ml-4 leading-[1.4] text-justify">
                <p>2.4 "สัญญาฉบับนี้" หมายถึง สัญญาการรักษาความลับฉบับนี้ ตลอดจนภาคผนวกและเอกสารแนบท้าย
                    ทั้งหมด</p>
            </div>

            {/* Clause 3 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 3  ขอบเขตหน้าที่ของพนักงาน</p>
            </div>

            {/* Clause 3.1 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>3.1 พนักงานตกลงจะปฏิบัติงานตามที่ได้รับมอบหมายจากบริษัทหรือคู่ค้า/ลูกค้าอย่างครบถ้วนและสุจริต 
                    โดยต้องเคารพกฎระเบียบ ข้อบังคับ ตลอดจนแนวทางปฏิบัติภายในสถานที่ทำงานของคู่ค้า/ลูกค้า</p>
            </div>

            {/* Clause 3.2 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>3.2 พนักงานต้องไม่นำข้อมูลลับที่ได้รับในระหว่างการปฏิบัติงาน หรือเนื่องจากตำแหน่งหน้าที่หรือโดยเหตุ
                    อื่นใด ไปใช้โดยมิชอบ หรือเพื่อประโยชน์ส่วนตนหรือบุคคลที่สาม โดยไม่ได้รับอนุญาตเป็นลายลักษณ์
                    อักษรจากบริษัทหรือคู่ค้า/ลูกค้า</p>
            </div>

            {/* Clause 3.3 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>3.3 พนักงานต้องไม่จัดทำ สำเนา ดัดแปลง ส่งต่อ หรือคัดลอกข้อมูลลับใด ๆ จากสื่อหรือระบบคอมพิวเตอร์
                    ของบริษัทหรือคู่ค้า/ลูกค้า ยกเว้นในกรณีที่จำเป็นต่อการปฏิบัติงาน และได้รับความยินยอมจากบุคคล
                    ที่มีอำนาจอนุมัติ</p>
            </div>

            {/* Clause 3.4 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>3.4 พนักงานตกลงห้ามถ่ายภาพ ห้ามถ่ายวิดีโอ หรือบันทึกเสียงในพื้นที่ทำงานของบริษัทหรือของคู่ค้า/
                    ลูกค้าหากยังไม่ได้รับอนุญาตอย่างเป็นลายลักษณ์อักษร</p>
            </div>

            {/* Clause 3.5 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>3.5 พนักงานต้องไม่เปิดเผยหรือนำข้อมูลลับของคู่ค้า/ลูกค้า และ/หรือลูกค้าของคู่ค้า/ลูกค้าไปเผยแพร่ ไม่
                    ว่าจะเป็นข้อมูลเอกสารที่สแกนหรือข้อมูลส่วนใด ๆ ในรูปแบบเอกสาร ดิจิทัล หรือบทสนทนา หาก
                    ไม่ได้รับอนุญาตจากบริษัทหรือคู่ค้า/ลูกค้าเป็นลายลักษณ์อักษร</p>
            </div>

            {/* Clause 3.6 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>3.6 พนักงานต้องไม่เปิดเผยข้อมูลเกี่ยวกับอัตราเงินเดือน ค่าตอบแทน หรือเงื่อนไขทางการเงินอื่น ๆ ของ
                    ตนเอง รวมถึงข้อมูลทางการเงินของบริษัท แก่คู่ค้า/ลูกค้า บุคคลภายนอก หรือบุคคลอื่นใด เว้นแต่
                    บริษัทจะได้อนุญาตหรือกำหนดให้แจ้งข้อมูลดังกล่าว</p>
            </div>

            {/* Clause 3.7 */}
            <div className="mb-4 ml-4 leading-[1.4] text-justify">
                <p>3.7 พนักงานตกลงจะไม่เผยแพร่ข้อมูลใด ๆ เกี่ยวกับสัญญาหรือข้อตกลงระหว่างบริษัทกับคู่ค้า/ลูกค้า 
                    รวมถึงเงื่อนไข ข้อตกลง รายได้ และข้อมูลเชิงธุรกิจอื่น ๆ อันเป็นสาระสำคัญต่อบุคคลที่สาม เว้นแต่จะ
                    ได้รับอนุญาตเป็นลายลักษณ์อักษรจากบริษัท</p>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] right-[10mm] text-[10px] text-slate-500">
                หน้าที่ 2 | 4
            </div>
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-27 Rev.02 17/06/66<br/>
                www.ko.in.th Strategy . AI . DX . Sustainability
            </div>
        </div>

        {/* Page 3 */}
        <div 
            className="pdpa-page bg-white text-slate-900 mx-auto relative text-[12px] font-sans p-[20mm] shadow-sm print:shadow-none mt-8"
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
                    <img src={appLogo} alt="Logo" crossOrigin="anonymous" className="h-[100px] w-auto object-contain" />
                ) : (
                    <div className="h-[100px] w-[100px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">LOGO</div>
                )}
            </div>

            {/* Clause 3.8 */}
            <div className="mb-4 ml-4 leading-[1.4] text-justify">
                <p>3.8 ในกรณีที่มีข้อสงสัยเกี่ยวกับการเปิดเผยหรือการใช้ข้อมูลลับ พนักงานจะต้องปรึกษากับผู้บังคับบัญชา
                    หรือฝ่ายกฎหมายของบริษัทก่อนเสมอ</p>
            </div>

            {/* Clause 4 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 4  การคุ้มครองข้อมูลส่วนบุคคล (PDPA) ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562</p>
            </div>

            {/* Clause 4.1 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>4.1 พนักงานรับทราบว่า บริษัทและคู่ค้า/ลูกค้าได้มีการตกลงและปฏิบัติตามพระราชบัญญัติคุ้มครองข้อมูล
                    ส่วนบุคคล (PDPA) หรือกฎหมายอื่นใดที่เกี่ยวข้อง ซึ่งวางหลักเกณฑ์ในการประมวลผลและเก็บรักษา
                    ข้อมูลส่วนบุคคลของลูกค้าและบุคคลภายนอก</p>
            </div>

            {/* Clause 4.2 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>4.2 พนักงานตกลงที่จะเก็บรักษาและประมวลผลข้อมูลส่วนบุคคลที่ได้มาเฉพาะตามวัตถุประสงค์ในการ
                    ปฏิบัติงานเท่านั้น และจะปฏิบัติตามข้อบังคับ วิธีการ และมาตรการรักษาความปลอดภัยของข้อมูล
                    ส่วนบุคคลตามที่บริษัทหรือคู่ค้า/ลูกค้ากำหนดโดยเคร่งครัด</p>
            </div>

            {/* Clause 4.3 */}
            <div className="mb-4 ml-4 leading-[1.4] text-justify">
                <p>4.3 พนักงานต้องไม่ส่งต่อหรือเปิดเผยข้อมูลส่วนบุคคลแก่บุคคลภายนอก ไม่ว่าจะด้วยรูปแบบใด ๆ เว้นแต่
                    เป็นไปตามกฎหมาย หรือได้รับความยินยอมเป็นลายลักษณ์อักษรจากบริษัทหรือคู่ค้า/ลูกค้า</p>
            </div>

            {/* Clause 5 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 5 การปฏิบัติตามพระราชบัญญัติว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์ พ.ศ. 2550 และฉบับแก้ไข
                    เพิ่มเติม (ฉบับที่ 2) พ.ศ. 2560</p>
            </div>

            {/* Clause 5.1 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>5.1 ในการใช้งานระบบคอมพิวเตอร์ อินเทอร์เน็ต เครือข่ายสารสนเทศ หรืออุปกรณ์อิเล็กทรอนิกส์ใด ๆ 
                    ของบริษัทหรือคู่ค้า/ลูกค้า พนักงานต้องปฏิบัติตามพระราชบัญญัติว่าด้วยการกระทำความผิดเกี่ยวกับ
                    คอมพิวเตอร์ พ.ศ. 2550 และฉบับแก้ไขเพิ่มเติม (ฉบับที่ 2) พ.ศ. 2560 อย่างเคร่งครัด</p>
            </div>

            {/* Clause 5.2 */}
            <div className="mb-4 ml-4 leading-[1.4] text-justify">
                <p>5.2 ห้ามกระทำการใด ๆ ที่เข้าข่ายเป็นการกระทำผิดตามกฎหมายดังกล่าว เช่น การเข้าถึงหรือทำให้ข้อมูล
                    เสียหายโดยมิชอบ การดักรับไว้ซึ่งข้อมูลคอมพิวเตอร์ของผู้อื่น การเผยแพร่ข้อมูลอันเป็นเท็จ หรือการ
                    กระทำอื่นใดที่ผิดกฎหมาย โดยหากพนักงานละเมิด พนักงานอาจต้องรับผิดทั้งทางแพ่งและทางอาญา
                    ตามที่กฎหมายกำหนด</p>
            </div>

            {/* Clause 6 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 6  ระยะเวลาการรักษาความลับ</p>
            </div>

            {/* Clause 6.1 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>6.1 พนักงานต้องรักษาความลับของข้อมูลลับที่ได้รับรู้หรือครอบครองนับตั้งแต่วันที่เริ่มทำงานกับบริษัท 
                    หรือวันที่ได้เข้าถึงข้อมูลลับดังกล่าว ไม่ว่าจะเกิดขึ้นก่อน หรือหลังจากลงนามสัญญาฉบับนี้</p>
            </div>

            {/* Clause 6.2 */}
            <div className="mb-4 ml-4 leading-[1.4] text-justify">
                <p>6.2 ภาระหน้าที่ในการรักษาความลับของพนักงานยังคงมีผลบังคับใช้อย่างต่อเนื่อง แม้สัญญาการจ้างงาน
                    ระหว่างบริษัทและพนักงานจะสิ้นสุดลง ด้วยสาเหตุใด ๆ ก็ตาม เป็นระยะเวลาที่ไม่น้อยกว่า 3 ปี หรือ
                    ตามระยะเวลาที่กฎหมายหรือสัญญากับคู่ค้า/ลูกค้ากำหนด</p>
            </div>

            {/* Clause 7 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 7  การละเมิดสัญญาและความรับผิด</p>
            </div>

            {/* Clause 7.1 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>7.1 หากพนักงานพบว่ามีเหตุการณ์หรือข้อมูลใด ๆ ที่อาจเป็นการละเมิดสัญญาความลับ (NDA) นี้ หรืออาจ
                    เป็นการกระทำผิดกฎหมายที่เกี่ยวข้อง พนักงานต้องแจ้งให้บริษัททราบทันทีโดยไม่ชักช้า</p>
            </div>

            {/* Clause 7.2 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>7.2 การละเมิดสัญญาความลับนี้โดยเจตนาหรือโดยประมาทเลินเล่อของพนักงาน อาจส่งผลให้พนักงาน
                    ต้องรับโทษทางวินัยตามระเบียบของบริษัท รวมถึงอาจต้องรับผิดชอบในทางแพ่งหรือทางอาญาตามที่
                    กฎหมายกำหนด หากมีการฟ้องร้องหรือเรียกร้องค่าเสียหายจากคู่ค้า/ลูกค้าหรือบุคคลภายนอก</p>
            </div>

            {/* Clause 7.3 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>7.3 พนักงานตกลงที่จะรับผิดชอบต่อความเสียหาย ความสูญเสีย ค่าใช้จ่าย และค่าเสียโอกาสใด ๆ ที่เกิด
                    ขึ้นกับบริษัทหรือคู่ค้า/ลูกค้า อันเนื่องมาจากการกระทำอันเป็นการฝ่าฝืนข้อกำหนดหรือบทบัญญัติ 
                    ใด ๆ ในสัญญาฉบับนี้</p>
            </div>

            {/* Clause 7.4 */}
            <div className="mb-4 ml-4 leading-[1.4] text-justify">
                <p>7.4 บริษัทมีสิทธิที่จะขอให้พนักงานชดใช้ค่าเสียหายที่เกิดขึ้นจริง รวมถึงค่าเสียหายเชิงลงโทษ (ถ้ามี) ใน
                    กรณีที่การละเมิดของพนักงานก่อให้เกิดความเสียหายร้ายแรงต่อประโยชน์หรือชื่อเสียงของบริษัทหรือ
                    คู่ค้า/ลูกค้า</p>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] right-[10mm] text-[10px] text-slate-500">
                หน้าที่ 3 | 4
            </div>
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-27 Rev.02 17/06/66<br/>
                www.ko.in.th Strategy . AI . DX . Sustainability
            </div>
        </div>

        {/* Page 4 */}
        <div 
            className="pdpa-page bg-white text-slate-900 mx-auto relative text-[12px] font-sans p-[20mm] shadow-sm print:shadow-none mt-8"
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
                    <img src={appLogo} alt="Logo" crossOrigin="anonymous" className="h-[100px] w-auto object-contain" />
                ) : (
                    <div className="h-[100px] w-[100px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">LOGO</div>
                )}
            </div>

            {/* Clause 8 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 8  ข้อยกเว้นในการรักษาความลับ</p>
                <p className="text-justify ml-4">ข้อมูลลับใด ๆ จะไม่ถือว่าเป็นความลับ หากพนักงานสามารถพิสูจน์ได้ว่าข้อมูลดังกล่าว</p>
            </div>

            <div className="mb-4 ml-4 leading-[1.4] text-justify ml-6">
                <p>ก. เป็นหรือได้กลายเป็นสาธารณะในภายหลัง โดยไม่ได้เกิดจากความผิดของพนักงาน</p>
                <p>ข. ได้รับการเปิดเผยโดยบุคคลอื่นที่มิใช่พนักงานหรือบริษัทโดยชอบด้วยกฎหมาย</p>
                <p>ค. ได้รับอนุญาตจากบริษัทหรือคู่ค้า/ลูกค้าให้เปิดเผยได้เป็นลายลักษณ์อักษร</p>
            </div>

            {/* Clause 9 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 9  การบังคับใช้สัญญา</p>
            </div>

            {/* Clause 9.1 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>9.1 หากข้อกำหนดใดในสัญญาฉบับนี้ขัดหรือแย้งกับกฎหมายและไม่สามารถบังคับใช้ได้ ให้ถือว่าข้อกำหนด
                    ดังกล่าวเป็นโมฆะเฉพาะในส่วนที่ขัดต่อกฎหมายเท่านั้น แต่จะไม่กระทบต่อความถูกต้องและความมีผล
                    บังคับของข้อกำหนดอื่น ๆ ในสัญญาฉบับนี้</p>
            </div>

            {/* Clause 9.2 */}
            <div className="mb-4 ml-4 leading-[1.4] text-justify">
                <p>9.2 บริษัทและพนักงานตกลงร่วมกันว่า หากมีการพิพาท โต้แย้ง หรือเรียกร้องใด ๆ อันเกิดจากหรือ
                    เกี่ยวข้องกับสัญญาฉบับนี้ ให้พยายามเจรจาไกล่เกลี่ยโดยสุจริต หากตกลงกันไม่ได้ ให้ดำเนินการตาม
                    กระบวนการตามกฎหมายต่อไป</p>
            </div>

            {/* Clause 10 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 10  บทบัญญัติทั่วไป</p>
            </div>

            {/* Clause 10.1 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>10.1 สัญญาฉบับนี้จัดทำขึ้นเป็นลายลักษณ์อักษรภาษาไทย และจะถูกตีความและบังคับใช้ตามกฎหมายไทย 
                    ในกรณีที่มีการแปลสัญญาฉบับนี้เป็นภาษาต่างประเทศ ให้ยึดถือต้นฉบับภาษาไทยเป็นหลัก</p>
            </div>

            {/* Clause 10.2 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>10.2 พนักงานไม่สามารถโอนสิทธิหรือหน้าที่ใด ๆ ภายใต้สัญญาฉบับนี้ให้แก่บุคคลภายนอกได้ เว้นแต่จะ
                    ได้รับความยินยอมเป็นลายลักษณ์อักษรจากบริษัท</p>
            </div>

            {/* Clause 10.3 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>10.3 การที่ฝ่ายใดฝ่ายหนึ่งไม่ใช้สิทธิ หรืองดเว้นการใช้สิทธิใด ๆ ตามสัญญาฉบับนี้ในบางโอกาส จะไม่ถือว่า
                    เป็นการสละสิทธิหรือก่อให้เกิดการหมดสิทธิแต่อย่างใด</p>
            </div>

            {/* Clause 10.4 */}
            <div className="mb-4 ml-4 ml-4 leading-[1.4] text-justify">
                <p>10.4 พนักงานรับทราบว่า บริษัทให้ความสำคัญกับความปลอดภัยด้านข้อมูล (Information Security) และ
                    ได้จัดทำนโยบายและมาตรการภายในเพื่อป้องกันการรั่วไหลของข้อมูล ดังนั้น พนักงานต้องปฏิบัติตาม
                    นโยบายดังกล่าวโดยเคร่งครัด</p>
            </div>

            {/* Clause 11 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 11 การลงนามและผลผูกพัน</p>
            </div>

            {/* Clause 11.1 */}
            <div className="mb-3 ml-4 leading-[1.4] text-justify">
                <p>11.1 สัญญาฉบับนี้มีผลผูกพันฝ่ายบริษัทและพนักงาน เมื่อทั้งสองฝ่ายลงนามในสัญญา และให้มีผลต่อเนื่อง
                    ไปตลอดระยะเวลาที่พนักงานยังคงปฏิบัติงานในบริษัท รวมถึงหลังสิ้นสุดการจ้างงานตามที่ระบุในข้อ 
                    6.2</p>
            </div>

            {/* Clause 11.2 */}
            <div className="mb-6 ml-4 leading-[1.4] text-justify">
                <p>11.2 ทั้งสองฝ่ายยอมรับว่าการละเมิดข้อตกลงตามสัญญานี้ อาจส่งผลให้ฝ่ายที่ได้รับความเสียหายเรียกร้อง
                    ค่าเสียหายหรือใช้มาตรการทางกฎหมายใด ๆ เพื่อคุ้มครองสิทธิและประโยชน์ของตน</p>
            </div>

            {/* Company Info Line */}
            <div className="mb-6 leading-[1.4] text-center">
                <p className="font-bold">บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด</p>
            </div>

            {/* Signatures */}
            <div className="mb-8 leading-[1.4]">
                <div className="grid grid-cols-3 gap-8">
                    {/* Company Signature */}
                    <div className="col-span-2">
                        <p className="mb-2">
                            ลงชื่อ
                            {companyData.companySignature ? (
                                <img src={companyData.companySignature} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[180px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            กรรมการผู้มีอำนาจลงนาม
                        </p>
                        <p className="mb-2 ml-3">(<span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 pb-1 ${companyData.signerName}`} style={{ verticalAlign: 'baseline', ...(!companyData.signerName && { minHeight: '1.2em' }) }}>{companyData.signerName || '\u00A0'}</span>)</p>
                        <p className="mb-2">วันที่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 pb-1 mx-2 ${companyData.companySignDate}`} style={{ verticalAlign: 'baseline', ...(!companyData.companySignDate && { minHeight: '1.2em' }) }}>{companyData.companySignDate || '\u00A0'}</span></p>
                    </div>

                    {/* Employee Signature */}
                    <div>
                        <p className="mb-2">
                            ลงชื่อ
                            {applicant?.signature_url ? (
                                <img src={applicant.signature_url} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            พนักงาน
                        </p>
                        <p className="mb-2 text-center">(<span className={`border-b border-dotted border-slate-400 inline-block min-w-[250px] text-center px-2 pb-1 ${applicant?.full_name}`} style={{ verticalAlign: 'baseline', ...(!applicant?.full_name && { minHeight: '1.2em' }) }}>{applicant?.full_name || '\u00A0'}</span>)</p>
                        <p className="mb-2">วันที่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 pb-1 mx-2 ${formData.employeeSignDate}`} style={{ verticalAlign: 'baseline', ...(!formData.employeeSignDate && { minHeight: '1.2em' }) }}>{formData.employeeSignDate || '\u00A0'}</span></p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] right-[10mm] text-[10px] text-slate-500">
                หน้าที่ 4 | 4
            </div>
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-27 Rev.02 17/06/66<br/>
                www.ko.in.th Strategy . AI . DX . Sustainability
            </div>
        </div>
        </>
    );
}