import { dir } from 'console';
import * as fs from 'fs';
import { Point } from '../types/point';
import { Vector } from './../types/vector';
import { Move, NESW, vectors } from './move';


function main(inputFile: string): number {

    const file = fs.readFileSync(inputFile, "utf-8");
    let input = file.split('\n');

    let positions = new Positions();

    input.forEach(instruction => {

        let action = instruction.substring(0, 1);
        let amount = parseInt(instruction.substring(1));

        if (NESW.includes(action)) {
            // move waypoint
            let move = vectors[NESW.indexOf(action)].multiply(amount);
            positions.waypoint = positions.waypoint.addVector(move);
        }
        else if (action == 'L' || action == 'R') {
            let degrees = (action == 'R' ? 1 : -1) * amount;
            let vector = positions.getVectorFromShipToWaypoint();
            vector = vector.rotate(degrees);
            positions.waypoint = positions.ship.addVector(vector);
        }
        else {
            let vector = positions.getVectorFromShipToWaypoint();
            let movement = vector.multiply(amount);
            positions.ship = positions.ship.addVector(movement);
            positions.waypoint = positions.waypoint.addVector(movement);
        }

    });

    return positions.ship.getManhattanDistance();
}

class Positions {

    ship: Point;
    waypoint: Point;

    constructor() {
        this.ship = new Point(0, 0);
        this.waypoint = new Point(10, 1);  // 10E, 1N
    }

    getVectorFromShipToWaypoint(): Vector {
        return new Vector(
            this.waypoint.x - this.ship.x,
            this.waypoint.y - this.ship.y
        );
    }
}

const t1 = new Date().getTime();
const result = main('./input.txt');
const t2 = new Date().getTime();

console.log('day12a:', result); 
console.log('time:', (t2 - t1), 'ms');

