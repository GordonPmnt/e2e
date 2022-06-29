import jwt_decode from 'jwt-decode';

import { ApiAuth } from '../../../api/auth/api-authentication';
import { getEmail, getPassword } from '../../../utils/credentials';
import type {
  ProfileFeedQueryQuery,
  ProfileFeedQueryQueryVariables,
} from '../../generated/graphql-request';
import {
  FeedItemSourceType,
  FeedItemType,
  ProfileFeedQueryDocument,
} from '../../generated/graphql-request';
import { getGraphQLClient } from '../../graphQL-utils';

export const getProfileFeedsId = async (
  feedItemType: FeedItemType,
  user: string
): Promise<string[]> => {
  const token = (await ApiAuth.getAuthToken(
    getEmail(user),
    getPassword(user)
  )) as string;
  const tokenDecrypted = jwt_decode(token.substr(6)) as {
    'custom:user_id': string;
  };
  const userId = tokenDecrypted['custom:user_id'];
  const maxItemPerPage = 25;
  const maxPage = 4;
  let currentPage = 0;
  const client = await getGraphQLClient(user);
  const variables: ProfileFeedQueryQueryVariables = {
    userId,
    filter: {
      feedItemType: [feedItemType, FeedItemType.Post],
      feedSourceType: [
        FeedItemSourceType.Recommended,
        FeedItemSourceType.Regular,
        FeedItemSourceType.Targeted,
      ],
    },
    first: maxItemPerPage,
  };

  const entityIdList: string[] = [];
  let hasNextPage = false;
  do {
    const response = await client.queryWithRetries({
      query: ProfileFeedQueryDocument,
      variables,
    });

    if (response?.data?.errors?.length > 0) {
      console.error('The profileFeed GraphQL query returned no results?');
      await client.closeSession();
      return entityIdList;
    }
    const data = response.data as ProfileFeedQueryQuery;

    if (!data.profileFeed?.edges) {
      await client.closeSession();
      return entityIdList;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const currentIdList: string[] = data.profileFeed?.edges
      .filter((edge) => edge.node.content?.id)
      .map((edge) => edge.node.content?.id);
    entityIdList.push(...currentIdList);

    if (response?.data?.profileFeed?.pageInfo.hasNextPage) {
      hasNextPage = true;
      variables.after = response?.data?.profileFeed?.pageInfo.endCursor;
    }
    currentPage++;
  } while (hasNextPage && currentPage < maxPage);

  await client.closeSession();
  return entityIdList;
};
