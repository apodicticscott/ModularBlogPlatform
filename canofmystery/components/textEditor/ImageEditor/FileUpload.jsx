import React, { useRef, useEffect } from "react";
import Compress from "compress.js";
import { MdOutlineDownloadDone, MdCrop, MdImageNotSupported } from "react-icons/md";
import axios from 'axios';

const originalConsoleError = console.error;

// Override console.error
console.error = (...args) => {
  // Check if the first argument is a string and suppress the specific warning
  if (
    typeof args[0] === 'string' &&
    args[0].includes("Cannot update a component (`TextEditor`) while rendering a different component (`FileUpload`)")
  ) {
    // You can either do nothing here or log a custom message
    return;
  }

  // Otherwise, use the original console.error function
  originalConsoleError(...args);
};

const FileUpload = ({addImage, enableCrop, isCropEnabled, imageToCrop, setImageToCrop, croppedImage, setCroppedImage, isImageAddOpen, removeImage, type, setCropType}) => {
    const fileInputRef = useRef(null);
    const compress = new Compress();

    useEffect(() => {
        setCropType(type);
    }, [type, setCropType]);

    const handleFileSelect = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]; // This is the File object you need
            console.log(file)
            compress.compress([file], { // Pass the File object directly to compress
                size: 1, // the max size in MB, defaults to 2MB
                quality: 1, // the quality of the image, max is 1,
                maxWidth: 1200, // the max width of the output image, defaults to 1920px
                maxHeight: 1200, // the max height of the output image, defaults to 1920px
                resize: true // defaults to true, set false if you do not want to resize the image width and height
            }).then((compressedResult) => {
                // The compressedResult is an array of compressed files
                // Assuming you want to set the first (and likely only) result
                const compressedFile = compressedResult[0];
                console.log(compressedFile)
                const base64str = compressedFile.data;
                const imgExt = compressedFile.ext;

                // Instead of converting the base64 to a Blob, we directly use the raw compressed image data
                // Pass this base64str or imgExt as needed for further processing or use
                // For example, setting it directly to an image source for preview (if that's your intention)
                console.log(`data:image/${imgExt};base64,${base64str}`)
                setImageToCrop(`data:image/${imgExt};base64,${base64str}`); // Direct base64 string for image preview

            }).catch((error) => {
                console.error("Error compressing the file:", error);
            });
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
        <div className="w-full h-full flex flex-col items-center  " style={{ textAlign: 'center', lineHeight: '180px' }}>
            {
            ((!isCropEnabled || type === "cover" || type === "comp") && imageToCrop)
            &&
            <div className="flex items-center justify-between w-full h-[50px] bg-base-300 rounded-md dark:bg-[#322e38]">
                <div className="grow h-full flex items-center px-[5px] gap-[5px]">
                    {
                        imageToCrop
                        &&
                        <button className="flex items-center justify-center h-[40px] w-[40px] p-[10px] rounded-md text-t-header-dark hover:bg-base-100 hover:text-t-header-light hover:dark:text-t-header-dark hover:dark:bg-base-100-dark transition duration-100" onClick={() => {handleRemoveImage()}}>
                            <MdImageNotSupported className={`text-2.5xl text-inherit ${imageToCrop ? "relative" : "hidden"}`} onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} />
                        </button >
                    }

                    {
                        (type === "comp")
                        &&
                        <button  className="flex items-center justify-center  h-[43px] w-[43px] p-[10px] rounded-md text-t-header-dark hover:bg-base-100 hover:text-t-header-light hover:dark:text-t-header-dark hover:dark:bg-base-100-dark transition duration-100" onClick={() => {enableCrop(true, type); setImageToCrop(imageToCrop)}}>
                            <MdCrop className={`text-2.5xl text-inherit ${imageToCrop ? "relative" : "hidden"}`}  onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} /> 
                        </button >    
                    }

                </div>
                <div className="w-max h-full flex items-center px-[5px] transition-all duration-200" onClick={() => {(type !== "cover") && handleAddImage()}}>
                    {
                        (type === "cover")
                        ?
                        !isCropEnabled && imageToCrop
                        &&
                        <button  className="h-[40px] w-[40px] p-[10px]  rounded-md text-t-header-dark hover:bg-base-100 hover:text-t-header-light hover:dark:text-t-header-dark hover:dark:bg-base-100-dark transition duration-100" onClick={() => {enableCrop(true, type); console.log(true, type); setImageToCrop(imageToCrop)}}>
                            <MdCrop className={`text-2.5xl text-inherit ${imageToCrop ? "relative" : "hidden"}`}  onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} /> 
                        </button>
                        :
                        imageToCrop
                        &&
                        <button  className="h-[40px] w-[40px] flex items-center justify-center p-[5px] rounded-md text-t-header-dark hover:bg-base-100 hover:text-t-header-light hover:dark:text-t-header-dark hover:dark:bg-base-100-dark transition duration-100">
                            <MdOutlineDownloadDone className={`text-2.7xl  text-inherit ${imageToCrop ? "relative" : "hidden"}`} onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} /> 
                        </button>

                    }
                    
                </div>

                
            </div>
            }
            <div
                className={`h-full w-full sm:w-full h-[200px] rounded-md flex justify-center  items-center transition-all duration-200 ${imageToCrop ? "border-[3px] mt-2 border-base-300 py-[15px] dark:border-2 dark:border-[#322e38] " : "border-dashed border-3 border-base-300 dark:border-2 dark:border-[#322e38]"}`}
                id="drop_zone"
                
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
                    <div className="flex flex-col justify-center items-center w-full w-full h-[200px] leading-[15px] rounded-md gap-[15px] text-t-header-light dark:text-t-header-dark hover:dark:bg-[#57545e] hover:bg-base-200 dark:hover:text-t-header-light" onClick={() => {fileInputRef.current.click(); console.log("Clicked")}}>
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