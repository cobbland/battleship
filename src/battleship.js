import Player from "./Player.js";
import { makeBoard, colorShips, cellChoice, sunkShip } from "./battleDOM.js";
import { computer } from "./computer.js";

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



let gameOn = false;
let playerOne;
let playerTwo;
let currentPlayer;

display.innerText = 'click "start" to begin'

start.addEventListener("click", () => {
    if (!gameOn) {
        gameOn = true;
        playerOne = new Player("player");
        playerTwo = new Player("computer");
        makeBoard(p1Board, playerOne);
        makeBoard(p2Board, playerTwo);
        placeShips(ships, playerOne);
        placeShips(ships2, playerTwo);
        colorShips(p1Board, playerOne);
        p2Board.classList.add("active");
        currentPlayer = playerOne;
        display.innerText = `${currentPlayer.name}'s turn`;
    }
});

p2Board.addEventListener("click", (cell) => {
    if (currentPlayer === playerOne) {
        const hit = playerTwo.gameboard.receiveAttack(cell.target.dataset.cell)
        const player = cell.target.dataset.player;
        cellChoice(cell.target.dataset.cell, hit, player);
        if (hit) {
            const sunk = playerTwo.gameboard.ships[cell.target.dataset.cell].isSunk();
            if (sunk) {
                sunkShip(cell.target.dataset.cell, playerTwo, p2Board)
                display.innerText = "SUNK!";
                // if (playerTwo.gameboard.allSunk()) {
                //     display.innerText = `${currentPlayer.name} wins!!!`;
                //     return;
                // }
            }
        }
        currentPlayer = playerTwo;
        display.innerText = `${currentPlayer.name}'s turn`;
    }
    // computer's turn
    const target = computer();
    const player = playerOne.name;
    const hit = playerOne.gameboard.receiveAttack(target);
    setTimeout(() => {
        cellChoice(target, hit, player);
        if (hit) {
            const sunk = playerOne.gameboard.ships[target].isSunk();
            if (sunk) {
                sunkShip(cell.target.dataset.cell, playerOne, p1Board)
                display.innerText = "SUNK!";
            }
        }
        currentPlayer = playerOne;
        display.innerText = `${currentPlayer.name}'s turn`;
    }, 100)
});