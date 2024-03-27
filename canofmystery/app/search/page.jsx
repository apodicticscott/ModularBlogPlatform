'use client'
import styles from "/app/homepage.module.css";
import React, {  useEffect, useState } from "react";
import {searchArticles, searchByTag, fetchArticles} from "./../../firebase/articleUtils/articleUtils";
import  NeoButton  from "/components/TextComponents/NeoButton"


export const article_result = (article) => {

    return(
        <div className= "px-[20px] py-[15px] flex-end ">
            <img src={article.image} alt="Article Image" className=" w-full h-[139px] rounded-md"/>
            
            <p>{article.Title}</p>
            <p>@{article.author}</p>


        </div>

    );


}


const SearchPage = () => {
    
    const [json_search_results, setJson] = useState([]);
    const [searchterm, setSearchTerm] = useState('');
    const [tags, setTags] = useState('');
    const [articles, setArticles] = useState([]);


    const SearchSubmit = async (event) => {
        event.preventDefault();
        const tags_arr = tags.split(",").filter((value) => {return value != "";});
        
        var array = []
        const terms = searchterm.split(" ").filter((value) => {return value != "";});
        if(tags_arr.length > 0 && terms.length > 0 ){
            const tagmatches = await searchByTag(tags_arr);
            array = await searchArticles(terms, tagmatches, true);
            setJson(array);
        }
        else if(terms.length > 0 ){
            array = await searchArticles(terms, articles, true);
            setJson(array);
        }
        else if(tags_arr.length > 0){
            array = await searchByTag(tags_arr, articles, true);
            setJson(array);
        }
        else{
            setJson(articles);
        }
        console.log(array);
    }

    useEffect(() => {
        fetchArticles().then((value) => {setArticles(value)}, (value) => {setArticles(value)});
    }, []);

    return(
        
        <div class="justify-center self-center align-center p-20">
            {articles.length > 0 ? (
                <>
                    {/* Current Filters */}
                    {/*<div className="flex flex-row gap-[20px] items-center">
                        <p className="text-2.5xl text-bold tracking-minimal">Current Filters:</p>
                        <div className="flex flex-row">
                            {
                                json_cur_search_tags.map((tag, index) => (
                                    <Tag key={index} tag={tag.tag} backgroundColor={tag.color}></Tag>
                                    )
                                )
                            }

                        </div>
                    </div>*/}
                    {/* search query */}

                    
                        
                    <form onSubmit={SearchSubmit} className="gap-[15px]">
                        <div className="flex flex-row gap-[20px] items-center pt-[20px]">
                            <p className="text-2.5xl text-bold tracking-minimal">Search Query:</p>
                            <input onChange={(e) => setSearchTerm(e.target.value)} required type="search" name="search" id="search"  className="text-2.5xl"/>
                        </div>
                        <div className="flex flex-row gap-[20px] items-center pt-[20px]">
                            <p className="text-2.5xl text-bold tracking-minimal">Search Tags (comma separated):</p>
                            <input onChange={(e) => setTags(e.target.value)} name="tags" id="tags"  className="text-2.5xl"/>
                        </div>
                        <div className="flex flex-row gap-[20px] items-center pt-[20px]">
                            <NeoButton classes={"bg-primary-dark "} type="submit" onSubmit={SearchSubmit}>
                                Search
                            </NeoButton>
                        </div>
                    </form>
                    
                    <br/>
                    <br/>
                    <br/>
                    <div className="resize-none flex flex-wrap gap-[20px] grid-flow-row auto-rows-max">
                        {
                            json_search_results.map((article,index) => (
                                <a key={article.id} href={`"blog/${article.id}`} className="w-[400px] h-[240px] bg-secondary-content border-3 rounded-md shadow-lg">
                                    {article_result(article)}
                                </a>
                            ))
                        }
                    </div>
                </>
            ): (
                <div className="h-screen w-screen flex items-center ">
                    <div class="loader">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPage

