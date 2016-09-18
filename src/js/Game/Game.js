'use strict';

import EventEmitter from 'events';

import {
  config,
  defaults,
} from './config';

import GameState from './GameState';

export default class Game extends EventEmitter {
  constructor(options) {
    super();

    const onStateChanged = () => this.emit('stateChanged');

    this.on('newGame', newGameOptions => {
      this.setOptions(newGameOptions);
      this.state = new GameState(this).on('stateChanged', onStateChanged);
      this.emit('stateChanged');
    });

    this.emit('newGame', options);
  }

  setOptions(options = {}) {
    const {
      fieldSize = defaults.fieldSize,
      cellsForWin = defaults.cellsForWin,
    } = Object.assign({}, options);

    const { fieldSizeMin, fieldSizeMax } = config;

    this.options = {
      fieldSizeMin,
      fieldSizeMax,
      fieldSize: config.normalizeFieldSize(fieldSize),
      cellsForWin: config.normalizeCellsForWin(cellsForWin),
    };
  }
}
