function showBoard(board: gameBoard, message?: string) {
  const domBoard = document.createElement("table");

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

  domBoard.classList.add("table-fixed", "border-collapse", "basis-1/2");
  return domBoard;
}

function createRow(row: space[], rowIndex: number) {
  const domRow = document.createElement("tr");

  const domSpaces = row.map((space) => {
    const spaceIndex = row.indexOf(space);
    const domSpace = document.createElement("td");
    domSpace.dataset.coordinates = `y${rowIndex}_x${spaceIndex}`;

    if (space.ship) domSpace.appendChild(shipMarker());
    if (space.hit) domSpace.appendChild(hitMarker());
    if (space.missed) domSpace.appendChild(missMarker());

    domSpace.classList.add("border", "border-neutral-200");
    return domSpace;
  });

  domRow.append(...domSpaces);
  return domRow;
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
  const marker = document.createElement("div");
  marker.classList.add("bg-red-600", "rounded-full", "h-1/2", "w-1/2");

  return marker;
}

function missMarker() {
  const marker = document.createElement("div");
  marker.classList.add("bg-neutral-200", "rounded-full", "h-3/4", "w-3/4");

  return marker;
}

function shipMarker() {
  const marker = document.createElement("div");
  marker.classList.add("bg-slate-400", "rounded-full", "h-3/4", "w-3/4");

  return marker;
}

export { getCoordinates, showBoard };
