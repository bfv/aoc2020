import { dir } from 'console';
import * as fs from 'fs';
import { Vector } from './../types/vector';
import { Move } from './move';


function main(inputFile: string): number {
    
    const file = fs.readFileSync(inputFile, "utf-8");
    let input = file.split('\n');

    let x = 0, y = 0;

    let currentHeading = 'E';
    input.forEach(move => {
        let m = Move.getMoveVector(move, currentHeading);
        currentHeading = m.heading;
        x += m.vector.x;
        y += m.vector.y;
    });

    return (Math.abs(x) + Math.abs(y));
}



const t1 = new Date().getTime();
const result = main('./input.txt');
const t2 = new Date().getTime();

console.log('day12a:', result); 
console.log('time:', (t2 - t1), 'ms');

