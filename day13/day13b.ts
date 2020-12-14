import { constants } from 'buffer';
import * as fs from 'fs';

let arrangements = 1;
let adapters: number[];

function main(inputFile: string): number {

    let ids = getInput(inputFile);
    console.log(ids);

    let incrementWith = ids[0];
    let answer = 0;

    for (let i = 0; i < ids.length; i++) {

        let currentOk = false;
        let id = ids[i];

        if (id > 0) {

            for (let t = answer; !currentOk; t += incrementWith) {
                let check = t + i;
                if (check % id != 0) continue;
                answer = t;
                currentOk = true;
                console.log('found:', id);
            }

            incrementWith = lcm(incrementWith, id);
        }
    }
    return answer;
}

function lcm(a: number, b: number): number {
    return (a * b / gcd(a, b));
}

function gcd(a: number, b: number): number {
    let remainder = 0;

    do {
        remainder = a % b;
        a = b;
        b = remainder;
    } while (b != 0);

    return a;
}

function getInput(filename: string): number[] {

    const file = fs.readFileSync(filename, "utf-8");
    let input = file.split('\n');

    const timpstamp = parseInt(input[0]);
    const ids = input[1].split(',').map(id => parseInt(id));

    return ids;
}

const t1 = new Date().getTime();
const result = main('./input.txt');
console.log('day10a:', result, '- time:', (new Date().getTime() - t1), 'ms');
