import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
    await expect(this.page.getByRole('link', { name: 'Home' })).toBeVisible();
  }

  async goToHowItWorks() {
    await this.page.getByRole('link', { name: 'How It Works' }).click();
    await expect(this.page.locator('#how-it-works')).toBeVisible();
  }

  async openSignupPrimary() {
    await this.page.getByRole('button', { name: 'Get Started', exact: true }).click();
    await expect(this.page.getByRole('heading', { name: /sign up|register/i })).toBeVisible();
  }

  async openContact() {
    await this.page.locator('#basic-navbar-nav').getByRole('link', { name: 'Contact Us' }).first().click();
    await expect(this.page.getByRole('heading', { name: /contact us/i })).toBeVisible();
  }

  async openLogin() {
    await this.page.goto('/auth/signin');
    await expect(this.page.getByRole('heading', { name: /sign in/i })).toBeVisible();
  }
}
