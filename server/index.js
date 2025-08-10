import fs from "fs";
import https from "https";
import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from secure server!" });
});

// Load SSL key/cert
const sslOptions = {
  key: fs.readFileSync("./certs/server.key"),
  cert: fs.readFileSync("./certs/server.cert"),
};

// Start HTTPS server
https.createServer(sslOptions, app).listen(3001, () => {
  console.log("✅ HTTPS Server running at https://localhost:3001");
});
