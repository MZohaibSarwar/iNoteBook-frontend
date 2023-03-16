import React,{useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';


function App() {
  const [alert,setAlert]= useState(null)
  const showAlert = (message)=>{
    setAlert({
      msg: message
    })
    setTimeout(()=>{
      setAlert(null)
    },3000);
  }
  return (
    <>
    <NoteState>
    <Router>
      <Navbar showAlert={showAlert} />
      <Alert alert={alert}/>
      <div className='container'>
      
      <Switch>
          <Route exact path="/about">
            <About  showAlert={showAlert} />
          </Route>
          <Route exact path="/">
            <Home showAlert={showAlert} />
          </Route>
          <Route exact path="/login">
            <Login showAlert={showAlert} />
          </Route>
          <Route exact path="/signup">
            <Signup showAlert={showAlert} />
          </Route>
          <Route exact path="/profile">
            <Profile showAlert={showAlert} />
          </Route>
        </Switch>
      </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
