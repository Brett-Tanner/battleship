type boardDimensions = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface coordinates {
  y: boardDimensions;
  x: boardDimensions;
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
}

interface playerParams {
  name: string;
  human: boolean;
}

type row = space[];

interface ship {
  length: number;
  hit(): number;
  sunk(): boolean;
  type: shipType;
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
}
