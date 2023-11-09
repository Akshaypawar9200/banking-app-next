'use client'
import React, { useEffect, useState } from 'react'
import {authorize as authorize}from '../../lib/user/Authorize'
import { UpdateUser as UpdateUser } from '../../lib/user/UpdateUser'
import { DeleteUser as DeleteUser } from '../../lib/user/DeleteUser'
import { MessageError, MessageSuccess } from "../../error/Error"
import { AllUser as AllUser } from '../../lib/user/GetUser'

import NavbarComponent from '../../sharedcomponent/navbar/Navbar'
import CreateUser from '../component/createUser/CreateUser'
import Table from '../../sharedcomponent/table/Table'
import Modal from "react-bootstrap/Modal";
import './admin.css'
import CreateBank from '../createbank/createBank'
const page = () => {

  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [limit, setLimit] = useState(1)
  const [page, setPage] = useState(2)
  const [name, setName] = useState("")
  const [age, setAge] = useState()
  const [gender, setGender] = useState("")
  const [username, setUserName] = useState("")
  const [id, setId] = useState()
  const [show, setShow] = useState(false)
  const [updateTable, setUpdateTable] = useState(false); 
  const [reset, setReset] = useState(false)
  const[verify,setVerify]=useState(false)
  const[filterName,setFilterName]=useState("")
  const[filterAge,setFilterAge]=useState()
  const[filterGender,setFilterGender]=useState("")
  const[filterAdmin,setFilterAdmin]=useState()
  


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleSubmit = async (e) => {
    try {


      const params={
        name:filterName,
        age:filterAge,
        gender:filterGender,
        limit: limit,
        page: page
      }
      const response = await AllUser(params)
      console.log(response);
      setCount((prev) => response?.headers["x-total-count"]);
      setData((prev) => response.data);
    } catch (error) {

    }
  }
  useEffect(() => {
    if (verify) {
      handleSubmit();
    }
  }, [limit, page,verify]);



  const handleUser = async () => {
    const response = await authorize();
    setVerify((prev) => response.data.result);  // Update the user authorization status
  };

   // Effect hook to automatically fetch data when the updateTable state changes
   useEffect(() => {
    handleSubmit();
  }, [updateTable,reset]);

    // Effect hook to check user authorization when the verify state changes
    useEffect(() => {
      handleUser();
    }, [verify]);


     // Conditional rendering: If user is not authorized, display a message and a link to login
  if (!verify) {
    return (
      <h1>
        <a href="/">Please login</a>
      </h1>
    );
  }
  const updateFunction = (d) => {
    setShow((prev) => true);
    setName(d.name);
    setAge(d.age);
    setGender(d.gender);
    setId(d.id)
  }
  const deleteFunction = async (d) => {
    try {
      // Call the service to delete a user
      console.log(d.id);
      const res = await DeleteUser(d.id);
      if (res.status === 200) {
        setUpdateTable((prev) => !prev);
        MessageSuccess("user deleted")
      }
    } catch (error) {
      console.log(error);
    }
  }
  const updateButton = async (e) => {
    e.preventDefault();
    try {
      if (!isNaN(name)) {

        throw new Error("name cannot be a number");
      }
      if (name === '') {
        throw new Error("Please enter name");
      }
      if (age === "") {
        throw new Error("plz enter age")
      }
      if (!isNaN(gender)) {
        throw new Error("gender cannot be a number");
      }

      if (gender === '') {
        throw new Error("Please enter gender");
      }

      // Call the service to update the user's data
      const res = await UpdateUser(name, age, gender, id);

      if (res.status === 200) {
        setUpdateTable((prev) => !prev);
        MessageSuccess("user updated")
      }
      handleClose();
    } catch (error) {
      MessageError(error.message)
    }
  };

  const getName = (e) => {
    setName(e.target.value)
  }
  const getAge = (e) => {
    setAge(e.target.value)
  }
  const getGender = (e) => {
    setGender(e.target.value)
  }

const handleName=(e)=>{
  setFilterName(e.target.value)
}
const handlgender=(e)=>{
  setFilterGender(e.target.value)
}
  // Function to handle the filter button click
  const handleFilterButton = (e) => {
    try {
      if (!filterName && !filterAge && !filterAdmin && !filterGender) {

        throw new Error("Please enter at least one filter field");
        
      }
      setPage(prev => 1) 
      handleSubmit(e)
    } catch (error) {
      MessageError(error.message) 
    }
  };

    // Function to reset filter inputs and trigger a reset
    const resetButton = () => {
      try {
        setFilterName(prev => "")
        setFilterAge(prev => "")
        setFilterGender(prev => "")
        setFilterAdmin(prev => "")
        setPage(1); 
        setLimit(1); 
        setReset((prev) => !prev);
        handleSubmit(); 
      } catch (error) {
       console.log(error);
      }
    }
 

  return (
    <>
      <NavbarComponent />
      <div className="box">
        <div>
        <CreateUser handleSubmit={handleSubmit} />
        </div>
        <div>
        <CreateBank handleSubmit={handleSubmit}/>
       
        </div>
      
      
        
      </div>
   
      <Modal show={show} onHide={handleClose}>
        <form>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              value={name}
              onChange={getName}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Age
            </label>
            <input
              type="text"
              className="form-control"
              value={age}
              onChange={getAge}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              Gender
            </label>
            <input
              type="text"
              className="form-control"
              value={gender}
              onChange={getGender}
            />
          </div>

          <button className="btn btn-primary" onClick={updateButton}>
            Update User
          </button>
        </form>
      </Modal>
      <h1>total records:{count}</h1>
   
      <div className="parent-filter">
      <div className="form-cont">
        <div>
          <input type="text" placeholder="Name" onChange={handleName} value={filterName} />
        </div>
        <div>
          <input type="text" placeholder="Gender" onChange={handlgender} value={filterGender} />
        </div>
        <div>
          <select className="form-select" aria-label="Default select example" onChange={(e) => setFilterAdmin(e.target.value)} value={filterAdmin}>
            <option value="">IsAdmin</option>
            <option value={true}>true</option>
            <option value={false}>false</option>
          </select>
        </div>
        <div>
          <button className="btn btn-success" onClick={handleFilterButton}>Submit</button>
        </div>
        <div>
          <button type="button" className="btn btn-danger" onClick={resetButton}>Reset</button>
        </div>
      </div>
    </div>
      <Table
        data={data}
        count={count}
        limit={limit}
        setPage={setPage}
        page={page}
        setLimit={setLimit}
        updateButton={true}
        deleteButton={true}
        viewButton={false}
        updateFunction={updateFunction}
        setShow={setShow}
        deleteFunction={deleteFunction}
      />
    </>
  )
}

export default page