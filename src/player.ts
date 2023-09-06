import { gameBoardFactory } from "./gameBoard";

function playerFactory(name: string, human: boolean) {
  const gameBoard = gameBoardFactory();

  function attack(board: gameBoard, coordinates?: coordinates) {
    if (coordinates) {
      return board.receiveAttack({ y: coordinates.y, x: coordinates.x });
    } else {
      return board.receiveAttack({
        y: Math.floor(Math.random() * 9),
        x: Math.floor(Math.random() * 9),
      });
    }
  }

  return { attack, gameBoard, human, name };
}

export { playerFactory };
