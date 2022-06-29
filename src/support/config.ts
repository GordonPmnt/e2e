import type { LaunchOptions } from 'playwright';

import { getHeadlessMode } from '../utils/utils';
export const browserOptions: LaunchOptions = {
  slowMo: 0,
  headless: getHeadlessMode(),
  args: [
    '--use-fake-ui-for-media-stream',
    '--use-fake-device-for-media-stream',
  ],
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true,
  },
};
