
import { VM } from '../generic/vm';

class Instruction {
    constructor(public operator: string, public argument: number) {}
}

const vm = new VM();

function main(inputFile: string): number {

    let instructions = VM.parseInstructionFile(inputFile);
    vm.executeProgram(instructions);

    return vm.register.accumulator;
}

const t1 = new Date().getTime();
const result = main('./input.txt');
const t2 = new Date().getTime();

console.log('day8a:', result); 
console.log('time:', (t2 - t1), 'ms');

