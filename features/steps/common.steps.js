const { createBdd } = require('playwright-bdd');
const { expect } = require('@playwright/test');
const { test } = require('../support/fixtures');

const { Given, When, Then } = createBdd(test);

Given('I am on the {string} page', async ({ page }, path) => {
  await page.goto(path);
});

Given('I am using a desktop-sized viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
});

Given('I am using a mobile-sized viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
});

When('I press {string}', async ({ page }, key) => {
  await page.keyboard.press(key);
});

Then('the page title should match {string}', async ({ page }, titlePart) => {
  await expect(page).toHaveTitle(new RegExp(titlePart));
});

Then('the page should have exactly {int} {string} element', async ({ page }, count, selector) => {
  await expect(page.locator(selector)).toHaveCount(count);
});

Then('the skip link should point to {string}', async ({ page }, href) => {
  await expect(page.locator('a.skip-link')).toHaveAttribute('href', href);
});

Then('the {string} element should be visible', async ({ page }, selector) => {
  await expect(page.locator(selector)).toBeVisible();
});

Then('I should be on the {string} page', async ({ page }, pathFragment) => {
  await expect(page).toHaveURL(new RegExp(`${pathFragment}$`));
});
