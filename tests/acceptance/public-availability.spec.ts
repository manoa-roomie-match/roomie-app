import { test } from '@playwright/test';
import { HomePage } from '../pom/home.page';

test.describe('Public availability', () => {
  test('home, how it works, contact, and signup are reachable', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();
    await home.goToHowItWorks();
    await home.openContact();

    await home.goto();
    await home.openSignupPrimary();
  });
});
