import * as fs from 'fs';


function main(inputFile: string): number {
    const file = fs.readFileSync(inputFile, "utf-8");
    let questions = file.split('\n\n');

    let answer = 0;
    questions.forEach(question => {
        
        let group = question.split('\n');

        let intersection = group[0].split('');
        group.forEach(answers => {
            intersection = intersection.filter(answer => answers.split('').includes(answer));
        });
        answer += intersection.length;
    });

    return answer;
}


const t1 = new Date().getTime();
const result = main('./input.txt');
const t2 = new Date().getTime();

console.log('day6a:', result);    // 219
console.log('time:', (t2 - t1), 'ms');

