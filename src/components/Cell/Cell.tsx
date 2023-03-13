import React from "react"
import "./Cell.css"
import type { CellDetails } from "../../App"

interface Cell {
  cell: CellDetails
  onClick?: React.MouseEventHandler<HTMLTableCellElement>
  onContextMenu?: React.MouseEventHandler<HTMLTableCellElement>
  onMouseDown: React.MouseEventHandler<HTMLTableCellElement>
  index: number
}

const Cell = ({ cell, onClick, onContextMenu, onMouseDown, index }: Cell) => {
  let currentCell

  if (cell.flag) {
    currentCell = (
      <div className={`cell flagged index-${index % 2}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M4 24h-2v-24h2v24zm18-16l-16-6v12l16-6z" />
        </svg>{" "}
      </div>
    )
  } else if (cell.type === 1 && cell.clicked) {
    currentCell = (
      <div className={`cell clicked-${cell.clicked} index-${index % 2} bomb`}>
        <div />
      </div>
    )
  } else if (cell.type === 1) {
    currentCell = (
      <div className={`cell clicked-${cell.clicked} index-${index % 2}`} />
    )
  } else if (cell.clicked) {
    currentCell = (
      <div
        className={`cell clicked-${cell.clicked} index-${
          index % 2
        } bombs-around-${cell.bombsAround}`}
      >
        {cell.bombsAround === 0 ? "" : cell.bombsAround}
      </div>
    )
  } else {
    currentCell = (
      <div className={`cell clicked-${cell.clicked} index-${index % 2}`} />
    )
  }

  return (
    <td
      onClick={onClick}
      onContextMenu={onContextMenu}
      onMouseDown={onMouseDown}
    >
      {currentCell}
    </td>
  )
}

export default Cell
