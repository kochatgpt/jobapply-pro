import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function AgreementStep({ onNext }) {
  const [consent1, setConsent1] = useState(null); // null, 'agree', 'disagree'
  const [consent2, setConsent2] = useState(null); // null, 'agree', 'disagree'

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">ขอความยินยอม</CardTitle>
          <CardDescription>นโยบายความเป็นส่วนตัวสำหรับผู้สมัครงาน</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="h-[500px] overflow-y-auto p-6 bg-slate-50 rounded-md border text-sm text-slate-700 leading-relaxed space-y-4">
            <p className="font-semibold text-slate-900">
              บริษัทตระหนักและให้ความสำคัญต่อการคุ้มครองข้อมูลส่วนบุคคลของท่าน บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด ได้จัดทำนโยบาย ความเป็นส่วนตัวสำหรับข้อมูลส่วนบุคคลของผู้ใช้บริการบุคคลภายนอก ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) เพื่อแจ้ง ให้ท่านทราบถึงวิธีการในการเก็บรวบรวม ใช้และเปิดเผยข้อมูลส่วนบุคคลของท่านเมื่อเข้าร่วมกิจกรรม
            </p>

            <div>
                <h4 className="font-bold text-slate-900 mb-2">1. ข้อมูลที่เก็บรวบรวม</h4>
                <p className="mb-2">เมื่อท่านสมัครงานกับเรา เราจำเป็นที่จะต้องรวบรวมข้อมูลดังนี้:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>ข้อมูลส่วนตัวพื้นฐาน เช่น ชื่อ-นามสกุล ที่อยู่ เบอร์โทรศัพท์ อีเมล</li>
                    <li>ประวัติการศึกษาและประสบการณ์ทำงาน</li>
                    <li>ทักษะความสามารถและงานอดิเรก</li>
                    <li>คำแถลงความสนใจและข้อมูลความถนัดและความสะดวก</li>
                    <li>ผลิตภัณฑ์และบริการ (ในกรณีมีบริการรองรับ)</li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-slate-900 mb-2">2. วัตถุประสงค์ในการใช้ข้อมูล</h4>
                <p className="mb-2">เราจะใช้ข้อมูลของท่านเพื่อ:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>พิจารณาคุณสมบัติและความเหมาะสมของผู้สมัครในตำแหน่งงาน</li>
                    <li>ดำเนินการรับสมัครและประเมินผลผู้สมัคร</li>
                    <li>ให้บริการและการติดตามการจ้าง</li>
                    <li>วิเคราะห์และปรับปรุงกระบวนการรับสมัครงานของเรา</li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-slate-900 mb-2">3. ระยะเวลาในการเก็บข้อมูล</h4>
                <p>ข้อมูลส่วนบุคคลของท่านจะถูกเก็บไว้ไม่เกิน 1 ปี นับจากวันที่ทีมงานของเราทำการพิจารณา เว้นแต่กรณีที่พระราชบัญญัติ ในการเก็บไว้นานกว่านั้นอนุญาต</p>
            </div>

            <div>
                <h4 className="font-bold text-slate-900 mb-2">4. การเปิดเผยข้อมูล</h4>
                <p>ข้อมูลของท่านจะถูกใช้เฉพาะเท่าที่จำเป็น และจะไม่มีการเผยแพร่ต่อสาธารณะ เว้นแต่ได้รับอนุญาตจากท่านตามกฎหมาย</p>
            </div>

            <div>
                <h4 className="font-bold text-slate-900 mb-2">5. สิทธิของผู้สมัคร</h4>
                <p>ท่านสามารถขอดูข้อมูล แก้ไขข้อมูล หรือลบข้อมูลส่วนบุคคลได้ หากมีข้อเสนอแนะหรือข้อร้องเรียนในการใช้ข้อมูลดังกล่าว โดย ติดต่อเราที่: hr@ko.in.th</p>
            </div>

            <div>
                <h4 className="font-bold text-slate-900 mb-2">6. การให้ความยินยอม</h4>
                <p>เมื่อท่านส่งใบสมัคร แบบฟอร์ม หรือส่งข้อมูลใด ๆ มาให้เรา ถือว่าท่านยินยอมต่าง ๆ และยินยอมให้ทำตามข้อกำหนดที่ระบุไว้ข้างต้น</p>
            </div>
          </div>
          
          <div className="space-y-6 pt-4 border-t">
            <div className="space-y-2">
              <Label className="text-sm font-medium">ยินยอมให้เก็บข้อมูล</Label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={consent1 === 'agree' ? 'default' : 'outline'}
                  onClick={() => setConsent1('agree')}
                  className={consent1 === 'agree' ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  ยินยอม
                </Button>
                <Button
                  type="button"
                  variant={consent1 === 'disagree' ? 'default' : 'outline'}
                  onClick={() => setConsent1('disagree')}
                  className={consent1 === 'disagree' ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  ไม่ยินยอม
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">ยินยอมให้บันทึกวิดีโอและเก็บข้อมูลเพื่อวัตถุประสงค์ในการคัดเลือกบุคลากร ตามนโยบายความเป็นส่วนตัวของบริษัท</Label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={consent2 === 'agree' ? 'default' : 'outline'}
                  onClick={() => setConsent2('agree')}
                  className={consent2 === 'agree' ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  ยินยอม
                </Button>
                <Button
                  type="button"
                  variant={consent2 === 'disagree' ? 'default' : 'outline'}
                  onClick={() => setConsent2('disagree')}
                  className={consent2 === 'disagree' ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  ไม่ยินยอม
                </Button>
              </div>
            </div>
          </div>

          <Button 
            onClick={onNext} 
            disabled={consent1 !== 'agree' || consent2 !== 'agree'} 
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700"
          >
            ยืนยันและดำเนินการต่อ
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}