import Gameboard from "../src/Gameboard.js";

test('Create a gameboard', () => {
    const myGameboard = new Gameboard();
    expect(myGameboard).toBeDefined();
});

test('Place a ship', () => {
    const myGameboard = new Gameboard();
    myGameboard.placeShip([0, 0], [0, 2]);
});

test('Hit a ship', () => {
    const myGameboard = new Gameboard();
    myGameboard.placeShip([0, 0], [0, 2]);
    myGameboard.receiveAttack([0, 0]);
});

test('sink a ship', () => {
    const myGameboard = new Gameboard();
    myGameboard.placeShip([0, 0], [0, 2]);
    myGameboard.receiveAttack([0, 0]);
    myGameboard.receiveAttack([0, 1]);
    myGameboard.receiveAttack([0, 2]);
    expect(myGameboard.allSunk()).toBe(true);
});