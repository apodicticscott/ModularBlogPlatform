'use client'
import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebase"; // Ensure you export firebaseConfig if it's not already
import Article from "../../components/article/article"

export default function Page(){
  const [citation, setCitation] = useState(null);

  const db = getFirestore(app)

  useEffect(() => {
    const fetchCitation = async () => {
      const docRef = doc(db, "CitationGuide", "V9LQ0H3UixafSHZ3eJwK");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setCitation(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchCitation();
  }, []);


  return <Article article={citation} />
};