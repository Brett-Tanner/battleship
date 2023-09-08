import { shipFactory } from "./ship";
import { spaceFactory } from "./space";

function gameBoardFactory(): gameBoard {
  const shipTypes: shipType[] = [
    "Carrier",
    "Battleship",
    "Destroyer",
    "Submarine",
    "Patrol Boat",
  ];
  const rows = createRows();
  const ships = shipTypes.map((type) => {
    return shipFactory(type);
  });

  const allSunk = () => {
    return ships.every((ship) => {
      return ship.sunk();
    });
  };

  function checkValidity(
    length: number,
    start: coordinates,
    end: coordinates
  ): { x: number; y: number } {
    const xChange = start.x - end.x;
    const xLength = Math.abs(xChange) + 1;
    const yChange = start.y - end.y;
    const yLength = Math.abs(yChange) + 1;

    if (xLength !== length && yLength !== length) {
      if (xChange !== 0) {
        throw new Error(
          `Your coordinates cover ${xLength} spaces on the X-axis; your ship covers ${length} spaces`
        );
      } else {
        throw new Error(
          `Your coordinates cover ${yLength} spaces on the Y-axis; your ship covers ${length} spaces`
        );
      }
    }

    return { y: yChange, x: xChange };
  }

  function createRows(): row[] {
    return Array.from({ length: 10 }, () => {
      return Array.from({ length: 10 }, () => {
        return spaceFactory();
      });
    });
  }

  function fillSpace(space: space, ship: ship) {
    if (space.ship) {
      throw new Error(`That space is occupied by a ${space.ship.type}`);
    } else {
      space.ship = ship;
    }
  }

  const placeShip = (ship: ship, start: coordinates, end: coordinates) => {
    const coordDiff = checkValidity(ship.length, start, end);
    if (coordDiff.y !== 0) {
      for (let i = 0; i < ship.length; i++) {
        const space =
          coordDiff.y > 0
            ? rows[start.y - i][start.x]
            : rows[start.y + i][start.x];
        fillSpace(space, ship);
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        const space =
          coordDiff.x > 0
            ? rows[start.y][start.x - i]
            : rows[start.y][start.x + i];
        fillSpace(space, ship);
      }
    }
  };

  const receiveAttack = (coordinates: coordinates) => {
    const space = rows[coordinates.y][coordinates.x];
    if (space.ship) {
      space.ship.hit();
      space.hit = true;
    } else {
      space.missed = true;
    }
    return space.ship;
  };

  const vacant = (coordinates: coordinates) => {
    return rows[coordinates.y][coordinates.x].ship === null ? true : false;
  };

  return { allSunk, placeShip, receiveAttack, rows, ships, vacant };
}

export { gameBoardFactory };
