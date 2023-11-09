import axios from "axios";
export const transferMoney=async(id,userId,amount,reciver)=>{

    const res=await axios.post(`http://127.0.0.1:20200/api/v1/user/${userId}/account/${id}/transfer`,{amount,reciver},{headers: { auth: localStorage.getItem("auth") }})
    return res
}