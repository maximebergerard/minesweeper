import React, { useState } from "react"
import Cell from "./components/Cell/Cell"
import "./App.css"

const gridWidth = 6
const gridHeight = 4

type Grid = {
  type: CellType
  flag: boolean
}

enum CellType {
  Cell = 0,
  Bomb = 1,
}

function getRandomArbitrary(min: number, max: number) {
  min = Math.floor(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

const App = () => {
  const [grid, setGrid] = useState(
    Array(gridHeight)
      .fill(0)
      .map(() =>
        new Array(gridWidth).fill(0).map(() => {
          return {
            type: CellType.Cell,
            flag: false,
          }
        }),
      ),
  )

  const [firstClick, setFirstClick] = useState(false)

  const generateBombs = (bombsCount: number, grid: Grid[][]) => {
    // picking a random cell on the grid
    const randomA = getRandomArbitrary(0, gridWidth)
    const randomB = getRandomArbitrary(0, gridHeight)

    if (bombsCount === 0) {
      return grid
    } else if (grid[randomB][randomA].type === CellType.Cell) {
      const newGrid = grid
      newGrid[randomB][randomA].type = CellType.Bomb
      setGrid(newGrid)
      generateBombs(bombsCount - 1, grid)
    } else {
      generateBombs(bombsCount, grid)
    }
  }

  const handleClick = React.useCallback(
    (
      event: React.MouseEvent<HTMLElement>,
      subItems: number,
      indexHeight: number,
      indexWidth: number,
    ) => {
      // prevent context menu from opening on right-click
      event.preventDefault()

      // handle firstCLick
      if (!firstClick) {
        setFirstClick(true)
        generateBombs(3, grid)
      }

      let message
      // synthetic event
      if (event.type === "click" && subItems === 0) {
        message = `Clearing cell`
      } else if (event.type === "click" && subItems === 1) {
        message = `Boum`
      } else {
        const newGrid = grid
        newGrid[indexHeight][indexWidth].flag =
          !newGrid[indexHeight][indexWidth].flag
        message = `Putting a flag`
      }

      if (message) {
        console.log(`Click detected:\n${message}\n`)
      }
      console.log(grid)
    },
    [],
  )

  return (
    <div className="App">
      <h1>Still in game</h1>
      <table>
        <tbody>
          {grid.map((rows, indexHeight) => {
            return (
              <tr key={indexHeight}>
                {rows.map((cell, indexWidth) => {
                  return (
                    <Cell
                      key={indexWidth}
                      cellType={cell.type}
                      onClick={(e) =>
                        handleClick(e, cell.type, indexHeight, indexWidth)
                      }
                      onContextMenu={(e) =>
                        handleClick(e, cell.type, indexHeight, indexWidth)
                      }
                    />
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
