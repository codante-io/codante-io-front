import classNames from "./class-names";

describe("classNames", () => {
  it("joins multiple class names", () => {
    expect(classNames("foo", "bar")).toBe("foo bar");
  });

  it("filters out falsy values", () => {
    expect(classNames("foo", false, null, undefined, 0, "", "bar")).toBe(
      "foo bar",
    );
  });

  it("returns empty string with no truthy inputs", () => {
    expect(classNames(false, null, undefined)).toBe("");
  });
});
