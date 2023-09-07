import { playGame } from "../controllers/game";

function playerForm() {
  const form = document.createElement("form");

  const playerInputs = [1, 2].map((i) => {
    return playerInput(i);
  });

  const submitButton = document.createElement("button");
  submitButton.innerText = "Start Game";
  submitButton.classList.add(
    "text-4xl",
    "font-semibold",
    "p-3",
    "rounded",
    "bg-teal-800",
    "hover:bg-teal-700",
    "outline",
    "outline-teal-900",
    "focus-within:outline-teal-700"
  );
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const playerOne: playerData = getPlayerData(1);
    const playerTwo: playerData = getPlayerData(2);

    playGame(playerOne, playerTwo);
  });

  form.append(...playerInputs, submitButton);
  form.classList.add(
    "grow",
    "flex",
    "flex-wrap",
    "justify-around",
    "items-center"
  );
  return form;
}

function getPlayerData(i: number) {
  const nameInput = document.getElementById(`name${i}`);
  if (nameInput === null || !(nameInput instanceof HTMLInputElement))
    throw new Error(`Name input missing for player ${i}`);
  const name = nameInput.value;

  const humanInput = document.getElementById(`human${i}`);
  if (humanInput === null || !(humanInput instanceof HTMLInputElement))
    throw new Error(`Humanity missing for player ${i}`);
  const human = humanInput.value === "1" ? true : false;

  return { name, human };
}

function playerInput(i: number) {
  const container = document.createElement("div");

  const heading = document.createElement("h1");
  heading.innerText = `Player ${i}`;
  heading.classList.add("font-bold", "text-5xl");

  const nameContainer = document.createElement("div");

  const nameLabel = document.createElement("label");
  nameLabel.htmlFor = `name${i}`;
  nameLabel.innerText = "Name";
  nameLabel.classList.add("font-semibold", "text-2xl");

  const nameInput = document.createElement("input");
  nameInput.id = `name${i}`;
  if (i === 1) nameInput.autofocus = true;
  nameInput.placeholder = `Player ${i} Name`;
  nameInput.classList.add(
    "text-slate-900",
    "h-10",
    "rounded",
    "text-center",
    "outline",
    "focus-within:outline-slate-500"
  );

  nameContainer.append(nameLabel, nameInput);
  nameContainer.classList.add("flex", "flex-col", "gap-3");

  const humanContainer = document.createElement("div");

  const humanLabel = document.createElement("label");
  humanLabel.innerText = "Human?";
  humanLabel.classList.add("font-semibold", "text-2xl");

  const humanInput = document.createElement("input");
  humanInput.id = `human${i}`;
  humanInput.type = "checkbox";
  humanInput.classList.add("h-8");

  humanContainer.append(humanLabel, humanInput);
  humanContainer.classList.add("flex", "gap-3");

  container.append(heading, nameContainer, humanContainer);
  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "gap-6",
    "p-6",
    "basis-1/2"
  );
  return container;
}

export { playerForm };
