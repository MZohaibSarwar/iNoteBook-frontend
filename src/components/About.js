import React,{useState} from 'react'
// import noteContext from '../context/notes/noteContext'

function About(props) {
  const [myStyle,setMyStyle]=useState({
    color: 'black',
    backgroundColor: 'white'
});

const [btntext, setBtnText] =useState('Enable Dark Mode');

const colorSwitcher = ()=>{
    if(myStyle.color === 'black'){
        setMyStyle({
            color: 'white',
            backgroundColor: 'black'
        })
        setBtnText('Enable Light Mode')
        props.showAlert('Dark mode enabled successfuly!')
    }
    else{
        setMyStyle({
            color: 'black',
            backgroundColor: 'white'
        })
        setBtnText('Enable Dark Mode') 
        props.showAlert('Light mode enabled successfuly!')
    }
}
    // const a = useContext(noteContext)
  return (
    <div style={myStyle}>
      <h2 className='my-3'>This is About Page</h2>
      <button className='btn btn-primary' onClick={colorSwitcher}>{btntext}</button>
    </div>
  )
}

export default About
