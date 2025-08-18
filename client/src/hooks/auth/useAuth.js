import { useState, useEffect, useCallback } from "react";
import UrlConfig from "../../../environment/getURLConfig";

export function useAuthCheck() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const apiUrl = UrlConfig.getApiUrl();

  // Function to fetch auth status + user info
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch(`${apiUrl}/auth/verify`, {
        method: "GET",
        credentials: "include", // send HttpOnly cookie
      });

      if (res.ok) {
        const data = await res.json(); // assume server returns { user: {...} }
        setAuthenticated(true);
        setUser(data.user || null);
      } else {
        setAuthenticated(false);
        setUser(null);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      checkAuth();
    }

    return () => {
      isMounted = false;
    };
  }, [checkAuth]);

  return { loading, authenticated, user, refreshAuth: checkAuth };
}
