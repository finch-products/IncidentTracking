export interface Document {
  id: number;
  file: string;
  allBranches: boolean;
  selectedBranch: string | null;
  sentOn: string;
  status: 'Successful' | 'Failed';
}
