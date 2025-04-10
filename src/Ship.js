export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  hit() {
    this.hits++;
    return this.hits;
  }

  isSunk() {
    if (this.hits === this.length) {
        return true;
    } else if (this.hits < this.length) {
        return false;
    } else {
        throw new Error("Invalid number of hits somehow...");
    }
  }
}