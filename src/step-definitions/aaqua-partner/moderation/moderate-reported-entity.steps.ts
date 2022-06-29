import { Then, When } from '@cucumber/cucumber';

import type { ICustomWorld } from '../../../support/custom-world';
import { getModerationTestCommunityId } from '../../../utils/credentials';
import { AaquaPartnerApp } from '../../../utils/url-builder';
import { getPartnerBaseUrl } from '../../../utils/utils';

When(
  'I navigate to the partner {string} page',
  async function (this: ICustomWorld, pageName: string) {
    const { page } = this;
    if (pageName !== 'jobs' && pageName !== 'history') {
      throw new Error(
        `Page ${pageName} does not exist. Please use jobs or history`
      );
    }
    await page?.goto(
      `${getPartnerBaseUrl()}/communities/${getModerationTestCommunityId()}/content-moderation/${pageName}`
    );
  }
);

Then(
  'I review the job in the partner site and keep it visible',
  async function (this: ICustomWorld) {
    const { page } = this;
    const { entityId, entityType } = this.moderation.reportedEntity;

    await page?.goto(
      AaquaPartnerApp.contentModerationJobEntityDetailUrl(entityId, entityType)
    );
    await page?.click('text="Keep Content Visible"');
  }
);
