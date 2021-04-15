import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BoardCell } from './components/BoardCell';

interface Cell {
  value: number | null,
  revealed: boolean,
}




const App = () => {
  const [gameBoard, setGameBoard] = useState<Cell[][]>([
    [ { value: null, revealed: false }, { value: 1, revealed: false }, { value: 1, revealed: false }, { value: null, revealed: false } ],
    [ { value: -1 , revealed: false}, { value: null, revealed: false }, { value: 1, revealed: false }, { value: 1, revealed: false } ],
    [ { value: null, revealed: false }, { value: null, revealed: false }, { value: null, revealed: false }, { value: null, revealed: false } ],
    [ { value: null, revealed: false }, { value: null, revealed: false }, { value: null, revealed: false }, { value: null, revealed: false } ]
  ]);

  return (
    <div className="App">
      <table>
        {gameBoard.map((row, row_index) => {
          return (
           <tr>
              {row.map((cell, y_index) => (
                <BoardCell
                  revealed={cell.revealed}
                  value={cell.value}
                  row={row_index}
                  column={y_index}
                />
                )
              )}
           </tr> 
          );
        })}
      </table>
    </div>
  );
}

export default App;
