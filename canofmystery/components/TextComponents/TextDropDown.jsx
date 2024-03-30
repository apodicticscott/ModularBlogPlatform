'use client'
import React, { useState, useEffect, useRef } from 'react';
import { FaCaretDown } from "react-icons/fa";
import Divider from '@mui/material/Divider';

const TextDropDown = ({ tags, handleSetSelected, label, id, dropDownControl, currentDrop}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const handleSetIsOpen = () => {
        setIsOpen(!isOpen)
        if(dropDownControl && !isOpen){
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

    return (
        <>
            <div ref={containerRef} className='w-max h-max'>
                <button className='w-[200px] h-[40px] rounded-md border-3 shadow-md bg-primary-dark flex items-center p-3 z-10' onClick={() => handleSetIsOpen()}>
                    <div className='grow h-full flex items-center'>
                        {
                            label
                        }
                    </div>
                    <button >
                        <FaCaretDown className={`transition-all duration-300 text-2xl ${isOpen ? "rotate-180" : "rotate-0"}`} />
                    </button>
                </button>
                <div  className={`transition-all duration-300 absolute w-[250px] max-h-[300px] bg-base-100 dark:bg-base-100-dark dark:text-t-header-dark overflow-y-scroll mt-3 rounded-md border-2 ${isOpen ? 'max-h-[300px] opacity-1 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'} scrollbar-hide `}>
                    {tags.map((tag, index) => (
                        <React.Fragment key={index}>
                            <Divider />
                            <button className={`h-max w-full p-3 pr-2 text-left hover:bg-base-200 dark:hover:text-t-header-light`} onClick={() => (handleSetSelected(tag.Text, tag.Color), setIsOpen(false))}>
                                {tag.Text}
                            </button>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TextDropDown;
