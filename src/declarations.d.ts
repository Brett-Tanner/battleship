interface game {
  over(): boolean;
  players: player[];
}

interface gameBoard {
  allSunk(): boolean;
  placeShip(): true | Error;
  receiveAttack(): boolean;
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

interface row {
  spaces: space[];
}

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
