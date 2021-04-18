import React from 'react';
import { BoardCell } from './BoardCell';
import { Cell } from '../../../model/Cell';
import { GameHeader } from './GameHeader';

interface GameScreenProps {
  gameBoard: Cell[][],
  handleCellClick: Function,
}

const GameScreen = ({ gameBoard, handleCellClick }: GameScreenProps) => (
  <div>
    <GameHeader />
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
