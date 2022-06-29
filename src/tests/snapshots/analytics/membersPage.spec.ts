import { expect, test } from '@playwright/test';
import type { Page } from 'playwright';

import { Charts } from '../../../pages/analytics/charts';
import { MembersPage } from '../../../pages/analytics/members.page';
import { LoginPage } from '../../../pages/login/login.page';
import { navigateToCommunity } from '../../../step-definitions/aaqua-partner/communities/communities.spec';
import { getEmail, getPassword } from '../../../utils/credentials';
import {
  AaquaPartnerApp,
  navigateToUrlWithCustomPeriod,
} from '../../../utils/url-builder';

[2, 7].forEach((day) => {
  test.describe.parallel(
    `Check the charts on Members Page for ${day} days`,
    async () => {
      const childPage = 'Members';
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

      test.skip(`Check Reputation Score bar chart`, async ({ page }) => {
        const membersPage = new MembersPage(<Page>page);
        const charts = new Charts(<Page>page);
        await charts.waitForChartToBeDisplayed(
          membersPage.reputationScoreGraphSection
        );
        expect(
          await page
            .locator(membersPage.reputationScoreGraphSection)
            .screenshot()
        ).toMatchSnapshot(`reputationScoreBarGraph_${childPage}.png`, {
          threshold: 0.2,
        });
      });

      test(`Check Members Evolution chart for the ${day} days period`, async ({
        page,
      }) => {
        const membersPage = new MembersPage(<Page>page);
        const charts = new Charts(<Page>page);
        await charts.waitForChartToBeDisplayed(
          membersPage.membersEvolutionGraphSection
        );
        expect(
          await page
            .locator(membersPage.membersEvolutionGraphSection)
            .screenshot()
        ).toMatchSnapshot(
          `membersEvolutionGraph_${day}_days_${childPage}.png`,
          { threshold: 0.2 }
        );
      });

      test(`Check Joiners vs Leavers chart for the ${day} days period`, async ({
        page,
      }) => {
        const membersPage = new MembersPage(<Page>page);
        const charts = new Charts(<Page>page);
        await charts.waitForChartToBeDisplayed(
          membersPage.joinersVsLeaversGraphSection
        );
        expect(
          await page
            .locator(membersPage.joinersVsLeaversGraphSection)
            .screenshot()
        ).toMatchSnapshot(
          `joinersVsLeaversGraph_${day}_days_${childPage}.png`,
          { threshold: 0.2 }
        );
      });
    }
  );
});
