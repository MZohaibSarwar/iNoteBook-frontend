import React, { useState } from 'react';
import noteContext from './noteContext';

function NoteState(props) {
  const host = "http://localhost:5000";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  //get all notes
  const getNote = async () => {

    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwNTgwODQ4MjYxYmE2ZjVmMjkzNjg2In0sImlhdCI6MTY3ODA4MjI1Mn0.HqgiFp6vbKuzA3_fEn_l77BBk8PxMKNMJN3gWwhclU0"
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }

  //add a note
  const addNote = async (title, description, tag) => {

    //API call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwNTgwODQ4MjYxYmE2ZjVmMjkzNjg2In0sImlhdCI6MTY3ODA4MjI1Mn0.HqgiFp6vbKuzA3_fEn_l77BBk8PxMKNMJN3gWwhclU0"
      },
      body: JSON.stringify({ title, description, tag })
    });
    
    //add note on client side
    const note =await response.json();
    setNotes(notes.concat(note));
  }

  //delete a note
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwNTgwODQ4MjYxYmE2ZjVmMjkzNjg2In0sImlhdCI6MTY3ODA4MjI1Mn0.HqgiFp6vbKuzA3_fEn_l77BBk8PxMKNMJN3gWwhclU0"
      }
    });
    const json = response.json();
    console.log(json);

    //delete on client side
    console.log('deleting the note with id ' + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }


  //edit a note
  const editNote = async (id, title, description, tag) => {

    //API call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwNTgwODQ4MjYxYmE2ZjVmMjkzNjg2In0sImlhdCI6MTY3ODA4MjI1Mn0.HqgiFp6vbKuzA3_fEn_l77BBk8PxMKNMJN3gWwhclU0"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = response.json();
    console.log(json);

    let newupdateNotes = JSON.parse(JSON.stringify(notes));
    //edit on client side
    for (let index = 0; index < newupdateNotes.length; index++) {
      const element = newupdateNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(newupdateNotes);
  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;
