import axios from "axios";

export const UpdateUser=async(name,age,gender,id)=>{
    const res=await axios.put(`http://127.0.0.1:20200/api/v1/user/${id}`,{name,age,gender},{headers: { auth: localStorage.getItem("auth") }})
    return res
}