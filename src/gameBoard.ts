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

  const placeShip = (ship: ship, start: coordinates, end: coordinates) => {
    // FE validation for coords being in bounds
  };

  const receiveAttack = () => {};

  return { allSunk, placeShip, receiveAttack, rows, ships };
}

function createRows() {
  return Array(10).fill(Array(10).fill(spaceFactory()));
}

export { gameBoardFactory };
