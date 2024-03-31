'use client'
import React, { useState, useRef, useEffect } from "react";
import { useLayoutEffect } from "react";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { RiSearchFill } from "react-icons/ri";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { getAuth } from "@firebase/auth";
import firebase_app from "../../firebase/config";
import {getFirestore, collection, getDoc, doc, updateDoc} from "firebase/firestore"
import Link from "../../components/TextComponents/Link"
const auth = getAuth(firebase_app);

import uscaLogo from "../../components/Assets/uscalogo.png"

import DropDownItem from "./Components/DropDownItem";

const Navbar = () => {

  const router = useRouter();
  const navRef = useRef(null);
  const dropDownRef = useRef(null);

  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  const [hideTheme, setHideTheme] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const [dropDownHeight, setDropDownHeight,] = useState(0);
  const [isPageReady, setIsPageReady] = useState(false);
  const [userId, setUserId] = useState(null);


  const dropDownLinks = [{text: "Write An Article", link:"/editor/blog/new"}, {text: "Our Capstone Project", link:"https://github.com/apodicticscott/ModularBlogPlatform/"}, {text: "Website Instructions", link:"/instructions"}, {text: "Old Can Of Mystery", link:"https://canofmystery.blogspot.com/"}]

  const [textInput, setTextInput] = useState('');
  const [result, setResult] = useState(null);

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

  return (
    <>
      {/* Drop Down */}
      <div className={`transition duration-300 fixed w-screen h-screen z-20 ${open ? "pointer-events-auto backdrop-blur-sm " : "pointer-events-none backdrop-blur-none"}`}>
      <motion.div ref={dropDownRef} style={{ top: `-${dropDownHeight}px`}} initial={closed}  animate={open ? "open" : "closed"} variants={dropdownVariants} className={`fixed flex bg-base-100 dark:bg-base-100-dark dark:border-y-black left-0 flex flex-end border-y-3 border-y-black text-t-light dark:text-t-dark z-40 ${isPageReady ? "visible " : "hidden"} ${open ? "pointer-events-auto" : "pointer-events-none"} ${swsDrop}`}>
        <div className="flex flex-row justify-center w-full lg:py-2 py-5 flex-grow md:flex-wrap flex-wrap lg:flex-nowrap content-start">
          <div className=" flex flex-row flex-wrap justify-between gap-[20px] lg:gap-0 sm:justify-center items-center w-full md:items-start md:w-[750px] lg:w-max">
            <div className="w-full sm:w-[500px] lg:w-max flex flex-wrap h-max lg:h-full gap-[20px]">
              <div className="navbar-end lg:hidden w-full flex justify-center items-center gap-1 text-t-header-light dark:text-t-header-dark ">
                <RiSearchFill style={{fontSize: "30px"}}/>
                <form className="grow">
                  <input type="text" name="search" placeholder="Search" required minLength="4" className="neo-input h-full w-full px-3"/>
                </form>
                <FaUserCircle className="text-2.7xl"/>
              </div>
              <DropDownItem link = "https://www.usca.edu/" title="USCA" background="bg-sunset" classes="w-full h-[16.5vh] sm:w-[calc((100%_/_2)_-_10px)] sm:h-[165px] lg:w-[230.38px] xl:w-[267.3px]">
                <img src={uscaLogo.src} className="h-2/3" alt="USCA Logo"/>
              </DropDownItem>
              <DropDownItem link = "canitems" title="Can Items" background="bg-pale-green" classes="w-full h-[16.5vh] sm:w-[calc((100%_/_2)_-_10px)] sm:h-[165px] lg:w-[230.38px] xl:w-[267.3px]">
                  <div className="flex w-full h-80 gap-5 text-[50px] font-bold overflow-hidden justify-center items-center text-t-header-light dark:text-t-header-dark">
                    <div className="w-[644px] h-15 whitespace-nowrap">
                      Example Text
                    </div>
                    <div className="w-[644px] h-15 whitespace-nowrap">
                      Example Text
                    </div>
                  </div>
              </DropDownItem>
              <DropDownItem link="Articles" title="Articles" background="bg-dark-purple" classes="w-full h-[16.5vh] sm:w-[500px] sm:h-[165px] lg:w-[230.38px] xl:w-[267.3px]">
                  <div className="flex justify-center h-[110%] w-[90%] border-3 neo-bottom-lg " style={{ position: "relative", background: "white", top: "15%"}}>
                    <div className="w-[95%] h-[60%] mt-[2.5%] rounded" style={{backgroundColor: "black"}}>
                    </div>
                  </div>
              </DropDownItem>
            </div>
            <div className="w-full sm:w-[500px] justify-between flex lg:hidden">
              <div className="w-max flex flex-col gap-[5px] lg:hidden h-max whitespace-nowrap">
                <Link classes={"text-t-light tracking-[-2.3px]  decoration-t-light"} href="/" > Home </Link>
                  <Link classes={"text-t-light tracking-[-2.3px]  decoration-t-light"} href="/our-project"> About </Link>
                  <Link classes={"text-t-light tracking-[-2.3px]  decoration-t-light"} href="/login"> Login </Link>

                  <Link classes={"text-t-light tracking-[-2.3px]  decoration-t-light"} href="/signup"> Signup </Link>
                {
                  dropDownLinks.map((link, index) => 
                    ((index + 1) <= (dropDownLinks.length / 2)) ?
                      <Link key={index} classes={"text-t-light tracking-[-2.3px]  decoration-t-light"} href={link.link}> {link.text} </Link>
                    :
                    null
                  )
                }
              </div>
              <div className="w-max flex flex-col gap-[5px] lg:hidden h-max whitespace-nowrap ">
                {
                  dropDownLinks.map((link, index) => 
                    ((index + 1) > (dropDownLinks.length / 2)) ?
                      <Link key={index} classes={"text-t-light tracking-[-2.3px] text-right decoration-t-light"} href={link.link}> {link.text} </Link>
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
                      <a className="mt-[15px] hover:text-t-header-light dark:hover:text-t-header-dark hover:decoration-t-header-light text-t-light tracking-[-2.3px]  hover:underline decoration-t-light" href={link.link}> {link.text} </a>
                    </div>
                  )
                }
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
    {/* Nav Bar */}
    <div ref={navRef} className="fixed w-screen border-b-3 border-b-black xl:px-14 2xl:px-14 px-7 bg-base-100 dark:bg-base-100-dark text-t-header-light dark:text-t-header-dark  z-50">
      <div className="navbar p-0 h-16 items-stretch">
        <div className="flex flex-row grow justify-between lg:justify-between ">
          <FaBars onClick={() => handleDropDownClick()} className="lg:hidden text-2.5xl text-t-header-light" />
          <div className="navbar-start flex-shrink w-fit lg:w-60">
            <a className="text-lg lg:text-xl xl:text-2xl font-black ">Can of Mystery</a>
          </div>
          <div className="navbar-center  justify-center pb-0 pt-0 flex-grow h-full hidden lg:flex">
            <ul style={{fontSize: '20px', fontWeight: "700"}} className="menu menu-horizontal items-center items-stretch justify-center h-full pt-0 pb-0 m-0 ">
              <li className={`flex  ${active === "Home" ? "dark:text-t-header-light dark:bg-primary-dark bg-primary a " : ""} `} onClick={() => {handleLinkClick("Home"); if(open === true){handleDropDownClick()}}}>
                <a  className="flex flex-1 rounded-none text-2xl hover:bg-primary-focus" href="\">Home</a>
              </li>
              <li>
                <details className="flex flex-1 h-full">
                  <summary onClick={() => {handleDropDownClick(); handleLinkClick("Explore")}} className={`flex flex-1 h-full items-center rounded-none text-2xl  ${active === "Explore" ? "dark:text-t-header-light dark:bg-primary-dark bg-primary a" : ""}`}>Explore</summary>
                </details>
              </li>
              <li className="flex items-center">
                <a href="/our-project" onClick={() => handleLinkClick("About")} className={`flex flex-1 rounded-none text-2xl ${active === "About" ? "dark:text-t-header-light dark:bg-primary-dark bg-primary a" : ""}`}>About</a>
              </li>
            </ul>
          </div>
          <div className="navbar-end lg:flex items-center justify-center md:w-min hidden gap-1">
            <RiSearchFill style={{fontSize: "30px"}} role="link">search</RiSearchFill>
            <input type="search" name="search" placeholder="Search" required minLength="4" className="neo-input w-[180px] px-3"/>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avitar">
                <FaUserCircle tabIndex={0} role="button" className="text-2.7xl" />
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 dark:bg-base-100-dark	border-3 rounded-md w-52">
                {isLoggedIn ? <strong>Welcome!</strong> : <a classes={"text-t-light tracking-[-2.3px]  decoration-t-light"} href=""></a>}
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
