import * as fs from 'fs';

class Instruction {
    constructor(public operator: string, public argument: number) {}
}

const containsLoop = 0.5;  // a non-integer means a loop was encountered

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

    let accumulator = containsLoop;
    for (let i = 0; i < instructions.length && accumulator == containsLoop; i++) {

        let original = instructions[i].operator;
        let altered = true;

        switch(original) {
            case 'jmp': instructions[i].operator = 'nop'; break;
            case 'nop': instructions[i].operator = 'jmp'; break;
            default: altered = false;
        }
        
        if (altered) {            
            accumulator = checkLoop(instructions);
            instructions[i].operator = original;           
        }   
    }

    return accumulator;
}

function checkLoop(instructions: Instruction[]): number {

    let accumulator = 0, offset = 0;
    let visited: number[] = [];

    while(!visited.includes(offset) && instructions[offset]) {
        visited.push(offset);
        let instruction = instructions[offset];

        switch(instruction.operator) {
            case 'acc': accumulator += instruction.argument; offset++; break;
            case 'jmp': offset += instruction.argument; break;
            case 'nop': offset++; break;
        }
    }
    
    return (offset == instructions.length) ? accumulator : containsLoop;
}


const t1 = new Date().getTime();
const result = main('./input.txt');
const t2 = new Date().getTime();

console.log('day8b:', result); 
console.log('time:', (t2 - t1), 'ms');

