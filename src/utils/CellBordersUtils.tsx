import { CellDetails, CellType } from "../App"

const CellBorders = (arr: CellDetails[], gridWidth: number) => {
  return arr.map((item, i) => {
    if (item.type === CellType.Bomb) {
      return item
    }

    let borders: [boolean, boolean, boolean, boolean] = [
      false,
      false,
      false,
      false,
    ]
    if (!!arr[i - 1] && arr[i - 1].type === CellType.Bomb) {
      borders = [borders[0], borders[1], borders[2], true]
    }

    if (!!arr[i - gridWidth] && arr[i - gridWidth].type === CellType.Bomb) {
      borders = [true, borders[1], borders[2], borders[3]]
    }

    if (!!arr[i + 1] && arr[i + 1].type === CellType.Bomb) {
      borders = [borders[0], true, borders[2], borders[3]]
    }

    if (!!arr[i + gridWidth] && arr[i + gridWidth].type === CellType.Bomb) {
      borders = [borders[0], borders[1], true, borders[3]]
    }
    return {
      ...item,
      borders,
    }
  })
}

export default CellBorders
