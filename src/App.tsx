import React from "react"
import "./App.css"

const gridWidth = 25
const gridHeight = 15

const board: number[][] = Array(gridHeight)
  .fill(0)
  .map(() => new Array(gridWidth).fill(0))
console.log(board)

function getRandomArbitrary(min: number, max: number) {
  min = Math.floor(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

// let bombNumber = 40
const makeBombs = (bombsCount: number) => {
  const randomA = getRandomArbitrary(0, gridWidth)
  const randomB = getRandomArbitrary(0, gridHeight)

  if (bombsCount === 0) {
    return board
  } else if (board[randomB][randomA] === 0) {
    board[randomB][randomA] = 1
    makeBombs(bombsCount - 1)
  } else {
    makeBombs(bombsCount)
  }
}

makeBombs(40)

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
                      <div className={`cell cell${subItems}`} />
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App
