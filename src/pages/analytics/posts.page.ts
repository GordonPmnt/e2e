/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { expect } from '@playwright/test';
import type { Page } from 'playwright';

export class PostsPage {
  readonly page: Page;

  /* Element selectors */
  readonly postsStatusLabelSelector = 'h2:has-text("Posts status")';

  readonly postsExplanationLabelSelector =
    'p:has-text("The metrics below represent the current status of the community")';

  // TODO: Typo in the data-testid - report ticket
  readonly totalPostsLabelSelector = 'data-testid=dashbord-gauge__title';

  readonly totalPostsValueSelector = 'data-testid=dashbord-gauge__value';

  readonly postsDetailsLabelSelector =
    'h2:has-text("Posts details for selected period")';

  readonly postsDeltaLabelSelector = 'data-testid=posts-delta__title';

  readonly postsDeltaValueSelector = 'data-testid=posts-delta__value';

  readonly postsEvolutionGraphLabelSelector = 'h3:has-text("Posts Evolution")';

  readonly postsCommentsGraphLabelSelector = 'h3:has-text("Comments")';

  readonly postsLikesGraphLabelSelector = 'h3:has-text("Likes")';

  constructor(page: Page) {
    this.page = page;
  }

  async verifyPostsStatusLabelIsVisible() {
    await this.page.waitForSelector(this.postsStatusLabelSelector);
  }

  async verifyPostsExplanationLabelIsVisible() {
    await this.page.waitForSelector(this.postsExplanationLabelSelector);
  }

  async verifyTotalPostsLabelIsVisible() {
    const totalPostsLabel = await this.page.waitForSelector(
      this.totalPostsLabelSelector
    );
    expect(await totalPostsLabel.textContent()).toBe('Total Posts');
  }

  // TODO: Use this with API call that will get the correct number (API & WEB cross-validation)
  async verifyTotalPostsValueIsVisible(totalPosts: string) {
    const totalPostsValue = await this.page.waitForSelector(
      this.totalPostsValueSelector
    );
    expect(totalPostsValue.textContent).toBe(totalPosts);
  }

  async verifyPostsDeltaLabelIsVisible() {
    await this.page.waitForSelector(this.postsDeltaLabelSelector);
  }

  // TODO: Use this with API call that will get the correct number (API & WEB cross-validation)
  async verifyPostsDeltaValueIsVisible(postsDelta: string) {
    const totalPostsValue = await this.page.waitForSelector(
      this.postsDeltaValueSelector
    );
    expect(totalPostsValue.textContent).toBe(postsDelta);
  }

  async verifyPostsDetailsForSelectedPeriodLabelIsVisible() {
    await this.page.waitForSelector(this.postsDetailsLabelSelector);
  }

  async verifyPostsEvolutionGraphLabelIsVisible() {
    await this.page.waitForSelector(this.postsEvolutionGraphLabelSelector);
  }

  async verifyCommentsGraphLabelIsVisible() {
    await this.page.waitForSelector(this.postsCommentsGraphLabelSelector);
  }

  async verifyLikesGraphLabelIsVisible() {
    await this.page.waitForSelector(this.postsLikesGraphLabelSelector);
  }
}
