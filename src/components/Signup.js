import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

function Signup(props) {
  const host = "http://localhost:5000";
  const [user, setUser] = useState({ name: "", email: "", password: "", cpassword: "" });
  let history = useHistory();

  const handleClick = async (e) => {
      e.preventDefault();
      console.log("signup clicked");

      const response = await fetch(`${host}/api/auth/createuser`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: user.name, email: user.email, password: user.password })
      });

      const json = await response.json();
      console.log(json);
      if(json.success){
          //save the auth-token and redirect
          localStorage.setItem("token", json.authtoken);
          history.push("/");
      }
      else{
        props.showAlert('Sorry a user with this email is already exist. Please try another email!')
      }
  }

  const onChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value })
  }
  return (
    <div className='container my-3'>
      <h2 className='my-3'>SignUp</h2>
      <form onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' value={user.name} onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' value={user.email} onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' value={user.password} onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' value={user.cpassword} onChange={onChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">SignUp</button>
      </form>
    </div>
  )
}

export default Signup
