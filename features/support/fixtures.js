// Extends the base Playwright test with a per-scenario `scratch` fixture,
// used to pass values (e.g. an intercepted request body) between Given/When/Then
// steps that belong to the same scenario.
const { test: base } = require('playwright-bdd');

exports.test = base.extend({
  scratch: async ({}, use) => {
    await use({});
  },
});
