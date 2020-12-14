import * as fs from 'fs';

function main(inputFile: string): number {

    let input = getInput(inputFile);
    console.log(input);

    let maxMem = 2 ^ 16;
    let mem = new Array<number>(maxMem).fill(0);

    let currentMask = '';
    input.forEach(line => {
        if (line.startsWith('mask = ')) {
            currentMask = line.replace('mask = ', '');
            //console.log(currentMask);
            orMask(currentMask, 0);
        }
        else {
            let line1 = line.replace('mem[', '');
            let loc = parseInt(line1.split(']')[0]);
            line1 = line1.split(']')[1].replace(' = ', ''); 
            let value = parseInt(line1);      
            let maskedValue = orMask(currentMask, andMask(currentMask, value));
            mem[loc] = maskedValue;
        }
    });

    let answer = 0;
    mem.forEach(x => { answer += x});

    return answer;
}

function orMask(mask: string, value: number): number {
    let binarMask = mask.replace(/X/g, '0');
    let binaryValue = toBinaryString(value, 36);
    let result = '';
    for (let i = 0; i < binarMask.length; i++) {
        result += (binarMask[i] == '1' || binaryValue[i] == '1' ? '1' : '0');
    }    
    return parseInt(result, 2);
}

function andMask(mask: string, value: number) {
    let binarMask = mask.replace(/X/g, '1');
    let binarValue = toBinaryString(value, 36);
    let result = '';
    for (let i = 0; i < binarMask.length; i++) {
        result += (binarMask[i] == '1' && binarValue[i] == '1' ? '1' : '0');
    }    
    return parseInt(result, 2);
}

function toBinaryString(value: number, digits: number): string {
    let result = ''; 
    while (value > 0) {
        result = (value % 2).toString() + result;
        value = Math.floor(value / 2);
    }
    result = new Array(digits - result.length + 1).join('0') + result;
    return result;
}

function getInput(filename: string): string[] {
    return fs.readFileSync(filename, "utf-8").split('\n');
}

const t1 = new Date().getTime();
const result = main('./input.txt');
console.log('day14a:', result, '- time:', (new Date().getTime() - t1), 'ms');