import { CellDetails, CellType } from "../App"
import CellBorders from "./CellBordersUtils"

const MinesAround = (
  arrWithBombs: CellDetails[],
  gridWidth: number,
  gridHeight: number,
) => {
  const arr = arrWithBombs.map((item, index) => {
    if (arrWithBombs[index].type === CellType.Bomb) {
      return item
      // Corner 1
    } else if (index === 0) {
      let bombsNumber = 0
      if (arrWithBombs[index + 1].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[gridWidth].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[gridWidth + 1].type === CellType.Bomb) {
        bombsNumber += 1
      }

      return {
        ...item,
        bombsAround: bombsNumber,
      }
      // Corner 2
      // - 1 because index starts at 0
    } else if (index === gridWidth - 1) {
      let bombsNumber = 0
      if (arrWithBombs[gridWidth - 2].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[gridWidth + gridWidth - 1].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[gridWidth + gridWidth - 2].type === CellType.Bomb) {
        bombsNumber += 1
      }

      return {
        ...item,
        bombsAround: bombsNumber,
      }
      // Corner 3
    } else if (index === gridWidth * gridHeight - gridWidth) {
      let bombsNumber = 0
      if (
        arrWithBombs[gridWidth * gridHeight - gridWidth * 2].type ===
        CellType.Bomb
      ) {
        bombsNumber += 1
      }
      if (
        arrWithBombs[gridWidth * gridHeight - gridWidth * 2 + 1].type ===
        CellType.Bomb
      ) {
        bombsNumber += 1
      }
      if (
        arrWithBombs[gridWidth * gridHeight - gridWidth + 1].type ===
        CellType.Bomb
      ) {
        bombsNumber += 1
      }

      return {
        ...item,
        bombsAround: bombsNumber,
      }
      // Corner 4
    } else if (index === gridWidth * gridHeight - 1) {
      let bombsNumber = 0
      if (
        arrWithBombs[gridWidth * gridHeight - gridWidth - 2].type ===
        CellType.Bomb
      ) {
        bombsNumber += 1
      }
      if (
        arrWithBombs[gridWidth * gridHeight - gridWidth - 1].type ===
        CellType.Bomb
      ) {
        bombsNumber += 1
      }
      if (arrWithBombs[gridWidth * gridHeight - 2].type === CellType.Bomb) {
        bombsNumber += 1
      }

      return {
        ...item,
        bombsAround: bombsNumber,
      }
      // First line except corner
    } else if (index > 0 && index < gridWidth - 1) {
      let bombsNumber = 0
      if (arrWithBombs[index - 1].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index + 1].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index + gridWidth - 1].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index + gridWidth].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index + gridWidth + 1].type === CellType.Bomb) {
        bombsNumber += 1
      }

      return {
        ...item,
        bombsAround: bombsNumber,
      }
      // First column
    } else if (index % gridWidth === 0) {
      let bombsNumber = 0
      if (arrWithBombs[index - gridWidth].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index - gridWidth + 1].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index + 1].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index + gridWidth].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index + gridWidth + 1].type === CellType.Bomb) {
        bombsNumber += 1
      }

      return {
        ...item,
        bombsAround: bombsNumber,
      }
      // Last column
    } else if (index % gridWidth === gridWidth - 1) {
      let bombsNumber = 0
      if (arrWithBombs[index - gridWidth - 1].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index - gridWidth].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index - 1].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index + gridWidth - 1].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index + gridWidth].type === CellType.Bomb) {
        bombsNumber += 1
      }

      return {
        ...item,
        bombsAround: bombsNumber,
      }
      // Last line except corner
    } else if (
      index > gridWidth * gridHeight - gridWidth &&
      index < gridWidth * gridHeight - 1
    ) {
      let bombsNumber = 0
      if (arrWithBombs[index - gridWidth - 1].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index - gridWidth].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index - gridWidth + 1].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index - 1].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index + 1].type === CellType.Bomb) {
        bombsNumber += 1
      }

      return {
        ...item,
        bombsAround: bombsNumber,
      }
      // Cells inside the grid
    } else {
      let bombsNumber = 0
      if (arrWithBombs[index - gridWidth - 1].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index - gridWidth].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index - gridWidth + 1].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index - 1].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index + 1].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index + gridWidth - 1].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index + gridWidth].type === CellType.Bomb) {
        bombsNumber += 1
      }
      if (arrWithBombs[index + gridWidth + 1].type === CellType.Bomb) {
        bombsNumber += 1
      }

      return {
        ...item,
        bombsAround: bombsNumber,
      }
    }
  })

  return CellBorders(arr, gridWidth)
}

export default MinesAround
