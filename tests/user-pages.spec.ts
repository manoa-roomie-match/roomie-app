import { test, expect } from '@playwright/test';

test.use({
  storageState: 'user-auth.json',
});

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Browse' }).click();
  await page.getByRole('button', { name: 'Send Message' }).first().click();
  await page.getByRole('textbox', { name: 'Type a message...' }).click();
  await page.getByRole('textbox', { name: 'Type a message...' }).fill('hi');
  await page.getByRole('button', { name: 'Jessica Lee Jessica Lee hi' }).click();
  await page.getByRole('link', { name: 'View Roommate Listings' }).click();
  await page.getByRole('link', { name: 'My Messages' }).click();
  await page.getByRole('button', { name: 'Jessica Lee Jessica Lee hi' }).click();
  await page.getByRole('link', { name: 'Edit Profile' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('button', { name: 'john@foo.com' }).click();
  await page.getByRole('link', { name: 'View Profile' }).click();
  await page.getByRole('button', { name: 'Edit Profile' }).click();

  await expect(page.getByRole('link', { name: 'View Roommate Listings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Messages' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Edit Profile' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Create Profile' })).toBeVisible();
  await page.getByRole('button', { name: 'john@foo.com' }).click();
  await page.getByRole('link', { name: 'View Profile' }).click();
  await expect(page.getByText('Edit ProfileJohn')).toBeVisible();
  await page.getByRole('link', { name: 'View Roommate Listings' }).click();
  await expect(page.getByText('Filtering criteriaNameHobbiesMajorCleanlinessanyNoise toleranceanyCleanliness')).toBeVisible();
  await page.getByRole('link', { name: 'My Messages' }).click();
  await expect(page.locator('div').filter({ hasText: 'MessagesLoading...Jane' }).nth(2)).toBeVisible();
  await page.getByRole('button', { name: 'john@foo.com' }).click();
});
