import type { ITestCaseHookParameter } from '@cucumber/cucumber';
import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  setDefaultTimeout,
  Status,
} from '@cucumber/cucumber';
import type {
  ChromiumBrowser,
  FirefoxBrowser,
  WebKitBrowser,
} from 'playwright';
import { chromium, devices, firefox, webkit } from 'playwright';

import { getDeviceEmulationMode } from '../utils/utils';

import { browserOptions } from './config';
import type { ICustomWorld } from './custom-world';

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;

declare global {
  let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
}

setDefaultTimeout(process.env.PWDEBUG ? -1 : 60 * 1000);

BeforeAll(async function () {
  switch (process.env.BROWSER) {
    case 'firefox':
      browser = await firefox.launch(browserOptions);
      break;
    case 'webkit':
      browser = await webkit.launch(browserOptions);
      break;
    default:
      browser = await chromium.launch(browserOptions);
  }
});

Before({ tags: '@ignore' }, async function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return 'skipped' as any;
});

Before({ tags: '@debug' }, async function (this: ICustomWorld) {
  this.debug = true;
});

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
  if (getDeviceEmulationMode()) {
    switch (process.env.BROWSER) {
      case 'firefox':
        {
          const pixel3 = devices['Pixel 3'];
          this.context = await browser.newContext({
            ...pixel3,
          });
        }
        break;
      case 'webkit':
        {
          const iPhone11 = devices['iPhone 11'];
          this.context = await browser.newContext({
            ...iPhone11,
          });
        }
        break;
      default: {
        const pixel3 = devices['Pixel 3'];
        this.context = await browser.newContext({
          ...pixel3,
        });
      }
    }
  } else {
    // customize the [browser context](https://playwright.dev/docs/next/api/class-browser#browsernewcontextoptions)
    this.context = await browser.newContext({
      viewport: {
        width: 1920,
        height: 1080,
      },
      acceptDownloads: true,
      recordVideo: process.env.PWVIDEO ? { dir: 'screenshots' } : undefined,
    });
  }

  this.page = await this.context.newPage();
  this.page.on('console', async (msg) => {
    if (msg.type() === 'log') {
      await this.attach(msg.text());
    }
  });
  this.feature = pickle;
});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
  if (result) {
    await this.attach(
      `Status: ${result?.status}. Duration:${result.duration?.seconds}s`
    );

    if (result.status !== Status.PASSED) {
      const image = await this.page?.screenshot();
      image && (await this.attach(image, 'image/png'));
    }
  }
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser.close();
});
