import React from "react";
// Assuming the import paths are correct and the components exist
import { Header, XLHeader, LargeParagraph } from "../../textComponents";

// Changed function signature to accept props as an object
// Destructured left, right, and bottom from props
const Lander = ({ left, right, bottom, styleName }) => {
    return (
        <div className="h-max w-screen 3xl:h-[60vw] 3xl:max-h-screen overflow-hidden flex flex-col lg:flex-row bg-base-100">
            <div className={`h-full w-[100%] mt-16 pt-[10px] lg:mt-0 lg:w-full flex flex-col justify-between lg:flex-row lg:items-center  lg:border-b-3 lg:border-b-0 lg:border-r-black lg:border-r-3 ${ (styleName === "lander") ? "bg-primary dark:bg-secondary-dark dark:bg-base-100-dark text-t-header-light bg-base-100 " : "bg-base-100 dark:bg-base-100-dark"}`}>
                <div className="3xl:flex 3xl:flex-col 3xl:w-[60vw] w-full xs:h-max xs-sm:h-[400px] lg:h-max px-7 xs:pb-[150px] lg:px-0 py-[20px] lg:py-0 3xl:items-start 3xl:pr-[50px]">
                    {left}
                </div>
                <div className="xs:h-[450px] xs-sm:h-[450px] lg:w-[925px] lg:hidden px-7 lg:pt-28 flex flex-col justify-end dark:bg-base-100-dark text-t-header-light bg-base-100 dark:text-t-dark border-y-2 border-b-black"> 
                    
                    {
                        (styleName === "lander") 
                        ?
                        <>
                        {bottom}
                        </>
                        :
                        <div className="h-min w-full h-[450px]">
                            <div className="w-full h-0">
                                <div className="relative top-[-200px] w-full h-[450px] rounded-lg bg-secondary border-2 lg:border-3 my-[26px] shadow-lg relative">
                                </div>
                             </div>   
                        </div>
                    }
                </div>
                <div className={`h-full w-[784px] 3xl:w-[60vw] 3xl:px-[2.5vw] hidden lg:flex ${ (styleName === "lander") ? "px-14 pt-28" : "px-14 pb-24 pt-9" } flex flex-col border-l-3 border-l-black justify-center dark:text-t-dark ${ (styleName === "lander") ? "dark:bg-base-100-dark text-t-header-light bg-base-100 " : "bg-primary dark:bg-base-100-dark"}`}> 
                    {
                        (styleName === "lander") 
                        ?
                        <>
                        {bottom}
                        </>
                        :
                        <div className="h-min w-[650px] h-[450px]">
                            <div className="w-full">
                                <div className="relative left-[-500px] w-[1000px] h-[450px] rounded-lg bg-secondary border-2 lg:border-3 my-[26px] shadow-lg relative">
                                </div>
                             </div>   
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Lander;
