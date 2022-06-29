import type { IWorldOptions } from '@cucumber/cucumber';
import { setWorldConstructor, World } from '@cucumber/cucumber';
import type * as messages from '@cucumber/messages';
import type { BrowserContext, Page } from 'playwright';

import { ModerationState } from '../step-definitions/aaqua-admin/state/moderation-state.class';
import { getAdminBaseUrl, getPartnerBaseUrl } from '../utils/utils';

export interface ICustomWorld extends World {
  debug: boolean;
  feature?: messages.Pickle;
  context?: BrowserContext;
  page?: Page;

  loggedUser?: string;

  moderation: ModerationState;

  readonly site: AaquaSite;
}

export type AaquaSite = 'PARTNER' | 'ADMINISTRATION' | null;

// ts-prune-ignore-next
export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }

  debug = false;

  moderation = new ModerationState();

  page?: Page = undefined;

  get site(): AaquaSite {
    const url = this.page?.url();
    if (!url) {
      return null;
    }
    if (url.startsWith(getPartnerBaseUrl())) {
      return 'PARTNER';
    }
    if (url.startsWith(getAdminBaseUrl())) {
      return 'ADMINISTRATION';
    }

    return null;
  }
}

setWorldConstructor(CustomWorld);
