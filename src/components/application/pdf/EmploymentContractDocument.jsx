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
            className="pdpa-page bg-white text-slate-900 mx-auto relative text-[16px] font-sans p-[20mm] shadow-sm print:shadow-none"
            style={{ 
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'TH Sarabun New, Sarabun, sans-serif'
            }}
        >
            {/* Header with Logo */}
            <div className="flex justify-end mb-8">
                {appLogo ? (
                    <img src={appLogo} alt="Logo" crossOrigin="anonymous" className="h-[80px] w-auto object-contain" />
                ) : (
                    <div className="h-[60px] w-[100px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">LOGO</div>
                )}
            </div>

            {/* Title */}
            <div className="text-center mb-6">
                <h1 className="text-[18px] font-bold">สัญญาจ้างงาน</h1>
            </div>

            {/* Date and Contract Number */}
            <div className="mb-4 leading-[1.4]">
                <p>
                    สัญญาจ้างฉบับนี้ทำขึ้น ที่ บริษัท เค แอนด์โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด เมื่อวันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 ${formData.contractDate ? 'pb-1' : ''}`}>{formData.contractDate || ''}</span>
                </p>
            </div>

            {/* Company Info */}
            <div className="mb-4 text-justify leading-[1.4]">
                <p className="indent-8">
                    ระหว่าง บริษัท เค แอนด์โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด ที่อยู่เลขที่สำนักงานใหญ่ที่ 15, 17 ซอยกรุงธนบุรี 4 ถนนกรุงธนบุรี 
                    แขวงบางลำภูล่าง เขตคลองสาน กรุงเทพมหานคร 10600 โดย นายแจรุญศักดิ์ สุโภชัย หรือนายจักรพงษ์ บุญโชติดิลกแก้ว ตำแหน่งประธาน 
                    อำนาจกระทำการแทนบริษัทฯ ซึ่งต่อไปในสัญญานี้เรียกว่า "บริษัท" ฝ่ายหนึ่ง กับ
                </p>
            </div>

            {/* Employee Info */}
            <div className="mb-4 text-justify leading-[1.4]">
                <p>
                    นาย/นาง/นางสาว<span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 ${applicant?.full_name ? 'pb-1' : ''}`}>{applicant?.full_name || ''}</span>เลขที่บัตรประชาชน<span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 ${p.id_card ? 'pb-1' : ''}`}>{p.id_card || ''}</span>อยู่
                    บ้าน<span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2 ${formData.houseNumber ? 'pb-1' : ''}`}>{formData.houseNumber || ''}</span>หมู่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[50px] text-center px-2 ${formData.moo ? 'pb-1' : ''}`}>{formData.moo || ''}</span>ซอย<span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 ${formData.soi ? 'pb-1' : ''}`}>{formData.soi || ''}</span>ถนน<span className={`border-b border-dotted border-slate-400 inline-block min-w-[120px] text-center px-2 ${formData.road ? 'pb-1' : ''}`}>{formData.road || ''}</span>
                </p>
                <p>
                    ตำบล/แขวง<span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 ${formData.subdistrict ? 'pb-1' : ''}`}>{formData.subdistrict || ''}</span>อำเภอ/เขต<span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 ${formData.district ? 'pb-1' : ''}`}>{formData.district || ''}</span>จังหวัด<span className={`border-b border-dotted border-slate-400 inline-block min-w-[120px] text-center px-2 ${formData.province ? 'pb-1' : ''}`}>{formData.province || ''}</span>
                    รหัสไปรษณีย์<span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 ${formData.zipcode ? 'pb-1' : ''}`}>{formData.zipcode || ''}</span>แล้วอื่นที่เกี่ยมกับสื่อ<span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 ${formData.emergencyContact ? 'pb-1' : ''}`}>{formData.emergencyContact || ''}</span>ซึ่งต่อไปใน
                    สัญญานี้เรียกว่า "ลูกจ้าง" มีข้อตกลงกัน
                </p>
            </div>

            {/* Clause 1 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 1. วัตถุประสงค์ต่องสัญญา</p>
                
                <div className="ml-6 space-y-2">
                    <p>
                        1.1 ลูกจ้างตกลงว่าจ้างและลูกจ้างตกลงรับจ้างจากบริษัทเพื่อ<span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2 ${formData.purpose ? 'pb-1' : ''}`}>{formData.purpose || ''}</span>เริ่มตั้งแต่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2 ${formData.startDate ? 'pb-1' : ''}`}>{formData.startDate || ''}</span>พ.ศ.<span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2 ${formData.startYear ? 'pb-1' : ''}`}>{formData.startYear || ''}</span> ถึง วันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2 ${formData.endDate ? 'pb-1' : ''}`}>{formData.endDate || ''}</span>พ.ศ<span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2 ${formData.endYear ? 'pb-1' : ''}`}>{formData.endYear || ''}</span>
                    </p>
                    <p>
                        1.2 เว้นคืนในกรณีที่พบว่าที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2 ${formData.exception1 ? 'pb-1' : ''}`}>{formData.exception1 || ''}</span> เดือน <span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2 ${formData.exception2 ? 'pb-1' : ''}`}>{formData.exception2 || ''}</span> พ.ศ.<span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2 ${formData.exception3 ? 'pb-1' : ''}`}>{formData.exception3 || ''}</span>
                    </p>
                    <p className="text-justify">
                        1.3 อุทธรณ์ที่ต้องปฏิบัติกับทุกที่ วันจันทร์ ถึง วันเสาร์ เวลาตั้งแต่เช้าถึงเที่ยง-ช่วงที่สองจากเที่ยงเป็นต้นไปจนถึงเวลาเย็นไว้
                        และนายจ้างมีสิทธิ์ในการเลือก เปลี่ยนแปลง วัน และเวลาทำงาน ตามความจำเป็นและความเหมาะสม โดยเป็นไปตามความยินยอมของพนักงาน
                        เป็นหลัก พร้อมผิดคานาม บริษัท 13ข./สัม 1 เดือนหนึ่ง
                    </p>
                    <p>
                        1.4 อายุสัญญาจ้างงาน ตั้งแต่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2 ${formData.contractStartDate ? 'pb-1' : ''}`}>{formData.contractStartDate || ''}</span> เดือนงวลหน่วย <span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2 ${formData.contractPeriod ? 'pb-1' : ''}`}>{formData.contractPeriod || ''}</span>นาดค่าบ สัดนวล <span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2 ${formData.contractRatio ? 'pb-1' : ''}`}>{formData.contractRatio || ''}</span>นาดเท่าบ ที่คู่สัญ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2 ${formData.contractViolation ? 'pb-1' : ''}`}>{formData.contractViolation || ''}</span>
                    </p>
                    <p className="text-justify">
                        ที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 ${formData.location ? 'pb-1' : ''}`}>{formData.location || ''}</span>นาดค่าบ และ/หรือพื้นที่งาน/อนาคอน อานรอน
                    </p>
                    <p className="text-justify">
                        1.5 ลูกจ้างตกลงว่า ในสมัครดำเนินการแก้ไขหมายตามอวกาศ เมื่อได้มีการสั่งให้เปลี่ยนไปทำงาน และ/หรือแก้ไขช้าอก
                        ค่านามตากิจกันเนาว่างเว้นเป็นตัวตนส่วนนับนอนห้อนบให้บันได้ สามารถสมงดมเปรสเปรติมนเก็บระหว่างดำเนิน กับสงวนถนอง เปล้อมข้อลง
                        บอบทุนาน่วม โดยคอบบ้านตามรับบิบสมนจ้างด้านกับคำงก้าบริจังแท่นส่ำคปกบำกงิกเกี่ยงประมนต์อบ นิยิเอน่วน อาตจริยิ ติซิจีมัชนมินดิศรี
                        บริษัชมัมกิดการถานรับประชจ้ำงทำทั้นสงการของดังรสัญญา รวมต้อจิจ้งไปการเดินบดวบอ
                    </p>
                    <p>
                        1.6 ผลึกระนอยงงาน<span className={`border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center px-2 ${formData.workResult ? 'pb-1' : ''}`}>{formData.workResult || ''}</span>แนน่น/ผ่าน<span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 ${formData.workPass ? 'pb-1' : ''}`}>{formData.workPass || ''}</span>
                    </p>
                </div>
            </div>

            {/* Additional clauses text */}
            <div className="mb-4 text-justify leading-[1.4]">
                <p className="indent-8">
                    ห้วรี อุตว่า ลูกจ้างยอมแล้วเฉาวัชราชกาพการทำงืเพนบังเชิจนฉนบเทรบงแนยนิงกำจำงใจเงำใบงำรำเนมโยนงบางนัยปเชนหน เอล้าว/กิโอ โอนนายนาก ของ
                    บริษัท เมื่อลูกจ้างปฎิบัติงานไม่เป็นไปตามข้อกำหนดการก้อนอนุณัตว่างไป นั้บด้น/เมท่างระงวมหน้าผู้ผู่กิจากผั่าวะอุตมพองสนทิยอ
                    อุปจ้าง ซึ่งหน้างนังแสงงจากคำงขนอ้างตาปนั้นส่วนนั้งให้การงกำรแก้วงนอนลาจ เรียนบอจเปี่ตอสาไบงายะงกบงำหจเงินนงกีงดิงรีจุคนงานบผิด
                    คำจึงหน้า ราตนอินเทจนออนอตสงในสิดจกำงกกรม/กึลปนางที่ทองงงซิสใธินคดำน้รแงกงงมนนอกนงเภิให้จกำปิจิได้ กอบอตตงบงชีตกนตพิใตับอ บริษัชงา
                    กจทจริดผลากประอิกงปอนกำนนองจกำนีลำงื์งงอ สุดจ้งในประอนไอน้อกเมจนิองกงกำกำนยงจะผ่างชาดิงงกปีเมำจำบงมมานงภณกตรีงปบงเทมงใน
                </p>
            </div>

            {/* Clause 2 */}
            <div className="mb-4 leading-[1.4]">
                <p className="font-bold mb-2">ข้อ 2. ค่าตอบแทนการทำงาน เพื่อเป็นการต้อนรับและเดินการทำงานอยู่งจ้าง บริษัทจะตรวจสอบงาจำเงินโต้แปลงบงทุน</p>
                
                <div className="ml-6 space-y-2">
                    <p>
                        2.1 อุตว่างจดำงมีก วันละ<span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2 ${formData.dailyRate ? 'pb-1' : ''}`}>{formData.dailyRate || ''}</span> บาท (<span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 ${formData.dailyRateText ? 'pb-1' : ''}`}>{formData.dailyRateText || ''}</span>บาบ/สิงวบ) และจัดจัดกื่อดิงรับงกำทุนงงชอน
                        เบอร์ขอนยบิเอเบิค) ห้นับ อุตดงนุจเอกงจตักงนเอกจ้างบาคอสจนเปนเงินดำสงจงกอนอ้างอำนิจงโดจหำงวนอนออนโดนบจำมยู่/เข้าบ้อน
                        จำนจจจงอ้คงกอ บ้าแ้อนนิบอนข้นจกับงำทำน เชื่จนจงาถจาง/เบงจองงจตำปิบอำกงอินโข้ โอนชัจบคจโดจอ้างดองจิอจ์ดำแปอก่ดำตีงนออเมิทบบงราขอนดำโคาดิงขำ
                        </p>
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