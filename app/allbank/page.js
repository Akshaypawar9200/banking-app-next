'use client'
import React, { useEffect, useState } from 'react'
import NavbarComponent from '../../sharedcomponent/navbar/Navbar'
import {AllBanks as AllBanks}from '../../lib/user/AllBanks'
import Table from '../../sharedcomponent/table/Table'
import {authorize as authorize}from '../../lib/user/Authorize'
import Button from 'react-bootstrap/Button';
import { MessageError, MessageSuccess } from "../../error/Error"
import Modal from 'react-bootstrap/Modal';
import './Allbnak.css'
import {UpdateBank as UpdateBank}from '../../lib/user/UpdateBank'
import{DeleteBanks as DeleteBanks}from '../../lib/user/DeleteBanks'
import CreateBankWorth from '../component/createbankworth/CreateBankWorth'
const AllBank = () => {
    const[count,setCount]=useState()
    const[abrivation,setabrivation]=useState()
    const[limit,setLimit]=useState(1)
    const[page,setPage]=useState(2)
    const[name,setName]=useState()
    const[data,setData]=useState([])
    const [id, setId] = useState()
    const[filterName,setFilterName]=useState("")
    const [reset, setReset] = useState(false)
    const [show, setShow] = useState(false)
    const [updateTable, setUpdateTable] = useState(false); 
    const[verify,setVerify]=useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleBankSubmit=async()=>{
      const params={
        name:filterName,
        limit:limit,
        page:page
      }
      console.log(name);
        const response=await AllBanks(params)
        setCount((prev) => response?.headers["x-total-count"]);
        setData((prev)=>response.data)
        console.log(response);
    }

    useEffect(() => {
      if (verify) {
        handleBankSubmit();
      }
    }, [limit, page,verify]);

    const handleUser = async () => {
      const response = await authorize();
      setVerify((prev) => response.data.result);  
    };


    
    useEffect(() => {
      handleBankSubmit();
    }, [updateTable,reset]);
  useEffect(() => {
    handleUser();
  }, [verify]);


  
if (!verify) {
  return (
    <h1>
      <a href="/">Please login</a>
    </h1>
  );
}


 
    const getBankName=(e)=>{
      setName(e.target.value)
    }
    
    const updateButton=async(e)=>{
      e.preventDefault();
      try {
        if (!isNaN(name)) {

          throw new Error("bank name cannot be a number");
        }
        if (name === '') {
          throw new Error("Please enter bank name");
        }
  
        const response=await UpdateBank(name,id)
        if (response.status === 200) {
          setUpdateTable((prev) => !prev);
          MessageSuccess("user updated")
        }
        handleClose()

      } catch (error) {
        MessageError(error.message)
      }
    }
    const updateFunction=(d)=>{
      setShow((prev) => true);
      setName(d.name)
      setId(d.id)

    }
    const deleteFunction=async(d)=>{
      try {
        const response=await DeleteBanks(d.id)
        if (response.status === 200) {
          setUpdateTable((prev) => !prev);
          MessageSuccess("bank deleted")
        }
      } catch (error) {
        MessageError(error.message)
      }
    }

    const handleBankName=(e)=>{
        setFilterName(e.target.value)
    }

   
    const handleFilterButton = (e) => {
      try {
        if (!filterName) {
  
          throw new Error("Please enter bank name");
          
        }
        setPage(prev => 1) 
        handleBankSubmit(e)
      } catch (error) {
        MessageError(error.message) 
      }
    };
    const resetButton = () => {
      try {
        setFilterName(prev => "")

        setPage(1); 
        setLimit(1); 
        setReset((prev) => !prev);
        handleBankSubmit(); 
      } catch (error) {
        MessageError(error.message) 
      }
    }
  return (
   <>
  <NavbarComponent/>
  <CreateBankWorth data={data} />
    <h1>total banks:{count}</h1>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>update bank</Modal.Title>
        </Modal.Header>
        <form>
        <div className="mb-3">
            <label htmlFor="bankName" className="form-label">
              bankName
            </label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              value={name}
              onChange={getBankName}
            />
          </div>
      
          <button className="btn btn-primary" onClick={updateButton}>
            Update bank
          </button>
          </form>
      </Modal>
      <div className="parent-filter">
      <div className="form-cont">
        <div>
          <input type="text" placeholder="Bank Name" onChange={handleBankName} value={filterName} />
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

export default AllBank