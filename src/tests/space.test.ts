import { describe, expect, test } from "vitest";
import { spaceFactory } from "../controllers/space";

describe("spaceFactory", () => {
  const space = spaceFactory();

  test("returns a space", () => {
    expect(space).toHaveProperty("ship");
    expect(space).toHaveProperty("hit");
    expect(space).toHaveProperty("missed");
    expect(space).toHaveProperty("possible");
  });

  test("initial ship value is null", () => {
    expect(space.ship).toBe(null);
  });

  test("initial hit value is false", () => {
    expect(space.hit).toBe(false);
  });

  test("initial miss value is false", () => {
    expect(space.missed).toBe(false);
  });
});
