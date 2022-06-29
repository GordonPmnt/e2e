import { test } from '@playwright/test';

import { defineFeature, loadFeature } from '../../gherkin-utils';
import type { DefineStepFunction } from '../../gherkin-utils/define-feature.util';
import { COMMUNITIES } from '../../step-definitions/aaqua-partner/communities/communities.spec';
import { login } from '../../step-definitions/login/login.spec';
import { AaquaPartnerApp } from '../../utils/url-builder';

const feature = loadFeature(
  'src/tests/analytics/dashboard-url-validation.feature'
);

defineFeature(feature, ({ given, then, when }) => {
  const buildUrl = (queryString: string) => {
    const url = AaquaPartnerApp.communityAnalyticsUrl(
      COMMUNITIES.Aaquatomia,
      'overview'
    );

    return `${url}${queryString}`;
  };

  test.use({
    timezoneId: 'Europe/Brussels',
  });

  (given as DefineStepFunction<{ app: string; user: string }>)(
    /^I am logged in the "(?<app>\w+)" app as user "(?<user>\w+)"$/,

    async ({ page }, { app, user }) => {
      await login({ page }, app, user);
    }
  );

  when('I add non integer from & to to the url query', async ({ page }) => {
    await page.goto(buildUrl('?period=custom&from=blah&to=foo'));
  });

  when(
    'I add a from that is after the to to the url query',
    async ({ page }) => {
      const from = new Date('10/12/2021');
      const to = new Date('08/12/2021');

      await page.goto(
        buildUrl(`?period=custom&from=${from.getTime()}&to=${to.getTime()}`)
      );
    }
  );

  when(
    'I add an invalid timezone (Foo/Bar) to the url query',
    async ({ page }) => {
      await page.goto(buildUrl('?timezone=Foo/Bar'));
    }
  );

  when(
    'I add a timezone that is different than mine in the url query',
    async ({ page }) => {
      await page.goto(buildUrl('?timezone=Asia/Singapore'));
    }
  );

  when('I add a 19 days range', async ({ page }) => {
    await page.goto(buildUrl('?period=19'));
  });

  (then as DefineStepFunction<{ needle: string }>)(
    /I see "(?<needle>.+?)"/,
    async ({ page }, { needle }) => {
      await page.waitForSelector(`text=${needle}`);
    }
  );
});
