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

  function possibleEnds(currentCoords: coordinates) {
    const ends: coordinates[] = [];
    const down = currentCoords.y + length - 1;
    if (down >= 0 && down <= 9) ends.push({ y: down, x: currentCoords.x });
    const up = currentCoords.y - length + 1;
    if (up >= 0 && up <= 9) ends.push({ y: up, x: currentCoords.x });
    const right = currentCoords.x + length - 1;
    if (right >= 0 && right <= 9) ends.push({ y: currentCoords.y, x: right });
    const left = currentCoords.x - length + 1;
    if (left >= 0 && left <= 9) ends.push({ y: currentCoords.y, x: left });

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
