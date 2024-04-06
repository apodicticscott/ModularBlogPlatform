import React from "react";

const neoButtonLink = ({children, link, style}) => {

    return(
        <a href={link}>
            <button className={`text-xl xs:tracking-[-1.76px] w-max  3xl:h-max 3xl:text-2.5xl   lg:text-2xl lg:tracking-[-2.76px]  xl:text-2xl xl:tracking-[-3.32px] tracking-[-5.76px] border-3 dark:border-[#8e83a1] dark:border-[1px] p-1 pr-3 rounded-md bg-base-100 shadow-md dark:shadow-none ${style}`}>
                {children}
            </button>
        </a>

    )
}

export default neoButtonLink;