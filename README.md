# aaqua-web-e2e-prod

This project contains automated tests for both the administration and partner webapp using Playwright as the primary automation framework.

## Prerequisites

- Set up npm to be able to access Aaqua Artifactory, follow instructions on https://aaqua.atlassian.net/wiki/spaces/AAQ/pages/802783294/Using+JFrog+npm+registry

### Using a "native local setup"

- Install node v16.x

### Using a container runtime environment

- Install a container runtime (e.g. Docker For Mac)
- Build the container image: `make build`
- Run the container as shell: `make shell`
- `npm ci` ...

## Commands

See `package.json` file for all the commands.

### Build the package:

    `npm run build`

### Install Dependencies:

    `npm install`

### Run the Administration webapp Playwright tests on Chromium:

    `export BROWSER=chrome`
    `npm run test:admin`

### Run the partner webapp Playwright tests on Chromium for Moderation Squad:

    `export BROWSER=chrome`
    `npm run test:partner:moderation`

Please check package.json for additional scripts.

If you are running it through your IDE, set the environment variable BROWSER to run the test on different browsers:
It can take values firefox and webkit. If no value is provided, the test runs on Chromium.

If you are adding new test cases, please ensure that you have tested your change against all three browsers before merge.

## Running specific features or scenarios

### Run individual feature from terminal:

    `npm run feature --feature="<name of feature file to execute>"`

    Example: `npm run feature --feature="login.feature"`
    This will run the login.feature file

### Run individual scenario from terminal:

    `npm run scenario --scenario="<name of scenario to execute>"`

    Example: `npm run scenario --scenario="Moderator can login and see the list of Jobs"`

This will run the scenario with name "Moderator can login and see the list of Jobs"

## Debugging a specific scenario

### Debug a particular scenario

If you wish to debug a specific scenario, just run the following command:
`npm run debug --scenario="<name of your scenario>"`

Example: `npm run debug --scenario="Regular user cannot login"` will run the scenario with name "Regular user cannot login" in debug mode

This will open up the browser and the Playwright debugger and allow you to step through the scenario

## Adding support for a GraphQL query/mutation

1. Create a new file containing the GraphQL query in a sub-folder of `src/graphql-schema`, e.g. "list-jobs.gql".
2. Run the command: `npm run graphql-types`.
3. Create a new TypeScript file containing the wrapper function, ideally in the same sub-folder.

## Headless

By default the tests will execute in headed mode. If you want to run them in headless mode then set the environment variable HEADLESS=true

## Retries

If you are running your tests locally, then there will not be any retry for failed tests. If you wish to add a retry to your failed tests, then configure the environment variable RETRIES with the number of retries you want for your tests. On CircleCI this value is configured to be 2 by default. If you wish to override it for your job, then pass the parameter test_retries to your job. To disable pass test_retries=0.

## Device Emulation

It is possible to execute your tests in mobile browsers using Playwright. To enable device mobile browser emulation, simply set the environment variable DEVICE_EMULATION=true. If BROWSER is set to chrome or firefox, then the tests will execute on Pixel 3 device. If BROWSER is set to webkit, then the tests will execute on iPhone 11.

## Environment Variables

For the moderation squad, more info can be found in there: ["Automated testing"](https://aaqua.atlassian.net/wiki/spaces/AAQ/pages/1534328909/Access+management+-+feature+flags)

| Squad      | Name                                                                        | Description                         | Roles                       | Segments           |
| ---------- | --------------------------------------------------------------------------- | ----------------------------------- | --------------------------- | ------------------ |
| Moderation | E2E_MOD_TESTING_FANDOM_ID_PARTNER                                           | ID of the test moderation community |                             |                    |
| Moderation | E2E_MOD_ADMIN_EMAIL<br>E2E_MOD_ADMIN_PASSWORD                               | Credentials                         | community ADMIN             | Moderation Testers |
| Moderation | E2E_MOD_MEMBER_1_EMAIL<br>E2E_MOD_MEMBER_1_PASSWORD                         | Credentials                         | community FAN               | Moderation Testers |
| Moderation | E2E_MOD_MEMBER_2_EMAIL<br>E2E_MOD_MEMBER_2_PASSWORD                         | Credentials                         | community FAN               | Moderation Testers |
| Moderation | E2E_MOD_EXTERNAL_MODERATOR_1_EMAIL<br>E2E_MOD_EXTERNAL_MODERATOR_1_PASSWORD | Credentials                         | platform EXTERNAL_MODERATOR | Moderation Testers |
| Moderation | E2E_MOD_EXTERNAL_MODERATOR_2_EMAIL<br>E2E_MOD_EXTERNAL_MODERATOR_2_PASSWORD | Credentials                         | platform EXTERNAL_MODERATOR | Moderation Testers |
| Moderation | E2E_MOD_INTERNAL_MODERATOR_1_EMAIL<br>E2E_MOD_INTERNAL_MODERATOR_1_PASSWORD | Credentials                         | platform INTERNAL_MODERATOR | Moderation Testers |
| Moderation | E2E_MOD_INTERNAL_MODERATOR_2_EMAIL<br>E2E_MOD_INTERNAL_MODERATOR_2_PASSWORD | Credentials                         | platform INTERNAL_MODERATOR | Moderation Testers |
| Moderation | E2E_EXTERNAL_MODERATOR_EMAIL<br>E2E_EXTERNAL_MODERATOR_PASSWORD             | Credentials                         | platform EXTERNAL_MODERATOR | None! "Real user"  |
| Moderation | E2E_INTERNAL_MODERATOR_EMAIL<br>E2E_INTERNAL_MODERATOR_PASSWORD             | Credentials                         | platform INTERNAL_MODERATOR | None! "Real user"  |

Add these to .env file:

    E2E_ANALYTICS_ONE_TESTING_EMAIL="aaqua.test.user22@aaqua.live"
    E2E_ANALYTICS_ONE_TESTING_PASSWORD=<Ask QA>

    E2E_CAT_ADMIN_EMAIL = "aaqua.test.user23@aaqua.live"
    E2E_CAT_ADMIN_PASSWORD=<Ask QA>

    E2E_SHOP_ADMIN_EMAIL="aaquanomyshoptestuser1@gmail.com"
    E2E_SHOP_ADMIN_PASSWORD=<Ask QA>
    E2E_SHOP_MEMBER_EMAIL="aaquanomyshoptestuser2@gmail.com"
    E2E_SHOP_MEMBER_PASSWORD=<Ask QA>

    E2E_FNU_ONE_EMAIL="aaqua.test.user.fnu1.web@aaqua.live"
    E2E_FNU_ONE_PASSWORD=<Ask QA>

    Add this to .env.api file:

    AMPLIFY_CONFIG_REGION=<Ask QA>
    AMPLIFY_CONFIG_USER_POOL_ID=<Ask QA>
    AMPLIFY_CONFIG_USER_POOL_WEB_CLIENT_ID=<Ask QA>
    AMPLIFY_CONFIG_OAUTH_DOMAIN=<Ask QA>
    GRAPHQL_ENDPOINT=https://partner.aaqua.live/api/graphql
    PROXY_URL=https://partner.aaqua.live

## Admin and Partner Webapp base Url

By default the admin and partner apps are configured to run on production Url's. However, if you want to run your tests against your local changes, you may override the base Url's using the following environment variables
ADMIN_BASE_URL=<admin app base Url>
PARTNER_BASE_URL=<partner app base Url>
# e2e
