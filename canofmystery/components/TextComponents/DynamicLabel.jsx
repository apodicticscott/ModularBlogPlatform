import React, { useState } from 'react';
import Divider from '@mui/material/Divider';

const DynamicLabel = ({labels}) => {

  const handleDividerMove = (label) => (e) => {
    let tempWidth;
    const updateBasis = (moveEvent) => {
      const index = labels.indexOf(label)

      const nextLabel = labels[index + 1]

      
      const labelElm = document.getElementById(`${label.key}-label`);
      const newWidth = moveEvent.clientX - labelElm.getBoundingClientRect().x;

      console.log((document.getElementById(nextLabel.key+"-label").getBoundingClientRect().width + document.getElementById(label.key+"-label").getBoundingClientRect().width))
      console.log(newWidth)
      if(newWidth < ((document.getElementById(nextLabel.key+"-label").getBoundingClientRect().width + document.getElementById(label.key+"-label").getBoundingClientRect().width) - 30) && newWidth > 40){
        label.setBasis(newWidth) 
        nextLabel.setBasis((document.getElementById(nextLabel.key+"-label").getBoundingClientRect().width + document.getElementById(label.key+"-label").getBoundingClientRect().width) - newWidth)  
      }

    };


    const handleMouseMove = (moveEvent) => updateBasis(moveEvent);
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  
  return (
      labels.map((label, index) => (
        <React.Fragment key={label.key}>
          <div id={`${label.key}-label`} className={`text-inherit pl-[10px] truncate`} style={{ minWidth: label.basis }}>
            {label.label}
          </div>
          {
            !(index === (labels.length - 1))
            &&
            <button className='h-full flex min-w-[10px] justify-center cursor-col-resize' onMouseDown={handleDividerMove(label)}>
              <Divider orientation="vertical" id={label.key} className={`hidden 2xl:flex`} flexItem />
            </button>
          }

        </React.Fragment>
      ))
  );
};

export default DynamicLabel;
