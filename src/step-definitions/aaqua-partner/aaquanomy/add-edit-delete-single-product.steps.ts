/* eslint-disable @typescript-eslint/no-non-null-assertion */
import assert from 'assert';

import { Then, When } from '@cucumber/cucumber';
import { faker } from '@faker-js/faker';
import type { Page } from 'playwright';

import { ApiShopHelpers } from '../../../api/shop/api-shop-helper';
import { AddSingleProductDetailsPage } from '../../../pages/aaquanomy/add-product-details.page';
import { AddProductPage } from '../../../pages/aaquanomy/add-product.page';
import { ProductDetailsPage } from '../../../pages/aaquanomy/product-details.page';
import { ProductsListingPage } from '../../../pages/aaquanomy/products-listing.page';
import { ShopInformationPage } from '../../../pages/aaquanomy/shop-information.page';
import type { ICustomWorld } from '../../../support/custom-world';
import { getEmail, getPassword } from '../../../utils/credentials';

const productName = faker.commerce.productName();
const productSku = faker.datatype.number(10000).toString();
const productDescription = faker.commerce.productDescription();
const productUrl = faker.internet.url();
const productPrice = faker.datatype.number(10000).toString();
const productLabel = 'New';
const editedProductName = faker.commerce.productName();
const editedProductSku = faker.datatype.number(10000).toString();
const editedProductDescription = faker.commerce.productDescription();
const editedProductUrl = faker.internet.url();
const editedProductPrice = faker.datatype.number(10000).toString();
const editedProductLabel = 'Sale';

When('I add a single product', async function (this: ICustomWorld) {
  const { page } = this;
  const productListingsPage = new ProductsListingPage(<Page>page);
  const addProductPage = new AddProductPage(<Page>page);
  const addSingleProductDetailsPage = new AddSingleProductDetailsPage(
    <Page>page
  );

  await productListingsPage.clickAddProductButton();
  await addProductPage.clickAddSingleProductButton();
  await addSingleProductDetailsPage.fillProductDetails({
    productName: productName,
    productSku: productSku,
    productDescription: productDescription,
    productLabel: productLabel,
    productPhoto: 'src/support/resources/Merlion.jpeg',
    productPrice: productPrice,
    productUrl: productUrl,
  });
  await addSingleProductDetailsPage.clickSaveProduct();
});

Then(
  'I see the saved single style product',
  async function (this: ICustomWorld) {
    const { page } = this;
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

    assert.equal(
      shopProducts.name,
      productName,
      'The product name does not match'
    );
    assert.equal(
      shopProducts.description,
      productDescription,
      'The product description does not match'
    );
    assert.equal(
      shopProducts.productType,
      'SINGLE',
      'The product type does not match'
    );
    assert.equal(
      shopProducts.status,
      'UNPUBLISHED',
      'The product status does not match'
    );

    for (const variant of shopProducts.variants) {
      assert.equal(
        variant.name,
        productName,
        'The product name does not match'
      );
      assert.equal(variant.sku, productSku, 'The product sku does not match');
      assert.equal(
        variant.label.toLowerCase(),
        productLabel.toLowerCase(),
        'The product label does not match'
      );
      assert.equal(
        variant.price,
        productPrice,
        'The product price does not match'
      );
      assert.equal(
        variant.externalUrl,
        productUrl,
        'The product url does not match'
      );
    }
  }
);

When('I edit a single product', async function (this: ICustomWorld) {
  const { page } = this;
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

Then(
  'I see the edited single style product',
  async function (this: ICustomWorld) {
    const { page } = this;
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

    assert.equal(
      shopProducts.name,
      editedProductName,
      'The product name does not match'
    );
    assert.equal(
      shopProducts.description,
      editedProductDescription,
      'The product description does not match'
    );
    assert.equal(
      shopProducts.productType,
      'SINGLE',
      'The product type does not match'
    );
    assert.equal(
      shopProducts.status,
      'UNPUBLISHED',
      'The product status does not match'
    );

    for (const variant of shopProducts.variants) {
      assert.equal(
        variant.name,
        editedProductName,
        'The product name does not match'
      );
      assert.equal(
        variant.sku,
        editedProductSku,
        'The product sku does not match'
      );
      assert.equal(
        variant.label.toLowerCase(),
        editedProductLabel.toLowerCase(),
        'The product label does not match'
      );
      assert.equal(
        variant.price,
        editedProductPrice,
        'The product price does not match'
      );
      assert.equal(
        variant.externalUrl,
        editedProductUrl,
        'The product url does not match'
      );
    }
  }
);

When('I delete a single product', async function (this: ICustomWorld) {
  const { page } = this;
  const productsListingPage = new ProductsListingPage(<Page>page);

  await productsListingPage.deleteProduct(editedProductName);
});

Then(
  'I do not see the single product on the products listing page',
  async function (this: ICustomWorld) {
    const { page } = this;
    const isProductVisible = await page?.waitForSelector(
      `text=${editedProductName}`,
      {
        state: 'hidden',
      }
    );

    assert(isProductVisible === null, 'The deleted product is still visible');
  }
);
