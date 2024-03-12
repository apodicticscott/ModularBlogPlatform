import React from "react";

const Loader = () => {
    return(
        <div className="h-screen w-screen flex items-center ">
            <div class="loader">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    )
}

export default Loader;