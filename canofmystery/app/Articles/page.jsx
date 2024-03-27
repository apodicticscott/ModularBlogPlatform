'use client'
import styles from "/app/homepage.module.css";
import React, {  useEffect, useState } from "react";
import {fetchArticles} from "../../firebase/articleUtils/articleUtils.js";

export const article_result = (article) => {

    return(
        <div className= "px-[20px] py-[15px] flex-end ">
            <img src={article.image} alt="Article Image" className=" w-full h-[139px] rounded-md"/>
            
            <p>{article.Title}</p>
            <p>@{article.author}</p>


        </div>

    );


}

const Articles = () => {
    
    const [json_search_results, setJson] = useState([]);



    useEffect(() => {
        fetchArticles().then((value) => {setJson(value)}, (value) => {setJson(value)});
        
    }, []);

    
    return(
        <>
            
            <div class="justify-center self-center align-center p-20">
                <p className="text-4xl text-bold tracking-minimal">Explore!</p>
                <br/>
                <br/>
                <br/>
                {json_search_results.length > 0 ? 
                    <div className="resize-none flex flex-wrap gap-[20px] grid-flow-row auto-rows-max">
                    {
                        json_search_results.map((article,index) => (
                            <a key={article.id} href={`"blog/${article.id}`} className="w-[400px] h-[240px] bg-secondary-content border-3 rounded-md shadow-lg">
                                {article_result(article)}
                            </a>
                        ))
                    }
                </div>:
                    <div className="h-screen w-screen flex items-center ">
                        <div class="loader">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
                    </div>
                }
                
            </div>
        </>
    );
};

export default Articles

