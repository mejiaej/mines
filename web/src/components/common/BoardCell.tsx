import React, { useContext } from 'react';
import { GameStatusContext } from './GameStatusContext';

export interface BoardCellProps {
  row: number,
  column: number,
  value: number,
  revealed: boolean,
  handleCellClick: Function,
  redFlag: boolean,
  questionMark: boolean,
}

const BoardCell = ({
  revealed,
  value,
  row,
  column,
  handleCellClick,
  redFlag,
  questionMark,
}: BoardCellProps) => {
  const { isGameOver, hasPlayerWon } = useContext(GameStatusContext);
  const isGameActive = () => !(isGameOver || hasPlayerWon);

  let className = '';
  if (!revealed) {
    className = 'cell-hidden';
  }

  const handleClick = () => {
    if (isGameActive()) {
      handleCellClick(row, column);
    }
  };

  let content;
  // if (revealed) {
  if (value < 0) {
    content = '*';
  } else if (value > 0) {
    content = value.toString();
  }
  // } else {
  if (redFlag) {
    content = <span>&#128681;</span>;
  }
  if (questionMark) {
    content = '?';
  }
  // }

  // value needed for e2e testing
  let dataCy;
  if (process.env.NODE_ENV === 'development') {
    dataCy = `cell-${value < 0 ? 'mine' : 'not-a-mine'}`;
  }

  return (
    <td
      data-cy={dataCy}
      onKeyDown={handleClick}
      className={className}
      onClick={handleClick}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
    >
      {content}
    </td>
  );
};

export { BoardCell };
