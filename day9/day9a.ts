
import * as fs from 'fs';

function main(inputFile: string, preamble: number): number {

    let numbers = getInput(inputFile);

    let pointer = preamble - 1;    
    let ok = true;
    while(ok) {
        let sums = calcSums(numbers, ++pointer, preamble);
        ok = sums.includes(numbers[pointer]);
    }

    return numbers[pointer];
}

function calcSums(numbers: number[], pointer: number, preamble: number) {
    
    let sums: number[] = [];

    for (let i = pointer - preamble; i < pointer; i++) {
        for (let j = i + 1; j < pointer; j++) {
            sums.push(numbers[i] + numbers[j]);
        }
    }

    return sums;
}

function getInput(filename: string): number[] {

    const file = fs.readFileSync(filename, "utf-8");
    let input = file.split('\n');

    let numbers: number[] = [];

    input.forEach(line => { 
        let parts = line.split(' ');
        numbers.push(parseInt(line));
    });
    
    return numbers;
}

const t1 = new Date().getTime();

const result = main('./input.txt', 25);

const t2 = new Date().getTime();

console.log('day9a:', result); 
console.log('time:', (t2 - t1), 'ms');

