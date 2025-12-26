import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function EmploymentContractDocument({ applicant, formData = {} }) {
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
                <h1 className="text-[18px] font-bold">สัญญาจ้างงาน</h1>
            </div>

            {/* Date and Contract Number */}
            <div className="mb-4 leading-[1.4]">
                <p className="indent-8">สัญญาฉบับนี้ทำขึ้นที่ บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด เมื่อวันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 ${formData.contractDate ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.contractDate && { minHeight: '1.2em' }) }}>{formData.contractDate || '\u00A0'}</span></p>
            </div>

            {/* Company Info */}
            <div className="mb-4 text-justify leading-[1.4]">
                <p className="indent-8">
                    ระหว่าง บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด  สำนักงานตั้งอยู่เลขที่ 15, 17 ซอยกรุงธนบุรี 4 ถนนกรุงธนบุรี 
                    แขวงบางลำภูล่าง เขตคลองสาน กรุงเทพมหานคร 10600 โดย นายกฤษณ์พงษ์ สุคันโธ หรือนางสาวอรนภา บุญพิพัฒนาพงศ์ กรรมการผู้มี
                    อำนาจกระทำการแทนบริษัทฯ ซึ่งต่อไปในสัญญานี้เรียกว่า  "บริษัท" ฝ่ายหนึ่ง กับ
                </p>
            </div>

            {/* Employee Info */}
            <div className="mb-4 text-justify leading-[1.4]">
                <p className="indent-8">
                    นาย/นาง/นางสาว<span className={`border-b border-dotted border-slate-400 inline-block min-w-[350px] text-center px-2 ${applicant?.full_name ? 'pb-1' : ''}`}>{applicant?.full_name || ''}</span>เลขที่บัตรประชาชน <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 ${p.id_card ? 'pb-1' : ''}`}>{p.id_card || ''}</span>อยู่
                    บ้านเลขที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2 ${formData.houseNumber ? 'pb-1' : ''}`}>{formData.houseNumber || ''}</span>หมู่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[50px] text-center px-2 ${formData.moo ? 'pb-1' : ''}`}>{formData.moo || ''}</span>ซอย<span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 ${formData.soi ? 'pb-1' : ''}`}>{formData.soi || ''}</span> ถนน<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 ${formData.road ? 'pb-1' : ''}`}>{formData.road || ''}</span>ตำบล/แขวง<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 ${formData.subdistrict ? 'pb-1' : ''}`}>{formData.subdistrict || ''}</span>อำเภอ/
                    เขต<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 ${formData.district ? 'pb-1' : ''}`}>{formData.district || ''}</span>จังหวัด<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 ${formData.province ? 'pb-1' : ''}`}>{formData.province || ''}</span>รหัสไปรษณีย์<span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 ${formData.zipcode ? 'pb-1' : ''}`}>{formData.zipcode || ''}</span>เบอร์โทรศัพท์มือถือ<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 ${p.mobile_phone ? 'pb-1' : ''}`}>{p.mobile_phone || ''}</span>ซึ่งต่อไปใน
                    สัญญานี้เรียกว่า "ลูกจ้าง" อีกฝ่ายหนึ่ง
                </p>
            </div>

            {/* Agreement Statement */}
            <div className="mb-4 leading-[1.4]">
                <p className="indent-8">คู่สัญญาทั้งสองฝ่ายตกลงทำสัญญากันโดยมีข้อความกันดังต่อไปนี้</p>
            </div>

            {/* Clause 1 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 1. วัตถุประสงค์ของสัญญา</p>
                <p>1.1 ระยะเวลาเริ่มและสิ้นสุดโครงการตั้งแต่วันที่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[60px] text-center px-2 ${formData.startDay ? 'pb-1' : ''}`}>{formData.startDay || ''}</span>เดือน<span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 ${formData.startMonth ? 'pb-1' : ''}`}>{formData.startMonth || ''}</span>พ.ศ.<span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2 ${formData.startYear ? 'pb-1' : ''}`}>{formData.startYear || ''}</span> ถึง วันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[60px] text-center px-2 ${formData.endDay ? 'pb-1' : ''}`}>{formData.endDay || ''}</span>เดือน<span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 ${formData.endMonth ? 'pb-1' : ''}`}>{formData.endMonth || ''}</span>พ.ศ.<span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2 ${formData.endYear ? 'pb-1' : ''}`}>{formData.endYear || ''}</span></p>
                <p>1.2 เริ่มต้นปฏิบัติงานในวันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[60px] text-center px-2 ${formData.workStartDay ? 'pb-1' : ''}`}>{formData.workStartDay || ''}</span> เดือน <span className={`border-b border-dotted border-slate-400 inline-block min-w-[120px] text-center px-2 ${formData.workStartMonth ? 'pb-1' : ''}`}>{formData.workStartMonth || ''}</span> พ.ศ.<span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 ${formData.workStartYear ? 'pb-1' : ''}`}>{formData.workStartYear || ''}</span></p>
                <p className="text-justify">1.3 ลูกจ้างจะต้องปฏิบัติหน้าที่ วันจันทร์ ถึง วันศุกร์ หรือกรณีที่บริษัทฯมีคำสั่งให้ลูกจ้างมาปฏิบัติหน้าที่ในวันเสาร์ ให้ถือเป็นวัน
                    ทำงานปกติ และ/หรือ วันจันทร์ ถึง วันอาทิตย์ในบางหน่วยงาน บริษัทฯและลูกจ้างอาจตกลงกันกำหนดให้มีวันหยุดประจำ
                    สัปดาห์วันใดก็ได้หยุดได้ 1วัน/ใน 1 สัปดาห์</p>
                <p>1.4 ในช่วงระหว่างปฏิบัติหน้าที่ เวลาเข้า-ออกงานเวลา <span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 ${formData.workTimeStart ? 'pb-1' : ''}`}>{formData.workTimeStart || ''}</span>นาฬิกา ถึงเวลา<span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 ${formData.workTimeEnd ? 'pb-1' : ''}`}>{formData.workTimeEnd || ''}</span>นาฬิกา หรือ  เวลา<span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 ${formData.workTimeAlt1 ? 'pb-1' : ''}`}>{formData.workTimeAlt1 || ''}</span>
                    ถึง<span className={`border-b border-dotted border-slate-400 inline-block min-w-[120px] text-center px-2 ${formData.workTimeAlt2 ? 'pb-1' : ''}`}>{formData.workTimeAlt2 || ''}</span>นาฬิกา และ/หรือกะเข้างานตามจริงที่ได้รับมอบหมาย</p>
                <p className="text-justify">1.5 ปฏิบัติหน้าที่ ในตำแหน่ง <span className={`border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center px-2 ${formData.position ? 'pb-1' : ''}`}>{formData.position || ''}</span>  เพื่อปฏิบัติหน้าที่ตามที่ได้รับมอบหมาย และ/หรือหน้าที่
                    ตามตำแหน่งอื่นใดอันอาจจะเกิดขึ้นในอนาคต ตามคุณสมบัติและความสามารถที่บริษัทฯได้พิจารณาเห็นสมควรและ
                    มอบหมายนั้น โดยลูกจ้างตกลงยินยอมรับทำงานให้กับบริษัทฯภายใต้หลักเกณฑ์การทำงาน เงื่อนไข ระเบียบ ข้อบังคับใดๆที่
                    บริษัทฯได้กำหนดและใช้บังคับในขณะทำสัญญา รวมถึงในอนาคต</p>
                <p className="text-justify">1.6 สังกัดหน่วยงาน<span className={`border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center px-2 ${formData.department ? 'pb-1' : ''}`}>{formData.department || ''}</span>แผนก/ฝ่าย<span className={`border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center px-2 ${formData.division ? 'pb-1' : ''}`}>{formData.division || ''}</span></p>
                <p className="text-justify indent-8">ทั้งนี้  ลูกจ้างยินยอมให้บริษัทฯพิจารณาปรับเปลี่ยนตำแหน่งงานของลูกจ้างไปทำงานในตำแหน่งอื่น และ/หรือ ในแผนกใดๆ ของ
                    บริษัทฯ รวมทั้งมีสิทธิปรับเพิ่ม/ลดค่าตอบแทนใดๆอันนอกเหนือจากเงินเดือนได้ตามที่บริษัทฯเห็นสมควรโดยไม่ต้องได้รับความยินยอมจาก
                    ลูกจ้าง ซึ่งการจ้างแรงงานตามสัญญาฉบับนี้ไม่มีการตกลงให้ทำงานล่วงเวลา เว้นแต่จะได้ตกลงกันไว้เป็นลายลักษณ์อักษรโดยชัดเจนในแต่ละ
                    ครั้งคราว รวมถึงในกรณีที่งานมีลักษณะหรือสภาพของงานที่ต้องทำติดต่อกัน ถ้าหยุดจะเสียหายแก่งาน หรือเป็นงานฉุกเฉินเร่งด่วน บริษัทฯ
                    จะให้ลูกจ้างทำงานล่วงเวลาในวันทำงาน หรือทำงานในวันหยุดตามความเหมาะสม โดยไม่ต้องได้รับความยินยอมจากลูกจ้างก่อน</p>
            </div>

            {/* Clause 2 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 2. ค่าตอบแทนการทำงาน เพื่อเป็นการตอบแทนการทำงานของลูกจ้าง บริษัทฯตกลงว่าจ้างให้ลูกจ้างเป็นประเภท</p>
                <p className="text-justify">2.1  ลูกจ้างรายวัน วันละ<span className={`border-b border-dotted border-slate-400 inline-block min-w-[120px] text-center px-2 ${formData.dailyRate ? 'pb-1' : ''}`}>{formData.dailyRate || ''}</span> บาท (<span className={`border-b border-dotted border-slate-400 inline-block min-w-[280px] text-center px-2 ${formData.dailyRateText ? 'pb-1' : ''}`}>{formData.dailyRateText || ''}</span>บาทถ้วน) และสวัสดิการอื่นๆตามความ
                    เหมาะสม(ถ้ามี) ทั้งนี้ ลูกจ้างตกลงยินยอมให้บริษัทฯนำเงินค่าจ้างของลูกจ้างเพื่อนำไปส่งเงินสมทบประกันสังคม และเงินภาษีอื่นๆ(ถ้ามี) 
                    ชำระตามอัตราที่กฎหมายกำหนด ก่อนทำจ่ายค่าจ้างให้แก่ลูกจ้างทุกๆเดือน โดยบริษัทฯไม่ต้องบอกกล่าวล่วงหน้า</p>
            </div>

            {/* Signatures */}
            <div className="mb-6 leading-[1.4] mt-8">
                <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                        <div className="mb-2">ลงชื่อ<span className="inline-block border-b border-dotted border-slate-400 w-[125px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>บริษัทฯ/นายจ้าง</div>
                    </div>
                    <div className="text-center">
                        <div className="mb-2">ลงชื่อ<span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>ลูกจ้าง</div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] right-[10mm] text-[10px] text-slate-500">
                หน้าที่ 1 | 9
            </div>
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-11 Rev.01 17/02/66<br/>
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

            {/* Clause 2.2 */}
            <div className="mb-4 leading-[1.4]">
                <p className="text-justify">2.2  ลูกจ้างรายเดือน เดือนละ<span className={`border-b border-dotted border-slate-400 inline-block min-w-[120px] text-center px-2 ${formData.monthlyRate ? 'pb-1' : ''}`}>{formData.monthlyRate || ''}</span> บาท (<span className={`border-b border-dotted border-slate-400 inline-block min-w-[280px] text-center px-2 ${formData.monthlyRateText ? 'pb-1' : ''}`}>{formData.monthlyRateText || ''}</span>บาทถ้วน) และสวัสดิการอื่นๆตามความ
                    เหมาะสม(ถ้ามี) ทั้งนี้ ลูกจ้างตกลงยินยอมให้บริษัทฯนำเงินค่าจ้างของลูกจ้างเพื่อนำไปส่งเงินสมทบประกันสังคม และเงินภาษีอื่นๆ(ถ้ามี) 
                    ชำระตามอัตราที่กฎหมายกำหนด ก่อนทำจ่ายค่าจ้างให้แก่ลูกจ้างทุกๆเดือน โดยบริษัทฯไม่ต้องบอกกล่าวล่วงหน้า</p>
            </div>

            {/* Clause 2.3 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p className="mb-2">2.3 ในการดำเนินการจ่ายค่าตอบแทนการทำงานให้แก่ลูกจ้างตามข้อ 2.1 และข้อ 2.2 บริษัทฯตกลงที่จะจ่ายค่าตอบแทนการ
                    ทำงานให้แก่ลูกจ้างวันสุดท้ายของทุกสิ้นเดือนในทุกๆเดือน ตัวอย่าง เช่น วันสุดท้ายของวันสิ้นเดือนตรงกับวันเสาร์ เงินค่าจ้างจะออกวันเสาร์ 
                    ถ้ากรณีวันสุดท้ายของวันสิ้นเดือนตรงกันวันอาทิตย์ จะเลื่อนเข้ามาออกวันเสาร์ แต่ถ้ากรณีวันสุดท้ายของวันสิ้นเดือนตรงกันวันศุกร์ เงิน
                    ค่าจ้างจะออกวันศุกร์ ทั้งนี้ปฏิทินในแต่ละเดือนจำนวนวันไม่เท่ากัน เพราะฉะนั้นให้ถือเป็นวันสุดท้ายของวันสิ้นเดือนในเดือนนั้นๆ โดยลูกจ้าง
                    ตกลงยินยอมให้บริษัทฯจ่ายค่าตอบแทนการทำงานให้แก่ลูกจ้างโดยวิธีการโอนเงินผ่านบัญชีธนาคาร<span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 ${formData.bankName ? 'pb-1' : ''}`}>{formData.bankName || ''}</span>บัญชีเลขที่ 
                    <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 ${formData.accountNumber ? 'pb-1' : ''}`}>{formData.accountNumber || ''}</span> ชื่อบัญชี <span className={`border-b border-dotted border-slate-400 inline-block min-w-[250px] text-center px-2 ${formData.accountName ? 'pb-1' : ''}`}>{formData.accountName || ''}</span> และ/หรือจ่ายค่าตอบแทนการทำงานโดย
                    วิธีการอื่นใดภายใต้หลักเกณฑ์เงื่อนไขตามที่บริษัทฯเห็นสมควรกำหนดโดยไม่ต้องได้รับความยินยอมจากลูกจ้าง</p>
            </div>

            {/* Clause 2.4 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p className="mb-2">2.4 คู่สัญญาทั้งสองฝ่ายตกลงว่า เพื่อมิให้การดำเนินกิจการของบริษัทฯหยุดชะงัก และ/หรือเกิดความเสียหายใดๆที่อาจเกิดขึ้นได้
                    จากการที่ลูกจ้างถูกเลิกจ้าง, การลาออกถูกต้องแต่สะสางงานไม่แล้วเสร็จตามข้อกำหนด, ลาออกกะทันหันแจ้งลาออกน้อยกว่า 30 วันและ/
                    หรือตามเงื่อนไขการลาออกข้อ 4.5 และข้อ 4.6 หรือสัญญาจ้างต้องสิ้นสุดลงตามระยะโครงการ หรือไม่ว่าเพราะสาเหตุใดๆลูกจ้างตกลง
                    ยินยอมให้บริษัทฯจ่ายค่าตอบแทนการทำงานงวดสุดท้ายให้กับลูกจ้างโดยวิธีการจ่ายให้ใน ลักษณะเช็คขีดคร่อม  ชื่อบัญชี 
                    <span className={`border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center px-2 ${formData.checkAccountName ? 'pb-1' : ''}`}>{formData.checkAccountName || ''}</span> ให้กับลูกจ้างเข้ามารับเช็คดังกล่าว ณ ที่ทำการของบริษัทฯด้วยตนเองในวันและเวลา
                    ทำการที่มิใช่วันเสาร์/วันอาทิตย์ รวมถึงวันหยุดนักขัตฤกษ์ ซึ่งเช็คจะออกประมาณวันที่ 5 ของเดือน กรณีตรงวันหยุดเลื่อนออกในวัน
                    ทำงานปกติ โดยฝ่ายบุคคลจะเป็นผู้ติดต่อประสานงานไปทางโทรศัพท์เพื่อแจ้งให้ลูกจ้างทราบก่อนเดินทางมารับเช็คดังกล่าว หากเช็ค
                    ดังกล่าวยังไม่ได้รับการอนุมัติตามขั้นตอนการตรวจสอบของบริษัทฯ หรือโดยวิธีการอื่นใดภายใต้หลักเกณฑ์และเงื่อนไขตามที่บริษัทฯกำหนด
                    โดยไม่จำเป็นต้องได้รับความยินยอมจากลูกจ้าง</p>

                <p className="indent-8">ลูกจ้างตกลงว่าก่อนที่ลูกจ้างจะรับค่าตอบแทนการทำงานในงวดสุดท้ายจากบริษัทฯตามวรรคก่อน ลูกจ้างมีหน้าที่จะต้องสรุปงานที่
                    อยู่ภายในความรับผิดชอบของลูกจ้างที่มีอยู่ ณ ปัจจุบันและรายงานให้กับผู้บังคับบัญชาทราบ  พร้อมทั้งส่งมอบงานในส่วนที่ลูกจ้าง
                    รับผิดชอบอยู่ทั้งทางตรง และทางอ้อมทั้งหมด  ให้แก่บริษัทฯ หรือบุคคล (พนักงาน)ที่บริษัทฯมอบหมายให้มารับหน้าที่ต่อจากลูกจ้าง  และ
                    ลูกจ้างจะต้องส่งมอบคืนทรัพย์สินใดๆของบริษัทฯที่อยู่ในความครอบครองของลูกจ้างให้แล้วเสร็จตามเงื่อนไขที่ระบุไว้ในสัญญาฉบับนี้ กรณีที่
                    ลูกจ้างเพิกเฉยไม่ดำเนินการบริษัทฯมีสิทธิที่จะยึดหน่วงค่าตอบแทนการทำงานงวดสุดท้ายได้จนกว่าลูกจ้างจะดำเนินการให้แล้วเสร็จ</p>
            </div>

            {/* Clause 3 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 3. การประเมินประสิทธิในการทำงาน</p>
                <p className="mb-2">3.1 ระยะเวลาการทดลองงาน<span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 ${formData.probationDays ? 'pb-1' : ''}`}>{formData.probationDays || ''}</span>วัน  และ/หรือระยะเวลาการประเมินตามเงื่อนไขของบริษัทฯ</p>
                <p className="text-justify">3.2 เพื่อติดตามผลการปฏิบัติงานของลูกจ้าง บริษัทฯจะพิจารณาประเมินผลการปฏิบัติหน้าที่และพฤติกรรมอื่นๆโดยรวมทุกๆ
                    เดือน งานที่ลูกจ้างได้รับมอบหมายต้องทำให้แล้วเสร็จวันต่อวัน ไม่มีงานค้าง และไม่มีงานซุกซ่อนเป็นเหตุให้บริษัทฯได้รับความเสียหายหาก
                    บริษัทฯพบว่าลูกจ้างได้กระทำการใดๆอันมีลักษณะเป็นการละเมิดต่อสัญญาการจ้างงาน หรือพบข้อผิดพลาดในการทำงานประมาณเลินเล่อ
                    เป็นเหตุให้บริษัทฯได้รับความเสียหาย ไม่ตรงตามวัตถุประสงค์ของการปฏิบัติงาน งานไม่มีคุณภาพและไม่มีประสิทธิภาพในการทำงาน งาน
                    ไม่ได้ตามเป้าหมายที่กำหนด ขาดการงานรายงานผลโดยไม่มีเหตุอันควร และ/หรือพบข้อร้องเรียนจากผู้บังคับบัญชา ,ลูกค้า หรือผู้เกี่ยวข้อง
                    หลายส่วนงาน รวมถึงกระทำผิดฝ่าฝืน ระเบียบ คำสั่ง ประกาศ ใดๆของบริษัทฯ เป็นต้น ให้ถือว่า ลูกจ้างไม่มีคุณสมบัติเพียงพอต่อบริษัทฯ 
                    บริษัทฯมีสิทธิเลิกจ้างลูกจ้างได้ทันทีโดยไม่ต้องบอกกล่าวล่วงหน้า และบริษัทฯไม่ต้องจ่ายเงินค่าชดเชย และค่าเสียหายใด ๆ ทั้งสิ้น</p>
            </div>

            {/* Signatures */}
            <div className="mb-6 leading-[1.4] mt-8">
                <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                        <div className="mb-2">ลงชื่อ<span className="inline-block border-b border-dotted border-slate-400 w-[125px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>บริษัทฯ/นายจ้าง</div>
                    </div>
                    <div className="text-center">
                        <div className="mb-2">ลงชื่อ<span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>ลูกจ้าง</div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] right-[10mm] text-[10px] text-slate-500">
                หน้าที่ 2 | 9
            </div>
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-11 Rev.01 17/02/66<br/>
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

            {/* Continuation of Clause 3.2 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p className="indent-8">และไม่ถือว่าเป็นการเลิกจ้างไม่เป็นธรรม และลูกจ้างตกลงยินยอมรับการพิจารณาประเมินผลการทำงานของบริษัทฯทุกประการ 
                    และตกลงที่จะไม่ดำเนินการฟ้องร้องดำเนินคดีกับบริษัทฯรวมถึงบุคคลที่เกี่ยวข้องกับการดำเนินงานดังกล่าว</p>
            </div>

            {/* Clause 3.3 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p className="mb-2">3.3 กรณีที่ลูกจ้างไม่มาปฏิบัติงาน ขาดงานละทิ้งหน้าที่ หรือลาหยุดงานผิดเงื่อนไขทุกกรณี โดยไม่มีเหตุอันควร รวมถึงการลาหยุด
                    งานเกินสิทธิ์ที่บริษัทฯกำหนดให้ และมาเข้า-ออกงานไม่ตรงตามที่บริษัทฯกำหนด บริษัทฯมีสิทธิที่จะไม่จ่ายค่าจ้างให้กับลูกจ้างในวันดังกล่าว
                    โดยไม่ต้องแจ้งให้ลูกจ้างทราบล่วงหน้า และ/หรือกรณีเลิกจ้างในกรณีหนึ่งกรณีใด อาทิ ทุจริตต่อหน้าที่หรือกระทำความผิดอาญาโดยเจตนา
                    แก่บริษัทฯ , จงใจทำให้บริษัทฯได้รับความเสียหาย , ประมาทเลินเล่อเป็นเหตุให้บริษัทฯได้รับความเสียหายร้ายแรง ,  
                    ห้ามมิให้ฝ่าฝืนข้อบังคับเกี่ยวกับการทำงานหรือระเบียบ คำสั่ง ประกาศใดๆของบริษัทฯ , ละทิ้งหน้าที่เป็นเวลา 3 วันทำงาน
                    ติดต่อกันไม่ว่าจะมีวันหยุดคั่นหรือไม่ก็ตาม , ได้รับโทษจำคุกตามคำพิพากษาถึงที่สุดให้จำคุก ลูกจ้างตกลงยินยอมไม่ติดใจเรียกร้องสินจ้าง
                    แทนการบอกกล่าวล่วงหน้า ค่าชดเชย และ/หรือค่าเสียหายอื่นใดจากการเลิกจ้างของบริษัทฯ รวมถึงจะไม่ใช้สิทธิฟ้องร้องดำเนินคดีเรียกร้อง
                    เงินใด ๆ ตามรายละเอียดข้างต้น และไม่ถือว่าเป็นการเลิกจ้างไม่เป็นธรรม</p>
            </div>

            {/* Clause 3.4 */}
            <div className="mb-4 leading-[1.4]">
                <p>3.4 วันลาและหลักเกณฑ์การลาหยุดงานให้เป็นไปตามเงื่อนไขบริษัทฯ</p>
            </div>

            {/* Clause 4 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 4. สิทธิและหน้าที่ของคู่สัญญา</p>
            </div>

            {/* Clause 4.1 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p className="mb-2">4.1  ลูกจ้างตกลงจะปฏิบัติตามระเบียบข้อบังคับเกี่ยวกับการทำงาน ประกาศ คำสั่งต่าง ๆ ของบริษัทฯ ที่มีอยู่อย่างเคร่งครัด ซึ่ง
                    ลูกจ้างได้รับทราบระเบียบข้อบังคับดังกล่าวในวันทำสัญญาฉบับนี้แล้ว  และหากลูกจ้างประพฤติผิดทางวินัย หรือระเบียบข้อบังคับข้อหนึ่งข้อ
                    ใด หรือกระทำความผิดอย่างร้ายแรง ลูกจ้างตกลงยินยอมไม่ติดใจเรียกร้องสินจ้างแทนการบอกกล่าวล่วงหน้า ค่าชดเชย และ/หรือ
                    ค่าเสียหายอื่นใดจากการเลิกจ้างของบริษัทฯ รวมถึงจะไม่ใช้สิทธิฟ้องร้องดำเนินคดีเรียกร้องเงินใด ๆ ตามรายละเอียดข้างต้น และไม่ถือว่า
                    เป็นการเลิกจ้างไม่เป็นธรรม</p>
            </div>

            {/* Clause 4.2 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p className="mb-2">4.2  ลูกจ้างตกลงว่าจะปฏิบัติหน้าที่ตามที่ได้รับมอบหมายจากบริษัทฯด้วยความซื่อสัตย์สุจริต ใช้ความระมัดระวังไม่ให้เกิดความ
                    เสียหายขึ้นแก่บริษัทฯ โดยลูกจ้างตกลงยินยอมรับเงื่อนไข หรือระเบียบข้อบังคับเกี่ยวกับการทำงานต่าง ๆ ที่บริษัทฯมีอยู่ในขณะนี้รวมถึงที่
                    จะมีขึ้นในอนาคต  โดยลูกจ้างตกลงจะทำทุกวิธีทาง และทุ่มเทกำลังความรู้ความสามารถของตนเพื่อทำให้งานที่ลูกจ้างได้รับมอบหมาย
                    บรรลุผลสำเร็จ และดำเนินไปได้ด้วยดี ตลอดจนนำพาให้บริษัทฯมีความเจริญก้าวหน้า และหมั่นศึกษาพัฒนาความรู้ความสามารถเพื่อเพิ่ม
                    ประสิทธิภาพในการทำงานให้กับบริษัทฯอย่างสม่ำเสมอ โดยลูกจ้างสัญญาว่า จะไม่กระทำการใด ๆที่ขัดต่อผลประโยชน์ หรือรบกวนขัดขวาง
                    ต่องานของบริษัทฯ</p>
            </div>

            {/* Clause 4.3 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p className="mb-2">4.3  ลูกจ้างสัญญาว่าจะไม่กระทำการใด ๆ อันเป็นการเปิดเผยความลับ , เปิดเผยข้อมูลรายชื่อลูกค้า คู่ค้า พนักงานของลูกค้า, 
                    วิธีการขั้นตอนในการดำเนินธุรกิจ แหล่งที่มาของข้อมูลสินค้า ราคาซื้อขาย กรรมวิธีการผลิต การบรรจุ การจัดส่ง การจัดเก็บ การนำเข้า – 
                    ส่งออก เงินเดือน หรือข้อมูลใด ๆ ที่ลูกจ้างทราบมา หรือข้อมูลที่เกี่ยวข้องทางการค้าของบริษัทฯให้แก่ผู้ใดรับทราบโดยเด็ดขาดไม่ว่าโดย
                    ทางตรงหรือโดยทางอ้อม และ/หรือโดยการประมาทเลินเล่อ  ไม่ว่าลูกจ้างจะได้รับทราบข้อมูลหรือสิ่งต่าง ๆ ดังกล่าวข้างต้นเนื่องจากการ
                    ปฏิบัติงาน และ/หรือได้ค้นพบในระหว่างระยะเวลาการทำงาน เว้นแต่ ลูกจ้างจะได้รับความยินยอมเป็นลายลักษณ์อักษรจากบริษัทฯโดย
                    ชัดเจน ทั้งนี้ ลูกจ้างสัญญาว่าลูกจ้างจะไม่ให้ความช่วยเหลือ และ/หรือให้คำปรึกษาแก่บุคคลใดๆในลักษณะที่อาจก่อให้เกิดความเสียหาย 
                    และ/หรือมีลักษณะอันเป็นการค้าแข่ง และ/หรือแข่งขันกับกิจการของบริษัทฯโดยเด็ดขาด</p>

                <p className="indent-8">ลูกจ้างตกลงว่าจะไม่นำทรัพย์สิน เอกสาร ข้อมูล ใดๆ ออกจากที่ตั้งทำการของบริษัทฯ และจะไม่เผยแพร่ต่อบุคคลภายนอก 
                    โดยเฉพาะบริษัทฯที่ประกอบธุรกิจเกี่ยวข้อง หรือมีลักษณะคล้ายกัน</p>
            </div>

            {/* Signatures in middle */}
            <div className="mb-6 leading-[1.4] my-8">
                <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                        <div className="mb-2">ลงชื่อ<span className="inline-block border-b border-dotted border-slate-400 w-[125px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>บริษัทฯ/นายจ้าง</div>
                    </div>
                    <div className="text-center">
                        <div className="mb-2">ลงชื่อ<span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>ลูกจ้าง</div>
                    </div>
                </div>
            </div>

            {/* Clause 4.4 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>4.4  ในระหว่างที่ลูกจ้างตกลงทำงานกับบริษัทฯ ลูกจ้างสัญญาว่าจะไม่ลาออกไปทำงานกับลูกค้า ,คู่แข่ง ,บริษัทฯอื่นๆ หรือนิติ
                    บุคคลอื่นใด รวมถึงภายในระยะเวลา 2 ปี (สอง) นับจากวันที่ลูกจ้างสิ้นสุดการเป็นพนักงานของบริษัทฯแล้ว ลูกจ้างรวมถึงคู่สมรส บุตร หรือ</p>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] right-[10mm] text-[10px] text-slate-500">
                หน้าที่ 3 | 9
            </div>
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-11 Rev.01 17/02/66<br/>
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

            {/* Continuation of Clause 4.4 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p className="mb-2">ตัวแทน ตกลงจะไม่ทำงานกับบริษัทฯคู่แข่ง ,ลูกค้า และ/หรือร่วมหุ้นอย่างหนึ่งอย่างใดอันเป็นการแข่งขันลักษณะเป็นการแข่งขันกับกิจการ
                    ของบริษัทฯ ตลอดจนจะไม่เข้าร่วม สนับสนุนในการประกอบกิจการของบุคคล และ/หรือนิติบุคคลอื่นในกรณีดังกล่าวนั้น ไม่ว่าโดยทางตรง
                    หรือทางอ้อม  ในกรณีที่บริษัทฯตรวจพบว่าลูกจ้างได้กระทำการใดๆอันมีลักษณะเป็นฝ่าฝืนข้อกำหนดดังกล่าว ลูกจ้างยินยอมให้บริษัทฯ
                    ดำเนินการตามกฎหมายจนถึงที่สุดต่อไป และลูกจ้างยินยอมชำระเงินค่าเสียหาย และค่าขาดประโยชน์ให้แก่บริษัทฯ และยินยอมที่จะหยุด 
                    และ/หรือยกเลิก การกระทำดังกล่าวเมื่อได้รับการแจ้งเป็นหนังสือจากบริษัทฯทันทีเมื่อได้รับหนังสือ</p>
            </div>

            {/* Clause 4.5 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p className="mb-2">4.5 ในกรณีลูกจ้างมีความประสงค์จะลาออกจากการทำงาน ลูกจ้างจะต้องแจ้งความประสงค์ดังกล่าวให้แก่บริษัทฯทราบล่วงหน้า
                    ไม่น้อยกว่า 30 วันเป็นลายลักษณ์อักษร และ/หรือระยะเวลาตาม ข้อ 4.6 เพื่อให้บริษัทฯ ได้สรรหาลูกจ้างบุคคลอื่นเข้ามาทำงานทดแทน
                    ตำแหน่งของลูกจ้างและเพื่อให้การส่งมอบงานเป็นไปด้วยความเรียบร้อย ครบถ้วนสมบูรณ์ โดยลูกจ้างมีหน้าที่จะต้องสรุปงานที่อยู่ภายใน
                    ความรับผิดชอบของลูกจ้างที่มีอยู่ ณ ปัจจุบันและรายงานให้กับผู้บังคับบัญชาทราบ  พร้อมทั้งส่งมอบงานในส่วนที่ลูกจ้างรับผิดชอบอยู่ทั้ง
                    ทางตรงและทางอ้อมทั้งหมดให้แก่บริษัทฯหรือบุคคลที่บริษัทฯมอบหมายให้มารับหน้าที่ต่อจากลูกจ้างนับจากวันที่ลูกจ้างได้ยื่นใบลาออก</p>

                <p className="indent-8">นอกจากหน้าที่ในการสรุป และส่งมอบงานของลูกจ้างตามวรรคก่อน  ลูกจ้างยังมีหน้าที่จะต้องส่งมอบทรัพย์สินที่อยู่ในความ
                    ครอบครองของลูกจ้าง  ข้อมูลต่าง ๆ ของบริษัทฯทั้งที่เป็นเอกสาร และเป็นข้อมูลทางคอมพิวเตอร์คืนให้แก่บริษัทฯภายในกำหนด 15 วัน 
                    (สิบห้าวัน) ก่อนครบกำหนดระยะเวลาการสิ้นสุดการทำงานวันสุดท้าย</p>
            </div>

            {/* Clause 4.6 */}
            <div className="mb-4 leading-[1.4]">
                <p className="mb-2">4.6 เงื่อนไขและหลักเกณฑ์เพิ่มเติมจากข้อ 4.5 มีดังนี้</p>
                <div className="ml-6">
                    <p>• อายุงาน 0 – 1 ปี ไม่เกิน 2 ปี แจ้งลาออกล่วงหน้าไม่น้อยกว่า 30 วัน (สามสิบวัน)</p>
                    <p>• อายุงาน 2 ปีไม่เกิน 3 ปี แจ้งลาออกล่วงหน้าไม่น้อยกว่า 60 วัน (หกสิบวัน)</p>
                    <p>• อายุงาน 3 ปีขึ้นไป แจ้งลาออกล่วงหน้าไม่น้อยกว่า 90 วัน (เก้าสิบวัน)</p>
                </div>
            </div>

            {/* Clause 4.7 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p className="mb-2">4.7 ภายหลังจากที่ลูกจ้างได้ยื่นใบลาออกแล้ว ลูกจ้างจะต้องปฏิบัติหน้าที่ของตนตามเดิมอย่างไม่บกพร่อง ไม่มีพฤติกรรมที่ไม่
                    เหมาะสม ไม่กล่าวพาดพิงบริษัทฯในทางหมิ่นประมาท หรือเสื่อมเสียชื่อเสียงทุกกรณี หรือพูดจาให้ลูกจ้างด้วยกันเองมีทัศนคติลบต่อบริษัทฯ 
                    หรือกลั่นแกล้งจงใจให้บริษัทฯได้รับความเสียหาย รวมถึงกล่าวพาดพิงบุคคลอื่นใดที่เข้าข่ายหมิ่นประมาทตามกฎหมาย ไม่ว่าจะกระทำโดย
                    การโฆษณาด้วยเอกสาร, ภาพวาด , ภาพระบายสี , ภาพยนตร์ , แผ่นเสียง , บันทึกภาพ , กระจายเสียง , กระจายภาพ , การป่าวประกาศ, 
                    โพสต์ทางระบบโซเชียล หรือด้วยวิธีอื่นใด เป็นต้น หากในกรณีที่บริษัทฯตรวจพบว่าลูกจ้างได้กระทำการใดๆอันมีลักษณะเป็นฝ่าฝืน
                    ข้อกำหนดดังกล่าวลูกจ้างยินยอมให้บริษัทฯดำเนินการตามกฎหมายจนถึงที่สุดต่อไป</p>

                <p className="indent-8">ลูกจ้างสัญญาว่าจะไม่นำข้อมูลของบริษัทฯไปโดยไม่ได้รับอนุญาต หากลูกจ้างฝ่าฝืนลูกจ้างยินยอมให้บริษัทฯหักเงินส่วนหนึ่งหรือ
                    ทั้งหมดของเงินเดือนค่าจ้าง , ค่าล่วงเวลา , ค่ากะ , ค่าตำแหน่ง , ค่าเบี้ยขยัน , เบี้ยเลี้ยงพิเศษ และ/หรือเงินได้อื่นๆที่ลูกจ้างพึงจะได้รับ รวม
                    หมายถึงเงินค้ำประกัน (ถ้ามี) ตามจำนวนเงินที่บริษัทฯ เห็นว่าเหมาะสมกับความเสียหายนั้น ๆ และลูกจ้างยินยอมให้บริษัทฯปรับเป็นจำนวน 
                    2 เท่า (สอง) ของรายได้ค่าจ้างและ/หรือค่าตอบแทนทั้งหมด หรือ 2 เท่า (สอง) ของค่าเสียหายที่เกิดขึ้นกับบริษัทฯ</p>
            </div>

            {/* Clause 4.8 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>4.8 เมื่อสัญญาจ้างแรงงานฉบับนี้สิ้นสุดลงไม่ว่าด้วยเหตุใดๆ นอกเหนือจากกรณีที่ลูกจ้างแสดงเจตนาขอลาออกจากงานตามข้อ 4.5 
                    และเพิ่มเติมข้อ 4.6 ลูกจ้างมีหน้าที่จะต้องส่งคืนซึ่งทรัพย์สิน ยานพาหนะ เครื่องมือ อุปกรณ์  แบบพิมพ์ คู่มือ บันทึก รายงานวัสดุอื่น ๆ และ
                    ทรัพย์สินอื่นใดอันเกี่ยวกับการดำเนินกิจการของบริษัทฯ และที่อยู่ภายใต้การควบคุมดูแลครอบครองของลูกจ้างให้แก่บริษัทฯในสภาพ
                    สมบูรณ์โดยทันทีภายในวันที่สัญญาได้สิ้นสุดลง และในกรณีที่มีความเสียหายขึ้นกับทรัพย์สินต่างๆดังกล่าวข้างต้นลูกจ้างตกลงที่จะชำระ
                    ค่าเสียหายให้แก่บริษัทฯเต็มตามจำนวนแห่งราคาทรัพย์สินนั้นพร้อมด้วยดอกเบี้ยในอัตราร้อยละ 15 ต่อปี (สิบห้าบาท) ของราคาทรัพย์สิน
                    ดังกล่าว กรณีที่ลูกจ้างไม่คืนทรัพย์สินภายในระยะเวลาทำงานวันสุดท้ายลูกจ้างยืนยันว่าการกระทำนั้นเป็นการที่ลูกจ้างเจตนาที่จะยักยอก</p>
            </div>

            {/* Signatures */}
            <div className="mb-6 leading-[1.4] mt-8">
                <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                        <div className="mb-2">ลงชื่อ<span className="inline-block border-b border-dotted border-slate-400 w-[125px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>บริษัทฯ/นายจ้าง</div>
                    </div>
                    <div className="text-center">
                        <div className="mb-2">ลงชื่อ<span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>ลูกจ้าง</div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] right-[10mm] text-[10px] text-slate-500">
                หน้าที่ 4 | 9
            </div>
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-11 Rev.01 17/02/66<br/>
                www.ko.in.th Strategy . AI . DX . Sustainability
            </div>
        </div>
        </>
    );
}