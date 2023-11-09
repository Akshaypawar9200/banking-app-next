import axios from "axios";

export const DeleteUser=async(id)=>{
    const res=await axios.delete(`http://127.0.0.1:20200/api/v1/user/${id}`,{headers: { auth: localStorage.getItem("auth") }})
    return res
}