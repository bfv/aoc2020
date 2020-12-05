import { getInput } from './../input';

function main(input: string[]): number {
    let ids: number[] = []; 
    input.forEach(pass => {
        let row = getPosition(0, 127, pass.substr(0,7).split(''));
        let col = getPosition(0, 7, pass.substr(7, 3).split('')); 
        ids.push(row * 8 + col);       
    });
    ids = ids.sort(((a, b) => a - b));
    
    let offset = ids[0];
    for (let i = 0; i < ids.length; i++) {
        if (ids[i] - offset != i) return ids[i] - 1;
    }

    return -1;
}

function getPosition(min: number, max: number, location: string[]): number {
    
    if (min == max) return min;

    let mean = Math.round((min + max + 1) / 2) - 1;
    if (location[0] == 'F' || location[0] == 'L') 
        return getPosition(min, mean, location.slice(1));
    else 
        return getPosition(mean + 1, max, location.slice(1));
}

const t1 = new Date().getTime();
const input = getInput('./input.txt');
const result = main(input);
const t2 = new Date().getTime();

console.log('day5b:', result);
console.log('time:', (t2 - t1), 'ms');
