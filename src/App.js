import React from 'react'
import './App.css';

const gridLength = 10

const board = Array(gridLength).fill(0).map(() => new Array(gridLength).fill(1))

const App = () => {
  return (
    <div className="App">
      <table>
        {board.map((items, index) => {
          return (
            <tr key={index}>
              {items.map((subItems, subIndex) => {
                return <td key={subIndex}><div className="cell" /></td>
              })}
            </tr>
          )
        })}
      </table>
    </div>
  );
}

export default App;
