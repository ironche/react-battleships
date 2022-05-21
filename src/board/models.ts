import { nextLetter } from 'common/helpers';

export interface BoardProps {
  size: number;
  isSpying?: boolean;
  onMessage?: (msg: string) => void;
}

export enum CellType {
  LEGEND,
  HIDDEN,
  MISS,
  HIT,
}

export enum CellValue {
  WATER,
  SHIP,
}

export interface BoardCell {
  type: CellType;
  key: string;
  value: string | CellValue;
}

export function makeBoard(size: number): BoardCell[] {
  const boardData: BoardCell[] = [];

  for (let i = 0; i <= size; i++) {
    const row = nextLetter(i - 1);
    for (let j = 0; j <= size; j++) {
      const cell = row + j;
      if (i) {
        if (j) {
          boardData.push({
            type: CellType.HIDDEN,
            key: cell,
            value: CellValue.WATER,
          });
        } else {
          boardData.push({
            type: CellType.LEGEND,
            key: cell,
            value: row,
          });
        }
      } else {
        boardData.push({
          type: CellType.LEGEND,
          key: cell,
          value: j ? j.toString() : '',
        });
      }
    }
  }

  return boardData;
}

export function shootOnTarget(board: BoardCell[], cell: BoardCell): BoardCell[] {
  return board.map((c) => {
    if (c.key === cell.key) {
      c.type = (c.value === CellValue.WATER) ? CellType.MISS : CellType.HIT;
    }
    return c;
  });
}

export function getRemainingTargets(board: BoardCell[]): BoardCell[] {
  return board.filter((c) => (c.value === CellValue.SHIP) && (c.type === CellType.HIDDEN));
}

export function countShots(board: BoardCell[]): number {
  return board.filter((c) => [CellType.MISS, CellType.HIT].includes(c.type)).length;
}
