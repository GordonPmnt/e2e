# Writing cucumber test

This repository supports using cucumber syntax to write a run tests.

This is achieved through a custom test runner implementation.

The implementation is inspired from https://github.com/bencompton/jest-cucumber

## Overview

This runner is an alternative to the Cucumber.js runner. It allow us to write tests in cucumber, but use the native Playwright runner to execute the tests. This allow us to have improved allure report hover our tests.

## Getting Started

### Create a feature file

```
Feature: Logging in

Scenario: Loading the login page
    When I load the login page
    Then I should see "login" in the title
```

### Create an implementation file

```typescript
import { expect } from '@playwright/test';

import { defineFeature, loadFeature } from 'src/gherkin-utils';

const feature = loadFeature('src/[path-of-your-feature]/test.feature');
```

### Define your feature

```typescript
import { expect } from '@playwright/test';

import { defineFeature, loadFeature } from 'src/gherkin-utils';

const feature = loadFeature('src/[path-of-your-feature]/test.feature');

defineFeature(feature, ({ given, when, then }) => {});
```

### Add step definitions to your scenario tests:

```typescript
import { expect } from '@playwright/test';

import { defineFeature, loadFeature } from 'src/gherkin-utils';

const feature = loadFeature('src/[path-of-your-feature]/test.feature');

defineFeature(feature, ({ given, when, then }) => {
  when('When I load the login page', async ({ page }) => {
    await page.goto('https://partner.aaqua.live/');
  });

  then('Then I should see "login" in the title', async () => {
    await expect(page.locator('h1')).toHaveText(needle);
  });
});
```

## FAQ

### Why doesn't this library work exactly like Cucumber and how do I avoid duplicated step code?

To keep the code base simple, easy to work with and to maintain, we choose to use local, test specific step definitions instead of global, shared definitions.

This will allow use to more easily scale the code base up.

However, it's still possible with some patterns to share step definitions and avoid duplicated steps.

```typescript
defineFeature(feature, ({ given, when, then }) => {
  const givenIAmOnTheLoginPage = (given: DefineStepFunction) =>
    given('I am on the login page', async ({ page }) => {
      await page.goto('https://partner.aaqua.live/');
    });

  givenIAmOnTheLoginPage(given);

  then('Then I should see "login" in the title', async () => {
    await expect(page.locator('h1')).toHaveText(needle);
  });
});
```
