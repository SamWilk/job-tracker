import express from "express";
import authenticateToken from "../middleware/authToken.js";

const router = express.Router();

router.get("/verify", authenticateToken, async (req, res) => {
  console.log("Token is ok!");
  res.json({ valid: true, user: req.user });
});

export default router;
