'use client'
import React from "react";
import { login as userLogin } from "../lib/user/login";
import "./globals.css";
import { useState } from "react";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { MessageError, MessageSuccess } from "../error/Error";
import ValidationError from "../sharedcomponent/error/validationError";
import Spinner from "../sharedcomponent/spinner/Spinner";
import { useRouter } from "next/navigation";



const page = () => {
  const router=useRouter()
  // const navigate = new useNavigate();
  const [userName, setUsername] = useState();
  const [password, setPassword] = useState();
  const[loader,setLoader]=useState(false)
  const validateUsername = (e) => {
    setUsername(e.target.value);
  };
  const validatePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (e) => {
    try {
   
      e.preventDefault();
      setLoader(prev=>true)
      if (userName == "") {
        throw new ValidationError("plz enter username") 
       
      }
      if (password.length == "") {
        throw new ValidationError("plz enter password")
      }
    
      const response = await userLogin(userName, password);
      console.log(response);
      localStorage.setItem("auth", response.headers.auth);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("id", response.data.id);

      if (!response?.data.id) {
        throw new Error("invalid credential")
     
      }
      if (response.data.isAdmin == true) {
        MessageSuccess("login sucessful")
        router.push("/admin");
      }
      if (response.data.isAdmin == false) {
        MessageSuccess("login sucessful")

        router.push('/user');
      }
    } 
    catch (error) {
      
      enqueueSnackbar("login failed", { variant: "error" });
      
    } 
  finally{
    setLoader(prev=>false)
  }

  };
  const handlePassword=(e)=>{
    // navigate(`/forgot/`);
    router.push("/forgot")
  }
  return (
    <>
      <Spinner loader={loader}/>
      <SnackbarProvider autoHideDuration={3000} />
      <div className="login">
        <form action="#" className="login-form">
          <label htmlFor="userName" className="login-label" id="user">
            UserName
          </label>
          <input
            type="text"
            className="userName"
            onChange={validateUsername}
            placeholder="Enter UserName"
          
          />
          <br />
          <label htmlFor="password" className="login-label" id="password">
            Password
          </label>
          <input
            type="password"
            className="password"
            onChange={validatePassword}
           
            placeholder="Enter your password"
          />
          <br />
          <div className="buttons">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>
          <div className="buttons">
            <button
              type="button" 
              className="btn btn-primary"
              onClick={handlePassword}
            >Forgot password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;
