import { expect, test as setup } from '@playwright/test'

const authFile = 'playwright/.auth/user.json';

const testAuthData = {
    email: 'metrosjuan@gmail.com',
    password: 'password123123'
}

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('/auth/log-in');
  await page.getByPlaceholder('myemail@gmail.com').click();
  await page.getByPlaceholder('myemail@gmail.com').fill(testAuthData.email);
  await page.getByPlaceholder('myemail@gmail.com').press('Tab');
  await page.getByPlaceholder('*********').fill(testAuthData.password);
  await page.getByRole('button', { name: 'Log In' }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('/app');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.locator('a').filter({ hasText: 'metros@metrosjuan' })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});