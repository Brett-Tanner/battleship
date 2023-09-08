import { getCoordinates, showBoard } from "../components/board";
import { gameBoardFactory } from "./gameBoard";

function playerFactory(name: string, human: boolean) {
  const gameBoard = gameBoardFactory();

  function aiPlace(ship: ship) {}

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

  function humanPlace(main: HTMLElement, ship: ship) {
    main.innerHTML = "";
    const placementBoard = showBoard(gameBoard, `Place your ${ship.type}`);
    const cells = placementBoard.querySelectorAll("td");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        main.innerHTML = "";
        main.appendChild(showBoard(gameBoard, `Place your ${ship.type}`));
        setStart(main, cell, ship);
      });
    });
    main.appendChild(placementBoard);
  }

  function placeShips(main: HTMLElement, ship: ship | undefined) {
    if (ship === undefined) {
      main.innerHTML = "";
      main.appendChild(showBoard(gameBoard));
      return;
    }
    human ? humanPlace(main, ship) : aiPlace(ship);
  }

  function setStart(main: HTMLElement, cell: HTMLTableCellElement, ship: ship) {
    const start = getCoordinates(cell);
    document
      .querySelector(`[data-coordinates=y${start.y}_x${start.x}]`)
      ?.classList.add("bg-neutral-200");

    const possibleEnds = ship.possibleEnds(gameBoard, start);
    possibleEnds.forEach((endCoord) => {
      const endSpace = document.querySelector(
        `[data-coordinates=y${endCoord.y}_x${endCoord.x}]`
      );
      endSpace?.classList.add("bg-green-500");
      endSpace?.addEventListener("click", () => {
        gameBoard.placeShip(ship, start, endCoord);
        const nextShipIndex =
          gameBoard.ships.findIndex((listShip) => {
            return listShip.type === ship.type;
          }) + 1;
        placeShips(main, gameBoard.ships[nextShipIndex]);
      });
    });
  }

  return { attack, gameBoard, human, name, placeShips };
}

export { playerFactory };
