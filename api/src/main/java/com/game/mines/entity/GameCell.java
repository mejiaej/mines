package com.game.mines.entity;

import java.io.Serializable;

public class GameCell implements Serializable {

  private int value;
  private boolean revealed;

  public int getValue() {
    return value;
  }

  public void setValue(int value) {
    this.value = value;
  }

  public boolean isRevealed() {
    return revealed;
  }

  public void setRevealed(boolean revealed) {
    this.revealed = revealed;
  }
}
