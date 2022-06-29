/* eslint-disable @typescript-eslint/no-var-requires */
var reporter = require('cucumber-html-reporter');

var options = {
  theme: 'bootstrap',
  jsonFile: 'reports/report.json',
  output: 'reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  name: 'Aaqua Playwright Tests',
  brandTitle: 'E2E Tests',
  screenshotsDirectory: 'screenshots',
};

reporter.generate(options);
