import React from "react"

const LargeParagraph = ({children}) => {
    
    return(
        <>
            <p className="text-xl mt-[15px] tracking-[-1.76px] lg:text-2xl tracking-[-2.76px] xl:text-2.5xl 2xl:text-2.7xl 3xl:w-full 3xl:text-[1.25vw] xl:tracking-[-3.32px] lg:mt-[30px] lg:w-[80%]  xl:mr-[118px]  h-max text-t-header-light dark:text-t-dark">
                {children}
            </p>
        </>
    )
}

export default LargeParagraph;