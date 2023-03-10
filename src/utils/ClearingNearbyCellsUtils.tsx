import { CellDetails } from "../App"

const ClearingNearbyCellsUtils = (
  iHeight: number,
  iWidth: number,
  grid: CellDetails[][],
  gridWidth: number,
  gridHeight: number,
) => {
  if (grid[iHeight][iWidth].bombsAround === 0) {
    // top left
    if (
      iHeight > 0 &&
      iWidth > 0 &&
      !grid[iHeight - 1][iWidth - 1].clicked &&
      !!grid[iHeight - 1][iWidth - 1] &&
      grid[iHeight - 1][iWidth - 1].bombsAround === 0
    ) {
      grid[iHeight - 1][iWidth - 1].clicked = true
      ClearingNearbyCellsUtils(
        iHeight - 1,
        iWidth - 1,
        grid,
        gridWidth,
        gridHeight,
      )
    } else if (
      iHeight > 0 &&
      iWidth > 0 &&
      !!grid[iHeight - 1][iWidth - 1] &&
      grid[iHeight - 1][iWidth - 1].bombsAround > 0
    ) {
      grid[iHeight - 1][iWidth - 1].clicked = true
    }

    // top
    if (
      iHeight > 0 &&
      !grid[iHeight - 1][iWidth].clicked &&
      !!grid[iHeight - 1][iWidth] &&
      grid[iHeight - 1][iWidth].bombsAround === 0
    ) {
      grid[iHeight - 1][iWidth].clicked = true
      ClearingNearbyCellsUtils(iHeight - 1, iWidth, grid, gridWidth, gridHeight)
    } else if (
      iHeight > 0 &&
      iWidth > 0 &&
      !!grid[iHeight - 1][iWidth] &&
      grid[iHeight - 1][iWidth].bombsAround > 0
    ) {
      grid[iHeight - 1][iWidth].clicked = true
    }

    // top right
    if (
      iHeight > 0 &&
      iWidth < gridWidth - 1 &&
      !grid[iHeight - 1][iWidth + 1].clicked &&
      !!grid[iHeight - 1][iWidth + 1] &&
      grid[iHeight - 1][iWidth + 1].bombsAround === 0
    ) {
      grid[iHeight - 1][iWidth + 1].clicked = true
      ClearingNearbyCellsUtils(
        iHeight - 1,
        iWidth + 1,
        grid,
        gridWidth,
        gridHeight,
      )
    } else if (
      iHeight > 0 &&
      iWidth < gridWidth - 1 &&
      !!grid[iHeight - 1][iWidth + 1] &&
      grid[iHeight - 1][iWidth + 1].bombsAround > 0
    ) {
      grid[iHeight - 1][iWidth + 1].clicked = true
    }

    // left
    if (
      iWidth > 0 &&
      !grid[iHeight][iWidth - 1].clicked &&
      !!grid[iHeight][iWidth - 1] &&
      grid[iHeight][iWidth - 1].bombsAround === 0
    ) {
      grid[iHeight][iWidth - 1].clicked = true
      ClearingNearbyCellsUtils(iHeight, iWidth - 1, grid, gridWidth, gridHeight)
    } else if (
      iWidth > 0 &&
      !!grid[iHeight][iWidth - 1] &&
      grid[iHeight][iWidth - 1].bombsAround > 0
    ) {
      grid[iHeight][iWidth - 1].clicked = true
    }

    // right
    if (
      iWidth < gridWidth - 1 &&
      !grid[iHeight][iWidth + 1].clicked &&
      !!grid[iHeight][iWidth + 1] &&
      grid[iHeight][iWidth + 1].bombsAround === 0
    ) {
      grid[iHeight][iWidth + 1].clicked = true
      ClearingNearbyCellsUtils(iHeight, iWidth + 1, grid, gridWidth, gridHeight)
    } else if (
      iWidth < gridWidth - 1 &&
      !!grid[iHeight][iWidth + 1] &&
      grid[iHeight][iWidth + 1].bombsAround > 0
    ) {
      grid[iHeight][iWidth + 1].clicked = true
    }

    // left bottom
    if (
      iHeight < gridHeight - 1 &&
      iWidth > 0 &&
      !!grid[iHeight + 1][iWidth - 1] &&
      grid[iHeight + 1][iWidth - 1].bombsAround === 0
    ) {
      grid[iHeight + 1][iWidth - 1].clicked = true
      ClearingNearbyCellsUtils(
        iHeight + 1,
        iWidth - 1,
        grid,
        gridWidth,
        gridHeight,
      )
    } else if (
      iHeight < gridHeight - 1 &&
      iWidth > 0 &&
      !!grid[iHeight + 1][iWidth - 1] &&
      grid[iHeight + 1][iWidth - 1].bombsAround > 0
    ) {
      grid[iHeight + 1][iWidth - 1].clicked = true
    }

    // bottom
    if (
      iHeight < gridHeight - 1 &&
      !grid[iHeight + 1][iWidth].clicked &&
      !!grid[iHeight + 1][iWidth] &&
      grid[iHeight + 1][iWidth].bombsAround === 0
    ) {
      grid[iHeight + 1][iWidth].clicked = true
      ClearingNearbyCellsUtils(iHeight + 1, iWidth, grid, gridWidth, gridHeight)
    } else if (
      iHeight < gridHeight - 1 &&
      !!grid[iHeight + 1][iWidth] &&
      grid[iHeight + 1][iWidth].bombsAround > 0
    ) {
      grid[iHeight + 1][iWidth].clicked = true
    }

    // bottom right
    if (
      iHeight < gridHeight - 1 &&
      iWidth < gridWidth - 1 &&
      !grid[iHeight + 1][iWidth + 1].clicked &&
      !!grid[iHeight + 1][iWidth + 1] &&
      grid[iHeight + 1][iWidth + 1].bombsAround === 0
    ) {
      grid[iHeight + 1][iWidth + 1].clicked = true
      ClearingNearbyCellsUtils(
        iHeight + 1,
        iWidth + 1,
        grid,
        gridWidth,
        gridHeight,
      )
    } else if (
      iHeight < gridHeight - 1 &&
      iWidth < gridWidth - 1 &&
      !!grid[iHeight + 1][iWidth + 1] &&
      grid[iHeight + 1][iWidth + 1].bombsAround > 0
    ) {
      grid[iHeight + 1][iWidth + 1].clicked = true
    }
  }
}

export default ClearingNearbyCellsUtils
