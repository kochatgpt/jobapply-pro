import React from 'react';
import { Check } from 'lucide-react';

/**
 * PDFCheckbox - Component สำหรับแสดง checkbox ในเอกสาร PDF
 * 
 * @param {boolean} checked - สถานะว่าถูกเลือกหรือไม่
 * @param {string} size - ขนาดของกรอบ (เช่น "w-4 h-4", "w-5 h-5")
 * @param {string} borderColor - สีของกรอบ (เช่น "border-black", "border-slate-400")
 * @param {string} checkType - ประเภทของเครื่องหมาย: "square", "check", "circle"
 * @param {string} checkColor - สีของเครื่องหมาย (เช่น "bg-black", "text-black")
 * @param {string} checkSize - ขนาดของเครื่องหมายภายใน (เช่น "w-2 h-2")
 */
export default function PDFCheckbox({ 
    checked = false,
    size = "w-4 h-4",
    borderColor = "border-black",
    checkType = "square",
    checkColor = "bg-black",
    checkSize = "w-2 h-2"
}) {
    const renderCheck = () => {
        if (!checked) return null;

        switch (checkType) {
            case "square":
                return <div className={`${checkSize} ${checkColor}`}></div>;
            
            case "check":
                return <Check className={`${checkSize.replace('w-', 'w-').replace('h-', 'h-')} ${checkColor.replace('bg-', 'text-')}`} strokeWidth={3} />;
            
            case "circle":
                return <div className={`${checkSize} ${checkColor} rounded-full`}></div>;
            
            default:
                return <div className={`${checkSize} ${checkColor}`}></div>;
        }
    };

    return (
        <div className={`${size} border ${borderColor} flex-shrink-0 flex items-center justify-center`}>
            {renderCheck()}
        </div>
    );
}