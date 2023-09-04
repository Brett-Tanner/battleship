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

  return { length, hit, sunk, type };
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
