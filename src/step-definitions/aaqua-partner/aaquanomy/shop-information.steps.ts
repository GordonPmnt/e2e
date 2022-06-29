import assert from 'assert';

import { Then } from '@cucumber/cucumber';
import { faker } from '@faker-js/faker';
import type { Page } from 'playwright';

import { ApiShopHelpers } from '../../../api/shop/api-shop-helper';
import { ShopInformationPage } from '../../../pages/aaquanomy/shop-information.page';
import type { ICustomWorld } from '../../../support/custom-world';
import { getEmail, getPassword } from '../../../utils/credentials';

const shopTitle = faker.lorem.words(2);
const description = faker.lorem.words(5);
const shopLink = faker.internet.url();
const shopEmail = faker.internet.email();
const shopContactNumber = '88888888';
const shopLinkName = faker.lorem.words(1);

Then(
  'I should be able to fill in the shop details',
  async function (this: ICustomWorld) {
    const { page } = this;
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
  }
);

Then(
  'I should be able to activate the shop',
  async function (this: ICustomWorld) {
    const { page } = this;
    const shopInformationPage = new ShopInformationPage(<Page>page);

    await shopInformationPage.activateShop();
    await shopInformationPage.clickSaveButton();
    const storeState = await ApiShopHelpers.getCommunityStore(
      getEmail('SHOP_ADMIN'),
      getPassword('SHOP_ADMIN'),
      shopInformationPage.getCommunityId()
    );

    // Assert shop details with backend
    assert.equal(
      storeState.store?.active,
      true,
      'The community store is not activated'
    );
    assert.equal(
      storeState.store?.title,
      shopTitle,
      'The community store title does not match'
    );
    assert.equal(
      storeState.store?.content,
      description,
      'The community store description does not match'
    );
    assert.equal(
      storeState.store?.storeUrl,
      shopLink,
      'The community store Url does not match'
    );
    assert.equal(
      storeState.store?.email,
      shopEmail,
      'The community store email does not match'
    );
    assert.equal(
      storeState.store?.contactCountryCode,
      '+65',
      'The community store country code does not match'
    );
    assert.equal(
      storeState.store?.contactNumber,
      shopContactNumber,
      'The community store contact number does not match'
    );
    assert.equal(
      storeState.store?.currency,
      'SGD',
      'The community store currency does not match'
    );
    assert.equal(
      storeState.store?.storeUrlTitle,
      shopLinkName,
      'The community store Url title does not match'
    );
  }
);

Then(
  'I should be able to deactivate the shop',
  async function (this: ICustomWorld) {
    const { page } = this;
    const shopInformationPage = new ShopInformationPage(<Page>page);

    await shopInformationPage.clickEditShop();
    await shopInformationPage.deactivateShop();
    await shopInformationPage.clickSaveButton();

    const storeState = await ApiShopHelpers.getCommunityStore(
      getEmail('SHOP_ADMIN'),
      getPassword('SHOP_ADMIN'),
      shopInformationPage.getCommunityId()
    );

    assert.equal(
      storeState.store?.active,
      false,
      'The community store is not deactivated'
    );
  }
);
