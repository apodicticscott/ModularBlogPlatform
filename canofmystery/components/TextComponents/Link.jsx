import React from "react";

const Link = ({href, children}) => {
    
    return(
      <a href={href} className="w-full text-t-header-light dark:text-t-header-dark opacity-100">
        {children}
      </a>  
    )
}

export default Link;