// envDetector.js

export function getEnv() {
  const mode = import.meta.env.MODE;
  if (mode === "production") return "production";
  if (mode === "development") return "development";
  if (mode === "test") return "test";
  return "unknown";
}
