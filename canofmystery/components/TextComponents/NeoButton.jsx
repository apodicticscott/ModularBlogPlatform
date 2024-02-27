import React from "react";

const NeoButton = ({children, style}) => {

    return(
        <button className={`text-xl xs:tracking-[-1.76px] 3xl:w-[11vw]  3xl:h-[2.3vw] 3xl:text-[1.25vw]   lg:text-2xl lg:tracking-[-2.76px]  xl:text-2xl xl:tracking-[-3.32px] tracking-[-5.76px] border-2 lg:border-3 p-1 pr-3 rounded-md bg-primary-dark shadow-md ${style}`}>
            {children}
        </button>
    )
}

export default NeoButton;