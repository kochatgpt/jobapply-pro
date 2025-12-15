import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function FormStep1({ data, updateData, photo }) {
    // Helper to update nested address fields
    const updateAddress = (type, field, value) => {
        const currentAddr = data[type] || {};
        updateData('personal_data', type, { ...currentAddr, [field]: value });
    };

    const calculateAge = (dob) => {
        if (!dob) return "";
        const diff = Date.now() - new Date(dob).getTime();
        const ageDate = new Date(diff); 
        return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
    };

    const handleDobChange = (e) => {
        const val = e.target.value;
        updateData('personal_data', 'dob', val);
        updateData('personal_data', 'age', calculateAge(val));
    };

    return (
    <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 border-b pb-2 mb-4">ส่วนที่ 1: ประวัติส่วนตัว</h3>

        <div className="space-y-4 bg-slate-50 p-4 rounded-lg border">
            <div className="space-y-2">
                <Label>วันที่ยื่นใบสมัคร</Label>
                <Input type="date" value={data.application_date} onChange={(e) => updateData('personal_data', 'application_date', e.target.value)} />
            </div>
            <div className="text-sm text-slate-600 leading-relaxed text-justify">
                ใบสมัครงานฉบับนี้เป็นส่วนหนึ่งในการพิจารณา ในโอกาสที่ท่านมาสมัครเข้าทำงานที่บริษัทฯ ซึ่งใบสมัครนี้ท่าน ไม่ว่าจะ การพิจารณา รับเข้าทำงาน ข้อมูลในใบสมัครจะถูกเก็บไว้เป็นระยะเวลา 1 เดือน หากมีการพิจารณาเข้าเป็นพนักงาน ซึ่งท้ายหลังจากหมดระยะ อายุใบสมัครนี้ท่านสามาทำการสมัครงานใหม่ได้ ข้อมูลในใบสมัครจะถูกเก็บไว้สำหรับหน่วยงานบริษัทของบริษัท/ลูกจ้างของ บริษัทและผู้ประมวลผลข้อมูลของบริษัท/ลูกจ้างอีกทั้ง บริษัทจะไม่เปิดเผยข้อมูลส่วนบุคคลไปยังบุคคลภายนอก 2 ปี ท่านยินยอมที่ ต้องเป็นพนักงานประจำของการพิจารณาค่าตอบแทน หลักฐานทรัพย์สินผลตอบแทนการรับ อันมิอาจเปิดเผยข้อมูลดังกล่าวแก่บุคคล ภายนอกได้ อนึ่ง ตาม พ.ร.บ. คุ้มครอง ข้อมูล ส่วนบุคคล ปี 2562 เป็นเหตุเกิดอาจกระทบต่อสิทธิและเสรีภาพในความเป็นบุคคลของ ข้าน ตาม (PDPA) คุ้มข้อมูลส่วนบุคคลผู้ที่นำไปใช้ กรม.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 "การคุ้มครองข้อมูลส่วนบุคคล" และ "ข้อมูลส่วนบุคคลทั่วไปภายในสำนักงาน" ในแบบแบ่งปันข้อมูลการพิจารณาบุคคลภายนอกเปิดเผยข้อทำ
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
                <Label>สมัครงานในตำแหน่ง 1</Label>
                <Input value={data.position_1} onChange={(e) => updateData('personal_data', 'position_1', e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>สมัครงานในตำแหน่ง 2</Label>
                <Input value={data.position_2} onChange={(e) => updateData('personal_data', 'position_2', e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>อัตราเงินเดือนที่ต้องการ</Label>
                <Input value={data.expected_salary} onChange={(e) => updateData('personal_data', 'expected_salary', e.target.value)} />
            </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>ชื่อ-สกุล (ภาษาไทย)</Label>
                        <div className="flex gap-2">
                             <Select value={data.prefix} onValueChange={(v) => updateData('personal_data', 'prefix', v)}>
                                <SelectTrigger className="w-[80px]"><SelectValue placeholder="คำนำ" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="นาย">นาย</SelectItem>
                                    <SelectItem value="นาง">นาง</SelectItem>
                                    <SelectItem value="นางสาว">น.ส.</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input placeholder="ชื่อ" value={data.first_name} onChange={(e) => updateData('personal_data', 'first_name', e.target.value)} />
                            <Input placeholder="สกุล" value={data.last_name} onChange={(e) => updateData('personal_data', 'last_name', e.target.value)} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>ชื่อเล่น (ภาษาไทย)</Label>
                        <Input value={data.thai_nickname} onChange={(e) => updateData('personal_data', 'thai_nickname', e.target.value)} />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Name in English</Label>
                    <Input placeholder="Firstname Lastname" value={data.english_name} onChange={(e) => updateData('personal_data', 'english_name', e.target.value)} />
                </div>
            </div>
            
            {photo && (
                <div className="w-32 h-40 bg-slate-100 border rounded-md overflow-hidden shrink-0 mt-1">
                     <img src={photo} alt="Applicant" className="w-full h-full object-cover" />
                </div>
            )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="space-y-2">
                <Label>วัน/เดือน/ปีเกิด</Label>
                <Input type="date" value={data.dob} onChange={handleDobChange} />
            </div>
            <div className="space-y-2">
                <Label>อายุ</Label>
                <Input value={data.age} onChange={(e) => updateData('personal_data', 'age', e.target.value)} readOnly className="bg-slate-50" />
            </div>
            <div className="space-y-2">
                <Label>น้ำหนัก (กก.)</Label>
                <Input value={data.weight} onChange={(e) => updateData('personal_data', 'weight', e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>ส่วนสูง (ซม.)</Label>
                <Input value={data.height} onChange={(e) => updateData('personal_data', 'height', e.target.value)} />
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
                <Label>เชื้อชาติ</Label>
                <Input value={data.race} onChange={(e) => updateData('personal_data', 'race', e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>สัญชาติ</Label>
                <Input value={data.nationality} onChange={(e) => updateData('personal_data', 'nationality', e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>ศาสนา</Label>
                <Input value={data.religion} onChange={(e) => updateData('personal_data', 'religion', e.target.value)} />
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>(Email) อีเมล์ที่ติดต่อได้</Label>
                <Input value={data.email} onChange={(e) => updateData('personal_data', 'email', e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>โทรศัพท์มือถือที่ติดต่อได้สะดวก</Label>
                <Input value={data.mobile_phone} onChange={(e) => updateData('personal_data', 'mobile_phone', e.target.value)} />
            </div>
        </div>

        {/* Registered Address */}
        <div className="bg-slate-50 p-4 rounded-lg border space-y-3">
            <Label className="font-semibold text-indigo-700">ที่อยู่ตามทะเบียนบ้าน</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="col-span-1"><Input placeholder="เลขที่" value={data.registered_address?.number || ''} onChange={(e) => updateAddress('registered_address', 'number', e.target.value)} /></div>
                <div className="col-span-1"><Input placeholder="หมู่" value={data.registered_address?.moo || ''} onChange={(e) => updateAddress('registered_address', 'moo', e.target.value)} /></div>
                <div className="col-span-2"><Input placeholder="ถนน" value={data.registered_address?.road || ''} onChange={(e) => updateAddress('registered_address', 'road', e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                 <Input placeholder="ตำบล/แขวง" value={data.registered_address?.subdistrict || ''} onChange={(e) => updateAddress('registered_address', 'subdistrict', e.target.value)} />
                 <Input placeholder="อำเภอ/เขต" value={data.registered_address?.district || ''} onChange={(e) => updateAddress('registered_address', 'district', e.target.value)} />
                 <Input placeholder="จังหวัด" value={data.registered_address?.province || ''} onChange={(e) => updateAddress('registered_address', 'province', e.target.value)} />
                 <Input placeholder="รหัสไปรษณีย์" value={data.registered_address?.zipcode || ''} onChange={(e) => updateAddress('registered_address', 'zipcode', e.target.value)} />
            </div>
        </div>

        {/* Current Address */}
        <div className="bg-slate-50 p-4 rounded-lg border space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                 <Label className="font-semibold text-indigo-700">ที่อยู่ปัจจุบัน</Label>
                 <Select value={data.current_address_type} onValueChange={(v) => {
                     updateData('personal_data', 'current_address_type', v);
                     if (v === 'same') {
                         updateData('personal_data', 'current_address', data.registered_address);
                     }
                 }}>
                    <SelectTrigger className="w-[250px]"><SelectValue placeholder="เลือกประเภทที่อยู่" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="own">บ้านตนเอง</SelectItem>
                        <SelectItem value="rent">บ้านเช่า / หอพัก</SelectItem>
                        <SelectItem value="same">ที่อยู่ตามบัตรประชาชน</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="col-span-1"><Input placeholder="เลขที่" value={data.current_address?.number || ''} onChange={(e) => updateAddress('current_address', 'number', e.target.value)} /></div>
                <div className="col-span-1"><Input placeholder="หมู่" value={data.current_address?.moo || ''} onChange={(e) => updateAddress('current_address', 'moo', e.target.value)} /></div>
                <div className="col-span-2"><Input placeholder="ถนน" value={data.current_address?.road || ''} onChange={(e) => updateAddress('current_address', 'road', e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                 <Input placeholder="ตำบล/แขวง" value={data.current_address?.subdistrict || ''} onChange={(e) => updateAddress('current_address', 'subdistrict', e.target.value)} />
                 <Input placeholder="อำเภอ/เขต" value={data.current_address?.district || ''} onChange={(e) => updateAddress('current_address', 'district', e.target.value)} />
                 <Input placeholder="จังหวัด" value={data.current_address?.province || ''} onChange={(e) => updateAddress('current_address', 'province', e.target.value)} />
                 <Input placeholder="รหัสไปรษณีย์" value={data.current_address?.zipcode || ''} onChange={(e) => updateAddress('current_address', 'zipcode', e.target.value)} />
            </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
            <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <Label>เพศ</Label>
                    <Select value={data.gender} onValueChange={(v) => updateData('personal_data', 'gender', v)}>
                        <SelectTrigger><SelectValue placeholder="เลือกเพศ" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">ชาย</SelectItem>
                            <SelectItem value="female">หญิง</SelectItem>
                            <SelectItem value="other">อื่นๆ</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>สถานะทางทหาร</Label>
                    <div className="space-y-1">
                         <div className="flex items-center space-x-2">
                            <Checkbox id="mil_exempt" checked={data.military_status === 'exempted'} onCheckedChange={() => updateData('personal_data', 'military_status', 'exempted')} />
                            <label htmlFor="mil_exempt" className="text-sm">ได้รับการยกเว้นทางทหาร</label>
                         </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="mil_served" checked={data.military_status === 'served'} onCheckedChange={() => updateData('personal_data', 'military_status', 'served')} />
                            <label htmlFor="mil_served" className="text-sm">เกณฑ์ทหารแล้ว</label>
                         </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="mil_not" checked={data.military_status === 'not_served'} onCheckedChange={() => updateData('personal_data', 'military_status', 'not_served')} />
                            <label htmlFor="mil_not" className="text-sm">ยังไม่ได้รับการเกณฑ์ทหาร</label>
                         </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>สถานะอุปสมบท</Label>
                    <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="ord_not" checked={data.ordination_status === 'not_yet'} onCheckedChange={() => updateData('personal_data', 'ordination_status', 'not_yet')} />
                            <label htmlFor="ord_not" className="text-sm">ยังไม่อุปสมบท</label>
                         </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="ord_done" checked={data.ordination_status === 'ordained'} onCheckedChange={() => updateData('personal_data', 'ordination_status', 'ordained')} />
                            <label htmlFor="ord_done" className="text-sm">อุปสมบทแล้ว</label>
                         </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    );
}