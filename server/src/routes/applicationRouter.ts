import express from "express";
import { createApplication } from "../controllers/applicationController";
import isAuthed from "../middleware/isAuthed";

const router = express.Router();

router.use(isAuthed);

router.post("/", createApplication);

export default router;
