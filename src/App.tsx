import React, { useEffect, useReducer, useState } from "react"
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

function listToMatrix(list: CellDetails[], elementsPerSubArray: number) {
  const matrix: CellDetails[][] = []

  for (let i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++
      matrix[k] = []
    }

    console.log(list[i])
    matrix[k].push(list[i])
  }

  return matrix
}

function generateBombs(
  arr: CellDetails[],
  arrRemover: number[],
  bombsCount: number,
): CellDetails[][] {
  const randomA = getRandomArbitrary(0, gridWidth * gridHeight - bombsCount) // ptn là c cassé
  console.log(randomA, "randomA")
  console.log(arrRemover, "arrRemover")

  if (bombsCount === 0) {
    const arrWithBombs = arr.map((item, index) => {
      if (!arrRemover.includes(index)) {
        console.log(index, "index")
        return {
          type: CellType.Bomb,
          flag: false,
          clicked: false,
        }
      } else return item
    })

    return listToMatrix(arrWithBombs, gridWidth)
  } else {
    arrRemover.splice(randomA, 1)
    return generateBombs(arr, arrRemover, bombsCount - 1)
  }
}

interface IState {
  arr: CellDetails[]
  grid: CellDetails[][]
  arrRemover: number[]
  firstClick: boolean
}

type Action =
  | { type: "reset" }
  | { type: "setGrid"; grid: CellDetails[][]; firstClick: boolean }

const initialState: IState = {
  arr: [
    ...Array(gridWidth * gridHeight)
      .fill(0)
      .map(() => {
        return {
          type: CellType.Cell,
          flag: false,
          clicked: false,
        }
      }),
  ],
  grid: new Array(gridHeight).fill(0).map(() =>
    new Array(gridWidth).fill(0).map(() => {
      return {
        type: CellType.Cell,
        flag: false,
        clicked: false,
      }
    }),
  ),
  arrRemover: Array.from(Array(gridWidth * gridHeight).keys()),
  firstClick: false,
}

console.log(initialState)

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case "reset":
      console.log(initialState, "initialState")

      return { ...initialState }
    case "setGrid":
      console.log("case grid")
      return {
        ...state,
        grid: action.grid,
        firstClick: action.firstClick,
      }
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { grid, firstClick, arr, arrRemover } = state

  // const [firstClick, setFirstClick] = useState(false)

  // useEffect(() => {
  //   console.log(arrRemover, "arrRemover")
  //   console.log(grid, "grid")
  // }, [arrRemover, grid])

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
        dispatch({
          type: "setGrid",
          grid: generateBombs(arr, arrRemover, 3),
          firstClick: true,
        })
      }
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
      // setGrid(newGrid)
      message = `Putting a flag`
    }

    if (message) {
      console.log(`Click detected:\n${message}\n`)
    }
  }

  const handleReset = () => {
    console.log(grid, "grid")
    dispatch({ type: "reset" })
    console.log(grid, "grid")
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
