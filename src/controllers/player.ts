import { getCoordinates, showBoard } from "../components/board";
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

  async function humanPlace(main: HTMLElement, ship: ship) {
    main.innerHTML = "";
    const placementBoard = showBoard(
      gameBoard,
      `${name}, place your ${ship.type}`
    );
    return new Promise<HTMLTableCellElement>((resolve) => {
      placementBoard.querySelectorAll("td").forEach((cell) => {
        cell.addEventListener("click", () => {
          main.innerHTML = "";
          main.appendChild(
            showBoard(gameBoard, `${name}, place your ${ship.type}`)
          );
          resolve(cell);
        });
      });
      main.appendChild(placementBoard);
    });
  }

  async function placeShips(main: HTMLElement, ship: ship | undefined) {
    if (ship === undefined) {
      main.innerHTML = "";
      main.appendChild(showBoard(gameBoard));
      return;
    }
    const startCell = await humanPlace(main, ship);
    const endCoord = await setStart(startCell, ship);
    gameBoard.placeShip(ship, getCoordinates(startCell), endCoord);
    const nextShipIndex =
      gameBoard.ships.findIndex((listShip) => {
        return listShip.type === ship.type;
      }) + 1;
    return placeShips(main, gameBoard.ships[nextShipIndex]);
  }

  async function setStart(cell: HTMLTableCellElement, ship: ship) {
    const start = getCoordinates(cell);
    document
      .querySelector(`[data-coordinates=y${start.y}_x${start.x}]`)
      ?.classList.add("bg-neutral-200");

    const possibleEnds = ship.possibleEnds(gameBoard, start);
    return new Promise<coordinates>((resolve) => {
      possibleEnds.forEach((endCoord) => {
        const endSpace = document.querySelector(
          `[data-coordinates=y${endCoord.y}_x${endCoord.x}]`
        );
        endSpace?.classList.add("bg-green-500");

        endSpace?.addEventListener("click", () => {
          resolve(endCoord);
        });
      });
    });
  }

  return { attack, gameBoard, human, name, placeShips };
}

export { playerFactory };
