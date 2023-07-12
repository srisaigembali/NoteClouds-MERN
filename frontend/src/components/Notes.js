import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Notes(props) {
  const { notes, fetchAllNotes, editNote } = useContext(noteContext);
  const [note, setNote] = useState({
    id: '',
    etitle: '',
    edescription: '',
    etag: 'general',
  });
  const ref = useRef(null);
  const refClose = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('authtoken')) {
      fetchAllNotes();
    } else {
      navigate('/login');
    }
    //eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert('Note Updated Successfully', 'success');
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Form>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="etitle"
                    placeholder="Enter  Note Title"
                    value={note.etitle}
                    onChange={handleChange}
                    required
                    minLength={5}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="edescription"
                    placeholder="Enter Note Description"
                    value={note.edescription}
                    onChange={handleChange}
                    required
                    minLength={5}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="tag">
                  <Form.Label>Tag</Form.Label>
                  <Form.Control
                    type="text"
                    name="etag"
                    placeholder="Enter Note Tag (Optional)"
                    value={note.etag}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mx-3">
        <h1>Your Notes</h1>
        <div className="container">
          {notes.length === 0 && 'No notes to display!'}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              note={note}
              updateNote={updateNote}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
