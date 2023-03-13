import { ClearingNearbyCells, MinesCounter } from "."
import { CellDetails, CellType } from "../App"

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

const GenerateBombs = (
  arr: CellDetails[],
  arrRemover: number[],
  bombsCount: number,
  indexHeight: number,
  indexWidth: number,
  gridWidth: number,
  gridHeight: number,
): CellDetails[][] => {
  const randomNumber = getRandomArbitrary(0, arrRemover.length)
  const clickedCellIndex = indexHeight * gridWidth + indexWidth

  if (bombsCount === 0) {
    const arrWithBombs = arr.map((item, index) => {
      if (!arrRemover.includes(index)) {
        return {
          ...item,
          type: CellType.Bomb,
        }
      } else return item
    })

    ClearingNearbyCells(
      indexHeight,
      indexWidth,
      listToMatrix(
        MinesCounter(arrWithBombs, gridWidth, gridHeight),
        gridWidth,
      ),
      gridWidth,
      gridHeight,
    )

    return ClearingNearbyCells(
      indexHeight,
      indexWidth,
      listToMatrix(
        MinesCounter(arrWithBombs, gridWidth, gridHeight),
        gridWidth,
      ),
      gridWidth,
      gridHeight,
    )
  } else if (
    // Bombs can't be defined around the first click
    clickedCellIndex === arrRemover[randomNumber] ||
    clickedCellIndex + 1 === arrRemover[randomNumber] ||
    clickedCellIndex - 1 === arrRemover[randomNumber] ||
    clickedCellIndex - gridWidth === arrRemover[randomNumber] ||
    clickedCellIndex - gridWidth - 1 === arrRemover[randomNumber] ||
    clickedCellIndex - gridWidth + 1 === arrRemover[randomNumber] ||
    clickedCellIndex + gridWidth === arrRemover[randomNumber] ||
    clickedCellIndex + gridWidth - 1 === arrRemover[randomNumber] ||
    clickedCellIndex + gridWidth + 1 === arrRemover[randomNumber]
  ) {
    return GenerateBombs(
      arr,
      arrRemover,
      bombsCount,
      indexHeight,
      indexWidth,
      gridWidth,
      gridHeight,
    )
  } else {
    arrRemover.splice(randomNumber, 1)
    return GenerateBombs(
      arr,
      arrRemover,
      bombsCount - 1,
      indexHeight,
      indexWidth,
      gridWidth,
      gridHeight,
    )
  }
}

export default GenerateBombs
