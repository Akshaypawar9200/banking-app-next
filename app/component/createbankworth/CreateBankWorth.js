import React, { useEffect, useState } from 'react'
import{getBankWorth as getBankWorth}from '../../../lib/user/BankWorth'
import DropdownAcc from '../dropdownbyid/DropdownForId'
import './CreateBankWorth.css'
const CreateBankWorth = ({data}) => {
    const[bankId,setBankId]=useState("")
    const[balance,setBalance]=useState()
    const[selectedValue,setSelectedValue]=useState()

    useEffect(()=>{
      if(selectedValue){
        handleWorth()
      }
    },[selectedValue])
    const handleWorth=async(e)=>{
        // e.preventDefault()
        const res=await getBankWorth(selectedValue)
        console.log(res);
        setBalance(res.data)
      
    }

    const dropDownFunction=async(value)=>{

      setSelectedValue(value)
    }
  return (
<>
<div className='worth'>
<form action="#">
            <label for="bankId">BankId:</label>
            <DropdownAcc data={data} onSelect={dropDownFunction} />

     
            <h5>Bank Total Worth:{balance}</h5>
        </form>
        </div>
</>
  )
}

export default CreateBankWorth