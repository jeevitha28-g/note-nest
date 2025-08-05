import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteList from './components/notes';
import CreateNote from './components/create';
import './App.css';

const App = () => {
    const [notes, setNotes] = useState([]);

    // Fetch all notes on page load
    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = () => {
        axios.get('http://localhost:5000/items')
            .then(response => {
                setNotes(response.data);
            })
            .catch(error => console.error('Error fetching notes:', error));
    };

    const handleCreateNote = (newNote) => {
        axios.post('http://localhost:5000/items/add', newNote)
            .then(response => {
                setNotes([...notes, response.data]);
            })
            .catch(error => console.error('Error creating note:', error));
    };

    const handleDeleteNote = (noteId) => {
        axios.delete(`http://localhost:5000/items/${noteId}`)
            .then(() => {
                setNotes(notes.filter(note => note._id !== noteId));
            })
            .catch(error => console.error('Error deleting note:', error));
    };

    const handleUpdateNote = (noteId, updatedNote) => {
        axios.put(`http://localhost:5000/items/update/${noteId}`, updatedNote)
            .then((response) => {
                setNotes(notes.map(note => note._id === noteId ? response.data : note));
            })
            .catch(error => console.error('Error updating note:', error));
    };

    return (
        <div className="container">
            <CreateNote onCreate={handleCreateNote} />
            <NoteList
                notes={notes}
                onUpdate={handleUpdateNote}
                onDelete={handleDeleteNote}
            />
        </div>
    );
};

export default App;
