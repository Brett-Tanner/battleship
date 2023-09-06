import { describe, expect, test } from "vitest";
import { gameFactory } from "../controllers/game";

describe.todo("gameFactory", () => {
  test("returns a new game", () => {
    const playerOne = { name: "Brett", human: true };
    const playerTwo = { name: "Cortana", human: false };
    const game = gameFactory(playerOne, playerTwo);

    expect(game).toHaveProperty("players");
  });
});
