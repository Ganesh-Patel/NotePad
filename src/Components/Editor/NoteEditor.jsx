import React, { useState, useEffect } from 'react';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import './NoteEditor.css';

const NoteEditor = ({ note, updateNote }) => {
  const [selectedTab, setSelectedTab] = useState('write');
  const [value, setValue] = useState(note ? note.content : '');

  useEffect(() => {
    setValue(note ? note.content : '');
  }, [note]);

  const handleValueChange = (value) => {
    setValue(value);
    updateNote({
      ...note,
      content: value,
    });
  };

  if (!note) return <div>Select a note to edit</div>;

  return (
    <div className="note-editor">
      <h2>{note.title}</h2>
      <ReactMde
      className="editor"
        value={value}
        onChange={handleValueChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) => Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)}
      />
    </div>
  );
};

export default NoteEditor;
