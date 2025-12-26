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
                        );
                        }