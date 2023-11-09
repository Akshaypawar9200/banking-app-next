import axios from "axios";
export const CreateBankAccount=async(bankName,balance)=>{

    const res=await axios.post('http://127.0.0.1:20200/api/v1/user/account',{bankName,balance},{headers: { auth: localStorage.getItem("auth") }})
    return res
}