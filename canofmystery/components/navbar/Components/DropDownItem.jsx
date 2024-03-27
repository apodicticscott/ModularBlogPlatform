import React from "react";

const DropDownItem = ({link, title, background, classes, children }) => {
    const swsDropItemTop = "explore-itm-top-size-xs   sm:explore-itm-top-size-md  lg:explore-itm-size-lg  xl:explore-itm-size-xl 2xl:explore-itm-size-2xl";
    const swsDropBtn = "neo-bottom-sm md:neo-bottom-lg md:neo-bottom-xl lg:neo-bottom-xl xl:neo-bottom-xl";

    return (
        <div className={`flex flex-col justify-center lg:m-2 md:mx-2 mx-2 items-row gap-1 my-3 lg:my-0 ${classes} ${swsDropItemTop}`}>
            <a href={link}>
                {title}
            </a>
            
            <div className={`w-full h-full lg:h-2/3 flex flex-col justify-center items-center overflow-hidden ${background}  ${swsDropBtn}`}>
                {children}
            </div>
        </div>
    );
};

export default DropDownItem;