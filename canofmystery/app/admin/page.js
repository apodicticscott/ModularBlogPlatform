'use client'
import React, { useState, useEffect, useRef } from "react";
// Removed the static import of ApiSignIn
import { 
    searchArticles, 
    fetchArticles, 
    fetchPages, 
} from "../../firebase/articleUtils/articleUtils";

import { 
    fetchUsers 
} from "../../firebase/userUtils/userUtils";

import { makeStyles } from '@material-ui/core/styles';
import Header from "../../components/TextComponents/Header1";

import { 
    IoIosArrowBack, 
    IoIosArrowForward 
} from "react-icons/io";

import { 
    MdArticle,
    MdAccountCircle, 
    MdAnalytics, 
    MdHome, 
    MdMiscellaneousServices
} from "react-icons/md";

import { 
    Badge, 
    ThemeProvider, 
    createTheme 
} from "@mui/material";

import {
    fetchCanItems,
    deleteCanItem,
    addCanItem,
} from "../../firebase/canItemUtils/canItemUtils"

import { useRouter } from "next/navigation";
import { RiPagesFill } from "react-icons/ri";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import firebase_app from "../../firebase/config";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../../app/firebase";
// Use window size hook assuming it's already handling window undefined check
import useWindowSize from '../../hooks/useWindowSize';
import Home from "../page";

const auth = getAuth(firebase_app);
const firestore = getFirestore(app);

const theme = createTheme({
    palette: {
        primary: {
            main: '#29ff80',
        },
        secondary: {
            main: '#000000',
        },
    },
});

const useStyles = makeStyles((theme) => ({
    customTooltip: {
        letterSpacing: '0.1em',
    },
    customDividerDark: {
        backgroundColor: '#302c38',
    },
    customDividerLight:{
        backgroundColor: '#cecece',
    }
}));

export default function Page({ params }) {
    const [signedIn, setSignedIn] = useState(true);

    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         // Dynamically import ApiSignIn only on the client side
    //         import("../../firebase/analitics/analyticsUtils")
    //             .then(({ ApiSignIn }) => {
    //                 if (!signedIn) {
    //                     const response = ApiSignIn();

    //                     if (response.error) {
    //                         setSignedIn(false);
    //                     } else {
    //                         setSignedIn(true);
    //                     }
    //                 }
    //             })
    //             .catch(error => console.error("Failed to load ApiSignIn", error));
    //     }
    // }, [signedIn]);

    // States to hold your dynamically imported components
    const [components, setComponents] = useState({
        AnalyticPanel: null,
        HomePanel: null,
        ArticlePanel: null,
        PagePanel: null,
        UserPanel: null,
        MiscPanel: null,
    });

    useEffect(() => {
        // This checks if 'self' is defined, indicating a browser-like environment
        if (typeof self !== 'undefined') {
            import("../../components/admin/adminPanels").then(modules => {
                setComponents({
                    AnalyticPanel: modules.AnalyticPanel,
                    HomePanel: modules.HomePanel,
                    ArticlePanel: modules.ArticlePanel,
                    PagePanel: modules.PagePanel,
                    UserPanel: modules.UserPanel,
                    MiscPanel: modules.MiscPanel,
                });
            });
        }
    }, []);

    // Destructure the loaded components for easier usage
    const { AnalyticPanel, HomePanel, ArticlePanel, PagePanel, UserPanel, MiscPanel } = components;

    let slug = params.slug;

    if(slug !== "home" && slug !== "analytics" && slug !== "users" && slug !== "articles" && slug !== "pages"){
        slug = "home"
    }

    
    //Admin Layout
    const [isSideBarOpen, setIsSideBarOpen] = useState(true)
    const [currentPanel, setCurrentPanel] = useState(slug);
    const router = useRouter();

    //All Penels
    const [articles, setArticles] = useState([]);
    const [pages, setPages] = useState([]);
    const [users, setUsers] = useState([])
    const [canItems, setCanItems] = useState([])

    //Mui Styles for all panels
    const classes = useStyles();

    //Analytics Panel
    const [chartData, setChartData] = useState([])
    const [locationData, setLocationData] = useState([])
    const [locNumber, setLocNumber] = useState(undefined);
    const [pageVisitData, setPageVisitData] = useState(undefined)

    //Home Panel
    const [sessions, setSessions] = useState(undefined)

    //Articles Panel
    const [numUnapproved, setNumUnapproved] = useState();
    const [search, setSearch] = useState("");

    //Pages Panel
    const [numPagesUnapproved, setNumPagesUnapproved] = useState();
    
    const [loading, setLoading] = useState(true);

    // this code works just throws an error with Rendered more hooks than during the previous render. 
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log(user)
            if (user) {
                const docRef = doc(firestore, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                setIsAdmin(userData.adminPerm === true);
                    setIsAdmin(true)
                    setIsLoading(false);
                }else{
                    setIsAdmin(false)
                    setIsLoading(false);
                    router.push('/login'); 
                }
            } else {
                setIsLoading(true);
                router.push('/login'); 
            }
        });

        return () => unsubscribe();
    }, []);

    const handlePanelChange = (panelName) => {
        setCurrentPanel(panelName)
    }
    

    const handleFetchArticles = async () => {
        const tempArticles = await fetchArticles();

        setArticles(tempArticles);
        setNumUnapproved(tempArticles.filter(article => !article.Approved).length);
        setLoading(false)
    };

    const handleFetchCanItems = async () => {
        try{
            const tempCanItems = await fetchCanItems();
            console.log(tempCanItems)
            setCanItems(tempCanItems)
        }catch(error){
            console.error("Error fetching data:", error)
        }
    }

    const handleDeleteCanItem = async (id) => {
        try{
            await deleteCanItem(id);

            handleFetchCanItems();
        }catch(error){
            console.error("Error deleting data:", error)
        }
    }

    const handleAddCanItem = async (canItem) => {
        try{
            await addCanItem(canItem);

            handleFetchCanItems();
        }catch(error){
            console.error("Error deleting data:", error)
        }
    }

    const handleFetchPages = async () => {
        const tempPages = await fetchPages()

        setPages(tempPages)
        setNumPagesUnapproved(tempPages.filter(page => !page.Approved).length)
        setLoading(false)
    }

    const handleFetchUsers = async () => {
        setUsers(await fetchUsers())
        setLoading (false)
    }

    const handleSearchArticles = async (search) => {
        setArticles(await searchArticles(search))
    }

    useEffect(() => {
        if (search.trim() === "") {
            handleFetchArticles();
            handleFetchPages();
            handleFetchUsers();
        } else {
            handleSearchArticles(search);
        }
    }, [search]);

    useEffect(() => {
        if(canItems.length <= 0){
            handleFetchCanItems();
        }
    }, [])

   
    const windowSize = useWindowSize();
    const [isFloating, setIsFloating] = useState(true);
    const floatingRef = useRef(null);
    const sidebarRef = useRef(null);
    const [currentTop, setCurrentTop] = useState();
    
    useEffect(() => {
        if(typeof window !== undefined){
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
        }
    }, [isFloating]);

    return(
        <ThemeProvider theme={theme}>
            <div className="h-max min-h-[calc(100vh_-_67px)] w-full  flex flex-col md:flex-row pt-[67px] dark:bg-base-100-dark text-t-header-light dark:text-t-header-dark min-h-screen">
                <div className={`flex transition-all duration-200 ${isSideBarOpen ? 'md:w-[79px] lg:w-[252px]' : 'w-0'} md:border-r-3 dark:border-r-2 dark:border-r-[#302c38] ${isSideBarOpen ? '' : 'md:w-0'}`} ref={sidebarRef}>
                    <div className={`flex flex items-end h-max md:h-full justify-center w-full p-3 border-b-3 dark:border-b-2 dark:border-b-[#302c38] dark:md:border-b-0 md:border-b-0 md:p-0 overflow-hidden ${isSideBarOpen ? 'md:w-max' : 'md:w-0'} transition-all duration-200`}>
                        <div className={`h-full dark:bg-base-dark  lg:w-[250px]  flex md:flex-col  gap-[25px] items-start 2xl:items-center 3xl:items-start md:overflow-hidden dark:font-extralight ${isSideBarOpen ? "w-max 2xl:min-w-max md:px-[25px] lg:pl-[50px]  2xl:pl-[25px] md:py-[152px]" : "w-0 overflow-hidden" } transition-all duration-200`}>
                                <button className="flex items-center gap-[15px] w-full " onClick={() => handlePanelChange("home")}>
                                    <Badge badgeContent={0} sx={{ '& .MuiBadge-badge': { border: '1px solid black' } }} color="primary">
                                        <MdHome className="text-2.7xl" /> 
                                    </Badge>
                                    <span className="hidden lg:inline">
                                        Home
                                    </span>
                                </button>
                                <button className="flex items-center gap-[15px] w-full pointer-events-none " onClick={() => handlePanelChange("analytics")}>
                                    <Badge badgeContent={0} sx={{ '& .MuiBadge-badge': { border: '1px solid black' } }} color="primary">
                                        <MdAnalytics  className="text-2.7xl opacity-70" /> 
                                    </Badge>
                                    <span className="hidden lg:inline opacity-70">
                                        Analytics
                                    </span>
                                </button>
                                <button className="flex items-center gap-[15px] w-full" onClick={() => handlePanelChange("users")}>
                                    <Badge badgeContent={0} sx={{ '& .MuiBadge-badge': { border: '1px solid black' } }} color="primary">
                                        <MdAccountCircle className="text-2.7xl" /> 
                                    </Badge>
                                    <span className="hidden lg:inline">
                                        Users
                                    </span>
                                </button>
                            
                            <button className="flex items-center gap-[15px] w-full" onClick={() => handlePanelChange("pages")}>
                                <Badge badgeContent={numPagesUnapproved} sx={{ '& .MuiBadge-badge': { border: '1px solid black' } }} color="primary">
                                    <MdArticle className="text-2.7xl"/> 
                                </Badge>
                                <span className="hidden lg:inline">
                                    Pages
                                </span>
                            </button>
                            <button className="flex items-center gap-[15px] w-full" onClick={() => handlePanelChange("articles")}>
                                <Badge badgeContent={numUnapproved} sx={{ '& .MuiBadge-badge': { border: '1px solid black' } }} color="primary">
                                    <RiPagesFill className="text-2.7xl"/> 
                                </Badge>
                                <span className="hidden lg:inline">
                                    Articles
                                </span>
                            </button>
                            <button className="flex items-center gap-[15px] w-full" onClick={() => handlePanelChange("misc")}>
                                <Badge badgeContent={0} sx={{ '& .MuiBadge-badge': { border: '1px solid black' } }} color="primary">
                                    <MdMiscellaneousServices className="text-2.7xl"/> 
                                </Badge>
                                <span className="hidden lg:inline">
                                    Misc
                                </span>
                            </button>
                        </div>
                        <div className={`w-0 h-[45px] py-[2px] z-10 hidden md:flex ${isFloating ? 'absolute' : 'fixed'} ${!isFloating && `bottom-[${currentTop}px]`} ${isSideBarOpen ? 'md:left-[77px] lg:left-[250px]' : 'left-0'} transition-bottom duration-200`} ref={floatingRef}>
                            <div className={` relative rounded-r w-[40px] justify-center ${isSideBarOpen && "rounded-l rounded-r"}  h-full flex items-center  bg-base-300 dark:bg-[#302c38]`} onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
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
                <div className={`${isSideBarOpen ? 'md:w-[calc(100%_-_79px)] lg:w-[calc(100%_-_252px)]' : 'w-0'} grow min-h-full  flex flex-col`}>
                    <div className="w-full h-max border-b-3 dark:border-b-2 dark:border-b-[#302c38] hidden md:flex items-center p-7">
                        <Header type="lg" classes="w-full">
                            {
                            (currentPanel === "articles")
                            ?
                            <>
                                Articles.
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
                                            ?
                                            <>
                                                Home.
                                            </>
                                            :
                                            <>
                                                {
                                                    (currentPanel === "pages")
                                                    ?
                                                    <>
                                                        Pages.
                                                    </>
                                                    :
                                                    <>
                                                    {
                                                        (currentPanel === "users")
                                                        ?
                                                        <>
                                                            Users.
                                                        </>
                                                        :
                                                        <>
                                                            Misc.
                                                        </>
                                                    }
                                                    </>
                                                }
                                            </>
                                        }
                                    </>
                                }
                            </>
                            }
                        </Header>
                    </div>
                    <div className="h-full w-full flex flex-col items-center gap-[15px] dark:bg-base-100-dark">
                        {
                            typeof self !== undefined
                            &&
                            <>
                                {
                                    (currentPanel === "articles")
                                    &&
                                    ArticlePanel
                                    &&
                                    <ArticlePanel classes={classes} numUnapproved={numUnapproved} setNumUnapproved={setNumUnapproved} articles={articles} setArticles={setArticles}/>
                                }
                                {
                                    (currentPanel === "pages")
                                    &&
                                    PagePanel
                                    &&
                                    <PagePanel pages={pages} setPages={setPages} classes={classes} numUnapproved={numPagesUnapproved} setNumUnapproved={setNumPagesUnapproved}/>
                                } 
                                {
                                    (currentPanel === "analytics")
                                    &&
                                    AnalyticPanel
                                    &&                               
                                    signedIn
                                    &&
                                    <AnalyticPanel chartData={chartData} classes={classes} setChartData={setChartData} locationData={locationData} setLocationData={setLocationData} setLocNumber={setLocNumber} locNumber={locNumber} setPageVisitData={setPageVisitData} pageVisitData={pageVisitData}/>
                                }
                                {
                                    (currentPanel === "users")
                                    &&
                                    UserPanel
                                    &&
                                    <UserPanel users={users} setUsers={setUsers} classes={classes} handleUpdateUsers={handleFetchUsers}/>
                                }
                                 {
                                    (currentPanel === "home")
                                    &&
                                    HomePanel
                                    &&
                                    <HomePanel articles={articles} setArticles={setArticles} classes={classes} setNumUnapproved={setNumUnapproved} setSessions={setSessions} sessions={sessions} users={users} setUsers={setUsers}/>
                                }
                                                                 {
                                    (currentPanel === "misc")
                                    &&
                                    MiscPanel
                                    &&
                                    <MiscPanel canItems={canItems} handleFetchCanItems={handleFetchCanItems} handleDeleteCanItem={handleDeleteCanItem} handleAddCanItem={handleAddCanItem}/>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}
