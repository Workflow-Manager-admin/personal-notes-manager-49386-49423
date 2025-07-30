import React, { useEffect } from "react";
import "./App.css";
import { AuthProvider } from "./AuthContext";
import { useAuth } from "./useAuth";
import AppBar from "./components/AppBar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { themeStyles } from "./theme";

// PUBLIC_INTERFACE
function InnerApp() {
  // Modern Light Theme
  useEffect(() => {
    Object.entries(themeStyles).forEach(([key, val]) =>
      document.body.style.setProperty(key, val)
    );
    document.body.style.background = themeStyles["--bg"];
    return () => {}; // cleanup
  }, []);
  const { authenticated } = useAuth();
  return (
    <div>
      <AppBar />
      {authenticated ? <HomePage /> : <LoginPage />}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * App root: provides AuthContext and theme.
 */
function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

export default App;
