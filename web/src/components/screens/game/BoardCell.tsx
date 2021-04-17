interface BoardCellProps {
  row: number,
  column: number,
  value: number,
  revealed: boolean,
  handleCellClick: Function,
}


const BoardCell = ({ revealed, value, row, column, handleCellClick }: BoardCellProps) => {
  let className = '';
  if (!revealed) {
    className = 'cell-hidden';
  }

  const handleClick = () => {
    if(!revealed) {
      handleCellClick(row, column);
    }
  }

  let content = '';
  //if(revealed) {
    if (value < 0) {
      content = '*'
    } else if(value > 0) {
      content = value.toString();
    }
  //}

  return (
    <td className={className} onClick={handleClick}>
      {content}
    </td>
  )
}

export { BoardCell };
