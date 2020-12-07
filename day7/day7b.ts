import * as fs from 'fs';
import { parse } from 'path';


function main(inputFile: string): number {
    const file = fs.readFileSync(inputFile, "utf-8");
    let input = file.split('\n');

    let answer = 0;
    let descs:Descs = {};
    input.forEach(line => { 
        let parsed = line.replace(/bags/g, '').replace(/bag/g, '').replace(/.\./g, '').replace(/.,./g, ',').split('  contain ');
        descs[parsed[0]] = parsed[1].split(',');
    });

    answer = traverse(descs, 'shiny gold', 1) - 1;
    
    return answer;
}

function traverse(descs: Descs, target: string, targetBagCount: number): number {
  
    if (target.startsWith('other')) return targetBagCount;

    let childCount = 0;
    for(let color of descs[target]) {   

        let array = color.split(' ');
        let bagCount = parseInt(array[0]);

        if (bagCount) {                        
            let colorName = array[1] + ' ' + array[2];
            childCount += traverse(descs, colorName, bagCount);
        }
        
    }

    return targetBagCount + (targetBagCount * childCount);

}

class Descs {
    [string: string]: string[]
}

const t1 = new Date().getTime();
const result = main('./input.txt');
const t2 = new Date().getTime();

console.log('day7b:', result); 
console.log('time:', (t2 - t1), 'ms');

