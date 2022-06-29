/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({
  path: '.env.local',
});

module.exports = {
  client: {
    service: {
      name: 'aaqua-gateway@v2',
      // We are using local file for now as we don't have a registry key yet
      // service: 'aaqua-gateway-a4v1c@v2',
      localSchemaFile: './src/graphql-schema/schema.graphql',
    },
    includes: ['./src/**/*.gql'],
  },
};
