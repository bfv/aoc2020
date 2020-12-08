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

    let acc = -1;
    for (let i = 0; i < instructions.length && acc < 0; i++) {

        let original = instructions[i].operator;
        let altered = false;

        if (original == 'jmp') {
            instructions[i].operator = 'nop'; 
            altered = true;
        } 
        
        if (original == 'nop') {
            instructions[i].operator = 'jmp'; 
            altered = true;
        }
        
        if (altered) {            
            acc = checkLoop(instructions);
            instructions[i].operator = original;           
        }
        
    }

    return acc;
}

function checkLoop(instructions: Instruction[]): number {

    let accumulator = 0, offset = 0;
    let visited: number[] = [];

    while(!visited.includes(offset) && instructions[offset]) {
        visited.push(offset);
        let instruction = instructions[offset];

        switch(instruction.operator) {
            case 'jmp': offset += instruction.argument; break;
            case 'acc': accumulator += instruction.argument;
            case 'nop': offset++; break;
        }
    }
    
    return (offset == instructions.length) ? accumulator : -1;
}


const t1 = new Date().getTime();
const result = main('./input.txt');
const t2 = new Date().getTime();

console.log('day8b:', result); 
console.log('time:', (t2 - t1), 'ms');

