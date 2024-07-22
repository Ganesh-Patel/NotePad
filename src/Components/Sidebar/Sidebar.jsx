import React, { useState } from 'react';

const Sidebar = ({ notes, deleteNote, setCurrentNote, addNote }) => {
  const [width, setWidth] = useState(200);

  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startWidth = width;

    const handleMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="sidebar" style={{ width }}>
      <div className="sidebar-header">
        <h2>Notes</h2>
        <button className="add-note" onClick={addNote}>+</button>
      </div>
      {notes.map(note => (
        <div key={note.id} className="note-title" onClick={() => setCurrentNote(note)}>
          <span>{note.title}</span>
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      ))}
      <div className="resizer" onMouseDown={handleMouseDown}></div>
    </div>
  );
};

export default Sidebar;
