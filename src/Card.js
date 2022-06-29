import React from 'react'
import logo from './logo.svg';

function Profile() {
  return (
    <div className="card">
    <div className="card-top">
    <h1 style={{color:"Black"}}>Card</h1>
    </div>
    <div className="card-body">
    <img src={logo} alt="logo" />
    </div>
    <div>
    <img src="./logo.svg" alt="logo"/>
    <p> Card component rendered inside a container </p>
    </div>
    </div>
    );
}

export default Profile