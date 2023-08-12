export interface ApiError {
  message: string;
}

export interface Auth {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
}

export interface Application {
  id: string;
  appliedDate?: Date | string;
  title: string;
  board: string;
  postingURL: string;
  company: string;
  companyDescription: string;
  jobDescription: string;
  qualifications: string;
  compensation?: string;
  location: string;
  notes?: string;
  status: Status;
  authorId: string;
}

export enum Status {
  Saved = "Saved",
  Applied = "Applied",
  Interview = "Interview",
  Rejected = "Rejected",
  Offer = "Offer",
}
