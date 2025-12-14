import { test } from '@playwright/test';
import { HomePage } from '../pom/home.page';
import { AuthPage } from '../pom/auth.page';
import { UserHomePage } from '../pom/user-home.page';
import { EditProfilePage } from '../pom/edit-profile.page';

const USER_EMAIL = 'john@foo.com';
const USER_PASSWORD = 'changeme';

test.describe('User availability and profile form', () => {
  test('user can sign in, navigate, and submit edit profile form', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.openLogin();

    const auth = new AuthPage(page);
    await auth.signIn(USER_EMAIL, USER_PASSWORD);

    const userHome = new UserHomePage(page);
    await userHome.expectLoaded(USER_EMAIL);

    await userHome.openRoommates();
    await userHome.goHome();

    await userHome.openMessages();
    await userHome.goHome();

    await userHome.openEditProfile();
    const editProfile = new EditProfilePage(page);
    await editProfile.updateBio('Updated via Playwright acceptance test');
    await editProfile.submit();
    await editProfile.expectSuccess();
  });
});
