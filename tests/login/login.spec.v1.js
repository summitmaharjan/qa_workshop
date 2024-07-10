const { test, expect } = require("@playwright/test");
const testData = require("../../Fixtures/Login.fixture.json");
const { LoginPage } = require("../../pageObjects/login.po");

// const { beforeEach } = require("node:test");

test.beforeEach(async ({ page }) => {
  await page.goto("./");
});

test("has title", async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Test Login | Practice Test Automation/);
});

test.describe("valid login tests", () => {
  test("login valid", async ({ page }) => {
    await page.locator("#username").fill(testData.validUser.username);
    await page.locator("#password").fill(testData.validUser.password);
    await page.locator("#submit").click();

    await expect(page.locator(".post-title")).toHaveText(
      /Logged In Successfully/
    );
  });
});

test.describe("invalid login tests", () => {
  test("login invalid", async ({ page }) => {
    await page
      .locator("#username")
      .fill(testData.invalidUser.invalidCredentials.username);
    await page
      .locator("#password")
      .fill(testData.invalidUser.invalidCredentials.password);
    await page.locator("#submit").click();
    const errorMessage = await page.locator("#error").textContent();
    expect(errorMessage).toContain("Your username is invalid!");
  });

  test("empty field", async ({ page }) => {
    await page
      .locator("#username")
      .fill(testData.invalidUser.emptyField.username);
    await page
      .locator("#password")
      .fill(testData.invalidUser.emptyField.password);
    await page.locator("#submit").click();
    const errorMessage = await page.locator("#error").textContent();
    expect(errorMessage).toContain("Your username is invalid!");
  });

  test("username empty", async ({ page }) => {
    await page
      .locator("#username")
      .fill(testData.invalidUser.emptyUsername.username);
    await page
      .locator("#password")
      .fill(testData.invalidUser.emptyUsername.password);
    await page.locator("#submit").click();
    const errorMessage = await page.locator("#error").textContent();
    expect(errorMessage).toContain("Your username is invalid!");
  });

  test("Password empty", async ({ page }) => {
    await page
      .locator("#username")
      .fill(testData.invalidUser.emptyPassword.username);
    await page
      .locator("#password")
      .fill(testData.invalidUser.emptyPassword.password);

    console.log(testData.invalidUser.emptyPassword.password);
    await page.locator("#submit").click();
    const errorMessage = await page.locator("#error").textContent();
    expect(errorMessage).toContain("Your password is invalid!");
  });

  test("username with leading space", async ({ page }) => {
    await page
      .locator("#username")
      .fill(testData.invalidUser.usernameLeadingSpace.username);
    await page
      .locator("#password")
      .fill(testData.invalidUser.usernameLeadingSpace.password);
    await page.locator("#submit").click();
    const errorMessage = await page.locator("#error").textContent();
    expect(errorMessage).toContain("Your username is invalid!");
  });

  test("password with leading space", async ({ page }) => {
    await page
      .locator("#username")
      .fill(testData.invalidUser.passwordLeadingSpace.username);
    await page
      .locator("#password")
      .fill(testData.invalidUser.passwordLeadingSpace.password);
    await page.locator("#submit").click();
    const errorMessage = await page.locator("#error").textContent();
    expect(errorMessage).toContain("Your password is invalid!");
  });
});
