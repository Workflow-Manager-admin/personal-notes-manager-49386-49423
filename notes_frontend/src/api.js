/**
 * API client for user authentication and notes CRUD.
 * Uses environment variable REACT_APP_BACKEND_URL for API base.
 */
const API_URL = process.env.REACT_APP_BACKEND_URL || "";

function handleResp(resp) {
  return resp.json().then((data) => {
    if (!resp.ok) throw (data?.error || data || resp.statusText);
    return data;
  });
}

// PUBLIC_INTERFACE
export function login({ email, password }) {
  /** Log a user in and return auth token. */
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(handleResp);
}

// PUBLIC_INTERFACE
export function signup({ email, password }) {
  /** Register a new user and return response. */
  return fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(handleResp);
}

// PUBLIC_INTERFACE
export function getNotes(token, params = {}) {
  /** Get list of notes for user (with optional search param). */
  const q = params.q ? `?q=${encodeURIComponent(params.q)}` : "";
  return fetch(`${API_URL}/notes${q}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(handleResp);
}

// PUBLIC_INTERFACE
export function getNote(token, id) {
  /** Fetch details for a single note. */
  return fetch(`${API_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(handleResp);
}

// PUBLIC_INTERFACE
export function createNote(token, note) {
  /** Create a new note. */
  return fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(note),
  }).then(handleResp);
}

// PUBLIC_INTERFACE
export function updateNote(token, id, note) {
  /** Update an existing note by ID. */
  return fetch(`${API_URL}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(note),
  }).then(handleResp);
}

// PUBLIC_INTERFACE
export function deleteNote(token, id) {
  /** Delete a note by ID */
  return fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then(handleResp);
}
