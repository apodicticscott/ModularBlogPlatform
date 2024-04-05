import React from "react";

const Link = ({href, children, classes, isUnderlined, onClick}) => {
    

    return(
      <a href={href} onClick={onClick} className={`w-full text-t-header-light dark:text-t-header-dark opacity-70 cursor-pointer transition duration-50 hover:opacity-100 tracking-tighter ${classes}`}>
        {children}
      </a>  
    )
}

export default Link;