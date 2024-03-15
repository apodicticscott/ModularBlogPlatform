import React from "react";
import { GrDrag } from "react-icons/gr";
import { TiDelete } from "react-icons/ti";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Image from "../../TextComponents/Image"

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
        transition
    };

  

    return(
        <div
            id="clickable-parent"
            ref={setNodeRef}
            style={style}
            className={`w-full justify-between  ${
                ((selected.id === comp.ID) && selected.eventType === "comp-click") && "border-[3px] w-[calc(100%_+_3px)]"
            } flex items-center gap-[15px] sm:gap-[30px] rounded-md `}
            onClick={(e) => {!isEnabled && onClick(e, comp.ID, comp.Type)}}
        >
            <GrDrag 
                id={comp.ID + "-grab"}
                {...attributes}
                {...listeners}
                className={`text-[25px] touch-none ${isEnabled && "hidden"} text-t-header-light dark:text-t-header-dark`}
                onMouseOver={(e) => (e.currentTarget.style.cursor = "move")}
            />
            <Image id={comp.ID} src={comp.Image} key={comp.ID}  onClick={onClick} >
            </Image>
            <TiDelete className={`text-[30px] ${isEnabled  && "hidden"} text-t-header-light dark:text-t-header-dark`} onClick={() => removeComp(comp.ID)} onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'}/>
        </div>
    )
}

export default DragImage;