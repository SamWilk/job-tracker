import express from "express";
import cors from "cors";

import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import applicationsRouter from "./routes/applcations.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["https://localhost:3000", "https://localhost:443", ""],
    credentials: true,
  })
);

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/applications", applicationsRouter);

app.get("/", () => {
  console.log("Hello world, I am alive");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`HTTP API running on http://localhost:${PORT}`);
});
