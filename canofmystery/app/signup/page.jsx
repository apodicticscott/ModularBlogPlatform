'use client'

import styles from "./signupPage.module.css"
import { NeoButton } from "../../components/TextComponents"; 
import React from "react";
import {  createUserWithEmailAndPassword   } from 'firebase/auth';
import { useRouter } from 'next/navigation'
import {auth} from "../firebase"

const SignUpPage = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isSignedUp, setIsSignedUp] = React.useState('false')
  const router = useRouter() 

  const handleForm = async (event) => {
      event.preventDefault()

      if (password) {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            
        } catch(error) {
            console.log("Sorry, something went wrong. Please try again.");
            console.log(error)
        }     
      }
  }

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
