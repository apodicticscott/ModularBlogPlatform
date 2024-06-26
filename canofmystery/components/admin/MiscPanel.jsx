'use client'
import { useEffect, useState, useRef } from "react";
import Header from "../TextComponents/Header1";
import NeoButton from "../TextComponents/NeoButton";
import { MdClose } from "react-icons/md";

const MiscPanel = ({canItems, handleAddCanItem, handleDeleteCanItem, handleFetchCanItems}) => {
    const canItemInput = useRef(null)
    const [canItem, setCanItem] = useState();

    const handleAddButtonClick = () => {
        console.log("here")
        handleAddCanItem({text: canItem})
        canItemInput.value = ""
    }

    const handleDeleteButtonClick = (id) =>{
        console.log(id)
        handleDeleteCanItem(id)
    }

    useEffect(() => {
        console.log(canItems)
    }, [])

    return(
        <div className="flex flex-col h-[742px] w-full justify-between p-7 dark:font-extralight">
            <div className="h-full w-max p-3 rounded-md border-3 flex flex-col gap-[15px]">
                <Header type="sm" >
                    Can Items
                </Header>
                <div className="flex gap-[10px]">
                    <input ref={canItemInput} class="neo-input sm:w-[200px] pl-2 dark:bg-[#18161b] rounded-md" onChange={(e) => setCanItem(e.target.value)} type="tag" name="tag"/>
                    <NeoButton  classes="bg-primary-dark" onClick={(e) => handleAddButtonClick(e)}>
                        Add
                    </NeoButton>
                </div >
                <div className="w-full rounded-md h-full overflow-y-scroll rounded-t-md  border-3 dark:border-2 dark:border-[#302c38] bg-base-200 dark:bg-secondary-dark scrollbar-hide">
                    
                    {
                        
                        canItems.map((canItem) => (
                            <div key={"canItem-" + canItem.id} className="p-[5px] border-b-2 flex justify-between bg-base-100 flex items-center max-w-[260px]">
                                <div>
                                    {canItem.text}
                                </div>
                                <button onClick={()=> handleDeleteButtonClick(canItem.id)}>
                                    <MdClose className="text-2.5xl"/>
                                </button>
                            </div>
                        ))
                    }
                </div>

                
            </div>

        </div>
    )
}

export default MiscPanel;
