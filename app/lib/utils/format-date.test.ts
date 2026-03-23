import { formatDate, formatDateDDMMYYYY } from "./format-date";

// Use datetime strings with T12:00:00 to avoid timezone-related date shifts
describe("formatDate", () => {
  it("formats date in pt-BR long format", () => {
    const result = formatDate("2024-01-15T12:00:00");
    expect(result).toContain("15");
    expect(result).toContain("janeiro");
    expect(result).toContain("2024");
  });

  it("formats different months correctly", () => {
    expect(formatDate("2024-06-01T12:00:00")).toContain("junho");
    expect(formatDate("2024-12-25T12:00:00")).toContain("dezembro");
  });
});

describe("formatDateDDMMYYYY", () => {
  it("formats date as DD/MM/YYYY", () => {
    expect(formatDateDDMMYYYY("2024-01-15T12:00:00")).toBe("15/01/2024");
  });

  it("pads single digit day and month", () => {
    expect(formatDateDDMMYYYY("2024-03-05T12:00:00")).toBe("05/03/2024");
  });
});
