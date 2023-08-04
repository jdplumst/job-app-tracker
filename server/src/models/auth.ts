import { Request } from "express";

interface ISignupBody {
  username: string;
  password: string;
}

export interface ISignupRequest extends Request {
  body: ISignupBody;
}
