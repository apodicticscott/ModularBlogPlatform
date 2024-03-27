import React from 'react'
import { MdClose } from "react-icons/md";

const Tag = ({tag, backgroundColor, extrastyle="", isDeletable, handleDelete, id}) => {
    return(
        <>
            <div
            className="flex justify-between p-[5px] mr-[5px] bg-base-100 w-min-[50px] w-max gap-[15px] whitespace-nowrap flex flex-wrap justify-between items-center h-max border-2 p-1 px-3 rounded-md text-t-header-light bg-primary-dark shadow-md"
            style={{backgroundColor: backgroundColor}}
            onBlur={(e) => handleChangeTag(index, e.currentTarget.textContent)}>
                <span className={`text-lg sm:text-xl mix-blend-hard-light`}>
                    <p className={`text-shadow ${extrastyle}`}>{tag}</p>
                </span>
                {
                    isDeletable
                    &&
                    <button onClick={() => handleDelete(id)}>
                        <MdClose />
                    </button>
                    
                }
            </div>
        </>
    )
}

export default Tag;