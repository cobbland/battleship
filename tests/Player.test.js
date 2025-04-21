import Player from "../src/Player.js";

test('Create a player', () => {
    const newPlayer = new Player("me");
    expect(newPlayer).toBeDefined();
})

test('Create two players', () => {
    const playerOne = new Player("me");
    const playerTwo = new Player("you");
    expect(playerOne).toBeDefined();
    expect(playerTwo).toBeDefined();
});

test("Place ship on player's board and hit it", () => {
    const playerOne = new Player("me");
    playerOne.gameboard.placeShip([0, 0], [0, 2]);
    expect(playerOne.gameboard.receiveAttack([0, 0])).toBe(true);
})

test("Place multiple ships on player's board", () => {
    const playerOne = new Player("me");
    const ships = [
        // Carrier (5 spaces) - vertical
        [[2, 1], [6, 1]],
        // Battleship (4 spaces) - horizontal
        [[0, 3], [0, 6]],
        // Cruiser (3 spaces) - vertical
        [[4, 5], [6, 5]],
        // Submarine (3 spaces) - horizontal
        [[8, 2], [8, 4]],
        // Destroyer (2 spaces) - vertical
        [[3, 8], [4, 8]]
    ];
    for (let i = 0; i < ships.length; i++) {
        playerOne.gameboard.placeShip(ships[i][0], ships[i][1]);
    }
    expect(playerOne.gameboard.receiveAttack([0, 0])).toBe(false);
    expect(playerOne.gameboard.receiveAttack([5, 5])).toBe(true);
})