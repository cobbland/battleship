import Ship from "./Ship.js";

export default class Gameboard {
    constructor() {
        this.ships = {};
        // Does anything else need to go in here?
    }

    placeShip(coordArrStart, coordArrEnd) {
        // Calculate the length of the ship and create it
        const length = Math.abs(coordArrStart[0] - coordArrEnd[0]) + 
                       Math.abs(coordArrStart[1] - coordArrEnd[1]) +
                       1;
        const newShip = new Ship(length);
        // Add all coordinates from start to end inclusive to this.Ships
        // linking each to the above newly created ship (newShip)
        this.ships[coordArrStart] = newShip;
        if (coordArrStart[0] < coordArrEnd[0]) {
            for (let step = coordArrStart[0]; step < coordArrEnd[0]; step++) {
                this.ships[[step, coordArrStart[1]]] = newShip;
            }
        } else if (coordArrStart[1] < coordArrEnd[1]) {
            for (let step = coordArrStart[1]; step < coordArrEnd[1]; step++) {
                this.ships[[coordArrStart[0], step]] = newShip;
            }
        }
        this.ships[coordArrEnd] = newShip;
    }

    receiveAttack(coord) {
        if (this.ships[coord] && this.ships[coord] !== 'miss') {
            this.ships[coord].hit();
            return true;
        } else {
            this.ships[coord] = 'miss';
            return false;
        }
    }

    allSunk() {
        const sunkArr = [];
        for (const ship in this.ships) {
            sunkArr.push(this.ships[ship].isSunk());
        }
        // check sunkArr to see if all are sunk
        // if so, return true
        // else, return false
        return !sunkArr.some(bool => bool === false);
    }
}