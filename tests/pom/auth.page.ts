import { Page, expect } from '@playwright/test';

export class AuthPage {
  constructor(private page: Page) {}

  async signIn(email: string, password: string) {
    await expect(this.page.getByRole('heading', { name: /sign in/i })).toBeVisible();
    await this.page.locator('input[name="email"]').fill(email);
    await this.page.locator('input[name="password"]').fill(password);
    await this.page.getByRole('button', { name: /sign in/i }).click();
    // Accept either nav dropdown or welcome heading that contains the email
    await expect(this.page.getByText(email).first()).toBeVisible({ timeout: 15000 });
  }
}
