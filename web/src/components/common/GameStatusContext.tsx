import { createContext } from 'react';

const GameStatusContext = createContext({
  isGameOver: false,
  setGameOver: (gameOver: boolean) => {},
  hasPlayerWon: false,
  setPlayerWon: (hasPlayerWon: boolean) => {},
});

export { GameStatusContext };
