import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SignatureCanvas from 'react-signature-canvas';

export default function FormStep4({ data, setSignature }) {
    const sigCanvas = useRef({});
    
    // Use data?.signature_url if available to check state, but SignatureCanvas manages its own state usually.
    // However, if we come back to this step, we might want to show the existing signature? 
    // For now, simpler implementation as per previous (it wasn't loading back the image into canvas, just saving url)

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
        <div className="space-y-8">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-2">การลงนาม (Signature)</h3>
            
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">ลายเซ็นผู้สมัคร</Label>
                    {data?.submission_date && <span className="text-sm text-slate-500">วันที่สมัคร: {data.submission_date}</span>}
                </div>
                
                <div className="border-2 border-slate-300 border-dashed rounded-lg bg-slate-50 overflow-hidden relative">
                    <SignatureCanvas 
                        ref={sigCanvas}
                        penColor="black"
                        canvasProps={{
                            width: 600, 
                            height: 200, 
                            className: 'sigCanvas w-full h-48 cursor-crosshair'
                        }}
                        onEnd={saveSig}
                    />
                    <div className="absolute top-2 right-2">
                        <Button 
                            variant="secondary" 
                            size="sm" 
                            onClick={clearSig}
                            className="bg-white/80 hover:bg-white text-slate-600"
                        >
                            ล้างลายเซ็น
                        </Button>
                    </div>
                    {!sigCanvas.current?.isEmpty?.() && !data?.signature_url && (
                        <div className="absolute bottom-2 left-2 text-xs text-slate-400 pointer-events-none">
                            เซ็นชื่อในกรอบด้านบน
                        </div>
                    )}
                </div>
                <p className="text-xs text-slate-500 text-right">* ข้าพเจ้าขอรับรองว่าข้อความดังกล่าวทั้งหมดในใบสมัครนี้เป็นความจริงทุกประการ หากหลังจากที่บริษัทจ้างเข้ามาทำงานแล้ว ปรากฏว่าข้อความในใบสมัครงานเอกสารที่นำมาแสดง หรือรายละเอียดที่ให้ไว้ไม่เป็นความจริง บริษัทฯ มีสิทธิ์ที่จะเลิกจ้างข้าพเจ้าได้โดยไม่ต้องจ่ายเงินชดเชยหรือค่าเสียหายใดๆ ทั้งสิ้น</p>
            </div>
        </div>
    );
}