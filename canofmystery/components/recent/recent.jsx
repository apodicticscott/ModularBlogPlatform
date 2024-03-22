'use client'
import React, { useEffect, useState, useRef } from "react";
import { GoClockFill } from "react-icons/go";
import { BiSolidBookOpen } from "react-icons/bi";
import { getRecent } from "../../firebase/articleUtils/articleUtils";
import useWindowSize from '../../hooks/useWindowSize';
import { motion } from "framer-motion"
import Image from "next/image";
import hand from "./22becce14efa74bc6c83bec78f9d9b1e-pixel-hand-cursor-icon.png"

const Recent = () => {
    const ref = useRef(null);
    const [articles, setArticles] = useState([]);

    const fixArticles = (value) =>{
        var articlesNewData = []
        value.forEach(
            (word,index) => {
                var found_image = false
                var image = ""
                var counter = 0;
                for(var key in word.Content){
                    var section = word.Content[key]
                    if(section.Type == "paragraph"){
                        var words = section.Content.split(" ")
                        for(var indexg in words){
                            counter++;
                        }
                    }
                }
                for(var key in word.Content){
                    var section = word.Content[key]
                    if(section.Type == "image" && !found_image){
                        image = section.Image
                        found_image = true
                        break;
                    }
                }
                //see average words per minute for why counter is divided by such number.
                articlesNewData.push({time: Math.ceil((counter/238)), author: word.Author, tags: word.Tags, title: word.Title, image: image});
            }
        );
        setArticles(articlesNewData);
    }

    
    useEffect(() => {
        getRecent(4).then((value) => {fixArticles(value)}, (value) => {fixArticles(value)});
    }, []);
    return(
        <>
            <div id="recent-container" className="flex flex-col w-full h-max gap-[15px] pt-[50px] pb-[100px] bg-[length:500px_450px] bg-t-header-dark dark:bg-base-100-dark bg-grid-image bg-secondary-content border-b-3 overflow-hidden">
                {/* <div className="w-full h-0 z-10">
                    <div className={`w-full h-[603px]`}>
                        <Image src={hand} alt="Hand PNG" className="max-w-[150px]" />
                    </div>
                </div> */}
                <div className="flex justify-between h-[70px]">
                    <div className="flex">
                        <div className="w-[0px] h-full">
                            <div className="w-[100px] h-[500px] top-[50px] relative lg:hidden bg-gradient-to-l from-transparent to-t-header-dark dark:to-base-100-dark">

                            </div>
                        </div>
                        <div className="flex justify-end items-center text-2xl md:text-2.7xl p-[15px] h-[50px] md:h-[70px] w-[500px] relative left-[-350px] md:left-[-250px] rounded-md bg-light-purple border-3 shadow-lg font-bold">
                            Recent. 
                        </div>
                    </div>
                </div>
                <div className={`w-full h-max flex 2xl:justify-center justify-start gap-[25px] 3xl:px-[100px]  xl:px-[50px] px-7 overflow-scroll no-scrollbar`}>
                    
                    {articles ? (
                        articles.map((article, index) => {

                            return(
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}  id={index} key={"recent-article-" + index} className={`flex flex-col w-[280px] h-[500px] py-[35px] ${((index % 2) === 0) ? "lg:justify-start" : "lg:justify-end"}`}>
                                <div>
                                    <svg width="45" height="35" viewBox="0 0 50 46" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative left-[-15px] top-[25px]">
                                        <g filter="url(#filter0_d_941_99)">
                                            <ellipse cx="26.5" cy="24" rx="19" ry="18" fill="#D32A00"/>
                                            <path d="M45 24C45 33.6399 36.7431 41.5 26.5 41.5C16.2569 41.5 8 33.6399 8 24C8 14.3601 16.2569 6.5 26.5 6.5C36.7431 6.5 45 14.3601 45 24Z" stroke="black"/>
                                        </g>
                                        <g filter="url(#filter1_d_941_99)">
                                            <circle cx="17" cy="16.5" r="16.5" fill="#D32A00"/>
                                            <circle cx="17" cy="16.5" r="16" stroke="black"/>
                                        </g>
                                        <defs>
                                            <filter id="filter0_d_941_99" x="7.5" y="6" width="42" height="40" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                <feOffset dx="4" dy="4"/>
                                                <feComposite in2="hardAlpha" operator="out"/>
                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.57 0"/>
                                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_941_99"/>
                                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_941_99" result="shape"/>
                                            </filter>
                                            <filter id="filter1_d_941_99" x="0.5" y="0" width="35" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                <feOffset dx="2" dy="2"/>
                                                <feComposite in2="hardAlpha" operator="out"/>
                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.75 0"/>
                                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_941_99"/>
                                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_941_99" result="shape"/>
                                            </filter>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="w-full h-[350px] flex flex-col justify-between bg-secondary-content border-3 rounded-md shadow-lg">
                                    <div className="w-full grow flex flex-col justify-between gap-[5px] pb-[15px]">
                                        <div className="w-full p-[10px] pb-0 h-max">
                                            <div className=" w-full h-[160px] bg-primary rounded-md overflow-hidden">
                                                <img src={article.image} alt="Article Image" className="w-full " />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-[15px] h-[50x] w-full  px-[10px] text-2xl">
                                            <div className="truncate h-[35px] w-full">
                                                {article.title}
                                            </div>
                                            
                                            <div className="flex text-xl gap-[5px] w-[120px]">
                                                <GoClockFill className="text-2.5xl"/>
                                                {article.time} mins
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between gap-[15px] h-[50x] w-full  px-[10px] text-xl">
                                            {article.Author}
                                        </div>
                                        <div className="flex items-center justify-between gap-[15px] h-[50x] w-full  px-[10px] text-2.5xl">
                                            <div className="flex max-w-[170px] h-[35px] gap-[5px] overflow-hidden">
                                                <div className="h-full w-0">
                                                    <div className="w-[50px] h-full left-[120px] relative bg-primary" style={{background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)"}}>

                                                    </div>
                                                </div>
                                                {
                                                    article.tags.map((tag, index) => {
                                                        return(
                                                            
                                                            <div key={"recent-article-card-tag-" + index} className={`rounded-md  px-[10px]  py-[2.5px] text-lg border-2 shadow-md max-h-[30px] min-w-max`} style={{backgroundColor: tag.color}}>
                                                                {tag.Text}
                                                            </div>
                                                            
                                                        )
                                                    })
                                                }

                                            </ div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-[5px] h-[50x] w-full border-solid border-t-2 p-[10px] text-xl">
                                        <BiSolidBookOpen className="text-2.5xl" />
                                        Read More
                                    </div>
                                </div>
                            </motion.div>
                            )
                        })
                        ) : (
                            <div className="h-screen w-screen flex items-center ">
                                <div class="loader">
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </>
    )
}

export default Recent;