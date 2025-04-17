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
    expect(myGameboard.receiveAttack([0, 0])).toBe(true);
});

test('Miss a ship', () => {
    const myGameboard = new Gameboard();
    myGameboard.placeShip([0, 0], [0, 2]);
    expect(myGameboard.receiveAttack([0, 3])).toBe(false);
});

test('Hit but not sunk, only one ship', () => {
    const myGameboard = new Gameboard();
    myGameboard.placeShip([0, 0], [0, 2]);
    myGameboard.receiveAttack([0, 0]);
    myGameboard.receiveAttack([0, 1]);
    expect(myGameboard.allSunk()).toBe(false);
})

test('Sink a ship, but there are two ships', () => {
    const myGameboard = new Gameboard();
    myGameboard.placeShip([0, 0], [0, 2]);
    myGameboard.placeShip([2, 2], [2, 5]);
    myGameboard.receiveAttack([0, 0]);
    myGameboard.receiveAttack([0, 1]);
    myGameboard.receiveAttack([0, 2]);
    expect(myGameboard.allSunk()).toBe(false);
});

test('Sink a ship, only one ship', () => {
    const myGameboard = new Gameboard();
    myGameboard.placeShip([0, 0], [0, 2]);
    myGameboard.receiveAttack([0, 0]);
    myGameboard.receiveAttack([0, 1]);
    myGameboard.receiveAttack([0, 2]);
    expect(myGameboard.allSunk()).toBe(true);
});