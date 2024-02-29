'use client'
import React from "react";
import Tag from "../TextComponents/NeoTag";
import LanderLayout from "../Layout/LanderLayout"
import NeoButton from "../TextComponents/NeoButton"
import Header from "../TextComponents/Header1"
import Paragraph from "../TextComponents/Paragraph";





const UseUsAsASource = () => {
    return (
        <>
            <div className="flex justify-start px-[50px] items-center w-full h-[700px] ">

                <div className="bg-base-300 rounded-lg max-w-[500px]  letter-parent shadow-lg flex items-center">
                    <div className="w-[500px] h-[500px] bg-base-300 border-3 rounded-lg letter z-10 ">
                        <div className="w-[500px] h-[500px] bg-dark-red border-3 rounded-lg letter z-10">
                            <div className="w-[500px] h-[500px] bg-base-300 rounded-lg letter-fold " >
                                <div className="w-[500px] h-[500px] bg-base-100 rounded-lg letter-fold bg-dark-red" >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end items-center min-w-[calc(100vw_-_100px)] bg-base-100 h-[450px] relative left-[-500px] z-0 rounded-lg border-3 shadow-lg p-[50px]">
                        <div className="flex flex-col justify-start max-w-[500px] h-full pr-[50px] mr-[50px] border-r-3">
                            <Header type="lg" classes={"mb-[50px]"}>
                                Use our work as a resource.
                            </Header>
                            <NeoButton>
                                Full Citation Guide
                            </NeoButton>
                        </div>
                        <div className="max-w-[500px] h-full flex items-center">
                            <p className="lg:text-2.5xl">
                            We encourage you to use our resources and articles. If you are using this resource for an article or assignment of your own, or re-posting information from our blog for any reason, please credit the post's author, or if it is quoted/referenced material in our post please find and credit the original source...especially in the case of photographs.
                            </p > 
                        </div>

                    </div>
                </div>

            </div>

        </>
    );
};

export default UseUsAsASource;


// We encourage you to use our resources and articles. If you are using this resource for an article or assignment of your own, or re-posting information from our blog for any reason, please credit the post's author, or if it is quoted/referenced material in our post please find and credit the original source...especially in the case of photographs.

