'use client'
import React, { useState, useRef, useEffect } from "react";
import { useLayoutEffect } from "react";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { RiSearchFill } from "react-icons/ri";
import { FaBars, FaUserCircle, FaArrowRight } from "react-icons/fa";
import { getAuth } from "@firebase/auth";
import Header from "../TextComponents/Header1";
import firebase_app from "../../firebase/config";
import { fetchArticles, searchArticles } from "../../firebase/articleUtils/articleUtils";
import {getFirestore, collection, getDoc, doc, updateDoc} from "firebase/firestore"
import Link from "../../components/TextComponents/Link"
const auth = getAuth(firebase_app);

import uscaLogo from "../../components/Assets/uscalogo.png"

import DropDownItem from "./Components/DropDownItem";

const Navbar = () => {

  const router = useRouter();
  const navRef = useRef(null);
  const dropDownRef = useRef(null);



  const [open, setOpen] = useState(false);

  const [hideTheme, setHideTheme] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const [dropDownHeight, setDropDownHeight,] = useState(0);
  const [isPageReady, setIsPageReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isFocused, setIsFocused] = useState(false)


  const dropDownLinks = [{text: "Write An Article", link:"/editor/blog/new"}, {text: "Our Capstone Project", link:"https://github.com/apodicticscott/ModularBlogPlatform/"}, {text: "Website Instructions", link:"/instructions"}, {text: "Old Can Of Mystery", link:"https://canofmystery.blogspot.com/"}]

  const [textInput, setTextInput] = useState('');
  const [result, setResult] = useState(null);

  //search states
  const [active, setActive] = useState("");
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState(null)
  const [searchResults, setSearchResults] = useState(null);
  const [animate, setAnimate] = useState(false);


  const handleChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleCheck = async () => {
    const firestore = getFirestore();
    const sessionDoc = doc(firestore, 'Sessions', textInput);
    
    try {
      const docSnap = await getDoc(sessionDoc);
      if (docSnap.exists()) {
        setResult(`Session Code ${textInput} exists.`);
        if (isLoggedIn && userId) {
          // Update the boolean field for the logged-in user
          const userDoc = doc(firestore, 'users', userId);
          await updateDoc(userDoc, {
            studentWriter: true,
            sessionCode: textInput,
          });
          setResult(`You have successfully joined the school session.`);
        }
      } else {
        setResult(`Session with ID ${textInput} does not exist.`);
      }
    } catch (error) {
      setResult(`Error checking for session: ${error.message}`);
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Corrected method name
    const tempQuery = query.trim().split(" ").join("%20"); // Ensure spaces are correctly replaced with URL encoding
    setOpen(false)
    router.push(`/search?search=${tempQuery}&tags=`, undefined, { shallow: true });
  };


  useEffect(() => {
    if(!articles){
      fetchArticles().then(articles => {
          setArticles(articles.filter(article => article.Approved === true));
      });
    }
  }, [])

  useEffect(() => {

    if (navRef.current) {
      setNavHeight((navRef.current.offsetHeight - 3));
    }
    if (dropDownRef.current) {
      setDropDownHeight(dropDownRef.current.offsetHeight);
      setIsPageReady(true); // Set the page as ready after setting the dropDownHeight
    }
  }, [open]);

    let dropdownVariants = {
      open: {
        top: navHeight,
        ease: "easeInOut",
        opacity: 1,
        transition: { duration: 0.5 }
      },
      closed: {
        top: -dropDownHeight, // You can also use the calculated height if needed
        ease: "easeInOut",
        opacity: 0,
        transition: { duration: 0.5 }
      }
    };
  

  const handleLinkClick = (name) => {
    setActive(name);
  };

  const handleDownThemeClick = () => {
    setHideTheme(!hideTheme)
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.uid);
      } else {
        setIsLoggedIn(false);
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogOut = () => {
    auth.signOut() 
      .then(() => {
        console.log("User signed out successfully");
        router.push("/")
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  const handleLogin = () => {
   router.push("/login")
  };
  

  const handleDropDownClick = () => {
    setOpen(!open);
  }

  const swsDrop = "px-7 lg:px-14 explore-size-md border-y-3 lg:explore-size-lg xl:explore-size-xl 2xl:explore-size-2xl"


  const SearchChange = (text) => {
    setQuery(text)
    const tempQuery = text.split(" ");
    
    if(tempQuery !== ""){
      searchArticles(tempQuery, articles, true).then(result => {
        setSearchResults(result);
      });
      setTimeout(() => setAnimate(true), 700);
    }else{
      setAnimate(false)
    }
  }

  return (
    <>
      {/* Drop Down */}
      <div className={`transition duration-300 fixed w-screen h-[110vh] z-20 ${open ? "pointer-events-auto backdrop-blur-sm " : "pointer-events-none backdrop-blur-none"}`}>
      <motion.div ref={dropDownRef} style={{ top: `-${dropDownHeight}px`}} initial={closed}  animate={open ? "open" : "closed"} variants={dropdownVariants} className={`fixed flex bg-base-100 dark:bg-base-100-dark dark:border-y-black left-0 flex flex-end border-y-3 border-y-black dark:border-y-[#302c38] dark:border-y-2  text-t-light dark:text-t-dark z-40 ${isPageReady ? "visible " : "hidden"} ${open ? "pointer-events-auto" : "pointer-events-none"} ${swsDrop}`}>
        <div className="flex flex-row justify-center w-full lg:py-2 py-5 flex-grow md:flex-wrap flex-wrap lg:flex-nowrap content-start">
          <div className=" flex flex-row flex-wrap justify-between gap-[20px] lg:gap-0 sm:justify-center items-center w-full md:items-start md:w-[750px] lg:w-max">
            <div className="w-full sm:w-[500px] lg:w-max flex flex-wrap h-max lg:h-full gap-[20px]">
              <div className="navbar-end lg:hidden w-full flex justify-center items-center gap-1 text-t-header-light dark:text-t-header-dark ">
                <RiSearchFill style={{fontSize: "30px"}}/>
                <form className="grow" onSubmit={handleSearchSubmit}>
                  <input type="text" name="search" placeholder="Search" onChange={(e) => setQuery(e.target.value)}  className="neo-input h-full w-full px-3"/>
                </form>
                
                <FaUserCircle className="text-2.7xl"/>
              </div>
              <DropDownItem href="https://www.usca.edu/" title="USCA" background="bg-sunset"  classes="w-full h-[16.5vh] sm:w-[calc((100%_/_2)_-_10px)] sm:h-[165px] lg:w-[230.38px] xl:w-[267.3px]">
                <img src={uscaLogo.src} className="h-2/3" alt="USCA Logo"/>
              </DropDownItem>
              <DropDownItem href="/search" title="Can Items" background="bg-pale-green"   classes="w-full h-[16.5vh] sm:w-[calc((100%_/_2)_-_10px)] sm:h-[165px] lg:w-[230.38px] xl:w-[267.3px]">
                  <div className="flex w-full h-80 gap-5 text-[50px] font-bold overflow-hidden justify-center items-center text-t-header-light dark:text-t-header-dark">
                    <div className="w-[644px] h-15 whitespace-nowrap dark:text-t-header-light">
                      Example Text
                    </div>
                    <div className="w-[644px] h-15 whitespace-nowrap dark:text-t-header-light">
                      Example Text
                    </div>
                  </div>
              </DropDownItem>
              <DropDownItem href="/search" title="Articles" background="bg-dark-purple" classes="w-full h-[16.5vh] sm:w-[500px] sm:h-[165px] lg:w-[230.38px] xl:w-[267.3px]">
                  <div className="flex justify-center h-[110%] w-[90%] border-3 neo-bottom-lg " style={{ position: "relative", background: "white", top: "15%"}}>
                    <div className="w-[95%] h-[60%] mt-[2.5%] rounded" style={{backgroundColor: "black"}}>
                    </div>
                  </div>
              </DropDownItem>
            </div>
            <div className="w-full sm:w-[500px] justify-between flex lg:hidden">
              <div className="w-max flex flex-col gap-[5px] lg:hidden h-max whitespace-nowrap">
                <Link classes={" dark:font-light"} onClick={() => (router.push("/", undefined, { shallow: true}), setOpen(false))} > Home </Link>
                <Link classes={" dark:font-light"}  onClick={() => (router.push("/about-project", undefined, { shallow: true}), setOpen(false))}> About </Link>
                <Link classes={" dark:font-light"}  onClick={() => (router.push("/login", undefined, { shallow: true}), setOpen(false))}> Login </Link>
                <Link classes={" dark:font-light"}  onClick={() => (router.push("/signup", undefined, { shallow: true}), setOpen(false))}> Signup </Link>
                {
                  dropDownLinks.map((link, index) => 
                    ((index + 1) <= (dropDownLinks.length / 2)) ?
                      <Link key={index} classes={" dark:font-light"}  href={link.link}> {link.text} </Link>
                    :
                    null
                  )
                }
              </div>
              <div className="w-max flex flex-col gap-[5px] lg:hidden h-max whitespace-nowrap ">
                {
                  dropDownLinks.map((link, index) => 
                    ((index + 1) > (dropDownLinks.length / 2)) ?
                      <Link key={index} classes={" dark:font-light"}  href={link.link}> {link.text} </Link>
                    :
                    null
                  )
                }
              </div>
            </div>
          </div>
          <div className="flex   lg:flex-col justify-center lg:justify-end shrink-1 w-full  lg:w-0 ml-0 lg:ml-2">
            <div className="w-full sm:w-[530px] lg:w-full lg:h-2/3 flex justify-between  px-2 md:px-0">
              <div className="min-w-max hidden lg:flex lg:flex-col content-center gap-[5px]">
                {
                  dropDownLinks.map((link, index) => 
                    <div key={index}>
                      <Link href={link.link} classes={" dark:font-light"} > {link.text} </Link>
                    </div>
                  )
                }
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
    {/*  */}
    <div className={`fixed w-screen h-screen top-0 flex flex-col items-center justify-center z-20 transition-all duration-300 backdrop-blur-sm ${isFocused ? "opacity-1 pointer-events-auto" : "opacity-0 pointer-events-none "}`} onClick={(e) => ((e.target === e.currentTarget) && setIsFocused(false))}>
        <div className={`flex flex-col justify-start self-center align-center ${query === "" && "p-7"} transition-none w-full w-full sm:w-[calc(100vw_-_29px)]  transition-all duration-100 ${isFocused ? "scale-100" : "scale-0"} bg-base-100 dark:bg-base-100-dark dark:text-t-header-dark dark:font-light w-[450px] max-w-[450px] h-[450px] border-y-3 sm:border-3 dark:shadow-none dark:sm:border-2 dark:border-[#302c38] sm:rounded-md sm:shadow-lg sm:m-7 sm:m-0 overflow-hidden `}>
            {
              query !== ""
              ?
              <div className="flex flex-col ">
                <div className="flex items-center gap-[5px] border-b-3 max-h-[50px] dark:border-b-2 dark:border-[#302c38] px-7 py-3">
                  <div className="w-[50px] h-full flex items-center">
                    <RiSearchFill className="text-2.7xl"/>
                  </div>
                  <div className="w-[500px] overflow-x-scroll tracking-tighter text-2xl no-scrollbar ">{query}</div>
                </div>

                <div className={`flex flex-col gap-[10px] px-7 py-3 grow h-[400px] overflow-y-scroll`}>
                  {
                    searchResults
                    &&
                    searchResults.map((article, index) => (
                      <div key={index} className={`flex w-full rounded-md border-3 dark:border-[#302c38] ${animate ? "top-[0px] scale-100 opacity-100 top-[0px]" : "relative top-[100px] scale-50 opacity-0 top-[-20px]"} dark:border-2 h-[125px] p-1 hover:scale-[1.02] cursor-pointer hover:shadow-md-move dark:hover:shadow-md-move-dark transition duration-100`} onClick={() => (router.push(`/blog/${article.id}`, undefined, {shallow: true}), setIsFocused(false))}>
                        <div className="min-w-[157.16px] h-full">
                          {
                            article.CoverImage
                            ?
                            <img src={article.CoverImage} className="h-full w-full rounded-md"/>
                            :
                            <div className="h-full w-full rounded-md bg-image-missing-image bg-contain">
                            </div>
                          }
                          
                        </div>
                        <div className="flex flex-col justify-between h-full grow p-3 text-lg gap-[5px] overflow-hidden">
                          <div className="flex flex-col grow gap-[5px]">
                            <span className="tracking-tighter">
                              {article.Title}
                            </span>
                            <span className="tracking-tighter">
                              {article.Author}
                            </span>
                          </div>
                          <div className="flex w-full h-max ">
                              {
                                article.Tags.map((tag, index) => (
                                  <div key={index} className="rounded-[7px] tracking-tighter px-[10px] mr-[5px]  py-[2.5px] text-lg border-2 shadow-md max-h-[30px] min-w-max dark:text-t-header-light tracking-tighter" style={{background: tag.Color}}>
                                    {tag.Text}
                                  </div>
                                ))
                              }
                          </div>
                        </div>

                      </div>
                    ))
                  }
                </div> 
              </div>
              :
              <div className="w-full h-max flex flex-col gap-[15px]">
                <div className="flex flex-col w-full grow-1 gap-[10px] ">
                    <span className="font-bold text-wrap tracking-tighter">
                      Maybe Seach For...
                    </span>
                    <div className="flex flex-wrap gap-[5px]">
                        <div className="px-2 p-1 h-max grow border-2 dark:border-[#302c38] dark:border-2 rounded-md text-center tracking-tighter">
                          Article Titles
                        </div>
                        <div className="px-2 p-1 h-max grow border-2 dark:border-[#302c38] dark:border-2 rounded-md text-center tracking-tighter">
                          Author Names
                        </div>
                        <div className="px-2 p-1 h-max grow border-2 dark:border-[#302c38] dark:border-2 rounded-md text-center tracking-tighter">
                          Tags
                        </div>
                        <div className="px-2 p-1 h-max grow border-2 dark:border-[#302c38] dark:border-2 rounded-md text-center tracking-tighter">
                          Can Items
                        </div>
                    </div> 
                </div>
                <div className="w-full h-max flex gap-[15px]">
                  <div className="flex flex-col h-[120px] w-[50%] gap-[10px] cursor-pointer" href="www.usca.edu" onClick={() => setIsFocused(false)}>
                    <div className="h-[20px] tracking-tighter">
                      USCA
                    </div>
                    <div className="neoButton w-full h-[calc(100%_-_30px)] border-3 dark:border-2 dark:border-[#302c38] shadow-md rounded-md transition duration-100 hover:shadow-md-move bg-sunset flex items-center justify-center overflow-hidden">
                      <div className=" w-0">
                        <div className="neoButton-animation z-0 w-0">
                          <div className="neoButton-rectangle w-[100px]">
                
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-full z-10 flex items-center justify-center">
                        <img src="/_next/static/media/uscalogo.f84310d7.png" class="h-2/3" alt="USCA Logo" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col h-[120px] w-[50%] gap-[10px] cursor-pointer" onClick={() => (router.push("/search", undefined, {shallow: true}), setIsFocused(false))}>
                    <div className="h-[20px] tracking-tighter">
                      Articles
                    </div>
                    <div className="neoButton w-full h-[calc(100%_-_30px)] border-3 dark:border-2 dark:border-[#302c38] shadow-md rounded-md transition duration-100 hover:shadow-md-move bg-dark-purple flex items-center justify-center overflow-hidden ">
                      <div className=" w-0">
                        <div className="neoButton-animation z-0">
                          <div className="neoButton-rectangle w-[100px]">
              
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-full z-10 flex items-center justify-center">
                        <div className="flex justify-center h-[110%] w-[90%] border-3 neo-bottom-lg " style={{ position: "relative", background: "white", top: "15%"}}>
                          <div className="w-[95%] h-[60%] mt-[2.5%] rounded" style={{backgroundColor: "black"}}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-max flex">
                  <div className="flex flex-col content-end grow gap-[5px]">
                    <Link onClick={() => (router.push("/", undefined, { shallow: true}), setIsFocused(false))}> Home </Link>
                    <Link onClick={() => (router.push("/about", undefined, { shallow: true}), setIsFocused(false))}> About </Link>
                    <Link onClick={() => (router.push("/login", undefined, { shallow: true}), setIsFocused(false))}> Login </Link>
                    <Link onClick={() => (router.push("/signup", undefined, { shallow: true}), setIsFocused(false))}> Sign Up </Link>
                  </div>
                  <div className="flex flex-col grow gap-[5px]">
                    <Link classes={"text-right"} href={"https://github.com/apodicticscott/ModularBlogPlatform"}> Our Capstone Project </Link>
                    <Link classes={"text-right"} onClick={() => (router.push("/instructions", undefined, { shallow: true}), setIsFocused(false))}> Website Instructions </Link>
                    <Link classes={"text-right"} href={"https://canofmystery.blogspot.com"}> Old Can Of Mystery </Link>
                    <Link classes={"text-right"}onClick={() => (router.push("/editor/blog/new", undefined, { shallow: true}), setIsFocused(false))}> Write An Article </Link>
                  </div>
                </div>
              </div>
            }
        </div>
        <div className="flex items-center p-3 w-max h-[50px] bg-base-100 dark:bg-base-100-dark dark:shadow-none dark:border-2 dark:border-[#302c38] dark:text-t-header-dark dark:hover:shadow-md-move-dark rounded-md border-3 shadow-md hover:shadow-md-move gap-[15px] transition duration-100 cursor-pointer" onClick={() => (router.push("/search", undefined, {shallow: true}))}>
          <span className="font-bold dark:font-medium text-wrap tracking-tighter">
              Take Me To The Search Page
          </span>
          <FaArrowRight className="text-2xl"/>
        </div>
    </div>
    {/* Nav Bar */}
    <div ref={navRef} className="fixed w-screen border-b-3 border-b-black  dark:border-b-2 dark:border-b-[#302c38] xl:px-14 2xl:px-14 px-7 bg-base-100 dark:bg-base-100-dark text-t-header-light dark:text-t-header-dark  z-50">
      <div className="navbar p-0 h-16 items-stretch">
        <div className="flex flex-row grow justify-between lg:justify-between ">
          <FaBars onClick={() => handleDropDownClick()} className="lg:hidden text-2.5xl text-t-header-light dark:text-t-header-dark" />
          <div className="navbar-start flex-shrink w-fit lg:w-60">
            <a className="text-lg lg:text-xl xl:text-2xl font-black tracking-tighter">Can of Mystery</a>
          </div>
          <div className="navbar-center  justify-center pb-0 pt-0 flex-grow h-full hidden lg:flex">
            <ul style={{fontSize: '20px', fontWeight: "700"}} className="menu menu-horizontal items-center items-stretch justify-center h-full pt-0 pb-0 m-0 ">
              <li className={`flex  ${active === "Home" ? "dark:text-t-header-light dark:bg-light-purple bg-primary a " : ""} `} onClick={() => {handleLinkClick("Home"); if(open === true){handleDropDownClick()}}}>
                <a  className="flex flex-1 rounded-none text-2xl hover:bg-primary-focus tracking-tighter" onClick={() => router.push("/", undefined, { shallow: true})}>Home</a>
              </li>
              <li>
                <details className="flex flex-1 max-h-full">
                  <summary onClick={() => {handleDropDownClick(); handleLinkClick("Explore")}} className={`flex flex-1 h-full items-center rounded-none text-2xl tracking-tighter ${active === "Explore" ? "dark:text-t-header-light dark:bg-light-purple bg-primary a" : ""}`}>Explore</summary>
                </details>
              </li>
              <li className="flex items-center">
                <a href="/our-project" onClick={() => (handleLinkClick("About"), router.push("/about-project", undefined, { shallow: true}))} className={`flex flex-1 rounded-none text-2xl tracking-tighter ${active === "About" ? "dark:text-t-header-light dark:bg-light-purple bg-primary a" : ""}`}>About</a>
              </li>
            </ul>
          </div>
          <div className="navbar-end lg:flex items-center justify-center md:w-min hidden gap-1">
            <RiSearchFill style={{fontSize: "30px"}} role="link">search</RiSearchFill>
            <input id="search" onFocus={() => setIsFocused(true)} onChange={(e) => (SearchChange(e.target.value), (e.target.value === "" && setAnimate(false)))} type="search" name="search" placeholder="Search" required minLength="4" className="neo-input w-[180px] px-3 dark:text-t-header-light"/>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avitar">
                <FaUserCircle tabIndex={0} role="button" className="text-2.7xl" />
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 dark:bg-base-100-dark	border-3 rounded-md w-52">
                {isLoggedIn ? <strong>Welcome!</strong> : <a  href=""></a>}
                {isLoggedIn ? <li><input type="text" className="my-1 w-full border-3 neo-input dark:text-base-100-dark text-base-100-dark active:bg-base-100-dark lg:text-xl drop-nav-input"  placeholder="Session Code" value={textInput} onChange={handleChange}></input><button className="my-1 dark:text-base-100-dark bg-bright-orenge lg:text-xl border-3" onClick={handleCheck}>Check Session</button>{result && <p>{result}</p>}</li> : <a/>}
                {isLoggedIn ? <li><button className="border-3 bg-bright-orenge my-1 dark:text-base-100-dark lg:text-xl hover:bg-bright-orenge" onClick={handleLogOut}>Logout</button></li> : <li><button className="border-3 my-1 hover:bg-pale-green dark:text-base-100-dark lg:text-xl bg-pale-green" onClick={handleLogin}>Login</button></li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Theme Button */}

    </div>

    </>
  );
};

export default Navbar;
