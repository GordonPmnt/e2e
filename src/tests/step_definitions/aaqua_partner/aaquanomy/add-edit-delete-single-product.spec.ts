import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';
import type { Page } from 'playwright';

import { ApiShopHelpers } from '../../../../api/shop/api-shop-helper';
import { defineFeature, loadFeature } from '../../../../gherkin-utils';
import type { DefineStepFunction } from '../../../../gherkin-utils/define-feature.util';
import { AddSingleProductDetailsPage } from '../../../../pages/aaquanomy/add-product-details.page';
import { AddProductPage } from '../../../../pages/aaquanomy/add-product.page';
import { ProductDetailsPage } from '../../../../pages/aaquanomy/product-details.page';
import { ProductsListingPage } from '../../../../pages/aaquanomy/products-listing.page';
import { ShopInformationPage } from '../../../../pages/aaquanomy/shop-information.page';
import { logOut } from '../../../../step-definitions/aaqua-admin/login/login.spec';
import { navigateToCommunity } from '../../../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from '../../../../step-definitions/login/login.spec';
import { getEmail, getPassword } from '../../../../utils/credentials';

const feature = loadFeature(
  'src/tests/features/aaqua_partner/aaquanomy/add-edit-delete-single-product.feature'
);
const productName = faker.commerce.productName();
const productSku = faker.datatype.number(10000).toString();
const productDescription = faker.commerce.productDescription();
const productUrl = faker.internet.url();
const productPrice = faker.datatype.number(10000).toString();
const productLabel = 'NEW';
const editedProductName = faker.commerce.productName();
const editedProductSku = faker.datatype.number(10000).toString();
const editedProductDescription = faker.commerce.productDescription();
const editedProductUrl = faker.internet.url();
const editedProductPrice = faker.datatype.number(10000).toString();
const editedProductLabel = 'SALE';

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

  when('I add a single product', async ({ page }) => {
    const productListingsPage = new ProductsListingPage(<Page>page);
    const addProductPage = new AddProductPage(<Page>page);
    const addSingleProductDetailsPage = new AddSingleProductDetailsPage(
      <Page>page
    );

    await productListingsPage.clickAddProductButton();
    await addProductPage.clickAddSingleProductButton();
    await addSingleProductDetailsPage.fillProductDetails({
      productName,
      productSku,
      productDescription,
      productLabel,
      productPhoto: 'src/support/resources/Merlion.jpeg',
      productPrice,
      productUrl,
    });
    await addSingleProductDetailsPage.clickSaveProduct();
  });

  then('I see the saved single style product', async ({ page }) => {
    const shopInformationPage = new ShopInformationPage(<Page>page);
    const productDetailsPage = new ProductDetailsPage(<Page>page);

    await productDetailsPage.waitForPageLoad();

    await productDetailsPage.verifyProductDetails(
      productName,
      productSku,
      productDescription,
      productLabel,
      productPrice,
      productUrl
    );
    const shopProductUrl =
      'https://partner.aaqua.live/communities/' +
      shopInformationPage.getCommunityId() +
      '/shop/products/';
    const productId = page?.url().replace(shopProductUrl, '');

    const shopProducts = await ApiShopHelpers.getProductVariants(
      getEmail('SHOP_ADMIN'),
      getPassword('SHOP_ADMIN'),
      productId!
    );

    const expectedshopProducts = {
      name: productName,
      description: productDescription,
      productType: 'SINGLE',
      status: 'UNPUBLISHED',
      variants: [
        {
          name: productName,
          sku: productSku,
          label: productLabel,
          price: +productPrice,
          externalUrl: productUrl,
        },
      ],
    };

    expect(shopProducts).toMatchObject(expectedshopProducts);
  });

  then('I see the edited single style product', async ({ page }) => {
    const shopInformationPage = new ShopInformationPage(<Page>page);
    const productDetailsPage = new ProductDetailsPage(<Page>page);

    await productDetailsPage.waitForPageLoad();
    await productDetailsPage.verifyProductDetails(
      editedProductName,
      editedProductSku,
      editedProductDescription,
      editedProductLabel,
      editedProductPrice,
      editedProductUrl
    );

    const shopProductUrl =
      'https://partner.aaqua.live/communities/' +
      shopInformationPage.getCommunityId() +
      '/shop/products/';
    const productId = page?.url().replace(shopProductUrl, '');

    const shopProducts = await ApiShopHelpers.getProductVariants(
      getEmail('SHOP_ADMIN'),
      getPassword('SHOP_ADMIN'),
      productId!
    );

    const expectedshopProducts = {
      name: editedProductName,
      description: editedProductDescription,
      productType: 'SINGLE',
      status: 'UNPUBLISHED',
      variants: [
        {
          name: editedProductName,
          sku: editedProductSku,
          label: editedProductLabel,
          price: +editedProductPrice,
          externalUrl: editedProductUrl,
        },
      ],
    };

    expect(shopProducts).toMatchObject(expectedshopProducts);
  });

  then(
    'I do not see the single product on the products listing page',
    async ({ page }) => {
      const productListingsPage = new ProductsListingPage(<Page>page);
      productListingsPage.checkProductNotVisible(editedProductName);
    }
  );

  when('I edit a single product', async ({ page }) => {
    const productListingsPage = new ProductsListingPage(<Page>page);
    const productDetailsPage = new ProductDetailsPage(<Page>page);
    const addSingleProductDetailsPage = new AddSingleProductDetailsPage(
      <Page>page
    );

    productListingsPage.clickProduct(productName);
    productDetailsPage.clickEditProduct();

    await page?.waitForNavigation();

    await addSingleProductDetailsPage.editProductDetails(
      editedProductName,
      editedProductSku,
      editedProductDescription,
      editedProductLabel,
      editedProductPrice,
      editedProductUrl
    );

    await addSingleProductDetailsPage.clickSaveEditedProduct();
  });

  when('I delete a single product', async ({ page }) => {
    const productsListingPage = new ProductsListingPage(<Page>page);
    await productsListingPage.deleteProduct(editedProductName);
  });

  when('I log out', async ({ page }) => {
    await logOut({ page });
  });
});
