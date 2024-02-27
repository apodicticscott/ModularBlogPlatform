import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Cropper from 'react-easy-crop';
import getCroppedImg from './CropImage';
import { MdOutlineAspectRatio } from "react-icons/md";
import "./style.css"
import { NeoButton } from '../TextComponents';

const CropUtils = ({ imageToCrop, onImageCropped }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(16 / 9); // Default aspect ratio
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const [customWidth, setCustomWidth] = useState(16);
  const [customHeight, setCustomHeight] = useState(9);

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
      console.log('done', { croppedImage });
      console.log(croppedImage)
      setCroppedImage(croppedImage);
      onImageCropped(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const onClose = () => {
    setCroppedImage(null);
  };

  const updateAspectRatio = () => {
    setAspect(customWidth / customHeight);
  };

  return (
    <div className='h-full w-full bg-base-200'>
      <div className='relative h-full w-full flex flex-col items-center'>
        <div className='w-full z-10 flex justify-between text-t-header-dark pl-[15px] bg-base-100 h-[50px] border-b-[3px] border-b-black'>
          <div className='h-full flex justify-start items-center gap-[15px] '>
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
          </div>

          <button className="bg-primary-dark text-t-header-light text-bold px-[10px] border-l-[3px]" onClick={handleCroppedImage}>
            Done
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
          style={{}}
        />
      </div>
    </div>
  );
};

export default CropUtils;
