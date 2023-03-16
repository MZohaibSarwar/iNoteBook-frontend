import React from 'react';
import AddNotes from './AddNotes';
import Notes from './Notes';


function Home(props) {
  const {showAlert}=props;
  return (
    <div>
      <AddNotes showAlert={props.showAlert} />
      <Notes showAlert={showAlert}/>
    </div>
  )
}

export default Home
