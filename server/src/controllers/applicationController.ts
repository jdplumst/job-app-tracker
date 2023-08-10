import { Response } from "express";
import {
  ICreateApplicationRequest,
  IUpdateApplicationRequest
} from "../models/application";
import { prisma } from "../prisma/db";
import { ObjectId } from "mongodb";

export const createApplication = async (
  req: ICreateApplicationRequest,
  res: Response
) => {
  const {
    appliedDate,
    title,
    board,
    postingURL,
    company,
    companyDescription,
    jobDescription,
    qualifications,
    compensation,
    location,
    notes,
    status
  } = req.body;
  if (
    !title ||
    !board ||
    !postingURL ||
    !company ||
    !companyDescription ||
    !jobDescription ||
    !qualifications ||
    !location ||
    !status
  ) {
    return res.status(400).json({
      message:
        "Must include job title, job board, posting URL, company, company description, job description, qualifications, job location and application status"
    });
  }
  if (
    status !== "Saved" &&
    status !== "Applied" &&
    status !== "Interview" &&
    status !== "Rejected" &&
    status !== "Offer"
  ) {
    return res.status(400).json({
      message:
        "Application Status must be either: Saved, Applied, Interview, Rejected or Offer"
    });
  }
  if (status !== "Saved" && !appliedDate) {
    return res
      .status(400)
      .json({ message: "Must set application date for applied jobs" });
  }
  const authorId = req.session.user?.userId!;
  const application = await prisma.application.create({
    data: {
      appliedDate,
      title,
      board,
      postingURL,
      company,
      companyDescription,
      jobDescription,
      qualifications,
      compensation,
      location,
      notes,
      status,
      authorId
    }
  });
  return res.status(200).json(application);
};

export const updateApplication = async (
  req: IUpdateApplicationRequest,
  res: Response
) => {
  const appId = req.params.id;
  if (!ObjectId.isValid(appId)) {
    return res
      .status(400)
      .json({ message: "Must enter a valid job application id" });
  }
  const {
    appliedDate,
    title,
    board,
    postingURL,
    company,
    companyDescription,
    jobDescription,
    qualifications,
    compensation,
    location,
    notes,
    status
  } = req.body;
  const userId = req.session.user?.userId;
  const application = await prisma.application.findFirst({
    where: { id: appId, authorId: userId }
  });
  if (!application) {
    return res.status(404).json({ message: "Job application not found" });
  }
  if (
    !title ||
    !board ||
    !postingURL ||
    !company ||
    !companyDescription ||
    !jobDescription ||
    !qualifications ||
    !location ||
    !status
  ) {
    return res.status(400).json({
      message:
        "Must include job title, job board, posting URL, company, company description, job description, qualifications, job location and application status"
    });
  }
  if (status !== "Saved" && !appliedDate && !application.appliedDate) {
    return res
      .status(400)
      .json({ message: "Must set application date for applied jobs" });
  }
  const update = await prisma.application.update({
    data: {
      appliedDate,
      title,
      board,
      postingURL,
      company,
      companyDescription,
      jobDescription,
      qualifications,
      compensation,
      location,
      notes,
      status
    },
    where: { id: appId, authorId: userId }
  });
  return res.status(200).json(update);
};
