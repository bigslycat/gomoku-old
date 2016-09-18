'use strict';

import EventEmitter from 'events';
import Cell from './Cell';
import Times from '../helpers/Times';

const currentPlayer = Symbol('currentPlayer');
const attackLines = Symbol('attackLines');
const directionsMap = Symbol('directionsMap');
const win = Symbol('win');
const winBuffer = Symbol('winBuffer');

export default class GameState extends EventEmitter {
  constructor(game) {
    super();

    this[currentPlayer] = 1;
    this[attackLines] = [];
    this[directionsMap] = null;
    this[winBuffer] = [];
    this[win] = false;

    this.game = game;
    this.gameOptions = game.options;

    const { fieldSize } = game.options;

    const createCell = index => new Cell(this, index).on(
      'stateChanged',
      () => {
        if (this.checkWin()) this.emit('win', this.win);
        this.emit('stateChanged', this.win);
      }
    );

    const countCells = Math.pow(fieldSize, 2);

    this.cells = new Times(createCell).repeat(countCells);

    this.on('win', () => this.cells.forEach(
      cell => cell.emit('win', this[winBuffer])
    ));
  }

  get win() {
    return this[win];
  }

  checkWin() {
    const buffer = this[winBuffer];

    const lines = Array.from(this.getAttackLines());

    lines.forEach(sourceLine => {
      buffer.length = 0;

      const line = Array.from(sourceLine);

      line.reduce((previousCell, currentCell) => {
        if (currentCell.owner && (
          !previousCell ||
          !previousCell.owner ||
          currentCell.owner === previousCell.owner
        )) {
          buffer.push(currentCell);

          if (buffer.length === this.gameOptions.cellsForWin) {
            this[win] = currentCell.owner;
            line.length = 0;
          }
        } else {
          buffer.length = 0;
        }

        return currentCell;
      }, false);

      if (this[win]) lines.length = 0;
    });

    return this[win];
  }

  get currentPlayer() {
    return this[currentPlayer];
  }

  changePlayer(player) {
    if (player) this[currentPlayer] = player;
    else if (this[currentPlayer] === 1) this[currentPlayer]++;
    else this[currentPlayer] = 1;

    return this[currentPlayer];
  }

  getDirectionsMap() {
    let map = this[directionsMap];

    if (map) return map;

    map = this[directionsMap] = new Map([[
      this.getCell(0, 0), [
        ['right', ['down', 'downRight', 'downLeft']],
        ['down', ['right']],
      ],
    ], [
      this.getCell(0, 1), [
        ['down', ['downRight']],
      ],
    ], [
      this.getCell(this.game.options.fieldSize - 1, 1), [
        ['down', ['downLeft']],
      ],
    ]]);

    return map;
  }

  getAttackLines() {
    const lines = this[attackLines];

    if (lines.length) return lines;

    this.getDirectionsMap().forEach((directions, cell) => {
      directions.forEach(direction => {
        const [
          startCellsDirection,
          attackLinesDirections,
        ] = direction;

        let lineStart = cell;

        const iterate = firstCell => {
          attackLinesDirections.forEach(attackLinesDirection => {
            const attackLine = [];

            let currentCell = firstCell;

            while (currentCell) {
              attackLine.push(currentCell);
              currentCell = currentCell[attackLinesDirection];
            }

            if (attackLine.length >= 5) lines.push(attackLine);
          });
        };

        while (lineStart) {
          iterate(lineStart);
          lineStart = lineStart[startCellsDirection];
        }
      });
    });

    return lines;
  }

  getIndexByCoords(x, y) {
    return this.coordsValidate(x, y)
      ? (y * this.game.options.fieldSize) + x
      : false;
  }

  coordsValidate(x, y) {
    return [x, y].every(
      coord => coord >= 0 && coord < this.game.options.fieldSize
    );
  }

  getCell(...coords) {
    switch (coords.length) {

      case 1: {
        return this.cells[coords[0]];
      }

      case 2: {
        const index = this.getIndexByCoords(...coords);
        if (typeof index === 'number') return this.cells[index];
      }

      // no default

    }

    return undefined;
  }
}
