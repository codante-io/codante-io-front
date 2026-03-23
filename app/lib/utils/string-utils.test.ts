import { toTitleCase, generateSimpleLoremIpsum } from "./string-utils";

describe("toTitleCase", () => {
  it("capitalizes each word", () => {
    expect(toTitleCase("hello world")).toBe("Hello World");
  });

  it("handles single word", () => {
    expect(toTitleCase("hello")).toBe("Hello");
  });

  it("lowercases non-first characters", () => {
    expect(toTitleCase("HELLO WORLD")).toBe("Hello World");
  });

  it("handles empty string", () => {
    expect(toTitleCase("")).toBe("");
  });
});

describe("generateSimpleLoremIpsum", () => {
  it("returns a non-empty string", () => {
    expect(generateSimpleLoremIpsum().length).toBeGreaterThan(0);
  });

  it("contains pudim recipe text", () => {
    expect(generateSimpleLoremIpsum()).toContain("pudim");
  });
});
