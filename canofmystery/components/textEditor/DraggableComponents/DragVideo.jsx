import React from "react";
import { GrDrag } from "react-icons/gr";
import { TiDelete } from "react-icons/ti";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import YoutubeEmbed from "../../TextComponents/YoutubeEmbed"

const DragImage = ({comp, isEnabled, removeComp, selected, onClick}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: comp.ID });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        border: selected ? "3px solid black" : "3px solid transparent",
        transition: "border 250ms ease-in-out",
    };

    return(
        <div
            id="clickable-parent"
            ref={setNodeRef}
            style={style}
            className={`w-full justify-between flex items-center gap-[15px] sm:gap-[30px] rounded-md outline-none`}
            onClick={(e) => {!isEnabled && onClick(e, comp.ID, comp.Type)}}
        >
            <GrDrag 
                id={comp.ID + "-grab"}
                {...attributes}
                {...listeners}
                className={`text-[25px] touch-none ${isEnabled && "hidden"} text-t-header-light dark:text-t-header-dark`}
                onMouseOver={(e) => (e.currentTarget.style.cursor = "move")}
            />
            <YoutubeEmbed id={comp.ID} embededId={comp.VideoEmbededId} key={comp.ID} >
            </YoutubeEmbed>
            <TiDelete
                className={`text-[30px] ${isEnabled && "hidden"} text-t-header-light dark:text-t-header-dark`}
                isdragging={false}
                onClick={() => removeComp(comp.ID)}
                onMouseOver={(e) => (e.currentTarget.style.cursor = "pointer")}
            />      
        </div>
    )
}

export default DragImage;