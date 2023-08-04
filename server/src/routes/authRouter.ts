import express from "express";

const router = express.Router();

router.post("/signup", (req, res) => res.send("Hello World!"));

router.post("/login");

export default router;
