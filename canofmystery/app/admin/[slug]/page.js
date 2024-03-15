'use client'
import React, {useState, useEffect, useRef} from "react"
import { searchArticles, fetchArticles, getTotalUnapprovedArticles} from "../../../firebase/articleUtils/articleUtils"
import { makeStyles } from '@material-ui/core/styles';
import Header from "../../../components/TextComponents/Header1"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { MdArticle, MdAccountCircle,  MdAnalytics, MdHome  } from "react-icons/md";
import { Badge,  ThemeProvider, createTheme } from "@mui/material"

import useWindowSize from '../../../hooks/useWindowSize'; // Assuming you have a hook for window size

import { AnalyticPanel, HomePanel, ArticlePanel} from "../../../components/admin/adminPanels"

const theme = createTheme({
    palette: {
      primary: {
        main: '#29ff80', // Black
      },
      secondary: {
        main: '#000000', // Red
      },
    },
});
  

import Loader from "../../../components/loader/loader"

const useStyles = makeStyles((theme) => ({
    customTooltip: {
      // Customize letter-spacing
      letterSpacing: '0.1em', // Adjust as needed
    },
  }));

export default function Page({params}){
    let slug = params.slug;

    if(slug !== "home" && slug !== "analytics" && slug !== "users" && slug !== "articles"){
        slug = "home"
    }


    //Admin Layout
    const [isSideBarOpen, setIsSideBarOpen] = useState(true)
    const [currentPanel, setCurrentPanel] = useState(slug);

    //All Penels
    const [articles, setArticles] = useState([]);

    //Mui Styles for all panels
    const classes = useStyles();

    //Analytics Panel
    const [chartData, setChartData] = useState([])
    const [locationData, setLocationData] = useState([])
    const [locNumber, setLocNumber] = useState(undefined);

    //Home Panel
    const [sessions, setSessions] = useState(undefined)

    //Articles Panel
    const [numUnapproved, setNumUnapproved] = useState();
    const [search, setSearch] = useState("");
    
    const [loading, setLoading] = useState(true);

    // const checkAdminPermissions = async (userId) => {
    //     try {
    //       const userDoc = await firebase.firestore().collection('users').doc(userId).get(); // Assuming Firestore
    //       if (userDoc.exists) {
    //         const userData = userDoc.data();
    //         if (userData.adminPerm === true) {
    //           return true; // User has admin permissions
    //         }
    //       }
    //       return false; // User doesn't have admin permissions or doesn't exist
    //     } catch (error) {
    //       console.error("Error fetching user data:", error);
    //       return false; // Error occurred while fetching user data
    //     }
    // }

    // const [isAdmin, setIsAdmin] = useState(false)

    // useEffect(() => {
    //     setIsAdmin(checkAdminPermissions(userId))
    // }, [])

    // if(isAdmin){
    //     return(
    //         <>
    //             Loading...
    //         </>
    //     )
    // }

    

    const handleFetchArticles = async () => {
        setArticles(await fetchArticles());
        setNumUnapproved(await getTotalUnapprovedArticles());
        setLoading(false)
    };

    const handleSearchArticles = async (search) => {
        setArticles(await searchArticles(search))
    }

    useEffect(() => {
        if (search.trim() === "") {
            handleFetchArticles();
            console.log(articles)
        } else {
            handleSearchArticles(search);
        }
    }, [search]);

   
    const windowSize = useWindowSize();
    const [isFloating, setIsFloating] = useState(true);
    const floatingRef = useRef(null);
    const sidebarRef = useRef(null);
    const [currentTop, setCurrentTop] = useState();
    
    useEffect(() => {
        const handleScroll = () => {
            if (!sidebarRef.current) return;
    
            const sidebarRect = sidebarRef.current.getBoundingClientRect();
            const viewportBottom = window.innerHeight;
    
            if(sidebarRect.bottom <= viewportBottom) {
                if (!isFloating) {
                    setIsFloating(true);
                    setCurrentTop(sidebarRect.bottom - sidebarRect.height);
                }
            } else {
                if (isFloating) {
                    setIsFloating(false);
                    setCurrentTop(25);
                }
            }
        };
    
        handleScroll(); // Call it once on component mount
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [isFloating]);

    return(
        <ThemeProvider theme={theme}>
            <div className="h-max min-h-[calc(100vh_-_67px)] w-full   flex flex-col md:flex-row  pt-[67px]">
                <div className={`flex transition-all duration-200 ${isSideBarOpen ? 'md:w-[79px] lg:w-[252px]' : 'w-0'} md:border-r-3 ${isSideBarOpen ? '' : 'md:w-0'}`} ref={sidebarRef}>
                    <div className={`flex flex items-end h-max md:h-full justify-center w-full p-3 border-b-2 md:border-b-0 md:p-0 overflow-hidden ${isSideBarOpen ? 'md:w-max' : 'md:w-0'} transition-all duration-200`}>
                        <div className={`h-full dark:bg-base-dark  lg:w-[250px]  flex md:flex-col  gap-[25px] items-start 2xl:items-center 3xl:items-start md:overflow-hidden ${isSideBarOpen ? "w-max 2xl:min-w-max md:px-[25px] lg:pl-[50px]  2xl:pl-[25px] md:py-[152px]" : "w-0 overflow-hidden" } transition-all duration-200`}>
                                <button className="flex items-center gap-[15px] w-full" onClick={() => setCurrentPanel("home")}>
                                    <Badge badgeContent={0} sx={{ '& .MuiBadge-badge': { border: '1px solid black' } }} color="primary">
                                        <MdHome className="text-2.7xl" /> 
                                    </Badge>
                                    <span className="hidden lg:inline">
                                        Home
                                    </span>
                                </button>
                                <button className="flex items-center gap-[15px] w-full" onClick={() => setCurrentPanel("analytics")}>
                                    <Badge badgeContent={0} sx={{ '& .MuiBadge-badge': { border: '1px solid black' } }} color="primary">
                                        <MdAnalytics  className="text-2.7xl" /> 
                                    </Badge>
                                    <span className="hidden lg:inline">
                                        Analytics
                                    </span>
                                </button>
                                <button className="flex items-center gap-[15px] w-full" onClick={() => setCurrentPanel("users")}>
                                    <Badge badgeContent={0} sx={{ '& .MuiBadge-badge': { border: '1px solid black' } }} color="primary">
                                        <MdAccountCircle className="text-2.7xl" /> 
                                    </Badge>
                                    <span className="hidden lg:inline">
                                        Users
                                    </span>
                                </button>
                            
                            <button className="flex items-center gap-[15px] w-full" onClick={() => setCurrentPanel("articles")}>
                                <Badge badgeContent={numUnapproved} sx={{ '& .MuiBadge-badge': { border: '1px solid black' } }} color="primary">
                                    <MdArticle className="text-2.7xl"/> 
                                </Badge>
                                <span className="hidden lg:inline">
                                    Articles
                                </span>
                            </button>
                        </div>
                        <div className={`w-0 h-[45px] py-[2px] z-10 hidden md:flex ${isFloating ? 'absolute' : 'fixed'} ${!isFloating && `bottom-[${currentTop}px]`} ${isSideBarOpen ? 'md:left-[77px] lg:left-[250px]' : 'left-0'} transition-bottom duration-200`} ref={floatingRef}>
                            <div className={` relative rounded-r w-[40px] justify-center ${isSideBarOpen && "rounded-l rounded-r"}  h-full flex items-center  bg-base-300`} onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                                {
                                    (isSideBarOpen)
                                    ?
                                    <IoIosArrowBack className="text-t-header-dark text-2xl " />
                                    :
                                    <IoIosArrowForward className="text-t-header-dark text-2xl"/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grow min-h-full  flex flex-col">
                    <div className="w-full h-max border-b-3 hidden md:flex items-center p-7">
                        <Header type="lg" classes="w-full">
                            {
                            (currentPanel === "articles")
                            ?
                            <>
                                Article Console.
                            </>
                            :
                            <>
                                {
                                    (currentPanel === "analytics")
                                    ?
                                    <>
                                        Analytics.
                                    </>
                                    :
                                    <>
                                        {
                                            (currentPanel === "home")
                                            &&
                                            <>
                                                Home.
                                            </>
                                        }
                                    </>
                                }
                            </>
                            }
                        </Header>
                    </div>
                    <div className="h-full w-full flex flex-col items-center gap-[15px]">
                        {
                            (currentPanel === "articles")
                            &&
                            <ArticlePanel classes={classes} numUnapproved={numUnapproved} setNumUnapproved={setNumUnapproved} articles={articles} setArticles={setArticles}/>
                        }
                        {
                            (currentPanel === "analytics")
                            &&
                            <AnalyticPanel chartData={chartData} setChartData={setChartData} locationData={locationData} setLocationData={setLocationData} setLocNumber={setLocNumber} locNumber={locNumber}/>
                        }
                        {
                            (currentPanel === "home")
                            &&
                            <HomePanel articles={articles} setArticles={setArticles} classes={classes} setNumUnapproved={setNumUnapproved} setSessions={setSessions} sessions={sessions}/>
                        }
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}
