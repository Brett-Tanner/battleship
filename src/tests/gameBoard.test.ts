import { beforeEach, describe, expect, test } from "vitest";
import { gameBoardFactory } from "../controllers/gameBoard";
import { shipFactory } from "../controllers/ship";

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

    test("places a ship vertically up", () => {
      board.placeShip(battleship, { y: 9, x: 0 }, { y: 6, x: 0 });

      expect(board.rows[9][0].ship).toBe(battleship);
      expect(board.rows[8][0].ship).toBe(battleship);
      expect(board.rows[7][0].ship).toBe(battleship);
      expect(board.rows[6][0].ship).toBe(battleship);
    });

    test("places a ship vertically down", () => {
      board.placeShip(battleship, { y: 3, x: 0 }, { y: 6, x: 0 });

      expect(board.rows[3][0].ship).toBe(battleship);
      expect(board.rows[4][0].ship).toBe(battleship);
      expect(board.rows[5][0].ship).toBe(battleship);
      expect(board.rows[6][0].ship).toBe(battleship);
    });

    test("places a ship horizontally right", () => {
      board.placeShip(battleship, { y: 0, x: 4 }, { y: 0, x: 7 });

      expect(board.rows[0][4].ship).toBe(battleship);
      expect(board.rows[0][5].ship).toBe(battleship);
      expect(board.rows[0][6].ship).toBe(battleship);
      expect(board.rows[0][7].ship).toBe(battleship);
    });

    test("places a ship horizontally left", () => {
      board.placeShip(battleship, { y: 0, x: 3 }, { y: 0, x: 0 });

      expect(board.rows[0][3].ship).toBe(battleship);
      expect(board.rows[0][2].ship).toBe(battleship);
      expect(board.rows[0][1].ship).toBe(battleship);
      expect(board.rows[0][0].ship).toBe(battleship);
    });

    test("does not overflow start/end", () => {
      board.placeShip(battleship, { y: 1, x: 4 }, { y: 1, x: 1 });

      expect(board.rows[1][0].ship).toBe(null);
      expect(board.rows[1][5].ship).toBe(null);
    });

    test("does not allow end further than ship length", () => {
      expect(() =>
        board.placeShip(battleship, { y: 0, x: 0 }, { y: 0, x: 9 })
      ).toThrowError(
        "Your coordinates cover 10 spaces on the X-axis; your ship covers 4 spaces"
      );
    });

    test("does not allow end shorter than ship length", () => {
      expect(() =>
        board.placeShip(battleship, { y: 0, x: 0 }, { y: 0, x: 1 })
      ).toThrowError(
        "Your coordinates cover 2 spaces on the X-axis; your ship covers 4 spaces"
      );
    });

    test("does not allow overlapping ships", () => {
      board.placeShip(battleship, { y: 0, x: 0 }, { y: 0, x: 3 });
      const carrier = shipFactory("Carrier");
      expect(() => {
        board.placeShip(carrier, { y: 0, x: 0 }, { y: 4, x: 0 });
      }).toThrowError("That space is occupied by a Battleship");
    });
  });

  describe("receiveAttack()", () => {
    let board: gameBoard;
    let patrolBoat: ship;

    beforeEach(async () => {
      board = gameBoardFactory();
      patrolBoat = shipFactory("Patrol Boat");
    });

    test("returns true if hit", () => {
      board.placeShip(patrolBoat, { y: 9, x: 9 }, { y: 9, x: 8 });
      const returnValue = board.receiveAttack({ y: 9, x: 9 });

      expect(returnValue).toBe(true);
    });

    test("places hit marker if hit", () => {
      board.placeShip(patrolBoat, { y: 9, x: 9 }, { y: 9, x: 8 });
      board.receiveAttack({ y: 9, x: 9 });
      const spaceHit = board.rows[9][9].hit;

      expect(spaceHit).toBe(true);
    });

    test("returns false if miss", () => {
      board.placeShip(patrolBoat, { y: 5, x: 5 }, { y: 6, x: 5 });
      const returnValue = board.receiveAttack({ y: 9, x: 9 });

      expect(returnValue).toBe(false);
    });

    test("places miss marker if miss", () => {
      board.placeShip(patrolBoat, { y: 9, x: 9 }, { y: 9, x: 8 });
      board.receiveAttack({ y: 5, x: 5 });
      const spaceHit = board.rows[5][5].missed;

      expect(spaceHit).toBe(true);
    });
  });
});
