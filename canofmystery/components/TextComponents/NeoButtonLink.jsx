import React from "react";

const NeoButtonLink = ({children, link, style}) => {

    return(
        <a href={link}>
            <button className={`text-xl xs:tracking-[-1.76px] w-max  3xl:h-max 3xl:text-2.5xl   lg:text-2xl lg:tracking-[-2.76px]  xl:text-2xl xl:tracking-[-3.32px] tracking-[-5.76px] border-2 lg:border-3 p-1 pr-3 rounded-md bg-base-100 shadow-md ${style}`}>
                {children}
            </button>
        </a>

    )
}

export default NeoButtonLink;