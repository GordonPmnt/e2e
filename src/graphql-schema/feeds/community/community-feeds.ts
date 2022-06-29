import { getModerationTestCommunityId } from '../../../utils/credentials';
import type {
  CommunityFeedQueryQuery,
  CommunityFeedQueryQueryVariables,
} from '../../generated/graphql-request';
import {
  CommunityFeedQueryDocument,
  FeedItemSourceType,
  FeedItemType,
} from '../../generated/graphql-request';
import { getGraphQLClient } from '../../graphQL-utils';

export const getCommunityFeedsId = async (
  feedItemType: FeedItemType,
  user: string
): Promise<string[]> => {
  const maxItemPerPage = 25;
  const maxPage = 4;
  let currentPage = 0;
  const client = await getGraphQLClient(user);
  const variables: CommunityFeedQueryQueryVariables = {
    fandomId: getModerationTestCommunityId(),
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
      query: CommunityFeedQueryDocument,
      variables,
    });
    if (response?.data?.errors?.length > 0) {
      console.error('The communityFeed GraphQL query returned no results?');
      await client.closeSession();
      return entityIdList;
    }
    const data = response.data as CommunityFeedQueryQuery;

    if (!data.communityFeed?.edges) {
      await client.closeSession();
      return entityIdList;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const currentIdList: string[] = data.communityFeed?.edges
      .filter((edge) => edge.node.content?.id)
      .map((edge) => edge.node.content?.id);
    entityIdList.push(...currentIdList);

    if (response?.data?.communityFeed?.pageInfo.hasNextPage) {
      hasNextPage = true;
      variables.after = response?.data?.communityFeed?.pageInfo.endCursor;
    }
    currentPage++;
  } while (hasNextPage && currentPage < maxPage);

  await client.closeSession();
  return entityIdList;
};
