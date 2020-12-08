
import { VM } from './../generic/vm';

class Instruction {
    constructor(public operator: string, public argument: number) {}
}

const vm = new VM();

function main(inputFile: string): number {

    let instructions = VM.parseInstructionFile(inputFile);

    let accumulator: number | null = null;
    let hasLoop = true;
    for (let i = 0; i < instructions.length && hasLoop; i++) {

        let original = instructions[i].operator;
        let altered = true;

        switch(original) {
            case 'jmp': instructions[i].operator = 'nop'; break;
            case 'nop': instructions[i].operator = 'jmp'; break;
            default: altered = false;
        }
        
        if (altered) {            
            hasLoop = vm.executeProgram(instructions);
            instructions[i].operator = original;           
        }   
    }

    return vm.register.accumulator;
}

const t1 = new Date().getTime();
const result = main('./input.txt');
const t2 = new Date().getTime();

console.log('day8b:', result); 
console.log('time:', (t2 - t1), 'ms');

