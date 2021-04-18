import { createContext } from 'react';

export interface GameStatusContextType {
  isGameOver: boolean,
  setGameOver: Function,
  hasPlayerWon: boolean,
  setPlayerWon: Function,
}

const GameStatusContext = createContext<GameStatusContextType>({
  isGameOver: false,
  setGameOver: (gameOver: boolean) => {},
  hasPlayerWon: false,
  setPlayerWon: (hasPlayerWon: boolean) => {},
});

export { GameStatusContext };
