import React from 'react';

function Note({ note, index, deleteNote, editNote, viewNote }) {
    const shortBody = note.body.length > 50 ? note.body.substring(0, 50) + '...' : note.body;
    return (
      <div className="note">
        <h2>{note.title}</h2>
        <p onClick={() => viewNote(index)}>{shortBody}</p>
        <button onClick={() => deleteNote(index)}>Delete</button>
        <button onClick={() => editNote(index)}>Edit</button>
        <button onClick={() => viewNote(index)}>View</button>
      </div>
    );
  }
  
  

export default Note;
