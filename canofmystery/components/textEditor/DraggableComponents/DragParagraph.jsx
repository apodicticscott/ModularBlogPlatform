'use client'
import React, { useRef, useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { GrDrag } from "react-icons/gr";
import { TiDelete } from "react-icons/ti";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Paragraph from "../../TextComponents/Paragraph";

const DragParagraph = ({ comp, isEnabled, removeComp, updateContent, selected, onClick, compArray }) => {
    const [styleString, setStyleString] = useState("")

    const contentRef = useRef();
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
    };

    useEffect(() => {
        // Assuming Style is an array of CSS class names or style strings
        // Join the styles into a single string if necessary (for class names or inline styles)
        const styleString = comp.Style ? comp.Style.join(' ') : '';
        setStyleString(styleString);
        console.log(styleString)
    }, [compArray]); // Ensure Style is a dependency here

    const handleKeyDown = (event) => {
        if (event.metaKey) {
            if (Object.values(FONTS).includes(event.key)) {
                event.preventDefault();
                transformText(event.key);
            }
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    console.log(styleString, comp.Style, comp.ID);


    return (
        <div
            id="clickable-parent"
            ref={setNodeRef}
            style={{ ...style }}
            className={`w-full justify-between  
            ${((selected.ID === comp.ID) && selected.eventType === "comp-click") && "border-3 border-base-200"} 
            flex items-center gap-[15px] sm:gap-[30px] rounded-md text-t-header-light dark:text-t-header-dark`}
            onClick={(e) => {!isEnabled && onClick(e, comp.ID, comp.Type)}}
        >
            <GrDrag
                id={comp.id + "-grab"}
                {...attributes}
                {...listeners}
                className={`text-[25px] touch-none ${isEnabled && "hidden"}`}
                onMouseOver={(e) => (e.currentTarget.style.cursor = "move")}
            />
            <Paragraph
                type={comp.Size}
                id={comp.Id}
                classes={styleString}
            >
                <ContentEditable
                    id="paragraph"
                    html={comp.Content}
                    innerRef={contentRef}
                    onChange={(event) => updateContent(comp.ID, event.target.value, "text")}
                    style={{ ...style, ...styleString }}
                />
            </Paragraph>
            <TiDelete className={`text-[30px] ${isEnabled && "hidden"} text-t-header-light dark:text-t-header-dark`} onClick={() => removeComp(comp.ID)} onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} />
        </div>
    );
}

export default DragParagraph;
