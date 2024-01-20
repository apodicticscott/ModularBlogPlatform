import React from "react"

const LargeHeader= ({children}) => {
    return(
        <div className="flex flex-wrap text-3xl md:text-4xl tracking-[-3.76px] md:tracking-[-7.2px] font-bold text-t-header-light gap-[10px] text-t-header-light dark:text-t-dark">
            {children}
        </div>
    )
} 

export default LargeHeader;