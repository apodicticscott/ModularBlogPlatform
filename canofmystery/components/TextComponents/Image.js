
import React, { useState, useRef } from "react";




const Image = ({src}) => {

    return (
        <div className="w-full h-min flex flex-col items-center gap-[15px] pointer-events-none" style={{ padding: '20px', textAlign: 'center', lineHeight: '180px' }}>
            <img src={src} width="auto" height="auto" alt="Uploaded Image" className="neo-bottom-xl"/>
        </div>
    );
};

export default Image;
