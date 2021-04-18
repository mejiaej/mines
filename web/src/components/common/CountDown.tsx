import React, { useContext, useEffect, useState } from 'react';
import { GameStatusContext } from './GameStatusContext';

interface CountDownProps {
  remaininTime: number,
}

const CountDown = ({ remaininTime }: CountDownProps) => {
  const [seconds, setSeconds] = useState(remaininTime);
  const {
    isGameOver,
    hasPlayerWon,
    setGameOver,
  } = useContext(GameStatusContext);
  const isGameActive = () => !(isGameOver || hasPlayerWon);

  useEffect(() => {
    // countdown should only work when game is active
    if (isGameActive()) {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        setGameOver(true);
      }
    }
  });

  return (
    <div>
      <div>
        {`${new Date(seconds * 1000).toISOString().substr(14, 5)}`}
      </div>
    </div>
  );
};

export { CountDown };
