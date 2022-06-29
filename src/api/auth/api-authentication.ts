import { Auth } from '@aws-amplify/auth';
import { Amplify } from '@aws-amplify/core';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.api' });

Amplify.configure({
  Auth: {
    region: process.env.AMPLIFY_CONFIG_REGION as string,
    userPoolId: process.env.AMPLIFY_CONFIG_USER_POOL_ID as string,
    userPoolWebClientId: process.env
      .AMPLIFY_CONFIG_USER_POOL_WEB_CLIENT_ID as string,

    oauth: {
      domain: process.env.AMPLIFY_CONFIG_OAUTH_DOMAIN as string,
    },
  },
});

export class ApiAuth {
  static getGraphQLEndpoint(): string {
    return process.env.GRAPHQL_ENDPOINT as string;
  }

  static async getAuthToken(userName: string, password: string) {
    console.log('[getAuthToken] Trying to get token');
    try {
      const cognitoUser = await Auth.signIn(userName, password);
      return cognitoUser.signInUserSession.idToken.jwtToken;
    } catch (error) {
      console.log('[getAuthToken] Error getting token:', error);
    }
  }

  static async getUserId(userName: string, password: string) {
    console.log('[getUserId] Trying to get user id');
    try {
      const cognitoUser = await Auth.signIn(userName, password);

      return cognitoUser.attributes['custom:user_id'];
    } catch (error) {
      console.log('[getUserId] Error getting user id:', error);
    }
  }

  static async closeSession() {
    console.log('[closeSession] Trying to close session');
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('[closeSession] Error while closing the session: ', error);
    }
  }
}
