import { describe, expect, test } from "vitest";
import { shipFactory } from "../ship.ts";

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
});
