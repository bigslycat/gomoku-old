'use strict';

import GameField from './-Field/Game-Field';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Label from '../Label/Label';

const Game = ({
  onNewGame,
  children: {
    cells,
    gameOptions: {
      fieldSize,
      fieldSizeMin,
      fieldSizeMax,
    },
  },
}) => {
  const game = [

    <Label
      key="1"
      classes={['Game-FieldSizeLabel']}
      htmlFor="Game-FieldSize"
    >Размер поля</Label>,

    <Input
      key="2"
      type="number"
      defaultValue={fieldSize}
      min={fieldSizeMin}
      max={fieldSizeMax}
      classes={['Game-FieldSizeInput']}
      id="Game-FieldSize"
      title={
        `Размер игрового поля (от ${fieldSizeMin} до ${fieldSizeMax} ячеек)`
      }
    />,

    <Button
      key="3"
      onClick={onNewGame}
      classes={['Game-RestartButton']}
    >Новая игра</Button>,

    <GameField
      key="4"
      fieldSize={fieldSize}
    >{cells}</GameField>,

  ];

  return <div className="Game">{game}</div>;
};

Game.propTypes = {
  children: React.PropTypes.object.isRequired,
  onNewGame: React.PropTypes.func.isRequired,
};

export default Game;
