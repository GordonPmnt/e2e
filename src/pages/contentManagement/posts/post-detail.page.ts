import type { Page } from 'playwright';

export class PostDetailPage {
  readonly page: Page;

  readonly commentField = 'textarea[placeholder="Add a comment"]';

  readonly submitCommentButton = 'button:has-text("Post")';

  constructor(page: Page) {
    this.page = page;
  }

  async clickSubmitComment() {
    await this.page.click(this.submitCommentButton);
  }

  async fillInCommentField(commentText: string) {
    await this.page.fill(this.commentField, commentText);
  }

  async verifyCommentAdded(commentText: string) {
    let comment = await this.page.$(`p:has-text("${commentText}")`);

    while (comment !== null) {
      await this.page.reload();

      comment = await this.page.$(`p:has-text("${commentText}")`);
    }
  }
}
