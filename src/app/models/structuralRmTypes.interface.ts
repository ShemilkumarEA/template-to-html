import { TreeNode } from './basicRmTypes.interface';

export interface Observation extends TreeNode {
  rmType: 'OBSERVATION';
}

export interface IntervalEvent extends TreeNode {
  rmType: 'INTERVAL_EVENT';
}

export interface Section extends TreeNode {
  rmType: 'SECTION';
}

export interface AdminEntry extends TreeNode {
  rmType: 'ADMIN_ENTRY';
}

export interface PointEvent extends TreeNode {
  rmType: 'POINT_EVENT';
}

export interface Instruction extends TreeNode {
  rmType: 'INSTRUCTION';
}

export interface Activity extends TreeNode {
  rmType: 'ACTIVITY';
}

export interface Evaluation extends TreeNode {
  rmType: 'EVALUATION';
}

export interface Element extends TreeNode {
  rmType: 'ELEMENT';
}

export interface Cluster extends TreeNode {
  rmType: 'CLUSTER';
}

export interface Composition extends TreeNode {
  rmType: 'COMPOSITION';
}

export interface EventContext extends TreeNode {
  rmType: 'EVENT_CONTEXT';
}

export interface Event extends TreeNode {
  rmType: 'EVENT';
}
