import React, {useState} from "react";
import { MdImageNotSupported } from "react-icons/md";
import { FaImage } from "react-icons/fa";

const Image = () => {
    const [dragging, setDragging] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

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

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type.startsWith("image/")) {
                const url = URL.createObjectURL(file);
                setImageSrc(url);
                updateImageSize(url);
            }
        }
    };

    const updateImageSize = (url) => {
        let img = new Image();
        img.onload = () => {
            setImageSize({ width: img.width, height: img.height });
        };
        img.src = url;
    };

    const handleRemoveImage = () => {
        setImageSrc(null);
        setImageSize({ width: 0, height: 0 });
    };

    const getImageStyle = () => {
        if (imageSize.width > imageSize.height) {
            return { width: '100%', height: 'auto' };
        } else {
            return { height: '300px', width: 'auto' };
        }
    };

    return (
        <div className="w-full h-min flex flex-col items-center gap-[15px]" style={{ padding: '20px', textAlign: 'center', lineHeight: '180px' }}>
            <div
                className="h-full w-[400px] min-h-[300px] rounded-md flex justify-center"
                id="drop_zone"
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                    border: imageSrc ? 'none' : (dragging ? '2px solid green' : '2px dashed gray')
                }}
    
            >
                {
                    imageSrc ?
                    <img src={imageSrc} alt="Dropped" style={getImageStyle()} className="text-center"/>
                    :
                    <div className="flex flex-col justify-center items-center w-full h-[300px] leading-[15px] gap-[15px]">
                        <FaImage className="text-3xl" />
                        Drag and drop your image!
                    </div>
                }
            </div>
            <div className="flex justify-end w-[400px] h-[min]">
                <div className="h-max w-max" onClick={handleRemoveImage}>
                    <MdImageNotSupported className="text-3xl" onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} />
                </div>
            </div>
        </div>
    );
};

export default Image;