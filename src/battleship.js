import Player from "./Player.js";

const start = document.querySelector("#start");

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

const ships2 = [
    // Carrier (5 spaces) - horizontal
    [[5, 0], [5, 4]],
    // Battleship (4 spaces) - vertical
    [[1, 7], [4, 7]],
    // Cruiser (3 spaces) - horizontal
    [[7, 6], [7, 8]],
    // Submarine (3 spaces) - vertical
    [[2, 2], [4, 2]],
    // Destroyer (2 spaces) - horizontal
    [[9, 5], [9, 6]]
];

const playerOne = new Player("player");
const playerTwo = new Player("computer");

function placeShips(ships, player) {
    for (let i = 0; i < ships.length; i++) {
        player.gameboard.placeShip(ships[i][0], ships[i][1]);
    }
}

placeShips(ships, playerOne);
placeShips(ships2, playerTwo);

playerOne.gameboard.receiveAttack([0, 3]);

console.log(playerOne);

const p1Board = document.querySelector(".p1-board");
const p2Board = document.querySelector(".p2-board");

function makeBoard(div) {
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10 ; y++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = `${[x, y]}`;
            div.appendChild(cell);
        }
    }
}

function colorShips(board, player) {
    const ships = player.gameboard.ships;
    const cells = board.children;
    for (let ship in ships) {
        for (let i = 0; i < cells.length; i++) {
            if (ship == cells[i].id) {
                cells[i].classList.add('ship')
            }
        }
    }
}

makeBoard(p1Board);
makeBoard(p2Board);

start.addEventListener("click", () => {
    colorShips(p1Board, playerOne);
});