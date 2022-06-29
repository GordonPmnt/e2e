import type { Options } from './configuration';

export type ParsedStep = {
  keyword: string;
  stepText: string;
  stepArgument: string | Record<string, unknown>;
  lineNumber: number;
};

export type ParsedScenario = {
  title: string;
  steps: ParsedStep[];
  tags: string[];
  lineNumber: number;
  skippedViaTagFilter: boolean;
};

export type ParsedScenarioOutline = {
  title: string;
  tags: string[];
  scenarios: ParsedScenario[];
  steps: ParsedStep[];
  lineNumber: number;
  skippedViaTagFilter: boolean;
};

export type ParsedFeature = {
  title: string;
  scenarios: ParsedScenario[];
  scenarioOutlines: ParsedScenarioOutline[];
  options: Options;
  tags: string[];
};
