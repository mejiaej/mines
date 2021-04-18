import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { POST_NEW_GAME_BOARD } from '../../../config/end-points';
import { Cell } from '../../../model/Cell';
import { GameScreen } from './GameScreen';

const GameContainer = () => {
  const [gameBoard, setGameBoard] = useState<Cell[][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { board } } = await axios.post(POST_NEW_GAME_BOARD,
        {
          rows: 10,
          columns: 10,
          mines: 10,
        });
      setGameBoard(board);
    };

    fetchData();
  }, []);

  const handleCellClick = (row: number, column: number) => {
    try {
      const newGameBoard = revealAdjacents(row, column, gameBoard);
      setGameBoard(newGameBoard);
    } catch (error) {
      revealMines();
      alert(error.message);
      // TODO: use react context to indicate that the game is over
    }
  };

  const revealAdjacents = (
    row: number,
    column: number,
    board: Cell[][],
  ) => {
    let newGameBoard = [...board];
    const currentCell = newGameBoard[row][column];

    // if recursion returns to a visited cell stop evaluating in that direction
    if (!currentCell.revealed) {
      const currentCellValue = currentCell.value;

      if (currentCellValue < 0) {
        // cell contains a mine
        newGameBoard[row][column].revealed = true;
        throw Error('Game Over');
        // TODO: reveal all the mines in the gameboard
      } else if (currentCellValue > 0) {
        // if cell value > 0 = mine adjacent, stop evaluating in that direction
        currentCell.revealed = true;
      } else if (currentCellValue === 0) {
        // continue evaluating only if cell has no mines in or adjacents
        currentCell.revealed = true;

        const topLeft = getCell(row - 1, column - 1); // row-1|column-1
        const top = getCell(row - 1, column); // row-1|column
        const topRight = getCell(row - 1, column + 1); // (row-1|column+1)
        const left = getCell(row, column - 1); // (column-1)
        const right = getCell(row, column + 1); // (column+1)
        const bottomLeft = getCell(row + 1, column - 1); // (row+1|column-1)
        const bottom = getCell(row + 1, column); // (row+1)
        const bottomRight = getCell(row + 1, column + 1); // (row+1|column+1)

        if (topLeft) {
          newGameBoard = revealAdjacents(row - 1, column - 1, newGameBoard);
        }
        if (top) {
          newGameBoard = revealAdjacents(row - 1, column, newGameBoard);
        }
        if (topRight) {
          newGameBoard = revealAdjacents(row - 1, column + 1, newGameBoard);
        }
        if (left) {
          newGameBoard = revealAdjacents(row, column - 1, newGameBoard);
        }
        if (right) {
          newGameBoard = revealAdjacents(row, column + 1, newGameBoard);
        }
        if (bottomLeft) {
          newGameBoard = revealAdjacents(row + 1, column - 1, newGameBoard);
        }
        if (bottom) {
          newGameBoard = revealAdjacents(row + 1, column, newGameBoard);
        }
        if (bottomRight) {
          newGameBoard = revealAdjacents(row + 1, column + 1, newGameBoard);
        }
      }
    }

    return newGameBoard;
  };

  const revealMines = () => {
    const newGameBoard = [...gameBoard];
    newGameBoard.forEach((row) => {
      row.forEach((cell) => {
        if (!cell.revealed && cell.value < 0) {
          cell.revealed = true;
        }
      });
    });

    setGameBoard(newGameBoard);
  };

  // return cell if exists, null otherwise
  const getCell = (row: number, column: number) => {
    const maxRowIndex = gameBoard.length - 1;
    const maxColumnIndex = gameBoard[0].length - 1;

    if ((row >= 0 && row <= maxRowIndex)
        && (column >= 0 && column <= maxColumnIndex)) {
      return gameBoard[row][column];
    }

    return null;
  };

  return (
    <GameScreen
      gameBoard={gameBoard}
      handleCellClick={handleCellClick}
    />
  );
};

export { GameContainer };
