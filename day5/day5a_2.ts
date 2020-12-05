import * as fs from 'fs';

let content = fs.readFileSync('./input.txt', 'utf-8');
const seats = content.split('\n').map(x => parseInt(x.replace(/F|L/g, '0').replace(/B|R/g, '1'), 2));

console.log(Math.max(...seats));
