import React from "react";

const DropDownItem = ({link, title, background, classes, children }) => {
    return (
        <div className={`flex flex-col justify-center lg:m-2 items-row gap-1 lg:my-0 lg:h-[100%] ${classes}`}>
            <a href={link}>
                {title}
            </a>

            <div className={`neoDropDownItem w-full h-full lg:h-2/3 flex flex-col justify-center items-center overflow-hidden rounded-md border-3 shadow-md transition duration-100 hover:scale-[1.05] hover:shadow-md-move ${background}`}>
                <div className="neoButton-animation z-0 ">
                    <div className="neoButton-rectangle w-[100px]">
        
                    </div>
                </div>
                <div className="w-full h-full z-10 flex items-center justify-center">
                    {children}
                </div>
                
            </div>
        </div>
    );
};

export default DropDownItem;