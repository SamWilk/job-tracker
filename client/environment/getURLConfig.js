import { getEnv } from "./environmentDetector.js";

class UrlConfig {
  static getClientUrl() {
    const env = getEnv();
    let url;

    switch (env) {
      case "development":
        url = "https://localhost:5173";
        break;
      case "production":
        url = "https://myapp.com";
        break;
      case "test":
        url = "https://test.myapp.com";
        break;
      default:
        url = "https://localhost:5173";
    }

    return url;
  }

  static getApiUrl() {
    const env = getEnv();
    let url;

    switch (env) {
      case "development":
        url = "https://localhost:3001";
        break;
      case "production":
        url = "https://server:3001/api";
        break;
      case "test":
        url = "https://test-api.myapp.com:3001";
        break;
      default:
        url = "https://localhost:3001";
    }

    return url;
  }
}

export default UrlConfig;
