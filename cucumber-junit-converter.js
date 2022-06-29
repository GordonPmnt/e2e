/* eslint-disable @typescript-eslint/no-var-requires */
const cucumberJunitConvert = require('cucumber-junit-convert');

const options = {
  inputJsonFile: 'reports/report.json',
  outputXmlFile: 'reports/cucumber_report.xml',
  featureNameAsClassName: true, // default: false
};

cucumberJunitConvert.convert(options);
