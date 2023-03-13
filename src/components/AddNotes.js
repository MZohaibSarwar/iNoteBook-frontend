import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

function AddNotes(props) {
    const { addNote } = useContext(noteContext);
    const [notes, setNotes] = useState({ title: "", description: "", tag: "" });
    
    const addNotesHandler = (e) => {
        e.preventDefault();
        addNote(notes.title, notes.description, notes.tag);
        setNotes({ title: "", description: "", tag: "" });
        
    }

    const onChange = (e) => {
        setNotes({ ...notes, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <h2 className='my-3'>Add a Notes</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={notes.title} onChange={onChange} required={true} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>

                    <textarea type="text" className="form-control" id="description" name="description" rows="8" value={notes.description} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <select className="form-select" aria-label="Default select example" id="tag" name="tag" value={notes.tag} onChange={onChange} required >
                        <option defaultValue="1">Select Category</option>
                        <option value="General">General</option>
                        <option value="News">News</option>
                        <option value="Sports">Sports</option>
                    </select>
                </div>
                <button disabled={notes.title.length < 5 || notes.description.length < 5} type="submit" className="btn btn-primary" onClick={addNotesHandler}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNotes
