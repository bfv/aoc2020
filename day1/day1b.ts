import { input } from './input';

function main(input: number[]): number {
  
    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            if (input[i] + input[j] < 2020) {
                for (let k = j + 1; k < input.length; k++) {
                    if (input[i] + input[j] + input[k] == 2020) {
                        return input[i] * input[j] * input[k];
                    }
                }
            }
        }
    }

    return -1;
}

const t1 = new Date().getTime();
const result = main(input);
const t2 = new Date().getTime();

console.log('day1a:', result);
console.log('time:', (t2 - t1), 'ms');
