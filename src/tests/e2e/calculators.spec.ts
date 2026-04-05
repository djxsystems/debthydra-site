import { test, expect } from "@playwright/test";

test.describe("Debt Snowball Calculator", () => {
  test("loads and shows the calculator form", async ({ page }) => {
    await page.goto("/tools/debt-snowball-calculator");
    await expect(page.getByRole("heading", { name: /Debt Snowball Calculator/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Calculate Payoff Plan/i })).toBeVisible();
  });

  test("calculates and shows results", async ({ page }) => {
    await page.goto("/tools/debt-snowball-calculator");
    await page.getByRole("button", { name: /Calculate Payoff Plan/i }).click();
    await expect(page.getByText(/Debt-Free In/i)).toBeVisible();
    await expect(page.getByText(/Total Interest/i)).toBeVisible();
  });

  test("results update when extra payment changes", async ({ page }) => {
    await page.goto("/tools/debt-snowball-calculator");

    // Calculate with $100 extra
    await page.getByRole("button", { name: /Calculate Payoff Plan/i }).click();
    const firstResult = await page.getByText(/Debt-Free In/i).textContent();

    // Change extra payment to $500
    const extraInput = page.getByLabel(/Extra monthly payment/i);
    await extraInput.fill("500");
    await page.getByRole("button", { name: /Calculate Payoff Plan/i }).click();
    const secondResult = await page.getByText(/Debt-Free In/i).textContent();

    // With more extra payment, should pay off faster
    expect(firstResult).not.toEqual(secondResult);
  });
});

test.describe("Auto Loan Calculator", () => {
  test("loads correctly", async ({ page }) => {
    await page.goto("/tools/auto-loan-calculator");
    await expect(page.getByRole("heading", { name: /Auto Loan Calculator/i })).toBeVisible();
  });

  test("shows monthly payment after calculation", async ({ page }) => {
    await page.goto("/tools/auto-loan-calculator");
    await page.getByRole("button", { name: /Calculate Monthly Payment/i }).click();
    await expect(page.getByText(/Monthly Payment/i)).toBeVisible();
  });
});

test.describe("Emergency Fund Calculator", () => {
  test("loads correctly", async ({ page }) => {
    await page.goto("/tools/emergency-fund-calculator");
    await expect(page.getByRole("heading", { name: /Emergency Fund Calculator/i })).toBeVisible();
  });

  test("shows result after calculation", async ({ page }) => {
    await page.goto("/tools/emergency-fund-calculator");
    await page.getByRole("button", { name: /Calculate Growth Plan/i }).click();
    await expect(page.getByText(/Goal Reached In/i)).toBeVisible();
  });
});

test.describe("Navigation", () => {
  test("homepage loads and shows hero text", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Stop letting debt run your life/i })).toBeVisible();
  });

  test("tools page links to all four calculators", async ({ page }) => {
    await page.goto("/tools");
    await expect(page.getByText("Debt Snowball Calculator")).toBeVisible();
    await expect(page.getByText("Debt Avalanche Calculator")).toBeVisible();
    await expect(page.getByText("Auto Loan Calculator")).toBeVisible();
    await expect(page.getByText("Emergency Fund Calculator")).toBeVisible();
  });

  test("guides page lists articles", async ({ page }) => {
    await page.goto("/guides");
    await expect(page.getByRole("heading", { name: /Guides/i })).toBeVisible();
  });
});
