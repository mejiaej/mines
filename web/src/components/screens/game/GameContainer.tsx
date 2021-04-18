import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { POST_NEW_GAME_BOARD } from '../../../config/end-points';
import { Cell } from '../../../model/Cell';
import { GameScreen } from './GameScreen';

const GameContainer = () => {
  const location = useLocation();
  // @ts-ignore
  const { rows, columns, mines } = location.state;
  const [gameBoard, setGameBoard] = useState<Cell[][]>([]);
  const [remaininTime, setRemaininTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [redFlagButtonOn, setRedFlagButtonOn] = useState(false);
  const [questionMarkButtonOn, setQuestionMarkButtonOn] = useState(false);
  const [redFlagNumber, setredFlagNumber] = useState<number>(mines);
  const [revealedCells, setRevealedCells] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.post(POST_NEW_GAME_BOARD,
        {
          rows,
          columns,
          mines,
        });
      setGameBoard(data.board);
      setRemaininTime(data.remainingTime);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleCellClick = (row: number, column: number) => {
    // if any action button active, flag cell
    if (redFlagButtonOn || questionMarkButtonOn) {
      flagCell(row, column);
    // If click on a cell without
    } else {
      try {
        const newGameBoard = revealAdjacents(row, column, gameBoard);
        setGameBoard(newGameBoard);
      } catch (error) {
        revealMines();
        alert(error.message);
      }
    }
  };

  const revealAdjacents = (
    row: number,
    column: number,
    board: Cell[][],
  ) => {
    let newGameBoard = [...board];
    const currentCell = newGameBoard[row][column];

    // if cell revealed || redFlag || questionMark  stop recursion in that direction
    if (!currentCell.revealed
        && !currentCell.redFlag
        && !currentCell.questionMark) {
      const currentCellValue = currentCell.value;

      if (currentCellValue < 0) {
        // cell contains a mine
        currentCell.revealed = true;
        throw Error('Game Over');
      } else if (currentCellValue > 0) {
        // if cell value > 0 = mine adjacent, stop evaluating in that direction
        currentCell.revealed = true;
        setRevealedCells((prevRevealedCells) => prevRevealedCells + 1);
      } else if (currentCellValue === 0) {
        // continue evaluating only if cell has no mines in or adjacents
        currentCell.revealed = true;
        setRevealedCells((prevRevealedCells) => prevRevealedCells + 1);

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

  const handleRedFlagClick = () => {
    if (questionMarkButtonOn) {
      setQuestionMarkButtonOn(false);
    }
    setRedFlagButtonOn((prevState) => !prevState);
  };

  const handleQuestionMarkClick = () => {
    if (redFlagButtonOn) {
      setRedFlagButtonOn(false);
    }
    setQuestionMarkButtonOn((prevState) => !prevState);
  };

  const flagCell = (row: number, column: number) => {
    const newGameBoard = [...gameBoard];
    const currentCell = newGameBoard[row][column];
    if (!currentCell.revealed) {
      if (redFlagButtonOn) {
        currentCell.questionMark = false;
        if (currentCell.redFlag) {
          currentCell.redFlag = false;
          setredFlagNumber((prevFlagNumber) => prevFlagNumber + 1);
        } else if (redFlagNumber > 0) {
          currentCell.redFlag = true;
          setredFlagNumber((prevFlagNumber) => prevFlagNumber - 1);
        }
      } else if (questionMarkButtonOn) {
        if (currentCell.redFlag) {
          currentCell.redFlag = false;
          setredFlagNumber((prevFlagNumber) => prevFlagNumber + 1);
        }
        currentCell.questionMark = !currentCell.questionMark;
      }
    }
    setGameBoard(newGameBoard);
  };

  let winMessage;
  const cellsWithoutMines = (rows * columns) - mines;
  if (revealedCells === cellsWithoutMines && redFlagNumber === 0) {
    winMessage = <div>'You won'</div>;
  }

  if (loading) {
    return (
      <div>
        ...Loading
      </div>
    );
  }
  return (
    <>
      <GameScreen
        gameBoard={gameBoard}
        handleCellClick={handleCellClick}
        remainingTime={remaininTime}
        redFlag={redFlagButtonOn}
        questionMark={questionMarkButtonOn}
        handleRedFlagClick={handleRedFlagClick}
        handleQuestionMarkClick={handleQuestionMarkClick}
        mines={redFlagNumber}
      />
      {winMessage}
    </>
  );
};

export { GameContainer };
