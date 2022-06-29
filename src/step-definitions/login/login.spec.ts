import type { Page } from 'playwright';

import { LoginPage } from '../../pages/login/login.page';
import { getEmail, getPassword } from '../../utils/credentials';
import { AaquaAdminApp, AaquaPartnerApp } from '../../utils/url-builder';

export async function login(
  { page }: { page: any },
  app: string,
  user: string
) {
  switch (app) {
    case 'WEB':
      await page?.goto(AaquaPartnerApp.loginUrl());
      break;
    case 'ADMINISTRATION':
      await page?.goto(AaquaAdminApp.loginUrl());
      break;
    default:
      throw new Error(`Unknown application: ${app}`);
  }

  const loginPage = new LoginPage(<Page>page);
  await loginPage.loginWithCredentials(getEmail(user), getPassword(user));
}
