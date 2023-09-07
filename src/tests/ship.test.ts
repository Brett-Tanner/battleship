import { describe, expect, test } from "vitest";
import { shipFactory } from "../controllers/ship";
import { gameBoardFactory } from "../controllers/gameBoard";

describe("shipFactory()", () => {
  const lengthMappings: lengthMapping[] = [
    { type: "Carrier", length: 5 },
    { type: "Battleship", length: 4 },
    { type: "Destroyer", length: 3 },
    { type: "Submarine", length: 3 },
    { type: "Patrol Boat", length: 2 },
  ];

  test.each(lengthMappings)("$type has length $length", ({ type, length }) => {
    expect(shipFactory(type).length).toBe(length);
  });

  test("returns a ship", () => {
    expect(shipFactory("Battleship")).toHaveProperty("length");
    expect(shipFactory("Battleship")).toHaveProperty("hit");
    expect(shipFactory("Battleship")).toHaveProperty("sunk");
    expect(shipFactory("Battleship")).toHaveProperty("type");
  });

  describe("sunk()", () => {
    test("is not sunk by default", () => {
      const ship = shipFactory("Patrol Boat");
      expect(ship.sunk()).toBe(false);
    });

    test.each(lengthMappings)(
      "$type sinks after $length hits",
      ({ type, length }) => {
        const ship = shipFactory(type);
        for (let i = 0; i < length; i++) {
          ship.hit();
        }
        expect(ship.sunk()).toBe(true);
      }
    );
  });

  describe("possibleEnds()", () => {
    const ship = shipFactory("Patrol Boat");

    test("returns an array of coordinates", () => {
      const returnValue = ship.possibleEnds({ y: 5, x: 5 });

      expect(returnValue).toContainEqual({ y: 6, x: 5 });
      expect(returnValue).toContainEqual({ y: 4, x: 5 });
      expect(returnValue).toContainEqual({ y: 5, x: 6 });
      expect(returnValue).toContainEqual({ y: 5, x: 4 });
    });

    test("two options in corner", () => {
      const returnValue = ship.possibleEnds({ y: 0, x: 9 });

      expect(returnValue).toEqual([
        { y: 1, x: 9 },
        { y: 0, x: 8 },
      ]);
    });

    test("three options on vertical edge", () => {
      const returnValue = ship.possibleEnds({ y: 5, x: 9 });

      expect(returnValue).toEqual([
        { y: 6, x: 9 },
        { y: 4, x: 9 },
        { y: 5, x: 8 },
      ]);
    });

    test("three options on horizontal edge", () => {
      const returnValue = ship.possibleEnds({ y: 0, x: 5 });

      expect(returnValue).toEqual([
        { y: 1, x: 5 },
        { y: 0, x: 6 },
        { y: 0, x: 4 },
      ]);
    });
  });
});
