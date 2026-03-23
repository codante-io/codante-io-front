import { formatName } from "./format-name";

describe("formatName", () => {
  it("capitalizes a single word", () => {
    expect(formatName("joão")).toBe("João");
  });

  it("capitalizes multiple words", () => {
    expect(formatName("maria silva")).toBe("Maria Silva");
  });

  it("handles all uppercase input", () => {
    expect(formatName("CARLOS SANTOS")).toBe("Carlos Santos");
  });

  it("trims whitespace", () => {
    expect(formatName("  ana  ")).toBe("Ana");
  });

  it("handles mixed case", () => {
    expect(formatName("jOÃO pEDRO")).toBe("João Pedro");
  });
});
