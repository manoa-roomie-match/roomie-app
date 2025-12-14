import { Page, expect } from '@playwright/test';

export class EditProfilePage {
  constructor(private page: Page) {}

  async updateBio(bio: string) {
    const bioField = this.page.locator('input[name="bioInfo"]');
    await bioField.waitFor({ state: 'visible' });
    await bioField.fill(bio);
  }

  async submit() {
    await this.page.getByRole('button', { name: /submit/i }).click();
  }

  async expectSuccess() {
    await expect(this.page.getByText(/success/i)).toBeVisible({ timeout: 5000 });
  }
}
