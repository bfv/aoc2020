import * as fs from 'fs';


function main(inputFile: string): number {
    const file = fs.readFileSync(inputFile, "utf-8");
    let input = file.split('\n');

    let answer = 0;
    let descs:Descs = {};
    input.forEach(line => { 
        let parsed = line.replace(/bags/g, '').replace(/bag/g, '').replace(/.\./g, '').replace(/.,./g, ',').split('  contain ');
        descs[parsed[0]] = parsed[1].split(',');
    });

    console.log(descs);
    let colors: string[] = [];
    traverse(descs, 'shiny gold', colors);
    
    console.log(new Set(...[colors]));
    return (new Set(...[colors])).size;
}

function traverse(descs: Descs, target: string, colors: string[]): void {

    for(let color in descs) {
        descs[color].forEach(contain => {
            if (contain.endsWith(target)) {
                 colors.push(color);
                 traverse(descs, color, colors);
            }                           
        });
    }

}

class Descs {
    [string: string]: string[]
}

const t1 = new Date().getTime();
const result = main('./input.txt');
const t2 = new Date().getTime();

console.log('day7a:', result); 
console.log('time:', (t2 - t1), 'ms');

