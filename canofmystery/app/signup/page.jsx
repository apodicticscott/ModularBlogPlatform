'use client'

import React, { useState } from "react";
import { getAuth } from "@firebase/auth";
import { useRouter } from 'next/navigation'; // Corrected import
import NeoButton from "../../components/TextComponents/NeoButton";
import { AnimatePresence, motion } from "framer-motion";
import signIn from "../../firebase/auth/signin";
import firebase_app from "../../firebase/config";
const auth = getAuth(firebase_app);

import signUp from "../../firebase/auth/signup"

const SignUpPage = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isSignedUp, setIsSignedUp] = React.useState('false')
  const [signUpErrorVisible, setSignUpErrorVisible] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleForm = async (event) => {
    event.preventDefault();

    const emailInput = document.getElementById("email").value;
    const passwordInput = document.getElementById("password").value;

    // Check if email or password is empty
    if (!emailInput.trim() || !passwordInput.trim()) {
      setSignUpErrorVisible(true);
      setErrorMessage("Email and password are required.");
      return;
    }

    // Password length validation
    if (passwordInput.length < 8) {
      setSignUpErrorVisible(true);
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    // Password complexity validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    if (!passwordRegex.test(passwordInput)) {
      setSignUpErrorVisible(true);
      setErrorMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    try {
        await signUp(emailInput, passwordInput);
        router.push("/");
    } catch (error) {
        console.log("Sorry, something went wrong. Please try again.");
        console.log(error);
    }
};




  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      
      <div class="flex flex-col justify-center self-center align-center p-7 w-[calc(100vw_-_29px)] sm:max-w-[450px] border-2 md:border-3 rounded-md shadow-lg m-7 sm:m-0">
        <div class="mb-4">
          <h3 class="font-bold text-3xl text-gray-200">Sign Up</h3>
        </div>
        <div className="">
        <form onSubmit={handleForm} className="flex flex-col gap-[15px]">
          <div className="flex flex-col">
            <label htmlFor="email" class="text-2xl font-semibold text-gray-700 tracking-wide mb-[10px]">
              Email
            </label>
            <input 
              onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email"
              class="text-xl xs:tracking-[-1.76px] w-full 3xl:h-max 3xl:text-2.5xl   lg:text-xl lg:tracking-[-2.76px]  xl:tracking-[-2.32px] tracking-[-5.76px] border-2 lg:border-3 p-1 pr-3 rounded-md shadow-md  border-2 2xl:text-2xl lg:border-3 rounded-md shadow-md text-base px-4 py-2 border  border-gray-300 focus:outline-none focus:border-green-400" placeholder="mail@gmail.com" 
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" class="mt-5 text-2xl font-medium text-gray-700 tracking-wide mb-[10px]">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" 
              class="text-xl xs:tracking-[-1.76px] w-full  3xl:h-max 3xl:text-2.5xl   lg:text-xl lg:tracking-[-2.76px]  xl:tracking-[-2.32px] tracking-[-5.76px] border-2 lg:border-3 p-1 pr-3 rounded-md shadow-md  2xl:text-2xl content-center text-base px-4 py-2 border  border-2 lg:border-3 rounded-md shadow-md focus:outline-none focus:border-green-400" placeholder="Password" 
            /> 
            <AnimatePresence>
                  {signUpErrorVisible && (
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
          <a href="/login" class="text-green-400 hover:text-green-500 2xl:text-2xl">
                Have an account? click here!
          </a>
          <NeoButton
            onSubmit={handleForm}
            type="submit" classes="w-full mt-4 flex justify-center 2xl:text-2xl bg-primary-dark  hover:bg-green-200 text-t-header-light p-3 py-1 border-2 lg:border-3 shadow-md rounded-md tracking-wide font-semibold cursor-pointer"
          >
            Sign up
          </NeoButton>
        </form>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
