import React from 'react'
import Notes from './Notes';
import Profile from './Profile';


function About(props) {
  const {showAlert}=props;
  return (
    <div>
      <Profile/>
      <Notes showAlert={showAlert}/>
    </div>
  )
}

export default About
