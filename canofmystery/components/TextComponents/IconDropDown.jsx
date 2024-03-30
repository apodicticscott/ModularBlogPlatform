import React, { useEffect, useState, useRef } from 'react';
import { FaCaretDown } from "react-icons/fa";
import Divider from '@mui/material/Divider';

const IconDropDown = ({icon, options, handleSetSelected, dropDownControl, currentDrop, id}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const dropDownRef = useRef(null);

    const handleSetIsOpen = () => {

        setIsOpen(!isOpen)
        if(dropDownControl){
            dropDownControl(id);
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        if(currentDrop !== id && isOpen === true){
            setIsOpen(false)
        }
    }, [currentDrop])

    const [isTransformed, setIsTransformed] = useState(false)

    useEffect(() => {
        if (isOpen && dropDownRef.current) {
            const { right } = dropDownRef.current.getBoundingClientRect();
            const { innerWidth } = window;
            if(!isTransformed){
                if (right > innerWidth) {
                    const overlap = right - innerWidth + 28;
                    console.log("here!")
                    dropDownRef.current.style.transform = `translateX(-${overlap}px)`;
                }
            }

        }
    }, [isOpen]);

    return (
        <>
            <div ref={containerRef} className='w-max h-max relative'>
                <button className='w-max h-max p-[5px]' onClick={() => (handleSetIsOpen())}>
                    {icon}
                </button>
                <div  ref={dropDownRef} className={`transition-all duration-300 absolute max-h-[300px] bg-base-100 dark:bg-base-100-dark dark:text-t-header-dark overflow-y-scroll mt-3 rounded-md border-2 ${isOpen ? 'max-h-[300px] opacity-1 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'} scrollbar-hide`}>
                    {options.map((option, index) => (
                        <React.Fragment key={index}>
                            <Divider />
                            <button id={index} className={`w-max h-max dark:hover:text-t-header-light hover:bg-base-200`} onClick={() => (handleSetSelected(option, index), setIsOpen(false))}>
                                {option.fragment}
                            </button>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    );
};

export default IconDropDown;
