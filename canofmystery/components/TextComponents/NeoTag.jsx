import React from 'react'

const Tag = ({tag, backgroundColor, extrastyle=""}) => {
    return(
        <>
            <div
            className="p-[5px] mr-[5px] bg-base-100 w-min-[50px] w-min whitespace-nowrap flex flex-wrap justify-between items-center h-max border-2 p-1 pr-3 rounded-md text-t-header-light bg-primary-dark shadow-md"
            style={{backgroundColor: backgroundColor}}
            onBlur={(e) => handleChangeTag(index, e.currentTarget.textContent)}>
                <span className={`text-lg sm:text-xl mix-blend-hard-light`}>
                    <p className={`${extrastyle}`}>{tag}</p>
                </span>
            </div>
        </>
    )
}

export default Tag;