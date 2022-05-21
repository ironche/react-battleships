import { PropsWithChildren, useEffect, useState } from 'react';
import { BoardProps, BoardCell, CellType, CellValue, makeBoard, getRemainingTargets, countShots, shootOnTarget } from './models';
import { ShipProps, isShip, getShipCoords } from 'ship/models';
import { LegendBox } from './LegendBox';
import { FireButton } from './FireButton';
import { MissedShot } from './MissedShot';
import { OnFire } from './OnFire';
import styled from '@emotion/styled';

export default function Board(props: PropsWithChildren<BoardProps>) {
  const [boardCells, setBoardCells] = useState<BoardCell[]>(makeBoard(props.size));

  useEffect(() => {
    if (Array.isArray(props.children) && props.children.every((c) => isShip(c.props))) {
      const ships = new Set<string>();
      props.children.forEach(({props: s}: {props: ShipProps}) => {
        getShipCoords(s).forEach((c) => ships.add(c));
      });

      setBoardCells((prevState) => {
        const board = prevState.map((c) => {
          if (ships.has(c.key)) {
            return {...c, value: CellValue.SHIP};
          }
          return c;
        });
        return board;
      });
    }
  }, [props]);

  function handleClick(cell: BoardCell): void {
    const remainingShips = getRemainingTargets(boardCells);
    if (!remainingShips.length) {
      return;
    }

    if (remainingShips.length > 1) {
      notify(`${cell.key} attack report: ` + ((cell.value === CellValue.WATER) ? 'MISS' : 'HIT'));
    } else if (remainingShips.length === 1 && remainingShips[0].key === cell.key) {
      notify(`Well done! You completed the game in ${countShots(boardCells) + 1} shots.`);
    }

    setBoardCells((prevState) => shootOnTarget(prevState, cell));
  }

  function notify(msg: string = ''): void {
    props.onMessage && props.onMessage(msg);
  }

  return (
    <BoardContainer cols={props.size}>
      {boardCells.map((cell) => {
        switch (cell.type) {
          case CellType.LEGEND:
            return <LegendBox key={cell.key}>{cell.value}</LegendBox>
          case CellType.HIT:
            return <OnFire key={cell.key}/>;
          case CellType.MISS:
            return <MissedShot key={cell.key}/>;
          default:
            return <FireButton
              key={cell.key}
              isSpying={props.isSpying && (cell.value === CellValue.SHIP)}
              onClick={() => handleClick(cell)}
            />
        }
      })}
    </BoardContainer>
  );
}

export const BoardContainer = styled.div<{cols: number}>`
  display: grid;
  grid-template-columns: repeat(${props => props.cols + 1}, 40px);
  grid-template-rows: repeat(${props => props.cols + 1}, 40px);
  gap: 4px;
`;
