import { useContext } from "react";
import { AuthContext } from "./AuthContext";

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access authentication context. */
  return useContext(AuthContext);
}
