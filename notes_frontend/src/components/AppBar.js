import React from "react";
import { useAuth } from "../useAuth";
import { COLORS } from "../theme";
import "./AppBar.css";

// PUBLIC_INTERFACE
export default function AppBar({ onSidebarToggle }) {
  /** Top app bar with title and actions. */
  const { authenticated, logout } = useAuth();

  return (
    <header className="notebar" style={{ background: COLORS.primary }}>
      {onSidebarToggle && (
        <button
          className="sidebar-toggle"
          onClick={onSidebarToggle}
          aria-label="Open sidebar"
          style={{ background: "none", border: "none", color: "#fff" }}
        >
          ☰
        </button>
      )}
      <span className="notebar-title" style={{ color: "#fff" }}>
        <strong>Notes App</strong>
      </span>
      <span className="notebar-actions" style={{ marginLeft: "auto" }}>
        {authenticated && (
          <button className="logout-btn" onClick={logout} style={{ color: "#fff", background: COLORS.accent }}>
            Logout
          </button>
        )}
      </span>
    </header>
  );
}
