import express from "express";
import {
  createApplication,
  deleteApplication,
  getAllApplications,
  getApplication,
  updateApplication
} from "../controllers/applicationController";
import isAuthed from "../middleware/isAuthed";

const router = express.Router();

// Require auth
router.use(isAuthed);

router.get("/", getAllApplications);

router.get("/:id", getApplication);

router.post("/", createApplication);

router.put("/:id", updateApplication);

router.delete("/:id", deleteApplication);

export default router;
