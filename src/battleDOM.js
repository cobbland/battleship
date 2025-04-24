function makeBoard(div, player) {
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10 ; y++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.cell = `${[x, y]}`;
            cell.dataset.player = player.name;
            div.appendChild(cell);
        }
    }
}

function clearShips(board) {
    const cells = board.children;
    for (let cell of cells) {
        if (cell.classList.contains("ship")) {
            cell.classList.toggle("ship");
        }
    }
}

function colorShips(board, player) {
    const ships = player.gameboard.ships;
    const cells = board.children;
    for (let ship in ships) {
        for (let i = 0; i < cells.length; i++) {
            if (ship === cells[i].dataset.cell) {
                cells[i].classList.add('ship')
            }
        }
    }
}

function cellChoice(cell, bool, player) {
    const cellTarget = document.querySelector(`[data-player="${player}"][data-cell="${cell}"]`);
    if (bool) {
        cellTarget.classList.add('hit');
    } else {
        cellTarget.classList.add('miss');
    }
}

function sunkShip(cell, player, board) {
    const wholeShip = [];
    for (let ship in player.gameboard.ships) {
        if (player.gameboard.ships[cell] === player.gameboard.ships[ship]) {
            wholeShip.push(ship)
        }
    }
    const cells = board.children;
    for (let coord of wholeShip) {
        for (let i = 0; i < cells.length; i++) {
            if (coord === cells[i].dataset.cell) {
                cells[i].classList.add('sunk')
            }
        }
    }
}

export { makeBoard, clearShips, colorShips, cellChoice, sunkShip };