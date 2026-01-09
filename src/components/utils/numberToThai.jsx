const thaiUnits = ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];

const convertToThai = (num) => {
    if (num === 0) return '';
    
    let result = '';
    let billion = Math.floor(num / 1000000000);
    let million = Math.floor((num % 1000000000) / 1000000);
    let thousand = Math.floor((num % 1000000) / 1000);
    let hundred = Math.floor((num % 1000) / 100);
    let ten = Math.floor((num % 100) / 10);
    let one = num % 10;

    if (billion > 0) {
        if (billion === 1) {
            result += 'หนึ่ง';
        } else {
            result += convertToThai(billion);
        }
        result += 'พันล้าน';
    }
    if (million > 0) {
        if (million === 1) {
            result += 'หนึ่ง';
        } else {
            result += convertToThai(million);
        }
        result += 'ล้าน';
    }
    if (thousand > 0) {
        if (thousand === 1) {
            result += 'หนึ่ง';
        } else {
            result += convertToThai(thousand);
        }
        result += 'พัน';
    }
    if (hundred > 0) {
        result += thaiUnits[hundred] + 'ร้อย';
    }
    if (ten > 0) {
        if (ten === 1) {
            result += 'สิบ';
        } else if (ten === 2) {
            result += 'ยี่สิบ';
        } else {
            result += thaiUnits[ten] + 'สิบ';
        }
    }
    if (one > 0) {
        if (one === 1 && ten > 0) {
            result += 'เอ็ด';
        } else {
            result += thaiUnits[one];
        }
    }

    return result;
};

export const numberToThai = (num) => {
    if (!num || num === '' || num === 0) return '';
    
    const numStr = String(num).trim();
    const parts = numStr.split('.');
    const baht = parseInt(parts[0]);
    const satang = parts[1] ? parseInt(parts[1].padEnd(2, '0').substring(0, 2)) : 0;
    
    if (isNaN(baht) || baht < 0) return '';

    let result = convertToThai(baht);
    if (!result) result = 'ศูนย์';
    result += 'บาท';
    
    if (satang > 0) {
        result += convertToThai(satang) + 'สตางค์';
    }
    
    return result;
};