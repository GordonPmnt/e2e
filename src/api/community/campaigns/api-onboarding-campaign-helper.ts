import {
  createOnboardingCampaign,
  deleteCampaign,
  DeliveryMoment,
  VisibleForDays,
} from '@aaqua/aaqua-api-library';
// eslint-disable-next-line no-restricted-imports
import { DeliveryMechanismType } from '@aaqua/aaqua-api-library/build/main/lib/graphql-schema/generated/graphql-request';

import { getEmail, getPassword } from '../../../utils/credentials';
import { ApiAuth } from '../../auth/api-authentication';

const graphQLEndpoint = ApiAuth.getGraphQLEndpoint();
const createOnboardingCampaignWithAuthToken = (
  authToken: Parameters<
    typeof createOnboardingCampaign
  >[0]['client']['authToken'],
  communityId: string,
  campaignTitle: string
) =>
  createOnboardingCampaign({
    campaign: {
      content: 'Onboarding Campaign content',
      deliveryMechanism: DeliveryMechanismType.CommunityFeed,
      deliveryMoment: DeliveryMoment.IMMEDIATELY,
      title: campaignTitle,
      visibleForDays: VisibleForDays[0],
    },
    client: {
      authToken,
      url: graphQLEndpoint,
    },
    fandomId: communityId,
  });

export class ApiOnboardingCampaignHelpers {
  static async createOnboardingCampaignAsAdmin(
    userName: string,
    communityId: string,
    title: string
  ) {
    console.log(
      '[createOnboardingCampaignAsAdmin] Trying to create onboarding campaign'
    );

    const token = await ApiAuth.getAuthToken(
      getEmail(userName),
      getPassword(userName)
    );
    const { campaignId, status, errors } =
      await createOnboardingCampaignWithAuthToken(token, communityId, title);

    if (status !== 200) {
      console.log(`[createOnboardingCampaign] Returned status ${status}`);
    } else {
      console.log('[createOnboardingCampaign] compaignDetails:  ]');
    }

    if (errors?.length > 0) {
      console.log(
        `[createOnboardingCampaign] Returned error ${errors[0]?.message}`
      );
    }

    await ApiAuth.closeSession();

    return campaignId;
  }

  static async deleteOnboardingCampaign(userName: string, campaignId: string) {
    console.log('[deleteCampaign] Trying to delete campaign');
    const token = await ApiAuth.getAuthToken(
      getEmail(userName),
      getPassword(userName)
    );
    const { status, errors } = await deleteCampaign({
      client: { authToken: token, url: graphQLEndpoint },
      campaignId,
    });

    if (status !== 200) {
      console.log(`[deleteCampaign] Returned status ${status}`);
    }

    if (errors?.length > 0) {
      console.log(`[deleteCampaign] Returned error ${errors[0]?.message}`);
    }

    await ApiAuth.closeSession();
  }
}
