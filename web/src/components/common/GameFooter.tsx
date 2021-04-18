import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HOME_PATH } from '../../config/paths';
import { GameStatusContext } from './GameStatusContext';

const PlayAgainButton = () => (
  <Link to={HOME_PATH}>
    Play again
  </Link>
);

const GameFooter = () => {
  const {
    isGameOver,
    hasPlayerWon,
  } = useContext(GameStatusContext);

  let message = null;
  let playAgainLink = null;

  if (isGameOver) {
    message = <div>You lost</div>;
  }

  if (hasPlayerWon) {
    message = <div>You Won</div>;
  }

  if (isGameOver || hasPlayerWon) {
    playAgainLink = <PlayAgainButton />;
  }

  return (
    <div className="game-footer-container">
      {message}
      {playAgainLink}
    </div>
  );
};

export { GameFooter, PlayAgainButton };
