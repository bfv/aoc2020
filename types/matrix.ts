import { Vector } from "./vector";

export class Matrix {

    data: number[][];

    constructor(public rows: number, public cols: number) {
        this.data = new Array<number[]>(rows);
        for (let row = 0; row < rows; row++) {
            this.data[row] = new Array<number>(cols);
            for (let col = 0; col < cols; col++) {
                this.data[row][col] = 0;
            }
        }
    }

    multiply(other: Matrix): Matrix {

        let matrix = new Matrix(this.rows, other.cols);
        
        this.iterateElements((row, col) => {
            let result = 0;
            for (let k = 0; k < this.cols; k++) {
                result += this.data[row][k] * other.data[k][col];
            }
            matrix.data[row][col] = Math.round(result);
        });
        return matrix;
    }

    rotate(degrees: number): Matrix {

        let radians = Math.PI * degrees / 180;
        let translationMatrix = new Matrix(2, 2);
        translationMatrix.data = [ 
            [Math.cos(radians), -Math.sin(radians)],
            [Math.sin(radians),  Math.cos(radians)] 
        ];
        return this.multiply(translationMatrix);
    }

    iterateElements(f: (i: number, j: number) => void) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                f(i, j);
            }
        }
    }

    toVector(): Vector {
        return new Vector(this.data[0][0], this.data[0][1]);
    }
}