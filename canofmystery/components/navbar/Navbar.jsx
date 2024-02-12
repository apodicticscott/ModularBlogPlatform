'use client'
import React, { useState, useRef, useEffect } from "react";
import { useLayoutEffect } from "react";
import { motion } from '../../node_modules/framer-motion';
import { RiSearchFill } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { Link } from "next/router";
import uscaLogo from "../../components/Assets/uscalogo.png"

import DropDownItem from "./Components/DropDownItem";

console.log(uscaLogo)

const Navbar = () => {


  const navRef = useRef(null);
  const dropDownRef = useRef(null);

  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(true);
  const [hideTheme, setHideTheme] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const [dropDownHeight, setDropDownHeight,] = useState(0);
  const [isPageReady, setIsPageReady] = useState(false);

  const dropDownLinks = [{text: "Create Project"}, {text: "Our Project"}, {text: "Instructions"}, {text: "Old Can Of Mystery"}]

  

  
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
      
        transition: { duration: 0.5 }
      }
    };
  


  const handleLinkClick = (name) => {
    setActive(name);
  };

  const handleDownThemeClick = () => {
    setHideTheme(!hideTheme)
  }
  
  const handleThemeClick = () => {
    document.documentElement.classList.toggle('dark');
    setLight(!light)
  };

  const handleDropDownClick = () => {
    setOpen(!open);
  }

  const swsDrop = "px-7 lg:px-14 border-y-2 explore-size-md lg:border-y-3 lg:explore-size-lg xl:explore-size-xl 2xl:explore-size-2xl"

  console.log(open)
  return (
    <>
      {/* Drop Down */}

      <motion.div ref={dropDownRef} style={{ top: `-${dropDownHeight}px`}} initial={{  opacity: 0 }}  animate={open ? "open" : "closed"} variants={dropdownVariants} className={`fixed flex bg-base-100 dark:bg-base-100-dark dark:border-y-black left-0 flex flex-end border-y-2 md:border-y-3 border-y-black text-t-light dark:text-t-dark z-40 ${isPageReady ? "visible " : "hidden"} ${swsDrop}`}>
        <div className="flex flex-row justify-center lg:py-2 md:py-5 py-5 flex-grow md:flex-wrap flex-wrap lg:flex-nowrap content-start">
          <div className="navbar-end lg:hidden w-full md:w-3/4 md:flex flex gap-1 text-t-header-light dark:text-t-header-dark">
            <RiSearchFill style={{fontSize: "30px"}}/>
            <input type="text" name="search" required minlength="4" className="neo-input md:w-full w-full"/>
            <MdAccountCircle style={{fontSize: "35px"}}/>
          </div>
          <div className="flex flex-row flex-wrap justify-center items-center w-full md:items-start md:w-full lg:w-max">
            <DropDownItem title="USCA" background="bg-sunset">
              <img src="/_next/static/media/uscalogo.f84310d7.png" className="h-2/3" alt="USCA Logo"/>
            </DropDownItem>
            <DropDownItem title="Can Items" background="bg-pale-green">
                <div className="flex w-[322px] h-80 gap-5 text-[50px] font-bold overflow-hidden justify-center items-center text-t-header-light dark:text-t-header-dark">
                  <div className="w-[644px] h-15 whitespace-nowrap">
                    Example Text
                  </div>
                  <div className="w-[644px] h-15 whitespace-nowrap">
                    Example Text
                  </div>
                </div>
            </DropDownItem>
            <DropDownItem title="Articles" background="bg-dark-purple" itemClass="explore-itm-btm-size-sm md:explore-itm-btm-size-md">
              <div className="flex justify-center h-[110%] w-[90%] border-2 neo-bottom-lg " style={{ position: "relative", background: "white", top: "15%"}}>
                <div className="w-[95%] h-[60%] mt-[2.5%] rounded" style={{backgroundColor: "black"}}>    
                </div>
              </div>
            </DropDownItem>
          </div>
          <div className="flex flex-col justify-center shrink-1 w-full md:w-3/4 lg:w-0 ml-0 lg:ml-2">
            <div className="lg:h-2/4 flex justify-between px-2 md:px-0">
              <ul className="w-max lg:inline-block hidden whitespace-nowrap">
                {
                  dropDownLinks.map((index, link) => 
                    <li key={index}>
                      <a className="hover:text-t-header-light dark:hover:text-t-header-dark"> {link.text} </a>
                    </li>
                  )
                }
              </ul>
              <ul className="w-max md:flex-wrap lg:hidden h-max whitespace-nowrap">
                <li>
                  <a > Home </a>
                </li>
                <li>
                  <a> About </a>
                </li>
                {
                  dropDownLinks.map(({text}, index) => 
                    ((index + 1) <= (dropDownLinks.length / 2)) ?
                    <li key={index}>
                      <a> {text} </a>
                    </li>
                    :
                    null
                  )
                }
              </ul>
              <ul className="w-max md:flex-wrap lg:hidden h-max whitespace-nowrap ">
                {
                  dropDownLinks.map(({text}, index) => 
                    ((index + 1) > (dropDownLinks.length / 2)) ?
                    <li key={index} className="text-right">
                      <a className="hover:text-"> {text} </a>
                    </li>
                    :
                    null
                  )
                }
              </ul>

            </div>
          </div>

        </div>
      </motion.div>
    {/* Nav Bar */}
    <div ref={navRef} className="fixed w-screen border-b-2 md:border-b-3 border-b-black xl:px-14 2xl:px-14 px-7 bg-base-100 dark:bg-base-100-dark text-t-header-light dark:text-t-header-dark  z-50">
      <div className="navbar p-0 h-16 items-stretch">
        <div className="flex flex-row grow justify-between lg:justify-between ">
          <RxHamburgerMenu onClick={() => handleDropDownClick()} className="lg:hidden text-2xl" />
          <div className="navbar-start flex-shrink w-fit lg:w-60">
            <a className="text-lg lg:text-xl xl:text-2xl font-black ">Can of Mystery</a>
          </div>
          <div className="navbar-center  justify-center pb-0 pt-0 flex-grow h-full hidden lg:flex">
            <ul style={{fontSize: '20px', fontWeight: "700"}} className="menu menu-horizontal items-center items-stretch justify-center h-full pt-0 pb-0 m-0 ">
              <li className={`flex  ${active === "Home" ? "dark:text-t-header-light dark:bg-primary-dark bg-primary a" : ""} `} onClick={() => {handleLinkClick("Home"); if(open === true){handleDropDownClick()}}}>
                <a  className="flex flex-1 rounded-none text-lg" href="\">Home</a>
              </li>
              <li>
                <details className="flex flex-1 h-full">
                  <summary onClick={() => {handleDropDownClick(); handleLinkClick("Explore")}} className={`flex flex-1 h-full items-center rounded-none text-lg  ${active === "Explore" ? "dark:text-t-header-light dark:bg-primary-dark bg-primary a" : ""}`}>Explore</summary>
                </details>
              </li>
              <li className="flex items-center">
                <a onClick={() => handleLinkClick("About")} className={`flex flex-1 rounded-none text-lg ${active === "About" ? "dark:text-t-header-light dark:bg-primary-dark bg-primary a" : ""}`}>About</a>
              </li>
            </ul>
          </div>
          <div className="navbar-end lg:flex items-center justify-center md:w-min hidden gap-1">
            <RiSearchFill style={{fontSize: "30px"}} />
            <input type="text" name="search" required minlength="4" className="neo-input" style={{width: "180px"}}/>
            <MdAccountCircle style={{fontSize: "35px"}} />
          </div>
        </div>
      </div>
      {/* Theme Button */}
      <div className="pl-[25px] xl:pl-[50px] pb-[20px] xl:pb-[25px] h-[100px]" style={{position: "fixed", left: "0px", top: "calc(100vh - 75px)", width: "100vw"}} >
          <div className="flex flex-row justify-center" style={{flexDirection: "column", justifyContent: "center", alignItems: "center",  borderRadius: "50px", height: "50px", width: "50px"}}>
            <MdWbSunny className="text-[40px] lg:text-[50px] dark:text-t-header-dark text-t-header-light" onClick={() => handleThemeClick()} style={{ display:`${!light ? "block" : "none"}` }}/>
            <FaMoon className="text-[30px] lg:text-[40px] dark:text-t-header-dark text-t-header-light" onClick={() => handleThemeClick()} style={{display:`${light ? "block" : "none"}`}}/>
          </div>
      </div>
    </div>

    </>
  );
};

export default Navbar;
