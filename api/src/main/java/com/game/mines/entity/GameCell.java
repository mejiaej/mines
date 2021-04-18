package com.game.mines.entity;

import java.io.Serializable;

public class GameCell implements Serializable {

  private int value;
  private boolean revealed;
  private boolean redFlag;
  private boolean questionMark;

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

  public boolean isRedFlag() {
    return redFlag;
  }

  public void setRedFlag(boolean redFlag) {
    this.redFlag = redFlag;
  }

  public boolean isQuestionMark() {
    return questionMark;
  }

  public void setQuestionMark(boolean questionMark) {
    this.questionMark = questionMark;
  }
}
