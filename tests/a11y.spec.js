// Portfolio site — axe-core accessibility audit (WCAG 2.1 AA)
// Portfolio-only, dark theme.
const { test, expect } = require('@playwright/test');
const { AxeBuilder } = require('@axe-core/playwright');

const BASE = 'http://localhost:8000';

const pages = [
  '/',
  '/about.html',
  '/projects.html',
  '/projects/petfeeder-v2.html',
  '/404.html',
];

test.describe('axe-core accessibility', () => {
  for (const path of pages) {
    test(path, async ({ page }) => {
      const response = await page.goto(BASE + path);
      expect(response.status()).toBe(200);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      const violations = results.violations;
      console.log(`\n=== ${path}: ${violations.length} violations ===`);
      for (const v of violations) {
        console.log(`- ${v.id} (${v.impact}): ${v.description}`);
        console.log(`  help: ${v.helpUrl}`);
        for (const n of v.nodes.slice(0, 3)) {
          console.log(`    node: ${n.target.join(', ')}`);
        }
      }
      expect(violations.length).toBe(0);
    });
  }
});
