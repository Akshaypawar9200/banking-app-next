import axios from "axios";
export const CreateUserService=async(name,username,password,age,gender)=>{

    const res=await axios.post('http://127.0.0.1:20200/api/v1/user',{name,username,password,age,gender},{headers: { auth: localStorage.getItem("auth") }})
    return res
}