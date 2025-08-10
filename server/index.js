import fs from "fs";
import https from "https";
import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use("/users", usersRouter);

const sslOptions = {
  key: fs.readFileSync("./certs/server.key"),
  cert: fs.readFileSync("./certs/server.cert"),
};

https.createServer(sslOptions, app).listen(3001, () => {
  console.log("HTTPS API running on https://localhost:3001");
});
