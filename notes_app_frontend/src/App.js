import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';
import NotesSidebar from './components/NotesSidebar';
import NoteEditor from './components/NoteEditor';
import { useLocalNotes } from './hooks/useLocalNotes';
import { filterNotes } from './utils/notesUtils';

// PUBLIC_INTERFACE
function App() {
  /**
   * PUBLIC_INTERFACE
   * Root application for the Notes app. Provides layout, theme switch,
   * and wires the sidebar (list/search) with the editor (create/edit/delete).
   */
  const {
    notes,
    createNote,
    updateNote,
    deleteNote,
    selectedId,
    selectNote,
    loadInitialSelection,
  } = useLocalNotes();

  const [query, setQuery] = useState('');
  const [theme] = useState('light'); // Light-only per requirement; wired for future theme toggling.

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Select initial note if any on first render
  useEffect(() => {
    loadInitialSelection();
  }, [loadInitialSelection]);

  const filtered = useMemo(() => filterNotes(notes, query), [notes, query]);
  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId]
  );

  const handleCreate = () => {
    const newNote = createNote();
    selectNote(newNote.id);
  };

  const handleDelete = (id) => {
    if (!id) return;
    const confirmed = window.confirm('Delete this note? This cannot be undone.');
    if (!confirmed) return;
    deleteNote(id);
  };

  const handleSave = (id, fields) => {
    if (!id) return;
    updateNote(id, fields);
  };

  return (
    <div className="app-shell">
      <NotesSidebar
        notes={filtered}
        query={query}
        onQueryChange={setQuery}
        selectedId={selectedId}
        onSelect={selectNote}
        onCreate={handleCreate}
        colors={{
          primary: '#1976d2',
          secondary: '#424242',
          accent: '#ffc107',
        }}
      />
      <main className="editor-area">
        {selectedNote ? (
          <NoteEditor
            key={selectedNote.id}
            note={selectedNote}
            onChange={(fields) => handleSave(selectedNote.id, fields)}
            onDelete={() => handleDelete(selectedNote.id)}
            colors={{
              primary: '#1976d2',
              secondary: '#424242',
              accent: '#ffc107',
            }}
          />
        ) : (
          <div className="empty-state">
            <h2>Quick Notes</h2>
            <p>Create a note to get started.</p>
            <button className="btn btn-primary" onClick={handleCreate}>
              + New note
            </button>
          </div>
        )}
      </main>

      <button
        className="fab"
        aria-label="Create new note"
        title="New note"
        onClick={handleCreate}
      >
        +
      </button>
    </div>
  );
}

export default App;
