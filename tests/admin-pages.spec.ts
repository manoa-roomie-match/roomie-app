import { test, expect } from '@playwright/test';
import { HomePage } from './pom/home.page';
import { AuthPage } from './pom/auth.page';

const ADMIN_EMAIL = 'admin@foo.com';
const ADMIN_PASSWORD = 'changeme';

test.describe('Admin navigation', () => {
  test('admin can sign in and reach dashboard and manage users', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.openLogin();

    const auth = new AuthPage(page);
    await auth.signIn(ADMIN_EMAIL, ADMIN_PASSWORD);

    // Admin-specific buttons on home page
    await expect(page.getByRole('button', { name: 'Admin Dashboard' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Manage Users' })).toBeVisible();
  });
});
