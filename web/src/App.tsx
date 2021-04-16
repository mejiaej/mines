import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BoardCell } from './components/BoardCell';

interface Cell {
  value: number,
  revealed: boolean,
}




const App = () => {
  const [gameBoard, setGameBoard] = useState<Cell[][]>([
    [ { value: 1, revealed: false }, { value: 1, revealed: false }, { value: 0, revealed: false }, { value: 0, revealed: false } ],
    [ { value: -1 , revealed: false}, { value: 1, revealed: false }, { value: 0, revealed: false }, { value: 0, revealed: false } ],
    [ { value: 1, revealed: false }, { value: 1, revealed: false }, { value: 0, revealed: false }, { value: 0, revealed: false } ],
    [ { value: 0, revealed: false }, { value: 0, revealed: false }, { value: 0, revealed: false }, { value: 0, revealed: false } ]
  ]);

  const handleCellClick = (row: number, column: number) => {
    const newGameBoard = revealAdjacents(row, column, gameBoard);
    setGameBoard(newGameBoard);
  }

  const revealAdjacents = (row: number, column: number, gameBoard: Cell[][]) => {
    let newGameBoard = [...gameBoard];
    const currentCell = newGameBoard[row][column];

    if(!currentCell.revealed) {
      const currentCellValue = currentCell.value;

      if(currentCellValue > 0) {
        currentCell.revealed = true;
      } else if (currentCellValue == 0) {
        currentCell.revealed = true;

        let topLeft       = existsCell(row-1, column-1) ? newGameBoard[row-1][column-1] : null;      // row-1|column-1
        let top           = existsCell(row-1, column) ? newGameBoard[row-1][column] : null;          // row-1|column
        let topRight      = existsCell(row-1, column+1) ? newGameBoard[row-1][column+1]: null;     // (row-1|column+1)
        let left          = existsCell(row, column-1) ? newGameBoard[row][column-1]: null;         // (column-1)
        let right         = existsCell(row, column+1) ? newGameBoard[row][column+1]: null;        // (column+1)
        let bottomLeft    = existsCell(row+1, column-1) ? newGameBoard[row+1][column-1]: null;   // (row+1|column-1)
        let bottom        = existsCell(row+1, column) ? newGameBoard[row+1][column]: null;       // (row+1)
        let bottomRight   = existsCell(row+1, column+1) ? newGameBoard[row+1][column+1]: null;  // (row+1|column+1)

        if (topLeft) {
          newGameBoard = revealAdjacents(row-1, column-1, newGameBoard);
        }
        if (top) {
          newGameBoard = revealAdjacents(row-1, column, newGameBoard);
        }
        if (topRight) {
          newGameBoard = revealAdjacents(row-1, column+1, newGameBoard);
        }
        if (left) {
          newGameBoard = revealAdjacents(row, column-1, newGameBoard);
        }
        if (right) {
          newGameBoard = revealAdjacents(row, column+1, newGameBoard);
        }
        if (bottomLeft) {
          newGameBoard = revealAdjacents(row+1, column-1, newGameBoard);
        }
        if (bottom) {
          newGameBoard = revealAdjacents(row+1, column, newGameBoard);
        }
        if (bottomRight) {
          newGameBoard = revealAdjacents(row+1, column+1, newGameBoard);
        }
        
      }
    }
    
    return newGameBoard;
  }

  const existsCell = (row: number, column: number) => {
    const maxRowIndex = gameBoard.length - 1;
    const maxColumnIndex = gameBoard[0].length - 1;
    if((row >= 0 && row <= maxRowIndex)
        && (column >= 0 && column <= maxColumnIndex)) {
      return true;
    }
    return false;
  };


   return (
    <div className="App">
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

export default App;
