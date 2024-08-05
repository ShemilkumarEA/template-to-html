import { TreeNode } from './basicRmTypes.interface';

//Interface for Type DVText
export interface DvText extends TreeNode {
  rmType: 'DV_TEXT';
}

//Interface for Type DVCodedText
export interface DvCodedText extends TreeNode {
  rmType: 'DV_CODED_TEXT';
}

//Interface for Type DVDatetime
export interface DvDateTime extends TreeNode {
  rmType: 'DV_DATE_TIME';
}

export interface DvInterval<DvDateTime> extends TreeNode {
  rmType: 'DV_INTERVAL<DV_DATE_TIME>';
}
