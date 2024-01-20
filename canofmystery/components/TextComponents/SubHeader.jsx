import React from "react";

const SubHeader = ({children}) => {
    
    return(
      <div className="w-full  text-2.2xl tracking-[-4.5px] font-bold">
        {children}
      </div>
    )
}

export default SubHeader;