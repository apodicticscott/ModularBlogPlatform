'use client'
import React, {useState, useEffect} from 'react'
import { Lexend_Mega } from 'next/font/google'
import './globals.css'
import Navbar from "/components/navbar/Navbar"
import Footer from "/components/footer/Footer"
import { usePathname } from 'next/navigation'
import { AuthContextProvider } from '/context/AuthContext'
import CookieConsent from "../components/cookies/cookieConsent"
import Cookies from 'js-cookie';
import { logPageView } from "../firebase/analitics/firebaseAnalytics"

const LexM = Lexend_Mega(
  {
    subsets: ['latin'] 
  }
)



export default function RootLayout({ children  }) {



  return (
    <html data-theme="mytheme" className="" lang="en">
      <body className={`${LexM.className} tracking-tighter`}>
        <AuthContextProvider>
          <div className="container k h-screen min-w-full ">  
            <Navbar className="z-50"/>
            {children}
            <Footer />
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );     
}
