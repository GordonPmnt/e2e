import { expect } from '@playwright/test';
import type { Page } from 'playwright';

import type { AaquaSite } from '../support/custom-world';

export const enum JobFilter {
  EntityType = 'entityType',
  ReportReason = 'reportReason',
}

export type EntityType = 'POST' | 'COMMENT' | 'EVENT' | 'USER' | 'POLL';

const EntityTypeLabel = {
  POST: 'Post',
  COMMENT: 'Comment',
  EVENT: 'Event',
  USER: 'User',
  POLL: 'Poll',
};

export type ReportReason = 'ANSA' | 'HARASSMENT_HATE' | 'SELF_HARM' | 'VICO';

const ReportReasonLabel = {
  ANSA: 'ANSA',
  HARASSMENT_HATE: 'Harassment/Hate',
  SELF_HARM: 'SSH',
  VICO: 'Vico',
};

export class JobsPage {
  readonly site: AaquaSite;

  readonly page: Page;

  readonly entityTypeCellSelector: string;

  readonly loadMoreButtonSelector = `//button[text()='Load More']`;

  readonly reportReasonCellSelector: string;

  private showDetailsRowSelector =
    "//tbody/tr[contains(@aria-label, 'Show_details')]";

  constructor(page: Page, site: AaquaSite) {
    this.page = page;
    this.site = site;
    this.entityTypeCellSelector = this.showDetailsRowSelector + '/td[2]/span';
    this.reportReasonCellSelector =
      this.showDetailsRowSelector + '/td[5]/div/div';

    if (!site) {
      throw new Error('Site not defined for new JobPage');
    }
  }

  async canLoadMore(): Promise<boolean> {
    return await this.page
      .waitForSelector(this.loadMoreButtonSelector, {
        state: 'visible',
        timeout: 3000,
      })
      .then(() => true)
      .catch(() => false);
  }

  async filterJobs(filter: JobFilter, value: string): Promise<void> {
    const selector = `//select[@name='${filter}']`;

    await this.page.waitForTimeout(3000);
    await this.page.waitForSelector(selector, { timeout: 3000 });

    const element = await this.page.$(selector);

    await element?.selectOption({ value });
  }

  async hasNoData(): Promise<boolean> {
    return this.page
      .waitForSelector('text="There is no data for this view"', {
        timeout: 500,
      })
      .then(() => true)
      .catch(() => false);
  }

  loadMore = async (): Promise<void> => {
    await this.page.click(this.loadMoreButtonSelector);
    await this.page.waitForSelector('[role=progressbar]', {
      state: 'attached',
    });
    await this.page.waitForSelector('[role=progressbar]', {
      state: 'detached',
    });
  };

  async validateEntityTypes(expectedType: EntityType): Promise<boolean> {
    await this.page.waitForSelector(this.entityTypeCellSelector);

    const entityTypes = await this.page.$$eval(
      this.entityTypeCellSelector,
      (cell) => cell.map((span) => span.innerHTML)
    );

    return entityTypes?.every(
      (label) => label === EntityTypeLabel[expectedType]
    );
  }

  async validateJobWithReason(content: string, reason: string): Promise<void> {
    const reasonColIdx = this.site === 'ADMINISTRATION' ? 5 : 4;
    const row = await this.page.$$(
      `[aria-label="Show_details"]:has-text("${content}") td:nth-child(${reasonColIdx}) span:has-text("${reason}")`
    );
    expect(row.length).toBe(1);
  }

  async validateReportReason(expectedReason: ReportReason): Promise<boolean> {
    await this.page?.waitForSelector(this.reportReasonCellSelector);

    const jobsReasons = await this.page.$$eval(
      this.reportReasonCellSelector,
      (elements) => {
        const reasons: string[] = [];
        const subElements = elements as HTMLElement[];
        subElements.forEach((subElement) => reasons.push(subElement.innerText));
        return reasons;
      }
    );

    const expectLabel = ReportReasonLabel[expectedReason];
    jobsReasons.forEach((reasons) => {
      expect(reasons).toMatch(new RegExp(`${expectLabel}|& \\d more`));
    });
    return true;
  }
}
