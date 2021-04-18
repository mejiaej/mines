import React from 'react';

interface BoardCellProps {
  row: number,
  column: number,
  value: number,
  revealed: boolean,
  handleCellClick: Function,
}

const BoardCell = ({
  revealed,
  value,
  row,
  column,
  handleCellClick,
}: BoardCellProps) => {
  let className = '';
  if (!revealed) {
    className = 'cell-hidden';
  }

  const handleClick = () => {
    if (!revealed) {
      handleCellClick(row, column);
    }
  };

  let content = '';
  if (revealed) {
    if (value < 0) {
      content = '*';
    } else if (value > 0) {
      content = value.toString();
    }
  }

  return (
    <td
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
