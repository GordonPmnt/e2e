import type { Page } from 'playwright';

import { scrollToTopOfPage } from '../../utils/scroll-helper';

interface ShopDetails {
  shopTitle: string;
  description: string;
  shopLink: string;
  shopLinkName: string;
  shopCurrency: string;
  shopEmail: string;
  shopContactNumber: string;
  shopCountry: string;
  shopImageUrl: string;
}

export class ShopInformationPage {
  readonly page: Page;

  private readonly shopTitle = 'input[name = "title"]';

  private readonly editShopButton = '//button[contains(text(),"Edit Shop")]';

  private readonly shopUrlTitle = 'input[name="storeUrlTitle"]';

  private readonly shopUrl = 'input[name = "storeUrl"]';

  private readonly shopDescription = 'textarea[name="content"]';

  private readonly shopCurrency = '[data-testid="combo-box_currency"]';

  private readonly shopEmail = 'input[name="email"]';

  private readonly shopCountryCode =
    '[data-testid="combo-box_contactCountryCode"] [data-testid="combo-box-input"]';

  private readonly shopContactNumber = 'input[name="contactNumber"]';

  private readonly activateShopRadio = 'label:has-text("Yes")';

  private readonly deactivateShopRadio = 'label:has-text("No")';

  private readonly saveButton = 'text=Save';

  private readonly removeShopImageButton = '[aria-label="Delete media"]';

  private readonly addShopImageSelector = 'input[type="file"]';

  private readonly shopCommunityId = '6062878a-05c0-4208-ab7a-d76e79607a08';

  constructor(page: Page) {
    this.page = page;
  }

  getCommunityId() {
    return this.shopCommunityId;
  }

  async clickEditShop() {
    await this.page.click(this.editShopButton);
  }

  async fillInShopUrlTitle(shopUrlTitle: string) {
    await this.page.fill(this.shopUrlTitle, shopUrlTitle);
  }

  async fillInShopName(shopTitle: string) {
    await this.page.fill(this.shopTitle, shopTitle);
  }

  async fillInShopUrl(shopUrl: string) {
    await this.page.fill(this.shopUrl, shopUrl);
  }

  async fillInShopDescription(shopDescription: string) {
    await this.page.fill(this.shopDescription, shopDescription);
  }

  async fillInShopCurrency(shopCurrency: string) {
    await this.page.click(this.shopCurrency);
    await this.page.type(this.shopCurrency, shopCurrency);
    await this.page.keyboard.press('Enter');
  }

  async fillInShopEmail(shopEmail: string) {
    await this.page.fill(this.shopEmail, shopEmail);
  }

  async fillInShopCountryCode(shopCountryCode: string) {
    await this.page.type(this.shopCountryCode, shopCountryCode);
    await this.page.keyboard.press('Enter');
  }

  async fillInShopContactNumber(shopContactNumber: string) {
    await this.page.fill(this.shopContactNumber, shopContactNumber);
  }

  async removeShopPhoto() {
    await this.page.click(this.removeShopImageButton);
  }

  async addShopPhoto(fileUrl: string) {
    await this.page.setInputFiles(this.addShopImageSelector, fileUrl);
    await this.page.waitForSelector('img');
  }

  async activateShop() {
    await this.page.click(this.activateShopRadio);
  }

  async deactivateShop() {
    await this.page.click(this.deactivateShopRadio);
  }

  async clickSaveButton() {
    await scrollToTopOfPage(this.page);
    await this.page.click(this.saveButton);
  }

  async fillShopDetail({
    shopTitle,
    description,
    shopLink,
    shopLinkName,
    shopCurrency,
    shopEmail,
    shopContactNumber,
    shopCountry,
    shopImageUrl,
  }: ShopDetails) {
    await this.fillInShopName(shopTitle);
    await this.fillInShopUrlTitle(shopLinkName);
    await this.fillInShopUrl(shopLink);
    await this.fillInShopDescription(description);
    await this.fillInShopCurrency(shopCurrency);
    await this.fillInShopEmail(shopEmail);
    await this.fillInShopCountryCode(shopCountry);
    await this.fillInShopContactNumber(shopContactNumber);
    await this.removeShopPhoto();
    await this.addShopPhoto(shopImageUrl);
  }
}
