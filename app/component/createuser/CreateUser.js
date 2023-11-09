import React, { useState } from 'react'
import './CreateUser.css'
import { MessageError, MessageSuccess } from "../../../error/Error";
import {CreateUserService as CreateUserService}from '../../../lib/user/CreateUser'
const CreateUser = ({handleSubmit}) => {
    const[name,setName]=useState("")
    const[age,setAge]=useState()
    const[gender,setGender]=useState("")
    const[username,setUserName]=useState("")
    const[password,setPassword]=useState("")

const getName=(e)=>{
  setName(e.target.value)
}
const getAge=(e)=>{
  setAge(e.target.value)
}
const getGender=(e)=>{
  setGender(e.target.value)
}
const getUserName=(e)=>{
  setUserName(e.target.value)
}
const getPassword=(e)=>{
  setPassword(e.target.value)
}


const handleCreateUser=async(e)=>{
  e.preventDefault()
  try {
    if(name==""){
      throw new Error("plz enter name")
    }
    if (!isNaN(name)) {
      throw new Error("firstname cannot be number")
    }
    if(age==""){
      throw new Error("plz enter age")
    }
    if(gender==""){
      throw new Error("plz enter gender")
    }
    if (!isNaN(gender)) {
      throw new Error("firstname cannot be number")
    }
    if(username==""){
      throw new Error("plz enter username")
    }
    if(password==""){
      throw new Error("plz enter password")
    }
    const response=await CreateUserService(name,username,password,age,gender)
    handleSubmit()
    MessageSuccess("user created")
    return
  } catch (error) {
    MessageError(error.message)
  }
}

  return (
   <>
    <div class="container">
        <h1>Create User</h1>
        <form action="#" method="post">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" onChange={getName} required/>
            <label for="name">age</label>
            <input type="text" id="name" name="name" onChange={getAge}required/>
            <label for="name">Gender:</label>
            <input type="text" id="name" name="name" onChange={getGender}required/>
            <label for="name">username</label>
            <input type="text" id="name" name="name" onChange={getUserName}required/>
            <label for="name">password</label>
            <input type="password" id="name" name="name"onChange={getPassword} required/>
            <button type="button" className="createbtn"onClick={handleCreateUser}>Create User</button>  
        </form>
    </div>
   </>
  )
}

export default CreateUser