import { faker } from '@faker-js/faker';
import type { Page } from 'playwright';

import { defineFeature, loadFeature } from '../../../../gherkin-utils';
import type { DefineStepFunction } from '../../../../gherkin-utils/define-feature.util';
import { AddProductPage } from '../../../../pages/aaquanomy/add-product.page';
import { AddStyleDetailsPage } from '../../../../pages/aaquanomy/add-style-details.page';
import { ProductsListingPage } from '../../../../pages/aaquanomy/products-listing.page';
import { StyleDetailsPage } from '../../../../pages/aaquanomy/style-details.page';
import { StylesListingPage } from '../../../../pages/aaquanomy/styles-listing.page';
import { logOut } from '../../../../step-definitions/aaqua-admin/login/login.spec';
import { navigateToCommunity } from '../../../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from '../../../../step-definitions/login/login.spec';
import { AaquaPartnerApp } from '../../../../utils/url-builder';

const feature = loadFeature(
  'src/tests/features/aaqua_partner/aaquanomy/add-edit-delete-multistyle-product.feature'
);

const multiStyleProductName = faker.commerce.productName();
const multiStyleProductDescription = faker.commerce.productDescription();
const styles = ['Style1', 'Style2', 'Style3'];
const deleteStyles = ['Style1', 'Style2'];
const communityId = '6062878a-05c0-4208-ab7a-d76e79607a08';
// Style names to be used for verification later on
const styleName = new Array<string>();
const styleSku = new Array<string>();
const styleLabel = new Array<string>();
const styleUrl = new Array<string>();
const stylePrice = new Array<string>();

// Edited Style names to be used for verification later on
const editedStyleName = new Array<string>();
const editedStyleSku = new Array<string>();
const editedStyleLabel = new Array<string>();
const editedStyleUrl = new Array<string>();
const editedStylePrice = new Array<string>();

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

  then('I see the edited multi style product', async ({ page }) => {
    const productListingsPage = new ProductsListingPage(<Page>page);
    const styleListingsPage = new StylesListingPage(<Page>page);
    const styleDetailsPage = new StyleDetailsPage(<Page>page);

    await page.waitForNavigation();
    await page.goto(AaquaPartnerApp.communityShopUrl(communityId, 'products'));
    await productListingsPage.waitForPageLoad();
    await page.waitForLoadState('domcontentloaded');
    await productListingsPage.viewStyles(multiStyleProductName);

    for (const style of styles) {
      await styleListingsPage.viewStyle(style);
      await styleDetailsPage.verifyStyleDetails(
        editedStyleName.shift()!,
        editedStyleSku.shift()!,
        editedStyleLabel.shift()!,
        editedStylePrice.shift()!,
        editedStyleUrl.shift()!
      );
      await styleDetailsPage.clickStyleBreadCrumb();
      await page?.waitForNavigation();
    }
  });

  then('I see the saved multi style product', async ({ page }) => {
    const productListingsPage = new ProductsListingPage(<Page>page);
    const styleListingsPage = new StylesListingPage(<Page>page);
    const styleDetailsPage = new StyleDetailsPage(<Page>page);

    await page.waitForNavigation();
    await page.goto(AaquaPartnerApp.communityShopUrl(communityId, 'products'));
    await productListingsPage.waitForPageLoad();
    await page.waitForLoadState('domcontentloaded');
    await productListingsPage.viewStyles(multiStyleProductName);
    for (const style of styles) {
      await styleListingsPage.viewStyle(style);
      await styleDetailsPage.verifyStyleDetails(
        styleName.shift()!,
        styleSku.shift()!,
        styleLabel.shift()!,
        stylePrice.shift()!,
        styleUrl.shift()!
      );
      await styleDetailsPage.clickStyleBreadCrumb();
      await page?.waitForNavigation();
    }
  });

  then(
    'I do not see the deleted styles on the styles table',
    async ({ page }) => {
      const productListingsPage = new ProductsListingPage(<Page>page);
      for (const style of deleteStyles) {
        await productListingsPage.checkProductNotVisible(style);
      }
    }
  );

  then('I delete the product', async ({ page }) => {
    const productListingsPage = new ProductsListingPage(<Page>page);

    await page?.goto(AaquaPartnerApp.communityShopUrl(communityId, 'products'));
    await productListingsPage.waitForPageLoad();
    await page?.waitForLoadState('domcontentloaded');
    await productListingsPage.deleteProduct(multiStyleProductName);
    await productListingsPage.checkProductNotVisible(multiStyleProductName);
  });

  when('I add a multi style product', async ({ page }) => {
    const productListingsPage = new ProductsListingPage(<Page>page);
    const addProductPage = new AddProductPage(<Page>page);
    const styleListingsPage = new StylesListingPage(<Page>page);
    const addStyleDetailsPage = new AddStyleDetailsPage(<Page>page);
    const styleDetailsPage = new StyleDetailsPage(<Page>page);

    await productListingsPage.clickAddProductButton();
    await addProductPage.clickAddMultiStyleProductButton();
    await addProductPage.setupMultiStyleProductInformation({
      productName: multiStyleProductName,
      productDescription: multiStyleProductDescription,
      productStyles: styles,
    });
    await addProductPage.clickSaveProductButton();
    for (const style of styles) {
      await styleListingsPage.editStyle(style);
      const sku = faker.datatype.number(10000).toString();
      const link = faker.internet.url();
      const price = faker.datatype.number(10000).toString();
      const label = 'New';
      await addStyleDetailsPage.fillStyleDetails({
        styleName: style,
        styleSku: sku,
        styleLabel: label,
        stylePhoto: 'src/support/resources/Merlion.jpeg',
        stylePrice: price,
        styleUrl: link,
      });
      // Save our style information for verification later on
      styleName.push(style);
      styleSku.push(sku);
      styleLabel.push(label);
      styleUrl.push(link);
      stylePrice.push(price);
      await addStyleDetailsPage.clickSaveStyle();
      await styleDetailsPage.waitForPageLoad();
      await styleDetailsPage.verifyStyleDetails(style, sku, label, price, link);
      await styleDetailsPage.clickStyleBreadCrumb();
    }
  });

  when('I edit a multi style product', async ({ page }) => {
    const productListingsPage = new ProductsListingPage(<Page>page);
    const styleListingsPage = new StylesListingPage(<Page>page);
    const addStyleDetailsPage = new AddStyleDetailsPage(<Page>page);
    const styleDetailsPage = new StyleDetailsPage(<Page>page);

    await productListingsPage.waitForPageLoad();
    await productListingsPage.viewStyles(multiStyleProductName);

    for (const style of styles) {
      await styleListingsPage.editStyle(style);
      const sku = faker.datatype.number(10000).toString();
      const link = faker.internet.url();
      const price = faker.datatype.number(10000).toString();
      const label = 'New';
      await addStyleDetailsPage.fillStyleDetails({
        styleName: style,
        styleSku: sku,
        styleLabel: label,
        stylePhoto: 'src/support/resources/Merlion.jpeg',
        stylePrice: price,
        styleUrl: link,
      });
      // Save our style information for verification later on
      editedStyleName.push(style);
      editedStyleSku.push(sku);
      editedStyleLabel.push(label);
      editedStyleUrl.push(link);
      editedStylePrice.push(price);
      await addStyleDetailsPage.clickSaveStyle();
      await styleDetailsPage.waitForPageLoad();
      await styleDetailsPage.verifyStyleDetails(style, sku, label, price, link);
      await styleDetailsPage.clickStyleBreadCrumb();
    }
  });

  when('I delete some styles', async ({ page }) => {
    const productListingsPage = new ProductsListingPage(<Page>page);
    const styleListingsPage = new StylesListingPage(<Page>page);

    await productListingsPage.waitForPageLoad();
    await productListingsPage.viewStyles(multiStyleProductName);

    for (const style of deleteStyles) {
      await styleListingsPage.deleteStyle(style);
      await productListingsPage.checkProductNotVisible(style);
    }
  });

  when('I log out', async ({ page }) => {
    await logOut({ page });
  });
});
