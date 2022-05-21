import { nextLetter, parseCoord } from 'common/helpers';

export enum ShipOrientation {
  HORIZONTAL,
  VERTICAL,
}

export interface ShipProps {
  orientation: ShipOrientation;
  length: number;
  origin: string;
}

export function isShip(ship: ShipProps): boolean {
  return [
    'orientation',
    'length',
    'origin',
  ].every((prop) => prop in ship);
}

export function getShipCoords(ship: ShipProps): string[] {
  const coords: string[] = [];
  const [originX, originY] = parseCoord(ship.origin);

  if (ship.orientation === ShipOrientation.HORIZONTAL) {
    for (let i = 0; i < ship.length; i++) {
      coords.push(originX + (originY + i));
    }
  } else {
    for (let i = 0; i < ship.length; i++) {
      coords.push(nextLetter(i, originX) + originY);
    }
  }

  return coords;
}

export function makeShips(oceanSize: number, shipSizes: number[]): ShipProps[] {
  const ships: ShipProps[] = [];
  const occupiedFields: string[] = [];

  shipSizes.forEach((size) => {
    const ship: ShipProps = {
      origin: '',
      length: size,
      orientation: [
        ShipOrientation.HORIZONTAL,
        ShipOrientation.VERTICAL
      ][Math.floor(Math.random() * 2)],
    };

    let [rangeX, rangeY] = [oceanSize, oceanSize - ship.length + 1];
    if (ship.orientation === ShipOrientation.VERTICAL) {
      [rangeX, rangeY] = [rangeY, rangeX];
    }

    const originPool: string[] = [];
    for (let i = 1; i <= rangeX; i++) {
      const row = nextLetter(i - 1);
      for (let j = 1; j <= rangeY; j++) {
        originPool.push(row + j);
      }
    }

    ship.origin = getRandomOrigin(ship, originPool, occupiedFields);
    getShipCoords(ship).forEach((c) => occupiedFields.push(c));

    ships.push({...ship});
  })

  return ships;
}

function getRandomOrigin(ship: ShipProps, originPool: string[], used: string[]): string {
  let randomOrigin = originPool[Math.floor(Math.random() * originPool.length)];
  let tempShip: ShipProps = {...ship, origin: randomOrigin};
  let tempShipCoords = getShipCoords(tempShip);

  if (tempShipCoords.some((c) => used.includes(c))) {
    const i = originPool.findIndex((value) => value === randomOrigin);
    used.push(originPool[i]);
    originPool.splice(i, 1);
    return getRandomOrigin(tempShip, originPool, used);
  }
  return randomOrigin;
}
