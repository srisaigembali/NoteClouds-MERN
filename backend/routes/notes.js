const express = require('express');
const fetchuser = require('../middlewares/fetchuser');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Fetch All Notes
router.get('/getAllNotes', fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    res.status(500).send({
      message: 'some error occured while fetching all notes',
      error: error.message,
    });
  }
});

// Add Note
router.post(
  '/addNote',
  fetchuser,
  [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if there are any validation errors send bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.send(savedNote);
    } catch (error) {
      res.status(500).send({
        message: 'some error occured while creating note',
        error: error.message,
      });
    }
  }
);

// Update Note
router.put(
  '/updateNote/:id',
  fetchuser,
  [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if there are any validation errors send bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;

      // create new note object
      const newNote = {};
      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tag) newNote.tag = tag;

      let note = await Note.findById(req.params.id);
      if (!note) return res.status(404).send('Note not found!');
      if (note.user.toString() !== req.user.id)
        return res.status(404).send('Not Allowed');

      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.send(note);
    } catch (error) {
      res.status(500).send({
        message: 'some error occured while updating note',
        error: error.message,
      });
    }
  }
);

// Delete Note
router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send({ error: 'Note not found!' });
    if (note.user.toString() !== req.user.id)
      return res.status(404).send({ error: 'Not Allowed' });

    note = await Note.findByIdAndDelete(req.params.id);
    res.send({ message: 'Note Deleted Successfully', note: note });
  } catch (error) {
    res.status(500).send({
      message: 'some error occured while deleting note',
      error: error.message,
    });
  }
});

module.exports = router;
