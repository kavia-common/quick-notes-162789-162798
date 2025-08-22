import { useCallback, useEffect, useMemo, useState } from 'react';
import { generateId } from '../utils/notesUtils';

const STORAGE_KEY = process.env.REACT_APP_STORAGE_KEY || 'quick-notes__v1';
const STORAGE_SELECTED_KEY = process.env.REACT_APP_SELECTED_KEY || 'quick-notes__selected';

/**
 * PUBLIC_INTERFACE
 * useLocalNotes provides CRUD operations for notes, persisted to localStorage.
 */
export function useLocalNotes() {
  const [notes, setNotes] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [selectedId, setSelectedId] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_SELECTED_KEY) || null;
    } catch {
      return null;
    }
  });

  // Persist notes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // ignore quota errors
    }
  }, [notes]);

  // Persist selected
  useEffect(() => {
    try {
      if (selectedId) localStorage.setItem(STORAGE_SELECTED_KEY, selectedId);
      else localStorage.removeItem(STORAGE_SELECTED_KEY);
    } catch {
      // ignore
    }
  }, [selectedId]);

  const selectNote = useCallback((id) => {
    setSelectedId(id);
  }, []);

  const loadInitialSelection = useCallback(() => {
    setSelectedId((curr) => {
      if (curr && notes.some((n) => n.id === curr)) return curr;
      return notes[0]?.id || null;
    });
  }, [notes]);

  const createNote = useCallback(() => {
    const now = Date.now();
    const newNote = {
      id: generateId(),
      title: '',
      content: '',
      createdAt: now,
      updatedAt: now,
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  }, []);

  const updateNote = useCallback((id, fields) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...fields, updatedAt: Date.now() } : n))
    );
  }, []);

  const deleteNote = useCallback((id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setSelectedId((curr) => (curr === id ? null : curr));
  }, []);

  return useMemo(
    () => ({
      notes,
      createNote,
      updateNote,
      deleteNote,
      selectedId,
      selectNote,
      loadInitialSelection,
    }),
    [notes, createNote, updateNote, deleteNote, selectedId, selectNote, loadInitialSelection]
  );
}
