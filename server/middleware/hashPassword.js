import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export default async function hashPassword(req, res, next) {
  try {
    if (!req.body || !req.body.password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Generate salt and hash
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Replace plain password with hashed version
    req.body.password = hashedPassword;

    next();
  } catch (err) {
    console.error("Password hashing error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
