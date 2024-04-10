'use client'

import React, { useState } from "react";
import { getAuth } from "@firebase/auth";
import { FaEye} from "react-icons/fa";
import { FaEyeLowVision } from "react-icons/fa6";
import { useRouter } from 'next/navigation'; // Corrected import
import  NeoButton from "../../components/TextComponents/NeoButton";
import { AnimatePresence, motion } from "framer-motion";
import signIn from "../../firebase/auth/signin";
import firebase_app from "../../firebase/config";
const auth = getAuth(firebase_app);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrorVisible, setLoginErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();
  
    const MIN_PASSWORD_LENGTH = 8; // Minimum password length requirement
  
    // Extract email and password from form
    const { email, password } = event.target.elements;
  
    // Trim whitespace from email and password
    const trimmedEmail = email.value.trim();
    const trimmedPassword = password.value.trim();
  
    // Check if email and password fields are not empty
    if (!trimmedEmail || !trimmedPassword) {
      // Show error for empty fields
      setLoginErrorVisible(true);
      setErrorMessage("Please fill in both email and password fields.");
      setTimeout(() => setLoginErrorVisible(false), 3000);
      return;
    }
  
    // Check if password meets minimum length requirement
    if (trimmedPassword.length < MIN_PASSWORD_LENGTH) {
      // Show error for short password
      setLoginErrorVisible(true);
      setErrorMessage(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
      setTimeout(() => setLoginErrorVisible(false), 3000);
      return;
    }
  
    try {
      const {result, error} = await signIn(trimmedEmail, trimmedPassword);
      console.log(error)
      if(result !== null){
        router.push("/");
      }else{
        console.log(error.message)
        if(error.message.includes("(auth/user-disabled)")){
          setErrorMessage(`Oh no! Your account is locked! Please contact the page admin.`)
        }else if(error.message.includes("Access to this account has been temporarily disabled")){
          setErrorMessage(`Oh no! Your account is locked! Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.`)
        }else{
          setErrorMessage(`Oh no! You email or password were incorrect. Please try again!`)
        }
        
        setLoginErrorVisible(true); // Show error
        setTimeout(() => setLoginErrorVisible(false), 5000); // Hide error after 3 seconds
      }
       // Navigate to home page after successful login
    } catch (error) {
      console.log(error)
      setLoginErrorVisible(true); // Show error
      if(error.message.includes("(auth/invalid-credential)")){
        setErrorMessage(`Oh no! You email or password were incorrect. Please try again!`)
      }
      setTimeout(() => setLoginErrorVisible(false), 3000); // Hide error after 3 seconds
    }
  };
  
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div class="flex flex-col justify-center self-center align-center p-7 w-full w-full xs-sm:w-[calc(100vw_-_29px)] xs-sm:max-w-[450px] border-y-3 xs-sm:border-3 xs-sm:rounded-md xs-sm:shadow-lg xs-sm:m-7 xs-sm:m-0 transition-all duration-500">  
        <div class="mb-4">
          <h3 class="font-bold text-3xl text-gray-200 tracking-tighter">Login</h3>
        </div>
        <div >
          <form onSubmit={handleForm} className="flex flex-col gap-[15px]">
            <div className="flex flex-col">
              <label htmlFor="email" class="text-2xl font-semibold text-gray-700 tracking-tighter mb-[10px]">
                Email
              </label>
              <input 
                onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email"
                class="text-xl xs:tracking-[-1.76px] w-full  3xl:h-max 3xl:text-2.5xl   lg:text-xl lg:tracking-[-2.76px]  xl:tracking-[-2.32px] tracking-[-5.76px] border-2 lg:border-3 p-1 pr-3 rounded-md shadow-md  border-2 lg:border-3 rounded-md shadow-md text-base px-4 py-2 border  border-gray-300 focus:outline-none focus:border-green-400" placeholder="mail@gmail.com" 
              />
            </div>
            <div className="flex flex-col w-full gap-[10px]">
              <label htmlFor="password" className="text-2xl font-medium text-gray-700 tracking-tighter">
                Password
              </label>
              <div className="max-w-full h-max flex justify-center items-center border-3 rounded-md shadow-md  pr-[3px] bg-[#ffffff]">

                <input
                  onChange={(e) => setPassword(e.target.value)} required type={isPasswordVisible ? "text" : "password"} name="password" id="password" 
                  className="text-xl xs:tracking-[-1.76px]  w-[calc(100%_-_37px)]  h-max 3xl:text-2.5xl   lg:text-xl lg:tracking-[-2.76px]  xl:tracking-[-2.32px] tracking-[-5.76px] rounded-md p-1 pr-3  content-center text-base px-4 py-2 focus:outline-none focus:border-green-400" placeholder="Password" 
                /> 
                <button className="h-[37px] h-[37px] rounded-md p-[5px] pt-[3px] flex items-center hover:bg-base-200" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                  {
                    isPasswordVisible
                    ?
                    <FaEyeLowVision className="text-2.7xl"/>
                    :
                    <FaEye className="text-2.7xl"/>
                  }
                  
                </button>
              </div>
                <AnimatePresence>
                  {loginErrorVisible && (
                    <motion.div
                    initial={{ opacity: 0, height: 0, paddingX: 0, paddingY: 0 }}
                    animate={{ opacity: 1, height: "auto",  paddingX: 15, paddingY: 10, }}
                    exit={{ opacity: 0, height: 0, paddingY: 0, paddingX: 0}}
                    transition={{ duration: 0.5 }}
                    className="rounded-md overflow-hidden p-[10px] px-[15px] tracking-tighter"
                    style={{ background: '#fd6666', color: "black", marginTop: "15px" }}
                  >
                    {errorMessage}
                  </motion.div>
                  )}
                </AnimatePresence>
            </div>

            <a href="/signup" class="text-green-400 hover:text-green-500 tracking-tighter">
                  Need an account? click here!
            </a>
            <div className="flex w-full flex-col xs:flex-row justify-between">
              <NeoButton
                onSubmit={handleForm}
                type="submit" classes="w-max mt-4 flex justify-center  bg-primary-dark  hover:bg-green-200 text-t-header-light p-3 py-1 border-2 lg:border-3 shadow-md rounded-md tracking-wide font-semibold cursor-pointer"
              >
                Login
              </NeoButton>
              <NeoButton
                onClick={() => router.push("/forgotPassword")}
                classes="w-max mt-4 flex justify-center  hover:bg-green-200 text-t-header-light p-3 py-1 border-2 lg:border-3 shadow-md rounded-md tracking-wide font-semibold cursor-pointer bg-primary"
              >
                Forgot Password?
              </NeoButton>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default LoginPage
