import React, { useState } from 'react';

const CreateNote = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = () => {
    if (!title || !content) {
      alert('Please enter both title and content.');
      return;
    }

    const newNote = {
      title,
      content,
      status: 'active',
    };
    onCreate(newNote);
    setTitle('');
    setContent('');
  };

  return (
    <div>
        <div className="heading-wrapper">
            <h2>NOTE-NEST</h2>
        </div>
        <div className="form-container">
            <div className="form-group">
            <label>Title:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                name="name"
            />
            </div>
            <div className="form-group">
            <label>Content:</label>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            </div>   
                <button onClick={handleCreate} className="create-button">Create Note</button>
        </div>
    </div>
  );
};

export default CreateNote;
