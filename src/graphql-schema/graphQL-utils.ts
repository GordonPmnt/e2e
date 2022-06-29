/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {
  ApolloClient,
  ApolloQueryResult,
  NormalizedCacheObject,
  OperationVariables,
  QueryOptions,
} from '@apollo/client';
import { createHttpLink, from, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RetryLink } from '@apollo/client/link/retry';

import { ApiAuth } from '../api/auth/api-authentication';
import { getCredentials } from '../utils/credentials';

import { AaquaApolloClient } from './AaquaApolloClient.class';

type AaquaApolloClientType = ApolloClient<NormalizedCacheObject> & {
  closeSession(): Promise<void>;

  queryWithRetries<T = any, TVariables = OperationVariables>(
    options: QueryOptions<TVariables, T>,
    timeout?: number
  ): Promise<ApolloQueryResult<T>>;
};

const customRetryLink = new RetryLink({
  delay: {
    initial: 500,
    max: 5000,
  },
  attempts: {
    max: 10,
  },
});

const customFetch = async (uri: string, options: any) => {
  const response = await fetch(uri, options);
  if (response.status > 401) {
    const body = await response.clone().text();
    console.log(
      `[customFetch] ApolloClient got HTTP response: ${response.status} / ${body}`
    );
    try {
      JSON.parse(body);
    } catch (err) {
      // wrap the message into some JSON
      response.text = async function name() {
        return `{ "body" : "${body}" }`;
      };
      return response;
    }
  }
  return response;
};

const getGraphQLClientForToken = async (
  token: string
): Promise<AaquaApolloClientType> => {
  const customAuthLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const customHttpLink = createHttpLink({
    fetch: customFetch,
    uri: ApiAuth.getGraphQLEndpoint(),
  });

  return new AaquaApolloClient({
    cache: new InMemoryCache(),
    uri: ApiAuth.getGraphQLEndpoint(),
    link: from([customRetryLink, customAuthLink, customHttpLink]),
    name: 'aaqua-web-e2e-prod',
    version: 'v7',
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  });
};
export const getGraphQLClient = async (
  user: string
): Promise<AaquaApolloClientType> => {
  const credentials = getCredentials(user);
  const token = await ApiAuth.getAuthToken(
    credentials.email,
    credentials.password
  );
  return getGraphQLClientForToken(token);
};
