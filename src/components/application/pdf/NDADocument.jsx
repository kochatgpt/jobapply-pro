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

    return (
        <>
        {/* Page 1 */}
        <div 
            className="pdpa-page bg-white text-slate-900 mx-auto relative text-[12px] font-sans p-[20mm] shadow-sm print:shadow-none"
            style={{ 
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
                <p>เมื่อวันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 ${formData.contractDate ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.contractDate && { minHeight: '1.2em' }) }}>{formData.contractDate || ''}</span></p>
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
                    นาย/นาง/นางสาว<span className={`border-b border-dotted border-slate-400 inline-block min-w-[250px] text-center px-2 ${applicant?.full_name ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!applicant?.full_name && { minHeight: '1.2em' }) }}>{applicant?.full_name || ''}</span>เลขที่บัตรประชาชน <span className={`border-b border-dotted border-slate-400 inline-block min-w-[160px] text-center px-2 ${p.id_card ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!p.id_card && { minHeight: '1.2em' }) }}>{p.id_card || ''}</span>
                </p>
                <p>
                    อยู่บ้านเลขที่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[60px] text-center px-2 ${currentAddr.number ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.number && { minHeight: '1.2em' }) }}>{currentAddr.number || ''}</span>หมู่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[50px] text-center px-2 ${currentAddr.moo ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.moo && { minHeight: '1.2em' }) }}>{currentAddr.moo || ''}</span>ซอย<span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 ${currentAddr.soi ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.soi && { minHeight: '1.2em' }) }}>{currentAddr.soi || ''}</span>ถนน<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 ${currentAddr.road ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.road && { minHeight: '1.2em' }) }}>{currentAddr.road || ''}</span>
                </p>
                <p>
                    ตำบล/แขวง<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 ${currentAddr.subdistrict ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.subdistrict && { minHeight: '1.2em' }) }}>{currentAddr.subdistrict || ''}</span>อำเภอ/เขต<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 ${currentAddr.district ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.district && { minHeight: '1.2em' }) }}>{currentAddr.district || ''}</span>จังหวัด<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 ${currentAddr.province ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.province && { minHeight: '1.2em' }) }}>{currentAddr.province || ''}</span>
                </p>
                <p>
                    รหัสไปรษณีย์<span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 ${currentAddr.zipcode ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.zipcode && { minHeight: '1.2em' }) }}>{currentAddr.zipcode || ''}</span>เบอร์โทรศัพท์มือถือ<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 ${p.mobile_phone ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!p.mobile_phone && { minHeight: '1.2em' }) }}>{p.mobile_phone || ''}</span>ซึ่งต่อไปในสัญญานี้เรียกว่า "ลูกจ้าง" อีกฝ่ายหนึ่ง
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
            <div className="mb-3 leading-[1.4] text-justify">
                <p className="mb-1">1.1 บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด (ต่อไปนี้เรียกว่า "บริษัท") เป็นผู้ให้บริการจัดหา
                    บุคลากร เพื่อปฏิบัติงานในด้านต่าง ๆ ตามความต้องการของคู่ค้า/ลูกค้า ซึ่งอาจรวมถึงการสแกน
                    เอกสาร จัดเก็บข้อมูล บันทึกข้อมูลเข้าระบบ และงานบริการอื่น ๆ ที่เกี่ยวข้อง ตามขอบเขตที่คู่ค้า/
                    ลูกค้ากำหนด</p>
            </div>

            {/* Clause 1.2 */}
            <div className="mb-3 leading-[1.4] text-justify">
                <p>1.2 บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด ได้ทำสัญญาความลับ (NDA) และสัญญา 
                    ที่เกี่ยวข้องกับการคุ้มครองข้อมูลส่วนบุคคล (PDPA) กับคู่ค้า/ลูกค้า ตามกฎหมายและข้อบังคับที่มีผล
                    บังคับใช้ เพื่อรับรองว่าข้อมูลของคู่ค้า/ลูกค้า และข้อมูลของลูกค้าของคู่ค้า/ลูกค้า จะได้รับการคุ้มครอง
                    อย่างเหมาะสม</p>
            </div>

            {/* Clause 1.3 */}
            <div className="mb-3 leading-[1.4] text-justify">
                <p>1.3 พนักงาน (ต่อไปนี้เรียกว่า "พนักงาน") ซึ่งลงนามในสัญญาฉบับนี้ ตกลงที่จะรักษาความลับของข้อมูล
                    ทั้งหมดที่ได้รับหรือรับทราบจากบริษัท และ/หรือคู่ค้า/ลูกค้า และจะไม่เปิดเผย เผยแพร่ หรือกระทำ
                    การใด ๆ ที่เป็นการละเมิดต่อความลับดังกล่าว เว้นแต่จะได้รับความยินยอมเป็นลายลักษณ์อักษรจาก
                    และ/หรือคู่ค้า/ลูกค้าแล้ว</p>
            </div>

            {/* Clause 1.4 */}
            <div className="mb-3 leading-[1.4] text-justify">
                <p>1.4 คู่ค้า/ลูกค้า คือ ในที่นี้ หมายถึง องค์กร บริษัท หรือบุคคลใด ๆ ซึ่งได้ว่าจ้างหรือทำข้อตกลงกับบริษัท
                    เพื่อรับบริการจัดหาบุคลากร หรือมอบหมายงานต่าง ๆ ให้บริษัทดำเนินการ ซึ่งรวมถึงหน่วยงานในเครือ 
                    บริษัทในเครือ หรือผู้แทนที่ได้รับมอบอำนาจอย่างเป็นทางการของลูกค้า</p>
            </div>

            {/* Clause 1.5 */}
            <div className="mb-3 leading-[1.4] text-justify">
                <p>1.5 ลูกค้าของคู่ค้า/ลูกค้า หมายถึง บุคคล บริษัท หรือหน่วยงานใด ๆ ซึ่งเป็นผู้ที่คู่ค้า/ลูกค้าให้บริการอยู่
                    ก่อนแล้ว หรือต้องการให้บริการต่อ โดยที่อาจมีการส่งมอบข้อมูลหรือเอกสารของ ลูกค้าของคู่ค้า/ลูกค้า 
                    นั้นมาให้บริษัทดำเนินการตามคำสั่งคู่ค้า/ลูกค้า ซึ่งข้อมูลส่วนบุคคลและข้อมูลทางธุรกิจของ ลูกค้าของ 
                    คู่ค้า/ลูกค้า ยังคงได้รับการคุ้มครองภายใต้สัญญาฉบับนี้</p>
            </div>

            {/* Clause 1.6 */}
            <div className="mb-4 leading-[1.4] text-justify">
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
            <div className="mb-3 leading-[1.4] text-justify">
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
            <div className="mb-3 leading-[1.4] text-justify">
                <p>2.2 "การเปิดเผย" หมายถึง การกระทำใด ๆ ที่ทำให้ข้อมูลลับไปสู่บุคคลที่สาม ซึ่งมิใช่บริษัทหรือ 
                    ผู้มีอำนาจ ผู้แทน ของคู่ค้า/ลูกค้า โดยขาดสิทธิหรืออำนาจตามกฎหมายหรือสัญญา ไม่ว่าจะโดยการ
                    พูด เขียน พิมพ์ ส่งอีเมล หรือการเผยแพร่ด้วยวิธีอื่นใด</p>
            </div>

            {/* Clause 2.3 */}
            <div className="mb-3 leading-[1.4] text-justify">
                <p>2.3 "บุคคลที่สาม" หมายรวมถึง นิติบุคคลหรือบุคคลใด ๆ ที่ไม่ใช่คู่สัญญาในสัญญาฉบับนี้</p>
            </div>

            {/* Clause 2.4 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>2.4 "สัญญาฉบับนี้" หมายถึง สัญญาการรักษาความลับฉบับนี้ ตลอดจนภาคผนวกและเอกสารแนบท้าย
                    ทั้งหมด</p>
            </div>

            {/* Clause 3 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 3  ขอบเขตหน้าที่ของพนักงาน</p>
            </div>

            {/* Clause 3.1 */}
            <div className="mb-3 leading-[1.4] text-justify">
                <p>3.1 พนักงานตกลงจะปฏิบัติงานตามที่ได้รับมอบหมายจากบริษัทหรือคู่ค้า/ลูกค้าอย่างครบถ้วนและสุจริต 
                    โดยต้องเคารพกฎระเบียบ ข้อบังคับ ตลอดจนแนวทางปฏิบัติภายในสถานที่ทำงานของคู่ค้า/ลูกค้า</p>
            </div>

            {/* Clause 3.2 */}
            <div className="mb-3 leading-[1.4] text-justify">
                <p>3.2 พนักงานต้องไม่นำข้อมูลลับที่ได้รับในระหว่างการปฏิบัติงาน หรือเนื่องจากตำแหน่งหน้าที่หรือโดยเหตุ
                    อื่นใด ไปใช้โดยมิชอบ หรือเพื่อประโยชน์ส่วนตนหรือบุคคลที่สาม โดยไม่ได้รับอนุญาตเป็นลายลักษณ์
                    อักษรจากบริษัทหรือคู่ค้า/ลูกค้า</p>
            </div>

            {/* Clause 3.3 */}
            <div className="mb-3 leading-[1.4] text-justify">
                <p>3.3 พนักงานต้องไม่จัดทำ สำเนา ดัดแปลง ส่งต่อ หรือคัดลอกข้อมูลลับใด ๆ จากสื่อหรือระบบคอมพิวเตอร์
                    ของบริษัทหรือคู่ค้า/ลูกค้า ยกเว้นในกรณีที่จำเป็นต่อการปฏิบัติงาน และได้รับความยินยอมจากบุคคล
                    ที่มีอำนาจอนุมัติ</p>
            </div>

            {/* Clause 3.4 */}
            <div className="mb-3 leading-[1.4] text-justify">
                <p>3.4 พนักงานตกลงห้ามถ่ายภาพ ห้ามถ่ายวิดีโอ หรือบันทึกเสียงในพื้นที่ทำงานของบริษัทหรือของคู่ค้า/
                    ลูกค้าหากยังไม่ได้รับอนุญาตอย่างเป็นลายลักษณ์อักษร</p>
            </div>

            {/* Clause 3.5 */}
            <div className="mb-3 leading-[1.4] text-justify">
                <p>3.5 พนักงานต้องไม่เปิดเผยหรือนำข้อมูลลับของคู่ค้า/ลูกค้า และ/หรือลูกค้าของคู่ค้า/ลูกค้าไปเผยแพร่ ไม่
                    ว่าจะเป็นข้อมูลเอกสารที่สแกนหรือข้อมูลส่วนใด ๆ ในรูปแบบเอกสาร ดิจิทัล หรือบทสนทนา หาก
                    ไม่ได้รับอนุญาตจากบริษัทหรือคู่ค้า/ลูกค้าเป็นลายลักษณ์อักษร</p>
            </div>

            {/* Clause 3.6 */}
            <div className="mb-3 leading-[1.4] text-justify">
                <p>3.6 พนักงานต้องไม่เปิดเผยข้อมูลเกี่ยวกับอัตราเงินเดือน ค่าตอบแทน หรือเงื่อนไขทางการเงินอื่น ๆ ของ
                    ตนเอง รวมถึงข้อมูลทางการเงินของบริษัท แก่คู่ค้า/ลูกค้า บุคคลภายนอก หรือบุคคลอื่นใด เว้นแต่
                    บริษัทจะได้อนุญาตหรือกำหนดให้แจ้งข้อมูลดังกล่าว</p>
            </div>

            {/* Clause 3.7 */}
            <div className="mb-4 leading-[1.4] text-justify">
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

            {/* Clause 4 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 4  ระยะเวลาของการรักษาความลับ</p>
            </div>

            {/* Clause 4.1 */}
            <div className="mb-3 leading-[1.4] text-justify">
                <p>4.1 ข้อผูกพันในการรักษาความลับตามสัญญาฉบับนี้จะมีผลบังคับใช้ตลอดระยะเวลาที่พนักงานทำงานกับบริษัท 
                    และต่อเนื่องไปอีก 5 ปี (ห้าปี) นับจากวันที่พนักงานสิ้นสุดการเป็นพนักงานของบริษัท ไม่ว่าจะด้วยเหตุผล
                    ใดก็ตาม</p>
            </div>

            {/* Clause 4.2 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>4.2 ข้อผูกพันนี้ยังคงมีผลบังคับใช้แม้ว่าพนักงานจะพ้นสภาพจากการเป็นพนักงานของบริษัทแล้ว ไม่ว่าจะเป็น
                    การลาออก การเกษียณอายุ การเลิกจ้าง หรือการสิ้นสุดสัญญาจ้างงาน</p>
            </div>

            {/* Clause 5 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 5  การส่งคืนเอกสารและข้อมูล</p>
            </div>

            {/* Clause 5.1 */}
            <div className="mb-3 leading-[1.4] text-justify">
                <p>5.1 เมื่อสิ้นสุดการทำงาน หรือเมื่อได้รับการร้องขอจากบริษัท พนักงานต้องส่งคืนเอกสาร ข้อมูล และทรัพย์สิน
                    ทั้งหมดที่เกี่ยวข้องกับข้อมูลความลับ รวมถึงสำเนาทุกชุด ไม่ว่าจะอยู่ในรูปแบบเอกสารหรืออิเล็กทรอนิกส์</p>
            </div>

            {/* Clause 5.2 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>5.2 พนักงานต้องลบข้อมูลความลับทั้งหมดที่อาจมีอยู่ในอุปกรณ์อิเล็กทรอนิกส์ส่วนตัว (หากมีการใช้งานโดย
                    ได้รับอนุญาต) และต้องรับรองเป็นลายลักษณ์อักษรว่าได้ทำการลบข้อมูลดังกล่าวเรียบร้อยแล้ว</p>
            </div>

            {/* Clause 6 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 6  บทลงโทษและค่าเสียหาย</p>
            </div>

            {/* Clause 6.1 */}
            <div className="mb-3 leading-[1.4] text-justify">
                <p>6.1 หากพนักงานฝ่าฝืนหรือละเมิดข้อกำหนดในสัญญาฉบับนี้ พนักงานตกลงยินยอมรับผิดชอบต่อความเสียหาย
                    ทั้งหมดที่เกิดขึ้นกับบริษัท และ/หรือคู่ค้า/ลูกค้า และ/หรือลูกค้าของคู่ค้า/ลูกค้า</p>
            </div>

            {/* Clause 6.2 */}
            <div className="mb-3 leading-[1.4] text-justify">
                <p>6.2 พนักงานยินยอมให้บริษัทเลิกจ้างได้ทันทีโดยไม่ต้องบอกกล่าวล่วงหน้า และไม่ต้องจ่ายค่าชดเชยหรือ
                    ค่าเสียหายใด ๆ ในกรณีที่พนักงานฝ่าฝืนข้อกำหนดในสัญญาฉบับนี้</p>
            </div>

            {/* Clause 6.3 */}
            <div className="mb-3 leading-[1.4] text-justify">
                <p>6.3 นอกจากการเลิกจ้างตามข้อ 6.2 แล้ว พนักงานยินยอมชำระค่าเสียหายให้แก่บริษัทในจำนวนไม่น้อยกว่า
                    100,000 บาท (หนึ่งแสนบาทถ้วน) หรือตามจำนวนความเสียหายที่เกิดขึ้นจริง แล้วแต่จำนวนใดจะสูงกว่า</p>
            </div>

            {/* Clause 6.4 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>6.4 บริษัทมีสิทธิดำเนินคดีตามกฎหมายกับพนักงานที่ฝ่าฝืน ทั้งในทางแพ่งและทางอาญา รวมถึงการดำเนินคดี
                    ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 และพระราชบัญญัติว่าด้วยการกระทำความผิด
                    เกี่ยวกับคอมพิวเตอร์ พ.ศ. 2550</p>
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

            {/* Clause 7 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 7  การใช้อุปกรณ์อิเล็กทรอนิกส์และการเข้าถึงข้อมูล</p>
            </div>

            {/* Clause 7.1 */}
            <div className="mb-3 leading-[1.4] text-justify">
                <p>7.1 พนักงานตกลงว่าจะใช้อุปกรณ์อิเล็กทรอนิกส์ที่บริษัทจัดให้เท่านั้น และจะไม่นำอุปกรณ์ส่วนตัวมาใช้ในการ
                    ปฏิบัติงาน เว้นแต่ได้รับอนุญาตเป็นลายลักษณ์อักษรจากบริษัท</p>
            </div>

            {/* Clause 7.2 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>7.2 พนักงานตกลงว่าจะไม่เข้าถึงข้อมูลที่ไม่เกี่ยวข้องกับหน้าที่การทำงานของตน และจะไม่พยายามเข้าถึง
                    ระบบหรือข้อมูลที่ไม่ได้รับอนุญาต</p>
            </div>

            {/* Clause 8 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 8  การรับรองและการยอมรับ</p>
            </div>

            {/* Clause 8.1 */}
            <div className="mb-3 leading-[1.4] text-justify">
                <p>8.1 พนักงานรับรองว่าได้อ่านและเข้าใจข้อกำหนดในสัญญาฉบับนี้ทั้งหมดแล้ว และยินยอมผูกพันตาม
                    ข้อกำหนดดังกล่าวโดยสมัครใจ</p>
            </div>

            {/* Clause 8.2 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>8.2 พนักงานรับทราบว่าการฝ่าฝืนข้อกำหนดในสัญญาฉบับนี้อาจก่อให้เกิดความเสียหายร้ายแรง และอาจมีความผิด
                    ทางอาญาตามกฎหมายที่เกี่ยวข้อง</p>
            </div>

            {/* Final Statement */}
            <div className="mb-6 leading-[1.4] text-justify">
                <p className="mb-2">สัญญานี้ทำขึ้นเป็นสองฉบับ มีข้อความถูกต้องตรงกัน ทั้งสองฝ่ายได้อ่านและเข้าใจข้อความในสัญญานี้
                    โดยตลอดดีแล้ว เห็นว่าถูกต้องตรงตามเจตนาของตน จึงลงลายมือชื่อไว้เป็นหลักฐานสำคัญต่อหน้าพยาน 
                    และต่างยึดถือไว้ฝ่ายละฉบับ</p>
            </div>

            {/* Signatures */}
            <div className="mb-12 leading-[1.4] mt-8">
                <div className="grid grid-cols-2 gap-8">
                    {/* Company Signature */}
                    <div className="text-center">
                        <div className="mb-2">ลงชื่อ<span className="inline-block border-b border-dotted border-slate-400 w-[125px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>บริษัทฯ</div>
                        <p className="mb-2">(บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด)</p>
                        <p className="mb-4">โดย นายกฤษณ์พงษ์ สุคันโธ กรรมการผู้มีอำนาจลงนาม</p>
                    </div>

                    {/* Employee Signature */}
                    <div className="text-center">
                        <div className="mb-2">
                            ลงชื่อ
                            {applicant?.signature_url ? (
                                <img src={applicant.signature_url} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            พนักงาน
                        </div>
                        <p className="mb-2">({applicant?.full_name || '…………………………………..………………………'})</p>
                    </div>
                </div>
            </div>

            {/* Witnesses Section */}
            <div className="mb-6 leading-[1.4] text-center">
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <p>ลงชื่อ<span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>พยาน</p>
                        <p>(....................................................................)</p>
                    </div>
                    <div>
                        <p>ลงชื่อ<span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>พยาน</p>
                        <p>(....................................................................)</p>
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