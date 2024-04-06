import React from "react";
import { useRouter } from "next/navigation";

const DropDownItem = ({href, title, background, classes, children }) => {
    const router = useRouter();

    return (
        <div className={`flex flex-col justify-center lg:m-2 items-row gap-1 lg:my-0 lg:h-[100%] ${classes}`}>
            <a href={href}>
                {title}
            </a>

            <div onClick={() => router.push(href, undefined, {shallow: true})} className={`neoDropDownItem w-full h-full lg:h-2/3 cursor-pointer flex flex-col justify-center items-center overflow-hidden rounded-md border-3 shadow-md dark:shadow-none dark:border-[#302c38] dark:border-2 hover:dark:shadow-md-move-dark transition duration-100 hover:scale-[1.05] hover:shadow-md-move ${background}`}>
                <div className="neoButton-animation z-0 ">
                    <div className="neoButton-rectangle w-[100px]">
        
                    </div>
                </div>
                <div className="w-full h-full z-10 flex items-center justify-center">
                    {children}
                </div>
                
            </div>
        </div>
    );
};

export default DropDownItem;