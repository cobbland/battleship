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

export { makeBoard, colorShips };