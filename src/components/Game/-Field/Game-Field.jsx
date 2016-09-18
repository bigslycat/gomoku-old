'use strict';

import ContainerDimensions from 'react-container-dimensions';
import GameFieldCellsArray from '../-FieldCellsArray/Game-FieldCellsArray';

const GameField = ({
  fieldSize,
  children: cells,
}) => (
  <div className="Game-Field">
    <ContainerDimensions>{ ({ width }) => (
      <GameFieldCellsArray cellSize={width / fieldSize}>{
        cells
      }</GameFieldCellsArray>
    ) }</ContainerDimensions>
  </div>
);

GameField.propTypes = {
  children: React.PropTypes.array.isRequired,
  fieldSize: React.PropTypes.number.isRequired,
};

export default GameField;
