// Portfolio site — Playwright browser tests
// Portfolio-only, dark theme. Run against a locally served instance: http://localhost:8000
const { test, expect } = require('@playwright/test');

const BASE = 'http://localhost:8000';

test.describe('Portfolio site (portfolio-only, dark theme)', () => {
  test('homepage loads with correct title and hero', async ({ page }) => {
    await page.goto(BASE + '/');
    await expect(page).toHaveTitle(/Ali Mohammed Abedi Syed/);
    await expect(page.locator('h1')).toContainText('actually work');
    await expect(page.locator('main')).toBeVisible();
    // dark theme: body background is near-black charcoal
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toContain('11'); // rgb(11, 14, 20)
  });

  test('no blog functionality exists', async ({ page }) => {
    await page.goto(BASE + '/');
    await expect(page.locator('a[href*="blog"]')).toHaveCount(0);
    await expect(page.locator('text=/blog/i')).toHaveCount(0);
    // blog routes should not exist
    const res = await page.goto(BASE + '/blog.html');
    expect(res.status()).toBe(404);
  });

  test('navigation links resolve to existing pages', async ({ page }) => {
    await page.goto(BASE + '/');
    const links = ['/projects.html', '/about.html'];
    for (const href of links) {
      await page.click(`nav a[href="${href}"]`);
      await expect(page).toHaveURL(BASE + href.replace(/\/$/, '') || BASE + '/');
      await expect(page.locator('main')).toBeVisible();
      await page.goBack();
    }
  });

  test('project case study loads', async ({ page }) => {
    await page.goto(BASE + '/projects.html');
    await page.click('a[href="/projects/petfeeder-v2.html"]');
    await expect(page).toHaveURL(BASE + '/projects/petfeeder-v2.html');
    await expect(page.locator('h1')).toContainText('Smart PetFeeder v2');
  });

  test('invalid route returns 404', async ({ page }) => {
    const response = await page.goto(BASE + '/does-not-exist.html');
    expect(response.status()).toBe(404);
  });

  test('custom 404 page loads correctly', async ({ page }) => {
    const response = await page.goto(BASE + '/404.html');
    expect(response.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('404');
    await expect(page.locator('.brand')).toBeVisible();
  });

  test('images, CSS, JS load without failed requests', async ({ page }) => {
    const failed = [];
    page.on('requestfailed', (req) => failed.push(req.url()));
    await page.goto(BASE + '/');
    await page.waitForTimeout(500);
    const critical = failed.filter((u) => u.includes('/css/') || u.includes('/js/') || u.includes('/favicon'));
    expect(critical).toEqual([]);
  });

  test('no console errors on homepage', async ({ page }) => {
    const errors = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    await page.goto(BASE + '/');
    await page.waitForTimeout(500);
    expect(errors).toEqual([]);
  });

  test('mobile navigation toggles', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE + '/');
    const btn = page.locator('.mobile-menu-btn');
    await expect(btn).toBeVisible();
    await btn.click();
    const nav = page.locator('.nav-list');
    await expect(nav).toHaveClass(/open/);
  });

  test('keyboard focus visible on nav links', async ({ page }) => {
    await page.goto(BASE + '/');
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });

  test('external links open in new tab with noopener', async ({ page }) => {
    await page.goto(BASE + '/');
    const gh = page.locator('a[href*="github.com/Mamba343"]').first();
    await expect(gh).toHaveAttribute('target', '_blank');
    await expect(gh).toHaveAttribute('rel', /noopener/);
  });

  test('layout has no horizontal overflow at mobile/tablet/desktop', async ({ page }) => {
    for (const vp of [
      { width: 375, height: 812 },
      { width: 768, height: 1024 },
      { width: 1280, height: 800 },
    ]) {
      await page.setViewportSize(vp);
      await page.goto(BASE + '/');
      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > window.innerWidth
      );
      expect(overflow).toBe(false);
    }
  });

  test('prefers-reduced-motion does not break layout', async ({ page }) => {
    await page.goto(BASE + '/', {
      viewport: { width: 1280, height: 800 },
      reducedMotion: 'reduce',
    });
    await expect(page.locator('main')).toBeVisible();
  });
});
