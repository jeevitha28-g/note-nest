import React, { useState } from 'react';

const NoteList = ({ notes, onUpdate, onDelete }) => {
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  const startEditing = (note) => {
    setEditingNoteId(note._id);
    setEditedTitle(note.title);
    setEditedContent(note.content);
  };

  const cancelEditing = () => {
    setEditingNoteId(null);
    setEditedTitle('');
    setEditedContent('');
  };

  const saveEditedNote = () => {
    onUpdate(editingNoteId, {
      title: editedTitle,
      content: editedContent,
    });
    cancelEditing();
  };

  return (
    <div className="note-list-wrapper">
      <h2>My Notes</h2>
      <div className="note-list">
        {notes.map((note) => (
          <div key={note._id} className="note-card">
            {editingNoteId === note._id ? (
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <div className="note-actions">
                  <button onClick={saveEditedNote} className="save-button">Save</button>
                  <button onClick={cancelEditing} className="cancel-button">Cancel</button>
                </div>
              </>
            ) : (
              <>
                <strong>{note.title}</strong>
                <p>{note.content}</p>
                <p className="time">Created on: {new Date(note.createdAt).toLocaleString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}</p>
                {note.updatedAt !== note.createdAt && (
                  <p className="time">Updated on: {new Date(note.updatedAt).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}</p>                  
                )}

                <div className="note-actions">
                  <button onClick={() => startEditing(note)} className="update-button">Update</button>
                  <button onClick={() => onDelete(note._id)} className="delete-button">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteList;
