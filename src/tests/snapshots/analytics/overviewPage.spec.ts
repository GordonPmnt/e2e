import { expect, test } from '@playwright/test';
import type { Page } from 'playwright';

import { Charts } from '../../../pages/analytics/charts';
import { OverviewPage } from '../../../pages/analytics/overview.page';
import { LoginPage } from '../../../pages/login/login.page';
import { navigateToCommunity } from '../../../step-definitions/aaqua-partner/communities/communities.spec';
import { getEmail, getPassword } from '../../../utils/credentials';
import {
  AaquaPartnerApp,
  navigateToUrlWithCustomPeriod,
} from '../../../utils/url-builder';

[7, 2].forEach((day) => {
  test.describe.parallel(
    `Check the charts on Overview Page for ${day} days`,
    async () => {
      const childPage = 'Overview';
      const periodStart = '02/01/2022';

      test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(<Page>page);
        await test.step('Login to the Partner app', async () => {
          await page.goto(AaquaPartnerApp.loginUrl());
          await loginPage.loginWithCredentials(
            getEmail('ANALYTICS_ONE'),
            getPassword('ANALYTICS_ONE')
          );
        });
        await test.step(
          `Navigate to ${childPage} page with custom period`,
          async () => {
            await Promise.all([
              page.waitForNavigation(),
              await navigateToCommunity(
                { page },
                'Analytics Squad',
                'Analytics',
                childPage
              ),
              await navigateToUrlWithCustomPeriod({ page }, day, periodStart),
            ]);
          }
        );
      });

      test(`Check Members Evolution chart for the ${day} days period`, async ({
        page,
      }) => {
        const overviewPage = new OverviewPage(<Page>page);
        const charts = new Charts(<Page>page);
        await charts.waitForChartToBeDisplayed(
          overviewPage.membersEvolutionGraphSection
        );
        expect(
          await page
            .locator(overviewPage.membersEvolutionGraphSection)
            .screenshot()
        ).toMatchSnapshot(
          `membersEvolutionGraph_${day}_days_${childPage}.png`,
          { threshold: 0.2 }
        );
      });

      test(`Check Posts Evolution bar chart for the ${day} days period`, async ({
        page,
      }) => {
        const overviewPage = new OverviewPage(<Page>page);
        const charts = new Charts(<Page>page);
        await charts.waitForChartToBeDisplayed(
          overviewPage.postsEvolutionGraphSection
        );
        expect(
          await page
            .locator(overviewPage.postsEvolutionGraphSection)
            .screenshot()
        ).toMatchSnapshot(
          `postEvolutionBarGraph_${day}_days_${childPage}.png`,
          { threshold: 0.2 }
        );
      });

      test(`Check Posts Evolution line chart for the ${day} days period`, async ({
        page,
      }) => {
        const overviewPage = new OverviewPage(<Page>page);
        const charts = new Charts(<Page>page);
        await test.step(
          'Click the checkbox to show aggregate values (line chart)',
          async () => {
            await charts.clickSumCheckbox();
          }
        );
        await test.step('Compare Posts Evolution line chart', async () => {
          await charts.waitForChartToBeDisplayed(
            overviewPage.postsEvolutionLineGraphSection
          );
          expect(
            await page
              .locator(overviewPage.postsEvolutionGraphSection)
              .screenshot()
          ).toMatchSnapshot(
            `postEvolutionLineGraph_${day}_days_${childPage}.png`,
            { threshold: 0.2 }
          );
        });
      });
    }
  );
});
