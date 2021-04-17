package com.game.mines.entity;

import com.game.mines.enums.GameStatus;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

@Entity
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class Game {

  @Id
  @SequenceGenerator(name = "game_id_seq", sequenceName = "game_id_seq", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "game_id_seq")
  private Long id;

  @ManyToOne
  @JoinColumn(name = "userId", referencedColumnName = "id", insertable = false, updatable = false)
  private User user;

  private int remainingTime;
  @Enumerated(EnumType.ORDINAL)
  private GameStatus status;

  @Type(type = "jsonb")
  @Column(columnDefinition = "jsonb")
  private List<List<GameCell>> board;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public int getRemainingTime() {
    return remainingTime;
  }

  public void setRemainingTime(int remainingTime) {
    this.remainingTime = remainingTime;
  }

  public GameStatus getStatus() {
    return status;
  }

  public void setStatus(GameStatus status) {
    this.status = status;
  }

  public List<List<GameCell>> getBoard() {
    return board;
  }

  public void setBoard(List<List<GameCell>> board) {
    this.board = board;
  }
}
