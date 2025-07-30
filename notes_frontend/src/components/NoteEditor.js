import React, { useState, useEffect, useRef } from "react";
import { COLORS } from "../theme";
import "./NoteEditor.css";

// PUBLIC_INTERFACE
export default function NoteEditor({ note, loading, onSave, onDelete }) {
  /**
   * Note editor for creating or editing notes.
   */
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [editMode, setEditMode] = useState(!note || !!onSave);
  const [error, setError] = useState("");
  const titleInput = useRef(null);

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
    setEditMode(!note);
    setError("");
  }, [note]);

  useEffect(() => {
    if (editMode && titleInput.current) {
      titleInput.current.focus();
    }
  }, [editMode]);

  const handleSave = (e) => {
    e.preventDefault();
    setError("");
    if (!title.trim() && !content.trim()) {
      setError("Note cannot be empty.");
      return;
    }
    if (onSave) onSave({ ...note, title: title.trim(), content });
    setEditMode(false);
  };

  return (
    <div className="note-editor" style={{ background: COLORS.surface }}>
      {note && !editMode && (
        <button className="edit-note-btn" onClick={() => setEditMode(true)} aria-label="Edit note">✏️ Edit</button>
      )}
      <form className="note-form" onSubmit={handleSave}>
        <input
          type="text"
          ref={titleInput}
          className="note-title-input"
          placeholder="Title"
          value={title}
          readOnly={!editMode}
          onChange={e => setTitle(e.target.value)}
          aria-label="Note title"
        />
        <textarea
          className="note-content-input"
          placeholder="Write your note here..."
          value={content}
          readOnly={!editMode}
          onChange={e => setContent(e.target.value)}
          rows={10}
          aria-label="Note content"
        />
        {error && <div className="note-form-error">{error}</div>}
        {editMode && (
          <div className="note-editor-actions">
            <button
              className="btn-primary"
              type="submit"
              disabled={loading}
              aria-label={note ? "Save note" : "Create note"}
            >
              {loading ? "Saving..." : (note ? "Save" : "Create")}
            </button>
            {note && onDelete &&
              <button
                className="btn-danger"
                type="button"
                onClick={() => { if (window.confirm("Delete this note?")) onDelete(note); }}
                disabled={loading}
                aria-label="Delete note"
              >
                Delete
              </button>
            }
            <button
              className="btn-secondary"
              type="button"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
