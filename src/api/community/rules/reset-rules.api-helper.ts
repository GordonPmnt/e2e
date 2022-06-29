import {
  getCommunityIdByHandle,
  updateCommunityRules,
} from '@aaqua/aaqua-api-library';
import type { FandomRule } from 'graphql-schema/generated/graphql-request';

import { ApiAuth } from '../../auth/api-authentication';

const graphQLEndpoint = process.env.GRAPHQL_ENDPOINT as string;

type ResetRulesArguments = {
  user: { email: string; password: string };
  communityHandle: string;
  rules: Omit<FandomRule, '__typename'>[];
};

export const resetCommunityRules = async ({
  user: { email, password },
  rules,
  communityHandle,
}: ResetRulesArguments) => {
  console.log('[resetCommunityRules] Trying to reset community rules');
  const authToken = await ApiAuth.getAuthToken(email, password);
  const { id: communityId } = await getCommunityIdByHandle(
    graphQLEndpoint,
    authToken,
    communityHandle
  );

  const { errors, communityDetails, status } = await updateCommunityRules(
    graphQLEndpoint,
    authToken,
    communityId,
    rules
  );

  if (status !== 200) {
    console.log(`[resetCommunityRules] Returned status ${status}`);
  }

  if (errors?.length > 0) {
    console.log(`[resetCommunityRules] Returned error ${errors[0]?.message}`);
  }

  await ApiAuth.closeSession();

  return communityDetails.rules;
};
