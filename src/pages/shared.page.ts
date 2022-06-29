import type { Page } from 'playwright';

export class SharedPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async reload() {
    await this.page.reload();
  }

  readonly searchJobInputSelector =
    'input[placeholder="Search job by entity ID"]';

  async lookForEntityById(entityId: string): Promise<void> {
    await this.page.fill(this.searchJobInputSelector, entityId);
    await this.page.keyboard.press('Enter');
  }
}
