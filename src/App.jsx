
import React, { useState } from 'react';
import NoteEditor from './Components/Editor/NoteEditor';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState(30); // Percentage of viewport width

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: `Note ${notes.length + 1}`,
      content: '',
    };
    setNotes([...notes, newNote]);
    setSelectedNoteId(newNote.id);
  };

  const updateNote = (updatedNote) => {
    setNotes(notes.map(note => (note.id === updatedNote.id ? updatedNote : note)));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
    }
  };

  const selectedNote = notes.find(note => note.id === selectedNoteId);

  return (
    <div className="app">
      {notes.length === 0 ? (
        <div className="no-notes">
          <p>No notes here</p>
          <button onClick={addNote} className="add-note-btn">Create Note</button>
        </div>
      ) : (
        <>
          <div
            className="sidebar"
            style={{ width: `${sidebarWidth}vw` }}
          >
            <div className="sidebar-header">
              <h2>Notes</h2>
              <button onClick={addNote} className="add-note-btn">+</button>
            </div>
            <ul>
              {notes.map(note => (
                <li
                  key={note.id}
                  className={`note-item ${note.id === selectedNoteId ? 'active' : ''}`}
                  onClick={() => setSelectedNoteId(note.id)}
                >
                  <span>{note.title}</span>
                  <button onClick={() => deleteNote(note.id)} className="delete-note-btn">x</button>
                </li>
              ))}
            </ul>
            <div
              className="resizer"
              onMouseDown={(e) => {
                document.onmousemove = (event) => {
                  const newSidebarWidth = (event.clientX / window.innerWidth) * 100;
                  if (newSidebarWidth > 10 && newSidebarWidth < 50) {
                    setSidebarWidth(newSidebarWidth);
                  }
                };
                document.onmouseup = () => {
                  document.onmousemove = null;
                  document.onmouseup = null;
                };
              }}
            />
          </div>
          <div className="editor-container" style={{ width: `${100 - sidebarWidth}vw` }}>
            <NoteEditor className="Noteeditor" note={selectedNote} updateNote={updateNote} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
