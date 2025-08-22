import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * Sidebar showing brand, search, and a list of notes.
 */
function NotesSidebar({ notes, query, onQueryChange, selectedId, onSelect, onCreate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo" aria-hidden="true" />
        <h1>Quick Notes</h1>
        <button className="btn btn-accent" onClick={onCreate} title="Create note" aria-label="Create new note">
          + New
        </button>
      </div>

      <div className="search">
        <span className="icon" aria-hidden="true">🔍</span>
        <input
          type="search"
          placeholder="Search notes..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search notes"
        />
      </div>

      <div className="list" role="list" aria-label="Notes">
        {notes.length === 0 ? (
          <div className="list-empty">No notes yet</div>
        ) : (
          notes.map((n) => {
            const preview = (n.content || '').replace(/\n+/g, ' ').slice(0, 80);
            const updated = new Date(n.updatedAt).toLocaleString();
            return (
              <div
                key={n.id}
                role="listitem"
                tabIndex={0}
                className={`list-item ${selectedId === n.id ? 'active' : ''}`}
                onClick={() => onSelect(n.id)}
                onKeyDown={(e) => (e.key === 'Enter' ? onSelect(n.id) : null)}
                aria-pressed={selectedId === n.id}
              >
                <p className="title">{n.title || 'Untitled'}</p>
                <p className="preview">{preview || 'No content yet'}</p>
                <div className="meta">
                  <span>{updated}</span>
                  <span>{(n.content || '').length} ch</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
}

NotesSidebar.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.number,
    updatedAt: PropTypes.number,
  })).isRequired,
  query: PropTypes.string.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  selectedId: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

NotesSidebar.defaultProps = {
  selectedId: null,
};

export default NotesSidebar;
