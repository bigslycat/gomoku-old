'use strict';

import Times from './helpers/Times';
import Game from './Game';
import GameComponent from '../components/Game/Game';

function saveCell(cell, index) {
  localStorage.setItem(`cell.${index}`, cell.owner || 0);
}

function saveGameState(game) {
  const { fieldSize, cellsForWin } = game.options;
  const { cells, currentPlayer } = game.state;

  localStorage.setItem('fieldSize', fieldSize);
  localStorage.setItem('cellsForWin', cellsForWin);
  localStorage.setItem('currentPlayer', currentPlayer);
  cells.forEach(saveCell);
}

function applyGameState({
  game: { state: gameState },
  state: {
    currentPlayer,
    cells: savedCells,
  },
}) {
  const { cells: gameCells } = gameState;

  savedCells.forEach((owner, index) => {
    if (index < gameCells.length) gameCells[index].emit('take', owner);
  });

  if (gameCells.filter(cell => cell.owner).length) {
    gameState.changePlayer(currentPlayer);
  }
}

function getGameState() {
  const fieldSize = Number(localStorage.getItem('fieldSize'));
  const cellsForWin = Number(localStorage.getItem('cellsForWin'));
  const currentPlayer = Number(localStorage.getItem('currentPlayer'));

  if (!fieldSize) return false;

  const cells = [];

  new Times(index => {
    const cell = Number(localStorage.getItem(`cell.${index}`));
    if (cell) cells[index] = cell;
  }).repeat(Math.pow(fieldSize, 2));

  return {
    cells,
    currentPlayer,
    options: {
      fieldSize,
      cellsForWin,
    },
  };
}

function domReady() {
  const state = getGameState();
  const game = new Game(state.options);

  applyGameState({ game, state });
  saveGameState(game);

  const onNewGame = () => {
    const fieldSize = document.querySelector('.Game-FieldSizeInput').value;
    game.emit('newGame', { fieldSize });
    saveGameState(game);
  };

  game.on('stateChanged', () => {
    saveGameState(game);

    ReactDOM.render(
      <GameComponent onNewGame={onNewGame}>{game.state}</GameComponent>,
      document.querySelector('.App')
    );
  });

  game.emit('stateChanged');
}

__load_polyfills__()(() => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', domReady);
  } else domReady();
});
