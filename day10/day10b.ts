
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import * as fs from 'fs';

let arrangements = 1;
let adapters: number[];

function main(inputFile: string): number {

    let numbers = getInput(inputFile);

    numbers.push(0);
    adapters = numbers.sort((a, b) =>  a - b);
    adapters.push(adapters.slice(-1)[0] + 3);

    let paths = [ 1 ];
    for (let i = 1; i < adapters.length; i++) {
        let pathCount = 0; let bla = '';
        // console.log('check i:', i, 'value:', adapters[i]);
        for (let j = i - 3; j < i; j++) {
            if (adapters[i] <= adapters[j] + 3) {
                // console.log('possible via:', adapters[j], 'accessible via', paths[j], 'route(s)');
                pathCount += paths[j]; 
            }
        }
        paths.push(pathCount);
    }
    return (paths.slice(-1)[0]);
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

const result = main('./input.txt');

console.log('day10b:', result, '- time:', (new Date().getTime() - t1), 'ms');

