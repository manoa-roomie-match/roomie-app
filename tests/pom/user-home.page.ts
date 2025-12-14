import { Page, expect } from '@playwright/test';

export class UserHomePage {
  constructor(private page: Page) {}

  async expectLoaded(email: string) {
    await expect(this.page.getByRole('button', { name: email, exact: true })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Browse' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Open' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Edit' })).toBeVisible();
  }

  async openRoommates() {
    await this.page.getByRole('button', { name: 'Browse' }).click();
    await expect(this.page.getByRole('heading', { name: /list/i })).toBeVisible();
  }

  async goHome() {
    await this.page.getByRole('link', { name: 'Home' }).click();
    await expect(this.page.getByRole('button', { name: 'Browse' })).toBeVisible();
  }

  async openMessages() {
    await this.page.getByRole('button', { name: 'Open' }).click();
    await expect(this.page.locator('main').getByText('Messages')).toBeVisible();
  }

  async openEditProfile() {
    await this.page.getByRole('button', { name: 'Edit' }).click();
    await expect(this.page.getByRole('heading', { name: /edit profile/i }).first()).toBeVisible();
  }
}
