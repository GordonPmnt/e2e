/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
require('dotenv').config();

export const getHeadlessMode = () => process.env.HEADLESS === 'true';

export const getDeviceEmulationMode = () =>
  process.env.DEVICE_EMULATION === 'true';

export const getAdminBaseUrl = () =>
  process.env.ADMIN_BASE_URL ?? 'https://administration.aaqua.live/';

export const getPartnerBaseUrl = () =>
  process.env.PARTNER_BASE_URL ?? 'https://partner.aaqua.live/';

export const delay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));
