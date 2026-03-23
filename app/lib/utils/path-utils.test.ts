import { getOgGeneratorUrl, setActiveClassForPath } from "./path-utils";
import type { UIMatch } from "react-router";

const makeMatches = (pathname: string): UIMatch[] =>
  [{ pathname }] as UIMatch[];

describe("getOgGeneratorUrl", () => {
  it("generates URL with title only", () => {
    expect(getOgGeneratorUrl("Blog do Codante")).toBe(
      "https://og.codante.io/api/blog-do-codante",
    );
  });

  it("generates URL with title and subtitle", () => {
    expect(getOgGeneratorUrl("Meu Post", "React Router")).toBe(
      "https://og.codante.io/api/react-router/meu-post",
    );
  });
});

describe("setActiveClassForPath", () => {
  it("returns className on exact match", () => {
    const matches = makeMatches("/blog");
    expect(setActiveClassForPath(matches, "/blog", "active")).toBe("active");
  });

  it("returns empty string on exact mismatch", () => {
    const matches = makeMatches("/about");
    expect(setActiveClassForPath(matches, "/blog", "active")).toBe("");
  });

  it("matches with startsWith", () => {
    const matches = makeMatches("/blog/my-post");
    expect(
      setActiveClassForPath(matches, "/blog", "active", "startsWith"),
    ).toBe("active");
  });

  it("matches with endsWith", () => {
    const matches = makeMatches("/dashboard/settings");
    expect(
      setActiveClassForPath(matches, "/settings", "active", "endsWith"),
    ).toBe("active");
  });

  it("matches with includes", () => {
    const matches = makeMatches("/app/mini-projetos/react");
    expect(
      setActiveClassForPath(matches, "mini-projetos", "active", "includes"),
    ).toBe("active");
  });

  it("returns empty string when no matches exist", () => {
    expect(setActiveClassForPath([], "/blog", "active")).toBe("");
  });
});
