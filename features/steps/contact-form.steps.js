const { createBdd } = require('playwright-bdd');
const { expect } = require('@playwright/test');
const { test } = require('../support/fixtures');

const { Given, When, Then } = createBdd(test);

const FORM_RESPONSE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeE4MSg2lSnxa2ZHyjmSF9xG2j0AFn9buNWlWP-M8gpgTttBQ/formResponse';

const VALID_DETAILS = {
  fullname: 'Jane Test',
  email: 'jane@example.com',
  message: 'This is a test message.',
};

Given('submissions to the Google Form endpoint are intercepted', async ({ page, scratch }) => {
  scratch.requestMade = false;
  await page.route(FORM_RESPONSE_URL, async (route) => {
    scratch.requestMade = true;
    scratch.requestBody = route.request().postData();
    await route.fulfill({ status: 200, body: '' });
  });
});

Given('the Google Form endpoint will fail to respond', async ({ page }) => {
  await page.unroute(FORM_RESPONSE_URL);
  await page.route(FORM_RESPONSE_URL, (route) => route.abort('failed'));
});

When('I fill in the contact form with valid details', async ({ page }) => {
  await page.locator('#cf-name').fill(VALID_DETAILS.fullname);
  await page.locator('#cf-email').fill(VALID_DETAILS.email);
  await page.locator('#cf-message').fill(VALID_DETAILS.message);
});

When('I submit the contact form', async ({ page }) => {
  await page.locator('#contact-form button[type="submit"]').click();
});

Then('the status message should eventually contain {string}', async ({ page }, text) => {
  await expect(page.locator('#contact-form-status')).toContainText(text, { timeout: 5000 });
});

Then('the submitted Google Form fields should match the details I entered', async ({ scratch }) => {
  const params = new URLSearchParams(scratch.requestBody);
  expect(params.get('entry.1905465433')).toBe(VALID_DETAILS.fullname);
  expect(params.get('entry.2003528403')).toBe(VALID_DETAILS.email);
  expect(params.get('entry.1945490493')).toBe(VALID_DETAILS.message);
});

Then('the status message should have the {string} style', async ({ page }, variant) => {
  await expect(page.locator('#contact-form-status')).toHaveClass(
    new RegExp(`contact-form__status--${variant}`),
  );
});

Then('the contact form should be hidden', async ({ page }) => {
  await expect(page.locator('#contact-form')).toBeHidden();
});

Then('the contact form should still be visible', async ({ page }) => {
  await expect(page.locator('#contact-form')).toBeVisible();
});

Then('no request should have been sent to the Google Form endpoint', async ({ page, scratch }) => {
  await page.waitForTimeout(300);
  expect(scratch.requestMade).toBe(false);
});

Then('the submit button should read {string}', async ({ page }, text) => {
  await expect(page.locator('#contact-form button[type="submit"]')).toHaveText(text);
});

Then('the submit button should be enabled', async ({ page }) => {
  await expect(page.locator('#contact-form button[type="submit"]')).toBeEnabled();
});
