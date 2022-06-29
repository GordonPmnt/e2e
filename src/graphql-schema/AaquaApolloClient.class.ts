import type {
  ApolloQueryResult,
  OperationVariables,
  QueryOptions,
} from '@apollo/client';
import { ApolloClient } from '@apollo/client';

import { ApiAuth } from '../api/auth/api-authentication';
export const sleep = async (ms: number) =>
  await new Promise((resolve) => setTimeout(resolve, ms));

export class AaquaApolloClient<TCacheShape> extends ApolloClient<TCacheShape> {
  public async closeSession() {
    await ApiAuth.closeSession();
  }

  public async queryWithRetries<T = any, TVariables = OperationVariables>(
    options: QueryOptions<TVariables, T>,
    timeout = 55
  ): Promise<ApolloQueryResult<T>> {
    const maxTimestamp = Date.now() + timeout * 1000;
    let result;
    do {
      result = await this.query<T, TVariables>(options);
      const hasError = !!result.error || !!result.errors;
      if (!hasError) {
        return result;
      }
      await sleep(500);
    } while (Date.now() < maxTimestamp);

    let message = 'GQL ERROR:';
    if (result.error) {
      message = result.error.message;
    }
    if (result.errors) {
      result.errors.forEach(
        (error) => (message = `${message} (${error.message})`)
      );
    }
    console.log(message);
    throw new Error(message);
  }
}
