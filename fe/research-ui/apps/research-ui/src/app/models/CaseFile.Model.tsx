export interface CaseFileModel {
  identifier: number;
  caseStatus: CaseStatus;
  name: string;
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
