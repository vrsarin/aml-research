export interface EntityModel {
  id: string;
  labels: string[];
  attributes: KeyValuePair[];
}

export interface KeyValuePair {
  key: string;
  value: any | undefined;
}
