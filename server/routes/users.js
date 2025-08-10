import express from "express";

const router = express.Router();

// Mock in-memory users DB
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];
let nextId = 3;

router.post("/", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ error: "Name and email are required" });

  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

router.get("/", (req, res) => {
  res.json(users);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, email } = req.body;

  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1)
    return res.status(404).json({ error: "User not found" });

  users[userIndex].name = name || users[userIndex].name;
  users[userIndex].email = email || users[userIndex].email;
  res.json(users[userIndex]);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1)
    return res.status(404).json({ error: "User not found" });

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser[0]);
});

export default router;
