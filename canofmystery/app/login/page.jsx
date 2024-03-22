'use client'

import React, { useState } from "react";
import { getAuth } from "@firebase/auth";
import { FaEye } from "react-icons/fa";
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
  const [showPassword, setShowPassword] = useState(false)

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
      console.log(trimmedEmail, trimmedPassword);
      const {result, error} = await signIn(trimmedEmail, trimmedPassword);
      console.log(result, error)
      if(result !== null){
        router.push("/");
      }else{
        setErrorMessage(`Oh no! You email or password were incorrect. Please try again!`)
        setLoginErrorVisible(true); // Show error
        setTimeout(() => setLoginErrorVisible(false), 3000); // Hide error after 3 seconds
      }
       // Navigate to home page after successful login
    } catch (error) {
      setLoginErrorVisible(true); // Show error
      setTimeout(() => setLoginErrorVisible(false), 3000); // Hide error after 3 seconds
    }
  };
  
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div class="flex flex-col justify-center self-center align-center p-7 w-[calc(100vw_-_29px)] sm:max-w-[450px] border-3 rounded-md shadow-lg m-7 sm:m-0">  
        <div class="mb-4">
          <h3 class="font-bold text-3xl text-gray-200">Login</h3>
        </div>
        <div >
          <form onSubmit={handleForm} className="flex flex-col gap-[15px]">
            <div className="flex flex-col">
              <label htmlFor="email" class="text-2xl font-semibold text-gray-700 tracking-wide mb-[10px]">
                Email
              </label>
              <input 
                onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email"
                class="text-xl xs:tracking-[-1.76px] w-full  3xl:h-max 3xl:text-2.5xl   lg:text-xl lg:tracking-[-2.76px]  xl:tracking-[-2.32px] tracking-[-5.76px] border-2 lg:border-3 p-1 pr-3 rounded-md shadow-md  border-2 2xl:text-2xl lg:border-3 rounded-md shadow-md text-base px-4 py-2 border  border-gray-300 focus:outline-none focus:border-green-400" placeholder="mail@gmail.com" 
              />
            </div>
            <div className="flex flex-col">
              

              <label htmlFor="password" class="mt-5 text-2xl font-medium text-gray-700 tracking-wide mb-[10px]">
                Password
              </label>
              <div className="flex w-full h-max">
                <input
                  onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" 
                  class="text-xl xs:tracking-[-1.76px] w-full  3xl:h-max 3xl:text-2.5xl   lg:text-xl lg:tracking-[-2.76px]  xl:tracking-[-2.32px] tracking-[-5.76px] border-2 lg:border-3 p-1 pr-3 rounded-md shadow-md  border-2 2xl:text-2xl lg:border-3 rounded-md shadow-md text-base px-4 py-2 border  border-gray-300 focus:outline-none focus:border-green-400 " placeholder="Password" 
                />
                <div className="flex items-center max-w-0 grow">
                  <div className={`relative text-2.7xl left-[-50px] bg-base-300 p-1 rounded-[50%] ${showPassword ? "bg-base-300 width-100vh" : "bg-base-100"}`}>
                    <FaEye className="text-t-header-dark min-w-max" onClick={() => {setShowPassword(!showPassword)}}/>
                  </div>
                </div>
              </div>
                <AnimatePresence>
                  {loginErrorVisible && (
                      <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="rounded-md"
                          style={{ background: '#fd6666', marginTop: "5px", padding: "5px", color: "black", marginTop: "15px"}}
                      >
                          {errorMessage}
                      </motion.div>
                  )}
                </AnimatePresence>
            </div>

            <a href="/signup" class="text-green-400 hover:text-green-500  2xl:text-2xl">
                  Need an account? click here!
            </a>
            <div className="flex w-full flex-col sm:flex-row justify-between">
              <NeoButton
                onSubmit={handleForm}
                type="submit" classes="w-max mt-4 flex justify-center 2xl:text-2xl bg-primary-dark  hover:bg-green-200 text-t-header-light p-3 py-1 border-2 lg:border-3 shadow-md rounded-md tracking-wide font-semibold cursor-pointer"
              >
                Login
              </NeoButton>
              <NeoButton
                onClick={() => router.push("/forgotPassword")}
                classes="w-max mt-4 flex justify-center 2xl:text-2xl   hover:bg-green-200 text-t-header-light p-3 py-1 border-2 lg:border-3 shadow-md rounded-md tracking-wide font-semibold cursor-pointer bg-primary"
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
