import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

function Login(props) {
    const host = "http://localhost:5000";
    const [user, setUser] = useState({ email: "", password: "" });
    let history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email, password: user.password })
        });

        const json = await response.json();
  
        if(json.success){
            //save the auth-token and redirect
            localStorage.setItem("token", JSON.stringify(json.authToken));
            props.showAlert('Loged in Successfully!');
            history.push("/");
        }
        else{
            props.showAlert('Please Login with Valid Credentials!')
        }
    }

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <div className='container my-3' >
            <h2 className='my-3'>Login</h2>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={user.email} onChange={onChange}  required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={user.password} onChange={onChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
