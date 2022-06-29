/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  getCommunityStoreByCommunityId,
  getProductVariantsByProductId,
} from '@aaqua/aaqua-api-library';

import { ApiAuth } from '../auth/api-authentication';
const graphQLEndpoint = process.env.GRAPHQL_ENDPOINT as string;

export class ApiShopHelpers {
  static async getCommunityStore(
    userEmail: string,
    userPassword: string,
    communityId: string
  ) {
    console.log(
      '[getCommunityStore] Trying to get community store information'
    );
    const token = await ApiAuth.getAuthToken(userEmail, userPassword);

    const { storeByFandom, status, errors } =
      await getCommunityStoreByCommunityId(graphQLEndpoint, token, communityId);

    if (status !== 200) {
      console.log(`[getCommunityStore] Returned status ${status}`);
    }

    if (errors?.length > 0) {
      console.log(`[getCommunityStore] Returned error ${errors[0]?.message}`);
    }

    await ApiAuth.closeSession();

    return storeByFandom;
  }

  static async getProductVariants(
    userEmail: string,
    userPassword: string,
    productId: string
  ) {
    console.log(
      '[getProductVariants] Trying to get community shop product variants'
    );
    const token = await ApiAuth.getAuthToken(userEmail, userPassword);

    const { product, status, errors } = await getProductVariantsByProductId(
      graphQLEndpoint,
      token,
      productId
    );

    if (status !== 200) {
      console.log(`[getProductVariants] Returned status ${status}`);
    }

    if (errors?.length > 0) {
      console.log(`[getProductVariants] Returned error ${errors[0]?.message}`);
    }

    await ApiAuth.closeSession();

    return product;
  }
}
