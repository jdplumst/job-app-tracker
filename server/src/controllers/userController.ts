import { Request, Response } from "express";

export const getSession = async (req: Request, res: Response) => {
  const user = req.session.user;
  if (!user) {
    return res.status(404).json({ message: "You are not logged in" });
  }
  return res.status(200).json(user);
};
