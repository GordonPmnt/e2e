import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';
import type { Page } from 'playwright';

import { ApiShopHelpers } from '../../../../api/shop/api-shop-helper';
import { defineFeature, loadFeature } from '../../../../gherkin-utils';
import type { DefineStepFunction } from '../../../../gherkin-utils/define-feature.util';
import { ShopInformationPage } from '../../../../pages/aaquanomy/shop-information.page';
import { logOut } from '../../../../step-definitions/aaqua-admin/login/login.spec';
import { navigateToCommunity } from '../../../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from '../../../../step-definitions/login/login.spec';
import { getEmail, getPassword } from '../../../../utils/credentials';

const feature = loadFeature(
  'src/tests/features/aaqua_partner/aaquanomy/shop-activation.feature'
);

const shopTitle = faker.lorem.words(2);
const description = faker.lorem.words(5);
const shopLink = faker.internet.url();
const shopEmail = faker.internet.email();
const shopContactNumber = '88888888';
const shopLinkName = faker.lorem.words(1);

defineFeature(feature, ({ given, then, when }) => {
  (given as DefineStepFunction<{ app: string; user: string }>)(
    /^I am logged in the "(?<app>\w+)" app as user "(?<user>\w+)"$/,
    async ({ page }, { app, user }) => {
      await login({ page }, app, user);
    }
  );

  (
    when as DefineStepFunction<{
      communityName: string;
      parentPage: string;
      childPage: string;
    }>
  )(
    /^I am on the "(?<communityName>[<>\s\w]+)" "(?<parentPage>[\s\w]+)" "(?<childPage>[\s\w]+)" page$/,
    async ({ page }, { communityName, parentPage, childPage }) => {
      await navigateToCommunity({ page }, communityName, parentPage, childPage);
    }
  );

  then('I should be able to fill in the shop details', async ({ page }) => {
    const shopInformationPage = new ShopInformationPage(<Page>page);

    await shopInformationPage.clickEditShop();
    await shopInformationPage.fillShopDetail({
      shopTitle: shopTitle,
      description: description,
      shopLink: shopLink,
      shopLinkName: shopLinkName,
      shopCurrency: 'SGD - Singapore Dollar',
      shopEmail: shopEmail,
      shopContactNumber: shopContactNumber,
      shopCountry: 'Singapore',
      shopImageUrl: 'src/support/resources/Merlion.jpeg',
    });
  });

  then('I should be able to activate the shop', async ({ page }) => {
    const shopInformationPage = new ShopInformationPage(<Page>page);

    await shopInformationPage.activateShop();
    await shopInformationPage.clickSaveButton();
    const storeState = await ApiShopHelpers.getCommunityStore(
      getEmail('SHOP_ADMIN'),
      getPassword('SHOP_ADMIN'),
      shopInformationPage.getCommunityId()
    );

    const expectedShopDetails = {
      title: shopTitle,
      content: description,
      storeUrl: shopLink,
      active: true,
      email: shopEmail,
      contactNumber: shopContactNumber,
      storeUrlTitle: shopLinkName,
      currency: 'SGD',
      contactCountryCode: '+65',
    };

    expect(storeState.store).toMatchObject(expectedShopDetails);
  });

  when('I log out', async ({ page }) => {
    await logOut({ page });
  });
});
