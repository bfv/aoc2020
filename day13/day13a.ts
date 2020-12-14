import { constants } from 'buffer';
import * as fs from 'fs';

let arrangements = 1;
let adapters: number[];

function main(inputFile: string): number {

    let input = getInput(inputFile);
    console.log(input);

    let firstId = 0, wait = 0;
    let shortestWait = input.timestamp + 1;

    input.ids.forEach(id => {
        wait = (Math.floor(input.timestamp / id) * id + id) - input.timestamp;
        if (wait < shortestWait) {
            shortestWait = wait;
            firstId = id;
        }
    });

    return firstId * shortestWait;
}

function getInput(filename: string): { timestamp: number, ids: number[]} {

    const file = fs.readFileSync(filename, "utf-8");
    let input = file.split('\n');

    const timpstamp = parseInt(input[0]);
    const ids = input[1].split(',').map(id => parseInt(id)).filter(id => !!id);
     
    return {
        timestamp: timpstamp,
        ids: ids
    };
}

const t1 = new Date().getTime();
const result = main('./input.txt');
console.log('day10a:', result, '- time:', (new Date().getTime() - t1), 'ms');
