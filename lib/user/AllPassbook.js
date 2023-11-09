import axios from "axios";

export const getAllPassbook = async (id,params) => {
  const res = await axios.get(`http://127.0.0.1:20200/api/v1/user/account/${id}/passbook`,{
    headers: { auth: localStorage.getItem("auth") },
    params:params
  });
  return res;
};
