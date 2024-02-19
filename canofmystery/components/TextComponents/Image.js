
import React, { useState, useRef } from "react";
import { MdImageNotSupported } from "react-icons/md";
import { FaImage, FaUpload } from "react-icons/fa";

const Image = () => {
    const [dragging, setDragging] = useState(false);
    const [image, setImage] = useState(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const fileInputRef = useRef(null);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleFileSelect = (e) => {
        const files = e.target.files || e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type.startsWith("image/")) {
                const url = URL.createObjectURL(file);
                setImage(url);
                updateImageSize(url);
            }
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        handleFileSelect(e);
    };

    const updateImageSize = (url) => {
        let img = new Image();
        img.onload = () => {
            setImageSize({ width: img.width, height: img.height });
        };
        img.src = url;
    };

    const handleRemoveImage = () => {
        setImage(null);
        setImageSize({ width: 0, height: 0 });
    };

    const getImageStyle = () => {
        if (imageSize.width > imageSize.height) {
            return { width: '100%', height: 'auto' };
        } else {
            return { height: '300px', width: 'auto' };
        }
    };

    const handleFileUpload = e => {
        const { files } = e.target;
        if (files && files.length) {
          const filename = files[0].name;
    
          var parts = filename.split(".");
          const fileType = parts[parts.length - 1];
          console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.
    
          setImage(files[0]);
        }
      };
    
      const onButtonClick = () => {
        console.log("FILE UPLOAD CLICKED")
        fileInputRef.current.click();
        console.log(fileInputRef.current.click())
      };

    
    return (
        <div className="w-full h-min flex flex-col items-center gap-[15px]" style={{ padding: '20px', textAlign: 'center', lineHeight: '180px' }}>
            <div
                className="h-full w-full md:w-[400px] min-h-[300px] rounded-md flex justify-center items-center"
                id="drop_zone"
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                    border: image ? 'none' : (dragging ? '2px solid green' : '2px dashed gray'),
                    cursor: 'pointer',
                }}
                
            >
                {
                    image ?
                    <img src={image} alt="Dropped" style={getImageStyle()} className="text-center"/>
                    :
                    <div className="flex flex-col justify-center items-center w-full w-full h-[300px] leading-[15px] gap-[15px]">
                        Drag and Drop file here
                        <span>or</span>
                        <FaUpload className="inline-block text-3xl z-20" onClick={onButtonClick}/> 
                        <input
                            style={{ display: "none" }}
                            // accept=".zip,.rar"
                            ref={fileInputRef }
                            onChange={handleFileUpload}
                            onClick={console.log("FILE INPUT CLICKED")}
                            type="file"
                        />
                        <div className="button" onClick={onButtonClick}>
                            Upload your file.
                        </div>
  

                        
                    </div>
                }

            </div>
            <div className="flex justify-end w-full h-auto md:w-[400px] md:h-[min]">
                <div className="h-max w-max" onClick={handleRemoveImage}>
                    <MdImageNotSupported className="text-3xl" onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} />
                </div>
            </div>
        </div>
    );
};

export default Image;
