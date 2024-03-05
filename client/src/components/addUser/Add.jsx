import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import "./add.css"
import toast from 'react-hot-toast';
const Add = () => {

    const [userData, setUserData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
    })

    const navigate = useNavigate();
    const inputHandler = (e) => {
        setUserData((prev) => (
            {
                ...prev,
                [e.target.name]:e.target.value,
            }
        ))
        
    }
    const submitForm = async(e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/v1/create", userData).then((response) => {
            toast.success(response.data.message)
            navigate("/")
        })
        .catch(error => console.log("error = ", error))
    }

  return (
    <div className='addUser'>
        <Link to={"/"}> Back</Link>
        <h3>Add New User</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="firstName">First name</label>
                <input type="text" id='firstName' name='firstName' autoComplete='off' placeholder='First name' onChange={inputHandler}/>
            </div>
            <div className="inputGroup">
                <label htmlFor="lastName">Last name</label>
                <input type="text" id='lastName' name='lastName' autoComplete='off' placeholder='last name' onChange={inputHandler}/>
            </div>
            <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input type="email" id='email' name='email' autoComplete='off' placeholder='Email' onChange={inputHandler}/>
            </div>
            <div className="inputGroup">
                <label htmlFor="password">Password</label>
                <input type="password" id='password' name='password' autoComplete='off' placeholder='Password  ' onChange={inputHandler}/>
            </div>
            <div className="inputGroup">
                <button type="submit">ADD USER</button>
            </div>
        </form>
    </div>
  )
}

export default Add