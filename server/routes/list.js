const express = require('express');
const router = express.Router();
const Item = require('../models/listModels');

// Add notes
router.post('/add', (req, res) => {
    const { title, content, status } = req.body;
    const newNote = new Item({ title, content, status: status || 'active' });

    newNote.save()
        .then(note => res.status(201).json(note))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Get all notes
router.get('/', (req, res) => {
    Item.find()
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Update note
router.put('/update/:id', async (req, res) => {
    try {
      const updatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          content: req.body.content
        },
        { new: true } // This returns the updated document, including new updatedAt
      );
      res.json(updatedItem);
    } catch (err) {
      res.status(500).json({ message: 'Error updating item', error: err });
    }
  });
  
// Delete note
router.delete('/:id', (req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(deleted => {
            if (!deleted) return res.status(404).json({ message: 'Note not found' });
            res.json({ message: 'Note deleted' });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
