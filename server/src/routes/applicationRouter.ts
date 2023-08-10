import express from "express";
import {
  createApplication,
  getAllApplications,
  updateApplication
} from "../controllers/applicationController";
import isAuthed from "../middleware/isAuthed";

const router = express.Router();

// Require auth
router.use(isAuthed);

router.get("/", getAllApplications);

router.get("/:id");

router.post("/", createApplication);

router.put("/:id", updateApplication);

export default router;
