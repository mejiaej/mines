import React from 'react';

interface BoardCellProps {
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
  let className = '';
  if (!revealed) {
    className = 'cell-hidden';
  }

  const handleClick = () => {
    handleCellClick(row, column);
  };

  let content;
  if (revealed) {
    if (value < 0) {
      content = '*';
    } else if (value > 0) {
      content = value.toString();
    }
  } else {
    if (redFlag) {
      content = <span>&#128681;</span>;
    }
    if (questionMark) {
      content = '?';
    }
  }

  return (
    <td
      onKeyDown={handleClick}
      className={className}
      onClick={handleClick}
      onContextMenu={() => console.log('click')}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
    >
      {content}
    </td>
  );
};

export { BoardCell };
