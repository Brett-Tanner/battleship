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
