import React from "react"

export default function loading() {
    return(
        <div className={`w-full h-[100vh] h-0 z-10 `}> 
            <div className={`w-full h-full  flex justify-center items-center bg-base-100`}>
                <div className="relative loader-container">
                    <div className="block-dark"></div>
                    <div className="block-dark"></div>
                    <div className="block-dark"></div>
                    <div className="block-dark"></div>
                </div>
            </div>
        </div>
    )

}