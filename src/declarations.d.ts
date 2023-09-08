interface coordinates {
  y: number;
  x: number;
}

interface game {
  players: player[];
}

// Send to opponent, but hide ships in DOM with param on display function
interface gameBoard {
  allSunk(): boolean;
  placeShip(ship: ship, start: coordinates, end: coordinates): void;
  receiveAttack(space): boolean;
  rows: row[];
  ships: ship[];
  vacant(coordinates: coordinates): boolean;
}

interface lengthMapping {
  type: shipType;
  length: number;
}

interface player {
  name: string;
  human: boolean;
  gameBoard: gameBoard;
  attack(board, coordinates?): boolean;
  placeShips(main): boolean;
}

interface playerData {
  name: string;
  human: boolean;
}

interface playerParams {
  name: string;
  human: boolean;
}

type row = space[];

interface ship {
  length: number;
  type: shipType;
  hit(): number;
  possibleEnds(gameBoard: gameBoard, currentCoords: coordinates): coordinates[];
  sunk(): boolean;
}

type shipType =
  | "Carrier"
  | "Battleship"
  | "Destroyer"
  | "Submarine"
  | "Patrol Boat";

interface space {
  ship: ship | null;
  hit: boolean;
  missed: boolean;
  possible: false;
}
