
import React, { useState, useRef } from "react";
import useDocumentClassChange from "../../hooks/useDocumentClassChange"



const Image = ({src}) => {

    const currentTheme = useDocumentClassChange()

    return (
        <div className="w-full h-min flex flex-col items-center gap-[15px] pointer-events-none" style={{ padding: '20px', textAlign: 'center', lineHeight: '180px' }}>
            <img src={src} width="auto" height="auto" alt="Uploaded Image" className={`${currentTheme === "dark" ? "shadow-md-move-dark rounded-md border-2 border-[#302c38]" : "neo-bottom-lg"}`}/>
        </div>
    );
};

export default Image;
