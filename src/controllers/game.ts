import { playerForm } from "../components/input";
import { playerFactory } from "./player";

const main =
  document.getElementById("app") ||
  document.body.appendChild(document.createElement("main"));

// Start by showing player details form
main.appendChild(playerForm());

async function playGame(playerOne: playerData, playerTwo: playerData) {
  // Create the players when form is submitted
  const players = [
    playerFactory(playerOne.name, playerOne.human),
    playerFactory(playerTwo.name, playerTwo.human),
  ];

  // Render the board for each player, and allow them to place their ships
  await players[0].placeShips(main, players[0].gameBoard.ships[0]);
  await players[1].placeShips(main, players[1].gameBoard.ships[0]);

  // Render both boards, obscured for inactive player
  players[0].takeTurn(main, players[1]);
}

// TODO: remove after testing
// playGame({ name: "Vika", human: true }, { name: "Brett", human: false });

export { playGame };
