
import { Vector } from './vector';

export class Point {
    
    constructor(public x = 0, public y = 0) { }

    addVector(vector: Vector): Point {
        return new Point(
            this.x + vector.x,
            this.y + vector.y
        );
    }

    toString() {
        return this.x.toString() + ',' + this.y.toString();
    }

    getManhattanDistance(): number {
        return Math.abs(this.x) + Math.abs(this.y);
    }
}
