import React from "react"
import "./Cell.css"
import type { CellDetails } from "../../App"

interface Cell {
  cell: CellDetails
  onClick: React.MouseEventHandler<HTMLTableCellElement>
  onContextMenu: React.MouseEventHandler<HTMLTableCellElement>
}

const Cell = ({ cell, onClick, onContextMenu }: Cell) => {
  let currentCell
  // console.log(cell.flag)
  if (cell.flag) {
    currentCell = <div className={`cell flagged`} />
  } else if (cell.type === 1) {
    currentCell = <div className={`cell bomb`} />
  } else {
    currentCell = <div className={`cell`} />
  }

  return (
    <td onClick={onClick} onContextMenu={onContextMenu}>
      {currentCell}
    </td>
  )
}

export default Cell
