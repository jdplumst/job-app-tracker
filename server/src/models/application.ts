import { Status } from "@prisma/client";
import { Request } from "express";

export interface IGetAllApplicationsQuery {
  title?: string;
  board?: string;
  company?: string;
  location?: string;
  status?: Status;
}

interface ICreateApplicationBody {
  appliedDate: Date;
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
}

export interface ICreateApplicationRequest extends Request {
  body: ICreateApplicationBody;
}

interface IUpdateApplicationBody {
  appliedDate: Date;
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
}

export interface IUpdateApplicationRequest extends Request {
  body: IUpdateApplicationBody;
}
