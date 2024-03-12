'use client'
import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Article from "../../../components/article/article"
import { app } from "../../firebase";

 
export default function Page({params}) {
    const [article, setArticle] = useState(null);

    const db = getFirestore(app)

    useEffect(() => {
        const fetchArticle = async () => {
          const docRef = doc(db, "Articles", params.slug);
          const docSnap = await getDoc(docRef);
    
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            console.log(docSnap.data())
            setArticle(docSnap.data());
          } else {
            console.log("No such document!");
          }
        };
    
        fetchArticle();
    }, []);
      
    return <Article article={article} />
}