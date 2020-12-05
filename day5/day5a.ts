import { getInput } from './../input';

function main(input: string[]): number {
    let max = 0; 
    input.forEach(pass => {
        let row = getPosition(0, 127, pass.substr(0,7).split(''));
        let col = getPosition(0, 7, pass.substr(7, 3).split('')); 
        let id = row * 8 + col;
        max = Math.max(max, id);
    });
    return max;
}

function getPosition(min: number, max: number, location: string[]): number {
    
    if (min == max) return min;
    
    let mean = Math.round((min + max + 1) / 2) - 1;  // studid JS
    if (location[0] == 'F' || location[0] == 'L') 
        return getPosition(min, mean, location.slice(1));
    else 
        return getPosition(mean + 1, max, location.slice(1));
}

const t1 = new Date().getTime();
const input = getInput('./input.txt');
const result = main(input);
const t2 = new Date().getTime();

console.log('day5a:', result);
console.log('time:', (t2 - t1), 'ms');
