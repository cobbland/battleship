import Player from "./Player.js";
import { makeBoard, clearShips, colorShips, cellChoice, sunkShip } from "./battleDOM.js";
import { computer, computerShipLayout } from "./computer.js";

const p1Board = document.querySelector(".p1-board");
const p2Board = document.querySelector(".p2-board");
const start = document.querySelector("#start");
const reset = document.querySelector("#reset");
const display = document.querySelector("#info");
const chooseLayout = document.querySelector("#choose");
const layoutButton1 = document.querySelector('#ships');
const layoutButton2 = document.querySelector('#ships2');
const layoutButton3 = document.querySelector('#ships3');

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

const ships3 = [
    // Carrier (5) - vertical
    [[1, 9], [5, 9]],
    // Battleship (4) - horizontal
    [[7, 0], [7, 3]],
    // Cruiser (3) - vertical
    [[0, 2], [2, 2]],
    // Submarine (3) - horizontal
    [[3, 5], [3, 7]],
    // Destroyer (2) - vertical
    [[8, 6], [9, 6]]
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
let p1Moves = [];
let p2Moves = [];
let p1ShipLayout;

playerOne = new Player("player");
playerTwo = new Player("computer");
makeBoard(p1Board, playerOne);
makeBoard(p2Board, playerTwo);

display.innerText = 'choose layout';

chooseLayout.addEventListener("click", (button) => {
    if (button.target.id === "ships") {
        p1ShipLayout = ships;
        playerOne = new Player("player");
        placeShips(p1ShipLayout, playerOne);
        clearShips(p1Board);
        colorShips(p1Board, playerOne);
        start.disabled = false;
        display.innerText = 'click "start" to begin'
    } else if (button.target.id === "ships2") {
        p1ShipLayout = ships2;
        playerOne = new Player("player");
        placeShips(p1ShipLayout, playerOne);
        clearShips(p1Board);
        colorShips(p1Board, playerOne);
        start.disabled = false;
        display.innerText = 'click "start" to begin'
    } else if (button.target.id === "ships3") {
        p1ShipLayout = ships3;
        playerOne = new Player("player");
        placeShips(p1ShipLayout, playerOne);
        clearShips(p1Board);
        colorShips(p1Board, playerOne);
        start.disabled = false;
        display.innerText = 'click "start" to begin'
    }
})

start.addEventListener("click", () => {
    if (!gameOn) {
        gameOn = true;
        layoutButton1.disabled = true;
        layoutButton2.disabled = true;
        layoutButton3.disabled = true;
        reset.disabled = false;
        const p2ShipLayout = computerShipLayout([ships, ships2, ships3]);
        placeShips(p2ShipLayout, playerTwo);
        p2Board.classList.add("active");
        currentPlayer = playerOne;
        display.innerText = `${currentPlayer.name}'s turn`;
    }
});

reset.addEventListener("click", () => {
    if (gameOn) {
        location.reload();
    }
});

p2Board.addEventListener("click", (cell) => {
    if (!p1Moves.includes(cell.target.dataset.cell) && p2Board.classList.contains("active")) {
        // player's turn
        if (currentPlayer === playerOne) {
            const hit = playerTwo.gameboard.receiveAttack(cell.target.dataset.cell)
            const player = cell.target.dataset.player;
            cellChoice(cell.target.dataset.cell, hit, player);
            if (hit) {
                const sunk = playerTwo.gameboard.ships[cell.target.dataset.cell].isSunk();
                if (sunk) {
                    sunkShip(cell.target.dataset.cell, playerTwo, p2Board)
                    display.innerText = "SUNK!";
                    if (playerTwo.gameboard.allSunk()) {
                        display.innerText = `${currentPlayer.name} wins!!!`;
                        p2Board.classList.toggle("active");
                        return;
                    }
                }
            }
            p1Moves.push(cell.target.dataset.cell);
            currentPlayer = playerTwo;
            display.innerText = `${currentPlayer.name}'s turn`;
        }
        // computer's turn
        let target = computer();
        while (p2Moves.includes(target)) {
            target = computer();
        }
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
            p2Moves.push(cell.target.dataset.cell);
            currentPlayer = playerOne;
            display.innerText = `${currentPlayer.name}'s turn`;
        }, 1000)
    }
});