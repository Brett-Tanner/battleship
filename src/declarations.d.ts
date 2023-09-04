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
  hitCount: number;
  sunk: boolean;
  hit(): number;
}

interface space {
  ship: ship | null;
  hit: boolean;
  missed: boolean;
}
