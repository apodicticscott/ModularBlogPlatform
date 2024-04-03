import React from "react"

const largeParagraph = ({children, classes}) => {
    
    return(
        <>
            <p className={`tracking-[-2.76px] text-2.5xl 2xl:text-2.7xl 3xl:w-full 3xl:text-[1.25vw] xl:tracking-[-3.32px] h-max text-t-header-light dark:text-t-dark font-light dark:font-extralight ${classes}`}>
                {children}
            </p>
        </>
    )
}

export default largeParagraph;