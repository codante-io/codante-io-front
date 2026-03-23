import { generateRandomInt } from "./numbers";

describe("generateRandomInt", () => {
  it("returns a value within the specified range", () => {
    for (let i = 0; i < 100; i++) {
      const result = generateRandomInt(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThan(10);
    }
  });

  it("returns min when min equals max - 1", () => {
    expect(generateRandomInt(5, 6)).toBe(5);
  });

  it("returns an integer", () => {
    const result = generateRandomInt(1, 100);
    expect(Number.isInteger(result)).toBe(true);
  });
});
