import * as fs from 'fs';

function main(inputFile: string): number {
    const file = fs.readFileSync(inputFile, "utf-8");
    let passports = file.split('\n\n');
    let validPassports = 0;
    passports.forEach(passport => {

        let reqFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];

        while (passport != passport.replace('\n', ' ')) {
            passport = passport.replace('\n', ' ');
        }

        const fields = passport.split(' ');
        fields.forEach(field => {
            const fieldname = field.split(':')[0];
            reqFields = reqFields.filter(item => item != fieldname);
        });
        
        if (reqFields.length == 0 || (reqFields.length == 1 && reqFields[0] == 'cid')) {
            let valid = true;
            fields.forEach(field => {
                const fieldname = field.split(':')[0];
                const fieldvalue = field.split(':')[1];
                const fieldvalueInt = parseInt(fieldvalue) || 0;

                switch (fieldname) {
                    case 'byr': valid &&= (1920 <= fieldvalueInt && fieldvalueInt <= 2002); break;
                    case 'iyr': valid &&= (2010 <= fieldvalueInt && fieldvalueInt <= 2020); break;
                    case 'eyr': valid &&= (2020 <= fieldvalueInt && fieldvalueInt <= 2030); break;
                    case 'hgt': valid &&= checkHeight(fieldvalue); break;
                    case 'hcl': valid &&= checkHairColor(fieldvalue); break;
                    case 'ecl': valid &&= checkEyeColor(fieldvalue); break; 
                    case 'pid': valid &&= (fieldvalue.length == 9 && fieldvalueInt != NaN); break;
                }
            });

            if (valid) {
                validPassports++;
            }
        }
    });

    return validPassports;
}

function checkHeight(heigthString: string): boolean {
    const height = parseInt(heigthString.replace(/\D/g, ''));
    const unit = heigthString.substr(height.toString().length); 
    return (
        (unit == 'cm' && 150 <= height && height <= 193) ||
        (unit == 'in' && 59 <= height && height <= 76)
    );
}

function checkHairColor(color: string): boolean {
    const match = color.match(/^#([0-9a-f]{6})$/g);
    return match != null && color == match[0];
}

function checkEyeColor(color: string): boolean {
    return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(color); 
}

const t1 = new Date().getTime();
const result = main('./input.txt');
const t2 = new Date().getTime();

console.log('day4b:', result);
console.log('time:', (t2 - t1), 'ms');