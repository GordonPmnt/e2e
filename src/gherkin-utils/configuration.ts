type ErrorOptions = {
  scenariosMustMatchFeatureFile: boolean;
  stepsMustMatchFeatureFile: boolean;
  allowScenariosNotInFeatureFile: boolean;
};

export type Options = {
  loadRelativePath?: boolean;
  tagFilter?: string;
  errors?: ErrorOptions | boolean;
  scenarioNameTemplate?: (vars: ScenarioNameTemplateVars) => string;
};

type ScenarioNameTemplateVars = {
  featureTitle: string;
  scenarioTitle: string;
  scenarioTags: string[];
  featureTags: string[];
};

const defaultErrorSettings = {
  scenariosMustMatchFeatureFile: true,
  stepsMustMatchFeatureFile: true,
  allowScenariosNotInFeatureFile: false,
};

const defaultConfiguration: Options = {
  tagFilter: undefined,
  scenarioNameTemplate: undefined,
  errors: defaultErrorSettings,
};

const globalConfiguration: Options = {} as Options;

export const getCucumberConfiguration = (options?: Options) => {
  const mergedOptions = {
    ...defaultConfiguration,
    ...globalConfiguration,
    ...(options || {}),
  };

  if (mergedOptions.errors === true) {
    mergedOptions.errors = defaultErrorSettings;
  }

  return mergedOptions;
};
