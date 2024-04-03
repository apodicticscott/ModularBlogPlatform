'use client'
import React, { useEffect, useState } from "react";
import {getFirestore, doc, getDoc} from "firebase/firestore";
import PageNotFound from "../../not-found"
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { app } from "../../firebase";
import firebase_app from "../../../firebase/config"
import Article from "../../../components/article/article"
import Loader from "../../../components/loader/loader";


const auth = getAuth(firebase_app);
const db = getFirestore(app);
 
export default function Page({params}) {
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState(null)

    console.log("here")

    useEffect(() => {
      const fetchArticle = async () => {
        const docRef = doc(db, "Articles", params.slug);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          setArticle(docSnap.data());
        } else {
          setArticle(null)
        }
      };

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
          setIsLoading(true);
        }
      });

      fetchArticle(); // Moved inside useEffect but outside of onAuthStateChanged callback
      return unsubscribe; // Corrected to return the unsubscribe function for cleanup
  }, [params.slug]); // Added params.slug as a dependency
    if(isLoading){
      return  <Loader className={`${loading ? "scale-100" : "scale-70"} transition duration-500`}/>;
    }else if(!article.Approved && !isAdmin && userId !== article.UserId){
      return <PageNotFound />
    }



      
    return <Article article={article} />
}