import { test } from '@playwright/test';

import { defineFeature, loadFeature } from '../../../gherkin-utils';
import type { DefineStepFunction } from '../../../gherkin-utils/define-feature.util';
import { EntityVisibility } from '../../../graphql-schema/generated/graphql-request';
import type { ModerationState } from '../../../step-definitions/aaqua-admin/state/moderation-state.class';
import { cleanup } from '../utils/cleanup.utils';
import { createEntity } from '../utils/create-entity.utils';
import { reportEntity } from '../utils/report-entity.utils';
import { reviewEntity } from '../utils/review-entity.utils';
import {
  verifyEntityIsNotVisible,
  verifyEntityIsVisible,
} from '../utils/verify-entity.utils';

const feature = loadFeature(
  'src/tests/moderation/partner/hidden-content-is-not-accessible.feature'
);

let state: ModerationState;

defineFeature(feature, ({ given, when, then }) => {
  (given as DefineStepFunction<{ entityType: string }>)(
    /^a "(?<entityType>\w+)" is created, visible and reported to the community$/,
    async (_, { entityType }) => {
      state = await createEntity(entityType, 'MOD_MEMBER_1');
      await verifyEntityIsVisible(state, 'MOD_MEMBER_2');
      await reportEntity(state, 'MOD_MEMBER_2');
    }
  );

  (when as DefineStepFunction<void>)(
    /^I review the entity and hide it$/,
    async () => {
      await reviewEntity(EntityVisibility.Hidden, state, 'MOD_ADMIN');
    }
  );

  (then as DefineStepFunction<void>)(
    /^the entity is not accessible anymore$/,
    async () => {
      const users = ['MOD_MEMBER_1', 'MOD_MEMBER_2'];
      await verifyEntityIsNotVisible(state, users);
    }
  );

  // eslint-disable-next-line no-empty-pattern
  test.afterEach(async ({}, testInfo) => {
    await cleanup(state, testInfo);
  });
});
