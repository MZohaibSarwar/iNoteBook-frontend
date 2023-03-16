import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import noteContext from '../context/notes/noteContext';
import AddNotes from "./AddNotes";
import Notesitems from "./Notesitems";

function Notes(props) {
  const { notes, getNote, editNote } = useContext(noteContext);
  const [note, setNotes] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  let history = useHistory();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('token'));
    if (items) {
      getNote();
    }
    else {
      history.push("/login");
    }
    // getNote();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNotes) => {
    ref.current.click();
    setNotes({ id: currentNotes._id, etitle: currentNotes.title, edescription: currentNotes.description, etag: currentNotes.tag });
  }

  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value })
  }

  const editNotesHandler = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    e.preventDefault();
    props.showAlert('Notes Updated Successfuly!');
  }

  return (
    <>
      <AddNotes showAlert={props.showAlert} />


      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} required={true} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>

                  <textarea type="text" className="form-control" id="edescription" name="edescription" rows="8" value={note.edescription} onChange={onChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <select className="form-select" aria-label="Default select example" id="etag" name="etag" value={note.etag} onChange={onChange} required >
                    <option defaultValue="1">Select Category</option>
                    <option value="General">General</option>
                    <option value="News">News</option>
                    <option value="Sports">Sports</option>
                    <option value="Education">Education</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={editNotesHandler} >Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <h2 className="my-3 mt-5">Your Notes </h2>
        <div>
          {notes.length === 0 && "No Notes to Display"}
        </div>
        {notes && notes.map((note) => {
          return <Notesitems key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />;
        })}
      </div>
    </>
  );
}

export default Notes;
