const { createBdd } = require('playwright-bdd');
const { expect } = require('@playwright/test');
const { test } = require('../support/fixtures');

const { Given, When, Then } = createBdd(test);

Given('the {string} tab is focused', async ({ page }, year) => {
  await page.locator(`#tab-${year}`).focus();
});

When('I click the {string} tab', async ({ page }, year) => {
  await page.locator(`#tab-${year}`).click();
});

Then('the {string} tab should be selected', async ({ page }, year) => {
  await expect(page.locator(`#tab-${year}`)).toHaveAttribute('aria-selected', 'true');
});

Then('the {string} tab should not be selected', async ({ page }, year) => {
  await expect(page.locator(`#tab-${year}`)).toHaveAttribute('aria-selected', 'false');
});

Then('the {string} tab should be focused', async ({ page }, year) => {
  await expect(page.locator(`#tab-${year}`)).toBeFocused();
});

Then('the {string} achievements panel should be visible', async ({ page }, year) => {
  await expect(page.locator(`#panel-${year}`)).toBeVisible();
});

Then('the {string} achievements panel should be hidden', async ({ page }, year) => {
  await expect(page.locator(`#panel-${year}`)).toBeHidden();
});
