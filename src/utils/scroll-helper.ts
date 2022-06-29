import type { Page } from 'playwright';

export const scrollToTopOfPage = async (page: Page) =>
  page.mouse.wheel(0, -1080);

export const scrollToBottomOfPage = async (page: Page) =>
  page.mouse.wheel(0, 1080);
