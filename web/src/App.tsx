import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BoardCell } from './components/BoardCell';
import { board1, board2 } from './components/board-examples';

interface Cell {
  value: number,
  revealed: boolean,
}




const App = () => {
  const [gameBoard, setGameBoard] = useState<Cell[][]>(board2);

  const handleCellClick = (row: number, column: number) => {
    const newGameBoard = revealAdjacents(row, column, gameBoard);
    setGameBoard(newGameBoard);
  }

  const revealAdjacents = (row: number, column: number, gameBoard: Cell[][]) => {
    let newGameBoard = [...gameBoard];
    const currentCell = newGameBoard[row][column];

    // if recursion returns to a visited cell just avoid evaluating it
    if(!currentCell.revealed) {
      const currentCellValue = currentCell.value;

      if(currentCellValue < 0) {
        // cell contains a mine
        newGameBoard[row][column].revealed = true;
        console.log('GAME OVER');
        // TODO: reveal all the mines in the gameboard
      } else {
        // if cell value > 0 = mine adjacent, stop evaluating in that direction
        if(currentCellValue > 0) {
          currentCell.revealed = true;
        } else if (currentCellValue == 0) {
          // continue evaluating only if cell has no mines in it or adjacents to it  
          currentCell.revealed = true;

          let topLeft       = getCell(row-1, column-1)  // row-1|column-1
          let top           = getCell(row-1, column)    // row-1|column
          let topRight      = getCell(row-1, column+1)  // (row-1|column+1)
          let left          = getCell(row, column-1)    // (column-1)
          let right         = getCell(row, column+1)    // (column+1)
          let bottomLeft    = getCell(row+1, column-1)  // (row+1|column-1)
          let bottom        = getCell(row+1, column)    // (row+1)
          let bottomRight   = getCell(row+1, column+1)  // (row+1|column+1)

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
    }
    
    return newGameBoard;
  }

  // return cell if exists, null otherwise
  const getCell = (row: number, column: number) => {
    const maxRowIndex = gameBoard.length - 1;
    const maxColumnIndex = gameBoard[0].length - 1;

    if((row >= 0 && row <= maxRowIndex)
        && (column >= 0 && column <= maxColumnIndex)) {
      return gameBoard[row][column];
    }

    return null;
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
