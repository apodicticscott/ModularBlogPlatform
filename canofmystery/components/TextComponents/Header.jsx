import React from "react";

const header = ({children}) => {
    return(

        <div className={`flex flex-wrap text-3xl 3xl:text-[1.5vw] font-bold tracking-[-5.76px] `}>
            {children}
        </div>
    )
}

export default header