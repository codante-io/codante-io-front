import { render } from "@testing-library/react";
import Wave from "./index";

describe("Wave", () => {
  it("renders bottom wave as SVG", () => {
    const { container } = render(<Wave position="bottom" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders top wave with wrapper div", () => {
    const { container } = render(<Wave position="top" />);
    expect(container.querySelector(".relative")).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders different SVG paths for top and bottom", () => {
    const { container: bottomContainer } = render(<Wave position="bottom" />);
    const { container: topContainer } = render(<Wave position="top" />);

    const bottomPath = bottomContainer.querySelector("path")?.getAttribute("d");
    const topPath = topContainer.querySelector("path")?.getAttribute("d");
    expect(bottomPath).not.toBe(topPath);
  });
});
