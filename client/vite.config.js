import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "./certs/trackr.local.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "./certs/trackr.local.cert")),
    },
    port: 3000,
  },
});
