'use strict';

import Button from '../../Button/Button';

const GameFieldCell = ({ children: cell, size }) => {
  const fixSize = Number(size.toPrecision(1));

  const persentSize = (1 / cell.gameOptions.fieldSize) * 100;

  const buttonProps = {
    onClick: () => cell.emit('take'),
    classes: ['Game-FieldCell'],
    style: {
      width: `${persentSize}%`,
      height: `${persentSize}%`,
      lineHeight: `${fixSize}px`,
      fontSize: `${fixSize * 0.65}px`,
    },
  };

  if (!cell.owner && !cell.gameState.win) {
    buttonProps.onMouseEnter = ({ target }) => {
      target.innerHTML = cell.gameState.currentPlayer;
    };

    buttonProps.onMouseOut = ({ target }) => {
      target.innerHTML = '';
    };
  } else if (!cell.isVictorious) {
    buttonProps.classes.push('Game-FieldCell--owned');
  } else {
    buttonProps.classes.push('Game-FieldCell--victorious');
  }

  return (
    <Button {...buttonProps}>{
      cell.owner ? String(cell.owner) : ''
    }</Button>
  );
};

GameFieldCell.propTypes = {
  children: React.PropTypes.object.isRequired,
  size: React.PropTypes.number.isRequired,
};

export default GameFieldCell;
