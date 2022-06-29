/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { expect } from '@playwright/test';
import type { Page } from 'playwright';

export class OverviewPage {
  readonly page: Page;

  /* Element selectors */
  readonly communityStatusLabelSelector = 'h2:has-text("Community status")';

  readonly communityExplanationLabelSelector =
    'p:has-text("The metrics below represent the current status of the community")';

  readonly totalMembersLabelSelector = 'data-testid=total-members__title';

  readonly totalMembersValueSelector = 'data-testid=total-members__value';

  readonly totalPostsLabelSelector = 'data-testid=total-posts__title';

  readonly totalPostsValueSelector = 'data-testid=total-posts__value';

  readonly communityDetailsLabelSelector =
    'h2:has-text("Community details for selected period")';

  readonly joinersDeltaLabelSelector = 'data-testid=members-delta__title';

  readonly joinersDeltaValueSelector = 'data-testid=members-delta__value';

  readonly postsDeltaLabelSelector = 'data-testid=posts-delta__title';

  readonly postsDeltaValueSelector = 'data-testid=posts-delta__value';

  readonly membersEvolutionGraphLabelSelector =
    'h3:has-text("Members Evolution")';

  readonly membersEvolutionGraphPeriodLabel =
    '//*[@data-testid="chart-members-evolution"]//p';

  readonly membersEvolutionGraphSection =
    '[data-testid="chart-members-evolution"]';

  readonly postsEvolutionGraphLabelSelector = 'h3:has-text("Posts Evolution")';

  readonly postsEvolutionGraphPeriodLabel =
    '(//*[@data-testid="chart-posts-evolution"]//p) [1]';

  readonly postsEvolutionGraphSection = '[data-testid="chart-posts-evolution"]';

  readonly postsEvolutionLineGraphSection =
    '[data-testid="chart-posts-evolution"] [data-testid="line-chart-wrapper"]';

  readonly loadingSpinner = '[data-testid="loader-indicator"]';

  constructor(page: Page) {
    this.page = page;
  }

  async verifyCommunityStatusLabelIsVisible() {
    await this.page.waitForSelector(this.communityStatusLabelSelector);
  }

  async verifyCommunityExplanationLabelIsVisible() {
    await this.page.waitForSelector(this.communityExplanationLabelSelector);
  }

  async verifyTotalMembersLabelIsVisible() {
    await this.page.waitForSelector(this.totalMembersLabelSelector);
  }

  async verifyTotalMembersValueIsVisible(expectedValue: number) {
    //wait for values to be displayed on the page
    await this.page.waitForSelector(this.loadingSpinner, { state: 'hidden' });
    const totalMembersValue = await this.page.textContent(
      this.totalMembersValueSelector
    );
    expect(Number(totalMembersValue)).toEqual(expectedValue);
  }

  async verifyTotalPostsLabelIsVisible() {
    await this.page.waitForSelector(this.totalPostsLabelSelector);
  }

  async verifyTotalPostsValueIsVisible(expectedValue: number) {
    //wait for values to be displayed on the page
    await this.page.waitForSelector(this.loadingSpinner, { state: 'hidden' });
    const totalPostsValue = await this.page.textContent(
      this.totalPostsValueSelector
    );
    expect(Number(totalPostsValue)).toBeGreaterThanOrEqual(expectedValue);
  }

  async verifyCommunityDetailsForSelectedPeriodLabelIsVisible() {
    await this.page.waitForSelector(this.communityDetailsLabelSelector);
  }

  async verifyJoinersLabelIsVisible() {
    const joinersLabel = await this.page.waitForSelector(
      this.joinersDeltaLabelSelector
    );
    expect(await joinersLabel.textContent()).toBe('Joiners');
  }

  // TODO: Use this with API call that will get the correct number (API & WEB cross-validation)
  async verifyJoinersValueIsVisible(expectedValue: string) {
    const joinersValue = await this.page.waitForSelector(
      this.joinersDeltaValueSelector
    );
    expect(await joinersValue.textContent()).toBe(expectedValue);
  }

  async verifyPostsLabelIsVisible() {
    const postsLabel = await this.page.waitForSelector(
      this.postsDeltaLabelSelector
    );
    expect(await postsLabel.textContent()).toBe('Posts');
  }

  // TODO: Use this with API call that will get the correct number (API & WEB cross-validation)
  async verifyPostsValueIsVisible(expectedValue: string) {
    const postsLabel = await this.page.waitForSelector(
      this.postsDeltaValueSelector
    );
    expect(await postsLabel.textContent()).toBe(expectedValue);
  }

  async verifyMembersEvolutionGraphLabelIsVisible() {
    await this.page.waitForSelector(this.membersEvolutionGraphLabelSelector);
  }

  async verifyPostsEvolutionGraphLabelIsVisible() {
    await this.page.waitForSelector(this.postsEvolutionGraphLabelSelector);
  }

  async verifyMembersEvolutionChartPeriodLabel(label: string) {
    const periodLabel = await this.page.waitForSelector(
      this.membersEvolutionGraphPeriodLabel
    );
    expect(await periodLabel.textContent()).toBe(label);
  }

  async verifyPostsEvolutionChartPeriodLabel(label: string) {
    const periodLabel = await this.page.waitForSelector(
      this.postsEvolutionGraphPeriodLabel
    );
    expect(await periodLabel.textContent()).toBe(label);
  }
}
