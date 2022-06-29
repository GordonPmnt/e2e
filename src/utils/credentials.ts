/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
require('dotenv').config();

type Credentials = {
  email: string;
  password: string;
};

export function getPassword(user: string) {
  const envVarName = `E2E_${user}_PASSWORD`;
  if (process.env[envVarName]) {
    return process.env[envVarName] as string;
  } else {
    throw new Error(`You must set the environment variable: ${envVarName}`);
  }
}

export function getEmail(user: string) {
  const envVarName = `E2E_${user}_EMAIL`;
  if (process.env[envVarName]) {
    return process.env[envVarName] as string;
  } else {
    throw new Error(`You must set the environment variable: ${envVarName}`);
  }
}

export function getCredentials(user: string): Credentials {
  return { email: getEmail(user), password: getPassword(user) };
}

export function getModerationTestCommunityId() {
  if (process.env.E2E_MOD_TESTING_FANDOM_ID_PARTNER) {
    return process.env.E2E_MOD_TESTING_FANDOM_ID_PARTNER;
  } else {
    throw new Error(
      'You must set the environment variable: E2E_MOD_TESTING_FANDOM_ID_PARTNER'
    );
  }
}
