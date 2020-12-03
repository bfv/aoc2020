import { Vector } from '../types/vector';
import { getInput } from './../input';


function main(input: string[]): number {

    let answer = 1;
    let width = input[0].length - 1;

    let vectors = [
        new Vector(1, 1),
        new Vector(3, 1),
        new Vector(5, 1),
        new Vector(7, 1),
        new Vector(1, 2)
    ];

    for (let vector of vectors) {
        let x = 0, y = 0, trees = 0;
        while (y < input.length) {
            // console.log('check:', x, '(', x % width, ')' , y, (input[y].substr(x % width, 1) == '#' ? 'X' : 'O'));
            if (input[y].substr(x % width, 1) == '#') {
                trees++;
            }
            y += vector.y;
            x += vector.x;
        }
        answer *= trees;
    
    }

    return answer;
}


const t1 = new Date().getTime();
const input = getInput('./input.txt');
const result = main(input);
const t2 = new Date().getTime();

console.log('day3b:', result);
console.log('time:', (t2 - t1), 'ms');
