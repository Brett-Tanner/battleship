import { beforeAll, describe, expect, test } from "vitest";
import { playerFactory } from "../controllers/player";
import { shipFactory } from "../controllers/ship";

const player = playerFactory("Viktoriia", true);
const opponent = playerFactory("Brett", true);

beforeAll(() => {
  const patrolBoat = shipFactory("Patrol Boat");
  opponent.gameBoard.placeShip(patrolBoat, { y: 6, x: 7 }, { y: 7, x: 7 });
});

describe("playerFactory", () => {
  test("returns a player", () => {
    expect(player).toHaveProperty("name");
    expect(player).toHaveProperty("human");
    expect(player).toHaveProperty("gameBoard");
    expect(player).toHaveProperty("attack");
  });
});

describe("attack()", () => {
  test("returns true if hit", () => {
    const returnValue = player.attack(opponent.gameBoard, { y: 7, x: 7 });

    expect(returnValue).toBe(true);
  });

  test("marks space hit if ship hit", () => {
    player.attack(opponent.gameBoard, { y: 7, x: 7 });
    const targetHit = opponent.gameBoard.rows[7][7].hit;

    expect(targetHit).toBe(true);
  });

  test("returns false if miss", () => {
    const returnValue = player.attack(opponent.gameBoard, { y: 0, x: 0 });

    expect(returnValue).toBe(false);
  });

  test("marks space missed if ship missed", () => {
    player.attack(opponent.gameBoard, { y: 0, x: 0 });
    const targetMissed = opponent.gameBoard.rows[0][0].missed;

    expect(targetMissed).toBe(true);
  });
});

describe("human attack()", () => {
  const human = playerFactory("Brett", true);

  test("provided coordinates are attacked", () => {
    human.attack(opponent.gameBoard, { y: 1, x: 1 });
    const targetHit = opponent.gameBoard.rows[1][1].missed;

    expect(targetHit).toBe(true);
  });
});

describe("AI attack()", () => {
  const ai = playerFactory("LeBlanc", false);

  test("random coordinates are attacked", () => {
    ai.attack(player.gameBoard);
    const attackedCount = player.gameBoard.rows.reduce((sum, row) => {
      return (
        sum +
        row.filter((space) => {
          return space.missed;
        }).length
      );
    }, 0);

    expect(attackedCount).toBe(1);
  });
});
