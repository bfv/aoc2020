import * as fs from 'fs';

function main(inputFile: string): number {
    const file = fs.readFileSync(inputFile, "utf-8");
    let passports = file.split('\n\n');
    let validPassports = 0;

    passports.forEach(passport => {
        let reqFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

        while (passport != passport.replace('\n', ' ')) {
            passport = passport.replace('\n', ' ');
        }

        const fields = passport.split(' ');
        fields.forEach(field => {
            const fieldname = field.split(':')[0];
            reqFields = reqFields.filter(item => item != fieldname);
        });
        
        if (reqFields.length == 0) {
            validPassports++;
        }
    });

    return validPassports;
}

const t1 = new Date().getTime();
const result = main('./input.txt');
const t2 = new Date().getTime();

console.log('day4a:', result);    // 219
console.log('time:', (t2 - t1), 'ms');

