import { DvDateTime } from './DVrmType.interface';

export interface TreeNode {
  id: string;
  name?: string;
  rmType?: string;
  min: number;
  max: number;
  aqlPath: string;
  children?: TreeNode[] | DvDateTime[];
  inContext?: boolean;
  inputs?: inputs[];
  localizedName?: string;
  localizedNames?: Record<string, string>;
  localizedDescriptions?: Record<string, string>;
}

export interface inputs {
  suffix?: string;
  type: string;
  list?: {
    value: string;
    label: string;
    localizedLabels?: Record<string, string>;
  }[];
  terminology?: string;
}
