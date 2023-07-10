import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = 'http://localhost:8000/api/notes';
  const [notes, setNotes] = useState([]);

  const fetchAllNotes = async () => {
    const response = await fetch(`${host}/getAllNotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNmMyZGVmMzU0NjJhNDlhMmJlNzM3In0sImlhdCI6MTY4ODk2ODcyN30.ZPd5fjO7jjbOLq2zl9UOfZQyKULXm-Ert8Tm2qycuXs',
      },
    });

    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/addNote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNmMyZGVmMzU0NjJhNDlhMmJlNzM3In0sImlhdCI6MTY4ODk2ODcyN30.ZPd5fjO7jjbOLq2zl9UOfZQyKULXm-Ert8Tm2qycuXs',
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    setNotes(notes.concat(json));
  };

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/deleteNote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNmMyZGVmMzU0NjJhNDlhMmJlNzM3In0sImlhdCI6MTY4ODk2ODcyN30.ZPd5fjO7jjbOLq2zl9UOfZQyKULXm-Ert8Tm2qycuXs',
      },
    });

    const json = await response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== json.note._id;
    });
    setNotes(newNotes);
  };

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/updateNote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNmMyZGVmMzU0NjJhNDlhMmJlNzM3In0sImlhdCI6MTY4ODk2ODcyN30.ZPd5fjO7jjbOLq2zl9UOfZQyKULXm-Ert8Tm2qycuXs',
      },
      body: JSON.stringify({ title, description, tag }),
    });

    await response.json();

    // Logic to edit note in client
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNotes.length; i++) {
      if (newNotes[i]._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, fetchAllNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
