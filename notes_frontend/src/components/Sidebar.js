import React from "react";
import { COLORS } from "../theme";
import "./Sidebar.css";

// PUBLIC_INTERFACE
export default function Sidebar({ notes, selectedId, onSelect, onAddNote, search, onSearch }) {
  /**
   * Sidebar for notes navigation, with search and add note.
   */
  return (
    <nav className="notes-sidebar" style={{ background: COLORS.secondary }}>
      <div className="sidebar-header">
        <input
          className="note-search"
          placeholder="Search..."
          value={search}
          onChange={e => onSearch(e.target.value)}
          aria-label="Search notes"
        />
        <button className="add-note-btn" onClick={onAddNote} tabIndex={0} aria-label="Add Note">
          + New
        </button>
      </div>
      <ul className="notes-list" role="listbox">
        {notes.length === 0 && <li className="note-list-empty">No notes</li>}
        {notes.map(note => (
          <li
            key={note.id}
            tabIndex={0}
            className={`note-list-item${note.id === selectedId ? " selected" : ""}`}
            onClick={() => onSelect(note.id)}
            onKeyDown={e => { if (e.key === "Enter") onSelect(note.id); }}
            aria-selected={note.id === selectedId}
          >
            <div className="note-list-title">{note.title || <em>(Untitled)</em>}</div>
            <div className="note-list-updated">
              {note.updated_at ? new Date(note.updated_at).toLocaleString() : ""}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
