import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * Rich but simple editor for a single note (title + content).
 * Emits changes up for persistence with debounce.
 */
function NoteEditor({ note, onChange, onDelete, colors }) {
  const [title, setTitle] = useState(note.title || '');
  const [content, setContent] = useState(note.content || '');
  const debounceRef = useRef(null);

  useEffect(() => {
    setTitle(note.title || '');
    setContent(note.content || '');
  }, [note.id]); // reset when switching notes

  useEffect(() => {
    // Debounce save to avoid excessive writes
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange({ title, content });
    }, 300);
    return () => debounceRef.current && clearTimeout(debounceRef.current);
  }, [title, content]); // eslint-disable-line react-hooks/exhaustive-deps

  const updated = new Date(note.updatedAt).toLocaleString();
  const created = new Date(note.createdAt).toLocaleString();

  return (
    <section className="editor-card" style={{ '--primary': colors.primary, '--accent': colors.accent, '--secondary': colors.secondary }}>
      <div className="editor-toolbar">
        <div className="toolbar-left" aria-label="Note meta">
          <span className="btn btn-ghost" title={`Created: ${created}`}>Created: {created}</span>
          <span className="btn btn-ghost" title={`Updated: ${updated}`}>Updated: {updated}</span>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-danger" onClick={onDelete} title="Delete note">Delete</button>
        </div>
      </div>

      <input
        className="input-title"
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Note title"
      />
      <div style={{ height: 12 }} />
      <textarea
        className="textarea"
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        aria-label="Note content"
      />
    </section>
  );
}

NoteEditor.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.number.isRequired,
    updatedAt: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  colors: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
    accent: PropTypes.string,
  }),
};

NoteEditor.defaultProps = {
  colors: { primary: '#1976d2', secondary: '#424242', accent: '#ffc107' },
};

export default NoteEditor;
