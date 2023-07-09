import React from 'react';
import { Card } from 'react-bootstrap';

const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3 my-3">
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-end">
            <Card.Title className="flex-grow-1">{note.title}</Card.Title>
            <i className="fa-solid fa-trash mx-2 my-1"></i>
            <i className="fa-solid fa-pen-to-square mx-2 my-1"></i>
          </div>
          <Card.Text>{note.description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NoteItem;
