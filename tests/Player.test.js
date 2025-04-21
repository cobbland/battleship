import Player from "../src/Player.js";

test('Create a player', () => {
    const newPlayer = new Player("me");
    expect(newPlayer).toBeDefined();
})