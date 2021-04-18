package com.game.mines;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.game.mines.config.Constants;
import com.game.mines.dto.NewGameDto;
import com.game.mines.entity.Game;
import com.game.mines.entity.GameCell;
import com.game.mines.enums.GameStatus;
import java.util.Collection;
import java.util.Random;
import java.util.stream.Collectors;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

// TODO: find a way to roll back inserts, default config not working
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT, classes = MinesApplication.class)
class GameControllerTest {
	@LocalServerPort
	private Integer port;

	@Autowired
	private TestRestTemplate testRestTemplate;

	@Test
	public void generateNewBoard() throws  Exception {
		NewGameDto newGameDto = new NewGameDto();
		newGameDto.setRows(10);
		newGameDto.setColumns(10);
		newGameDto.setMines(3);
		String url = "http://localhost:"+ port;
		Game game = testRestTemplate.postForObject(url + "/game/newBoard", newGameDto, Game.class);

		assertNotNull(game);
		assertEquals(game.getRemainingTime(), Constants.DEFAULT_GAME_TIME);
		assertEquals(game.getBoard().size(), newGameDto.getRows());
		assertEquals(game.getBoard().get(0).size(), newGameDto.getColumns());
		Long numberOfMines = game.getBoard().stream()
				.flatMap(Collection::stream)
				.collect(Collectors.toList())
				.stream().filter((cell) -> cell.getValue() < 0)
				.count();
		assertEquals(numberOfMines.intValue(), newGameDto.getMines());
	}

	@Test
	public void saveGame() throws Exception {
		NewGameDto newGameDto = new NewGameDto();
		newGameDto.setRows(10);
		newGameDto.setColumns(10);
		newGameDto.setMines(3);

		String url = "http://localhost:"+ port;
		Game game = testRestTemplate.postForObject(url + "/game/newBoard", newGameDto, Game.class);
		// modify data to be saved
		game.setUserId(1L);
		game.setRemainingTime(5);
		game.setStatus(GameStatus.MID_GAME);

		int randomRow = new Random().nextInt(newGameDto.getRows() + 1);
		int randomColumn = new Random().nextInt(newGameDto.getColumns() + 1);

		int revealedCells = 0;
		while (revealedCells <= 0) {
			try {
				GameCell cell = game.getBoard().get(randomRow).get(randomColumn);
				if (cell.getValue() >= 0) {
					cell.setRevealed(true);
					revealedCells++;
				}
			} catch (IndexOutOfBoundsException e) {
				continue;
			}
		}

		Game savedGame = testRestTemplate.postForObject(url + "/game", game, Game.class);
		assertNotNull(savedGame);
		assertEquals(savedGame.getBoard().get(randomRow).get(randomColumn).isRevealed(), true);
		assertEquals(savedGame.getRemainingTime(), game.getRemainingTime());
		assertEquals(savedGame.getStatus(), game.getStatus());
	}

	@Test
	public void getGameById() throws Exception {
		NewGameDto newGameDto = new NewGameDto();
		newGameDto.setRows(10);
		newGameDto.setColumns(10);
		newGameDto.setMines(3);

		String url = "http://localhost:"+ port;
		Game game = testRestTemplate.postForObject(url + "/game/newBoard", newGameDto, Game.class);
		// modify data to be saved
		game.setUserId(1L);
		game.setRemainingTime(5);
		game.setStatus(GameStatus.MID_GAME);

		int randomRow = new Random().nextInt(newGameDto.getRows() + 1);
		int randomColumn = new Random().nextInt(newGameDto.getColumns() + 1);

		int revealedCells = 0;
		while (revealedCells <= 0) {
			try {
				GameCell cell = game.getBoard().get(randomRow).get(randomColumn);
				if (cell.getValue() >= 0) {
					cell.setRevealed(true);
					revealedCells++;
				}
			} catch (IndexOutOfBoundsException e) {
				continue;
			}
		}

		Game savedGame = testRestTemplate.postForObject(url + "/game", game, Game.class);

		Game gameFromEndpoint = testRestTemplate.getForObject(url + "/game/"+savedGame.getId(), Game.class);
		assertNotNull(gameFromEndpoint);
		assertEquals(savedGame.getRemainingTime(), gameFromEndpoint.getRemainingTime());
		assertEquals(savedGame.getStatus(), gameFromEndpoint.getStatus());
		assertEquals(savedGame.getUserId(), gameFromEndpoint.getUserId());
		ObjectMapper objectMapper = new ObjectMapper();
		assertEquals(objectMapper.writeValueAsString(savedGame.getBoard()),
				objectMapper.writeValueAsString(gameFromEndpoint.getBoard()));
	}
}
