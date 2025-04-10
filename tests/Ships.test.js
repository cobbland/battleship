import Ship from "../src/Ship.js";

test('Creates a ship', () => {
  const myBattleship = new Ship(4);
  expect(myBattleship).toBeDefined();
});

test('Creates a ship and hits it until it sinks', () => {
  const myBattleship = new Ship(4);
  expect(myBattleship.isSunk()).toBe(false);
  expect(myBattleship.hit()).toBe(1);
  expect(myBattleship.isSunk()).toBe(false);
  expect(myBattleship.hit()).toBe(2);
  expect(myBattleship.isSunk()).toBe(false);
  expect(myBattleship.hit()).toBe(3);
  expect(myBattleship.isSunk()).toBe(false);
  expect(myBattleship.hit()).toBe(4);
  expect(myBattleship.isSunk()).toBe(true);
});