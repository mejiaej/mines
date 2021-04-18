import React, { useContext } from 'react';
import { GameStatusContext } from './GameStatusContext';

const GameFooter = () => {
  const {
    isGameOver,
    hasPlayerWon,
  } = useContext(GameStatusContext);

  let message = null;

  if (isGameOver) {
    message = <div>'You lost'</div>;
  }

  if (hasPlayerWon) {
    message = <div>'You Won'</div>;
  }

  return (
    <div>{message}</div>
  );
};

export { GameFooter };
