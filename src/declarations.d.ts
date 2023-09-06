type boardDimensions = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface coordinates {
  y: boardDimensions;
  x: boardDimensions;
}

interface game {
  over(): boolean;
  players: player[];
}

// One per player, one side theirs w/ships one opponent w/out
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
