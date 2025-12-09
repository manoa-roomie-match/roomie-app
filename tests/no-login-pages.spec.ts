import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('link', { name: 'How It Works' }).click();
  await expect(page.locator('#how-it-works')).toBeVisible();
  await page.locator('#basic-navbar-nav').getByRole('link', { name: 'Contact Us' }).click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('button', { name: 'Get Started', exact: true }).click();
  await expect(page.locator('div').filter({ hasText: 'Sign UpEmailPasswordConfirm' }).nth(1)).toBeVisible();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('button', { name: 'Learn More' }).click();
  await expect(page.locator('#how-it-works')).toBeVisible();
});
