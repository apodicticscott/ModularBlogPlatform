import React from "react";

const link = ({href, children}) => {
    
    return(
      <a href={href} className="w-full text-t-header-light dark:text-t-header-dark opacity-75">
        {children}
      </a>  
    )
}

export default link;