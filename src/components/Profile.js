import React, { useState, useEffect } from 'react';

const Profile =  () => {
    const host = "http://localhost:5000";
    const [user, setUser] = useState([]);

    useEffect(() => {
        handleClick();
      }, []);

    //API call
    const handleClick = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("token"))
        },
    });
    // eslint-disable-next-line
    const newUser = await response.json();
    setUser(newUser);
}


    return (
        <div className='col-md-4 my-3'>
            <h2 className="card-title mb-3"> Profile </h2>
            <div className="card">
                <div className="card-body">
                    <p className="card-title"><strong>Name:</strong> {user.name} </p>
                    <p className="card-text"><strong>Email:</strong> {user.email} </p>
                    <p className="card-text"><strong>Id:</strong> {user._id} </p>
                    <p className="card-text"><strong>Joining Date:</strong> {user.date} </p>
                    {/* <button className='btn btn-primary d-none' onClick={handleClick}>Show Data</button> */}
                </div>
            </div>
        </div>
    )
}

export default Profile

