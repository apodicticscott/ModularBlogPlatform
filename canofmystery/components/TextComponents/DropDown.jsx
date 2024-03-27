import React, { useState } from 'react';
import { FaCaretDown } from "react-icons/fa";
import Divider from '@mui/material/Divider';

const DropDown = ({ tags, setSelectedTags, selectedTags, label}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [selectedID, setSelectedID] = useState();

    

    const handleSetSelected = (tagID, text, color) => {
        if (tagID !== undefined) {
            if (selectedID === tagID) {
                setSelectedID(null);
                setSelected(null);
            } else {
                setSelectedID(tagID);
                setSelected(text);
                setSelectedTags([...selectedTags, {Text: text, Color: color}]);
            }
        }
    };

    return (
        <>
            <div className='w-max h-max'>
                <div className='w-[200px] h-[40px] rounded-md border-3 shadow-md bg-primary-dark flex items-center p-3 z-10'>
                    <div className='grow h-full flex items-center'>
                        {
                            label
                        }
                    </div>
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <FaCaretDown className={`transition-all duration-300 text-2xl ${isOpen ? "rotate-180" : "rotate-0"}`} />
                    </button>
                </div>
                <div className={`transition-all duration-300 absolute w-[250px] max-h-[300px] bg-base-100 dark:bg-base-100-dark dark:text-t-header-dark overflow-y-scroll mt-3 rounded-md border-2 ${isOpen ? 'max-h-[300px] opacity-1 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'} scrollbar-hide `}>
                    {tags.map((tag, index) => (
                        <React.Fragment key={index}>
                            <Divider />
                            <button className={`h-max w-full p-3 pr-2 text-left hover:bg-base-200 dark:hover:text-t-header-light`} onClick={() => handleSetSelected(index, tag.Text, tag.Color)}>
                                {tag.Text}
                            </button>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DropDown;
