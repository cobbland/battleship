import Ship from "./Ship.js";

export default class Gameboard {
    constructor() {
        this.ships = {};
        // Does anything else need to go in here?
    }

    placeShip(coordArrStart, coordArrEnd) {
        const start = coordArrStart[0] - coordArrEnd[0];
        const end = coordArrStart[1] - coordArrEnd[1];
        const length = Math.abs(start) + Math.abs(end);
        const allCoordArr = [];
        // Add all coordinates to the above const.
        const newShip = new Ship(length);
        // Loop through allCoordArr, adding a link to the above ship in this.ships.
        // Like:
        this.ships['0, 0'] = newShip;
    }

    receiveAttack(coord) {
        // todo
    }

    allSunk() {
        return true;
        // todo
    }
}