'use client'

import React, { useState } from "react";

import { app } from "../../app/firebase"
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation'; // Corrected import
import NeoButton from "../../components/TextComponents/NeoButton";
import { AnimatePresence, motion } from "framer-motion";
import firebase_app from "../../firebase/config";

import Header from "../../components/TextComponents/Header1"

const auth = getAuth(firebase_app);
const firestore = getFirestore(app);

import signUp from "../../firebase/auth/signup"

const SignUpPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [sessionCode, setSessionCode] = useState('');
  const [panel, setPanel] = React.useState('cradentials');
  const [signUpErrorVisible, setSignUpErrorVisible] = useState(false);
  const [infoErrorVisible, setInfoErrorVisible] = useState(false)
  const [infoErrorMessage, setInfoErrorMessage] = useState('');
  const [displayNameErrorVisible, setDisplayNameErrorVisible] = useState(false)
  const [displayNameErrorMessage, setDisplayNameErrorMessage] = useState("")
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleCradentials = async (event) => {
    event.preventDefault()

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
        const response = await signUp(emailInput, passwordInput);

        if(response.error.code = "auth/email-already-in-use"){
          setSignUpErrorVisible(true);
          setErrorMessage("The email you have chosen is already in use.");
          return;
        }else{
          setPanel("name")
        }
        
    } catch (error) {
        console.log("Sorry, something went wrong. Please try again.");
        console.log(error);
    }
};

const handleInfo = async (event) => {
  event.preventDefault();


  // Check if email or password is empty
  if (!firstName.trim() || !lastName.trim()) {
    setInfoErrorMessage(true);
    setInfoErrorMessage("First and Last name are required.");
    return;
  }

  if (!displayName.trim()) {
    setDisplayNameErrorMessage(true);
    setDisplayNameErrorMessage("Display Name is Required.");
    return;
  }

  try {

    const response = onAuthStateChanged(auth, async (user) => {
      if (user) {
          const userRef = doc(firestore, "users", user.uid);
          await updateDoc(userRef, {
              firstName: firstName,
              lastName: lastName,
              "userInfo.displayName": displayName,
              sessionCode: sessionCode && sessionCode,
          });
      }
    });

    setPanel("done")
    console.log(response)
    // router.push("/");
  } catch (error) {
      console.log("Sorry, something went wrong. Please try again.");
      console.log(error);
  }
};




  return (
    <div className="w-full h-[100vh] flex items-center justify-center">

      <div class={`flex flex-col justify-center self-center align-center sm:max-w-[450px] border-2 md:border-3    shadow-lg m-7 sm:m-0 h-max min-h-[480px] w-[calc(100vw_-_29px)] p-7 rounded-md transition-all duration-500`}>
        
          {panel === "cradentials" 
          ?
            <div class="mb-4">
              <h3 class="font-bold text-3xl text-gray-200">Sign Up</h3>
            </div>
          :
            panel === "name"
            &&
            <div class="mb-4">
              <h3 class="font-bold text-3xl text-gray-200">User Info</h3>
            </div>
          }
        
        <div >
          {
          panel === "cradentials"
          ?
          <form onSubmit={handleCradentials} className="flex flex-col gap-[25px]">
            <div className="flex flex-col w-full gap-[10px]">
              <label htmlFor="email" class="text-2xl font-semibold text-gray-700 tracking-wide">
                Email
              </label>
              <input 
                onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email"
                class="text-xl xs:tracking-[-1.76px] w-full 3xl:h-max 3xl:text-2.5xl   lg:text-xl lg:tracking-[-2.76px]  xl:tracking-[-2.32px] tracking-[-5.76px] border-2 lg:border-3 p-1 pr-3 rounded-md shadow-md  border-2 2xl:text-2xl lg:border-3 rounded-md shadow-md text-base px-4 py-2 border  border-gray-300 focus:outline-none focus:border-green-400" placeholder="mail@gmail.com" 
              />
            </div>
            <div className="flex flex-col w-full gap-[10px]">
              <label htmlFor="password" class="text-2xl font-medium text-gray-700 tracking-wide">
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
                          className="rounded-md p-[10px]"
                          style={{ background: '#fd6666', marginTop: "5px", color: "black", marginTop: "15px"}}
                      >
                        {errorMessage}
                      </motion.div>
                  )}
                </AnimatePresence>           
            </div>
            <a href="/login" class="text-green-400 hover:text-green-500 2xl:text-2xl w-full">
                  Have an account? click here!
            </a>
            <NeoButton
              onSubmit={handleCradentials}
              type="submit" classes="w-max mt-4 flex justify-center 2xl:text-2xl bg-primary-dark  hover:bg-green-200 text-t-header-light p-3 py-1 border-2 lg:border-3 shadow-md rounded-md tracking-wide font-semibold cursor-pointer"
            >
              Next
            </NeoButton>
          </form>
          :

          panel === "name"
          ?
          <form onSubmit={handleInfo} className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[20px]">
            <div className="flex w-full h-max items-center gap-[10px]">
              <label htmlFor="email" class="text-xl font-semibold text-gray-700 tracking-wide grow">
                First Name
              </label>
              <label htmlFor="password" class="text-xl font-medium text-gray-700 tracking-wide grow">
                Last Name
              </label>
            </div>
            <div className="flex flex-row w-full h-max gap-[20px]">
              <input 
                onChange={(e) => setFirstName(e.target.value)} required type="text" name="FirstName" id="FirstName"
                class="text-xl xs:tracking-[-1.76px] w-full 3xl:h-max 3xl:text-2.5xl   lg:text-xl lg:tracking-[-2.76px]  xl:tracking-[-2.32px] tracking-[-5.76px] border-2 lg:border-3 p-1 pr-3 rounded-md shadow-md  border-2 2xl:text-2xl lg:border-3 rounded-md shadow-md text-base px-4 py-2 border  border-gray-300 focus:outline-none focus:border-green-400" placeholder="First" 
              />
              <input
                onChange={(e) => setLastName(e.target.value)} required type="text" name="LastName" id="LastName" 
                class="text-xl xs:tracking-[-1.76px] w-full  3xl:h-max 3xl:text-2.5xl   lg:text-xl lg:tracking-[-2.76px]  xl:tracking-[-2.32px] tracking-[-5.76px] border-2 lg:border-3 p-1 pr-3 rounded-md shadow-md  2xl:text-2xl content-center text-base px-4 py-2 border  border-2 lg:border-3 rounded-md shadow-md focus:outline-none focus:border-green-400" placeholder="Last" 
              /> 
            </div>
            <AnimatePresence>
                  {infoErrorVisible && (
                      <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="rounded-md p-[10px]"
                          style={{ background: '#fd6666', marginTop: "5px", color: "black", marginTop: "15px"}}
                      >
                        {infoErrorMessage}
                      </motion.div>
                  )}
            </AnimatePresence>   
            <div className="flex flex-col w-full gap-[10px]">
              <label htmlFor="email" class="text-xl font-semibold text-gray-700 tracking-wide">
                Display Name
              </label>
              <input 
                onChange={(e) => setDisplayName(e.target.value)} required type="displayName" name="displayName" id="displayName"
                class="text-xl xs:tracking-[-1.76px] w-full 3xl:h-max 3xl:text-2.5xl   lg:text-xl lg:tracking-[-2.76px]  xl:tracking-[-2.32px] tracking-[-5.76px] border-2 lg:border-3 p-1 pr-3 rounded-md shadow-md  border-2 2xl:text-2xl lg:border-3 rounded-md shadow-md text-base px-4 py-2 border  border-gray-300 focus:outline-none focus:border-green-400" placeholder="Name or Pseudonim" 
              />
            </div>
            <div className="flex flex-col w-full gap-[10px]">
              <label htmlFor="email" class="text-xl font-semibold text-gray-700 tracking-wide">
                Session Code
              </label>
              <input 
                onChange={(e) => setSessionCode(e.target.value)} type="sessionCode" name="sessionCode" id="sessionCode"
                class="text-xl xs:tracking-[-1.76px] w-full 3xl:h-max 3xl:text-2.5xl   lg:text-xl lg:tracking-[-2.76px]  xl:tracking-[-2.32px] tracking-[-5.76px] border-2 lg:border-3 p-1 pr-3 rounded-md shadow-md  border-2 2xl:text-2xl lg:border-3 rounded-md shadow-md text-base px-4 py-2 border  border-gray-300 focus:outline-none focus:border-green-400" placeholder="5D12gD" 
              />
            </div>

          </div>
          <NeoButton
            onSubmit={handleInfo}
            type="submit" classes="w-max mt-4 flex justify-center 2xl:text-2xl bg-primary-dark  hover:bg-green-200 text-t-header-light p-3 py-1 border-2 lg:border-3 shadow-md rounded-md tracking-wide font-semibold cursor-pointer"
          >
            Sign up
          </NeoButton>
        </form>
        :
        <>
          <div class="wrapper"> 
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
          <div>
                  <Header type="sm" classes="text-center">
                      Your all signed up
                  </Header>
          </div>
        </>

        }
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
