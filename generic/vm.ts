
import * as fs from 'fs';

class Register {
    accumulator = 0;
    offset = 0;
}

class Instruction {
    constructor(public operator: string, public argument: number) {}
}

export class VM {

    register: Register;
    
    constructor() {
        this.register = new Register();
    }

    executeProgram(instructions: Instruction[]) {
        
        this.reset();

        let visited: number[] = [];
        let hasLoop = false;

        while(!hasLoop && instructions[this.register.offset]) {

            visited.push(this.register.offset);
            let instruction = instructions[this.register.offset];

            this.execute(instruction);
            hasLoop = visited.includes(this.register.offset);
        }

        return hasLoop;
    }

    execute(instruction: Instruction): void {

        switch(instruction.operator) {
            case 'acc': this.executeACC(instruction.argument); break;
            case 'jmp': this.executeJMP(instruction.argument); break;
            case 'nop': this.executeNOP(); break;
            default: throw new Error()
        }

    }

    private executeACC(argument: number) {
        this.register.accumulator += argument; 
        this.register.offset++;
    }

    private executeJMP(argument: number) {
        this.register.offset += argument;
    }

    private executeNOP() {
        this.register.offset++;
    }

    private reset() {
        this.register = new Register();
    }

    static parseInstructionFile(filename: string): Instruction[] {

        const file = fs.readFileSync(filename, "utf-8");
        let input = file.split('\n');
    
        let instructions: Instruction[] = [];
    
        input.forEach(line => { 
            let parts = line.split(' ');
            instructions.push(new Instruction(
                parts[0],
                parseInt(parts[1])
            ));
        });
        
        return instructions;
    }
} 