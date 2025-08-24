import express from "express";
const router = express.Router();

// CREATE
router.post("/", (req, res) => {
  res.sendStatus(200);
});

// READ ALL
router.get("/", (req, res) => {
  res.sendStatus(200);
});

// READ ONE
router.get("/:id", (req, res) => {
  res.sendStatus(200);
});

// UPDATE
router.put("/:id", (req, res) => {
  res.sendStatus(200);
});

// DELETE
router.delete("/:id", (req, res) => {
  res.sendStatus(200);
});

export default router;
