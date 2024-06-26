import React, { useRef, useEffect} from "react";
import ContentEditable from "react-contenteditable";
import { GrDrag } from "react-icons/gr";
import { TiDelete } from "react-icons/ti";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";



const DragList = ({ comp, isEnabled, removeComp, updateContent, selected, onClick}) => {
    const contentRef = useRef();
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: comp.id });

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
    });
    
    const handleUpdateList = (e, mode, id) => {
        if(e.key === "Enter"){
            const listItems = [...comp.listItems, {content: "New List Item", style: "decimal"}]
            updateContent(id, listItems, "list")
        }
    }


    return (
        <div
        id="clickable-parent"
        ref={setNodeRef}
        style={style}
        className={`w-full justify-between flex flex-col items-center gap-[15px] rounded-md `}
        onClick={(e) => {!isEnabled && onClick(e, comp.id, comp.type)}}
        >   
            <div className="flex justify-between w-full ">
                <GrDrag
                    id={comp.id + "-grab"}
                    {...attributes}
                    {...listeners}
                    className={`text-[25px] touch-none ${isEnabled && "hidden"} text-t-header-light dark:text-t-header-dark outline-none`}
                    onMouseOver={(e) => (e.currentTarget.style.cursor = "move")}
                />
                    <div className="w-full">
                        <ul className="pl-[50px] w-full text-t-header-light dark:text-t-header-dark">
                            {
                                comp.listItems.map((item) => (
                                    <li key={item.id} style={{listStyle: item.style}} onKeyDown={(e) => handleUpdateList(e, "add", comp.id)}>
                                        <ContentEditable 
                                            
                                            id="paragraph"
                                            html={item.content}
                                            innerRef={contentRef}
                                            
                                        />
                                    </li> 
                                ))
                            }
                            
                        </ul>
                    </div>
                <TiDelete
                    className={`text-[30px] ${isEnabled && "hidden"} text-t-header-light dark:text-t-header-dark`}
                    onClick={() => removeComp(comp.id)}
                    onMouseOver={(e) => (e.currentTarget.style.cursor = "pointer")}
                />
            </div>
        </div>
    );
};

export default DragList;
