'use client'
import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebase"; // Ensure you export firebaseConfig if it's not already
import Article from "../../components/article/article"
import { fetchCitationGuide } from "../../firebase/articleUtils/articleUtils"

export default function Page(){
  const [citationGuide, setCitationGuide] = useState(null);

  useEffect(() => {
    // Define an async function to fetch project data
    async function getCitationGuide() {
      setCitationGuide(await fetchCitationGuide());
    }
    
    // Call the fetch function
    getCitationGuide();
  }, []);


  return <Article article={citationGuide} />
};