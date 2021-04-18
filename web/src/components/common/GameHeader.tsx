import React, { useContext } from 'react';
import { CountDown } from './CountDown';
import { GameStatusContext } from './GameStatusContext';

export interface GameHeaderProps {
  remainingTime: number,
  redFlag: boolean,
  questionMark: boolean,
  handleQuestionMarkClick: Function,
  handleRedFlagClick: Function,
  mines: number,
}

const GameHeader = ({
  remainingTime,
  redFlag,
  questionMark,
  handleQuestionMarkClick,
  handleRedFlagClick,
  mines,
}: GameHeaderProps) => {
  const { isGameOver, hasPlayerWon } = useContext(GameStatusContext);
  const isGameActive = () => !(isGameOver || hasPlayerWon);

  let redFlagClass = '';
  let questionMarkClass = '';

  if (redFlag) {
    redFlagClass = 'selected-button';
  }

  if (questionMark) {
    questionMarkClass = 'selected-button';
  }

  if (!isGameActive()) {
    redFlagClass = '';
    questionMarkClass = '';
  }

  const OnRedFlagClick = () => {
    if (isGameActive()) {
      handleRedFlagClick();
    }
  };

  const OnQuestionMarkClick = () => {
    if (isGameActive()) {
      handleQuestionMarkClick();
    }
  };

  return (
    <div className="game-header-container">
      <div className="header-countdown">
        <CountDown remaininTime={remainingTime} />
      </div>
      <div className="header-actions">
        {/* @ts-ignore */}
        <button className={`header-actions-button ${redFlagClass}`} type="button" onClick={OnRedFlagClick}>
          <span>&#128681;</span>
          {mines}
        </button>
        {/* @ts-ignore */}
        <button className={`header-actions-button ${questionMarkClass}`} type="button" onClick={OnQuestionMarkClick}>
          ?
        </button>
      </div>
    </div>
  );
};

export { GameHeader };
