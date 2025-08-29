import express from "express";
import authenticateToken from "../middleware/authToken.js";

const router = express.Router();

router.get("/api/verify", authenticateToken, async (req, res) => {
  res.json({ valid: true, user: req.user });
});

router.post("/api/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  return res.sendStatus(200);
});

export default router;
