export interface EntityModel {
  id: string;
  types: string[];
  attributes: KeyValuePair[];
}

export interface KeyValuePair {
  key: string;  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any|undefined;
}
