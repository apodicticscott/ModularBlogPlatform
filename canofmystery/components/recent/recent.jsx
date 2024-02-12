'use client'
import React, { useEffect, useState } from "react";
import { GoClockFill } from "react-icons/go";
import { BiSolidBookOpen } from "react-icons/bi";
import useWindowSize from '../../hooks/useWindowSize';

const Recent = () => {

    const size = useWindowSize();
    const tempArticleArray = [{title: "Men In Black", author: "CBow", time: 5, tags: [{tag: "Men In Black", color: "#c4bfff"}, {tag: "Conspiracy", color: "#7fffb3"}], image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgFHdMKDKWK6pG0KHyLPRDPLVUt1vX_cE7AOEARBbCt8Pji64Vvk-5lFJ0zIh8P9m3RLHB6jIOPG-rSLr-BzglIQAkXuF0Z0CW1DgiLOGxZ3sko2H4ZPoFs-QDcn5JVKeH8E1Gp3vQPtsN0g4nAA_8K6DIuOKhFyAA_NRsfRnYHGYyQ8j96DthUyNOG/w400-h301/MIB.JPG"}, {title: "The Drop Bear- Why it it Scares Tourists", author: "Rachael Gilmore", time: 5, tags: [{tag: "Bear", color: "#fdde66"}], image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4Z-0jKa7b2ihNvWAzyaL6Cf_rHaL_8PKC7lFhy-SAaKeZidOVJpAGuzuNMbIBQ6Z6FGwDku6of6Z6430zuhluiw4wLJaxjyEqVim8h-DnwadccNAIDbKuBZbMyetPtCrb6L5uM2vH3vi3Fouq9MhG6ij82fbUjN0AskCplSpuoCcJfdQFaH8vZq8l/w482-h271/201209133725-20201209-australia-drop-bear.jpg"}, {title: "Doppelgangers: Is There a Replica Of You?", author: "Marv Carter", time: 5, tags: [{tag: "Doppelgangers", color: "#fd6666"},{tag: "Evil Twin", color: "#29ff80"}], image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhhApngJVPTcr3I3IaQyk7ef6tnU1Q-KYBqrXBZufATcCK0MSxDiP4_dskm_SMi2dr4W3UinkHgLZU3wVzPk_DBpO1NL4pYo-tiEwG1aTXx5T3bEWuBbYdLRJbvzBIVGBDXA7r2ICb7jlAT30ooMQpWZu_JcR58UwWaM7NJZVU2Mi5CjpvUPE-PBw6k/s320/20220825-04-dna-study-michael-malone-charles-hall-chasen-1.jpg"}, {title: "The Most Haunted Forest", author: "L.K. Leaphart", time: 5, tags: [{tag: "Haunted Forest", color: "#f1fd66"}, {tag: "Hoia-Baciu", color: "#fd66f7"}], image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiHeSX4cYAsAoNhMTzFn4et9rbMDMgITc7Ow8ofCbkk4TpF-fTlbgR4WbcXdYjapaF-FkNfrgTqP2cJMfXov4QeDuQ8Q79QyoVKTLkmsLS_12_KJQETWbDR5DyVUTnCq5L6ehanDqv8Jt1EH8ww-ZeMgAMG_qpXtQ4wL2DTKZBRD2xqg9XmICl9e3N1/s320/018937842b5056423c6db83296b3c018937-800x800.jpg"}, {title: "The Spooky Scary Stanley ", author: "GrimDank", time: 5, tags: [{tag: "Estes Park", color: "#66a2fd"}, {tag: "D.O. Stanley", color: "#fd66af"}], image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgcduoQLra30U4mqb0H2xt5uIivFeAE9ZfOeTqZNW6jlOU8GZnbLUyKmDQjbFN_P1Capff-jig78YX06-S9l7g_393nn8guleu4k3cJdF49Bs0_TWrn00pcAqrJKohFB5cfCMuAEIrTsZ82jrHWBvfieAFkYKXbF5Nb0FrDIXUrjBB1YVrkpFPhX1vx/w566-h274/lossy-page1-640px-The_Stanley_Hotel_in_Estes_Park,_a_town_on_the_eastern_edge_of_Rocky_Mountain_National_Park_in_north-central_Colorado_LCCN2015633407.tif.jpg"}]

    const checkImageOrientation = (img) => {
        if (img.height > img.width) {
            return 'portrait'; // Portrait orientation
        } else if (img.width > img.height) {
            return 'landscape'; // Landscape orientation
        } else {
            return 'square'; // The image is square
        }
    }

    return(
        <>
            <div className="flex flex-col w-full h-max gap-[15px] pt-[50px] pb-[100px] bg-[length:500px_450px] bg-t-header-dark dark:bg-base-100-dark bg-grid-image bg-secondary-content border-b-3 overflow-hidden">
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
                <div className={`w-full h-max flex 2xl:justify-center justify-start gap-[25px] 3xl:px-[100px]  xl:px-[50px] xs:px-[calc((100vw_-_280px)_/_2)] sm:px-[25px] overflow-scroll no-scrollbar`}>
                    {
                        tempArticleArray.map((article, index) => {

                            return(
                            <div id={index} className={`flex flex-col w-[280px] h-[500px] py-[35px] ${((index % 2) === 0) ? "lg:justify-start" : "lg:justify-end"}`}>
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
                                            {article.author}
                                        </div>
                                        <div className="flex items-center justify-between gap-[15px] h-[50x] w-full  px-[10px] text-2.5xl">
                                            <div className="flex max-w-[170px] h-[35px] gap-[5px] overflow-hidden">
                                                <div className="h-full w-0">
                                                    <div className="w-[50px] h-full left-[120px] relative bg-primary" style={{background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)"}}>

                                                    </div>
                                                </div>
                                                {
                                                    article.tags.map((tag) => {
                                                        return(
                                                            
                                                            <div className={`rounded-md  px-[10px]  py-[2.5px] text-lg border-2 shadow-md max-h-[30px] min-w-max`} style={{backgroundColor: tag.color}}>
                                                                {tag.tag}
                                                            </div>
                                                            
                                                        )
                                                    })
                                                }

                                            </ div>
                                            {/* <div className="flex w-max gap-[5px]">
                                                <div className="rounded-md bg-light-purple px-[10px]  py-[2.5px] text-lg border-2 shadow-md max-h-[30px] min-w-max">
                                                    Men In Black
                                                </div>
                                                <div className="rounded-md bg-light-green px-[10px]  py-[2.5px] text-lg border-2 shadow-md">
                                                    Conspiracy
                                                </div>
                                            </div> */}
                                            <div className="flex text-xl gap-[5px]">
                                                + 3 more
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-[5px] h-[50x] w-full border-solid border-t-2 p-[10px] text-xl">
                                        <BiSolidBookOpen className="text-2.5xl" />
                                        Read More
                                    </div>
                                </div>
                            </div>
                            )
                        })

                    }
                </div>
            </div>
        </>
    )
}

export default Recent;