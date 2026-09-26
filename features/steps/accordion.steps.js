const { createBdd } = require('playwright-bdd');
const { expect } = require('@playwright/test');
const { test } = require('../support/fixtures');

const { When, Then } = createBdd(test);

When('I click the {string} accordion trigger', async ({ page }, panelId) => {
  await page.locator(`button[aria-controls="${panelId}"]`).click();
});

Then('the {string} accordion panel should be visible', async ({ page }, panelId) => {
  await expect(page.locator(`#${panelId}`)).toBeVisible();
});

Then('the {string} accordion panel should be hidden', async ({ page }, panelId) => {
  await expect(page.locator(`#${panelId}`)).toBeHidden();
});

Then('the {string} accordion panel should contain {string}', async ({ page }, panelId, text) => {
  await expect(page.locator(`#${panelId}`)).toContainText(text);
});

Then('the first accordion trigger should be collapsed', async ({ page }) => {
  await expect(page.locator('.accordion-trigger').first()).toHaveAttribute('aria-expanded', 'false');
});

Then('the {string} accordion trigger should be collapsed', async ({ page }, panelId) => {
  await expect(page.locator(`button[aria-controls="${panelId}"]`)).toHaveAttribute('aria-expanded', 'false');
});
