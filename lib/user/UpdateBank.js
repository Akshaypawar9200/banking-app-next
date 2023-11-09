import axios from "axios";

export const UpdateBank=async(name,id)=>{
    const res=await axios.put(`http://127.0.0.1:20200/api/v1/bank/${id}`,{name},{headers: { auth: localStorage.getItem("auth") }})
    return res
}