import * as fs from 'fs';

// "stolen" from 
export const getInput = (inputFile = './input.txt', separator = "\n") => {
    const file = fs.readFileSync(inputFile, "utf-8");
    return file.split(separator).map(x => x);
};
