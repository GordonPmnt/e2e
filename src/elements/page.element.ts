import type { Page } from 'playwright';

export class PageElement {
  readonly page: Page;

  private readonly selector: string;

  constructor(page: Page, selector: string) {
    this.page = page;
    this.selector = selector;
  }

  getSelector() {
    return this.selector;
  }

  nth(index: number) {
    return this.page.locator(this.selector).nth(index);
  }

  waitFor(options?: {
    state?: 'attached' | 'detached' | 'visible' | 'hidden';
    timeout?: number;
  }) {
    return this.page.locator(this.selector).waitFor(options);
  }

  isVisible() {
    return this.page.locator(this.selector).isVisible();
  }

  scrollIntoViewIfNeeded() {
    return this.page.locator(this.selector).scrollIntoViewIfNeeded();
  }

  fill(text: string) {
    return this.page.locator(this.selector).fill(text);
  }

  textContent() {
    return this.page.locator(this.selector).textContent();
  }

  click() {
    return this.page.locator(this.selector).click();
  }
}
