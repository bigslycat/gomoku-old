'use strict';

import GameFieldCell from '../-FieldCell/Game-FieldCell';

const GameFieldCellsArray = ({
  cellSize,
  children: cells,
}) => (
  <div className="Game-FieldCellsArray">{ cells.map((cell, key) =>
    <GameFieldCell key={key} size={cellSize}>{ cell }</GameFieldCell>
  ) }</div>
);

GameFieldCellsArray.propTypes = {
  children: React.PropTypes.array.isRequired,
  cellSize: React.PropTypes.number.isRequired,
};

export default GameFieldCellsArray;
