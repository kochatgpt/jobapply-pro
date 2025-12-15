import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SignatureCanvas from 'react-signature-canvas';

export default function FormStep4({ data, updateData, setSignature }) {
    const sigCanvas = useRef({});
    
    const clearSig = () => {
        sigCanvas.current.clear();
        setSignature(null);
    };

    const saveSig = () => {
        if (!sigCanvas.current.isEmpty()) {
            setSignature(sigCanvas.current.toDataURL());
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900 border-b pb-2 mb-4">ส่วนที่ 4: ประสบการณ์และลายเซ็น</h3>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>ที่ทำงานล่าสุด (ถ้ามี)</Label>
                    <Input value={data.last_company} onChange={(e) => updateData('experience_data', 'last_company', e.target.value)} placeholder="ชื่อบริษัท" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>ตำแหน่ง</Label>
                        <Input value={data.position} onChange={(e) => updateData('experience_data', 'position', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>อายุงาน</Label>
                        <Input value={data.years} onChange={(e) => updateData('experience_data', 'years', e.target.value)} placeholder="เช่น 2 ปี" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label>คติประจำใจในการทำงาน</Label>
                    <Textarea value={data.motto} onChange={(e) => updateData('experience_data', 'motto', e.target.value)} />
                </div>
            </div>

            <div className="pt-4 border-t">
                <Label className="mb-2 block">ลายเซ็นผู้สมัคร</Label>
                <div className="border border-slate-300 rounded-md bg-white overflow-hidden">
                    <SignatureCanvas 
                        ref={sigCanvas}
                        penColor="black"
                        canvasProps={{width: 500, height: 200, className: 'sigCanvas w-full h-48'}}
                        onEnd={saveSig}
                    />
                </div>
                <div className="flex justify-end mt-2">
                    <Button variant="outline" size="sm" onClick={clearSig}>ล้างลายเซ็น</Button>
                </div>
            </div>
        </div>
    );
}