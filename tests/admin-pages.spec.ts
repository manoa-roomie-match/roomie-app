import { test, expect } from '@playwright/test';

test.use({
  storageState: 'admin-auth.json',
});

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('#admin-dashboard-nav').click();
  await page.getByRole('link', { name: 'Manage Users' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('button', { name: 'Admin Dashboard' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('button', { name: 'Manage Users' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('button', { name: 'admin@foo.com' }).click();
  await page.getByRole('link', { name: 'View Profile' }).click();
  await page.getByRole('button', { name: 'admin@foo.com' }).click();
  await page.getByRole('link', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();

  await page.goto('http://localhost:3000/');
  await expect(page.locator('#admin-dashboard-nav')).toBeVisible();
  await expect(page.locator('#manage-users-nav')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Create Profile' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Admin Dashboard' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Manage Users' })).toBeVisible();
  await page.getByRole('button', { name: 'admin@foo.com' }).click();
  await page.getByRole('button', { name: 'admin@foo.com' }).click();
  await expect(page.getByRole('button', { name: 'admin@foo.com' })).toBeVisible();
  await page.getByRole('button', { name: 'admin@foo.com' }).click();
  await page.getByRole('button', { name: 'admin@foo.com' }).click();
  await page.getByRole('button', { name: 'admin@foo.com' }).click();
  await page.getByRole('link', { name: 'View Profile' }).click();
  await expect(page.getByText('Edit ProfileJane')).toBeVisible();
});
