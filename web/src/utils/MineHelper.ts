import _ from "lodash";
import { board1 } from "../components/board-examples";
import { Cell } from "../model/Cell";
import { GameDifficulty } from "../model/GameDifficulty";



const generateInitialGameBoard = (rowNumber: number, columnNumber: number, difficulty: GameDifficulty): Cell[][] => {
  const numberOfCells = rowNumber * columnNumber;
  const numberOfMines = Math.round(numberOfCells * difficulty);
  const initialGameBoard: Cell[][] = [];

  _.times(rowNumber, () => {
    const row: Cell[] = [];
    _.times(columnNumber, () => {
      const newCell: Cell = { value: 0, revealed: false };
      row.push(newCell);
    });
    initialGameBoard.push(row);
  });

  console.log('numberOfCells', numberOfCells);
  console.log('numberOfMines', numberOfMines);
  console.log('initialGameBoard', initialGameBoard);

  let currentMines = 0;
  while (currentMines < numberOfMines) {
    const randomRow = _.random(0, rowNumber);
    const randomColumn = _.random(0, columnNumber);
    if(cellExists(randomRow, randomColumn, rowNumber, columnNumber)) {
      const currentCell = initialGameBoard[randomRow][randomColumn];

      if(currentCell.value >= 0) {
        currentCell.value =
        currentCell.value = -1;
        
        let topLeft       = cellExists(randomRow-1, randomColumn-1, rowNumber, columnNumber) ? initialGameBoard[randomRow-1][randomColumn-1]  : null;
        let top           = cellExists(randomRow-1, randomColumn, rowNumber, columnNumber)   ? initialGameBoard[randomRow-1][randomColumn]    : null;
        let topRight      = cellExists(randomRow-1, randomColumn+1, rowNumber, columnNumber) ? initialGameBoard[randomRow-1][randomColumn+1]  : null;
        let left          = cellExists(randomRow, randomColumn-1, rowNumber, columnNumber)   ? initialGameBoard[randomRow][randomColumn-1]    : null;
        let right         = cellExists(randomRow, randomColumn+1, rowNumber, columnNumber)   ? initialGameBoard[randomRow][randomColumn+1]    : null;
        let bottomLeft    = cellExists(randomRow+1, randomColumn-1, rowNumber, columnNumber) ? initialGameBoard[randomRow+1][randomColumn-1]  : null;
        let bottom        = cellExists(randomRow+1, randomColumn, rowNumber, columnNumber)   ? initialGameBoard[randomRow+1][randomColumn]    : null;
        let bottomRight   = cellExists(randomRow+1, randomColumn+1, rowNumber, columnNumber) ? initialGameBoard[randomRow+1][randomColumn+1]  : null;

        if (topLeft && topLeft.value >= 0) {
          topLeft.value = topLeft.value + 1;
        }
        if (top && top.value >= 0) {
          top.value = top.value + 1;
        }
        if (topRight && topRight.value >= 0) {
          topRight.value = topRight.value + 1;
        }
        if (left && left.value >= 0) {
          left.value = left.value + 1;
        }
        if (right && right.value >= 0) {
          right.value = right.value + 1;
        }
        if (bottomLeft && bottomLeft.value >= 0) {
          bottomLeft.value = bottomLeft.value + 1;
        }
        if (bottom && bottom.value >= 0) {
          bottom.value = bottom.value + 1;
        }
        if (bottomRight && bottomRight.value >= 0) {
          bottomRight.value = bottomRight.value + 1;
        }

        currentMines++;
      } 
    }
  }

  return initialGameBoard;
}

const cellExists = (row: number, column: number, rowNumber: number, columnNumber: number) => {
  const maxRowIndex = rowNumber - 1;
  const maxColumnIndex = columnNumber - 1;

  if((row >= 0 && row <= maxRowIndex)
      && (column >= 0 && column <= maxColumnIndex)) {
    return true;
  }

  return false;
}

export { generateInitialGameBoard };

