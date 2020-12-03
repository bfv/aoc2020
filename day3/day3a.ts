import { Vector } from '../types/vector';
import { getInput } from './../input';


function main(input: any): number {

    let x = 0, y = 0, trees = 0;
    let vector = new Vector(3, 1);
    let width = input[0].length - 1;

    while (y < input.length) {
        if (input[y].substr(x % width, 1) == '#') {
            trees++;
        }
        y += vector.y;
        x += vector.x;
    }
    return trees;
}

const t1 = new Date().getTime();
const input = getInput('./input.txt');
const result = main(input);
const t2 = new Date().getTime();

console.log('day3a:', result);
console.log('time:', (t2 - t1), 'ms');
