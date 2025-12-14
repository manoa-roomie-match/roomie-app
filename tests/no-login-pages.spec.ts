import { test, expect } from '@playwright/test';
import { HomePage } from './pom/home.page';

test.describe('Public navigation', () => {
  test('visitor can reach key public sections', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.goToHowItWorks();
    await home.openContact();

    await home.goto();
    await home.openSignupPrimary();

    await home.goto();
    await page.getByRole('button', { name: /learn more/i }).click();
    await expect(page.locator('#how-it-works')).toBeVisible();
  });
});
