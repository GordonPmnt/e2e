# Using tags

The test runner supports using tags in the features and scenarios.

## Special tags

A couple of special tags can be use to leverage Playwright apis:

`@skip` (aliases: `@disable` `@disabled`)

Skip a scenario or a full feature.

Uses https://playwright.dev/docs/test-annotations#skip-a-test.

`@fail`

Marks the test as failing. Playwright Test will run this test and ensure it does indeed fail. If the test does not fail, Playwright Test will complain.

Uses https://playwright.dev/docs/api/class-test#test-fail.

`@fixme`

Mark a test as "fixme", with the intention to fix it. The test will be skipped.

Uses https://playwright.dev/docs/api/class-test#test-fixme-2.

`@slow`

Marks a test as "slow". Slow tests will be given triple the default timeout.

Uses https://playwright.dev/docs/api/class-test#test-slow

`@only`

Will focus on a single feature or scenario.

Uses https://playwright.dev/docs/api/class-test#test-slow.

## Other tags

Tags are added to the test name, this means we can leverage playwright `--grep` argument to run a subset of tests based on tags.

Example:

```gherkins
@team-x
Feature: A super nice feature developed by team X

  Scenario: A nice scenario
    Given ...
    When ...
    Then ...
```

Running team X tests can be done with a simple command:

`npx playwright test --grep @team-x`
