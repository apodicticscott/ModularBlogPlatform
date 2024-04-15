'use client'
import React, { useRef, useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { GrDrag } from "react-icons/gr";
import { TiDelete } from "react-icons/ti";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Paragraph from "../../TextComponents/Paragraph";

const DragParagraph = ({ comp, isEnabled, removeComp, updateContent, selected, onClick}) => {

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
        border: selected ? "3px solid black" : "3px solid transparent",
        transition: "border 250ms ease-in-out",
    };


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

    return (
        <div
            id="clickable-parent"
            ref={setNodeRef}
            style={style}
            className={`transition-border duration-200 w-full justify-between  flex items-center gap-[15px] sm:gap-[30px] rounded-md text-t-header-light dark:text-t-header-dark outline-none`}
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
                classes={comp.Style.join(" ")}
            >
                <ContentEditable
                    id="paragraph"
                    html={comp.Content}
                    innerRef={contentRef}
                    className="tracking-tighter"
                    onChange={(event) => updateContent(comp.ID, event.target.value, "text")} 
                />
            </Paragraph>
            <TiDelete className={`text-[30px] ${isEnabled && "hidden"} text-t-header-light dark:text-t-header-dark`} onClick={() => removeComp(comp.ID)} onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} />
        </div>
    );
}

export default DragParagraph;
