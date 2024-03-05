import React from "react";

const NeoButton = ({children, classes, onClick}) => {

    return(
        <button onClick={onClick} className={`text-xl xs:tracking-[-1.76px] w-max  3xl:h-max 3xl:text-2.5xl   lg:text-xl lg:tracking-[-2.76px]  xl:tracking-[-2.32px] tracking-[-5.76px] border-2 lg:border-3 p-1 pr-3 rounded-md shadow-md   ${classes}`}>
            {children}
        </button>
    )
}

export default NeoButton;