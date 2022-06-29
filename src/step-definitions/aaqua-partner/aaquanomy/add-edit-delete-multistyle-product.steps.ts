/* eslint-disable @typescript-eslint/no-non-null-assertion */
import assert from 'assert';

import { Then, When } from '@cucumber/cucumber';
import { faker } from '@faker-js/faker';
import type { Page } from 'playwright';

import { AddProductPage } from '../../../pages/aaquanomy/add-product.page';
import { AddStyleDetailsPage } from '../../../pages/aaquanomy/add-style-details.page';
import { ProductsListingPage } from '../../../pages/aaquanomy/products-listing.page';
import { StyleDetailsPage } from '../../../pages/aaquanomy/style-details.page';
import { StylesListingPage } from '../../../pages/aaquanomy/styles-listing.page';
import type { ICustomWorld } from '../../../support/custom-world';
import { AaquaPartnerApp } from '../../../utils/url-builder';

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

When('I add a multi style product', async function (this: ICustomWorld) {
  const { page } = this;
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

Then(
  'I see the saved multi style product',
  async function (this: ICustomWorld) {
    const { page } = this;
    const productListingsPage = new ProductsListingPage(<Page>page);
    const styleListingsPage = new StylesListingPage(<Page>page);
    const styleDetailsPage = new StyleDetailsPage(<Page>page);

    await page?.waitForNavigation();
    await page?.goto(AaquaPartnerApp.communityShopUrl(communityId, 'products'));
    await productListingsPage.waitForPageLoad();
    await page?.waitForLoadState('domcontentloaded');
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
  }
);

When('I edit a multi style product', async function (this: ICustomWorld) {
  const { page } = this;
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

Then(
  'I see the edited multi style product',
  async function (this: ICustomWorld) {
    const { page } = this;
    const productListingsPage = new ProductsListingPage(<Page>page);
    const styleListingsPage = new StylesListingPage(<Page>page);
    const styleDetailsPage = new StyleDetailsPage(<Page>page);

    await page?.waitForNavigation();
    await page?.goto(AaquaPartnerApp.communityShopUrl(communityId, 'products'));
    await productListingsPage.waitForPageLoad();
    await page?.waitForLoadState('domcontentloaded');
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
  }
);

When('I delete some styles', async function (this: ICustomWorld) {
  const { page } = this;
  const productListingsPage = new ProductsListingPage(<Page>page);
  const styleListingsPage = new StylesListingPage(<Page>page);

  await productListingsPage.waitForPageLoad();
  await productListingsPage.viewStyles(multiStyleProductName);

  for (const style of deleteStyles) {
    await styleListingsPage.deleteStyle(style);
    const isStyleVisible = await page?.waitForSelector(`text=${style}`, {
      state: 'hidden',
    });

    assert(isStyleVisible === null, 'The deleted style is still visible');
  }
});

Then(
  'I do not see the deleted styles on the styles table',
  async function (this: ICustomWorld) {
    const { page } = this;

    for (const style of deleteStyles) {
      const isStyleVisible = await page?.waitForSelector(`text=${style}`, {
        state: 'hidden',
      });

      assert(
        isStyleVisible === null,
        `The deleted style ${style} is still visible`
      );
    }
  }
);

Then('I delete the product', async function (this: ICustomWorld) {
  const { page } = this;
  const productsListingPage = new ProductsListingPage(<Page>page);

  await page?.goto(AaquaPartnerApp.communityShopUrl(communityId, 'products'));
  await productsListingPage.waitForPageLoad();
  await page?.waitForLoadState('domcontentloaded');
  await productsListingPage.deleteProduct(multiStyleProductName);

  const isProductVisible = await page?.waitForSelector(
    `text=${multiStyleProductName}`,
    {
      state: 'hidden',
    }
  );

  assert(isProductVisible === null, 'The deleted product is still visible');
});
