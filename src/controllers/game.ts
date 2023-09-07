import { showBoard } from "../components/board";
import { playerForm } from "../components/input";
import { playerFactory } from "./player";

const main =
  document.getElementById("app") ||
  document.body.appendChild(document.createElement("main"));

// TODO: uncomment when done testing
// Start by showing player details form
// main.appendChild(playerForm());

function playGame(playerOne: playerData, playerTwo: playerData) {
  // Create the players when form is submitted
  const players = [
    playerFactory(playerOne.name, playerOne.human),
    playerFactory(playerTwo.name, playerTwo.human),
  ];

  main.innerHTML = "";
  main.append(showBoard(players[0].gameBoard), showBoard(players[1].gameBoard));

  // Render the board for each player, and allow them to place their ships

  // Render both boards, obscured for inactive player, make moves
  // until allSunk() = true for one board
}

// TODO: remove after testing
playGame({ name: "Vika", human: true }, { name: "Brett", human: false });

export { playGame };
