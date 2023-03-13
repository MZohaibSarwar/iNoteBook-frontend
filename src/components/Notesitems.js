import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';


function Notesitems(props) {
    const { deleteNote} = useContext(noteContext);
    const { note, updateNote } = props;
    return (
        <div className='col-md-4 my-3'>
            <div className="card">
                <div style={{ display: "flex", position: "absolute", right: "0" }}>
                    <span className="badge text-bg-danger">{note.tag}</span>
                </div>
                <div className="card-body">
                    <h5 className="card-title"> {note.title} </h5>
                    <p className="card-text"> {note.description} </p>
                    <i className="fa-solid fa-trash mx-3 my-3" onClick={() => { deleteNote(note._id) }}></i>
                    <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default Notesitems
