import React from 'react';
import { Cell } from '../../model/Cell';
import { BoardCell } from './BoardCell';
import { GameHeader } from './GameHeader';

interface GameScreenProps {
  gameBoard: Cell[][],
  handleCellClick: Function,
  remainingTime: number,
  redFlag: boolean,
  questionMark: boolean,
  handleQuestionMarkClick: Function,
  handleRedFlagClick: Function,
  mines: number,
}

const GameScreen = ({
  gameBoard,
  handleCellClick,
  remainingTime,
  redFlag,
  handleRedFlagClick,
  questionMark,
  handleQuestionMarkClick,
  mines,
}: GameScreenProps) => (
  <div>
    <GameHeader
      remainingTime={remainingTime}
      redFlag={redFlag}
      questionMark={questionMark}
      handleRedFlagClick={handleRedFlagClick}
      handleQuestionMarkClick={handleQuestionMarkClick}
      mines={mines}
    />
    <div>
      <table>
        <tbody>
          {gameBoard.map((row, rowIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <BoardCell
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${rowIndex}-${columnIndex}`}
                  revealed={cell.revealed}
                  value={cell.value}
                  row={rowIndex}
                  column={columnIndex}
                  handleCellClick={handleCellClick}
                  redFlag={cell.redFlag}
                  questionMark={cell.questionMark}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export { GameScreen };
