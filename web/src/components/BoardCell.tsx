
interface BoardCellProps {
  row: number,
  column: number,
  value: number | null,
  revealed: boolean,
}


const BoardCell = ({ revealed, value }: BoardCellProps) => (
  <td>{`${revealed ? value : ''}`}</td>
);

export { BoardCell };
