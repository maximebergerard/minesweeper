import React, { useState } from "react"
import Cell from "./components/Cell/Cell"
import "./App.css"

const gridWidth = 3
const gridHeight = 3

export type CellDetails = {
  type: CellType
  flag: boolean
  clicked: boolean
}

enum CellType {
  Cell = 0,
  Bomb = 1,
}

export function getRandomArbitrary(min: number, max: number) {
  min = Math.floor(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

function listToMatrix(list: number[], elementsPerSubArray: number) {
  const matrix: number[][] = []

  for (let i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++
      matrix[k] = []
    }

    matrix[k].push(list[i])
  }

  return matrix
}

// function generateBombs(
//   bombsCount: number,
//   grid: CellDetails[][],
// ): CellDetails[][] {
//   // picking a random cell on the grid
//   const randomA = getRandomArbitrary(0, gridWidth)
//   const randomB = getRandomArbitrary(0, gridHeight)
//   console.log("generateBombs")

//   if (bombsCount === 0) {
//     return grid
//   } else if (grid[randomB][randomA].type === CellType.Cell) {
//     grid[randomB][randomA].type = CellType.Bomb
//     generateBombs(bombsCount - 1, grid)
//   } else {
//     generateBombs(bombsCount, grid)
//   }

//   return grid
// }

const arr = [...Array(gridWidth * gridHeight).fill(0)]
const arrRemover = [...Array(gridWidth * gridHeight).keys()]

function generateBombs(bombsCount: number): CellDetails[][] {
  const randomA = getRandomArbitrary(0, gridWidth * gridHeight)

  if (bombsCount === 0) {
    console.log(arrRemover, "arrRemover")
    console.log(arr, "arr")

    const arrWithBombs = arr.map((item, index) => {
      if (!arrRemover.includes(index)) {
        console.log(index, "index")
        return 1
      } else return item
    })

    console.log(arrWithBombs, "arrWithBombs")

    console.log(listToMatrix(arrWithBombs, gridWidth), "matrixwithBombs")
    return listToMatrix(arrWithBombs, gridWidth)
  } else {
    arrRemover.splice(randomA, 1)
    generateBombs(bombsCount - 1)
  }
}

generateBombs(2)

// de 1 à 35 et pick un nombre sur cette range

const App = () => {
  const [grid, setGrid] = useState(
    new Array(gridHeight).fill(0).map(() =>
      new Array(gridWidth).fill(0).map(() => {
        return {
          type: CellType.Cell,
          flag: false,
          clicked: false,
        }
      }),
    ),
  )

  console.log(grid)

  const [firstClick, setFirstClick] = useState(false)

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    cell: CellDetails,
    indexHeight: number,
    indexWidth: number,
  ) => {
    // prevent context menu from opening on right-click
    event.preventDefault()

    let message
    const newGrid = [...grid]

    // handle firstCLick
    if (event.type === "click") {
      if (!firstClick) {
        setGrid(generateBombs(3, newGrid))
        setFirstClick(true)
      }
      // setFirstClick((current) => {
      //   if (current === false) {
      //     setGrid(generateBombs(3, newGrid))
      //   }
      //   return true
      // })
    }

    // synthetic event
    if (event.type === "click" && cell.type === CellType.Cell && cell.flag) {
      message = `Click on flag + normal`
    } else if (event.type === "click" && cell.type === CellType.Cell) {
      message = `Clearing cell`
      newGrid[indexHeight][indexWidth].clicked = true
    } else if (
      event.type === "click" &&
      cell.type === CellType.Bomb &&
      cell.flag
    ) {
      message = `Click on flag + bomb`
    } else if (event.type === "click" && cell.type === CellType.Bomb) {
      message = `Boum`
    } else if (event.type === "contextmenu") {
      newGrid[indexHeight][indexWidth].flag =
        !newGrid[indexHeight][indexWidth].flag
      setGrid(newGrid)
      message = `Putting a flag`
    }

    if (message) {
      console.log(`Click detected:\n${message}\n`)
    }
  }

  const handleReset = () => {
    setFirstClick(false)
    setGrid(
      new Array(gridHeight).fill(0).map(() =>
        new Array(gridWidth).fill(0).map(() => {
          return {
            type: CellType.Cell,
            flag: false,
            clicked: false,
          }
        }),
      ),
    )
  }

  return (
    <div className="App">
      <h1>Still in game</h1>
      <button onClick={handleReset}>Reset</button>
      <table>
        <tbody>
          {grid.map((rows, indexHeight) => {
            return (
              <tr key={indexHeight}>
                {rows.map((cell, indexWidth) => {
                  return (
                    <Cell
                      key={indexWidth}
                      cell={cell}
                      onClick={(e) => {
                        handleClick(e, cell, indexHeight, indexWidth)
                      }}
                      onContextMenu={(e) =>
                        handleClick(e, cell, indexHeight, indexWidth)
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
