import React, { createContext, useState, useEffect } from "react";
import { login as apiLogin, signup as apiSignup } from "./api";

export const AuthContext = createContext();

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /**
   * Provides authentication context for the app.
   * - Stores auth token in localStorage.
   * - Handles login, signup, logout.
   */
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setAuthError("");
    try {
      const { token, user } = await apiLogin({ email, password });
      setToken(token);
      setUser(user);
      setLoading(false);
      return true;
    } catch (err) {
      setAuthError(typeof err === "string" ? err : (err?.message || "Login failed"));
      setLoading(false);
      return false;
    }
  };

  const handleSignup = async (email, password) => {
    setLoading(true);
    setAuthError("");
    try {
      await apiSignup({ email, password });
      setLoading(false);
      // auto login after signup
      return await handleLogin(email, password);
    } catch (err) {
      setAuthError(typeof err === "string" ? err : (err?.message || "Signup failed"));
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        authError,
        login: handleLogin,
        signup: handleSignup,
        logout,
        authenticated: !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
