/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { expect } from '@playwright/test';
import type { Locator, Page } from 'playwright';

import { PageElement } from '../../elements/page.element';

export class MembersPage {
  readonly page: Page;

  /* Element selectors */
  // TODO: In the future we should have data-testid(s) for all of these and verify the text.
  readonly membersStatusLabelSelector = 'h2:has-text("Members status")';

  readonly memberExplanationLabelSelector =
    'p:has-text("The metrics below represent the current status of the community")';

  readonly totalMembersLabelSelector = 'data-testid=total-members__title';

  readonly totalMembersValueSelector = 'data-testid=total-members__value';

  totalMembersLabel: PageElement;

  readonly reputationScoreDistributionGraphLabelSelector =
    'h3:has-text("Reputation Score Distribution")';

  readonly membersDetailsLabelSelector =
    'h2:has-text("Members details for selected period")';

  readonly joinersDeltaLabelSelector = 'data-testid=members-delta__title';

  readonly joinersDeltaValueSelector = 'data-testid=members-delta__value';

  readonly leaversDeltaLabelSelector = 'data-testid=dashboard-delta__title';

  readonly leaversDeltaValueSelector = 'data-testid=dashboard-delta__value';

  readonly membersEvolutionGraphLabelSelector =
    'h3:has-text("Members Evolution")';

  readonly membersEvolutionGraphSection =
    '[data-testid="chart-members-evolution"]';

  readonly joinersVsLeaversGraphLabelSelector =
    'h3:has-text("Joiners vs Leavers")';

  readonly joinersVsLeaversGraphSection =
    '[data-testid="chart-joiners-vs-leavers"]';

  readonly reputationScoreGraphSection =
    '[data-testid="chart-reputation-score-distribution"]';

  readonly loadingSpinner = '[data-testid="loader-indicator"]';

  readonly guideBanner = '[data-testid="user-guide-banner"]';

  readonly reputationScroreChartBars =
    '//*[@class = "histogram-bar__item--members"][@height > 0]';

  readonly guideBannerLink = '[data-testid="user-guide-banner"] a';

  /* Element locators */
  // TODO: Not sure if we need them, should check for best approach (Innovation day)
  readonly membersStatusLabel: Locator;

  readonly membersExplanationLabel: Locator;

  readonly totalMembersValue: Locator;

  readonly reputationScoreDistributionGraphLabel: Locator;

  readonly membersDetailsLabel: Locator;

  readonly joinersDeltaLabel: Locator;

  readonly joinersDeltaValue: Locator;

  readonly leaversDeltaLabel: Locator;

  readonly leaversDeltaValue: Locator;

  readonly membersEvolutionGraphLabel: Locator;

  readonly joinersVsLeaversGraphLabel: Locator;

  constructor(page: Page) {
    this.page = page;

    this.totalMembersLabel = new PageElement(
      this.page,
      this.totalMembersLabelSelector
    );

    this.membersStatusLabel = page.locator(this.membersStatusLabelSelector);
    this.membersExplanationLabel = page.locator(
      this.memberExplanationLabelSelector
    );
    this.totalMembersValue = page.locator(this.totalMembersValueSelector);
    this.reputationScoreDistributionGraphLabel = page.locator(
      this.reputationScoreDistributionGraphLabelSelector
    );
    this.membersDetailsLabel = page.locator(this.membersDetailsLabelSelector);
    this.joinersDeltaLabel = page.locator(this.joinersDeltaLabelSelector);
    this.joinersDeltaValue = page.locator(this.joinersDeltaValueSelector);
    this.leaversDeltaLabel = page.locator(this.leaversDeltaLabelSelector);
    this.leaversDeltaValue = page.locator(this.leaversDeltaValueSelector);
    this.membersEvolutionGraphLabel = page.locator(
      this.membersEvolutionGraphLabelSelector
    );
    this.joinersVsLeaversGraphLabel = page.locator(
      this.joinersVsLeaversGraphLabelSelector
    );
  }

  async verifyMembersStatusLabelIsVisible() {
    await this.page.waitForSelector(this.membersStatusLabelSelector);
  }

  async verifyMembersExplanationLabelIsVisible() {
    await this.page.waitForSelector(this.memberExplanationLabelSelector);
  }

  async verifyTotalMembersLabelIsVisible() {
    await this.page.waitForSelector(this.totalMembersLabelSelector);
  }

  async verifyTotalMembersValue(expectedValue: number) {
    //wait for values to be displayed on the page
    await this.page.waitForSelector(this.loadingSpinner, { state: 'hidden' });
    const totalMembersValue = await this.page.textContent(
      this.totalMembersValueSelector
    );
    expect(Number(totalMembersValue)).toEqual(expectedValue);
  }

  async verifyReputationScoreDistributionGraphLabelIsVisible() {
    await this.page.waitForSelector(
      this.reputationScoreDistributionGraphLabelSelector
    );
  }

  async verifyMembersDetailsLabelIsVisible() {
    await this.page.waitForSelector(this.membersDetailsLabelSelector);
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

  async verifyLeaversLabelIsVisible() {
    const joinersLabel = await this.page.waitForSelector(
      this.leaversDeltaLabelSelector
    );
    expect(await joinersLabel.textContent()).toBe('Leavers');
  }

  // TODO: Use this with API call that will get the correct number (API & WEB cross-validation)
  async verifyLeaversValueIsVisible(expectedValue: string) {
    const leaversValue = await this.page.waitForSelector(
      this.leaversDeltaValueSelector
    );
    expect(await leaversValue.textContent()).toBe(expectedValue);
  }

  async verifyMembersEvolutionGraphLabelIsVisible() {
    await this.page.waitForSelector(this.membersEvolutionGraphLabelSelector);
  }

  async verifyJoinersVsLeaversGraphLabelIsVisible() {
    await this.page.waitForSelector(this.joinersVsLeaversGraphLabelSelector);
  }

  async verifyUserGuideBanner(expectedValue: string) {
    await this.page.waitForSelector(this.guideBanner);
    const visible = await this.page.isVisible(this.guideBanner);
    expect(visible).toBeTruthy();

    await this.page.waitForSelector(this.guideBannerLink);
    const linkText = await this.page.textContent(this.guideBanner);
    expect(linkText?.trim()).toBe(expectedValue);
  }

  async verifyReputationScoreChartIsVisible() {
    await this.page.waitForSelector(this.reputationScoreGraphSection);
    const visible = await this.page.isVisible(this.reputationScoreGraphSection);
    expect(visible).toBeTruthy();

    await this.page.waitForSelector(this.reputationScroreChartBars);
    const barsLocator = this.page.locator(this.reputationScroreChartBars);
    expect(await barsLocator.count()).toBeGreaterThanOrEqual(1);
  }
}
