import axios from "axios";
export const CreateBankService=async(name)=>{

    const res=await axios.post('http://127.0.0.1:20200/api/v1/bank',{name},{headers: { auth: localStorage.getItem("auth") }})
    return res
}