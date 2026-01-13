import React from 'react';
import PDFCheckbox from './PDFCheckbox';

export default function SPS902Document({ applicant, formData = {} }) {
    const personalData = applicant?.personal_data || {};
    
    return (
        <div 
            className="pdpa-page bg-white mx-auto relative shadow-sm print:shadow-none"
            style={{ 
                fontSize: "11px",
                padding: '10mm',
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'TH Sarabun New, Sarabun, sans-serif',
                lineHeight: '1.3'
            }}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3 border-b border-slate-900 pb-2">
                <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6937c0bd189dcfc8f3a84e3b/7e3f209fb_image.png" 
                    alt="สำนักงานประกันสังคม" 
                    className="h-12 w-auto object-contain"
                    crossOrigin="anonymous"
                />
                <h1 className="text-[16px] font-bold flex-1 text-center">แบบเลือกสถานพยาบาลในการรับบริการทางการแพทย์</h1>
                <div className="text-right text-xs space-y-1 min-w-[180px]">
                    <div>เลขที่รับ .........................</div>
                    <div>วันที่ ................... เวลา .............</div>
                    <div>ลงชื่อ ........................... ผู้รับ</div>
                    <div className="font-bold mt-1">สปส. 9-02</div>
                </div>
            </div>

            {/* Section 1: รายละเอียดผู้ประกันตน */}
            <div className="border border-slate-900 mb-4">
                <div className="border-b border-slate-900 p-2 bg-slate-100 font-bold text-sm">
                    1. รายละเอียดผู้ประกันตน
                </div>
                
                <div className="grid grid-cols-2 gap-0 divide-x divide-slate-900">
                    {/* Left Column - Section 33 */}
                    <div className="p-3 border-r border-slate-900">
                        <div className="text-xs font-bold mb-2 pb-2 border-b border-slate-900">
                            สำหรับผู้ประกันตนมาตรา 33
                        </div>

                        {/* Name and ID */}
                        <div className="mb-2">
                            <div className="flex gap-1 items-center text-xs mb-1">
                                <span>จำเนียด</span>
                                <label className="flex items-center gap-0.5">
                                    <PDFCheckbox checked={personalData.prefix === 'นาย'} />
                                    <span className="text-xs">นาย</span>
                                </label>
                                <label className="flex items-center gap-0.5">
                                    <PDFCheckbox checked={personalData.prefix === 'นางสาว'} />
                                    <span className="text-xs">นางสาว</span>
                                </label>
                                <label className="flex items-center gap-0.5">
                                    <PDFCheckbox checked={personalData.prefix === 'นาง'} />
                                    <span className="text-xs">นาง</span>
                                </label>
                                <span className="flex-1 border-b border-dotted border-slate-400 mx-1 min-h-[18px]">
                                    {personalData.first_name || '\u00A0'}
                                </span>
                                <span>ชื่อสกุล</span>
                                <span className="flex-1 border-b border-dotted border-slate-400 ml-1 min-h-[18px]">
                                    {personalData.last_name || '\u00A0'}
                                </span>
                            </div>
                        </div>

                        {/* ID Card and DOB */}
                        <div className="mb-2">
                            <div className="flex items-center gap-1 text-xs">
                                <span>เลขประจำตัวประชาชน</span>
                                <div className="flex gap-0.5">
                                    {(personalData.id_card || '').split('').concat(Array(13).fill('')).slice(0, 13).map((digit, idx) => (
                                        <div key={idx} className="w-4 h-5 border border-slate-400 flex items-center justify-center text-xs">
                                            {digit}
                                        </div>
                                    ))}
                                </div>
                                <span className="ml-2">เกิด วันที่</span>
                                <span className="w-8 border-b border-dotted border-slate-400">
                                    {personalData.dob ? new Date(personalData.dob).toLocaleDateString('th-TH').split('/')[0] : ''}
                                </span>
                                <span>เดือน</span>
                                <span className="w-12 border-b border-dotted border-slate-400">
                                    {personalData.dob ? new Date(personalData.dob).toLocaleDateString('th-TH').split('/')[1] : ''}
                                </span>
                                <span>พ.ศ.</span>
                                <span className="w-10 border-b border-dotted border-slate-400">
                                    {personalData.dob ? (new Date(personalData.dob).getFullYear() + 543) : ''}
                                </span>
                            </div>
                            <div className="text-xs italic mt-1 ml-32">(สำหรับคนต่างด้าวให้กรอกเลขที่บัตรประกันสังคม)</div>
                        </div>

                        {/* Current Employer */}
                        <div className="mb-2">
                            <div className="text-xs mb-1">ปัจจุบันทำงานกับสถานประกอบการชื่อ</div>
                            <div className="border-b border-dotted border-slate-400 min-h-[18px] mb-1 px-1">
                                {formData.employerName || '\u00A0'}
                            </div>
                        </div>

                        {/* Account and Branch */}
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                                <div className="text-xs mb-0.5">เลขที่บัญชี</div>
                                <div className="flex gap-0.5">
                                    {(formData.accountNumber || '').split('').concat(Array(10).fill('')).slice(0, 10).map((digit, idx) => (
                                        <div key={idx} className="w-3.5 h-5 border border-slate-400 flex items-center justify-center text-xs">
                                            {digit}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs mb-0.5">ลำดับที่สาขา</div>
                                <div className="flex gap-0.5">
                                    {(formData.branchNumber || '').split('').concat(Array(4).fill('')).slice(0, 4).map((digit, idx) => (
                                        <div key={idx} className="w-4 h-5 border border-slate-400 flex items-center justify-center text-xs">
                                            {digit}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Start Date and Last Pay */}
                        <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
                            <div>
                                <span>เข้างานเมื่อวันที่</span>
                                <span className="border-b border-dotted border-slate-400 mx-1">........</span>
                                <span>เดือน</span>
                                <span className="border-b border-dotted border-slate-400 mx-1">.............</span>
                                <span>พ.ศ.</span>
                                <span className="border-b border-dotted border-slate-400 mx-1">.........</span>
                            </div>
                            <div>
                                <span>ได้รับค่าจ้างงวดสุดท้าย เมื่อเดือน</span>
                                <span className="border-b border-dotted border-slate-400 mx-1">............</span>
                                <span>พ.ศ.</span>
                                <span className="border-b border-dotted border-slate-400 mx-1">.........</span>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="mb-2 text-xs">
                            <div className="mb-0.5">ที่อยู่ปัจจุบัน</div>
                            <div className="grid grid-cols-3 gap-1 mb-1">
                                <div>
                                    <span className="text-xs">เลขที่</span>
                                    <div className="border-b border-dotted border-slate-400 min-h-[16px]">{personalData.current_address?.number || '\u00A0'}</div>
                                </div>
                                <div>
                                    <span className="text-xs">หมู่ที่</span>
                                    <div className="border-b border-dotted border-slate-400 min-h-[16px]">{personalData.current_address?.moo || '\u00A0'}</div>
                                </div>
                                <div>
                                    <span className="text-xs">ตรอก/ซอย</span>
                                    <div className="border-b border-dotted border-slate-400 min-h-[16px]">{personalData.current_address?.road || '\u00A0'}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-1 mb-1">
                                <div>
                                    <span className="text-xs">ถนน</span>
                                    <div className="border-b border-dotted border-slate-400 min-h-[16px]"></div>
                                </div>
                                <div>
                                    <span className="text-xs">แขวง/ตำบล</span>
                                    <div className="border-b border-dotted border-slate-400 min-h-[16px]">{personalData.current_address?.subdistrict || '\u00A0'}</div>
                                </div>
                                <div>
                                    <span className="text-xs">เขต/อำเภอ</span>
                                    <div className="border-b border-dotted border-slate-400 min-h-[16px]">{personalData.current_address?.district || '\u00A0'}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-1">
                                <div>
                                    <span className="text-xs">จังหวัด</span>
                                    <div className="border-b border-dotted border-slate-400 min-h-[16px]">{personalData.current_address?.province || '\u00A0'}</div>
                                </div>
                                <div>
                                    <span className="text-xs">รหัสไปรษณีย์</span>
                                    <div className="border-b border-dotted border-slate-400 min-h-[16px]">{personalData.current_address?.zipcode || '\u00A0'}</div>
                                </div>
                                <div>
                                    <span className="text-xs">โทรศัพท์มือถือ</span>
                                    <div className="border-b border-dotted border-slate-400 min-h-[16px]">{personalData.mobile_phone || '\u00A0'}</div>
                                </div>
                            </div>
                        </div>

                        {/* Last Employer */}
                        <div className="mb-2">
                            <div className="text-xs mb-1">ชื่อสถานประกอบการสุดท้ายที่ทำงาน</div>
                            <div className="border-b border-dotted border-slate-400 min-h-[18px] mb-1 px-1"></div>
                        </div>

                        {/* Last Account and Branch */}
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                                <div className="text-xs mb-0.5">เลขที่บัญชี</div>
                                <div className="flex gap-0.5">
                                    {Array(10).fill('').map((_, idx) => (
                                        <div key={idx} className="w-3.5 h-5 border border-slate-400 flex items-center justify-center text-xs">
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs mb-0.5">ลำดับที่สาขา</div>
                                <div className="flex gap-0.5">
                                    {Array(4).fill('').map((_, idx) => (
                                        <div key={idx} className="w-4 h-5 border border-slate-400 flex items-center justify-center text-xs">
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* End Date */}
                        <div className="text-xs">
                            <span>สิ้นสภาพความเป็นลูกจ้าง เมื่อวันที่</span>
                            <span className="border-b border-dotted border-slate-400 mx-1">........</span>
                            <span>เดือน</span>
                            <span className="border-b border-dotted border-slate-400 mx-1">............</span>
                            <span>พ.ศ.</span>
                            <span className="border-b border-dotted border-slate-400 mx-1">.........</span>
                        </div>
                    </div>

                    {/* Right Column - Section 39 and 38, 41 */}
                    <div className="p-3">
                        <div className="text-xs font-bold mb-2 pb-2 border-b border-slate-900">
                            สำหรับผู้ประกันตนมาตรา 39 และบุคคลตามมาตรา 38 และมาตรา 41
                        </div>

                        {/* Position and Salary */}
                        <div className="mb-2">
                            <div className="flex gap-2 items-center text-xs mb-1">
                                <span>ที่อยู่ปัจจุบันสถาน</span>
                                <span className="border-b border-dotted border-slate-400 flex-1">...........</span>
                                <span>หน่วยที่</span>
                                <span className="border-b border-dotted border-slate-400 w-12">.........</span>
                                <span>ทรสัป/ขสป</span>
                                <span className="border-b border-dotted border-slate-400 w-12">.........</span>
                            </div>
                        </div>

                        {/* Employer Name for 39/38/41 */}
                        <div className="mb-2">
                            <div className="text-xs mb-1">ที่อยู่ปัจจุบันสถาน.............................. รหัสประจำสิ่งสุทธิ..........................</div>
                            <div className="text-xs mb-1">วิทยที่ประสงค์ขอดำเนิน.................................</div>
                        </div>

                        {/* Account and Branch */}
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                                <div className="text-xs mb-0.5">เลขที่บัญชี</div>
                                <div className="flex gap-0.5">
                                    {Array(10).fill('').map((_, idx) => (
                                        <div key={idx} className="w-3.5 h-5 border border-slate-400 flex items-center justify-center text-xs">
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs mb-0.5">ลำดับที่สาขา</div>
                                <div className="flex gap-0.5">
                                    {Array(4).fill('').map((_, idx) => (
                                        <div key={idx} className="w-4 h-5 border border-slate-400 flex items-center justify-center text-xs">
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Start Date */}
                        <div className="text-xs mb-2">
                            <span>เข้า/นอน..................... ขสป/หมวด............ ทรสัป/ขสป.......</span>
                        </div>

                        {/* Hospital Selection Inline */}
                        <div className="mb-2">
                            <div className="text-xs font-bold mb-1">ขอเลือกสถานพยาบาล</div>
                            <div className="space-y-1">
                                <label className="flex items-center gap-1 text-xs">
                                    <PDFCheckbox checked={formData.hospitalChoice === 'option1'} />
                                    <span>ลำดับที่ 1 ชื่อ..............................</span>
                                </label>
                                <label className="flex items-center gap-1 text-xs">
                                    <span className="text-xs">หากไม่สามารถจัดสถานพยาบาลลำดับที่ 1 ให้ได้ จะจัดสถานพยาบาลลำดับถัดไปให้ตามลำดับ</span>
                                </label>
                                <label className="flex items-center gap-1 text-xs">
                                    <PDFCheckbox checked={formData.hospitalChoice === 'option2'} />
                                    <span>ลำดับที่ 2 ชื่อ..............................</span>
                                </label>
                                <label className="flex items-center gap-1 text-xs">
                                    <PDFCheckbox checked={formData.hospitalChoice === 'option3'} />
                                    <span>ลำดับที่ 3 ชื่อ..............................</span>
                                </label>
                            </div>
                        </div>

                        {/* Disabled Person */}
                        <div className="mb-2">
                            <label className="flex items-center gap-1 text-xs">
                                <PDFCheckbox checked={formData.isDisabled === 'yes'} />
                                <span>ข้าพเจ้าคนพิการซึ่งเป็นผู้ประกันตน ขอรับบริการสาธารณสุขจาก</span>
                            </label>
                            <label className="flex items-center gap-1 text-xs ml-5">
                                <PDFCheckbox checked={formData.publicHealthService === 'yes'} />
                                <span>สำนักงานหลักประกันสุขภาพแห่งชาติ (สปสช.)</span>
                            </label>
                        </div>

                        {/* Declaration */}
                        <div className="text-xs mb-2 border-t border-slate-900 pt-2">
                            <p>ขณะที่ข้าพเจ้าเลือกหรือเปลี่ยนสถานพยาบาลใหม่ ข้าพเจ้าไม่ได้นอนพักรักษาตัวเป็นผู้ป่วยใน ณ สถานพยาบาลใดๆ</p>
                            <p>และขอรับรองว่าข้อความข้างต้นเป็นจริงทุกประการ</p>
                        </div>

                        {/* Signature */}
                        <div className="mt-3">
                            <div className="flex justify-between items-end">
                                <div className="text-center w-32">
                                    <div className="border-b border-slate-400 min-h-[40px] mb-1 flex items-center justify-center">
                                        {applicant?.signature_url ? (
                                            <img src={applicant.signature_url} alt="Signature" crossOrigin="anonymous" className="h-[35px] object-contain" />
                                        ) : (
                                            '\u00A0'
                                        )}
                                    </div>
                                    <p className="text-xs">ลงชื่อ</p>
                                    <p className="text-xs">(ผู้ประกันตน/ผู้มีสิทธิ)</p>
                                </div>
                                <div className="text-center text-xs">
                                    <div className="text-xs">ลงวันที่</div>
                                    <div className="border-b border-dotted border-slate-400 w-20 mx-auto">...........</div>
                                    <div className="text-xs mt-1">เดือน........... พ.ศ.........</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Staff Remarks */}
            <div className="border border-slate-900">
                <div className="border-b border-slate-900 p-2 bg-slate-100 font-bold text-sm">
                    สำหรับเจ้าหน้าที่
                </div>
                
                <div className="p-3">
                    <div className="text-xs font-bold mb-2">ความเห็นเจ้าหน้าที่</div>
                    <div className="space-y-1 mb-3">
                        <label className="flex items-center gap-2 text-xs">
                            <PDFCheckbox checked={formData.staffDecision === 'approve'} />
                            <span>เห็นสมควรจัดสถานพยาบาล</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs">
                            <PDFCheckbox checked={formData.staffDecision === 'disapprove'} />
                            <span>ไม่เห็นสมควรจัดสถานพยาบาล ระบุเหตุผล</span>
                        </label>
                        <div className="border-b border-dotted border-slate-400 min-h-[36px] ml-5"></div>
                    </div>

                    <div className="flex justify-between items-end mt-3">
                        <div className="text-center w-32">
                            <div className="border-b border-slate-400 min-h-[40px] mb-1"></div>
                            <p className="text-xs">ลงชื่อ</p>
                            <p className="text-xs">(เจ้าหน้าที่)</p>
                        </div>
                        <div className="text-center text-xs">
                            <div className="text-xs">ลงวันที่</div>
                            <div className="border-b border-dotted border-slate-400 w-20 mx-auto">...........</div>
                            <div className="text-xs mt-1">เดือน........... พ.ศ.........</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Note */}
            <div className="text-xs mt-3 text-center text-slate-600">
                สำนักงานประกันสังคมยกเลิกการพิมพ์บัตรรับรองสิทธิการรักษาพยาบาล ตั้งแต่ปี 2561 เป็นต้นไป
                โดยสามารถตรวจสอบสิทธิการรักษาพยาบาลได้ที่ www.sso.go.th หรือ สายด่วนประกันสังคม โทร. 1506
            </div>
        </div>
    );
}