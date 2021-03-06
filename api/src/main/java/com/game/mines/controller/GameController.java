package com.game.mines.controller;

import com.game.mines.dto.NewGameDto;
import com.game.mines.entity.Game;
import com.game.mines.repository.GameRepository;
import com.game.mines.service.GameService;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {

  @Autowired
  private GameRepository gameRepository;

  @Autowired
  private GameService gameService;

  @GetMapping("/game/{id}")
  public Game getGameById(@PathVariable Long id) {
    return gameRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(id.toString()));
  }

  @PostMapping("/game/newBoard")
  public Game generateNewGame(@RequestBody NewGameDto newGameDto) {
    return gameService.generateNewGameBoard(newGameDto);
  }

  @PostMapping("/game")
  public Game generateNewGame(@RequestBody Game game) {
    return gameRepository.save(game);
  }
}
