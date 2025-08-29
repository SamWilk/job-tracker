import express from "express";
import pool from "../database/db.js";
import authenticateToken from "../middleware/authToken.js";
const router = express.Router();

// CREATE
router.post("/", authenticateToken, async (req, res) => {
  const {
    user_id,
    company_name,
    position_title,
    application_date,
    status,
    notes,
    url,
  } = req.body;
  if (!user_id || !company_name || !position_title) {
    return res.status(400).json({
      error: "user_id, company_name, and position_title are required",
    });
  }
  try {
    const result = await pool.query(
      `INSERT INTO job_applications (user_id, company_name, position_title, application_date, status, notes, url)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        user_id,
        company_name,
        position_title,
        application_date || new Date(),
        status || "Pending",
        notes || null,
        url || null,
      ]
    );
    res
      .status(201)
      .json({ message: "Application created", application: result.rows[0] });
  } catch (error) {
    console.error("Error inserting job application:", error);
    res.status(500).json({ error: "Failed to create job application" });
  }
});

// READ ALL for a specific user
router.get("/", authenticateToken, async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) {
    return res
      .status(400)
      .json({ error: "user_id query parameter is required" });
  }
  try {
    const result = await pool.query(
      `SELECT 
        ja.id,
        ja.company_name,
        ja.position_title,
        ja.application_date,
        ja.status,
        ja.notes,
        ja.url
      FROM job_applications ja
      WHERE ja.user_id = $1
      ORDER BY ja.application_date DESC`,
      [user_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({ error: "Failed to fetch job applications" });
  }
});

// READ ONE
router.get("/:id", authenticateToken, (req, res) => {
  res.sendStatus(200);
});

// UPDATE for a specific user's application
router.put("/:id", authenticateToken, async (req, res) => {
  const {
    user_id,
    company_name,
    position_title,
    application_date,
    status,
    notes,
    url,
  } = req.body;
  const { id } = req.params;
  if (!user_id) {
    return res.status(400).json({ error: "user_id is required in body" });
  }
  try {
    const result = await pool.query(
      `UPDATE job_applications SET
        company_name = COALESCE($1, company_name),
        position_title = COALESCE($2, position_title),
        application_date = COALESCE($3, application_date),
        status = COALESCE($4, status),
        notes = COALESCE($5, notes),
        url = COALESCE($6, url),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $7 AND user_id = $8
      RETURNING *`,
      [
        company_name,
        position_title,
        application_date,
        status,
        notes,
        url,
        id,
        user_id,
      ]
    );
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: "Application not found for this user" });
    }
    res
      .status(200)
      .json({ message: "Application updated", application: result.rows[0] });
  } catch (error) {
    console.error("Error updating job application:", error);
    res.status(500).json({ error: "Failed to update job application" });
  }
});

// DELETE for a specific user's application
router.delete("/:id", authenticateToken, async (req, res) => {
  const { user_id } = req.body;
  const { id } = req.params;
  if (!user_id) {
    return res.status(400).json({ error: "user_id is required in body" });
  }
  try {
    const result = await pool.query(
      `DELETE FROM job_applications WHERE id = $1 AND user_id = $2 RETURNING *`,
      [id, user_id]
    );
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: "Application not found for this user" });
    }
    res
      .status(200)
      .json({ message: "Application deleted", application: result.rows[0] });
  } catch (error) {
    console.error("Error deleting job application:", error);
    res.status(500).json({ error: "Failed to delete job application" });
  }
});

export default router;
