import { input } from './input';


function main(input: any): number {
    let answer = 0;
    return answer;
}

const t1 = new Date().getTime();
const result = main(input);
const t2 = new Date().getTime();

console.log('dayXY:', result);
console.log('time:', (t2 - t1), 'ms');
