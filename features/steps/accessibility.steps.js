const { createBdd } = require('playwright-bdd');
const { expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const { test } = require('../support/fixtures');

const { Then } = createBdd(test);

Then('an automated accessibility scan should report no violations', async ({ page }) => {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    // Third-party embeds (Google Maps/Forms, the Facebook page plugin) are
    // outside our control and outside this site's conformance scope.
    .exclude('iframe')
    .analyze();

  const violations = results.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    help: v.help,
    nodes: v.nodes.map((n) => n.target),
  }));

  expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
});
