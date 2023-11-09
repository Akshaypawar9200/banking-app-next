import axios from "axios";

export const getBankWorth = async (id) => {
  const res = await axios.get(`http://127.0.0.1:20200/api/v1/bank/${id}/networth`,{
    headers: { auth: localStorage.getItem("auth") },
   
  });
console.log(res)
  return res;
};
