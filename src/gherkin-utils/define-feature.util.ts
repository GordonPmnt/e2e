import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import { flatten, intersection } from 'lodash';

import type { ParsedFeature, ParsedScenario } from './models';

const pEachSeries = async (iterable: any, iterator: any) => {
  let index = 0;

  for (const value of iterable) {
    // eslint-disable-next-line no-await-in-loop
    const returnValue = await iterator(await value, index++);

    if (returnValue === pEachSeries.stop) {
      break;
    }
  }

  return iterable;
};

pEachSeries.stop = Symbol('pEachSeries.stop');

type StepDefinitionContext = {
  page: Page;
};

type StepDefinitionCallbackFunction<Args = unknown> = (
  context: StepDefinitionContext,
  args: Args
) => Promise<void>;

export type DefineStepFunction<Args = unknown> = (
  stepMatcher: string | RegExp,
  stepDefinitionCallback: StepDefinitionCallbackFunction<Args>
) => void;

type StepDefinition = {
  stepMatcher: string | RegExp;
  stepDefinitionCallback: StepDefinitionCallbackFunction;
};

type StepsDefinitionCallbackOptions = {
  defineStep: DefineStepFunction;
  given: DefineStepFunction;
  when: DefineStepFunction;
  then: DefineStepFunction;
  and: DefineStepFunction;
  but: DefineStepFunction;
  pending: () => void;
};

/**
 *  skipped as never used function
 */
// type StepsDefinitionCallbackFunction = (
//   options: StepsDefinitionCallbackOptions
// ) => void;
// type DefineScenarioFunction = (
//   scenarioTitle: string,
//   stepsDefinitionCallback: StepsDefinitionCallbackFunction
// ) => void;

/**
 * @todo implement support for skip only and concurrent
 */
// type DefineScenarioFunctionWithAliases = DefineScenarioFunction & {
//   skip: DefineScenarioFunction;
//   only: DefineScenarioFunction;
//   concurrent: DefineScenarioFunction;
// };

type ScenariosDefinitionCallbackFunction = (
  options: StepsDefinitionCallbackOptions
) => void;

type DefineFeatureFunction = (
  featureFromFile: ParsedFeature,
  scenariosDefinitionCallback: ScenariosDefinitionCallbackFunction
) => void;

/**
 * Register implementation for a feature.
 * @param feature
 * @param cb
 */
export const defineFeature: DefineFeatureFunction = (feature, cb) => {
  const register: StepDefinition[] = [];

  const registerStep = (): DefineStepFunction => (name, cb) => {
    register.push({
      stepMatcher: name,
      stepDefinitionCallback: cb,
    });
  };

  const registerSteps: StepsDefinitionCallbackOptions = {
    defineStep: registerStep(),
    given: registerStep(),
    when: registerStep(),
    then: registerStep(),
    but: registerStep(),
    and: registerStep(),
    pending: () => null,
  };

  cb(registerSteps);

  // now run it!
  const mergeOutlines = flatten(
    feature.scenarioOutlines.map((value) => value.scenarios)
  );

  const scenarios = [...feature.scenarios, ...mergeOutlines];

  getDescribeCommand(feature)(getScenarioName(feature), () => {
    if (isSkipped(feature)) {
      test.skip();
    }

    scenarios.map(async (scenario) => {
      getTestCommand(scenario)(getScenarioName(scenario), async ({ page }) => {
        await pEachSeries(
          scenario.steps.map((step) => async () => {
            // We find the corresponding implementation
            const stepDefinition = register.find((s) => {
              if (typeof s.stepMatcher === 'string') {
                return s.stepMatcher === step.stepText;
              }

              return step.stepText.match(s.stepMatcher);
            });

            if (!stepDefinition) {
              throw new Error(
                `Missing implementation for step "${step.keyword} ${step.stepText}"`
              );
            }

            // We execute the step
            await test.step(`${step.keyword} ${step.stepText}`, async () => {
              let args = {};

              // If step matcher is a Regexp, we extract arguments.
              if (typeof stepDefinition.stepMatcher !== 'string') {
                args =
                  stepDefinition.stepMatcher.exec(step.stepText)?.groups || {};
              }

              await stepDefinition.stepDefinitionCallback(
                {
                  page,
                },
                args
              );
            });
          }),
          (exec: () => Promise<void>) => exec()
        );
      });
    });
  });
};

const SKIP_TAGS = ['@skip', '@disable', '@disabled'];

const isSkipped = (scenario: ParsedScenario | ParsedFeature) =>
  intersection(scenario.tags, SKIP_TAGS).length > 0;

const getTestCommand = (scenario: ParsedScenario | ParsedFeature) => {
  if (isSkipped(scenario)) {
    return test.skip;
  }

  if (scenario.tags.includes('@fixme')) return test.fixme;

  if (scenario.tags.includes('@only')) return test.only;

  if (scenario.tags.includes('@slow')) return test.slow;

  if (scenario.tags.includes('@fail')) return test.fail;

  return test;
};

const getDescribeCommand = (scenario: ParsedFeature) => {
  if (scenario.tags.includes('only')) {
    return test.describe.only;
  }

  return test.describe.parallel;
};

const getScenarioName = (scenario: ParsedScenario | ParsedFeature): string => {
  if (scenario.tags.length === 0) return scenario.title;

  return `${scenario.tags.join(' ')} ${scenario.title}`;
};
