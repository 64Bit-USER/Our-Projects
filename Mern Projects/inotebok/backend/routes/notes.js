const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// ROUTE  1: Getting all the notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
});

// ROUTE  2: Adding notes to the database
router.post('/addnote', fetchuser, [
    body('title', 'Enter a Title').isLength({ min: 3 }),
    body('description', 'Description is important').isLength({ min: 10 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // If there are errors the return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
});

// ROUTE  3: Updating notes to the database
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Create a new note
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note and update
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not Found"); }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Updating the Note 
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
});

// ROUTE  4: Deleting notes to the database
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note and delete
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not Found"); }


        // Deletion possible if user is the same
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }


        // Deleting the note
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "The Note has been deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
});
module.exports = router;