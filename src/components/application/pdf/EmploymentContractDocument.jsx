import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function EmploymentContractDocument({ applicant, formData = {}, companyData = {} }) {
          const { data: settings } = useQuery({
              queryKey: ['system_settings_layout'],
              queryFn: () => base44.entities.SystemSetting.list(),
              staleTime: 1000 * 60 * 5 
          });

          const appLogo = settings?.find(s => s.key === 'app_logo')?.value;
          const p = applicant?.personal_data || {};
          const currentAddr = p.current_address || {};

          const formatDate = (dateString) => {
              if (!dateString) return '';
              const date = new Date(dateString);
              const day = String(date.getDate()).padStart(2, '0');
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const year = date.getFullYear();
              return `${day}/${month}/${year}`;
          };

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
                <p className="indent-8">สัญญาฉบับนี้ทำขึ้นที่ บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด เมื่อวันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 pb-1 ${formData.contractDate}`} style={{ verticalAlign: 'baseline', ...(!formData.contractDate && { minHeight: '1.2em' }) }}>{formData.contractDate ? formatDate(formData.contractDate) : '\u00A0'}</span></p>
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
                    นาย/นาง/นางสาว<span className={`border-b border-dotted border-slate-400 inline-block min-w-[250px] text-center px-2 pb-1 ${applicant?.full_name}`} style={{ verticalAlign: 'baseline', ...(!applicant?.full_name && { minHeight: '1.2em' }) }}>{applicant?.full_name || '\u00A0'}</span>เลขที่บัตรประชาชน <span className={`border-b border-dotted border-slate-400 inline-block min-w-[160px] text-center px-2 pb-1 ${p.id_card}`} style={{ verticalAlign: 'baseline', ...(!p.id_card && { minHeight: '1.2em' }) }}>{p.id_card || '\u00A0'}</span>อยู่
                    บ้านเลขที่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[60px] text-center px-2 pb-1 ${(formData.houseNumber || currentAddr.number)}`} style={{ verticalAlign: 'baseline', ...((formData.houseNumber || currentAddr.number) && { minHeight: '1.2em' }) }}>{formData.houseNumber || currentAddr.number || '\u00A0'}</span>หมู่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[50px] text-center px-2 pb-1 ${(formData.moo || currentAddr.moo)}`} style={{ verticalAlign: 'baseline', ...((formData.moo || currentAddr.moo) && { minHeight: '1.2em' }) }}>{formData.moo || currentAddr.moo || '\u00A0'}</span>ซอย<span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 pb-1 ${(formData.soi || currentAddr.soi)}`} style={{ verticalAlign: 'baseline', ...((formData.soi || currentAddr.soi) && { minHeight: '1.2em' }) }}>{formData.soi || currentAddr.soi || '\u00A0'}</span>ถนน<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 pb-1 ${(formData.road || currentAddr.road)}`} style={{ verticalAlign: 'baseline', ...((formData.road || currentAddr.road) && { minHeight: '1.2em' }) }}>{formData.road || currentAddr.road || '\u00A0'}</span>ตำบล/แขวง<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 pb-1 ${(formData.subdistrict || currentAddr.subdistrict)}`} style={{ verticalAlign: 'baseline', ...((formData.subdistrict || currentAddr.subdistrict) && { minHeight: '1.2em' }) }}>{formData.subdistrict || currentAddr.subdistrict || '\u00A0'}</span>อำเภอ/เขต
                    <span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 pb-1 ${(formData.district || currentAddr.district)}`} style={{ verticalAlign: 'baseline', ...((formData.district || currentAddr.district) && { minHeight: '1.2em' }) }}>{formData.district || currentAddr.district || '\u00A0'}</span>จังหวัด<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 pb-1 ${(formData.province || currentAddr.province)}`} style={{ verticalAlign: 'baseline', ...((formData.province || currentAddr.province) && { minHeight: '1.2em' }) }}>{formData.province || currentAddr.province || '\u00A0'}</span>รหัสไปรษณีย์<span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 pb-1 ${(formData.zipcode || currentAddr.zipcode)}`} style={{ verticalAlign: 'baseline', ...((formData.zipcode || currentAddr.zipcode) && { minHeight: '1.2em' }) }}>{formData.zipcode || currentAddr.zipcode || '\u00A0'}</span>เบอร์โทรศัพท์มือถือ<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 pb-1 ${p.mobile_phone ? 'pb-1' : '\u00A0'}`} style={{ verticalAlign: 'baseline', ...(!p.mobile_phone && { minHeight: '1.2em' }) }}>{p.mobile_phone || '\u00A0'}</span>ซึ่งต่อไปใน
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
                <p>1.1 ระยะเวลาเริ่มและสิ้นสุดโครงการตั้งแต่วันที่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 pb-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>{formData.startDate ? new Date(formData.startDate).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) : '\u00A0'}</span> ถึง วันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 pb-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>{formData.endDate ? new Date(formData.endDate).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) : '\u00A0'}</span></p>
                    <p>1.2 เริ่มต้นปฏิบัติงานในวันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 pb-1`} style={{ verticalAlign: 'baseline', minHeight: '1.2em' }}>{formData.workStartDate ? new Date(formData.workStartDate).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) : '\u00A0'}</span></p>
                <p className="text-justify">1.3 ลูกจ้างจะต้องปฏิบัติหน้าที่ วันจันทร์ ถึง วันศุกร์ หรือกรณีที่บริษัทฯมีคำสั่งให้ลูกจ้างมาปฏิบัติหน้าที่ในวันเสาร์ ให้ถือเป็นวัน
                    ทำงานปกติ และ/หรือ วันจันทร์ ถึง วันอาทิตย์ในบางหน่วยงาน บริษัทฯและลูกจ้างอาจตกลงกันกำหนดให้มีวันหยุดประจำ
                    สัปดาห์วันใดก็ได้หยุดได้ 1วัน/ใน 1 สัปดาห์</p>
                <p>1.4 ในช่วงระหว่างปฏิบัติหน้าที่ เวลาเข้า-ออกงานเวลา <span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 pb-1 ${formData.workTimeStart}`} style={{ verticalAlign: 'baseline', ...(!formData.workTimeStart && { minHeight: '1.2em' }) }}>{formData.workTimeStart || '\u00A0'}</span>นาฬิกา ถึงเวลา<span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 pb-1 ${formData.workTimeEnd}`} style={{ verticalAlign: 'baseline', ...(!formData.workTimeEnd && { minHeight: '1.2em' }) }}>{formData.workTimeEnd || '\u00A0'}</span>นาฬิกา หรือ  เวลา<span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 pb-1 ${formData.workTimeAlt1}`} style={{ verticalAlign: 'baseline', ...(!formData.workTimeAlt1 && { minHeight: '1.2em' }) }}>{formData.workTimeAlt1 || '\u00A0'}</span>
                    ถึง<span className={`border-b border-dotted border-slate-400 inline-block min-w-[120px] text-center px-2 pb-1 ${formData.workTimeAlt2}`} style={{ verticalAlign: 'baseline', ...(!formData.workTimeAlt2 && { minHeight: '1.2em' }) }}>{formData.workTimeAlt2 || '\u00A0'}</span>นาฬิกา และ/หรือกะเข้างานตามจริงที่ได้รับมอบหมาย</p>
                <p className="text-justify">1.5 ปฏิบัติหน้าที่ ในตำแหน่ง <span className={`border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center px-2 pb-1 ${formData.position}`} style={{ verticalAlign: 'baseline', ...(!formData.position && { minHeight: '1.2em' }) }}>{formData.position || '\u00A0'}</span>  เพื่อปฏิบัติหน้าที่ตามที่ได้รับมอบหมาย และ/หรือหน้าที่
                    ตามตำแหน่งอื่นใดอันอาจจะเกิดขึ้นในอนาคต ตามคุณสมบัติและความสามารถที่บริษัทฯได้พิจารณาเห็นสมควรและ
                    มอบหมายนั้น โดยลูกจ้างตกลงยินยอมรับทำงานให้กับบริษัทฯภายใต้หลักเกณฑ์การทำงาน เงื่อนไข ระเบียบ ข้อบังคับใดๆที่
                    บริษัทฯได้กำหนดและใช้บังคับในขณะทำสัญญา รวมถึงในอนาคต</p>
                <p className="text-justify">1.6 สังกัดหน่วยงาน<span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 pb-1 ${formData.department}`} style={{ verticalAlign: 'baseline', ...(!formData.department && { minHeight: '1.2em' }) }}>{formData.department || '\u00A0'}</span>แผนก/ฝ่าย<span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 pb-1 ${formData.division}`} style={{ verticalAlign: 'baseline', ...(!formData.division && { minHeight: '1.2em' }) }}>{formData.division || '\u00A0'}</span></p>
                <p className="text-justify indent-8">ทั้งนี้  ลูกจ้างยินยอมให้บริษัทฯพิจารณาปรับเปลี่ยนตำแหน่งงานของลูกจ้างไปทำงานในตำแหน่งอื่น และ/หรือ ในแผนกใดๆ ของ
                    บริษัทฯ รวมทั้งมีสิทธิปรับเพิ่ม/ลดค่าตอบแทนใดๆอันนอกเหนือจากเงินเดือนได้ตามที่บริษัทฯเห็นสมควรโดยไม่ต้องได้รับความยินยอมจาก
                    ลูกจ้าง ซึ่งการจ้างแรงงานตามสัญญาฉบับนี้ไม่มีการตกลงให้ทำงานล่วงเวลา เว้นแต่จะได้ตกลงกันไว้เป็นลายลักษณ์อักษรโดยชัดเจนในแต่ละ
                    ครั้งคราว รวมถึงในกรณีที่งานมีลักษณะหรือสภาพของงานที่ต้องทำติดต่อกัน ถ้าหยุดจะเสียหายแก่งาน หรือเป็นงานฉุกเฉินเร่งด่วน บริษัทฯ
                    จะให้ลูกจ้างทำงานล่วงเวลาในวันทำงาน หรือทำงานในวันหยุดตามความเหมาะสม โดยไม่ต้องได้รับความยินยอมจากลูกจ้างก่อน</p>
            </div>

            {/* Clause 2 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 2. ค่าตอบแทนการทำงาน เพื่อเป็นการตอบแทนการทำงานของลูกจ้าง บริษัทฯตกลงว่าจ้างให้ลูกจ้างเป็นประเภท</p>
                <p className="text-justify">2.1  ลูกจ้างรายวัน วันละ<span className={`border-b border-dotted border-slate-400 inline-block min-w-[120px] text-center px-2 pb-1 ${formData.dailyRate}`} style={{ verticalAlign: 'baseline', ...(!formData.dailyRate && { minHeight: '1.2em' }) }}>{formData.dailyRate || '\u00A0'}</span> บาท (<span className={`border-b border-dotted border-slate-400 inline-block min-w-[280px] text-center px-2 pb-1 ${formData.dailyRateText}`} style={{ verticalAlign: 'baseline', ...(!formData.dailyRateText && { minHeight: '1.2em' }) }}>{formData.dailyRateText || '\u00A0'}</span>บาทถ้วน) และสวัสดิการอื่นๆตามความ
                    เหมาะสม(ถ้ามี) ทั้งนี้ ลูกจ้างตกลงยินยอมให้บริษัทฯนำเงินค่าจ้างของลูกจ้างเพื่อนำไปส่งเงินสมทบประกันสังคม และเงินภาษีอื่นๆ(ถ้ามี) 
                    ชำระตามอัตราที่กฎหมายกำหนด ก่อนทำจ่ายค่าจ้างให้แก่ลูกจ้างทุกๆเดือน โดยบริษัทฯไม่ต้องบอกกล่าวล่วงหน้า</p>
            </div>

            {/* Signatures */}
            <div className="mb-6 leading-[1.4] mt-8">
                <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                        <div className="mb-2">
                            ลงชื่อ
                            {companyData?.authorizedPersonSignature ? (
                                <img src={companyData.authorizedPersonSignature} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[125px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            บริษัทฯ/นายจ้าง
                        </div>
                        <p className="text-[11px]">({companyData?.authorizedPerson || '...........................'})</p>
                    </div>
                    <div className="text-center">
                        <div className="mb-2">
                            ลงชื่อ
                            {applicant?.signature_url ? (
                                <img src={applicant.signature_url} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            ลูกจ้าง
                        </div>
                        <p className="text-[11px]">({applicant?.full_name || '...........................'})</p>
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
                <p className="text-justify">2.2  ลูกจ้างรายเดือน เดือนละ<span className={`border-b border-dotted border-slate-400 inline-block min-w-[120px] text-center px-2 pb-1 ${formData.monthlyRate}`} style={{ verticalAlign: 'baseline', ...(!formData.monthlyRate && { minHeight: '1.2em' }) }}>{formData.monthlyRate || '\u00A0'}</span> บาท (<span className={`border-b border-dotted border-slate-400 inline-block min-w-[280px] text-center px-2 pb-1 ${formData.monthlyRateText}`} style={{ verticalAlign: 'baseline', ...(!formData.monthlyRateText && { minHeight: '1.2em' }) }}>{formData.monthlyRateText || '\u00A0'}</span>บาทถ้วน) และสวัสดิการอื่นๆตามความ
                    เหมาะสม(ถ้ามี) ทั้งนี้ ลูกจ้างตกลงยินยอมให้บริษัทฯนำเงินค่าจ้างของลูกจ้างเพื่อนำไปส่งเงินสมทบประกันสังคม และเงินภาษีอื่นๆ(ถ้ามี) 
                    ชำระตามอัตราที่กฎหมายกำหนด ก่อนทำจ่ายค่าจ้างให้แก่ลูกจ้างทุกๆเดือน โดยบริษัทฯไม่ต้องบอกกล่าวล่วงหน้า</p>
            </div>

            {/* Clause 2.3 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p className="mb-2">2.3 ในการดำเนินการจ่ายค่าตอบแทนการทำงานให้แก่ลูกจ้างตามข้อ 2.1 และข้อ 2.2 บริษัทฯตกลงที่จะจ่ายค่าตอบแทนการ
                    ทำงานให้แก่ลูกจ้างวันสุดท้ายของทุกสิ้นเดือนในทุกๆเดือน ตัวอย่าง เช่น วันสุดท้ายของวันสิ้นเดือนตรงกับวันเสาร์ เงินค่าจ้างจะออกวันเสาร์ 
                    ถ้ากรณีวันสุดท้ายของวันสิ้นเดือนตรงกันวันอาทิตย์ จะเลื่อนเข้ามาออกวันเสาร์ แต่ถ้ากรณีวันสุดท้ายของวันสิ้นเดือนตรงกันวันศุกร์ เงิน
                    ค่าจ้างจะออกวันศุกร์ ทั้งนี้ปฏิทินในแต่ละเดือนจำนวนวันไม่เท่ากัน เพราะฉะนั้นให้ถือเป็นวันสุดท้ายของวันสิ้นเดือนในเดือนนั้นๆ โดยลูกจ้างตกลงยินยอมให้บริษัทฯจ่ายค่าตอบแทนการทำงานให้แก่ลูกจ้างโดยวิธีการโอนเงินผ่านบัญชีธนาคาร<span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 pb-1 ${formData.bankName}`} style={{ verticalAlign: 'baseline', ...(!formData.bankName && { minHeight: '1.2em' }) }}>{formData.bankName || '\u00A0'}</span>บัญชีเลขที่ 
                    <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 pb-1 ${formData.accountNumber}`} style={{ verticalAlign: 'baseline', ...(!formData.accountNumber && { minHeight: '1.2em' }) }}>{formData.accountNumber || '\u00A0'}</span> ชื่อบัญชี <span className={`border-b border-dotted border-slate-400 inline-block min-w-[250px] text-center px-2 pb-1 ${formData.accountName}`} style={{ verticalAlign: 'baseline', ...(!formData.accountName && { minHeight: '1.2em' }) }}>{formData.accountName || '\u00A0'}</span> และ/หรือจ่ายค่าตอบแทนการทำงานโดย
                    วิธีการอื่นใดภายใต้หลักเกณฑ์เงื่อนไขตามที่บริษัทฯเห็นสมควรกำหนดโดยไม่ต้องได้รับความยินยอมจากลูกจ้าง</p>
            </div>

            {/* Clause 2.4 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p className="mb-2">2.4 คู่สัญญาทั้งสองฝ่ายตกลงว่า เพื่อมิให้การดำเนินกิจการของบริษัทฯหยุดชะงัก และ/หรือเกิดความเสียหายใดๆที่อาจเกิดขึ้นได้
                    จากการที่ลูกจ้างถูกเลิกจ้าง, การลาออกถูกต้องแต่สะสางงานไม่แล้วเสร็จตามข้อกำหนด, ลาออกกะทันหันแจ้งลาออกน้อยกว่า 30 วันและ/
                    หรือตามเงื่อนไขการลาออกข้อ 4.5 และข้อ 4.6 หรือสัญญาจ้างต้องสิ้นสุดลงตามระยะโครงการ หรือไม่ว่าเพราะสาเหตุใดๆลูกจ้างตกลง
                    ยินยอมให้บริษัทฯจ่ายค่าตอบแทนการทำงานงวดสุดท้ายให้กับลูกจ้างโดยวิธีการจ่ายให้ใน ลักษณะเช็คขีดคร่อม  ชื่อบัญชี 
                    <span className={`border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center px-2 pb-1 ${formData.checkAccountName}`} style={{ verticalAlign: 'baseline', ...(!formData.checkAccountName && { minHeight: '1.2em' }) }}>{formData.checkAccountName || '\u00A0'}</span> ให้กับลูกจ้างเข้ามารับเช็คดังกล่าว ณ ที่ทำการของบริษัทฯด้วยตนเองในวันและเวลา
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
                <p className="mb-2">3.1 ระยะเวลาการทดลองงาน<span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 pb-1 ${formData.probationDays}`} style={{ verticalAlign: 'baseline', ...(!formData.probationDays && { minHeight: '1.2em' }) }}>{formData.probationDays || '\u00A0'}</span>วัน  และ/หรือระยะเวลาการประเมินตามเงื่อนไขของบริษัทฯ</p>
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
                        <div className="mb-2">
                            ลงชื่อ
                            {companyData?.authorizedPersonSignature ? (
                                <img src={companyData.authorizedPersonSignature} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[125px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            บริษัทฯ/นายจ้าง
                        </div>
                        <p className="text-[11px]">({companyData?.authorizedPerson || '...........................'})</p>
                    </div>
                    <div className="text-center">
                        <div className="mb-2">
                            ลงชื่อ
                            {applicant?.signature_url ? (
                                <img src={applicant.signature_url} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            ลูกจ้าง
                        </div>
                        <p className="text-[11px]">({applicant?.full_name || '...........................'})</p>
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
                       <div className="mb-2">
                           ลงชื่อ
                           {companyData?.authorizedPersonSignature ? (
                               <img src={companyData.authorizedPersonSignature} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                           ) : (
                               <span className="inline-block border-b border-dotted border-slate-400 w-[125px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                           )}
                           บริษัทฯ/นายจ้าง
                       </div>
                       <p className="text-[11px]">({companyData?.authorizedPerson || '...........................'})</p>
                   </div>
                   <div className="text-center">
                       <div className="mb-2">
                           ลงชื่อ
                           {applicant?.signature_url ? (
                               <img src={applicant.signature_url} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                           ) : (
                               <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                           )}
                           ลูกจ้าง
                       </div>
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
                        <div className="mb-2">
                            ลงชื่อ
                            {companyData?.authorizedPersonSignature ? (
                                <img src={companyData.authorizedPersonSignature} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[125px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            บริษัทฯ/นายจ้าง
                        </div>
                        <p className="text-[11px]">({companyData?.authorizedPerson || '...........................'})</p>
                    </div>
                    <div className="text-center">
                        <div className="mb-2">
                            ลงชื่อ
                            {applicant?.signature_url ? (
                                <img src={applicant.signature_url} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            ลูกจ้าง
                        </div>
                        <p className="text-[11px]">({applicant?.full_name || '...........................'})</p>
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

        {/* Page 5 */}
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

            {/* Continuation of Clause 4.8 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p className="mb-2">ทรัพย์สินนั้นของบริษัทฯเพื่อเป็นของตนเอง รวมถึงในกรณีที่ลูกจ้างกู้ยืมเงินจากบริษัทฯไป ลูกจ้างตกลงยินยอมให้บริษัทฯหักกลบ
                    ลบหนี้เงินกู้ยืมดังกล่าวเงินตามจำนวนที่มีการกู้ยืมทั้งต้นเงิน และดอกเบี้ยจากเงินต่างๆที่ลูกจ้างมีสิทธิได้รับจากบริษัทฯได้ทันทีโดยไม่ต้อง
                    ได้รับความยินยอมจากลูกจ้าง</p>
            </div>

            {/* Clause 4.9 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p className="mb-2">4.9 ในกรณีที่บริษัทฯมีนโยบายในการส่งเสริมพัฒนาทักษะการทำงานของลูกจ้าง โดยการส่งลูกจ้างเข้ารับการอบรม สัมมนา ศึกษา 
                    ดูงานต่างๆ  ไม่ว่าภายในประเทศและ/หรือในต่างประเทศ ตามความสมัครใจของลูกจ้าง โดยบริษัทฯเป็นผู้ออกค่าใช้จ่ายทั้งหมดหรือบางส่วน 
                    เพื่อเป็นการตอบแทนการดำเนินการดังกล่าวข้างต้น ลูกจ้างตกลงว่าจะไม่ลาออก และ/หรือดำเนินการใดๆ ในลักษณะที่ทำให้ลูกจ้างจำต้อง
                    สิ้นสภาพการเป็นลูกจ้างภายในกำหนดระยะเวลา 1 ปี (หนึ่งปี) นับจากวันสุดท้ายที่ได้เข้าอบรม สัมมนา ศึกษาดูงานดังกล่าวเสร็จสิ้น</p>

                <p className="indent-8 mb-2">ในกรณีที่ลูกจ้างประพฤติผิดสัญญาตามวรรคก่อน ลูกจ้างตกลงชดใช้ค่าเสียหายในส่วนนี้ให้แก่บริษัทฯเท่ากับ 10 เท่าของมูลค่าที่
                    บริษัทฯได้เสียค่าใช้จ่ายในการดำเนินการนั้น ๆ รวมกันทั้งหมดตลอดระยะเวลาที่เป็นลูกจ้างตามสัญญาในข้อนี้อีกส่วนหนึ่ง และค่าเสียหาย
                    จำนวน 3 เท่า ของอัตราเงินเดือนที่ได้รับในเดือนสุดท้าย</p>

                <p className="indent-8">ลูกจ้างตกลงว่า บรรดาทรัพย์สิน  ใบอนุญาต  และ/หรือสิทธิใดๆที่เกิดขึ้นเนื่องจากการที่บริษัทฯส่งลูกจ้างไปทำการฝึกอบรม
                    หลักสูตรต่างๆนั้นตามวรรคก่อน เป็นกรรมสิทธิ์ของบริษัทฯแต่เพียงผู้เดียว ลูกจ้างจะไม่ทำการอ้างสิทธิ จำหน่าย หรือโอนไปซึ่งทรัพย์สิน 
                    ใบอนุญาต และ/หรือสิทธิใดๆอันเกิดขึ้นจากการฝึกอบรมดังกล่าวให้แก่บุคคลอื่นๆเว้นแต่จะได้รับอนุญาตโดยชัดแจ้งเป็นลายลักษณ์อักษร
                    จากบริษัทฯ</p>
            </div>

            {/* Clause 4.10 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>4.10 คู่สัญญาทั้งสองฝ่ายตกลงว่า บริษัทฯมีสิทธิโอนย้ายเปลี่ยนแปลง ลักษณะหน้าที่การทำงาน แต่งตั้ง ถอดถอนตำแหน่ง การ
                    เปลี่ยนแปลงเวลาทำงาน รวมทั้งโอนย้ายลูกจ้างไปทำงานบริษัทฯในเครือ หรือบริษัทฯที่มีกรรมการ หรือผู้ถือหุ้นของบริษัทฯ เป็นผู้ถือหุ้น
                    หรือเป็นกรรมการภายในบริษัทฯนั้นๆ หรือสำนักงานสาขาของบริษัทฯได้ตามที่บริษัทฯเห็นสมควร โดยความตกลงยินยอมของทั้งสองฝ่าย ใน
                    กรณีเมื่อพ้นกำหนดระยะเวลา 30 วัน (สามสิบวัน) หลังจากได้มีการแจ้งโอนย้ายเปลี่ยนแปลง ลักษณะหน้าที่การทำงาน แต่งตั้ง ถอดถอน
                    ตำแหน่ง การเปลี่ยนแปลงเวลาการทำงานดังกล่าวข้างต้นแล้ว หากลูกจ้างไม่มีการโต้แย้งคัดค้านเป็นหนังสือถึงบริษัทฯ ให้ถือว่าลูกจ้างได้ตก
                    ลงยินยอมและยอมรับในการโอนย้ายเปลี่ยนแปลง ลักษณะหน้าที่การทำงาน แต่งตั้ง ถอดถอนตำแหน่ง การเปลี่ยนแปลงเวลาการทำงาน 
                    ดังกล่าว</p>
            </div>

            {/* Clause 4.11 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>4.11 ลูกจ้างต้องไม่ปลุกระดมชักชวนลูกจ้างด้วยกันเองมาร่วมชุมนุมก่อความวุ่นวายให้แก่บริษัทฯได้รับความเสียหาย ห้ามลูกจ้าง
                    ทะเลาะวิวาท หรือทำร้ายร่างกายบุคคลใดในบริเวณสถานที่ทำงาน และลูกจ้างต้องไม่แสวงหาผลประโยชน์ส่วนตัวอันมิชอบ ห้ามลูกจ้างเล่น
                    การพนันทุกประเภท ห้ามหยอกล้อเล่นกันขณะปฏิบัติงาน ประมาทเลินเล่อเป็นเหตุให้บริษัทฯได้รับความเสียหาย ลูกจ้างต้องไม่ทุจริตต่อการ
                    รายงาน และไม่นำพาเสพสารเสพติดทุกประเภท หรือเสพสุรา แอลกอฮอล์ รวมถึงนำอาวุธร้ายแรงเข้ามาในบริเวณสถานที่ปฏิบัติงานของ
                    บริษัทฯโดยรวม</p>
            </div>

            {/* Clause 4.12 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>4.12 ลูกจ้างต้องไม่เปลี่ยนแปลง ดังแปลง แก้ไข ตัดทอน ปลอมลายเซ็น หรือทำลายเอกสาร ซุกซ่อนเอกสาร รวมถึงระบบการ
                    จัดการข้อมูลบริษัทฯโดยไม่รับอนุญาตจากบริษัทฯเป็นลายลักษณ์อักษร</p>
            </div>

            {/* Clause 4.13 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>4.13 ลูกจ้างต้องไม่เข้าไปในบริเวณสถานที่ปฏิบัติงานบุคคลอื่นที่บริษัทฯไม่ได้อนุญาต และมิใช่หน้าที่รับผิดขอบของตนเอง รวมถึง
                    ห้ามลูกจ้างเข้า-ออกเวลาสถานที่ปฏิบัติงานของบริษัทฯนอกเหนือเวลาทำการที่บริษัทฯกำหนดให้โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร</p>
            </div>

            {/* Clause 4.14 */}
            <div className="mb-4 leading-[1.4]">
                <p>4.14 ลูกจ้างต้องบันทึกเวลาเข้า-ออกตามที่บริษัทฯกำหนด และต้องไม่บันทึกเวลาเข้า-ออกแทนกัน</p>
            </div>

            {/* Clause 4.15 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>4.15 ในระหว่างที่ลูกจ้างตกลงทำงานให้กับบริษัทฯนั้น ลูกจ้างสัญญาว่าจะดำเนินการเกี่ยวกับตนเองให้ถูกต้องกฎหมาย และตกลง
                    ว่าจะไม่ทำให้ตนเองตกอยู่ในฐานะเป็นจำเลยของศาลทั้งคดีแพ่งและ/หรือคดีอาญาใดๆ ในกรณีที่ลูกจ้างจำต้องตกอยู่ภายใต้คำพิพากษาของ</p>
            </div>

            {/* Signatures */}
            <div className="mb-6 leading-[1.4] mt-8">
                <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                        <div className="mb-2">
                            ลงชื่อ
                            {companyData?.authorizedPersonSignature ? (
                                <img src={companyData.authorizedPersonSignature} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[125px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            บริษัทฯ/นายจ้าง
                        </div>
                        <p className="text-[11px]">({companyData?.authorizedPerson || '...........................'})</p>
                    </div>
                    <div className="text-center">
                        <div className="mb-2">
                            ลงชื่อ
                            {applicant?.signature_url ? (
                                <img src={applicant.signature_url} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            ลูกจ้าง
                        </div>
                        <p className="text-[11px]">({applicant?.full_name || '...........................'})</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] right-[10mm] text-[10px] text-slate-500">
                หน้าที่ 5 | 9
            </div>
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-11 Rev.01 17/02/66<br/>
                www.ko.in.th Strategy . AI . DX . Sustainability
            </div>
        </div>

        {/* Page 6 */}
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

            {/* Continuation of Clause 4.15 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p className="mb-2">ศาลใดศาลหนึ่งในคดีอาญาและมีคำพิพากษาลงโทษจำคุก และ/หรือ ในคดีแพ่งที่มีคำพิพากษา ให้ถือว่าลูกจ้างเป็นผู้ขาดซึ่งคุณสมบัติในการ
                    ทำงานกับบริษัทฯ ซึ่งในกรณีเช่นนี้ ลูกจ้างตกลงกับบริษัทฯให้ถือว่าเป็นการตกลงสิ้นสุดการทำงานกับบริษัทฯและ/หรือให้ถือว่าเป็นความผิด
                    ร้ายแรงที่บริษัทฯสามารถเลิกจ้างลูกจ้างได้โดยไม่ต้องบอกกล่าวล่วงหน้า บริษัทฯไม่ต้องจ่ายค่าชดเชยใดๆให้แก่ลูกจ้างทั้งสิ้น รวมถึงลูกจ้าง
                    จะไม่ฟ้องร้องดำเนินคดีกับบริษัทฯ และไม่ถือว่าเป็นการเลิกจ้างไม่เป็นธรรม</p>
            </div>

            {/* Clause 4.16 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>4.16 ในกรณีที่ลูกจ้างกระทำความผิดร้ายแรงเป็นเหตุให้บริษัทฯเลิกจ้าง หากบริษัทฯได้รับการติดต่อขอข้อมูลของลูกจ้างบุคคลใด 
                    และ/หรือจากลูกจ้างใหม่ /บริษัทฯใหม่ ลูกจ้างยินยอมให้บริษัทฯแจ้งข้อมูลแก่บุคคลดังกล่าว  และ/หรือนายจ้างใหม่ /บริษัทฯใหม่ ได้โดยไม่
                    ถือว่าเป็นความผิดฐานหมิ่นประมาท</p>
            </div>

            {/* Highlighted Section: Clause 4.17-4.21 */}
            <div className="mb-4 leading-[1.4] text-justify p-4">
                <p className="mb-2 indent-8">4.17 การกำหนดให้ลูกจ้างรับผิดชอบต่อความเสียหายที่เกิดขึ้นกับบริษัทฯโดยมีเงื่อนไขที่ชัดเจนนั้น โดยหลักการแล้วไม่ขัดต่อ
                    กฎหมายแรงงานของไทย โดยเฉพาะเมื่อมีการระบุเงื่อนไขที่สำคัญดังนี้:</p>
                
                <div className="ml-6 mb-2">
                    <p>4.17.1 ความเสียหายเกิดจากการกระทำของลูกจ้างโดยตรง</p>
                    <p>4.17.2 ลูกจ้างมีเจตนาในการกระทำผิด</p>
                    <p>4.17.3 มีการให้ความยินยอมไว้ล่วงหน้าในสัญญาจ้าง</p>
                </div>

                <p className="mb-2 indent-8">พระราชบัญญัติคุ้มครองแรงงาน พ.ศ. 2541 มาตรา 76 ระบุว่านายจ้างไม่สามารถหักค่าจ้างพนักงานได้ เว้นแต่เป็นการหักเพื่อ
                    ชดใช้ค่าเสียหายที่ลูกจ้างได้กระทำโดยจงใจหรือประมาทเลินเล่ออย่างร้ายแรง โดยได้รับความยินยอมจากลูกจ้าง</p>

                <p className="mb-2">อย่างไรก็ตาม มีข้อควรระวังดังนี้:</p>

                <p className="mb-1">4.18 การเรียกร้องค่าเสียหายต้องเป็นไปตามความเสียหายที่เกิดขึ้นจริง ไม่ใช่การกำหนดค่าปรับในอัตราที่ตายตัวล่วงหน้า</p>

                <p className="mb-1">4.19 การหักค่าจ้างเพื่อชดใช้ค่าเสียหายยังคงต้องเป็นไปตามสัดส่วนที่เหมาะสม ไม่เกิน 10% ของค่าจ้างในแต่ละงวด ตามที่
                    กฎหมายกำหนด</p>

                <p className="mb-1">4.20 นายจ้างมีภาระในการพิสูจน์ว่าความเสียหายเกิดจากการกระทำโดยเจตนาหรือประมาทเลินเล่ออย่างร้ายแรงของลูกจ้างจริง</p>

                <p>4.21 ดังนั้น ข้อความในสัญญาที่คุณระบุมาจึงไม่ขัดต่อกฎหมายแรงงาน หากมีการดำเนินการอย่างถูกต้องตามหลักเกณฑ์ที่
                    กฎหมายกำหนด</p>
            </div>

            {/* Clause 5 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 5. คำรับรอง</p>
            </div>

            {/* Clause 5.1 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p className="mb-2">5.1 ลูกจ้างรับรองว่าข้อความ/ข้อมูลในใบสมัครงาน และเอกสารต่าง ๆ ที่ได้มอบไว้กับบริษัทฯเป็นข้อมูลที่ถูกต้องตรงกับความจริง
                    ทุกประการ บริษัทฯ และลูกจ้างตกลงให้ถือว่าใบสมัครงานของลูกจ้าง และระเบียบการทำงานเป็นส่วนหนึ่งของสัญญานี้</p>
            </div>

            {/* Clause 5.2 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>5.2 ในวันทำสัญญาจ้างงานฉบับนี้ ลูกจ้างทราบดีว่าการที่บริษัทฯได้ตกลงรับลูกจ้างเข้าทำงานกับบริษัทฯตามสัญญานี้ เนื่องมาจาก
                    ลูกจ้างได้แจ้งแสดงหลักฐาน และได้ให้คำรับรองต่อบริษัทฯ ว่า ลูกจ้างเป็นผู้มีคุณสมบัติตามที่กำหนดในประกาศรับสมัครงาน และ/หรือ
                    รายละเอียดเงื่อนไขการรับเข้าทำงาน มีรายละเอียดข้อมูลสถานที่อยู่ บุคคลอ้างอิง ประวัติ ความสามารถตามที่บริษัทฯ ต้องการ รวมถึงมี
                    คุณสมบัติ ข้อมูลอื่น ๆ ตามข้อมูลที่ลูกจ้างได้ระบุให้ไว้ในใบสมัครงาน และ/หรือตามคุณสมบัติที่ได้รับรองไว้กับบริษัทฯ  ซึ่งบริษัทฯถือ
                    รายละเอียดในใบสมัคร และคำรับรองทั้งหมดเป็นสาระสำคัญในการประกอบการพิจารณารับสมัครเข้าทำงาน หากปรากฏในภายหลังไม่ว่า
                    กรณีใด ๆ ว่าลูกจ้างไม่มีคุณสมบัติ หรือไม่มีความสามารถตามที่ได้แจ้งไว้กับบริษัทฯ หรือข้อมูลที่ระบุไว้ในใบสมัครเป็นเท็จไม่ตรงกับที่ได้แจ้ง
                    และแสดงหลักฐาน หรือรับรองไว้ หรือในกรณีที่ลูกจ้างได้แสดงหลักฐานอันเป็นเท็จ หรือปกปิดข้อความจริงซึ่งหากบริษัทฯทราบตั้งแต่ต้น
                    อาจทำให้บริษัทฯไม่รับเข้าทำงานกับบริษัทฯหรือจงใจทำให้บริษัทฯได้รับความเสียหาย  ลูกจ้างยินยอมให้บริษัทฯมีสิทธิเลิกจ้างลูกจ้างได้
                    ทันที โดยไม่ต้องบอกกล่าวล่วงหน้า และบริษัทฯไม่ต้องจ่ายเงินค่าชดเชย และค่าเสียหายใด ๆ ให้กับลูกจ้างทั้งสิ้น  รวมถึงลูกจ้างจะไม่
                    ฟ้องร้องดำเนินคดีเรียกร้องเงินใด ๆ ตามรายละเอียดข้างต้น และไม่ถือว่าเป็นการเลิกจ้างไม่เป็นธรรม</p>
            </div>

            {/* Signatures */}
            <div className="mb-6 leading-[1.4] mt-8">
                <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                        <div className="mb-2">
                            ลงชื่อ
                            {companyData?.authorizedPersonSignature ? (
                                <img src={companyData.authorizedPersonSignature} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[125px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            บริษัทฯ/นายจ้าง
                        </div>
                        <p className="text-[11px]">({companyData?.authorizedPerson || '...........................'})</p>
                    </div>
                    <div className="text-center">
                        <div className="mb-2">
                            ลงชื่อ
                            {applicant?.signature_url ? (
                                <img src={applicant.signature_url} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            ลูกจ้าง
                        </div>
                        <p className="text-[11px]">({applicant?.full_name || '...........................'})</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] right-[10mm] text-[10px] text-slate-500">
                หน้าที่ 6 | 9
            </div>
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-11 Rev.01 17/02/66<br/>
                www.ko.in.th Strategy . AI . DX . Sustainability
            </div>
        </div>

        {/* Page 7 */}
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

            {/* Clause 6 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 6. ข้อตกลงเกี่ยวกับทรัพย์สินทางปัญญา</p>
            </div>

            {/* Clause 6.1 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p className="mb-2">6.1 ลูกจ้างตกลงว่าบรรดาผลงานต่าง ๆ รวมถึงลิขสิทธิ์ เช่น งานวรรณกรรม งานวิจัย งานวิเคราะห์ งานเขียนโครงการ  งาน
                    โปรแกรมคอมพิวเตอร์ หรืองานอื่นใดอันมีลักษณะอย่างเดียวกัน สิทธิบัตร เครื่องหมายการค้า  ความลับทางการค้า  ตลอดจนทรัพย์สินทาง
                    ปัญญาอื่น ๆ เช่น ภายถ่าย วีดีโอ ภาพนิ่ง งานออกแบบต่างๆ ภาพเคลื่อนไหว บทความ งานเขียน เป็นต้น ที่ลูกจ้างได้กระทำขึ้นตลอด
                    ระยะเวลาที่เป็นลูกจ้าง ลูกจ้างตกลงยินยอมยกให้บริษัทฯเป็นเจ้าของ และ/หรือเป็นผู้มีสิทธิใน ลิขสิทธิ์หรือทรัพย์สินทางปัญญาทุกประเภทที่
                    ลูกจ้างได้สร้างสรรค์ขึ้นและมีสิทธิเด็ดขาดแต่เพียงผู้เดียว ให้มีผลอยู่ตลอดอายุแห่งการคุ้มครองผลงานที่ลูกจ้างได้สร้างสรรค์ขึ้นให้แก่บริษัทฯ 
                    ตาม พระราชบัญญัติลิขสิทธิ์ พ.ศ.2537 ทั้งนี้ ลูกจ้างรับทราบว่างานซึ่งลูกจ้างได้ทำการสร้างสรรค์ พัฒนา และ/หรือจัดทำสิ่งต่าง ๆ เหล่านั้น
                    ขึ้นมาเป็นการดำเนินการและ/หรือจัดทำในนามบริษัทฯ เพื่อประโยชน์ของบริษัทฯแต่เพียงผู้เดียว และลูกจ้างไม่ได้มีเจตนาดำเนินการเพื่อ
                    ตนเองแต่อย่างใด</p>
            </div>

            {/* Clause 6.2 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>6.2  ลูกจ้างตกลงว่าจะไม่นำงานอันมีลิขสิทธิ์ของบริษัทฯ ตามข้อ 6.1 ดังกล่าว ไปใช้และ/หรือทำการเผยแพร่ต่อบุคคลใดทั้งใน
                    ขณะที่เป็นลูกจ้าง และ/หรือเมื่อพ้นสภาพการเป็นลูกจ้างแล้ว ไม่ว่าทั้งทางตรงหรือทางอ้อม โดยไม่ได้รับความยินยอมเป็นลายลักษณ์อักษร
                    จากบริษัทฯ เพื่อประโยชน์ในการปฏิบัติตามสัญญาฉบับนี้ลูกจ้างตกลงจะส่งมอบงานนั้น ๆ ให้แก่บริษัทฯทันทีในขณะทำงานดังกล่าวแล้ว
                    เสร็จ หรือในวันก่อนวันสุดท้ายของการทำงานกรณีที่ลูกจ้างลาออกจากงาน ถูกเลิกจ้างหรือด้วยเหตุผลอื่นใดที่ทำให้ลูกจ้างพ้นสภาพจากการ 
                    เป็นพนักงานแล้วแต่กรณี โดยลูกจ้างตกลงที่จะให้ความร่วมมือกับบริษัทฯในการลงนามในเอกสารใด ๆ และกระทำการใด ๆ ที่จำเป็นในการ
                    โอนสิทธิ์หรือบันทึกความเป็นเจ้าของทรัพย์สินทางปัญญาต่าง ๆ ดังกล่าวข้างต้นกับ กรมทรัพย์สินทางปัญญา กระทรวงพาณิชย์ และ/หรือ
                    หน่วยงานราชการอื่นที่เกี่ยวข้องกับการดังกล่าวโดยไม่เรียกร้องค่าตอบแทนอื่นใดจากบริษัทฯ ทั้งนี้ผลงานต่าง ๆ ที่กล่าวมานั้น ให้รวมถึง
                    ผลงานที่ลูกจ้างได้จัดทำขึ้นโดยใช้เอกสารข้อมูลอันได้กระทำขึ้นในขณะเป็นลูกจ้าง</p>
            </div>

            {/* Clause 7 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 7. เหตุสุดวิสัย</p>
            </div>

            {/* Clause 7.1 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>7.1  กรณีที่เกิดการเปลี่ยนแปลงทางด้านเศรษฐกิจจนกระทั่ง  ไม่สามารถปฏิบัติตามสัญญาต่อไปได้  คู่สัญญาทั้งสองฝ่ายอาจตกลง
                    เปลี่ยนแปลงสัญญาให้เหมาะสมเพื่อให้การประกอบกิจการสำเร็จลุล่วงไปได้ด้วยดีสมดังวัตถุประสงค์แห่งสัญญา</p>
            </div>

            {/* Clause 7.2 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>7.2 ในกรณีงานที่ทำต้องหยุดชะงักหรือไม่สามารถทำต่อไปได้เพราะเหตุสุดวิสัยก็ดีหรือเกิดภาวะสงคราม การก่อการร้ายหรือความ
                    ไม่สงบขึ้นในประเทศก็ดี ซึ่งมิใช่เป็นเพราะความผิดของบริษัทฯ บริษัทฯจะถือปฏิบัติการจ่ายเงินค่าจ้างบางส่วนตามหลักกฎหมายแรงงานโดย
                    ลูกจ้างยินยอมผูกพันตามกฎหมายดังกล่าว</p>
            </div>

            {/* Clause 8 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 8. การค้ำประกัน</p>
            </div>

            {/* Clause 8.1 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>8.1  เพื่อเป็นหลักประกันในการปฏิบัติตามสัญญาฉบับนี้  ในกรณีที่นายจ้างต้องการให้ลูกจ้างจัดหาผู้ค้ำประกันเพื่อให้ปฏิบัติตาม
                    สัญญา  ลูกจ้างตกลงและยินยอมที่จะจัดหาบุคคลที่มีคุณสมบัติและหลักทรัพย์  ตามที่บริษัทฯเห็นสมควรเข้ามาทำสัญญาค้ำประกันกับบริษัท
                    ฯภายในระยะเวลาที่บริษัทฯกำหนด  และในกรณีที่บริษัทฯเห็นสมควรให้ลูกจ้างเปลี่ยนผู้ค้ำประกัน  ลูกจ้างตกลงและยินยอมที่จะปฏิบัติตาม
                    ทุกประการ</p>
            </div>

            {/* Clause 8.2 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>8.2  ในกรณีที่ลูกจ้างมีการเปลี่ยนแปลง โอนย้าย หรือได้รับการเลื่อนตำแหน่ง และตำแหน่งงานใหม่นั้นจำเป็นต้องจัดหาบุคคลหรือ
                    หลักทรัพย์มาทำสัญญาค้ำประกันเพิ่ม ตามหลักเกณฑ์ที่บริษัทฯกำหนด ลูกจ้างตกลงและยินยอมที่จะจัดหาบุคคลที่มีคุณสมบัติและ
                    หลักทรัพย์ดังกล่าวเข้าทำสัญญาค้ำประกันตามที่บริษัทฯเห็นสมควรทุกประการ ในกรณีที่ลูกจ้างเพิกเฉยไม่จัดหาผู้ค้ำประกันการทำงานของ
                    ลูกจ้างภายใต้เงื่อนไข และระยะเวลาที่บริษัทฯกำหนดไว้ บริษัทฯมีสิทธิในการระงับ เปลี่ยนแปลง และ/หรือ ยกเลิกคำสั่ง เปลี่ยนแปลง 
                    โอนย้าย เลื่อนตำแหน่ง รวมถึงคำสั่งอื่นใดที่เกี่ยวข้องกับกรณีดังกล่าวได้โดยไม่ถือว่าเป็นการกระทำที่ไม่เป็นธรรมต่อลูกจ้าง</p>
            </div>

            {/* Signatures */}
            <div className="mb-6 leading-[1.4] mt-8">
                <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                        <div className="mb-2">
                            ลงชื่อ
                            {companyData?.authorizedPersonSignature ? (
                                <img src={companyData.authorizedPersonSignature} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[125px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            บริษัทฯ/นายจ้าง
                        </div>
                        <p className="text-[11px]">({companyData?.authorizedPerson || '...........................'})</p>
                    </div>
                    <div className="text-center">
                        <div className="mb-2">
                            ลงชื่อ
                            {applicant?.signature_url ? (
                                <img src={applicant.signature_url} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            ลูกจ้าง
                        </div>
                        <p className="text-[11px]">({applicant?.full_name || '...........................'})</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] right-[10mm] text-[10px] text-slate-500">
                หน้าที่ 7 | 9
            </div>
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-11 Rev.01 17/02/66<br/>
                www.ko.in.th Strategy . AI . DX . Sustainability
            </div>
        </div>

        {/* Page 8 */}
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

            {/* Clause 8.3 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p className="mb-2">8.3  ในกรณีที่ผู้ค้ำประกันตาย(เสียชีวิต)  หรือถูกศาลพิพากษาให้เป็นบุคคลล้มละลายในระหว่างอายุประกันตามสัญญานี้  ลูกจ้าง
                    ต้องแจ้งให้บริษัทฯทราบในทันที และตกลงที่จะจัดหาผู้ค้ำประกันรายใหม่ให้แก่บริษัทฯภายใน  15  วัน  (สิบห้าวัน) นับแต่วันที่ผู้ค้ำประกัน
                    เดิมตาย(เสียชีวิต) หรือตกเป็นบุคคลล้มละลาย  หรือวันที่บริษัทฯแจ้งให้หาผู้ค้ำประกัน โดยผู้ค้ำประกันรายใหม่จะต้องปฏิบัติตามสัญญาค้ำ
                    ประกันเดิมทุกประการ  ลูกจ้างเข้าใจดีว่าการมีผู้ค้ำประกันเป็นสาระสำคัญของการรับลูกจ้างเข้าทำงานในบริษัทฯนี้ และบริษัทฯไม่อาจให้
                    ลูกจ้างทำงานโดยไม่มีผู้ค้ำประกันได้ ข้อตกลงในเรื่องเกี่ยวกับผู้ค้ำประกันนี้จึงเป็นข้อสำคัญยิ่งที่บริษัทฯถือเป็นความผิดร้ายแรง โดยหาก
                    ลูกจ้างได้กระทำผิดสัญญาในข้อนี้  ลูกจ้างตกลงกับบริษัทฯให้ถือเป็นความผิดร้ายแรงที่บริษัทฯสามารถเลิกจ้างลูกจ้างได้โดยไม่ต้องบอกกล่าว
                    ล่วงหน้า รวมถึงลูกจ้างจะไม่ฟ้องร้องดำเนินคดีกับบริษัทฯ และไม่ถือว่าเป็นการเลิกจ้างไม่เป็นธรรม</p>
            </div>

            {/* Clause 9 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 9. การสิ้นสุดของสัญญา</p>
            </div>

            {/* Clause 9.1 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>9.1  สัญญาการจ้างงานฉบับนี้จะสิ้นสุดลงตามระยะเวลาโครงการ และ/หรือตามระยะเวลาที่บริษัทฯกำหนดขึ้น และให้ถือเป็นการ
                    สิ้นสุดการจ้างงานกับลูกจ้างทันที โดยไม่ต้องบอกกล่าวล่วงหน้า และบริษัทฯไม่ต้องจ่ายเงินค่าชดเชยใด ๆทั้งสิ้น</p>
            </div>

            {/* Clause 9.2 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>9.2 หากลูกจ้างผิดสัญญานี้ไม่ว่าข้อใดข้อหนึ่ง หรือหลายข้อร่วมกัน โดยจงใจหรือประมาทเลินเล่ออย่างร้ายแรงทำให้บริษัทฯได้รับ
                    ความเสียหาย ลูกจ้างตกลงยินยอมให้บริษัทฯมีสิทธิบอกเลิกสัญญาได้ทันที โดยมิต้องบอกกล่าวล่วงหน้า และบริษัทฯไม่ต้องจ่ายเงินค่าชดเชย 
                    ใด ๆทั้งสิ้น รวมถึงให้บริษัทฯมีสิทธิเรียกค่าเสียหายจากลูกจ้าง โดยให้บริษัทฯมีสิทธินำค่าเสียหายมาหักออกจากค่าจ้าง และ/หรือเงินได้อื่นๆ
                    ที่ลูกจ้างพึงจะได้รับ และหากยังไม่เพียงพอกับค่าเสียหายที่เกิดขึ้น  บริษัทฯมีสิทธิเรียกค่าเสียหายจากลูกจ้างได้อีกส่วนหนึ่ง อีกทั้งลูกจ้างตก
                    ลงชดใช้ค่าใช้จ่ายต่าง ๆ ที่เกิดขึ้นจากการที่บริษัทฯดำเนินการกับลูกจ้างในกรณีที่ลูกจ้างเป็นฝ่ายผิดสัญญา เพื่อให้เป็นไปตามสัญญา รวมถึง
                    ลูกจ้างยินยอมชดใช้ค่าที่ปรึกษากฎหมาย  ค่าทนายความ ค่าฤชาธรรมเนียมศาล  ค่าใช้จ่ายในการสืบหาข้อมูล และค่าใช้จ่ายอื่น ๆ ในการใช้
                    สิทธิตามกฎหมายของบริษัทฯจากกรณีดังกล่าวข้างต้นให้แก่บริษัทฯ พร้อมด้วยอัตราดอกเบี้ยร้อยละ 15 ต่อปี (สิบห้าปี) ของจำนวนเงินต่าง 
                    ๆ ที่ลูกจ้างค้างชำระต่อบริษัทฯ</p>
            </div>

            {/* Clause 9.3 */}
            <div className="mb-4 leading-[1.4] text-justify">
                <p>9.3 การสิ้นสุดระยะเวลาของสัญญาหรือบอกเลิกสัญญาฉบับนี้ไม่ว่าด้วยเหตุใดมิให้กระทบต่อความสมบูรณ์ของข้อกำหนดในสัญญา
                    ฉบับนี้ที่ระบุไว้ว่าให้มีผลบังคับใช้เมื่อสัญญาสิ้นสุดลง และมิให้เสื่อมสิทธิหรือสิทธิเรียกร้องความเสียหายอื่นใดที่คู่สัญญามีอยู่</p>
            </div>

            {/* Clause 10 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 10.  การส่งคำบอกกล่าว</p>
                <p className="text-justify">บรรดาหนังสือหรือเอกสารต่างๆที่คู่สัญญาฝ่ายหนึ่งฝ่ายใดจะส่งไปให้กับคู่สัญญาอีกฝ่ายหนึ่งตามภูมิลำเนาของคู่สัญญาตามที่ระบุ
                    เอาไว้ในสัญญานี้  ให้ถือว่าคู่สัญญาอีกฝ่ายหนึ่งได้รับหนังสือเอกสารดังกล่าวแล้วและเป็นการส่งโดยชอบด้วยกฎหมาย  เว้นแต่  จะมีการแจ้ง
                    การเปลี่ยนแปลงภูมิลำเนาเป็นลายลักษณ์อักษรไปยังคู่สัญญาอีกฝ่าย</p>
            </div>

            {/* Clause 11 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 11.  การตีความสัญญา</p>
                <p className="text-justify">ในกรณีที่สัญญาข้อใดข้อหนึ่งหรือส่วนใดส่วนหนึ่งของสัญญาตกเป็นโมฆะ  หรือไร้ผลบังคับไม่ว่าด้วยเหตุใดๆก็ตาม  มิให้ถือเป็นเหตุ
                    กระทบกระเทือนข้อสัญญาและข้อความส่วนอื่นๆ  ซึ่งถือว่ามีผลผูกพันและบังคับได้ระหว่างอายุสัญญาฉบับนี้</p>
            </div>

            {/* Final Statement */}
            <div className="mb-6 leading-[1.4] text-justify">
                <p className="mb-2">สัญญานี้ทำขึ้นเป็นสองฉบับ มีข้อความถูกต้องตรงกัน ทั้งสองฝ่ายได้อ่าน และได้รับทราบกฎระเบียบข้อบังคับโดยละเอียดชัดเจน
                    และเข้าใจข้อความในสัญญานี้โดยตลอดดีแล้ว เห็นว่าถูกต้องตรงตามเจตนาของตนจึงลงลายมือชื่อ  และประทับตราบริษัท (ถ้ามี) ไว้เป็น
                    หลักฐานสำคัญต่อหน้าพยาน และต่างยึดถือไว้ฝ่ายละฉบับ</p>
            </div>

            {/* Signatures */}
            <div className="mb-6 leading-[1.4] mt-8">
                <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                        <div className="mb-2">
                            ลงชื่อ
                            {companyData?.authorizedPersonSignature ? (
                                <img src={companyData.authorizedPersonSignature} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[125px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            บริษัทฯ/นายจ้าง
                        </div>
                        <p className="text-[11px]">({companyData?.authorizedPerson || '...........................'})</p>
                    </div>
                    <div className="text-center">
                        <div className="mb-2">
                            ลงชื่อ
                            {applicant?.signature_url ? (
                                <img src={applicant.signature_url} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            ลูกจ้าง
                        </div>
                        <p className="text-[11px]">({applicant?.full_name || '...........................'})</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] right-[10mm] text-[10px] text-slate-500">
                หน้าที่ 8 | 9
            </div>
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-11 Rev.01 17/02/66<br/>
                www.ko.in.th Strategy . AI . DX . Sustainability
            </div>
        </div>

        {/* Page 9 - Final Signatures */}
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

            {/* Company Seal Area */}
            <div className="flex justify-center mb-16">
                <div className="w-[120px] h-[120px] rounded-full border-2 border-slate-300 flex items-center justify-center text-center">
                    <div>
                        <p className="text-[14px] font-bold">ประทับ</p>
                        <p className="text-[14px]">ตราบริษัท</p>
                    </div>
                </div>
            </div>

            {/* Main Signatures Section */}
            <div className="mb-12 leading-[1.4]">
                <div className="grid grid-cols-2 gap-8">
                    {/* Company Signature */}
                    <div className="text-center">
                        <div className="mb-2">
                            ลงชื่อ
                            {companyData?.authorizedPersonSignature ? (
                                <img src={companyData.authorizedPersonSignature} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[125px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            บริษัทฯ/นายจ้าง
                        </div>
                        <p className="mb-2">(บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด)</p>
                        <p className="mb-4">{companyData?.authorizedPerson ? `โดย ${companyData.authorizedPerson}` : 'โดย นายกฤษณ์พงษ์ สุคันโธ กรรมการผู้มีอำนาจลงนาม'}</p>
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
                            ลูกจ้าง
                        </div>
                        <p className="mb-2">({applicant?.full_name || '…………………………………..………………………'})</p>
                    </div>
                </div>
            </div>

            {/* Witnesses Section */}
            <div className="mb-6 leading-[1.4] text-center">
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <p>
                            ลงชื่อ
                            {companyData?.witness1Signature ? (
                                <img src={companyData.witness1Signature} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            พยาน
                        </p>
                        <p>({companyData?.witnessName1 || '......................................................'})</p>
                    </div>
                    <div>
                        <p>
                            ลงชื่อ
                            {companyData?.witness2Signature ? (
                                <img src={companyData.witness2Signature} alt="signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" style={{ verticalAlign: 'baseline' }} />
                            ) : (
                                <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                            )}
                            พยาน
                        </p>
                        <p>({companyData?.witnessName2 || '.......................................................'})</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] right-[10mm] text-[10px] text-slate-500">
                หน้าที่ 9 | 9
            </div>
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-11 Rev.01 17/02/66<br/>
                www.ko.in.th Strategy . AI . DX . Sustainability
            </div>
        </div>
        </>
    );
}