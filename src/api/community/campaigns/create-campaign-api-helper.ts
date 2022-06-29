import {
  createAnnouncementCampaign,
  createOnboardingCampaign,
  DeliveryMoment,
  getCommunityIdByHandle,
  TargetAudience,
  VisibleForDays,
} from '@aaqua/aaqua-api-library';
import { addDays } from 'date-fns';

import { DeliveryMechanismType } from '../../../graphql-schema/generated/graphql-request';
import type { CampaignType } from '../../../utils/typings';
import { ApiAuth } from '../../auth/api-authentication';

const graphQLEndpoint = process.env.GRAPHQL_ENDPOINT as string;

type CreateCampaignArguments = {
  campaignType: CampaignType;
  user: { email: string; password: string };
};
export const createCampaign = async ({
  campaignType,
  user: { email, password },
}: CreateCampaignArguments) => {
  console.log('[createCampaign] Trying to create a campaign');
  const authToken = await ApiAuth.getAuthToken(email, password);
  const client = { authToken, url: graphQLEndpoint };
  const { id: communityId } = await getCommunityIdByHandle(
    graphQLEndpoint,
    authToken,
    'e2e-web-cat'
  );
  const campaign = {
    content: 'Campaign content',
    deliveryMechanism: DeliveryMechanismType.CommunityFeed,
    title: 'Campaign title',
  };

  const { campaignId, status, errors } =
    campaignType === 'announcement'
      ? await createAnnouncementCampaign({
          campaign: {
            ...campaign,
            endTime: addDays(new Date(), 1),
            startTime: new Date(),
            targetAudience: TargetAudience.EVERYONE,
          },
          client,
          fandomId: communityId,
        })
      : await createOnboardingCampaign({
          campaign: {
            ...campaign,
            deliveryMoment: DeliveryMoment.IMMEDIATELY,
            excludeMembersJoinedAfter: null,
            visibleForDays: VisibleForDays[0],
          },
          client,
          fandomId: communityId,
        });

  if (status !== 200) {
    console.log(`[createCampaign] Returned status ${status}`);
  }

  if (errors?.length > 0) {
    console.log(`[createCampaign] Returned error ${errors[0]?.message}`);
  }

  await ApiAuth.closeSession();

  return campaignId;
};
