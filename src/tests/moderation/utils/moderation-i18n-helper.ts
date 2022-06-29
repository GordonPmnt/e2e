const violationsToEnLabel = {
  ANIMAL_ABUSE: 'Animal abuse',
  ANSA: 'ANSA',
  BULLYING: 'Bullying Harassment',
  CHILD: 'Child Safety',
  CREDIBLE_THREAT: 'Credible threat',
  CRIMINAL: 'VICO',
  DANGEROUS_ACTS: 'Dangerous Acts',
  FAKE: 'Misinfo and harm',
  FRAUD: 'Fraud and deception',
  HATE_SPEECH: 'Hate Speech',
  HUMAN_EXPLOITATION: 'Human exploitation',
  INTELLECTUAL_PROPERTY: 'Intellectual property',
  OTHER: 'Other',
  PII: 'PII',
  PERSONAL_DATA: 'Personal Data',
  REGULATED: 'Regulated',
  SPAM: 'Spam',
  SELF_HARM: 'SSH',
  VIOLENCE_GRAPHIC: 'Graphic',
  VIOLENCE_INCITEMENT: 'Violence Incitement',
};

type ViolationsToEnLabel = typeof violationsToEnLabel;

export type ViolationType = keyof ViolationsToEnLabel;

export const getTranslatedViolation = (violation: ViolationType): string =>
  violationsToEnLabel[violation];
