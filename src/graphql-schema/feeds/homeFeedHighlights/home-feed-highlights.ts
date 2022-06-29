import type {
  HomeFeedHighlightsQueryQuery,
  HomeFeedHighlightsQueryQueryVariables,
} from '../../generated/graphql-request';
import {
  FeedItemSourceType,
  FeedItemType,
  HomeFeedHighlightsQueryDocument,
} from '../../generated/graphql-request';
import { getGraphQLClient } from '../../graphQL-utils';

export const getHomeHighLightFeedsId = async (
  fandomId: string,
  feedItemType: FeedItemType,
  user: string
): Promise<string[]> => {
  const maxItemPerPage = 25;
  const maxPage = 4;
  let currentPage = 0;
  const client = await getGraphQLClient(user);
  const variables: HomeFeedHighlightsQueryQueryVariables = {
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
      query: HomeFeedHighlightsQueryDocument,
      variables,
    });
    if (response?.data?.errors?.length > 0) {
      console.error(
        'The homeFeedHighlights GraphQL query returned no results?'
      );
      await client.closeSession();
      return entityIdList;
    }
    const data = response.data as HomeFeedHighlightsQueryQuery;

    if (!data.homeFeedHighlights?.edges) {
      await client.closeSession();
      return entityIdList;
    }

    const fandomHighlight = data.homeFeedHighlights?.edges.find(
      (edge) => edge.node.fandom?.id === fandomId
    );

    if (!fandomHighlight || !fandomHighlight?.node?.highlights) {
      return entityIdList;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const currentIdList: string[] = fandomHighlight.node.highlights
      .filter((entity) => entity?.content?.id)
      .map((entity) => entity?.content?.id);
    entityIdList.push(...currentIdList);

    if (response?.data?.homeFeedHighlights?.pageInfo.hasNextPage) {
      hasNextPage = true;
      variables.after = response?.data?.homeFeedHighlights?.pageInfo.endCursor;
    }
    currentPage++;
  } while (hasNextPage && currentPage < maxPage);

  await client.closeSession();
  return entityIdList;
};
