'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lexend_Mega } from 'next/font/google'
import './globals.css'
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"
import Loading from "./feed/loading"

const LexM = Lexend_Mega(
  {
    subsets: ['latin'] 
  }
)





export default function RootLayout({ children }) {

  
const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

  const AuthContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate fetching auth status
      const fetchAuthStatus = async () => {
        // Simulate an async operation to check auth status
        await new Promise(resolve => setTimeout(resolve, 0)); // 2 seconds delay
        setIsLoading(false); // Assume auth status is resolved
      };

      fetchAuthStatus();
    }, []);
    return (
      <AuthContext.Provider value={{ /* your auth context value */ }}>
        {isLoading ? <Loading /> : children}
      </AuthContext.Provider>
    );
  };

  return (
    <html data-theme="mytheme" className="" lang="en">
      <body className={`${LexM.className} tracking-tighter`}>
        <div className="container k h-screen min-w-full ">  
          <Navbar className="z-50"/>
          <AuthContextProvider>

              {children}

          </AuthContextProvider>
          <Footer />
          </div>
      </body>
    </html>
  );    
}
