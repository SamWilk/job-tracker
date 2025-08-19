import { useState, useEffect, useCallback } from "react";
import UrlConfig from "../../../environment/getURLConfig";

export function useAuthCheck({ pollInterval = null } = {}) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const apiUrl = UrlConfig.getApiUrl();

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/auth/verify`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
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

  const logout = useCallback(async () => {
    try {
      const res = await fetch(`${apiUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setAuthenticated(false);
        setUser(null);
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout request failed:", err);
    }
  }, [apiUrl]);

  useEffect(() => {
    checkAuth();

    let interval;
    if (pollInterval) {
      interval = setInterval(() => {
        checkAuth();
      }, pollInterval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [checkAuth, pollInterval]);

  return { loading, authenticated, user, recheck: checkAuth, logout };
}
