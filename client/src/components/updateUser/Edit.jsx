import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import "../addUser/add.css"
import axios from 'axios'
import toast from 'react-hot-toast'
const Edit = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        email:"",
    })

    const inputHandler = (e) => {
        setUser( (prev) => (
            {
                ...prev,
                [e.target.name]:e.target.value
            }
        ))
    }

    useEffect( () => {
        axios.get(`http://localhost:5000/api/v1/getone/${id}`).then((response) => {
            setUser(response.data)
        }).catch(error => console.log(error))
    },[id])

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/api/v1/update/${id}`,user).then((response) => {
            toast.success(response.data.message)
            navigate("/")
        }).catch((error) => console.log(error))
    }
  return (
    <div className='addUser'>
        <Link to={"/"}> Back</Link>
        <h3>Update User</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="firstName">First name</label>
                <input type="text" id='firstName' value={user.firstName} name='firstName' onChange={inputHandler} autoComplete='off' placeholder='First name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lastName">Last name</label>
                <input type="text" id='lastName' value={user.lastName} name='lastName' onChange={inputHandler} autoComplete='off' placeholder='last name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input type="email" id='email' value={user.email} name='email' onChange={inputHandler} autoComplete='off' placeholder='Email' />
            </div>
            
            <div className="inputGroup">
                <button type="submit">UPDATE USER</button>
            </div>
        </form>
    </div>
  )
}

export default Edit