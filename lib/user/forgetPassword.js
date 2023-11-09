import axios from "axios"

export const  forget=async(username,newPassword)=>{

const res=await axios.post(`http://127.0.0.1:20200/api/v1/forgotpassword`,{username,newPassword},{headers: { auth: localStorage.getItem("auth") }})
return res

}