export interface EntityModel {
  elementId: string;
  id: string;
  labels: string[];
  attributes: KeyValuePair[];
}

export interface KeyValuePair {
  key: string;
  value: any | undefined;
}
