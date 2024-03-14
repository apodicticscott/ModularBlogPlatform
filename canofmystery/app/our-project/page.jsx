'use client';
import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebase"; // Ensure you export firebaseConfig if it's not already
import Article from "../../components/article/article";
import { fetchOurProject } from "../../firebase/articleUtils/articleUtils"; // Ensure this is the correct function name

export default function Page() {
  const [ourProject, setOurProject] = useState(null);

  useEffect(() => {
    // Define an async function to fetch project data
    async function getOurProject() {
      setOurProject(await fetchOurProject());
    }
    
    // Call the fetch function
    getOurProject();
  }, []);


  return (
    <div className="w-full h-[calc(100vh_-_67px)] flex items-center justify-center">
      <Article article={ourProject} />
    </div>
  );
};
