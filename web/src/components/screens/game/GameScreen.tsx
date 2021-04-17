import React, { useState } from 'react';
import { BoardCell } from './BoardCell';
import { Cell } from '../../../model/Cell';


interface GameScreenProps {
  gameBoard: Cell[][],
  handleCellClick: Function,
}

const GameScreen = ({ gameBoard, handleCellClick }: GameScreenProps) => {
   return (
    <div>
      <table>
        <tbody>
          {gameBoard.map((row, row_index) => {
            return (
            <tr>
                {row.map((cell, y_index) => (
                  <BoardCell
                    revealed={cell.revealed}
                    value={cell.value}
                    row={row_index}
                    column={y_index}
                    handleCellClick={handleCellClick}
                  />
                  )
                )}
            </tr> 
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export { GameScreen };
