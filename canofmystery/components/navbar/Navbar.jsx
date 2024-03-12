'use client'
import React, { useState, useRef, useEffect } from "react";
import { useLayoutEffect } from "react";
import { motion } from 'framer-motion';
import { RiSearchFill } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

import uscaLogo from "../../components/Assets/uscalogo.png"

import DropDownItem from "./components/dropDownItem.jsx";

console.log(uscaLogo)

const Navbar = () => {


  const navRef = useRef(null);
  const dropDownRef = useRef(null);

  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);

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
  

  const handleDropDownClick = () => {
    setOpen(!open);
  }

  const swsDrop = "px-7 lg:px-14 border-y-2 explore-size-md lg:border-y-3 lg:explore-size-lg xl:explore-size-xl 2xl:explore-size-2xl"

  console.log(open)
  return (
    <>
      {/* Drop Down */}

      <motion.div ref={dropDownRef} style={{ top: `-${dropDownHeight}px`}} initial={{  opacity: 0 }}  animate={open ? "open" : "closed"} variants={dropdownVariants} className={`fixed flex bg-base-100 dark:bg-base-100-dark dark:border-y-black left-0 flex flex-end border-y-2 md:border-y-3 border-y-black text-t-light dark:text-t-dark z-40 ${isPageReady ? "visible " : "hidden"} ${open ? "pointer-events-auto" : "pointer-events-none"} ${swsDrop}`}>
        <div className="flex flex-row justify-center w-full lg:py-2 py-5 flex-grow md:flex-wrap flex-wrap lg:flex-nowrap content-start">
          <div className="navbar-end lg:hidden w-full md:w-[750px]  md:flex flex justify-center gap-1 text-t-header-light dark:text-t-header-dark ">
            <RiSearchFill style={{fontSize: "30px"}}/>
            <input type="text" name="search" required minLength="4" className="neo-input-sm sm:neo-input grow-0 w-[65vw]  sm:w-[450px]"/>
            <MdAccountCircle style={{fontSize: "35px"}}/>
          </div>
          <div className=" flex flex-row flex-wrap justify-between sm:justify-center items-center w-full md:items-start md:w-[750px] lg:w-max">
            <DropDownItem title="USCA" background="bg-sunset" classes="w-full w-full xs-sm:explore-itm-top-size-xs">
              <img src={uscaLogo.src} className="h-2/3" alt="USCA Logo"/>
            </DropDownItem>
            <DropDownItem title="Can Items" background="bg-pale-green" classes="w-full xs-sm:explore-itm-top-size-xs">
                <div className="flex w-full h-80 gap-5 text-[50px] font-bold overflow-hidden justify-center items-center text-t-header-light dark:text-t-header-dark">
                  <div className="w-[644px] h-15 whitespace-nowrap">
                    Example Text
                  </div>
                  <div className="w-[644px] h-15 whitespace-nowrap">
                    Example Text
                  </div>
                </div>
            </DropDownItem>
            <DropDownItem title="Articles" background="bg-dark-purple" classes="w-full sm:w-[500px] lg:w-[230.38px] xl:w-[267.3px]">
              <div className="flex justify-center h-[110%] w-[90%] border-2 neo-bottom-lg " style={{ position: "relative", background: "white", top: "15%"}}>
                <div className="w-[95%] h-[60%] mt-[2.5%] rounded" style={{backgroundColor: "black"}}>    
                </div>
              </div>
            </DropDownItem>
          </div>
          <div className="flex flex-col justify-center items-center shrink-1 w-full  lg:w-0 ml-0 lg:ml-2">
            <div className="w-full sm:w-[530px] lg:w-full lg:h-2/4 flex justify-between px-2 md:px-0">
              <ul className="w-max lg:inline-block hidden whitespace-nowrap">
                {
                  dropDownLinks.map((link, index) => 
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
                    <li key={text} className="text-right">
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
                <a  className="flex flex-1 rounded-none text-2xl" href="\">Home</a>
              </li>
              <li>
                <details className="flex flex-1 h-full">
                  <summary onClick={() => {handleDropDownClick(); handleLinkClick("Explore")}} className={`flex flex-1 h-full items-center rounded-none text-2xl  ${active === "Explore" ? "dark:text-t-header-light dark:bg-primary-dark bg-primary a" : ""}`}>Explore</summary>
                </details>
              </li>
              <li className="flex items-center">
                <a onClick={() => handleLinkClick("About")} className={`flex flex-1 rounded-none text-2xl ${active === "About" ? "dark:text-t-header-light dark:bg-primary-dark bg-primary a" : ""}`}>About</a>
              </li>
            </ul>
          </div>
          <div className="navbar-end lg:flex items-center justify-center md:w-min hidden gap-1">
            <RiSearchFill style={{fontSize: "30px"}} role="link">SearchPage</RiSearchFill>
            <input type="search" name="search" required minLength="4" className="neo-input w-[180px]"/>
            <MdAccountCircle style={{fontSize: "35px"}} />
          </div>
        </div>
      </div>
      {/* Theme Button */}

    </div>

    </>
  );
};

export default Navbar;
