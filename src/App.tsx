import React, { useReducer } from "react"
import Cell from "./components/Cell/Cell"
import { ClearingNearbyCells, GenerateBombs } from "./utils"
import "./App.css"

const gridWidth = 25
const gridHeight = 15
const bombsCount = 60
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
  flagCount: number
}

type Action =
  | { type: "reset" }
  | { type: "createGrid"; grid: CellDetails[][]; firstClick: boolean }
  | { type: "setFlag"; grid: CellDetails[][]; flagCount: number }
  | { type: "setClick"; grid: CellDetails[][] }

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
  flagCount: bombsCount,
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
        flagCount: state.flagCount + action.flagCount,
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
          grid: GenerateBombs(
            arr,
            arrRemover,
            bombsCount,
            indexHeight,
            indexWidth,
            gridWidth,
            gridHeight,
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

      ClearingNearbyCells(indexHeight, indexWidth, grid, gridWidth, gridHeight)

      grid[indexHeight][indexWidth].clicked = true

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
      grid[indexHeight][indexWidth].clicked = true
      dispatch({
        type: "setClick",
        grid: grid,
      })
    } else if (
      event.type === "mousedown" &&
      event.button === 2 &&
      firstClick &&
      !cell.clicked
    ) {
      if (state.flagCount > 0) {
        grid[indexHeight][indexWidth].flag = !grid[indexHeight][indexWidth].flag

        if (grid[indexHeight][indexWidth].flag) {
          dispatch({
            type: "setFlag",
            grid: grid,
            flagCount: -1,
          })
        } else {
          dispatch({
            type: "setFlag",
            grid: grid,
            flagCount: 1,
          })
        }
        message = `Putting a flag`
      }
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
      <div style={{ display: "flex" }}>
        <button onClick={handleReset} className="reset">
          <img src="./svg/reset.svg" alt="reset button" />
        </button>
        <div className="counter">{state.flagCount}</div>
      </div>
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
          {/* {grid.map((rows, indexHeight) => {
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
          })} */}
        </tbody>
      </table>
    </div>
  )
}

export default App
