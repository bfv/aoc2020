
import * as fs from 'fs';

function main(inputFile: string, toCheck: number): number {

    let numbers = getInput(inputFile);
    
    for (let i = 0; i < numbers.length - 1; i++) {
        let sum = numbers[i], min = sum, max = sum; 
        for (let j = i + 1; j < numbers.length && sum < toCheck; j++) {
            sum += numbers[j];
            min = Math.min(min, numbers[j]);
            max = Math.max(max, numbers[j]);
            if (sum == toCheck) return min + max;
        }
    }

    return -1;
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

const result = main('./input.txt', 1124361034);

console.log('day9b:', result, '- time:', (new Date().getTime() - t1), 'ms');

