import { Matrix } from "./matrix";
import { Point } from "./point";

export class Vector {

    constructor (public x: number, public y: number) {}

    multiply(amount: number): Vector {
        return new Vector(this.x * amount, this.y * amount);
    }

    getVector(from: Point, to: Point): Vector {
        return new Vector(
            to.x - from.x,
            to.y - from.y
        );
    }

    rotate(degrees: number): Vector {
        return this.toMatrix().rotate(degrees).toVector();
    }

    toMatrix(): Matrix {
        let matrix = new Matrix(1, 2);
        matrix.data = [[this.x, this.y]];
        return matrix;
    }

    toString(): string {
        return `${this.x}, ${this.y}`;
    }
}

export const NullVector = new Vector(0, 0);