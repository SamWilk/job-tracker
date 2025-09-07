import express from "express";
import cors from "cors";

import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import applicationsRouter from "./routes/applcations.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["https://localhost:3000", "https://localhost:443", "https://localhost:80"],
    credentials: true,
  })
);

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/applications", applicationsRouter);

app.get("/", (req, res) => {
  res.send("This is the API");
});

app.get("/healthz", (req, res) => {
  console.log("Hello world, I am alive");
  res.send("Hello world, I am alive");
});

const PORT = 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`HTTP API running on http://0.0.0.0:${PORT}`);
});
