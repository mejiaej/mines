package com.game.mines.service;

import com.game.mines.dto.NewGameDto;
import com.game.mines.entity.Game;
import com.game.mines.entity.GameCell;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;
import org.springframework.stereotype.Service;

@Service
public class GameService {

  public Game generateNewGameBoard(NewGameDto newGameDto) {
    List<List<GameCell>> gameBoard = new ArrayList();

    // generate initial empty board
    IntStream.rangeClosed(0, newGameDto.getRows() - 1).forEach((rowIndex) -> {
      List<GameCell> row = new ArrayList();
      IntStream.rangeClosed(0, newGameDto.getColumns() - 1).forEach((columnIndex) -> {
        GameCell gameCell = new GameCell();
        gameCell.setValue(0);
        gameCell.setRevealed(false);
        row.add(gameCell);
      });
      gameBoard.add(row);
    });

    int currentMines = 0;
    while (currentMines < newGameDto.getMines()) {
      // find a random cell to set up a mine
      int randomRow = new Random().nextInt(newGameDto.getRows() + 1);
      int randomColumn = new Random().nextInt(newGameDto.getColumns() + 1);

      if(existsCell(randomRow, randomColumn, gameBoard)) {
        GameCell currentCell = gameBoard.get(randomRow).get(randomColumn);

        // set up mine only if cell does not have a mine already
        // value = 0, empty
        // value = -1, mine
        // value > 0, # of mines around
        if(currentCell.getValue() >= 0) {
          currentCell.setValue(-1);

          // add +1 to cells around mines
          setNumberOfMinesaround(randomRow-1, randomColumn-1, gameBoard);
          setNumberOfMinesaround(randomRow-1, randomColumn, gameBoard);
          setNumberOfMinesaround(randomRow-1, randomColumn+1, gameBoard);
          setNumberOfMinesaround(randomRow, randomColumn-1, gameBoard);
          setNumberOfMinesaround(randomRow, randomColumn+1, gameBoard);
          setNumberOfMinesaround(randomRow+1, randomColumn-1, gameBoard);
          setNumberOfMinesaround(randomRow+1, randomColumn, gameBoard);
          setNumberOfMinesaround(randomRow+1, randomColumn+1, gameBoard);

          /*GameCell topLeft       = existsCell(randomRow-1, randomColumn-1, gameBoard) ? gameBoard.get(randomRow-1).get(randomColumn-1)  : null;
          GameCell top           = existsCell(randomRow-1, randomColumn, gameBoard)           ? gameBoard.get(randomRow-1).get(randomColumn)    : null;
          GameCell topRight      = existsCell(randomRow-1, randomColumn+1, gameBoard) ? gameBoard.get(randomRow-1).get(randomColumn+1)  : null;
          GameCell left          = existsCell(randomRow, randomColumn-1, gameBoard)   ? gameBoard.get(randomRow).get(randomColumn-1)    : null;
          GameCell right         = existsCell(randomRow, randomColumn+1, gameBoard)   ? gameBoard.get(randomRow).get(randomColumn+1)    : null;
          GameCell bottomLeft    = existsCell(randomRow+1, randomColumn-1, gameBoard) ? gameBoard.get(randomRow+1).get(randomColumn-1)  : null;
          GameCell bottom        = existsCell(randomRow+1, randomColumn, gameBoard)           ? gameBoard.get(randomRow+1).get(randomColumn)    : null;
          GameCell bottomRight   = existsCell(randomRow+1, randomColumn+1, gameBoard) ? gameBoard.get(randomRow+1).get(randomColumn+1)  : null;

          if (topLeft != null && topLeft.getValue() >= 0) {
            topLeft.setValue(topLeft.getValue() + 1);
          }
          if (top != null && top.getValue() >= 0) {
            top.setValue(top.getValue() + 1);
          }
          if (topRight != null && topRight.getValue() >= 0) {
            topRight.setValue(topRight.getValue() + 1);
          }
          if (left != null && left.getValue() >= 0) {
            left.setValue(left.getValue() + 1);
          }
          if (right != null && right.getValue() >= 0) {
            right.setValue(right.getValue() + 1);
          }
          if (bottomLeft != null && bottomLeft.getValue() >= 0) {
            bottomLeft.setValue(bottomLeft.getValue() + 1);
          }
          if (bottom != null && bottom.getValue() >= 0) {
            bottom.setValue(bottom.getValue() + 1);
          }
          if (bottomRight != null && bottomRight.getValue() >= 0) {
            bottomRight.setValue(bottomRight.getValue() + 1);
          } */
          currentMines++;
        }
      }
    }

    Game newGame = new Game();
    newGame.setBoard(gameBoard);
    return newGame;
  }

  private boolean existsCell(int row, int column, List<List<GameCell>> gameBoard) {
    try {
      gameBoard.get(row).get(column);
      return  true;
    } catch (IndexOutOfBoundsException e) {
      return false;
    }
  }

  private void setNumberOfMinesaround(int row, int column, List<List<GameCell>> gameBoard) {
    try {
      GameCell cell = gameBoard.get(row).get(column);
      if (cell.getValue() >= 0) {
        cell.setValue(cell.getValue() + 1);
      }
    } catch (IndexOutOfBoundsException e) {
    }
  }
}
