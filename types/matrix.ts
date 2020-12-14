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

    gaussianEliminate(answers: Matrix) {

        let solution = new Matrix(answers.cols, this.rows);
        let calcdata = this.fillGaussianCalculationData(answers);

        // j is column
        for (let j = 1; j <= this.cols; j++) {

            // findmaxrow to prevent zeros in the diagonal
            if (j < this.rows) {
                let maxRow = calcdata.findMaxColValue(j);
                if (maxRow !== j) {
                    calcdata.swapRows(j, maxRow);
                }
            }

            for (let i = 1; i <= this.rows; i++) {
                if (i !== j && calcdata.getValue(i, j) !== 0.0) {
                    let scalar = -1 * (calcdata.getValue(i, j) / calcdata.getValue(j, j));
                    calcdata.addScalarMultiple(j, scalar, i);
                }
            }
        }

        for (let k = 1; k <= this.rows; k++) {
            let val = calcdata.getValue(k, k);
            if (val !== 1) {
                calcdata.scalarMultiplyRow(k, 1 / val);
            }
        }

        for (let k = 1; k <= calcdata.rows; k++) {
            solution.setValue(1, k, Math.round(calcdata.getValue(k, calcdata.cols) * 1000) / 1000);  // 3 digits max
        }

        return solution;
    }

    private fillGaussianCalculationData(answers: Matrix): Matrix {
        let calcdata = new Matrix(this.rows, this.cols + 1);

        // copy this to data matrix
        this.iterateElements((i, j) => {
            calcdata.setValue(i, j, this.data[i][j]);
        });

        // copy answer column to data matrix
        for (let i = 1; i <= answers.rows; i++) {
            calcdata.setValue(i, calcdata.cols, answers.getValue(i, 1));
        }

        return calcdata;
    }

}