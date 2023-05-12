import React, { useState, useEffect } from 'react';

function NoteForm({ addNote, currentNote }) {
  const [note, setNote] = useState(currentNote || { title: '', body: '' });

  useEffect(() => {
    setNote(currentNote);
  }, [currentNote]);

  const handleSubmit = e => {
    e.preventDefault();
    if (note.title.trim() && note.body.trim()) {
      addNote(note);
      setNote({ title: '', body: '' });
    }
  };

  const handleChange = e => {
    setNote({
      ...note,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Title"
        value={note.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="body"
        placeholder="Write a note..."
        value={note.body}
        onChange={handleChange}
        required
      />
      <button type="submit">{currentNote.title ? 'Update' : 'Save'}</button>
    </form>
  );
}

export default NoteForm;
