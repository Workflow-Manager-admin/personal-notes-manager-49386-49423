import React, { useState } from "react";
import { useAuth } from "../useAuth";
import { COLORS } from "../theme";

// PUBLIC_INTERFACE
export default function LoginPage() {
  /**
   * Login/signup page with form.
   */
  const { login, signup, loading, authError } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.email || !values.password) return;
    await (isSignup ? signup(values.email, values.password) : login(values.email, values.password));
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: COLORS.secondary,
    }}>
      <form
        onSubmit={handleSubmit}
        aria-label={isSignup ? "Sign up" : "Sign in"}
        style={{
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(25,118,210,0.11)",
          padding: "2.5rem 2rem",
          minWidth: 320,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: "1rem"
        }}
      >
        <h2 style={{ color: COLORS.primary, margin: "0 0 1.2em" }}>{isSignup ? "Sign Up" : "Welcome Back"}</h2>
        <label>
          Email:
          <input
            name="email"
            type="email"
            placeholder="you@email.com"
            value={values.email}
            autoComplete="email"
            onChange={e => setValues(v => ({ ...v, email: e.target.value }))}
            style={{
              border: `1.1px solid ${COLORS.border}`,
              borderRadius: 6,
              padding: "0.52em 0.7em",
              marginTop: 2,
              fontSize: "1rem"
            }}
            required
            aria-required="true"
          />
        </label>
        <label>
          Password:
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={values.password}
            autoComplete={isSignup ? "new-password" : "current-password"}
            onChange={e => setValues(v => ({ ...v, password: e.target.value }))}
            style={{
              border: `1.1px solid ${COLORS.border}`,
              borderRadius: 6,
              padding: "0.52em 0.7em",
              marginTop: 2,
              fontSize: "1rem"
            }}
            required
            minLength={6}
            aria-required="true"
          />
        </label>
        {authError && <div style={{ color: "#e74c3c", fontWeight: 600 }}>{authError}</div>}
        <button
          type="submit"
          style={{
            background: COLORS.primary,
            color: "#fff",
            border: "none",
            borderRadius: 5,
            fontWeight: 700,
            fontSize: "1.1rem",
            cursor: "pointer",
            padding: "0.63em 1.42em"
          }}
          disabled={loading}
        >
          {loading ? (isSignup ? "Signing up..." : "Signing in...") : (isSignup ? "Sign Up" : "Sign In")}
        </button>
        <button
          type="button"
          onClick={() => setIsSignup(s => !s)}
          style={{
            background: "none",
            border: "none",
            color: COLORS.accent,
            fontWeight: 600,
            fontSize: "1em",
            marginTop: "0.5em",
            cursor: "pointer"
          }}
        >
          {isSignup ? "Already have an account? Sign in" : "No account? Sign up"}
        </button>
      </form>
    </div>
  );
}
