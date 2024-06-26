import React, {useState} from "react";
import { getFirestore, collection, addDoc} from "firebase/firestore"
import  firebase_app  from "../../firebase/config"
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "../TextComponents/Link"
import NeoButton from "../TextComponents/NeoButton";
import { MdWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import Header from "../TextComponents/Header1"
import { usePathname } from "next/navigation";


const Footer = () => {
  const [light, setLight] = useState(true);
  const [subscriberEmail, setSubcriberEmail] = useState('');
  const [errorSubscribeVisible, setErrorSubscribeVisible] = useState(false);
  const pathname = usePathname(); // Use the useRouter hook to get the router object

  const router = useRouter();

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

  console.log(pathname)

  return (
    <div className={`w-screen  w-full flex flex-col h-40  ${(pathname !== '/admin'  && !pathname.includes("/editor")) && "bg-neutral-200 border-t-black border-t-3 dark:border-t-2 dark:border-t-[#302c38]"}`}>
      {(pathname !== '/admin'  && !pathname.includes("/editor")) && 
        <div className="w-full px-7 md:p-[50px] pt-[70px] pb-[70px] flex flex-row bg-primary dark:bg-secondary-dark justify-center">
                <div className="flex flex-col gap-[15px] md:w-[784px] w-full">
                  <Header type={"lg"} classes="flex flex-wrap gap-[10px] text-t-header-light dark:text-t-dark">
                    <span style={{letterSpacing: "inherit"}}>
                      Subscribe 
                    </span>
                    <span style={{letterSpacing: "inherit"}}>
                      To The Can
                    </span>
                  </Header>
                  <form onSubmit={subscribeToTheCan} className="flex flex-row gap-[15px] h-max max-h-[54px]">
                    <input onChange={(e) => setSubcriberEmail(e.target.value)} required type="email" name="email" id="email" className="w-full grow text-xl xs:tracking-[-1.76px] 3xl:text-[1.25vw]   lg:text-2xl lg:tracking-[-2.76px]  xl:text-2xl xl:tracking-[-3.32px] tracking-[-5.76px] border-2 lg:border-3 p-1 pr-3 rounded-md shadow-md"/>
                    <NeoButton classes={"bg-primary-dark p-1"} type="submit" onSubmit={subscribeToTheCan}>
                      Submit
                    </NeoButton>
                  </form>
            </div>
          </div>
    }
      <div className="w-full  h-max flex flex-row justify-center px-7 md:p-[50px] py-[50px] bg-focous  border-t-black dark:border-t-[#302c38] dark:bg-base-100-dark border-t-3 ">
        <div className="w-[784px] h-max flex md:flex-row md:h-full flex-col gap-[25px] justify-between">
          <div className="h-full w-full md:w-[22.22%] flex flex-row md:flex-col justify-between">
            <div className="flex flex-col">
              <Header type="sm">
                Can Of Mystery
              </Header>
              <div className="flex items-center gap-[15px]">
                <img className="w-[35px] md:w-[35px] dark:filter dark:invert" src={"/_next/static/media/uscalogo.f84310d7.png"} alt="Usca Logo"/>
                <div className="h-full flex flex-row justify-center items-center" style={{flexDirection: "column", justifyContent: "center", alignItems: "center",  borderRadius: "50px", height: "50px", width: "50px"}}>
                  <MdWbSunny className="text-4xl dark:text-t-header-dark text-t-header-light hover:cursor-pointer" onClick={() => handleThemeClick()} style={{ display:`${!light ? "block" : "none"}` }}/>
                  <FaMoon className="text-3xl dark:text-t-header-dark text-t-header-light hover:cursor-pointer" onClick={() => handleThemeClick()} style={{display:`${light ? "block" : "none"}`}}/>
                </div>
              </div>
            </div>


          </div>
            <div className="h-max w-[22.22%] flex-col justify-items-right gap-[10px] hidden md:flex">
              <Header type="sm">
                Explore
              </Header>
              <div className="flex flex-col justify-between gap-[10px]">
                <Link classes="w-full text-t-light tracking-[-2.3px]  decoration-t-light dark:font-light" target="_blank" href='https://www.usca.edu/' rel="noopener noreferrer">
                  USCA
                </Link>
                <Link classes={"text-t-light tracking-[-2.3px]  decoration-t-light dark:font-light"} onClick={() => router.push("/pages/citation-guide", undefined, {shallow: true})}>
                  MLA Citations
                </Link>
                <Link classes={"text-t-light tracking-[-2.3px]  decoration-t-light dark:font-light"} onClick={() => router.push("/search", undefined, {shallow: true})}>
                  Articles
                </Link>
                <Link classes="w-full text-t-light tracking-[-2.3px]  decoration-t-light dark:font-light" target="_blank" href="https://github.com/apodicticscott/ModularBlogPlatform/" rel="noopener noreferrer">
                  Our Project
                </Link>
                <Link classes="w-full text-t-light tracking-[-2.3px]  decoration-t-light dark:font-light" target="_blank" href="https://canofmystery.blogspot.com/" rel="noopener noreferrer">
                  Old Can Of Mystery
                </Link>
              </div>
            </div>
            <div className="h-max w-[22.22%] flex-col justify-items-right gap-[10px] text-right md:text-left hidden md:flex">
              <Header type="sm">
                Quick Links
              </Header>
              <div className="flex flex-wrap justify-between gap-[10px]">
                <Link classes={"text-t-light tracking-[-2.3px]  decoration-t-light dark:font-light"} onClick={() => router.push("/", undefined, {shallow: true})}>
                  Home
                </Link>
                <Link classes={"text-t-light tracking-[-2.3px]  decoration-t-light dark:font-light"} onClick={() => router.push("/pages/about", undefined, {shallow: true})}>
                  About
                </Link>
                <Link classes={"text-t-light tracking-[-2.3px]  decoration-t-light dark:font-light"} onClick={() => router.push("/login", undefined, {shallow: true})}>
                  Login
                </Link>
                <Link classes={"text-t-light tracking-[-2.3px]  decoration-t-light dark:font-light"} onClick={() => router.push("/admin", undefined, {shallow: true})}>
                  Admin Dashboard
                </Link>
                <Link classes="w-full text-t-light tracking-[-2.3px]  decoration-t-light text-t-header-light dark:text-t-header-dark dark:font-light" target="_blank" href="https://github.com/apodicticscott/ModularBlogPlatform/" rel="noopener noreferrer">
                  Our Project
                </Link>
                <Link classes={"text-t-light tracking-[-2.3px]  decoration-t-light dark:font-light"} onClick={() => router.push("/pages/instructions", undefined, {shallow: true})}>
                  Instructions
                </Link>
              </div>
            </div>
          <div className="flex flex-row visible md:hidden">
            <div className="h-max w-[50%] flex flex-col justify-items-right gap-[10px]">
              <Header type="sm">
                Explore
              </Header>
              <div className="flex flex-wrap justify-between gap-[10px]">
                <Link classes="w-full text-t-light tracking-[-2.3px]  decoration-t-light text-t-header-light dark:text-t-header-dark dark:font-light" target="_blank" href='https://www.usca.edu/' rel="noopener noreferrer">
                  USCA
                </Link>
                <Link classes={"text-t-light tracking-[-2.3px]  decoration-t-light dark:font-light"} onClick={() => router.push("/pages/citation-guide", undefined, {shallow: true})}>
                  MLA Citations
                </Link>
                <Link classes={"text-t-light tracking-[-2.3px]  decoration-t-light dark:font-light"} onClick={() => router.push("/search", undefined, {shallow: true})}>
                  Articles
                </Link>
                <Link classes={"text-t-light tracking-[-2.3px]  decoration-t-light dark:font-light"} onClick={() => router.push("/search", undefined, {shallow: true})}>
                  Can Items
                </Link>
                <Link classes="w-full text-t-light tracking-[-2.3px]  decoration-t-light dark:font-light" target="_blank" href="https://github.com/apodicticscott/ModularBlogPlatform/" rel="noopener noreferrer">
                  Our Project
                </Link>
                <Link classes="w-full text-t-light tracking-[-2.3px]  decoration-t-light dark:font-light" target="_blank" href="" rel="noopener noreferrer">
                  Old Can Of Mystery
                </Link>
              </div>
            </div>
            <div className="h-max w-[50%] flex flex-col justify-items-right gap-[10px] text-right">
              <Header type="sm">
                Explore
              </Header>
              <div className="flex flex-wrap justify-between gap-[10px] text-t-header-light dark:text-t-dark">
                <Link classes={"text-t-light tracking-[-2.3px]  decoration-t-light dark:font-light"} onClick={() => router.push("/", undefined, {shallow: true})}>
                  Home
                </Link>
                <Link classes={"text-t-light tracking-[-2.3px]  decoration-t-light dark:font-light"} onClick={() => router.push("/about", undefined, {shallow: true})}>
                  About
                </Link>
                <Link classes={"text-t-light tracking-[-2.3px]  decoration-t-light dark:font-light"} onClick={() => router.push("/login", undefined, {shallow: true})}>
                  Login
                </Link>
                <Link classes={"text-t-light tracking-[-2.3px]  decoration-t-light dark:font-light"} onClick={() => router.push("/admin", undefined, {shallow: true})}>
                  Admin Dashboard
                </Link>
                <Link classes="w-full text-t-light tracking-[-2.3px]  decoration-t-light dark:font-light" target="_blank" href="https://github.com/apodicticscott/ModularBlogPlatform/" rel="noopener noreferrer">
                  Our Project
                </Link>
                <Link classes={"text-t-light tracking-[-2.3px]  decoration-t-light dark:font-light"} href="/">
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
