import React, { useEffect, useState } from "react";
import { useAuth } from "../useAuth";
import { getNotes, getNote, createNote, updateNote, deleteNote } from "../api";
import Sidebar from "../components/Sidebar";
import NoteEditor from "../components/NoteEditor";
import { COLORS } from "../theme";

// PUBLIC_INTERFACE
export default function HomePage() {
  /**
   * Main page: sidebar (note list, search, add), main area (editor/view).
   */
  const { token } = useAuth();
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const loadNotes = async (searchVal = search) => {
    setLoading(true);
    setError("");
    try {
      const list = await getNotes(token, searchVal ? { q: searchVal } : {});
      setNotes(list || []);
      if (list.length > 0) {
        // If selected note was deleted, fallback to first.
        if (!selected || !list.some(n => n.id === selected)) setSelected(list[0].id);
      } else {
        setSelected(null);
      }
    } catch (err) {
      setError(err + "");
      setNotes([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadNotes();
    // eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    if (selected) {
      getNote(token, selected).then(setNote).catch(() => setNote(null));
    } else {
      setNote(null);
    }
    // eslint-disable-next-line
  }, [selected]);

  const handleAddNote = async () => {
    setSaving(true);
    setError("");
    try {
      const created = await createNote(token, { title: "Untitled", content: "" });
      await loadNotes();
      setSelected(created.id);
    } catch (err) {
      setError(err + "");
    }
    setSaving(false);
  };

  const handleSaveNote = async (values) => {
    setSaving(true);
    setError("");
    try {
      if (!values.id) {
        // new note
        const n = await createNote(token, values);
        await loadNotes();
        setSelected(n.id);
      } else {
        await updateNote(token, values.id, values);
        await loadNotes();
        setSelected(values.id);
      }
    } catch (err) {
      setError(err + "");
    }
    setSaving(false);
  };

  const handleDeleteNote = async (values) => {
    setSaving(true);
    setError("");
    try {
      await deleteNote(token, values.id);
      await loadNotes();
      // Set selected to another note (or null)
      if (notes.length > 1) setSelected(notes[0].id !== values.id ? notes[0].id : notes[1].id);
      else setSelected(null);
    } catch (err) {
      setError(err + "");
    }
    setSaving(false);
  };

  const handleSearch = async (val) => {
    setSearch(val);
    await loadNotes(val);
  };

  return (
    <div style={{
      background: COLORS.background,
      minHeight: "100vh",
      display: "flex",
      alignItems: "stretch",
      justifyContent: "stretch"
    }}>
      <Sidebar
        notes={notes}
        selectedId={selected}
        onSelect={setSelected}
        onAddNote={handleAddNote}
        search={search}
        onSearch={handleSearch}
      />
      <main style={{
        flex: "1 1 0",
        padding: "0 4vw",
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{ flex: "1 1 auto", width: "100%", display: "flex", flexDirection: "column" }}>
          {error && <div style={{
            color: "#e74c3c",
            fontSize: "1.12em",
            fontWeight: 600,
            textAlign: "center",
            margin: "2em 0"
          }}>{error}</div>}
          {(note || (!selected && notes.length === 0)) ? (
            <NoteEditor
              key={note?.id || "new"}
              note={note}
              loading={saving}
              onSave={handleSaveNote}
              onDelete={note ? handleDeleteNote : undefined}
            />
          ) : (
            <div style={{ textAlign: "center", marginTop: "6em", color: "#aaa" }}>
              <span style={{ fontSize: "1.6em" }}>Select or create a note</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
