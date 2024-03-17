import React, {useState} from "react";
import { getFirestore, collection, addDoc} from "firebase/firestore"
import { firebase_app } from "../../firebase/config"
import { AnimatePresence, motion } from "framer-motion";

import { Link, NeoButton } from "../TextComponents"
import { MdWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import Header from "../TextComponents/header1"


const Footer = () => {
  const [light, setLight] = useState(true);
  const [subscriberEmail, setSubcriberEmail] = useState('');
  const [errorSubscribeVisible, setErrorSubscribeVisible] = useState(false);

  const handleThemeClick = () => {
    document.documentElement.classList.toggle('dark');
    setLight(!light)
  };
  const db = getFirestore(firebase_app)

  const subscribeToTheCan = async (event) => {
      event.preventDefault();
      try{
        console.log("subscribing to newsletter.");
        await addDoc(collection(db, "SubscriberEmails"), {Email:subscriberEmail});
        console.log("subscribed to newsletter.");
      }
      catch (err){
        setErrorSubscribeVisible(true);
        console.log(err);
      }
        
  }



  return (
    <div className="w-screen bg-neutral-200 w-full flex flex-col h-40 border-t-2 border-t-black lg:border-t-3">
      <div className="w-full px-7 md:p-[50px] pt-[70px] pb-[70px] flex flex-row bg-primary dark:bg-secondary-dark justify-center">
            <div className="flex flex-col gap-[15px] md:w-[784px] w-full">
              <Header type={"lg"} classes="flex flex-wrap text-[6.65vw] md:text-4xl tracking-[-3.76px] md:tracking-[-7.2px] font-bold text-t-header-light gap-[10px] text-t-header-light dark:text-t-dark">
                <span>
                  Subscribe 
                </span>
                <span>
                  To The Can
                </span>
              </Header>
              <form onSubmit={subscribeToTheCan} className="flex flex-row gap-[15px] h-full">
              
                <input onChange={(e) => setSubcriberEmail(e.target.value)} required type="email" name="email" id="email" className=" w-full xs-sm:grow text-xl xs:tracking-[-1.76px]  3xl:h-[2.3vw] 3xl:text-[1.25vw]   lg:text-2xl lg:tracking-[-2.76px]  xl:text-2xl xl:tracking-[-3.32px] tracking-[-5.76px] border-2 lg:border-3 p-1 pr-3 rounded-md shadow-md"/>
                <NeoButton classes={"bg-primary-dark "} type="submit" onSubmit={subscribeToTheCan}>
                  Submit
                </NeoButton>
                <AnimatePresence>
                    {errorSubscribeVisible && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="rounded-md"
                            style={{ background: '#fd6666', marginTop: "5px", padding: "5px", color: "black", marginTop: "15px"}}
                        >
                            Whoa! You may have entered a wrong username or password. Please try again.
                        </motion.div>
                    )}
                </AnimatePresence>
              </form>
        </div>
      </div>
      <div className="w-full  h-max flex flex-row justify-center px-7 md:p-[50px] py-[50px] bg-focous border-t-2 border-t-black dark:bg-base-100-dark lg:border-t-3 ">
        <div className="w-[784px] h-max flex md:flex-row md:h-full flex-col gap-[25px] justify-between">
          <div className="h-full w-full md:w-[22.22%] flex flex-row md:flex-col justify-between">
            <div>
              <div className="w-max md:w-full  text-2.2xl tracking-[-4.5px] font-bold text-t-header-light dark:text-t-dark">
                Can Of Mystery
              </div>
              <img className="w-[35px] md:w-[35px] mt-[10px]" src={"/_next/static/media/uscalogo.f84310d7.png"} alt="Usca Logo"/>
            </div>

            <div className="flex flex-row justify-center" style={{flexDirection: "column", justifyContent: "center", alignItems: "center",  borderRadius: "50px", height: "50px", width: "50px"}}>
                <MdWbSunny className="text-[40px] lg:text-[50px] dark:text-t-header-dark text-t-header-light" onClick={() => handleThemeClick()} style={{ display:`${!light ? "block" : "none"}` }}/>
                <FaMoon className="text-[30px] lg:text-[40px] dark:text-t-header-dark text-t-header-light" onClick={() => handleThemeClick()} style={{display:`${light ? "block" : "none"}`}}/>
              </div>
          </div>
            <div className="h-max w-[22.22%] flex-col justify-items-right gap-[10px] hidden md:flex">
              <div className="w-full  text-2.2xl tracking-[-4.5px] font-bold text-t-header-light dark:text-t-dark">
                Explore
              </div>
              <div className="flex flex-col justify-between gap-[10px]">
                <a className="w-full text-t-header-light dark:text-t-header-dark opacity-75" target="_blank" href='https://www.usca.edu/' rel="noopener noreferrer">
                  USCA
                </a>
                <Link href="citations">
                  MLA Citations
                </Link>
                <Link href="blog">
                  Articles
                </Link>
                <Link href="canitems">
                  Can Items
                </Link>
                <a className="w-full text-t-header-light dark:text-t-header-dark opacity-75" target="_blank" href="https://github.com/apodicticscott/ModularBlogPlatform/" rel="noopener noreferrer">
                  Our Project
                </a>
                <a className="w-full text-t-header-light dark:text-t-header-dark opacity-75" target="_blank" href="" rel="noopener noreferrer">
                  Old Can Of Mystery
                </a>
              </div>
            </div>
            <div className="h-max w-[22.22%] flex-col justify-items-right gap-[10px] text-right md:text-left hidden md:flex">
              <div className="w-full  text-2.2xl tracking-[-4.5px] font-bold text-t-header-light dark:text-t-dark">
                Quick Links
              </div>
              <div className="flex flex-wrap justify-between gap-[10px]">
                <Link href="/">
                  Home
                </Link>
                <Link href="/about">
                  About
                </Link>
                <Link href="/login">
                  Login
                </Link>
                <Link href="/admin">
                  Admin Dashboard
                </Link>
                <a className="w-full text-t-header-light dark:text-t-header-dark opacity-75" target="_blank" href="https://github.com/apodicticscott/ModularBlogPlatform/" rel="noopener noreferrer">
                  Our Project
                </a>
                <Link href="instructions">
                  Instructions
                </Link>
              </div>
            </div>
          <div className="flex flex-row visible md:hidden">
            <div className="h-max w-[50%] flex flex-col justify-items-right gap-[10px]">
              <div className="w-full  text-2.2xl tracking-[-4.5px] font-bold text-t-header-light dark:text-t-dark">
                Explore
              </div>
              <div className="flex flex-wrap justify-between gap-[10px]">
              <a className="w-full text-t-header-light dark:text-t-header-dark opacity-75" target="_blank" href='https://www.usca.edu/' rel="noopener noreferrer">
                  USCA
                </a>
                <Link href="citations">
                  MLA Citations
                </Link>
                <Link href="blog">
                  Articles
                </Link>
                <Link href="canitems">
                  Can Items
                </Link>
                <a className="w-full text-t-header-light dark:text-t-header-dark opacity-75" target="_blank" href="https://github.com/apodicticscott/ModularBlogPlatform/" rel="noopener noreferrer">
                  Our Project
                </a>
                <a className="w-full text-t-header-light dark:text-t-header-dark opacity-75" target="_blank" href="" rel="noopener noreferrer">
                  Old Can Of Mystery
                </a>
              </div>
            </div>
            <div className="h-max w-[50%] flex flex-col justify-items-right gap-[10px] text-right">
              <div className="w-full  text-2.2xl tracking-[-4.5px] font-bold text-t-header-light dark:text-t-dark">
                Quick Links
              </div>
              <div className="flex flex-wrap justify-between gap-[10px] text-t-header-light dark:text-t-dark">
                <Link href="/">
                  Home
                </Link>
                <Link href="/about">
                  About
                </Link>
                <Link href="/login">
                  Login
                </Link>
                <Link href="/admin">
                  Admin Dashboard
                </Link>
                <Link href="/">
                  Our Project
                </Link>
                <Link href="/">
                  Instructions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
