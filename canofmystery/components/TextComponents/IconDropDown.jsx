import React, { useEffect, useState, useRef } from 'react';
import { FaCaretDown } from "react-icons/fa";
import Divider from '@mui/material/Divider';

const IconDropDown = ({icon, options, handleSetSelected, dropDownControl, currentDrop, id}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

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

    return (
        <>
            <div ref={containerRef} className='w-max h-max'>
                <div className='w-max h-max p-[5px]' onClick={() => (handleSetIsOpen())}>
                    {icon}
                </div>
                <div  className={`transition-all duration-300 absolute w-[250px] max-h-[300px] bg-base-100 dark:bg-base-100-dark dark:text-t-header-dark overflow-y-scroll mt-3 rounded-md border-2 ${isOpen ? 'max-h-[300px] opacity-1 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'} scrollbar-hide `}>
                    {options.map((option, index) => (
                        <React.Fragment key={index}>
                            <Divider />
                            <button id={index} className={`flex justify-between items-center h-max w-full p-3 text-left hover:bg-base-200 dark:hover:text-t-header-light`} onClick={() => handleSetSelected(option, index)}>
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
