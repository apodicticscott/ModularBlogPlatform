'use client'
import React, { useEffect, useState, useRef } from "react";
import Link from "../TextComponents/Link";
import { BiSolidBookOpen } from "react-icons/bi";
import { getRecent } from "../../firebase/articleUtils/articleUtils";
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import { FaChevronRight, FaChevronLeft, FaBookOpen  } from "react-icons/fa";
import { useRouter } from "next/navigation";



const ScrollMenu = ({ children }) => {
    const containerRef = useRef();
  
    const scroll = (scrollOffset) => {
      containerRef.current.scrollLeft += scrollOffset;
    };
  
    return (
      <div className="flex items-center w-full h-max">
        <div className="w-0  h-[500px] z-10">
            <button className="cursor-pointer left-arrow min-h-full text-t-header-light dark:text-t-header-dark" onClick={() => scroll(-295)}>
                <FaChevronLeft className="text-4xl"/>
            </button>
        </div>
        <div ref={containerRef} className="pl-[50px] overflow-auto flex gap-4 scroll-smooth no-scrollbar grow z-0" style={{ scrollBehavior: 'smooth', width: 'calc(100vw - 100px)' }}>
          {children}
        </div>
        <div className="w-0 h-[500px]"> 
            <button className="cursor-pointer right-arrow relative min-h-full left-[-40px] text-t-header-light dark:text-t-header-dark" onClick={() => scroll(295)}>
                <FaChevronRight className="text-4xl"/>
            </button>
        </div>
      </div>
    );
  };

  
const Recent = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView();
    const [articles, setArticles] = useState([]);

    const router = useRouter();

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
                articlesNewData.push({time: Math.ceil((counter/238)), author: word.Author, tags: word.Tags, title: word.Title, image: image, id: word.id});
            }
        );
        setArticles(articlesNewData);
    }

    
    useEffect(() => {
        // Define an async function inside the useEffect
        const fetchData = async () => {
          try {
            // Call your async function `getRecent` with the argument 5
            const result = await getRecent(5);
            // Set the state of `articles` with the result
            setArticles(result);
          } catch (error) {
            // Handle any errors, such as by logging or displaying an error message
            console.error('Error fetching data:', error);
          }
        };
    
        // Call the fetchData function
        fetchData();
      }, []); 

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return(
        <>
            <div id="recent-container" className=" flex flex-col w-full h-max lg:h-[738px] gap-[15px] py-[50px] lg:pb-[100px] bg-t-header-dark dark:grid-lines-dark grid-lines-light  border-b-3  overflow-hidden max-w-screen " >
                {/* <div className="w-full h-0 z-10">
                    <div className={`w-full h-[603px]`}>
                        <Image src={hand} alt="Hand PNG" className="max-w-[150px]" />
                    </div>
                </div> */}
                <div className="flex justify-between h-max">
                    <div className="flex h-max">
                        <div className="flex justify-end items-center text-2xl md:text-2.7xl p-[15px] h-[50px] md:h-[70px] w-[500px] relative left-[-350px] md:left-[-250px] rounded-md bg-light-purple border-3 shadow-lg font-bold">
                            Recent. 
                        </div>
                    </div>
                </div>
                <div   className={`w-full h-max 2xl:justify-center justify-start gap-[50px] 3xl:px-[100px]  xl:px-[50px] px-7 overflow-x-scroll overflow-y-hidden no-scrollbar hidden xl:flex`}>
                    
                    {articles ? (
                        articles.map((article, index) => {

                            return(
                                <motion.div 
                                ref={ref}
                                animate={controls} 
                                initial="hidden" 
                                variants={{
                                    visible: { opacity: 1, translateY: 0 },
                                    hidden: { opacity: 0, translateY: 100 }
                                }} 
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                                key={article.id} href={"blog/"+article.id}>
                                    <div id={index} key={"recent-article-" + index} className={`flex flex-col w-[280px] h-[500px] py-[35px] hover:scale-105 transition duration-100 cursor-pointer ${((index % 2) === 0) ? "lg:justify-start" : "lg:justify-end"}`} onClick={() => (router.push("/blog/"+article.id, undefined, { shallow: true}))}>
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
                                                    <filter id="filter0_d_941_99" x="7.5" y="6" width="42" height="40" filterUnits="userSpaceOnUse">
                                                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                        <feOffset dx="4" dy="4"/>
                                                        <feComposite in2="hardAlpha" operator="out"/>
                                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.57 0"/>
                                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_941_99"/>
                                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_941_99" result="shape"/>
                                                    </filter>
                                                    <filter id="filter1_d_941_99" x="0.5" y="0" width="35" height="35" filterUnits="userSpaceOnUse">
                                                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
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
                                        <div className="w-full h-[350px] flex flex-col justify-between bg-secondary-content border-3 rounded-md shadow-lg hover:shadow-lg-move dark:bg-t-header-light dark:text-t-header-dark transition duration-200">
                                            <div className="w-full grow flex flex-col justify-between gap-[5px] pb-[15px]">
                                                <div className="w-full p-[10px] pb-0 h-max">
                                                    <div className="w-full h-[160px] items-center rounded-md overflow-hidden">
                                                        <img src={article.CoverImage} alt="Article Image" className=" h-full w-full rounded-md object-fill border-2" />
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between gap-[15px] h-[50x] w-full  px-[10px] text-2xl">
                                                    <div className="truncate h-[35px] w-full">
                                                        {article.Title}
                                                    </div>
                                                    
                                                    {/* <div className="flex text-xl gap-[5px] w-[120px]">
                                                        <GoClockFill className="text-2.5xl"/>
                                                        {article.time} mins
                                                    </div> */}
                                                </div>
                                                <div className="flex items-center justify-between gap-[15px] h-[50x] w-full text-t-light font-light dark:text-base-100 dark:font-extralight px-[10px] text-xl">
                                                    {article.Author}
                                                </div>
                                                <div className="flex items-center justify-between  h-[50x] w-full  px-[10px] text-2.5xl">
                                                    <div className="flex w-full h-[35px] overflow-hidden">
                                                        <div className="relative h-full w-0 left-[100%]">
                                                            <div className="relative w-[50px] left-[-50px] h-full relative linear-gradient-overlay-light dark:linear-gradient-overlay-dark">

                                                            </div>
                                                        </div>
                                                        {
                                                            article.Tags
                                                            &&
                                                            article.Tags.map((tag, index) => {
                                                                return(
                                                                    
                                                                    <div key={"recent-article-card-tag-" + index} className={`rounded-[7px]  px-[10px] mr-[5px]  py-[2.5px] text-lg border-2 shadow-md max-h-[30px] min-w-max dark:text-t-header-light`} style={{backgroundColor: tag.Color}}>
                                                                        {tag.Text}
                                                                    </div>
                                                                    
                                                                )
                                                            })
                                                        }

                                                    </ div>
                                                </div>
                                            </div>

                                            <div className="flex text-t-light font-light dark:text-t-header-light dark:bg-light-purple rounded-b-md items-center gap-[10px] h-[50x] w-full border-solid border-t-2 p-[10px] text-xl">
                                                <FaBookOpen  className="text-2.5xl" />
                                                Read More
                                            </div>
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
                <div className={`xl:hidden`}>
                    <ScrollMenu >
                        
                        {articles ? (
                            articles.map((article, index) => {

                                return(
                                    <div key={article.id} href={"blog/"+article.id} className="mr-[15px] ">
                                        <div id={index} key={"recent-article-" + index} className={`flex flex-col w-[280px] h-[500px] py-[35px] hover:scale-105 transition duration-100 cursor-pointer ${((index % 2) === 0) ? "lg:justify-start" : "lg:justify-end"}`} onClick={() => (router.push("/blog/"+article.id, undefined, { shallow: true}))}>
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
                                                        <filter id="filter0_d_941_99" x="7.5" y="6" width="42" height="40" filterUnits="userSpaceOnUse">
                                                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                            <feOffset dx="4" dy="4"/>
                                                            <feComposite in2="hardAlpha" operator="out"/>
                                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.57 0"/>
                                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_941_99"/>
                                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_941_99" result="shape"/>
                                                        </filter>
                                                        <filter id="filter1_d_941_99" x="0.5" y="0" width="35" height="35" filterUnits="userSpaceOnUse">
                                                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
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
                                            <div className="w-full h-[350px] flex flex-col justify-between bg-secondary-content border-3 rounded-md shadow-lg hover:shadow-lg-move dark:bg-t-header-light dark:text-t-header-dark transition duration-200">
                                                <div className="w-full grow flex flex-col justify-between gap-[5px] pb-[15px]">
                                                    <div className="w-full p-[10px] pb-0 h-max">
                                                        <div className="w-full h-[160px] items-center rounded-md overflow-hidden">
                                                            <img src={article.CoverImage} alt="Article Image" className=" h-full w-full rounded-md object-fill border-2" />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between gap-[15px] h-[50x] w-full  px-[10px] text-2xl">
                                                        <div className="truncate h-[35px] w-full">
                                                            {article.Title}
                                                        </div>
                                                        
                                                        {/* <div className="flex text-xl gap-[5px] w-[120px]">
                                                            <GoClockFill className="text-2.5xl"/>
                                                            {article.time} mins
                                                        </div> */}
                                                    </div>
                                                    <div className="flex items-center justify-between gap-[15px] h-[50x] w-full text-t-light font-light dark:text-base-100 dark:font-extralight px-[10px] text-xl">
                                                        {article.Author}
                                                    </div>
                                                    <div className="flex items-center justify-between  h-[50x] w-full  px-[10px] text-2.5xl">
                                                        <div className="flex w-full h-[35px] overflow-hidden">
                                                            <div className="relative h-full w-0 left-[100%]">
                                                                <div className="relative w-[50px] left-[-50px] h-full relative linear-gradient-overlay-light dark:linear-gradient-overlay-dark">

                                                                </div>
                                                            </div>
                                                            {
                                                                article.Tags
                                                                &&
                                                                article.Tags.map((tag, index) => {
                                                                    return(
                                                                        
                                                                        <div key={"recent-article-card-tag-" + index} className={`rounded-[7px]  px-[10px] mr-[5px]  py-[2.5px] text-lg border-2 shadow-md max-h-[30px] min-w-max dark:text-t-header-light`} style={{backgroundColor: tag.Color}}>
                                                                            {tag.Text}
                                                                        </div>
                                                                        
                                                                    )
                                                                })
                                                            }

                                                        </ div>
                                                    </div>
                                                </div>

                                                <div className="flex text-t-light font-light dark:text-t-header-light dark:bg-light-purple rounded-b-md items-center gap-[10px] h-[50x] w-full border-solid border-t-2 p-[10px] text-xl">
                                                    <FaBookOpen  className="text-2.5xl" />
                                                    Read More
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            ) : (
                                <div className="h-screen w-screen flex items-center ">
                                </div>
                            )}
                    </ScrollMenu>
                </div>
            </div>
        </>
    )
}

export default Recent;