import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { POST_NEW_GAME_BOARD } from '../../../config/end-points';
import { Cell } from '../../../model/Cell';
import { GameContainer } from '../../common/GameContainer';

const NewGame = () => {
  const location = useLocation();
  // @ts-ignore
  const { rows, columns, mines } = location.state;
  const [gameBoard, setGameBoard] = useState<Cell[][]>([]);
  const [remaininTime, setRemaininTime] = useState(0);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div>
        ...Loading
      </div>
    );
  }
  return (
    <GameContainer
      rows={rows}
      columns={columns}
      mines={mines}
      remaininTime={remaininTime}
      initialGameBoard={gameBoard}
    />
  );
};

export { NewGame };
