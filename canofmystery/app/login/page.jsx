'use client'

import styles from "./loginPage.module.css" 
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const router = useRouter()

  const handleForm = async (event) => {
      event.preventDefault()

      const { result, error } = await signIn(email, password);

      if (error) {
          return console.log(error)
      }

      // else successful
      console.log(result)
      return router.push("/admin2")
  }
  return (
    <div class="flex flex-col justify-center self-center align-center p-20">         
      <div class="mb-4">
        <h3 class="font-bold text-3xl text-gray-200">Login</h3>
      </div>
      <div className="">
      <form onSubmit={handleForm}>
        <label htmlFor="email" class="text-2xl font-semibold text-gray-700 tracking-wide">
          Email
        </label>
        <input 
          onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email"
          class="w-full border-2 text-2xl lg:border-3 rounded-md shadow-md text-base px-4 py-2 border  border-gray-300 focus:outline-none focus:border-green-400" placeholder="mail@gmail.com" 
        />
        <label htmlFor="password" class="mt-5 text-2xl font-medium text-gray-700 tracking-wide">
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" 
          class="w-full text-2xl content-center text-base px-4 py-2 border  border-2 lg:border-3 rounded-md shadow-md focus:outline-none focus:border-green-400" placeholder="Password" 
        />
        <a href="/signup" class="text-green-400 hover:text-green-500 text-2xl">
              Need an account? click here!
        </a>
        <button
          onSubmit={handleForm}
          type="submit" class="w-full mt-4 flex justify-center text-2xl bg-primary-dark  hover:bg-green-200 text-t-header-light p-3 border-2 lg:border-3 shadow-md rounded-md tracking-wide font-semibold cursor-pointer"
        >
          Login
        </button>
      </form>
      </div>
    </div>
  )
}

export default LoginPage
