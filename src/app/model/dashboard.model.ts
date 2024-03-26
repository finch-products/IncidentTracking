
export interface Document {
  id: number;
  title: string;
  sentOn: string;
  branchId: number;
  acknowledged: boolean;
  seen: boolean;
}

export interface Branch {
  id: number;
  name: string;
  confirmed: boolean;
  location: string;
  city: string;
  state: string;
}

export interface GroupedEntry {
  date: string;
  branchId: number;
  documentCount: number;
}

export interface Notice {
  branchId: number;
  status: string;
  seen: boolean;
  confirmed: boolean;
  title: string;
  url: string;
}


