'use client'
import React, { useEffect, useState } from "react";
import Article from "../../../components/article/article"
import { getPageByName  } from "../../../firebase/articleUtils/articleUtils"

export default function Page({params}){
  const pageName = params.slug

  const [page, setPage] = useState()

  useEffect(() => {
    // Define an async function to fetch project data
    async function getCitationGuide() {
      const response = await getPageByName(pageName);

      console.log(response)
      setPage(response)
    }
    
    // Call the fetch function
    getCitationGuide();
  }, []);


  return <Article article={page} />
};