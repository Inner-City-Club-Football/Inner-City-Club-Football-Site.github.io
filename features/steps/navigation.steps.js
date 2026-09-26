const { createBdd } = require('playwright-bdd');
const { expect } = require('@playwright/test');
const { test } = require('../support/fixtures');

const { When, Then } = createBdd(test);

Then('the {string} button should be hidden', async ({ page }, className) => {
  await expect(page.locator(`.${className}`)).toBeHidden();
});

Then('the {string} button should be visible', async ({ page }, className) => {
  await expect(page.locator(`.${className}`)).toBeVisible();
});

Then('the {string} navigation should be visible', async ({ page }, id) => {
  await expect(page.locator(`#${id}`)).toBeVisible();
});

Then('the {string} navigation should be hidden', async ({ page }, id) => {
  await expect(page.locator(`#${id}`)).toBeHidden();
});

Then('the {string} dropdown should be visible', async ({ page }, id) => {
  await expect(page.locator(`#${id}`)).toBeVisible();
});

Then('the {string} dropdown should be hidden', async ({ page }, id) => {
  await expect(page.locator(`#${id}`)).toBeHidden();
});

When('I click the {string} dropdown toggle', async ({ page }, _label) => {
  await page.locator('.dropdown-toggle').click();
});

Then('the {string} dropdown toggle should be expanded', async ({ page }, _label) => {
  await expect(page.locator('.dropdown-toggle')).toHaveAttribute('aria-expanded', 'true');
});

Then('the {string} dropdown toggle should be collapsed', async ({ page }, _label) => {
  await expect(page.locator('.dropdown-toggle')).toHaveAttribute('aria-expanded', 'false');
});

When('I click outside the navigation', async ({ page }) => {
  await page.locator('body').click({ position: { x: 10, y: 10 } });
});

Then('the nav link marked as current should read {string}', async ({ page }, text) => {
  await expect(page.locator('a[aria-current="page"]')).toHaveText(text);
});

When('I click the mobile menu toggle', async ({ page }) => {
  await page.locator('.nav-toggle').click();
});

Then('the mobile menu toggle should be expanded', async ({ page }) => {
  await expect(page.locator('.nav-toggle')).toHaveAttribute('aria-expanded', 'true');
});

Then('the mobile menu toggle should be collapsed', async ({ page }) => {
  await expect(page.locator('.nav-toggle')).toHaveAttribute('aria-expanded', 'false');
});

When('I click the {string} nav link', async ({ page }, linkText) => {
  await page.locator(`#primary-nav a`, { hasText: linkText }).click();
});
