import * as fs from 'fs';

class Instruction {
    constructor(public operator: string, public argument: number) {}
}


function main(inputFile: string): number {

    const file = fs.readFileSync(inputFile, "utf-8");
    let input = file.split('\n');

    let instructions: Instruction[] = [];

    input.forEach(line => { 
        let parts = line.split(' ');
        instructions.push(new Instruction(
            parts[0],
            parseInt(parts[1])
        ));
    });

    let acc = checkLoop(instructions);
    return acc;
}

function checkLoop(instructions: Instruction[]): number {

    let accumulator = 0, offset = 0;
    let visited: number[] = [];

    while(!visited.includes(offset)) {
        visited.push(offset);
        let instruction = instructions[offset];

        switch(instruction.operator) {
            case 'jmp': offset += instruction.argument; break;
            case 'acc': accumulator += instruction.argument; offset++; break;
            case 'nop': offset++; break;
        }
    }

    return accumulator;

}


const t1 = new Date().getTime();
const result = main('./input.txt');
const t2 = new Date().getTime();

console.log('day8a:', result); 
console.log('time:', (t2 - t1), 'ms');

