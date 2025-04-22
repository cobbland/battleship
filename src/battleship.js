import Player from "./Player.js";
import { makeBoard, colorShips } from "./battleDOM.js";

const p1Board = document.querySelector(".p1-board");
const p2Board = document.querySelector(".p2-board");
const start = document.querySelector("#start");
const display = document.querySelector("#info");

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

function placeShips(ships, player) {
    for (let i = 0; i < ships.length; i++) {
        player.gameboard.placeShip(ships[i][0], ships[i][1]);
    }
}





display.innerText = 'Click "Start" to begin'

start.addEventListener("click", () => {
    makeBoard(p1Board);
    makeBoard(p2Board);
    const playerOne = new Player("player");
    const playerTwo = new Player("computer");
    placeShips(ships, playerOne);
    placeShips(ships2, playerTwo);
    colorShips(p1Board, playerOne);
    p2Board.classList.add("active");
    display.innerText = "Player's turn";
});

p1Board.addEventListener("click", (cell) => {

});