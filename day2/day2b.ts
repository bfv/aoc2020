import { input } from './input';
import { PasswordData } from './passworddata';

function main(input: string[]): number {
    
    let answer = 0;
    for (let i = 0; i < input.length; i++) {
        answer += checkPassword(input[i]);
    }

    return answer;
}

function checkPassword(line: string): number {
    const pwdData = new PasswordData(line);
    return pwdData.checkB() ? 1 : 0;
}


const t1 = new Date().getTime();
const result = main(input);
const t2 = new Date().getTime();

console.log('day2b:', result);
console.log('time:', (t2 - t1), 'ms');
