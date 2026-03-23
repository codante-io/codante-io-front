import { render } from "@testing-library/react";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("renders a div with animate-pulse", () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveClass("animate-pulse");
  });

  it("merges custom className", () => {
    const { container } = render(<Skeleton className="h-10 w-full" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("h-10");
    expect(el).toHaveClass("w-full");
    expect(el).toHaveClass("animate-pulse");
  });

  it("passes through additional HTML attributes", () => {
    const { container } = render(<Skeleton data-testid="skel" />);
    expect(container.querySelector("[data-testid='skel']")).toBeInTheDocument();
  });
});
