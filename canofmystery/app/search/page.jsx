'use client'
import styles from "./../homepage.module.css";
import React from "react";
import Tag from "../../components/textComponents/neoTag";


const json_cur_search_tags = [
    {tag:"Boggy Creek Monster", link:"../path/to/link/here", color:"#9C94FF"},
    {tag:"Cryptid", link:"../path/to/link/here", color:"#29FF80"},
    {tag:"Local Legends", link:"../path/to/link/here", color:"#FCC800"}
];

const SearchPage = () => {
    const searchquery = "Example Search";
    return(
        
        <div class="flex flex-col justify-center self-center align-center p-20">
            {/* Tag dropdowns */}
            <div className="flex flex-row justify-center">
                <div>

                </div>
            </div>

            {/* Current Filters */}
            <div className="flex flex-row gap-[20px] items-center">
                <p className="text-2.5xl text-bold tracking-minimal">Current Filters:</p>
                {/* Tags in a row */}
                <div className="flex flex-row">
                    {
                        json_cur_search_tags.map((tag, index) => (
                            <Tag key={index} tag={tag.tag} backgroundColor={tag.color}></Tag>
                            )
                        )
                    }

                </div>
            </div>
            {/* search query */}

            <div className="flex flex-row gap-[20px] items-center pt-[20px]">
                <p className="text-2.5xl text-bold tracking-minimal">Search Query:</p>
                <p className="text-2.5xl">{searchquery}</p>
            </div>

            <div className="grid grid-cols-4  gap-4">
                <p>hello2</p>
                <p>hello3</p>
                <p>hello4</p>
                <p>hello5</p>
                <p>hello6</p>
                <p>hello7</p>
            </div>
        </div>
    );
};

export default SearchPage

