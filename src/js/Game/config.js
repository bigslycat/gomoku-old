'use strict';

export const defaults = {
  fieldSize: 10,
  cellsForWin: 5,
};

const normalize = (min, max, value) => Math.max(min, Math.min(value, max));

export const config = {
  fieldSizeMin: 8,
  fieldSizeMax: 15,

  normalizeFieldSize(fieldSize) {
    return normalize(this.fieldSizeMin, this.fieldSizeMax, fieldSize);
  },

  cellsForWinMin: 3,
  cellsForWinMax: 7,

  normalizeCellsForWin(cellsForWin) {
    return normalize(this.cellsForWinMin, this.cellsForWinMax, cellsForWin);
  },

  X: 1,
  O: 2,
};
