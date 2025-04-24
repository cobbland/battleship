function computer() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return `${x},${y}`;
}

function computerShipLayout(optionsArr) {
    return optionsArr[Math.floor(Math.random() * 3)];
}

export { computer, computerShipLayout };