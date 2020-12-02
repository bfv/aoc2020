
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
        let count = this.password.split(this.character).length - 1;
        return (this.min <= count && count <= this.max);
    }

    checkB(): boolean {
        return (this.password.substr(this.min - 1, 1) == this.character) != (this.password.substr(this.max - 1, 1) == this.character);
    }

    toString() {
        return this.min.toString() + '<->' + this.max.toString() + '=' + this.character + ': ' + this.password;
    }
}
