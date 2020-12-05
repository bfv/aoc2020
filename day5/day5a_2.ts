console.log(Math.max(...((<string>(require('fs')).readFileSync('./input.txt', 'utf-8')).split('\n').map(x => parseInt(x.replace(/F|L/g, '0').replace(/B|R/g, '1'), 2)))));
