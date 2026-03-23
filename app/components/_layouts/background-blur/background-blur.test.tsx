import { render } from "@testing-library/react";
import BackgroundBlur from "./index";

describe("BackgroundBlur", () => {
  it("renders two blur elements", () => {
    const { container } = render(<BackgroundBlur />);
    const blurElements = container.querySelectorAll("[aria-hidden='true']");
    expect(blurElements).toHaveLength(2);
  });

  it("has blur-3xl class on containers", () => {
    const { container } = render(<BackgroundBlur />);
    const elements = container.querySelectorAll(".blur-3xl");
    expect(elements).toHaveLength(2);
  });

  it("renders gradient divs inside", () => {
    const { container } = render(<BackgroundBlur />);
    const gradients = container.querySelectorAll(".bg-linear-to-tr");
    expect(gradients).toHaveLength(2);
  });
});
