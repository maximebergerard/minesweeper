import React from "react"
import "./Cell.css"

interface Cell {
  cellType: number
  onClick: React.MouseEventHandler<HTMLTableCellElement>
  onContextMenu: React.MouseEventHandler<HTMLTableCellElement>
}

const Cell = ({ cellType, onClick, onContextMenu }: Cell) => {
  return (
    <td onClick={onClick} onContextMenu={onContextMenu}>
      <div className={`cell cell${cellType}`} />
    </td>
  )
}

export default Cell
