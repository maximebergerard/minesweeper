import React from "react";
import "./App.css";

const gridWidth = 25;
const gridHeight = 15;

const board = Array(gridHeight)
  .fill(0)
  .map(() => new Array(gridWidth).fill(0));
console.log(board);

const App = () => {
  return (
    <div className="App">
      <table>
        <tbody>
          {board.map((items, index) => {
            return (
              <tr key={index}>
                {items.map((subItems, subIndex) => {
                  return (
                    <td key={subIndex}>
                      <div className="cell" />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
