import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
  const { deleteNote } = useContext(noteContext);
  const { note, updateNote } = props;

  let type = 'primary';
  if (note.tag === 'personal') type = 'success';
  else if (note.tag === 'work') type = 'warning';
  else if (note.tag === 'important') type = 'danger';

  return (
    <div className="col-md-3 my-3">
      <Card>
        <div className="mb-2">
          <span
            className={`badge rounded-pill bg-${type}`}
            style={{
              display: 'flex',
              justifyContent: 'center',
              position: 'absolute',
              right: '0',
            }}
          >
            {note.tag}
          </span>
        </div>
        <Card.Body>
          <div className="d-flex justify-content-end">
            <Card.Title className="flex-grow-1">{note.title}</Card.Title>
            <i
              className="fa-solid fa-trash mx-2 my-1"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert('Note Deleted Successfully', 'success');
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2 my-1"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          <Card.Text>{note.description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NoteItem;
