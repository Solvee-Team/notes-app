import React from 'react';
import Note from '../Note/index';

function NoteList({ notes, deleteNote, editNote, viewNote }) {
    return notes.map((note, index) => (
      <Note
        key={index}
        index={index}
        note={note}
        deleteNote={deleteNote}
        editNote={editNote}
        viewNote={viewNote}
      />
    ));
  }
  
  

export default NoteList;
