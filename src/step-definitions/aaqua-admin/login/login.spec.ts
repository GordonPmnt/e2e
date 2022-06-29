export async function logOut({ page }: { page: any }) {
  await page.click('[aria-label="Logout"]');
  await Promise.all([
    page.waitForNavigation(),
    page.waitForSelector('#login-form-title'),
  ]);
}
