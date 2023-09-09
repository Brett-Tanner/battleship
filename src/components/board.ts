function showBoard(board: gameBoard, message?: string, obscured?: boolean) {
  const domBoard = document.createElement("table");

  function createRow(row: space[], rowIndex: number) {
    const domRow = document.createElement("tr");

    const domSpaces = row.map((space) => {
      const spaceIndex = row.indexOf(space);
      const domSpace = document.createElement("td");
      domSpace.dataset.coordinates = `y${rowIndex}_x${spaceIndex}`;

      if (space.ship && !obscured) {
        domSpace.appendChild(shipMarker(space));
      } else {
        if (space.hit) domSpace.appendChild(hitMarker());
        if (space.missed) domSpace.appendChild(missMarker());
      }

      domSpace.classList.add(
        "border",
        "border-neutral-200",
        "w-[10%]",
        "h-[10%]"
      );
      return domSpace;
    });

    domRow.append(...domSpaces);
    return domRow;
  }

  if (message) {
    const caption = document.createElement("caption");
    caption.innerText = message;
    caption.classList.add("p-3", "text-2xl", "text-center", "font-semibold");
    domBoard.appendChild(caption);
  }

  board.rows.forEach((row) => {
    const rowIndex = board.rows.indexOf(row);

    domBoard.appendChild(createRow(row, rowIndex));
  });

  domBoard.classList.add("table-fixed", "border-collapse", "basis-[40%]");
  return domBoard;
}

function addAttackListeners(
  main: HTMLElement,
  board: HTMLTableElement,
  player: player,
  defender: player
) {
  return new Promise<void>((resolve) => {
    board.querySelectorAll("td").forEach((cell) => {
      cell.addEventListener("click", () => {
        const ship = player.attack(defender.gameBoard, getCoordinates(cell));
        ship ? cell.appendChild(hitMarker()) : cell.appendChild(missMarker());
        main.removeChild(board);
        if (ship) {
          main.appendChild(
            showBoard(
              defender.gameBoard,
              `You ${ship.sunk() ? "sunk" : "hit"} my ${ship.type}`,
              true
            )
          );
        } else {
          main.appendChild(
            showBoard(defender.gameBoard, "You missed :p", true)
          );
        }
        resolve();
      });
    });
    main.appendChild(board);
  });
}

function getCoordinates(cell: HTMLTableCellElement) {
  const dataCoords = cell.dataset.coordinates?.split("_");
  if (
    dataCoords === undefined ||
    dataCoords.some((point) => point === undefined)
  ) {
    throw new Error("Dataset coordinates are missing");
  }
  const y = parseInt(dataCoords[0].split("")[1]);
  const x = parseInt(dataCoords[1].split("")[1]);

  return { y: y, x: x };
}

function hitMarker() {
  const container = document.createElement("div");

  const marker = document.createElement("div");
  marker.classList.add("bg-red-600", "rounded-full", "h-3", "w-3");

  container.appendChild(marker);
  container.classList.add("flex", "justify-center", "items-center");
  return container;
}

function missMarker() {
  const container = document.createElement("div");

  const marker = document.createElement("div");
  marker.classList.add("bg-neutral-200", "rounded-full", "h-3", "w-3");

  container.appendChild(marker);
  container.classList.add("flex", "justify-center", "items-center");
  return container;
}

function shipMarker(space: space) {
  const container = document.createElement("div");

  const marker = document.createElement("div");
  marker.classList.add("bg-slate-400", "rounded-full", "h-5", "w-5");

  if (space.hit) marker.appendChild(hitMarker());
  if (space.missed) marker.appendChild(missMarker());

  marker.classList.add("flex", "justify-center", "items-center");
  container.appendChild(marker);
  container.classList.add("flex", "justify-center", "items-center");
  return container;
}

export { addAttackListeners, getCoordinates, showBoard };
