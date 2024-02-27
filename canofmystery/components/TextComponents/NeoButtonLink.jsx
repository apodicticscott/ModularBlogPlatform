import React from "react";

const NeoButtonLink = ({children, link, style, bgcolor="primary-dark"}) => {

    return(
        <a href={link} className={`text-3xl p-[5px] mr-[5px] bg-base-100 w-min-[50px] w-min whitespace-nowrap flex flex-wrap justify-between items-center h-max border-2 p-1 pr-3 rounded-md text-t-header-light bg-${bgcolor} shadow-md ${style}`}>{children}</a>
    )
}

export default NeoButtonLink;