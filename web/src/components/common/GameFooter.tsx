import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HOME_PATH } from '../../config/paths';
import { GameStatusContext } from './GameStatusContext';

const GameFooter = () => {
  const {
    isGameOver,
    hasPlayerWon,
  } = useContext(GameStatusContext);

  let message = null;
  let playAgainLink = null;

  if (isGameOver) {
    message = <div>'You lost'</div>;
  }

  if (hasPlayerWon) {
    message = <div>'You Won'</div>;
  }

  if (isGameOver || hasPlayerWon) {
    playAgainLink = (
      <Link to={{
        pathname: HOME_PATH,
      }}
      >
        Play again
      </Link>
    );
  }

  return (
    <div className="game-footer-container">
      <div>{message}</div>
      <div>
        {playAgainLink}
      </div>
    </div>
  );
};

export { GameFooter };
