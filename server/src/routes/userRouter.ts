import express from "express";
import { getSession } from "../controllers/userController";

const router = express.Router();

router.get("/", getSession);

export default router;
