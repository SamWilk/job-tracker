import express from "express";
import pool from "../database/db.js";
import hashPassword from "../middleware/hashPassword.js";
import verifyPassword from "../middleware/verifyPassword.js";
import authenticateToken from "../middleware/authToken.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = "15m";

// Mock in-memory users DB
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];
let nextId = 3;

router.post("/api/", hashPassword, async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res
      .status(400)
      .json({ error: "Name, email, and password is required" });
  try {
    await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)",
      [username, email, password]
    );

    const userInfo = await pool.query(
      "select u.id, u.username, u.email, u.is_validated from users u where u.username=$1",
      [username]
    );
    if (userInfo.rowCount > 0) {
      const { id, username, email, is_validated } = userInfo.rows.pop();

      const token = jwt.sign(
        {
          id: id,
          username: username,
          email: email,
          is_validated: is_validated,
        },
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

      res.status(201).json({ message: "User created", username: username });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({ error: "Error creating user" });
  }
});

router.get("/api/", async (req, res) => {
  try {
    const results = await pool.query(
      "Select u.id, u.username, u.is_validated from users u;"
    );
    res.json(results.rows).status(200);
  } catch (error) {
    console.error("Error querying database");
    res.status(500);
  }
});

router.post("/api/login", verifyPassword, async (req, res) => {
  res.json({ message: "Login successful", user: req.user });
});

router.get("/api/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

router.put("/api/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, email } = req.body;

  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1)
    return res.status(404).json({ error: "User not found" });

  users[userIndex].name = name || users[userIndex].name;
  users[userIndex].email = email || users[userIndex].email;
  res.json(users[userIndex]);
});

router.delete("/api/:id", authenticateToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (req.user.id !== userId) {
      return res
        .status(403)
        .json({ error: "You can only delete your own account" });
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const result = await client.query(
        "DELETE FROM users WHERE id = $1 RETURNING username",
        [userId]
      );

      if (result.rowCount === 0) {
        await client.query("ROLLBACK");
        return res.status(404).json({ error: "User not found" });
      }

      await client.query("COMMIT");

      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.status(200).json({
        message: "Account successfully deleted",
        username: result.rows[0].username,
      });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete account" });
  }
});

///////////////////// PROFILE end points /////////////////////

router.get("/api/profile", authenticateToken, async (req, res) => {
  console.log("Trying to login, token is ok!");
  res.status(200);
});

export default router;
