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
          setNumberOfMinesAround(randomRow-1, randomColumn-1, gameBoard); // topLeft
          setNumberOfMinesAround(randomRow-1, randomColumn, gameBoard); //top
          setNumberOfMinesAround(randomRow-1, randomColumn+1, gameBoard); // topRight
          setNumberOfMinesAround(randomRow, randomColumn-1, gameBoard); // left
          setNumberOfMinesAround(randomRow, randomColumn+1, gameBoard); // right
          setNumberOfMinesAround(randomRow+1, randomColumn-1, gameBoard); // bottomLeft
          setNumberOfMinesAround(randomRow+1, randomColumn, gameBoard); // bottom
          setNumberOfMinesAround(randomRow+1, randomColumn+1, gameBoard); // bottomRight

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

  private void setNumberOfMinesAround(int row, int column, List<List<GameCell>> gameBoard) {
    try {
      GameCell cell = gameBoard.get(row).get(column);
      if (cell.getValue() >= 0) {
        cell.setValue(cell.getValue() + 1);
      }
    } catch (IndexOutOfBoundsException e) {
    }
  }
}
