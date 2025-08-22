# Quick Notes - Minimalistic React Notes App

A fast, modern notes app built with React and vanilla CSS. It supports creating, editing, deleting, listing, and searching notes with a responsive sidebar + editor layout.

## Features

- Create, edit, delete notes
- List and search notes
- Minimalistic, modern UI
- Light theme with primary/accent/secondary colors
- Responsive layout (sidebar + editor)
- Floating action button for quick note creation
- Local persistence via localStorage (no backend required)

## Getting Started

Install and run:

```bash
npm install
npm start
```

Open http://localhost:3000

## Configuration

This app uses environment variables for storage keys (optional). Copy `.env.example` to `.env` to customize:

```
REACT_APP_STORAGE_KEY=quick-notes__v1
REACT_APP_SELECTED_KEY=quick-notes__selected
```

Note: Do not commit `.env`.

## Tech

- React 18
- Vanilla CSS (no UI library)
- localStorage for persistence

## Project Structure

- `src/components/NotesSidebar.jsx` - notes list + search + quick create
- `src/components/NoteEditor.jsx` - editor for title/content + delete
- `src/hooks/useLocalNotes.js` - localStorage CRUD and selection
- `src/utils/notesUtils.js` - id generation and filtering

## Notes

- All data is stored in your browser. Clearing storage will remove notes.
- The UI colors are set to:
  - primary: `#1976d2`
  - secondary: `#424242`
  - accent: `#ffc107`

Enjoy taking notes!
