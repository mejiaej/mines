interface BoardCellProps {
  row: number,
  column: number,
  value: number | null,
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

  return (
    <td className={className} onClick={handleClick}>
      {`${revealed && value != null ? value : ''}`}
    </td>
  )
}

export { BoardCell };
