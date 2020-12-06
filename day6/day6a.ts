import * as fs from 'fs';


function main(inputFile: string): number {
    const file = fs.readFileSync(inputFile, "utf-8");
    let questions = file.split('\n\n');

    let answer = 0;
    questions.forEach(question => {
        let array = question.replace(/\n/g, '').split('');
        let unique = new Set(...[array]);
        answer += unique.size;
    });

    return answer;
}


const t1 = new Date().getTime();
const result = main('./input.txt');
const t2 = new Date().getTime();

console.log('day6a:', result);    // 219
console.log('time:', (t2 - t1), 'ms');

