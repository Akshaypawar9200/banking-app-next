'use client'
import React, { useState } from 'react'
import './createBank.css'

import { MessageError, MessageSuccess } from "../../error/Error";
import {CreateBankService as CreateBankService}from '../../lib/user/CreateBankService'
import { useRouter } from 'next/navigation';

const CreateBank = ({handleSubmit}) => {
    const router=useRouter()
    const[bankName,setBankName]=useState("")
const getBankName=(e)=>{
    setBankName(e.target.value)
}


const handleCreateBank=async(e)=>{
  e.preventDefault()
  try {
    if(bankName==""){
      throw new Error("plz enter name")
    }
    if (!isNaN(bankName)) {
      throw new Error("firstname cannot be number")
    }
   
    const response=await CreateBankService(bankName)
    handleSubmit()
    MessageSuccess("Bank created")
    return
  } catch (error) {
    MessageError(error.message)
  }
}

const handleViewButton=()=>{
  router.push("/allbank")
}


  return (
   <>
    <div class="container">
        <h1>Create Bank</h1>
        <form action="#" method="post">
            <label for="name">Name of bank:</label>
            <input type="text" id="name" name="name" onChange={getBankName} required/>
            <button type="button" className="createbtn"onClick={handleCreateBank}>Create Bank</button> 
            <button type="button" className="createbtn" onClick={handleViewButton}>view Bank</button>

          
        </form>
    </div>
   </>
  )
}

export default CreateBank