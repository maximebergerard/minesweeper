import { CellDetails } from "../App"
import ClearingNearbyCellsUtils from "./ClearingNearbyCellsUtils"

const flagCount = (
  iHeight: number,
  iWidth: number,
  grid: CellDetails[][],
  gridWidth: number,
  gridHeight: number,
) => {
  let flagAround = 0

  // top left flag
  if (
    iHeight > 0 &&
    iWidth > 0 &&
    !!grid[iHeight - 1][iWidth - 1] &&
    grid[iHeight - 1][iWidth - 1].flag
  ) {
    flagAround++
  }

  // top flag
  if (
    iHeight > 0 &&
    !!grid[iHeight - 1][iWidth] &&
    grid[iHeight - 1][iWidth].flag
  ) {
    flagAround++
  }

  // top right flag
  if (
    iHeight > 0 &&
    iWidth < gridWidth - 1 &&
    !!grid[iHeight - 1][iWidth + 1] &&
    grid[iHeight - 1][iWidth + 1].flag
  ) {
    flagAround++
  }

  // left flag
  if (
    iWidth > 0 &&
    !!grid[iHeight][iWidth - 1] &&
    grid[iHeight][iWidth - 1].flag
  ) {
    flagAround++
  }

  // right flag
  if (
    iWidth < gridWidth - 1 &&
    !!grid[iHeight][iWidth + 1] &&
    grid[iHeight][iWidth + 1].flag
  ) {
    flagAround++
  }

  // left bottom flag
  if (
    iHeight < gridHeight - 1 &&
    iWidth > 0 &&
    !!grid[iHeight + 1][iWidth - 1] &&
    grid[iHeight + 1][iWidth - 1].flag
  ) {
    flagAround++
  }

  // bottom flag
  if (
    iHeight < gridHeight - 1 &&
    !!grid[iHeight + 1][iWidth] &&
    grid[iHeight + 1][iWidth].flag
  ) {
    flagAround++
  }

  // right bottom flat
  if (
    iHeight < gridHeight - 1 &&
    iWidth < gridWidth - 1 &&
    !!grid[iHeight + 1][iWidth + 1] &&
    grid[iHeight + 1][iWidth + 1].flag
  ) {
    flagAround++
  }

  return flagAround
}

const DoubleClickClearingUtils = (
  iHeight: number,
  iWidth: number,
  grid: CellDetails[][],
  gridWidth: number,
  gridHeight: number,
) => {
  const clearedGrid = grid

  if (
    flagCount(iHeight, iWidth, grid, gridWidth, gridHeight) ===
    grid[iHeight][iWidth].bombsAround
  ) {
    if (
      iHeight > 0 &&
      iWidth > 0 &&
      !!grid[iHeight - 1][iWidth - 1] &&
      !grid[iHeight - 1][iWidth - 1].flag
    ) {
      clearedGrid[iHeight - 1][iWidth - 1].clicked = true
      ClearingNearbyCellsUtils(
        iHeight - 1,
        iWidth - 1,
        clearedGrid,
        gridWidth,
        gridHeight,
      )
    }
    if (
      iHeight > 0 &&
      !!grid[iHeight - 1][iWidth] &&
      !grid[iHeight - 1][iWidth].flag
    ) {
      clearedGrid[iHeight - 1][iWidth].clicked = true
      ClearingNearbyCellsUtils(
        iHeight - 1,
        iWidth,
        clearedGrid,
        gridWidth,
        gridHeight,
      )
    }
    if (
      iHeight > 0 &&
      iWidth < gridWidth - 1 &&
      !!grid[iHeight - 1][iWidth + 1] &&
      !grid[iHeight - 1][iWidth + 1].flag
    ) {
      clearedGrid[iHeight - 1][iWidth + 1].clicked = true
      ClearingNearbyCellsUtils(
        iHeight - 1,
        iWidth + 1,
        clearedGrid,
        gridWidth,
        gridHeight,
      )
    }
    if (
      iWidth > 0 &&
      !!grid[iHeight][iWidth - 1] &&
      !grid[iHeight][iWidth - 1].flag
    ) {
      clearedGrid[iHeight][iWidth - 1].clicked = true
      ClearingNearbyCellsUtils(
        iHeight,
        iWidth - 1,
        clearedGrid,
        gridWidth,
        gridHeight,
      )
    }
    if (
      iWidth < gridWidth - 1 &&
      !!grid[iHeight][iWidth + 1] &&
      !grid[iHeight][iWidth + 1].flag
    ) {
      clearedGrid[iHeight][iWidth + 1].clicked = true
      ClearingNearbyCellsUtils(
        iHeight,
        iWidth + 1,
        clearedGrid,
        gridWidth,
        gridHeight,
      )
    }
    if (
      iHeight < gridHeight - 1 &&
      iWidth > 0 &&
      !!grid[iHeight + 1][iWidth - 1] &&
      !grid[iHeight + 1][iWidth - 1].flag
    ) {
      clearedGrid[iHeight + 1][iWidth - 1].clicked = true
      ClearingNearbyCellsUtils(
        iHeight + 1,
        iWidth - 1,
        clearedGrid,
        gridWidth,
        gridHeight,
      )
    }
    if (
      iHeight < gridHeight - 1 &&
      !!grid[iHeight + 1][iWidth] &&
      !grid[iHeight + 1][iWidth].flag
    ) {
      clearedGrid[iHeight + 1][iWidth].clicked = true
      ClearingNearbyCellsUtils(
        iHeight + 1,
        iWidth,
        clearedGrid,
        gridWidth,
        gridHeight,
      )
    }
    if (
      iHeight < gridHeight - 1 &&
      iWidth < gridWidth - 1 &&
      !!grid[iHeight + 1][iWidth + 1] &&
      !grid[iHeight + 1][iWidth + 1].flag
    ) {
      clearedGrid[iHeight + 1][iWidth + 1].clicked = true
      ClearingNearbyCellsUtils(
        iHeight + 1,
        iWidth + 1,
        clearedGrid,
        gridWidth,
        gridHeight,
      )
    }
  }
  return clearedGrid
}

export default DoubleClickClearingUtils
