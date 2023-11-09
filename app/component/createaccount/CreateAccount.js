import React, { useEffect, useState } from 'react';
import './CreateAccount.css'
import { MessageError, MessageSuccess } from "../../../error/Error";
import { CreateBankAccount } from '../../../lib/user/CreateBankAccount';
import {AllBanks as AllBanks}from '../../../lib/user/AllBanks'
import DropdownBank from '../bankdropdown/DropDownBnak';
const CreateAccount = ({ handleAccount }) => {
    const [bankName, setBankName] = useState("");
    const [balance, setBalance] = useState("");
    const [bankId, setBankId] = useState(""); 
    const [selectedValue, setSelectedValue] = useState('');
    const[data,setData]=useState([])
    useEffect(() => {
        handleBankSubmit();
      }, []);

    const handleBankSubmit=async()=>{
        const params={
        }
         const response=await AllBanks(params)
    
          setData((prev)=>response.data)
          console.log(response);
      }
    const getBalance = (e) => {
        setBalance(e.target.value);
    }

    const handleCreateAccount = async (e) => {
        // e.preventDefault();
        try {
           if(balance==""){
            throw new Error("Plz enter amount")
           }
            const response = await CreateBankAccount(selectedValue, balance);
            handleAccount();
            MessageSuccess("Account created");
        } catch (error) {
            if (error.response) {
                MessageError(error.response.data.message);
              } else {
                MessageError(error.message);
              }
        }
    }
    const dropDownFunction=async(value)=>{
        setSelectedValue(value)
    }
    return (
        <>
            <div className="container">
                <h1>Create Account</h1>
                <form action="#" method="post">
                                 <DropdownBank 
    data={data} onSelect={dropDownFunction}
    />
                    <label htmlFor="name">Balance</label>
                    <input type="number" id="name" name="name" onChange={getBalance} required />
                    <button type="button" className="createbtn" onClick={handleCreateAccount}>Create Account</button>
                </form>
            </div>
        </>
    );
}

export default CreateAccount;
