function shipFactory(type: shipType): ship {
  const length = lengthFromType(type);
  let hitCount = 0;

  const hit = () => {
    hitCount++;
    return hitCount;
  };

  const sunk = () => {
    return hitCount >= length;
  };

  function noCollisions(
    board: gameBoard,
    start: coordinates,
    end: coordinates
  ) {
    const yChange = start.y - end.y;
    const xChange = start.x - end.x;
    let crossedSpaces = [];

    if (yChange !== 0) {
      for (let i = 0; i < length; i++) {
        const space =
          yChange > 0
            ? board.rows[start.y - i][start.x]
            : board.rows[start.y + i][start.x];
        crossedSpaces.push(space);
      }
    } else {
      for (let i = 0; i < length; i++) {
        const space =
          xChange > 0
            ? board.rows[start.y][start.x - i]
            : board.rows[start.y][start.x + i];
        crossedSpaces.push(space);
      }
    }

    return crossedSpaces.some((space) => space.ship) ? false : true;
  }

  function possibleEnds(board: gameBoard, currentCoords: coordinates) {
    const ends: coordinates[] = [];

    const down = { y: currentCoords.y + length - 1, x: currentCoords.x };
    if (down.y >= 0 && down.y <= 9 && noCollisions(board, currentCoords, down))
      ends.push(down);

    const up = { y: currentCoords.y - length + 1, x: currentCoords.x };
    if (up.y >= 0 && up.y <= 9 && noCollisions(board, currentCoords, up))
      ends.push(up);

    const right = { y: currentCoords.y, x: currentCoords.x + length - 1 };
    if (
      right.x >= 0 &&
      right.x <= 9 &&
      noCollisions(board, currentCoords, right)
    )
      ends.push(right);

    const left = { y: currentCoords.y, x: currentCoords.x - length + 1 };
    if (left.x >= 0 && left.x <= 9 && noCollisions(board, currentCoords, left))
      ends.push(left);

    return ends;
  }

  return { length, type, hit, possibleEnds, sunk };
}

function lengthFromType(type: shipType) {
  switch (type) {
    case "Carrier":
      return 5;
    case "Battleship":
      return 4;
    case "Destroyer":
      return 3;
    case "Submarine":
      return 3;
    case "Patrol Boat":
      return 2;
    default:
      throw new Error("That's not a real ship type!");
  }
}

export { shipFactory };
