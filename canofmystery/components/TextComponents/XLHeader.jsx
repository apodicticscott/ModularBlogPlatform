import React from "react"

const XLHeader= ({children, style}) => {
    return(
        <div className={`flex flex-wrap text-3xl md:text-4xl 3xl:text-[3.5vw] tracking-[-3.76px] md:tracking-[-4.76px] lg:text-6xl lg:tracking-[-13px] 2xl:text-7xl 2xl:tracking-[-15px] font-bold text-t-header-light dark:text-t-dark ${style}`}>
            {children}
        </div>
    )
} 

export default XLHeader;