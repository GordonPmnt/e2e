/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const retries = getRetries();

const common = `
  --require-module ts-node/register
  --require src/**/*.ts
  --format summary 
  --format progress-bar 
  --format json:reports/report.json
  --format html:reports/report.html
  --format @cucumber/pretty-formatter
  --format-options ${JSON.stringify({ snippetInterface: 'async-await' })}
  --publish-quiet
  --retry ${retries},
  `;

const getWorldParams = () => {
  const params = {
    foo: 'bar',
  };

  return `--world-parameters ${JSON.stringify({ params })}`;
};

module.exports = {
  default: `${common} ${getWorldParams()}`,
};

function getRetries() {
  if (process.env.RETRIES) {
    return process.env.RETRIES;
  } else {
    return 0;
  }
}
