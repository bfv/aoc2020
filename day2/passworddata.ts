
export class PasswordData {

    min = 0;
    max = 0; 
    character = '';
    password = '';

    constructor(private line: string) {
        this.decompose(line);
    }

    private decompose(line: string) {
        const items = line.split(' ');
        this.min = parseInt(items[0].split('-')[0]);
        this.max = parseInt(items[0].split('-')[1]);
        this.character = items[1].substring(0, items[1].length - 1);
        this.password = items[2];
    }

    checkA(): boolean {
        let count = 0;
        for(let i = 0; i < this.password.length; i++) {
            if (this.password.substr(i, 1) == this.character) {
                count++;
            }
        }
        return (this.min <= count && count <= this.max);
    }

    checkB(): boolean {
        // no XOR...
        let count = (this.password.substr(this.min - 1, 1) == this.character) ? 1 : 0;
        count += (this.password.substr(this.max - 1, 1) == this.character) ? 1 : 0;
        return (count == 1);
    }

    toString() {
        return this.min.toString() + '<->' + this.max.toString() + '=' + this.character + ': ' + this.password;
    }
}
