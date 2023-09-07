function showBoard(board: gameBoard) {
  const domBoard = document.createElement("table");

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
    domSpace.dataset.coordinates = `${rowIndex}${spaceIndex}`;

    if (space.ship) domSpace.appendChild(shipMarker());
    if (space.hit) domSpace.appendChild(hitMarker());
    if (space.missed) domSpace.appendChild(missMarker());

    domSpace.classList.add("border", "border-neutral-200");
    return domSpace;
  });

  domRow.append(...domSpaces);
  return domRow;
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

export { showBoard };
