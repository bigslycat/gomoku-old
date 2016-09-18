'use strict';

import EventEmitter from 'events';

const owned = Symbol('owned');
const victorious = Symbol('victorious');

export default class Cell extends EventEmitter {
  constructor(gameState, index) {
    super();

    this[owned] = false;

    this.gameState = gameState;
    this.gameOptions = gameState.gameOptions;
    this.index = index;

    const { fieldSize } = this.gameOptions;

    this.coords = [
      index % fieldSize,
      Math.trunc(index / fieldSize),
    ];

    this.on('take', player => {
      this[owned] = player || gameState.currentPlayer;

      gameState.changePlayer();

      this.emit('stateChanged');
      this.disable();
    });

    this.on('win', winBuffer => {
      if (winBuffer.includes(this)) this[victorious] = true;
      this.disable();
    });
  }

  disable() {
    this.removeAllListeners('take');
    this.removeAllListeners('stateChanged');
  }

  get isVictorious() {
    return this[victorious];
  }

  get owner() {
    return this[owned];
  }

  get left() {
    const [x, y] = this.coords;
    return this.gameState.getCell(x - 1, y);
  }

  get upLeft() {
    const [x, y] = this.coords;
    return this.gameState.getCell(x - 1, y - 1);
  }

  get up() {
    const [x, y] = this.coords;
    return this.gameState.getCell(x, y - 1);
  }

  get upRight() {
    const [x, y] = this.coords;
    return this.gameState.getCell(x + 1, y - 1);
  }

  get right() {
    const [x, y] = this.coords;
    return this.gameState.getCell(x + 1, y);
  }

  get downRight() {
    const [x, y] = this.coords;
    return this.gameState.getCell(x + 1, y + 1);
  }

  get down() {
    const [x, y] = this.coords;
    return this.gameState.getCell(x, y + 1);
  }

  get downLeft() {
    const [x, y] = this.coords;
    return this.gameState.getCell(x - 1, y + 1);
  }
}
