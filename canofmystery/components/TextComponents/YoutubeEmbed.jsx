
import React, { useState, useRef } from "react";




const YoutubeEmbed = ({embededId}) => {
    return (
        <div className="w-full h-min flex flex-col items-center gap-[15px] pointer-events-none" style={{ padding: '20px', textAlign: 'center', lineHeight: '180px' }}>
                <iframe
                className="w-full h-[400px]"
                src={`https://www.youtube-nocookie.com/embed/${embededId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                title="Embedded youtube"
                />
        </div>
    );
};

export default YoutubeEmbed;
