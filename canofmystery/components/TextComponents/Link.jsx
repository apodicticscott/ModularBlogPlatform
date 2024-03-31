import React from "react";

const Link = ({href, children, classes}) => {
    
    return(
      <a href={href} className={`w-full text-t-header-light dark:text-t-header-dark opacity-100 hover:underline  ${classes}`}>
        {children}
      </a>  
    )
}

export default Link;