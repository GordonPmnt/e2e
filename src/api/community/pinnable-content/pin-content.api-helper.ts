import { pinContent as pinCommunityContent } from '@aaqua/aaqua-api-library';

import type {
  Event,
  Poll,
  Post,
} from '../../../graphql-schema/generated/graphql-request';
import { ApiAuth } from '../../auth/api-authentication';

const graphQLEndpoint = process.env.GRAPHQL_ENDPOINT as string;

type PinContentArguments = {
  contentId: Event['id'] | Poll['id'] | Post['id'];
  user: { email: string; password: string };
};
export const pinContent = async ({
  contentId,
  user: { email, password },
}: PinContentArguments) => {
  console.log('[pinContent] Trying to pin content');
  const authToken = await ApiAuth.getAuthToken(email, password);
  const client = { authToken, url: graphQLEndpoint };

  const {
    errors,
    contentId: pinnedContentId,
    status,
  } = await pinCommunityContent({ client, contentId });

  if (status !== 200) {
    console.log(`[pinContent] Returned status ${status}`);
  }

  if (errors?.length > 0) {
    console.log(`[pinContent] Returned error ${errors[0]?.message}`);
  }

  await ApiAuth.closeSession();

  return pinnedContentId;
};
