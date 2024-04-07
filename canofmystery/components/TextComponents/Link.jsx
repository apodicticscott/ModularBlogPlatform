import React from "react";

const Link = ({href, children, classes, isUnderlined, onClick, hover}) => {
    

    return(
      <a href={href} onClick={onClick} className={`w-full   ${!hover && "opacity-70 text-t-header-light dark:text-t-header-dark"} cursor-pointer transition duration-50 hover:opacity-100 tracking-tighter  ${classes}`}>
        {children}
      </a>  
    )
}

export default Link;