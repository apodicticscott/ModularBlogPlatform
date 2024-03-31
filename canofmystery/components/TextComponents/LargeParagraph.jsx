import React from "react"

const largeParagraph = ({children, classes}) => {
    
    return(
        <>
            <p className={`text-xl tracking-[-1.76px] md:text-2xl tracking-[-2.76px] xl:text-2.5xl 2xl:text-2.7xl 3xl:w-full 3xl:text-[1.25vw] xl:tracking-[-3.32px]      h-max text-t-header-light dark:text-t-dark mr-[10vw]  ${classes}`}>
                {children}
            </p>
        </>
    )
}

export default largeParagraph;