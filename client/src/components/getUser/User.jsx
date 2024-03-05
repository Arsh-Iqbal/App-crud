import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import "./user.css"
import {FaTrash,FaUserEdit } from "react-icons/fa"
import axios from 'axios'
import toast from 'react-hot-toast'

const User = () => {

    const [users, setUsers] = useState([])
    useEffect( () => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:5000/api/v1/getall");
            setUsers(response.data)
        };
        fetchData();
    },[]);

    const deleteUser = async (userId) => {
        await axios.delete(`http://localhost:5000/api/v1/delete/${userId}`).then( (response) => {
            setUsers((prevUser) => prevUser.filter((user) => user._id !== userId))
            toast.success(response.data.message)
        }).catch(error => console.log(error))
    }

  return (
    <div className='userTable'>
        <Link to={"/add"} className='addButton'>Add User</Link>
        <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>User name</th>
                    <th>User email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map( (user, index) => (
                        <tr key={index}>
                        <td>{index+1}</td>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td className='actionButtons'>
                            <button onClick={ ()=>deleteUser(user._id)}><FaTrash/></button>
                            <Link to={`/edit/`+user._id}><FaUserEdit/></Link>
                        </td>
                    </tr>
                    ))
                }
             
            </tbody>
        </table>
    </div>
  )
}

export default User