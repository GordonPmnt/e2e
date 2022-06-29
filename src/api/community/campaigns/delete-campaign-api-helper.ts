import { deleteCampaign as deleteCommunityCampaign } from '@aaqua/aaqua-api-library';

import type { Campaign } from '../../../graphql-schema/generated/graphql-request';
import { ApiAuth } from '../../auth/api-authentication';

const graphQLEndpoint = process.env.GRAPHQL_ENDPOINT as string;

type DeleteCampaignArguments = {
  campaignId: Campaign['id'];
  user: { email: string; password: string };
};
export const deleteCampaign = async ({
  campaignId,
  user: { email, password },
}: DeleteCampaignArguments) => {
  console.log('[deleteCampaign] Trying to delete a campaign');
  const authToken = await ApiAuth.getAuthToken(email, password);

  const {
    campaignId: deletedCampaignId,
    status,
    errors,
  } = await deleteCommunityCampaign({
    campaignId,
    client: { authToken, url: graphQLEndpoint },
  });

  if (status !== 200) {
    console.log(`[deleteCampaign] Returned status ${status}`);
  }

  if (errors?.length > 0) {
    console.log(`[deleteCampaign] Returned error ${errors[0]?.message}`);
  }

  await ApiAuth.closeSession();

  return deletedCampaignId;
};
