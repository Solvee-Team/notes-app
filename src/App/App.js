import React, { useState } from 'react';
import "./index.css"
import NoteForm from '../NoteForm/index';
import NoteList from '../NoteList/index';

function App() {
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState({ title: '', body: '' });
  const [currentNoteIndex, setCurrentNoteIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [viewing, setViewing] = useState(false);

  const viewNote = index => {
    setViewing(true);
    setCurrentNoteIndex(index);
    setCurrentNote(notes[index]);
  };
  const addNote = note => {
    setNotes([{
      ...note,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }, ...notes]);
    setEditing(false);
  };

  const deleteNote = index => {
    setNotes(notes.filter((_, noteIndex) => noteIndex !== index));
  };

  const editNote = index => {
    setEditing(true);
    setCurrentNoteIndex(index);
    setCurrentNote(notes[index]);
  };

  const updateNote = updatedNote => {
    setNotes(notes.map((note, index) => 
      index === currentNoteIndex ? 
      {...updatedNote, updatedAt: new Date().toISOString()} : note));
    setEditing(false);
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (field) => {
    setSortDirection(sortField === field && sortDirection === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  const filteredNotes = notes.filter(
    note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let sortedNotes = [...filteredNotes];
  if (sortField !== null) {
    sortedNotes.sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  return (
    <div className="app">
      <h1>Notes</h1>
      {editing ? (
        <NoteForm addNote={updateNote} currentNote={currentNote} />
      ) : (
        <NoteForm addNote={addNote} currentNote={currentNote} />
      )}
       {viewing ? (
      <div>
        <h2>{currentNote.title}</h2>
        <p>{currentNote.body}</p>
        <button onClick={() => setViewing(false)}>Close</button>
      </div>
    ) : null}
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div>
        <button onClick={() => handleSort('title')}>Sort by Title</button>
        <button onClick={() => handleSort('createdAt')}>Sort by Date Created</button>
        <button onClick={() => handleSort('updatedAt')}>Sort by Date Modified</button>
      </div>
      <NoteList notes={sortedNotes} deleteNote={deleteNote} editNote={editNote} viewNote={viewNote} />
    </div>
  );
}

export default App;