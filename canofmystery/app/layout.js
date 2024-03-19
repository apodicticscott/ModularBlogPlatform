'use client'
import React, {useState} from 'react'
import useLogPageView from "../hooks/useLogPageView"
import { Lexend_Mega } from 'next/font/google'
import './globals.css'
import Navbar from "/components/navbar/Navbar"
import Footer from "/components/footer/Footer"
import { AuthContextProvider } from '/context/AuthContext'
import CookieConsent from "../components/cookies/cookieConsent"
import Cookies from 'js-cookie';

const LexM = Lexend_Mega(
  {
    subsets: ['latin'] 
  }
)

// export const metadata = {
//   title: 'Can of Mystery',
//   description: 'Blog site',
// }


export default function RootLayout({ children  }) {
  const [cookieConsent, setCookieConsent] = useState(false);

  let consentCookie = Cookies.get("hasConsent")

  if(consentCookie === undefined){
    Cookies.set('hasConsent', 'false')
    setCookieConsent(false)
  }else if(consentCookie === 'true' && cookieConsent === false){
    setCookieConsent(true)
  }

  const handleGiveConsent = () => {
    Cookies.set('hasConsent', 'true')
    setCookieConsent(true)
  }

  if(cookieConsent){
    useLogPageView(); 
  }
  
  return (
    <html data-theme="mytheme" className="" lang="en">
      <body className={`${LexM.className} tracking-tighter`}>
          <AuthContextProvider>
            <div className="container k h-screen min-w-full ">  
              <Navbar className="z-50"/>
              {children}
              <CookieConsent setCookieConsent={handleGiveConsent} cookieConsent={cookieConsent}/>
              <Footer />
            </div>
          </AuthContextProvider>
      </body>
    </html>
  );    
}
