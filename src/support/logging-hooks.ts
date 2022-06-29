import fs from 'fs';

import type {
  ITestCaseHookParameter,
  ITestStepHookParameter,
} from '@cucumber/cucumber';
import { After, Before, BeforeAll, BeforeStep } from '@cucumber/cucumber';

const logFile = 'reports/TestLogs.txt';
let currentStep = 0;

BeforeAll(async function () {
  fs.writeFileSync(logFile, '\n');
});
Before(async function ({ pickle }: ITestCaseHookParameter) {
  const currentDate = new Date();
  currentStep = 0;
  fs.appendFileSync(logFile, `${currentDate.toUTCString()} ${pickle.name}`);
  fs.appendFileSync(logFile, '\n');
});

After(async function ({ result }: ITestCaseHookParameter) {
  fs.appendFileSync(logFile, `Browser: ${process.env.BROWSER}` + '\n');
  fs.appendFileSync(logFile, `Status: ${result?.status.toString()}`);
  fs.appendFileSync(logFile, '\n\n');
});

BeforeStep(async function ({ pickle }: ITestStepHookParameter) {
  const currentDate = new Date();
  fs.appendFileSync(
    logFile,
    `${currentDate.toUTCString()} ${pickle.steps[currentStep].text}`
  );
  fs.appendFileSync(logFile, '\n');
  currentStep++;
});
