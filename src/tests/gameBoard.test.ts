import { beforeEach, describe, expect, test } from "vitest";
import { gameBoardFactory } from "../gameboard";
import { shipFactory } from "../ship";

describe("gameBoardFactory()", () => {
  test("returns a gameBoard", () => {
    expect(gameBoardFactory()).toHaveProperty("allSunk");
    expect(gameBoardFactory()).toHaveProperty("placeShip");
    expect(gameBoardFactory()).toHaveProperty("receiveAttack");
    expect(gameBoardFactory()).toHaveProperty("rows");
    expect(gameBoardFactory()).toHaveProperty("ships");
  });

  describe("rows", () => {
    const rows = gameBoardFactory().rows;

    test("is 2D, 10x10 array", () => {
      expect(rows.length).toBe(10);
      expect(rows[0].length).toBe(10);
    });

    test("default element is blank space", () => {
      const space = rows[0][0];

      expect(space).toHaveProperty("ship");
      expect(space).toHaveProperty("hit");
      expect(space).toHaveProperty("missed");
    });
  });

  describe("ships", () => {
    const ships = gameBoardFactory().ships;
    const shipTypes: shipType[] = [
      "Carrier",
      "Battleship",
      "Destroyer",
      "Submarine",
      "Patrol Boat",
    ];

    test("creates 5 ships", () => {
      expect(ships.length).toBe(5);
    });

    test.each(shipTypes)("has %s", (type) => {
      const shipsNames = ships.map((ship) => {
        return ship.type;
      });
      expect(shipsNames.includes(type));
    });
  });

  describe("allSunk()", () => {
    let board: gameBoard;
    let ships: ship[];

    beforeEach(async () => {
      board = gameBoardFactory();
      ships = board.ships;
    });

    test("returns false when none sunk", () => {
      expect(board.allSunk()).toBe(false);
    });

    test("returns false when < 5 sunk", () => {
      // Sink the first ship
      for (let i = 0; i < ships[0].length; i++) {
        ships[0].hit();
      }
      expect(board.allSunk()).toBe(false);
    });

    test("returns true when all 5 sunk", () => {
      // Sink all ships
      ships.forEach((ship) => {
        for (let i = 0; i < ship.length; i++) {
          ship.hit();
        }
      });

      expect(board.allSunk()).toBe(true);
    });
  });

  describe("placeShip", () => {
    let board: gameBoard;
    let battleship: ship;

    beforeEach(async () => {
      board = gameBoardFactory();
      battleship = shipFactory("Battleship");
    });

    test("places a ship correctly", () => {
      board.placeShip(battleship, { x: 0, y: 0 }, { x: 4, y: 0 });
      expect(board.rows[0][0].ship).toBe(battleship);
    });

    test("does not allow end further than ship length", () => {
      const response = board.placeShip(
        battleship,
        { x: 0, y: 0 },
        { x: 9, y: 0 }
      );
      expect(response).toBe("Your ship isn't long enough");
    });

    test("does not allow end further than ship length", () => {
      const response = board.placeShip(
        battleship,
        { x: 0, y: 0 },
        { x: 1, y: 0 }
      );
      expect(response).toBe("Your ship is longer than that");
    });

    test("does not allow overlapping ships", () => {
      board.placeShip(battleship, { x: 0, y: 0 }, { x: 4, y: 0 });
      const carrier = shipFactory("Carrier");
      const response = board.placeShip(carrier, { x: 0, y: 0 }, { x: 0, y: 5 });
      expect(response).toBe("That overlaps an existing ship");
    });
  });
});
