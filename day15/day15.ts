
import * as fs from 'fs';  // bogus import to make it a module

type Dict = { [key: number]: number[] };
let spokenAtTurns: Dict = {};

function main(): number {

    let input = getInput();
    console.log(input);

    input.forEach((spoken, index) => {
        spokenAtTurns[spoken] = [index + 1];
    });

    let lastSpoken = input.slice(-1)[0];
    for (let turn = input.length + 1; turn <= /*2020*/ 30000000; turn++) {

        let array = spokenAtTurns[lastSpoken]; 
        let currentSpoken = (array.length > 1 ? array[array.length -1] - array[array.length - 2] : 0);

        lastSpoken = currentSpoken;
        
        if (!spokenAtTurns[currentSpoken]) spokenAtTurns[currentSpoken] = [];
        
        spokenAtTurns[currentSpoken].push(turn);
    }

    return lastSpoken;
}


function getInput(): number[] {
    return [16,11,15,0,1,7];
}

const t1 = new Date().getTime();
const result = main();
console.log('day15:', result, '- time:', (new Date().getTime() - t1), 'ms');