import type {
  EventFeedQueryQuery,
  EventFeedQueryQueryVariables,
  FeedItemSourceType,
} from '../../generated/graphql-request';
import {
  EventFeedQueryDocument,
  FeedItemType,
} from '../../generated/graphql-request';
import { getGraphQLClient } from '../../graphQL-utils';

export const getEventFeedsId = async (
  fandomId: string,
  entityType: FeedItemType,
  feedSourceType: FeedItemSourceType[],
  user: string
): Promise<string[]> => {
  const maxItemPerPage = 25;
  const maxPage = 4;
  let currentPage = 0;
  const client = await getGraphQLClient(user);
  const variables: EventFeedQueryQueryVariables = {
    fandomId,
    filter: {
      feedItemType: [entityType, FeedItemType.Post],
      feedSourceType,
    },
    first: maxItemPerPage,
  };

  const entityIdList: string[] = [];
  let hasNextPage = false;
  do {
    const response = await client.queryWithRetries({
      query: EventFeedQueryDocument,
      variables,
    });
    if (response?.data?.errors?.length > 0) {
      console.error('The eventFeed GraphQL query returned no results?');
      await client.closeSession();
      return entityIdList;
    }
    const data = response.data as EventFeedQueryQuery;

    if (!data.eventFeed?.edges) {
      await client.closeSession();
      return entityIdList;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const currentIdList: string[] = data.eventFeed?.edges
      .filter((edge) => edge.node.content?.id)
      .map((edge) => edge.node.content?.id);
    entityIdList.push(...currentIdList);

    if (response?.data?.eventFeed?.pageInfo.hasNextPage) {
      hasNextPage = true;
      variables.after = response?.data?.eventFeed?.pageInfo.endCursor;
    }
    currentPage++;
  } while (hasNextPage && currentPage < maxPage);

  await client.closeSession();
  return entityIdList;
};
