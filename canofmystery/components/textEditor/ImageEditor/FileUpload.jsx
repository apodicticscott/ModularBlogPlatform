import React, { useState, useRef, useCallback } from "react";
import CropUtils from "./CropUtils"
import { FaImage, FaUpload } from "react-icons/fa";
import { MdOutlineDownloadDone, MdCrop, MdImageNotSupported } from "react-icons/md";
import axios from 'axios';



const FileUpload = ({addImage, enableCrop, isCropEnabled, imageToCrop, setImageToCrop, croppedImage, setCroppedImage, isImageAddOpen, removeImage, type}) => {
    const fileInputRef = useRef(null);


    const handleFileSelect = (event) => {
        if (event.target.files && event.target.files.length > 0) {
          const reader = new FileReader();
    
          reader.addEventListener("load", () => {
            const image = reader.result;
    
            setImageToCrop(image)
          });
    
          reader.readAsDataURL(event.target.files[0]);
        }
        if(type === "cover"){
            enableCrop(true, type)
        }
        
    };


    const handleRemoveImage = () => {
        removeImage()
        enableCrop(false, type)
    };

    const handleAddImage = () => {
        if(type !== "cover"){
            if(croppedImage){
                addImage("image", croppedImage)
                isImageAddOpen(false)
            }else{
                addImage("image", imageToCrop)
                isImageAddOpen(false)
            }
        }

        enableCrop(false, '')

    }





    return(
        <>  
        <div className="w-full h-min flex flex-col items-center  " style={{ textAlign: 'center', lineHeight: '180px' }}>
            <div className="flex items-center justify-between w-full h-[50px] bg-base-300 rounded-t-md">
                <div className="w-max h-max flex px-[15px] gap-[15px]">
                    <div className="h-max w-max" onClick={() => {handleRemoveImage()}}>
                        <MdImageNotSupported className={`text-2.5xl text-base-100 ${imageToCrop ? "relative" : "hidden"}`} onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} />
                    </div>
                    {
                        (type === "comp")
                        &&
                        <div  className="h-max w-max " onClick={() => {enableCrop(true, type); setImageToCrop(imageToCrop)}}>
                            <MdCrop className={`text-2.5xl text-base-100 ${imageToCrop ? "relative" : "hidden"}`}  onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} /> 
                        </div>     
                    }

                </div>
                <div  className="h-max w-max px-[15px]" onClick={() => {(type !== "cover") && handleAddImage()}}>
                    {
                        (type === "cover")
                        ?
                        <div  className="h-max w-max " onClick={() => {enableCrop(true, type); console.log(true, type); setImageToCrop(imageToCrop)}}>
                            {
                                !isCropEnabled
                                &&
                                <MdCrop className={`text-2.5xl text-base-100 ${imageToCrop ? "relative" : "hidden"}`}  onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} /> 
                            }
                        </div>
                        :
                        <MdOutlineDownloadDone className={`text-2.7xl  text-base-100 ${imageToCrop ? "relative" : "hidden"}`} onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} /> 
                    }
                    
                </div>

                
            </div>
            <div
                className={`h-full w-full sm:w-full h-[200px] rounded-b-md flex justify-center items-center ${imageToCrop ? "border-[3px] border-base-300 py-[15px]" : "border-dashed border-3 border-base-300"}`}
                id="drop_zone"
                style={{
                    borderTop: 'none',
                    cursor: 'pointer',
                }}
                
            >
                {
                    imageToCrop 
                    ?
                        croppedImage
                        ?
                        <img src={croppedImage} width="200" height="200" alt="" /> 
                        :
                        <img src={imageToCrop} width="200" height="200" alt="" />               
                    :
                    <div className="flex flex-col justify-center items-center w-full w-full h-[200px] leading-[15px] rounded-b-md gap-[15px] text-t-header-light dark:text-t-header-dark  hover:bg-base-200 dark:hover:text-t-header-light" onClick={() => {fileInputRef.current.click(); console.log("Clicked")}}>
                        <input
                        type="file"
                        onChange={handleFileSelect}
                        hidden
                        ref={fileInputRef}
                        />
                        <button className=''>
                            Select File
                        </button>
                        
                    </div>
                }

            </div>
        </div>
    </>
    )
}

export default FileUpload;