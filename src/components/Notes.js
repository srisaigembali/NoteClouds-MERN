import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';

function Notes() {
  const { notes, setNotes } = useContext(noteContext);
  return (
    <div className="row">
      <h1>Your Notes</h1>
      {notes.map((note) => {
        return <NoteItem key={note._id} note={note} />;
      })}
    </div>
  );
}

export default Notes;
