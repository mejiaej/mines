import React from 'react';
import { CountDown } from './CountDown';

interface GameHeaderProps {
  remainingTime: number,
}

const GameHeader = ({ remainingTime }: GameHeaderProps) => (
  <div className="game-header-container">
    <div className="flex justify-center margin-between-rows">
      <CountDown remaininTime={remainingTime} />
    </div>
    <div className="flex justify-evenly margin-between-rows">
      <button type="button">
        <span>&#128681;</span>
      </button>
      <button type="button">
        ?
      </button>
    </div>
  </div>
);

export { GameHeader };
