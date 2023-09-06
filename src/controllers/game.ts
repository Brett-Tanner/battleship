import { playerForm } from "../components/input";

const main =
  document.getElementById("app") ||
  document.body.appendChild(document.createElement("main"));

main.appendChild(playerForm());
