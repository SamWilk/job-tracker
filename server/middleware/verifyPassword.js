import bcrypt from "bcrypt";
import pool from "../database/db.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = "15m";

export default async function verifyPassword(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const result = await pool.query(
      "SELECT id, username, password_hash, is_validated FROM users WHERE email = $1",
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const { id, username, password_hash, is_validated } = result.rows[0];
    const match = await bcrypt.compare(password, password_hash);

    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: id, username: username, email: email, is_validated: is_validated },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRY,
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    req.user = { id: id, username: username };

    next();
  } catch (err) {
    console.error("Password verification error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
