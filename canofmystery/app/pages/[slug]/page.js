'use client'
import React, { useEffect, useState } from "react";
import Article from "../../../components/article/article"
import { getPageByName  } from "../../../firebase/articleUtils/articleUtils"
import {getFirestore, doc, getDoc} from "firebase/firestore";
import PageNotFound from "../../not-found"
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { app } from "../../firebase";
import firebase_app from "../../../firebase/config"

const auth = getAuth(firebase_app);
const db = getFirestore(app);
 

export default function Page({params}){
  const pageName = params.slug

  const [page, setPage] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    // Define an async function to fetch project data
    async function getCitationGuide() {
      const response = await getPageByName(pageName);
      console.log(response)
      setPage(response)
    }
    
    // Call the fetch function
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => { // `auth` is not defined, should be imported and initialized from Firebase
      if (user) {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          console.log("User data reference:", docRef); // Corrected to log a meaningful message
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserId(user.uid) // Corrected to use the correct user ID from the auth object
            setIsAdmin(userData.adminPerm === true);
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
      } else {
        setIsLoading(false)
      }
    });

    getCitationGuide(); // Moved inside useEffect but outside of onAuthStateChanged callback
    return unsubscribe; // Corrected to return the unsubscribe function for cleanup
}, [params.slug]);

  if(isLoading){
    return(
      <div className="h-screen w-screen flex items-center ">
        <div class="loader">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    </div>
    );
  }else if((page && !page.Approved) && !isAdmin && userId !== page.UserId){
    return <PageNotFound />
  }

  console.log("here 1")

  return <Article article={page} />
};