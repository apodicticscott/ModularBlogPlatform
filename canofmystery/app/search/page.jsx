'use client'
import styles from "./../homepage.module.css";
import React, { useState } from "react";
import Tag from "../../components/textComponents/neoTag";
import { searchArticles, searchByTag, articles } from "../../firebase/articleUtils/articleUtils";
import { NeoButton } from "../../components/textComponents"
import Image from "../../components/textComponents/Image"


var json_cur_search_tags = [
    {tag:"Boggy Creek Monster", link:"../path/to/link/here", color:"#9C94FF"},
    {tag:"Cryptid", link:"../path/to/link/here", color:"#29FF80"},
    {tag:"Local Legends", link:"../path/to/link/here", color:"#FCC800"}
];



const article_result = (article) => {

    return(
        <div>
            <Image src={".."+article.first_image} className="w-full h-[139px] px-[20px] py-[15px] flex-end"> {article.Title}</Image>

            
            <p>{article.Title}</p>
            <p>@{article.author}</p>


        </div>

    );


}


const SearchPage = () => {
    
    const [json_search_results, setJson] = useState([]);
    const [searchterm, setSearchTerm] = useState('');
    const [tags, setTags] = useState('');


    const SearchSubmit = async (event) => {
        event.preventDefault();
        const tags_arr = tags.split(",").filter((value) => {return value != "";});
        
        var array = []
        const terms = searchterm.split(" ").filter((value) => {return value != "";});
        if(tags_arr.length > 0 && terms.length > 0 ){
            const tagmatches = await searchByTag(tags_arr);
            array = await searchArticles(terms, tagmatches, true)
            setJson(array);
        }
        else if(terms.length > 0 ){
            array = await searchArticles(terms)
            setJson(array);
        }
        else if(tags_arr.length > 0){
            array = await searchByTag(tags_arr)
            setJson(array);
        }
        else{
            return;
        }
        console.log(array);
    }
    return(
        
        <div class="justify-center self-center align-center p-20">
            {articles ? (
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
                                <div key={article.id} className="w-[409px] h-[254px]">
                                    {article_result(article)}
                                </div>
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

