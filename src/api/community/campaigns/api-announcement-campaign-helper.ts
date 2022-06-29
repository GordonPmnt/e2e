import {
  createAnnouncementCampaign,
  deleteCampaign,
  TargetAudience,
} from '@aaqua/aaqua-api-library';
// eslint-disable-next-line no-restricted-imports
import { DeliveryMechanismType } from '@aaqua/aaqua-api-library/build/main/lib/graphql-schema/generated/graphql-request';
import { addDays } from 'date-fns';

import { getEmail, getPassword } from '../../../utils/credentials';
import { ApiAuth } from '../../auth/api-authentication';

const graphQLEndpoint = process.env.GRAPHQL_ENDPOINT as string;

const createAnnouncementCampaignWithAuthToken = (
  authToken: Parameters<
    typeof createAnnouncementCampaign
  >[0]['client']['authToken'],
  communityId: string,
  campaignTitle: string
) =>
  createAnnouncementCampaign({
    campaign: {
      content: 'Announcement Campaign content',
      deliveryMechanism: DeliveryMechanismType.CommunityFeed,
      endTime: addDays(new Date(), 1),
      startTime: new Date(),
      targetAudience: TargetAudience.EVERYONE,
      title: campaignTitle,
    },
    client: {
      authToken,
      url: graphQLEndpoint,
    },
    fandomId: communityId,
  });

export class ApiAnnouncementCampaignHelper {
  static async createAnnouncementCampaignAsAdmin(
    userName: string,
    communityId: string,
    title: string
  ) {
    console.log(
      '[createAnnouncementCampaignAsAdmin] Trying to create announcement campaign'
    );

    const token = await ApiAuth.getAuthToken(
      getEmail(userName),
      getPassword(userName)
    );
    const { campaignId, status, errors } =
      await createAnnouncementCampaignWithAuthToken(token, communityId, title);

    if (status !== 200) {
      console.log(
        `[createAnnouncementCampaignAsAdmin] Returned status ${status}`
      );
    } else {
      console.log(
        `[createAnnouncementCampaignAsAdmin] campaignId = ${campaignId}`
      );
    }

    if (errors?.length > 0) {
      console.log(
        `[createAnnouncementCampaignAsAdmin] Returned error ${errors[0]?.message}`
      );
    }

    await ApiAuth.closeSession();

    return campaignId;
  }

  static async deleteAnnouncementCampaign(
    userName: string,
    campaignId: string
  ) {
    console.log('[deleteAnnouncementCampaign] Trying to delete campaign');

    const token = await ApiAuth.getAuthToken(
      getEmail(userName),
      getPassword(userName)
    );
    const { status, errors } = await deleteCampaign({
      client: { authToken: token, url: graphQLEndpoint },
      campaignId,
    });

    if (status !== 200) {
      console.log(`[deleteAnnouncementCampaign] Returned status ${status}`);
    }

    if (errors?.length > 0) {
      console.log(
        `[deleteAnnouncementCampaign] Returned error ${errors[0]?.message}`
      );
    }

    await ApiAuth.closeSession();
  }
}
