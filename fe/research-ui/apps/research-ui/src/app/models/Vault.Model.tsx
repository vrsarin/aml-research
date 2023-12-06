export interface CaseFileModel {
  vaultId: string;
  name: string;
  status: CaseStatus;  
  description: string;
}

export enum CaseStatus {
  Open,
  DataGathering,
  Analyzing,
  ReportGeneration,
  Closed,
  Archived,
}
