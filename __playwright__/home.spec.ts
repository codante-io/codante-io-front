import { test, expect } from "@playwright/test";

test("Should render main header", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const headerEl = page.getByText("Evolua na programação front-end");
  expect(await headerEl.textContent()).toEqual(
    "Evolua na programação front-end",
  );
});

test("Should render card with devs number", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const cardEl = page.getByText("Junte-se à nossa comunidade de ");
  expect(await cardEl.textContent()).toEqual(
    "Junte-se à nossa comunidade de 2000 devs que estão evoluindo suas habilidades de front-end.",
  );
});
