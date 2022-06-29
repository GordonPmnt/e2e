import { Given } from '@cucumber/cucumber';
import type { Page } from 'playwright';

import { LoginPage } from '../../pages/login/login.page';
import type { ICustomWorld } from '../../support/custom-world';
import { getEmail, getPassword } from '../../utils/credentials';
import { AaquaAdminApp, AaquaPartnerApp } from '../../utils/url-builder';

Given(
  'I am logged in the {string} app as user {string}',
  async function (this: ICustomWorld, app: string, user: string) {
    const { page } = this;
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
    this.loggedUser = user;
  }
);
