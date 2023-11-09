import axios from "axios";
export const withdrawMoney=async(id,userId,amount)=>{

    const res=await axios.post(`http://127.0.0.1:20200/api/v1/user/${userId}/account/${id}/withdraw`,{amount},{headers: { auth: localStorage.getItem("auth") }})
    return res
}