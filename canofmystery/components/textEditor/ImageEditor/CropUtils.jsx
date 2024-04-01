import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Cropper from 'react-easy-crop';
import getCroppedImg from './CropImage';
import { MdOutlineAspectRatio } from "react-icons/md";
import "./style.css";

const CropUtils = ({ imageToCrop, onImageCropped, ratios, type }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(16 / 9); // This will be updated based on ratios prop
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  // Pre-defined ratio options
  const ratioOptions = [
    { id: 1, value: 16 / 9, label: "16:9" },
    { id: 2, value: 4 / 3, label: "4:3" },
    { id: 3, value: 1 / 1, label: "1:1" },
    { id: 4, value: 2 / 3, label: "2:3" },
  ];


  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageToCrop,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
      onImageCropped(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const onClose = () => {
    setCroppedImage(null);
  };

  // Function to update the aspect ratio
  const setRatio = (newAspect) => {
    setAspect(newAspect);
  };

  // Filter ratio options based on allowed ranges for displaying ratio buttons
  const availableRatios = ratioOptions.filter(option => option.id >= ratios[0] && option.id <= ratios[1]);

  return (
    <div className='h-full w-full bg-base-200'>
      <div className='relative h-full w-full flex flex-col items-center'>
        <div className='w-full z-10 flex justify-between text-t-header-dark pl-[15px] bg-base-100 h-[50px] border-b-[3px] border-b-black'>
          <div className='h-full flex justify-start items-center gap-[15px] text-t-header-light'>
            {/* Inputs and buttons for zoom, rotation, and aspect ratio */}
            <label className='text-t-header-light'>Zoom</label>
            <input
              type="range"
              value={zoom}
              min="1"
              max="3"
              step="0.1"
              onChange={(e) => setZoom(parseFloat(e.target.value))}
            />
            <label className='text-t-header-light'>Rotation</label>
            <input
              type="range"
              value={rotation}
              min="0"
              max="360"
              step="1"
              onChange={(e) => setRotation(parseFloat(e.target.value))}
            />
            <MdOutlineAspectRatio className='text-2.5xl text-t-header-dark'/>
            {/* Buttons for changing aspect ratio */}
            {availableRatios.map((ratio) => (
              <button key={ratio.id} onClick={() => setRatio(ratio.value)} className="mx-2">
                {ratio.label}
              </button>
            ))}
          </div>

          <button className="bg-primary-dark text-t-header-light text-bold px-[10px] border-l-[3px] min-w-[81px]" onClick={handleCroppedImage}>
            Crop
          </button>
        </div>
        <Cropper
          image={imageToCrop}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
    </div>
  );
};

export default CropUtils;
