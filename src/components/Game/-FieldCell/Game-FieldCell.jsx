'use strict';

import Button from '../../Button/Button';

const GameFieldCell = ({
  size,
  className,
  children: cell,
}) => {
  const fixSize = Number(size.toPrecision(1));

  const persentSize = (1 / cell.gameOptions.fieldSize) * 100;

  const events = {};

  if (!cell.owner && !cell.gameState.win) {
    events.onMouseEnter = ({ target }) => {
      target.innerHTML = cell.gameState.currentPlayer;
    };

    events.onMouseOut = ({ target }) => {
      target.innerHTML = '';
    };
  }

  return (
    <Button
      className={[{
        'Game-FieldCell': true,
        'Game-FieldCell--owned': cell.owner && !cell.isVictorious,
        'Game-FieldCell--victorious': cell.isVictorious,
        'Game-FieldCell--disabled': cell.owner || cell.gameState.win,
      }, className]}

      style={{
        width: `${persentSize}%`,
        height: `${persentSize}%`,
        lineHeight: `${fixSize}px`,
        fontSize: `${fixSize * 0.65}px`,
      }}

      onClick={() => cell.emit('take')}

      {...events}
    >
      {cell.owner || ''}
    </Button>
  );
};

GameFieldCell.propTypes = {
  className: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.string,
  ]),
  children: React.PropTypes.object.isRequired,
  size: React.PropTypes.number.isRequired,
};

export default GameFieldCell;
