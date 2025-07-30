//
// Theme palette and utility functions for the notes application.
//
export const COLORS = {
  primary: "#1976d2",
  primaryDark: "#115293",
  secondary: "#90caf9",
  accent: "#ffc107",
  background: "#f5f7fa",
  surface: "#fff",
  text: "#24292f",
  textSecondary: "#656d78",
  border: "#e0e0e0",
};

export const SHADOW = "0 2px 8px rgba(25, 118, 210, 0.08)";

export const themeStyles = {
  "--primary": COLORS.primary,
  "--primary-dark": COLORS.primaryDark,
  "--secondary": COLORS.secondary,
  "--accent": COLORS.accent,
  "--bg": COLORS.background,
  "--surface": COLORS.surface,
  "--text": COLORS.text,
  "--text-secondary": COLORS.textSecondary,
  "--border": COLORS.border,
  "--shadow": SHADOW,
};
