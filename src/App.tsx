import React, { useReducer } from "react"
import Cell from "./components/Cell/Cell"
import { MinesCounter } from "./utils"
import "./App.css"

const gridWidth = 10
const gridHeight = 8

export type CellDetails = {
  type: CellType
  flag: boolean
  clicked: boolean
  bombsAround: number
  borders: [boolean, boolean, boolean, boolean]
}

export enum CellType {
  Cell = 0,
  Bomb = 1,
}

interface IState {
  arr: CellDetails[]
  grid: CellDetails[][]
  arrRemover: number[]
  firstClick: boolean
}

type Action =
  | { type: "reset" }
  | { type: "createGrid"; grid: CellDetails[][]; firstClick: boolean }
  | { type: "setFlag"; grid: CellDetails[][] }
  | { type: "setClick"; grid: CellDetails[][] }

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

    matrix[k].push(list[i])
  }

  return matrix
}

function generateBombs(
  arr: CellDetails[],
  arrRemover: number[],
  bombsCount: number,
  clickedCellIndex: number,
): CellDetails[][] {
  const randomA = getRandomArbitrary(0, arrRemover.length)

  if (bombsCount === 0) {
    const arrWithBombs = arr.map((item, index) => {
      if (!arrRemover.includes(index)) {
        return {
          ...item,
          type: CellType.Bomb,
        }
      } else if (clickedCellIndex === index) {
        return {
          ...item,
          clicked: true,
        }
      } else return item
    })

    return listToMatrix(
      MinesCounter(arrWithBombs, gridWidth, gridHeight),
      gridWidth,
    )
  } else if (clickedCellIndex === arrRemover[randomA]) {
    return generateBombs(arr, arrRemover, bombsCount, clickedCellIndex)
  } else {
    arrRemover.splice(randomA, 1)
    return generateBombs(arr, arrRemover, bombsCount - 1, clickedCellIndex)
  }
}

const initialState: IState = {
  arr: new Array(gridWidth * gridHeight).fill(0).map(() => {
    return {
      type: CellType.Cell,
      flag: false,
      clicked: false,
      bombsAround: 0,
      borders: [false, false, false, false],
    }
  }),
  grid: new Array(gridHeight).fill(0).map(() =>
    new Array(gridWidth).fill(0).map(() => {
      return {
        type: CellType.Cell,
        flag: false,
        clicked: false,
        bombsAround: 0,
        borders: [false, false, false, false],
      }
    }),
  ),
  arrRemover: [...Array(gridHeight * gridWidth).keys()],
  firstClick: false,
}

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case "reset":
      return {
        ...initialState,
        arrRemover: [...Array(gridHeight * gridWidth).keys()],
        arr: Array(gridWidth * gridHeight)
          .fill(0)
          .map(() => {
            return {
              type: CellType.Cell,
              flag: false,
              clicked: false,
              bombsAround: 0,
              borders: [false, false, false, false],
            }
          }),
        grid: new Array(gridHeight).fill(0).map(() =>
          new Array(gridWidth).fill(0).map(() => {
            return {
              type: CellType.Cell,
              flag: false,
              clicked: false,
              bombsAround: 0,
              borders: [false, false, false, false],
            }
          }),
        ),
      }
    case "createGrid":
      return {
        ...state,
        grid: action.grid,
        firstClick: action.firstClick,
      }
    case "setFlag":
      return {
        ...state,
        grid: action.grid,
      }
    case "setClick":
      return {
        ...state,
        grid: action.grid,
      }
    default:
      throw new Error()
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { grid, firstClick, arr, arrRemover } = state

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    cell: CellDetails,
    indexHeight: number,
    indexWidth: number,
  ) => {
    // prevent context menu from opening on right-click
    event.preventDefault()

    let message

    // handle firstCLick
    if (event.type === "mousedown" && event.button === 0) {
      if (!firstClick) {
        dispatch({
          type: "createGrid",
          grid: generateBombs(
            arr,
            arrRemover,
            // Math.ceil((gridWidth * gridHeight) / 10),
            10,
            indexHeight * gridWidth + indexWidth,
          ),
          firstClick: true,
        })
      }
    }

    // synthetic event
    if (
      event.type === "mousedown" &&
      event.button === 0 &&
      cell.type === CellType.Cell &&
      cell.flag
    ) {
      message = `Click on flag + normal`
    } else if (
      event.type === "mousedown" &&
      event.button === 0 &&
      cell.type === CellType.Cell &&
      firstClick
    ) {
      message = `Clearing cell`

      grid[indexHeight][indexWidth].clicked = true

      if (grid[indexHeight][indexWidth].bombsAround === 0) {
        grid[indexHeight - 1][indexWidth].clicked = true
        grid[indexHeight + 1][indexWidth].clicked = true
        //petite fonction récursive
      }
      console.log(grid)

      dispatch({
        type: "setClick",
        grid: grid,
      })
    } else if (
      event.type === "mousedown" &&
      event.button === 0 &&
      cell.type === CellType.Bomb &&
      cell.flag
    ) {
      message = `Click on flag + bomb`
    } else if (
      event.type === "mousedown" &&
      event.button === 0 &&
      cell.type === CellType.Bomb
    ) {
      message = `Boum`
    } else if (
      event.type === "mousedown" &&
      event.button === 2 &&
      firstClick &&
      !cell.clicked
    ) {
      const newgrid = grid

      newgrid[indexHeight][indexWidth].flag =
        !newgrid[indexHeight][indexWidth].flag
      dispatch({
        type: "setFlag",
        grid: newgrid,
      })
      message = `Putting a flag`
    }

    if (message) {
      console.log(`Click detected:\n${message}\n`)
    }
  }

  const handleReset = () => {
    dispatch({ type: "reset" })
  }

  return (
    <div className="App">
      <button onClick={handleReset} className="reset">
        <img src="./svg/reset.svg" alt="reset button" />
      </button>
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
                      index={indexWidth + indexHeight}
                      onContextMenu={(e) =>
                        handleClick(e, cell, indexHeight, indexWidth)
                      }
                      onMouseDown={(e) =>
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
