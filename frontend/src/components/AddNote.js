import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
  const [note, setNote] = useState({
    title: '',
    description: '',
    tag: 'general',
  });
  const { addNote } = useContext(noteContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: '',
      description: '',
      tag: 'general',
    });
    props.showAlert('Note Added Successfully', 'success');
  };

  const handleChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  return (
    <div className="container my-3 mx-3">
      <h1>Add a note</h1>
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={note.title}
            placeholder="Enter Note Title"
            onChange={handleChange}
            required
            minLength={3}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={note.description}
            placeholder="Enter Note Description"
            onChange={handleChange}
            required
            minLength={5}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="tag">
          <Form.Label>Tag</Form.Label>
          <Form.Control
            type="text"
            name="tag"
            value={note.tag}
            placeholder="Enter Note Tag (Optional)"
            onChange={handleChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit}
          disabled={note.title.length < 5 || note.description.length < 5}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddNote;
