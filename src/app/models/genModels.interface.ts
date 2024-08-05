export interface Root {
  templateId: string;
  version: string;
  defaultLanguage: string;
  languages: string[];
  tree: Tree;
}

export interface Tree {
  id: string;
  name: string;
  localizedName: string;
  rmType: string;
  nodeId: string;
  min: number;
  max: number;
  localizedNames: LocalizedNames;
  localizedDescriptions: LocalizedDescriptions;
  aqlPath: string;
  children: Children[];
}

export interface LocalizedNames {
  en: string;
}

export interface LocalizedDescriptions {
  en: string;
}

export interface Children {
  id: string;
  name?: string;
  localizedName?: string;
  rmType: string;
  nodeId?: string;
  min: number;
  max: number;
  localizedNames?: LocalizedNames;
  localizedDescriptions?: LocalizedDescriptions;
  annotations?: Annotations;
  aqlPath: string;
  children?: Children[];
  inputs?: Input[];
  inContext?: boolean;
  termBindings?: TermBindings;
  dependsOn?: string[];
}

export interface Input {
  type: string;
  suffix?: string;
  list?: List[];
  listOpen?: boolean;
  terminology?: string;
  defaultValue?: string;
  validation?: Validation;
}

export interface List {
  value: string;
  label: string;
  localizedLabels?: LocalizedLabels;
  localizedDescriptions?: LocalizedDescriptions;
  validation?: Validation;
}

export interface LocalizedLabels {
  en: string;
}

export interface Validation {
  range: Range;
  precision?: Precision;
}

export interface Range {
  minOp: string;
  min: number;
  maxOp?: string;
  max?: number;
}

export interface Precision {
  minOp: string;
  min: number;
  maxOp: string;
  max: number;
}

export interface Annotations {
  comment: string;
}

export interface TermBindings {
  LOINC?: Terminology;
  LNC205?: Terminology;
  'SNOMED-CT'?: Terminology;
}

export interface Terminology {
  value: string;
  terminologyId: string;
}
