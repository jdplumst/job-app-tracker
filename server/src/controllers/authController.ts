import { ISignupRequest } from "../models/auth";
import { Request, Response } from "express";
import { prisma } from "../prisma/db";
import bcrypt from "bcrypt";

export const signup = async (req: ISignupRequest, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "All fields must be filled" });
  }
  const exists = await prisma.user.findFirst({ where: { username: username } });
  if (exists) {
    return res.status(400).json({ error: "Username already taken" });
  }
  if (
    password.length < 8 ||
    password.toUpperCase() === password ||
    password.toLowerCase() === password ||
    !/\d/.test(password) ||
    !/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)
  ) {
    return res.status(400).send({
      error:
        "Password must contain at least 1 lowercase character, " +
        "1 uppercase character, 1 digit, 1 special character, and 8 characters total"
    });
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  const user = await prisma.user.create({
    data: { username: username, passwordHash: hash }
  });
  req.session.user = { userId: user.id, username: user.username };
  return res.status(200).json({ id: user.id, username: user.username });
};

export const login = async (req: ISignupRequest, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "All fields must be filled" });
  }
  const user = await prisma.user.findFirst({ where: { username: username } });
  if (!user) {
    return res.status(401).json({ error: "Incorrect username" });
  }
  const pwdMatch = await bcrypt.compare(password, user.passwordHash);
  if (!pwdMatch) {
    return res.status(401).send({ error: "Incorrect password" });
  }
  req.session.user = { userId: user.id, username: username };
  return res.status(200).json({ id: user.id, username: user.username });
};

export const logout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json(err);
    res.clearCookie("jat_sid");
    return res.sendStatus(200);
  });
};
