import React from "react";
import styles from "./footer.module.css";

import { Link, LargeHeader } from "../TextComponents"

const Footer = () => {
  return (
    <div className="w-screen bg-neutral-200 w-full flex flex-col h-40 border-t-2 border-t-black lg:border-t-3">
      <div className="w-full px-7 md:p-[50px] pt-[70px] pb-[70px] flex flex-row bg-primary dark:bg-secondary-dark justify-center">
            <div className="flex flex-col gap-[15px] md:w-[784px] w-full">
              <LargeHeader className="flex flex-wrap text-3xl md:text-4xl tracking-[-3.76px] md:tracking-[-7.2px] font-bold text-t-header-light gap-[10px] text-t-header-light dark:text-t-dark">
                <span>
                  Subscribe 
                </span>
                <span>
                  To The Can
                </span>
              </LargeHeader>
              <div className="flex flex-row gap-[15px] ">
                <input className="grow text-xl xs:tracking-[-1.76px] 3xl:h-[2.3vw] 3xl:text-[1.25vw]   lg:text-2xl lg:tracking-[-2.76px]  xl:text-2xl xl:tracking-[-3.32px] tracking-[-5.76px] border-2 lg:border-3 p-1 pr-3 rounded-md shadow-md">
              
                </input>
                <button className="grow-0 text-xl xs:tracking-[-1.76px] 3xl:w-[11vw]  3xl:h-[2.3vw] 3xl:text-[1.25vw]   lg:text-2xl lg:tracking-[-2.76px]  xl:text-2xl xl:tracking-[-3.32px] tracking-[-5.76px] border-2 lg:border-3 p-1 pr-3 rounded-md bg-primary-dark shadow-md">
                  Submit
                </button>
              </div>
        </div>
      </div>
      <div className="w-full  h-max flex flex-row justify-center px-7 md:p-[50px] py-[50px] bg-focous border-t-2 border-t-black dark:bg-base-100-dark lg:border-t-3 ">
        <div className="w-[784px] h-max flex md:flex-row flex-col gap-[25px] justify-between">
          <div className="h-max w-full md:w-[22.22%] flex flex-row md:flex-col justify-between">
            <div className="w-max md:w-full  text-2.2xl tracking-[-4.5px] font-bold text-t-header-light dark:text-t-dark">
              Can Of Mystery
            </div>
            <img className="w-[35px] md:w-[35px] mt-[10px]" src={"/_next/static/media/uscalogo.f84310d7.png"} alt="Usca Logo"/>
          </div>
            <div className="h-max w-[22.22%] flex-col justify-items-right gap-[10px] hidden md:flex">
              <div className="w-full  text-2.2xl tracking-[-4.5px] font-bold text-t-header-light dark:text-t-dark">
                Explore
              </div>
              <div className="flex flex-col justify-between gap-[10px]">
                <Link href="www.usca.edu">
                  USCA
                </Link>
                <Link href="www.usca.edu">
                  MLA Citations
                </Link>
                <Link href="www.usca.edu">
                  Articles
                </Link>
                <Link href="www.usca.edu">
                  Can Items
                </Link>
                <Link href="www.usca.edu">
                  Our Project
                </Link>
                <Link href="www.usca.edu">
                  Old Can Of Mystery
                </Link>
              </div>
            </div>
            <div className="h-max w-[22.22%] flex-col justify-items-right gap-[10px] text-right md:text-left hidden md:flex">
              <div className="w-full  text-2.2xl tracking-[-4.5px] font-bold text-t-header-light dark:text-t-dark">
                Quick Links
              </div>
              <div className="flex flex-wrap justify-between gap-[10px]">
                <Link href="www.usca.edu">
                  Home
                </Link>
                <Link href="www.usca.edu">
                  About
                </Link>
                <Link href="www.usca.edu">
                  Login
                </Link>
                <Link href="www.usca.edu">
                  Account
                </Link>
                <Link href="www.usca.edu">
                  Our Project
                </Link>
                <Link href="www.usca.edu">
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
                <Link href="www.usca.edu">
                  USCA
                </Link>
                <Link href="www.usca.edu">
                  MLA Citations
                </Link>
                <Link href="www.usca.edu">
                  Articles
                </Link>
                <Link href="www.usca.edu">
                  Can Items
                </Link>
                <Link href="www.usca.edu">
                  Our Project
                </Link>
                <Link href="www.usca.edu">
                  Old Can Of Mystery
                </Link>
              </div>
            </div>
            <div className="h-max w-[50%] flex flex-col justify-items-right gap-[10px] text-right">
              <div className="w-full  text-2.2xl tracking-[-4.5px] font-bold">
                Quick Links
              </div>
              <div className="flex flex-wrap justify-between gap-[10px] text-t-header-light dark:text-t-dark">
                <Link href="www.usca.edu">
                  Home
                </Link>
                <Link href="www.usca.edu">
                  About
                </Link>
                <Link href="www.usca.edu">
                  Login
                </Link>
                <Link href="www.usca.edu">
                  Account
                </Link>
                <Link href="www.usca.edu">
                  Our Project
                </Link>
                <Link href="www.usca.edu">
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
