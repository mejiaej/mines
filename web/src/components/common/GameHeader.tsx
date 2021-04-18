import React from 'react';
import { CountDown } from './CountDown';

interface GameHeaderProps {
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
  let redFlagClass = '';
  let questionMarkClass = '';

  if (redFlag) {
    redFlagClass = 'selected-button';
  }

  if (questionMark) {
    questionMarkClass = 'selected-button';
  }

  return (
    <div className="game-header-container">
      <div className="flex justify-center margin-between-rows">
        <CountDown remaininTime={remainingTime} />
      </div>
      <div className="flex justify-evenly margin-between-rows">
        {/* @ts-ignore */}
        <button className={redFlagClass} type="button" onClick={handleRedFlagClick}>
          <span>&#128681;</span>
          {mines}
        </button>
        {/* @ts-ignore */}
        <button className={questionMarkClass} type="button" onClick={handleQuestionMarkClick}>
          ?
        </button>
      </div>
    </div>
  );
};
export { GameHeader };
