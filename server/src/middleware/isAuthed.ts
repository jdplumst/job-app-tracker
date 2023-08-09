import { NextFunction, Request, Response } from "express";

export default function isAuthed(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session.user) next();
  else
    return res
      .status(401)
      .json({ message: "You are not authorized to make this request" });
}
