'use client'

import React, { useState, useEffect, useRef, useCallback } from "react";
import { GrDrag } from "react-icons/gr";
import { FaPlus, FaItalic, FaBold, FaStrikethrough, FaUnderline, FaLink, FaList } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { RiFontSize } from "react-icons/ri";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { DndProvider, useDrag, useDrop,  } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RiFontFamily } from "react-icons/ri";
import Paragraph from "../TextComponents/Paragraph"
import Resource from "../TextComponents/Resource";
import "../../app/globals.css"

import Image from "../../components/TextComponents/Image";
import ControlPanel from "./ControlPanel"
import Tag from "../../components/TextComponents/NeoTag"
import Header from "../../components/TextComponents/Header1";
import { m } from "framer-motion";

const ItemType = {
    COMPONENT: 'component',
};

const SizeDropDown = ({className, onClick}) => {

    
    return(
        <div className={`${className} flex flex-row bg-base-100 overflow-hidden` }>
            <button id="sm" className="flex flex-row justify-center items-end h-full w-[50px] py-[10px]" onClick={(e) => onClick(e.currentTarget.id)}>
                <RiFontFamily id="sm" className="text-1xl"/>
            </button>
            <button id="md" className="flex flex-row justify-center items-end h-full w-[50px] py-[10px]" onClick={(e) => onClick(e.currentTarget.id)}>
                <RiFontFamily id="md" className="text-2.2xl"/>
            </button>
            <button id="lg" className=" flex flex-row justify-center items-end h-full w-[50px] py-[9px]" onClick={(e) => onClick(e.currentTarget.id)}>
                <RiFontFamily id="lg" className="flex flex-col justify-end text-2.7xl"/>
            </button>
            <button id="xl" className="flex flex-row justify-center items-end h-full w-[50px] py-[8px]" onClick={(e) => onClick(e.currentTarget.id)}>
                <RiFontFamily id="xl" className="text-3xl"/>
            </button>
        </div>
    )
}



const DraggableComponent = ({ comp, index, length, moveComponent, onClick, handleBlur, handleInput, handleSelection, selected, onSelect, removeComp, editContent, isEnabled, isBookMarked, onLoad, isLoaded, loadBookMarks, isPreview}) => {
    const ref = useRef(null);
    const editableRef = useRef(null);
    const [, drop] = useDrop({
        accept: ItemType.COMPONENT,
        hover(item, monitor) {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
            moveComponent(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });


    if(comp.id.toString() === length.toString()){
        if(!isLoaded){
            onLoad();
        }
    }


    const [{ isDragging }, drag] = useDrag({
        type: ItemType.COMPONENT,
        item: () => {
            return { id: comp.id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    
    loadBookMarks(comp)

    const handleKeyUp = (e) => {
        let id = e.target.getAttribute('data-compid');
        let newContent = e.target.firstChild.innerHTML;
    
        // Save the current selection position
        const selection = window.getSelection();
        const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    
        // Update the state with the new content
        editContent(e, id, newContent);
    
        // Restore the selection position
        if (range) {
            setTimeout(() => {
                const element = document.querySelector(`[data-compid="${id}"]`);
                const newRange = document.createRange();
                newRange.setStart(element.childNodes[0], range.startOffset);
                newRange.setEnd(element.childNodes[0], range.endOffset);
                selection.removeAllRanges();
                selection.addRange(newRange);
            }, 0);
        }
    };

    drag(drop(ref));

    return (
        <div id="clickable-parent" ref={ref} style={{ opacity: isDragging ? 0 : 1, borderColor: "rgba(101, 101, 101, 0.7)" }} className={`${(selected === comp.id) && "border-[3px]"} flex items-center w-full gap-[30px] rounded-md`}  onClick={(e) => onClick(comp.id, e)}>

                {comp.type === "header" && (
                    <>
                        <GrDrag className={`text-[25px] ${isEnabled  && "hidden"}`} onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'}/>   
                        <Header 
                        id={isBookMarked ? "bookmarked-header-" + comp.id : "header-" + comp.id}
                        type={comp.size} 
                        style={comp.style} 
                        data-key={comp.id}
                        editable={true}
                        onKeyDown={(e) => ({})}
                        onClick={(e) => onClick(comp.id, e)}
                        onKeyUp={handleKeyUp}
                        onSelect={onSelect}
                        data-compid={comp.id}
                        >
                            <div ref={editableRef}  contentEditable={!isEnabled} data-compid={comp.id}  onInput={(e) => handleInput(e, comp.id)} onMouseUp={(e) => handleSelection(e)} onMouseLeave={(e) => handleBlur(e, comp.id, comp)} id="clickable-child"  />
                        </Header>
                        <TiDelete className={`text-[30px] ${isEnabled  && "hidden"}`} onClick={() => removeComp(comp.id)} onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'}/>
                    </>

                )}
                {comp.type === "image" && (
                    <>
                        <GrDrag className={`text-[25px] ${isEnabled  && "hidden"}`} onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'}/>
                        <Image src={comp.content} key={comp.id} >
                        
                        </Image>
                        <TiDelete className={`text-[30px] ${isEnabled  && "hidden"}`} onClick={() => removeComp(comp.id)} onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'}/>
                    </>
                )}
                {comp.type === "paragraph" && (
                    <>
                        <GrDrag className={`text-[25px] ${isEnabled  && "hidden"}`} onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'}/>
                        <Paragraph 
                        type={comp.size} 
                        style={comp.style} 
                        id={comp.id} 
                        data-key={comp.id}
                        editable={true}
                        onKeyDown={(e) => ({})}
                        onClick={(e) => onClick(comp.id, e)}
                        onKeyUp={handleKeyUp}
                        onSelect={onSelect}
                        data-compid={comp.id}
                        >
                            <div ref={editableRef}  contentEditable={!isEnabled} data-compid={comp.id}  onInput={(e) => handleInput(e, comp.id)} onMouseUp={(e) => handleSelection(e)} onMouseLeave={(e) => handleBlur(e, comp.id, comp)} id="clickable-child"  />
                        </Paragraph>
                        <TiDelete className={`text-[30px] ${isEnabled  && "hidden"}`} onClick={() => removeComp(comp.id)} onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'}/>
                    </>
                )}
                {comp.type === "resource" && (
                    <>
                        <GrDrag className={`text-[25px] ${isEnabled  && "hidden"}`} onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'}/>
                        <Resource 
                        type={comp.size} 
                        style={comp.style} 
                        id={comp.id} 
                        data-key={comp.id}
                        editable={true}
                        onKeyDown={(e) => ({})}
                        onClick={(e) => onClick(comp.id, e)}
                        onKeyUp={handleKeyUp}
                        onSelect={onSelect}
                        data-compid={comp.id}
                        >
                            <div ref={editableRef}  contentEditable={!isEnabled} data-compid={comp.id}  onInput={(e) => handleInput(e, comp.id)} onMouseUp={(e) => handleSelection(e)} onMouseLeave={(e) => handleBlur(e, comp.id, comp)} id="clickable-child"  />
                        </Resource>
                        <TiDelete className={`text-[30px] ${isEnabled  && "hidden"}`} onClick={() => removeComp(comp.id)} onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'}/>
                    </>
                )}
                {/* Add cases for other types if needed */}
            
        </div>
    );
};

const TextEditor = () => {
    const [compArray, setCompArray] = useState([    
        { type: "paragraph", size: "md", style: [], id: "1", isTagged: false, content: 'For years, people in Kentucky have been talking about the peculiar and eccentric weather phenomenon known as the "Kentucky Meat Rain." Locals are left scratching their heads in astonishment and awe at this strange phenomenon where chunks of raw flesh fall from the sky. The Kentucky Meat Rain is still a mysterious and intriguing natural phenomenon, despite a plethora of theories and ideas regarding its cause.'},
        { type: "image", size: "", style: [], id: "2", content: "" },
        { type: "paragraph", size: "md", style: [], id: "3", isTagged: false, content: 'The first Kentucky Meat Rain was observed by the nice people of Olympia Springs, Kentucky, in 1876. This is where our voyage into the world of meaty precipitation began. People were in complete disbelief as various types of meat, including venison and steak, appeared to fall from the sky. The tale quickly became viral, igniting a flurry of interest and ideas about the meaty downpour.'},
        { type: "paragraph", size: "md", style: [], id: "4", isTagged: false, content: 'Meat showers persisted in appearing in different locations around Kentucky in the late 19th and early 20th centuries. Even more, a report from the 1876 incident said that the meat parts were "large irregularly shaped flakes, one of which was 6 by 8 inches in size.'},
        { type: "paragraph", size: "md", style: [], id: "5", isTagged: false, content: 'Numerous theories, ranging from the serious to the absurd, have been proposed on the Kentucky Meat Rain:'},
        { type: "paragraph", size: "md", style: [], id: "6", isTagged: false, content: 'Numerous theories, ranging from the serious to the absurd, have been proposed on the Kentucky Meat Rain:'},
        { type: "header", size: "sm", style: [], id: "7", isTagged: true, content: 'Work Cited'},
        { type: "resource", size: "md", style: [], id: "8", isTagged: false, content: 'Duckworth, Matthew, “‘Kentucky Shower of Flesh’: The ‘Great Kentucky Meat Shower’ fell 147 years ago” Fox56News. Mar. 2023 https://fox56news.com/news/kentucky/the-great-kentucky-meat-shower-147-years-passed-since-the-kentucky-shower-of-flesh/ Accessed Oct. 2023.'},
        { type: "resource", size: "md", style: [], id: "9", isTagged: false, content: 'McManus, Melanie, “10 Times It Has Rained Something Other Than Water” HowStuffWorks. https://science.howstuffworks.com/nature/climate-weather/storms/10-times-it-rained-something-other-than-water.htm. Accessed Oct. 2023.'},
        { type: "resource", size: "md", style: [], id: "10", isTagged: false, content: '“Kentucky meat shower”, https://en.wikipedia.org/wiki/Kentucky_meat_shower, Wikipedia. Nov. 2023.'},
  
    ]);
    const [bookMarks, setBookMarks] = useState([])

    const [panelOptions, setPanelOptions] = useState({info: "Info", add: "Add", html: "HTML"})
    const [title, setTitle] = useState("Kentucky Meat Rain")
    const [author, setAuthor] = useState("Name or Sudonim")
    const [tags, setTags] = useState([["Text Here", "#f1fd66"]])
    const [category, setCategory] = useState("Example Category")


    const [resources, setResources] = useState([
    ]);

 

    const [selection, setSelection] = useState();
    const [selectedComp, setSelectedComp] = useState();
    const [sizeDrop, setSizeDrop] = useState(false);
    const [linkInput, setLinkInput] = useState(false);
    const [textIsHighlighted, setTextIsHighlighted] = useState(false)
    const [innerHtmlContent, setInnerHtmlContent] = useState([]);
    const [styleClick, setStyleClick] = useState()
    const [numStyles, setNumStyles] = useState(0)
    const [compWithStyleChange, setCompWithStyleChange] = useState(null);
    const [isPreviewEnabled, setIsPreviewEnabled] = useState(false)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [isContentLoaded, setIsContentLoaded] = useState(false);

    const [lastCompWithStyleChange, setLastCompWithStyleChange] = useState(null);
    const [lastHrefId, setLastHrefId] = useState("")


    useEffect(() => {
        // Click handler
        const handleClick = () => {
          // Additional logic for click event can be added here
        };
    
        // Selection change handler
        const handleSelectionChange = () => {
            let tempSelection = window.getSelection();
            setSelection(tempSelection)

            if (tempSelection.rangeCount) {
                setTextIsHighlighted(true)
            }
        };
    
        // Attach the event listeners
        window.addEventListener('click', handleClick);
        document.addEventListener('selectionchange', handleSelectionChange);
    
        // Clean up the event listeners
        return () => {
          window.removeEventListener('click', handleClick);
          document.removeEventListener('selectionchange', handleSelectionChange);
        };
      }, []); 
    

    const moveComponent = useCallback((dragIndex, hoverIndex) => {
        const dragItem = compArray[dragIndex];
        const newCompArray = [...compArray];
        newCompArray.splice(dragIndex, 1);
        newCompArray.splice(hoverIndex, 0, dragItem);
        setCompArray(newCompArray);
    }, [compArray]);

    const handleAddComponent = (type) => {
        const newId = compArray.length + 1;
        let newComponent;
        if(type === "header"){
            newComponent = { type: type, size: "md", style: [], id: `${newId}`, content: "New Text" };
        }else if(type === "paragraph"){
            newComponent = { type: type, size: "md", style: [], id: `${newId}`, content: "New Text"}
        }else if(type === "image"){
            newComponent = { type: type, size: "", style: [], id: `${newId}`, content: "" };
        }else if(type === "resource"){
            newComponent = { type: type, size: "", style: [], id: `${newId}`, content: "Test Resource" };
        }
        

        setCompArray([...compArray, newComponent]);
        
    };

    const handleRemoveComponent = (id) => {
        setCompArray(compArray.filter((comp) => comp.id !== id));
    };

    const handleSelectComponent = (id, e) => {
        e.preventDefault();

            handleGetInnerHtml(e)

        if(e.target.id === "clickable-parent"){
            if (selectedComp === id) {
                // Toggle the dropdown only if the same component is clicked again
                toggleSizeDropdown();
                setSelectedComp();
            } else {
                // Close the dropdown when a different component is selected
                setSizeDrop(false);
                setSelectedComp(id);
            }
        }
    }

    const handleGetInnerHtml = (e) => {
        if(e.target.id === "clickable-parent"){
            setInnerHtmlContent([e.target.children[1].getAttribute('data-compid'), e.target.children[1].innerHTML]);
        }else{
            let nodeName = e.target.nodeName;
            if(nodeName === "svg"){
                let parent = e.target.parentElement;
                if(parent.id === "clickable-parent"){
                    setInnerHtmlContent([parent.children[0].getAttribute('data-compid'), e.target.innerHTML]);
                }
            }
        }
    }

    

    useEffect(() => {
        const getContentById = (compArray, id) => {
            const element = compArray.find(item => item.id === id);
            return element ? element.content : null;
        }

        setInnerHtmlContent([innerHtmlContent[0], getContentById[compArray, innerHtmlContent[0]]])
    }, [compArray])

   
    const toggleStyle = (newStyle) => {
        const currentTag = new RegExp(`<${newStyle} id="style-\\d+">|</${newStyle}>`, 'g');
        const anyTag = new RegExp(`<. id="style-\\d+">|</.>`, 'g');
        const startTag = new RegExp(`<. id="style-\\d+">`, 'g');
        const removePattern = /<u id="style-\d+">.*?<\/u>/s;
        const createArray = /<[^>]*>|[^<]+/g;
        const createArray2 = /<[^>]+>|./g;
        const endTag = new RegExp(`</.>`, 'g');
        const regex = /<\/?.+?>/;

        if (!selection || !selection.rangeCount) return;
    
        let mode = "add"
        let replaceType = "";

        let focusOffset;
        let anchorOffset;
        if( selection.focusOffset > selection.anchorOffset){
            anchorOffset = selection.anchorOffset;
            focusOffset = selection.focusOffset;
        }else{
            anchorOffset = selection.focusOffset;
            focusOffset = selection.anchorOffset;
        }

        let range = selection.getRangeAt(0);
        let selectedText = range.toString();

        let backupRange = range.cloneRange();  

        if (!selectedText.trim()) return;  // Exit if the selection is empty
    
        let commonAncestor = range.commonAncestorContainer;
    
        // Ensure we're working with an element node
        let parentElement = commonAncestor.nodeType === Node.ELEMENT_NODE ? commonAncestor : commonAncestor.parentNode;
        if (!parentElement || parentElement.nodeType !== Node.ELEMENT_NODE) return;
    
        let id = parentElement.getAttribute('data-compid');

        let isOrignalParent = true 

  
        if(!parentElement.getAttribute('data-compid')){
            isOrignalParent = false;
            while(!parentElement.getAttribute('data-compid')){
                parentElement = parentElement.parentNode
            }
            id = parentElement.getAttribute('data-compid')

        }


        let oldContent;
        let fullContent = parentElement.innerHTML;


        const convertRangeText = (r, ignore) => {
            let container = document.createElement("div");
            container.appendChild(r.cloneContents());
            if(!ignore){
                if(container.innerHTML[container.innerHTML.length - 1] === ">"){
                    return "left";
                }else if(container.innerHTML[0] === "<"){
                    return "right";
                }else{
                    return container.innerHTML;
                }
            }else{
                return container.innerHTML;
            }

        }


        const hasAnyTag = (r) => {
            const text = convertRangeText(r)
            return anyTag.test(text)
        }

        const hasCurrentTag = (r) => {
            const text = convertRangeText(r)
            return currentTag.test(text)
        }

        const convertToHtml = (string) => {
            let container = document.createElement("div");
            container.innerHTML = string;
            return container.firstChild;
        }

        function splitStringAndTags(input) {
            // Initialize an empty array to hold the result
            const result = [];
            
            // Use a regex to match tags and text outside of tags
            const regex = /<[^>]+>|[^<]+/g;
            
            // Find all matches
            let match;
            while ((match = regex.exec(input)) !== null) {
                // Check if the match is a tag or text
                if (match[0][0] === '<') {
                    // If it's a tag, push it directly to the result array
                    result.push(match[0]);
                } else {
                    // If it's text, split it into individual characters and add each to the result
                    match[0].split('').forEach(char => result.push(char));
                }
            }
            
            return result;
        }
        

        //add style across styles
        const forumateNewContent = (r) => {
            let direction = convertRangeText(r)
            let oldContentArray = []
            let newContentArray = []
            let html = '';
            if(direction === "right"){
                html = convertRangeText(r, true).replace(endTag, "")
                let tagArray = html.match(anyTag)
                oldContentArray = html.match(createArray)
                newContentArray = []

                let tempNewContent;
                for(let i = 0; i < oldContentArray.length; i++){
                    for(let j = 0; j < tagArray.length; j++){
                        if(oldContentArray[i] !== tagArray[j]){
                            tempNewContent = toggleIndividualStyle(oldContentArray[i], newStyle);
                            newContentArray.push(tempNewContent);
                        }else{
                            newContentArray.push("");
                        }
                    }
                }

                newContent = '';

                for(let i = 0; i < newContentArray.length; i++){
                    if(newContentArray[i] !== ''){
                        newContent = newContent + newContentArray[i];
                    }else{
                        newContent = newContent + oldContentArray[i];
                    }
                    
                }
            }else if(direction === "left"){
                html = convertRangeText(r, true).replace(startTag, "")
                let tagArray = html.match(anyTag)
                oldContentArray = html.match(createArray)
                newContentArray = []

                let tempNewContent;
                for(let i = 0; i < oldContentArray.length; i++){
                    for(let j = 0; j < tagArray.length; j++){
                        if(oldContentArray[i] !== tagArray[j]){
                            tempNewContent = toggleIndividualStyle(oldContentArray[i], newStyle);
                            newContentArray.push(tempNewContent);
                        }else{
                            newContentArray.push("");
                        }
                    }
                }

                newContent = '';

                for(let i = 0; i < newContentArray.length; i++){
                    if(newContentArray[i] !== ''){
                        newContent = newContent + newContentArray[i];
                    }else{
                        newContent = newContent + oldContentArray[i];
                    }
                    
                }
            }

            if(direction === "right"){
                const tempParentElement = selection.getRangeAt(0).commonAncestorContainer.parentNode.outerHTML
                const stringTagArray = splitStringAndTags(tempParentElement)
                
                const startIndex = oldContentArray.indexOf(stringTagArray[0])

                const splitLength = oldContentArray.slice(startIndex, (oldContentArray.length)).length
                const missingString = stringTagArray.slice(splitLength, stringTagArray.length).toString().replace(',', '')

                newContent = newContent + missingString;
                oldContent = html + missingString;


                mode = "add"
                return true;
            }else if(direction === "left"){
                const tempParentElement = selection.getRangeAt(0).commonAncestorContainer.parentNode.outerHTML
                const stringTagArray = splitStringAndTags(tempParentElement)

                const startIndex = oldContentArray.indexOf(stringTagArray[stringTagArray.length])

                const splitLength = oldContentArray.slice(0, startIndex).length
                const missingString = stringTagArray.slice(0, splitLength).toString().replace(',', '')

                newContent = missingString + newContent;
                oldContent = missingString + html;


                mode = "add"
                return true;
            }
            return false;

        }

        //Get position from nearest style element for adding new style
        const getSelectionPosition = (r) => {
            const originalContainer = r.commonAncestorContainer
            let newContainer = r.commonAncestorContainer.parentNode

            const fullContentArray = fullContent.match(createArray2)
            
            
            let i = 0;

            if(newContainer.hasAttribute("data-compid")){
                
                let j = 0;
                
                const isEditable = newContainer.getAttribute("contentEditable")
                while (newContainer &&  isEditable === "true") {
                    selection.modify("move", "left", "character");
                    newContainer = selection.getRangeAt(0).commonAncestorContainer;
                    if(selection.focusOffset === 0){
                        if(j > 1){
                            console.log("POSITION SET IN FIRST")
                            return [anchorOffset, focusOffset]
                        }
                        j++;
                    }
                    i++;

                    if((newContainer && newContainer.parentNode.getAttribute("contentEditable") !== "true")){
                        newContainer = newContainer.parentNode;

                        const containerString = newContainer.outerHTML
                        const containerArray = containerString.match(createArray2)

                        let position = fullContentArray.indexOf(containerArray[0])

                        position = position + containerArray.length;
                        console.log("POSITION SET IN SECOND")
                        return [position + anchorOffset, position + focusOffset - 1];
                    }else if(i > fullContent.length){
                        console.log("POSITION SET IN THIRD")
                        return NaN;
                    }
                }
            }else{
                console.log("INSIDE ELSE")
                let lastContainer;


                if(newContainer.nodeName !== "DIV"){
                    while(newContainer === originalContainer.parentNode){
                        lastContainer = newContainer;
                        selection.modify("move", "left", "character");
                        newContainer = selection.getRangeAt(0).commonAncestorContainer.parentNode;

                        if((newContainer !== originalContainer.parentNode)){
                            if(newContainer === originalContainer.parentNode.parentNode){
                                const containerString = lastContainer.outerHTML
                                const containerArray = containerString.match(createArray2)
                
                                let position = fullContentArray.indexOf(containerArray[0]) + 1
                                console.log("POSITION SET IN FOURTH")
                                return [position + anchorOffset, position + focusOffset - 1];
                            }else{
                                let containerString = newContainer.outerHTML
                                let containerArray = containerString.match(createArray2)
        
                                let position = fullContentArray.indexOf(containerArray[0])
                                position = position + containerArray.length;

                                const direction = convertRangeText(r)
                                
                                if(direction === "left"){
                                    return "right overlap"
                                }else if(direction === "right"){
                                    return "left overlap"
                                }
                                console.log("POSITION SET IN FIFTH")
                                return [position + anchorOffset, position + focusOffset - 1];
                            }
                        }
                    }
                }else{
                    console.log("INSIDE LAST ELSE")
                    const tempOrignalContainer = selection.getRangeAt(0).commonAncestorContainer.parentNode;
                    let direction = convertRangeText(r)




                    let j = 0;
                    let i = 0;
                    while(j !== 5){

                        selection.modify("move", "left", "character");
                        newContainer = selection.getRangeAt(0).commonAncestorContainer.parentNode;

                        if(i === 0){
                            if(selection.anchorOffset === (focusOffset - 1) && selection.focusOffset === (focusOffset - 1)){
                                let tempAnchorOffset = anchorOffset
                                anchorOffset = focusOffset;
                                focusOffset = tempAnchorOffset
                            }
                        }


                        if(selection.anchorOffset !== 0){
                            i++;
                        }

                    
                        if(selection.anchorOffset === 0){
                            let offset = 0;
                            if(j === 5){
                                for(let j = 0; j < (fullContentArray.length - 1); j++){
                                    if(j >= anchorOffset){
                                        if(j <= (anchorOffset + r.toString().length + offset)){
                                            if(anyTag.test(fullContentArray[j])){
                                                offset++;;
                                            }
                                        }
                                    }
                                }
                                return [i, (i + r.toString().length + offset)]
                            }else{
                                j++;
                            }

                        }else if(newContainer !== tempOrignalContainer){
                            if(direction === "right"){
                                const containerString = tempOrignalContainer.outerHTML
                                const containerArray = containerString.match(createArray2)

                                let position = fullContentArray.indexOf(containerArray[0]) + 1

                                const startPosition = position + anchorOffset;

                                let offset = 0;
                                for(let i = 0; i < fullContentArray.length; i++){
                                    if(i >= startPosition){
                                        if(i < (startPosition + r.toString().length + offset)){
                                            if(anyTag.test(fullContentArray[i])){
                                                offset++;;
                                            }
                                        }
                                    }
                                }


                                const endPosition = startPosition + r.toString().length + offset;

                                return [startPosition, endPosition]
                                // const containerString = newContainer.parentNode.outerHTML
                                // const containerArray = containerString.match(createArray2)
                
                                // let position = fullContentArray.indexOf(containerArray[0]) + 1
                                // let startPosition = position + containerArray.length + i - 2;
    
                                // let offset = 0;
                                // for(let j = 0; j < (fullContentArray.length - 1); j++){
                                //     if(j >= position){
                                //         if(j <= (position + r.toString().length + offset)){
                                //             if(anyTag.test(fullContentArray[j])){
                                //                 offset++;;
                                //             }
                                //         }
                                //     }
                                // }

    
  
                                // let endPosition = startPosition + r.toString().length + offset + 1
                                // console.log("POSITION SET IN SEVENTH")
                                // console.log("POSITION: " + startPosition, endPosition)
                                // return [startPosition, endPosition]
                            }
                        }           
                    }
                }
            }
        }

        const checkIfAlreadyHasStyle = (r, style, type, position) => {
            let newTempContainer = r.commonAncestorContainer.parentNode

            if(type === "move"){
                if(newTempContainer.nodeName === "DIV"){
                    newTempContainer = r.commonAncestorContainer
                }else{
                    newTempContainer = r.commonAncestorContainer.parentNode
                }

                if(newTempContainer.nodeType !== 3){
                    while(!newTempContainer.hasAttribute("contenteditable")){
                        if(newTempContainer.nodeName.toLowerCase() === style){
                            return newTempContainer.outerHTML;
                        }
                        newTempContainer = newTempContainer.parentNode;
                    }

                    let direction = convertRangeText(r)
                    let newContainer;
                    

                    if(direction === "right"){
                        console.log("RIGHT")
                        newContainer = newTempContainer;
                        while(newContainer === newTempContainer){
                            selection.modify("move", "LEFT", "character");
                            newContainer = selection.getRangeAt(0).commonAncestorContainer.parentNode;

                            if(newContainer !== newTempContainer){
                                if(newContainer.nodeName.toLowerCase() === style){
                                    return newContainer.outerHTML;
                                }else{
                                    return "right"
                                }
                            }
                        }
                    }else if(direction === "left"){
                        console.log("LEFT")
                        newContainer = newTempContainer;
                        while(newContainer === newTempContainer){
                            selection.modify("move", "right", "character");
                            newContainer = selection.getRangeAt(0).commonAncestorContainer.parentNode;

                            if(newContainer !== newTempContainer){
                                if(newContainer.nodeName.toLowerCase() === style){
                                    return newContainer.outerHTML;
                                }else{
                                    return "left"
                                }
                            }
                        }
                    }
                }
            }else if("scan"){
                const fullContentArray = fullContent.match(createArray2)

                let tempContent = ""

                let hasStyle = false;

                for(let i = 0; i < fullContentArray.length - 1; i++){
                    if(i >= position[0]){
                        if(i <= position[1]){
                            if(fullContentArray[i][0] === "<" && fullContentArray[i][1] === "/" && fullContentArray[i][2] === style || fullContentArray[i][0] === "<" && fullContentArray[i][1] === style){
                                hasStyle = true
                                tempContent = fullContentArray[i]
                            }
                        }
                    }
                }

                if(hasStyle === true){
                    return tempContent;
                }else{
                    return undefined;
                }
            }else{
                console.log("INPUT IS NOT A TYPE")
            }
        }


        const getStyleElements = (ancestor, style) => {
            let newTempContainer = ancestor


            const searchCloseTag = (fullContentArray, startIndex, style) => {
                for(let i = startIndex; i <= fullContentArray.length - 1; i++){
                    let content = fullContentArray[i]

                    if(content[0] === "<" && content[1] === "/" && content[2] === style){
                        return [content, i]
                    }
                }
            }

            let toRemove = []

            if(regex.test(newTempContainer.outerHTML)){
                const fullContentArray = fullContent.match(createArray)

                for(let i = 0; i <= fullContentArray.length - 1; i++){
                    let content = fullContentArray[i]

                    if(content.includes(newStyle) && content.includes(newTempContainer.id)){
                        toRemove.push([content, i], searchCloseTag(fullContentArray, i, newStyle))
                    }
                }
            }
        }

        //add style based on its position
        if(isOrignalParent && !hasAnyTag(range)){
            oldContent = selectedText;
        }else{
            oldContent = selectedText;
        }
 


        const toggleIndividualStyle = (position, style, direction) => {
            let openTag;
            let closeTag;


            if(style !== "a"){
                openTag = `<${style} id="style-${numStyles + 1}">`;
                closeTag = `</${style}>`;
                setNumStyles(numStyles + 1)
            }else{
                openTag = `<a onClick="" id="style-${numStyles + 1}">`;
                closeTag = `</a>`;
                setLastHrefId(`style-${numStyles + 1}`)
                setNumStyles(numStyles + 1)
            }

            let fullContentArray = fullContent.match(createArray2)

            let parcedContent = [[]]

            let content = "";

            if(direction){
               
                let startIndex = position[0]
                let endIndex = position[1]
                let tempString = ""

                parcedContent.pop();
                for(let i = 0; i < fullContentArray.length - 1; i++){
                    if(i >= position[0]){
                        if(i <= (position[1])){
                            if(anyTag.test(fullContentArray[i])){
                                endIndex = i - 1

                                let tempParcedContent = [tempString, startIndex, endIndex]

                                parcedContent.push(tempParcedContent)

                                startIndex = i + 1
                                tempString = ""
                            }else if(i === position[1]){
                                endIndex = i

                                let tempParcedContent = [tempString, startIndex, endIndex]

                                parcedContent.push(tempParcedContent)
                            }else{
                                tempString = tempString + fullContentArray[i] 
                            }
                        }
                    }
                }
            }else{
                if(Array.isArray(position)){
                    for(let i = 0; i < fullContentArray.length - 1; i++){
                        if(i >= position[0]){
                            if(i <= (position[1])){
                                content = content + fullContentArray[i];
                            }
                        }
                    }
                }else{
                    content = position;
                }
            }
            
            let tempString;
            
            if(direction){
                let tempNewContentArray = [];
                
                for(let i = 0; i < parcedContent.length; i++){
                    let pushOffset = 0;
                    let tempContentArray = parcedContent[i][0].match(createArray2)
                    for(let j = 0; j < (fullContentArray.length - 1 + pushOffset); j++){
                        if(i > 0 && pushOffset === 0){
                            j = (parcedContent[i][1] + (i * 2))
                        }
                        if(j >= parcedContent[i][1]){
                            if(j <= parcedContent[i][2]){
                                console.log("INSIDE RANGE")
                                if(pushOffset === 0){
                                    console.log("IN FIRST IF")
                                    tempNewContentArray.push(openTag)
                                    tempNewContentArray.push(tempContentArray[0])
                                    pushOffset = pushOffset + 2
                                }else if(pushOffset < tempContentArray.length){
                                    console.log("IS LESS THEN LEGTH BUT NOT 0")
                                    tempNewContentArray.push(tempContentArray[pushOffset])
                                    console.log("IN LAST ELF")
                                    pushOffset++;

                                    if(pushOffset === tempContentArray.length){
                                        tempNewContentArray.push(closeTag)
                                        console.log("IN LAST IF")
                                        pushOffset++
                                    }
                                }
                            }
                        }else{
                            tempNewContentArray.push(fullContentArray[j - pushOffset])
  
                            
                        }
                    }
                    console.log(tempNewContentArray)
                }
                
            }else if (content && currentTag.test(content)) {
                // Remove existing style tags
                tempString = content.replace(currentTag, '');
                return tempString.replace(currentTag, '');
            } else if (content){
                return openTag + content + closeTag;
            }
        };

        const replaceByRange = (s, start, end, replace) => {
            console.log("CONTEND REPLACED")
            console.log("")
            console.log("")
            console.log("")
            console.log("")
            const fullContentArray = s.match(createArray2)
            const newContentArray = replace.match(createArray2);

            

            let tempNewContent = "";
            let startContent = "";
            let endContent = "";


            if(numStyles === 0){
                tempNewContent = s.substring(0, start) + replace + s.substring(end, s.length)
            }else{
                for(let i = 0; i < (fullContentArray.length); i++){
                    if(i < start){
                        startContent = startContent + fullContentArray[i]
                        
                    }else if(i > end){
                        endContent = endContent + fullContentArray[i]
                    }
                }
                tempNewContent = startContent + replace + endContent;
            }

            return tempNewContent;
        }

        const replaceById = (full, old, replace) => {
            console.log("CONTEND REPLACED")
            console.log("")
            console.log("")
            console.log("")
            console.log("")
            return full.replace(old, replace);
        }

        let newStyleContent;
        let newContent;

        if(!regex.test(oldContent) && numStyles === 0){
            newStyleContent = toggleIndividualStyle([anchorOffset, focusOffset - 1], newStyle);
            newContent = replaceByRange(fullContent, anchorOffset, focusOffset, newStyleContent);

        }else if(numStyles !== 0){
            let direction;
            let hasStyleAlready = checkIfAlreadyHasStyle(range, newStyle, "move");

            if(hasStyleAlready === "left" || hasStyleAlready === "right"){
                direction = hasStyleAlready
            }

            console.log(direction)
            if(direction){
                if(direction === "left"){
                    const position = getSelectionPosition(range)
                    newStyleContent = toggleIndividualStyle(position, newStyle);
                }else if(direction === "right"){
                    const position = getSelectionPosition(range)
                    newStyleContent = toggleIndividualStyle(position, newStyle, "right");
                }
            }if(hasStyleAlready){
                newStyleContent = toggleIndividualStyle(hasStyleAlready, newStyle);
                newContent = replaceById(fullContent, hasStyleAlready, newStyleContent);
            }else{
                const position = getSelectionPosition(range)

                hasStyleAlready = checkIfAlreadyHasStyle(range, newStyle, "scan", position)

                if(hasStyleAlready){
                    newStyleContent = toggleIndividualStyle(hasStyleAlready, newStyle);
                }else{
                    newStyleContent = toggleIndividualStyle(position, newStyle);
                    newContent = replaceByRange(fullContent, position[0], position[1], newStyleContent);
                }
            }
        }else{
            newContent = replaceById(fullContent, oldContent, newStyleContent);
        }

        setStyleClick(false);
        editContent(id, newContent, "toggleStyles");
        setLastCompWithStyleChange(id)
    };

    const handleItalicClick = () => {
        if (selection && selection.toString().length > 0) {
            setStyleClick(true)
            setTextIsHighlighted(false)
            toggleStyle('i');
            
        }
    };

    const handleBoldClick = () => {
        if (selection && selection.toString().length > 0) {
            setTextIsHighlighted(false)
            setStyleClick(true)
            toggleStyle('b');
        }
    };

    const handleUnderlineClick = () => {
        if (selection && selection.toString().length > 0) {
            setStyleClick(true)
            setTextIsHighlighted(false)
            toggleStyle('u');
        }
    };

    const handleStrikethroughClick = () => {
        if (selection && selection.toString().length > 0) {
            setTextIsHighlighted(false)
            setStyleClick(true)
            toggleStyle('s');
        }
    };

    const handleLink = () => {
        if (selection && selection.toString().length > 0) {
            setStyleClick(true)
            toggleStyle('a');
            setTextIsHighlighted(false)
            setLinkInput(prevState => !prevState);
        }
        
        
    };

    const toggleSizeDropdown = () => {
        if (selectedComp) {
            setSizeDrop(prevState => !prevState);
        }
    }

    const togglePreviewEnabled = () => {
        setIsPreviewEnabled(prevState => !prevState);
    }

    const toggleSideBar = () => {
        setIsSideBarOpen(prevState => !prevState);
    }

    const handleLinkInput = (e) => {
        let url = e.target.value;
        if(e.key === "Enter"){
            let tempContent;
            setCompArray(compArray.map(comp => {
                if (comp.id === lastCompWithStyleChange) {
                    tempContent = comp.content.replace(`href="" id="${lastHrefId}"`, `href="${url}" id="${lastHrefId}"`);
                    setLinkInput(prevState => !prevState);

                    let inputElement = document.getElementById("link-input")
                    inputElement.blur()
                    inputElement.value = "";
                }
            }));
            editContent(lastCompWithStyleChange, tempContent, "handleLinkInput")
        }
    }

    

    const handleChangeSize = (id) => {
        setCompArray(compArray.map(comp => {
            if (comp.id === selectedComp) {
                return { ...comp, size: id};
            }
            return comp;
        }));
    };


    const editContent = (id, newContent, from) => {
        setCompArray(compArray.map(comp => {
            console.log(comp)
            if (comp.id === id) {
                return { ...comp, content: newContent };
            }else if(comp.id === ("header-" + id) || comp.id === ("bookmarked-header-" + id)){
                return { ...comp, content: newContent }
            }
            if(from === "toggleStyles"){
                if(compWithStyleChange !== id){
                    setCompWithStyleChange(id, comp)
                }else{
                    setCompWithStyleChange(null)
                    setLastCompWithStyleChange(id, comp)
                }
            }
            return comp;
        }));
    };

    useEffect(() => {
        if(compWithStyleChange !== null){
            console.log(compWithStyleChange)
            handleCompBlur(null, compWithStyleChange, compWithStyleChange[1])
        }else if(lastCompWithStyleChange !== null){
            console.log(compWithStyleChange)
            handleCompBlur(null, lastCompWithStyleChange, lastCompWithStyleChange[1])
            setLastCompWithStyleChange(null)
            setCompWithStyleChange(lastCompWithStyleChange)
        }
    }, [compWithStyleChange])



    const handleCompBlur = (e, id, comp) => {
        let element;
        console.log(comp)
        if(comp.type === "header"){
            if(comp.isBookMarked){
                element = document.getElementById("bookmarked-header-" + id)
            }else{
                element = document.getElementById("header-" + id)
            }
        }else{
            element = document.getElementById(id)
        }
        

        console.log(element)
        if(element.firstChild.hasAttribute("data-compid")){
            let child = element.firstChild
            console.log(child)
            compArray.map(comp => {
                console.log(child)
                if(comp.id === id){
                    console.log(child)
                    if(child.innerHTML !== comp.content){
                        console.log(child)
                        child.innerHTML = comp.content;

                    }
                }
            })
        }
    }

    const handleLoadCompData = () => {
        const textContainer = document.getElementById("text-editor-container")
        console.log("HANDLE LOAD COMP DATA")
        console.log(textContainer)
        if(textContainer){
            const childrenArray = textContainer.childNodes
            childrenArray.forEach(child => {
                if(child.id === "clickable-parent"){
                    const grandChildren = child.childNodes
                    console.log(grandChildren)
                    grandChildren.forEach(child => {
                        console.log(child)
                        
                        const id = child.id
                        compArray.map(comp => {
                            console.log("Inside if")
                            if(comp.id === id || comp.id === id[id.length - 1] || comp.id === id[id.length - 1]){
                                console.log("Inside if")
                                if(child.innerHTML !== comp.content){
                                    child.firstChild.innerHTML = comp.content;
                                }
                            }
                        })
                        console.log("  ")
                    })
                }
            })
            setIsContentLoaded(true);
        }
    }

    const handleLoadBookMarks = (comp) => {

        let headerBookmark = "#bookmarked-header-" + comp.id

        if(comp.type === "header"){
            if(bookMarks.length === 0){
                setBookMarks([...bookMarks, [comp.content, headerBookmark]])
            }else{
                for(let i = 0; i <= bookMarks.length - 1; i++){
                    if(bookMarks[i][1].includes(headerBookmark)){
                        break;
                    }else if(i === bookMarks.length - 1){
                        setBookMarks([...bookMarks, [comp.content, headerBookmark]])
                    }
                }
            }
        }
    }

    const handleCompSelection = (e) => {
        setSelection(window.getSelection())
    }



    const handleCompInput = (e, id) => {
        const newContent = e.target.innerHTML;
        editContent(id, newContent, "handleCompInput")
    };

    const handleHeaderInput = (e, id) => {
        const newContent = e.target.innerHTML;
        setCompArray(compArray.map(comp => {
            if (comp.id === id) {
                return { ...comp, content: newContent };
            }
            return comp;
        }));
    };

    const handleExportContent = () => {
        const articleContent = {title: title, author: author, components: compArray, tags: tags, category: category}
        console.log(articleContent)
    }

    
    return (
        <>
        <DndProvider backend={HTML5Backend} >
            <div className="w-full" id="text-editor">
                <div className="flex justify-between w-full h-[50px] border-t-black border-t-[3px] px-[15px] bg-base-300">
                    <div className="flex w-max h-full">
                        <button  className={`flex justify-center items-center w-[50px] h-full ${selectedComp ? "bg-base-100" : "bg-base-300"}`} onClick={() => toggleSizeDropdown()}>
                            <RiFontSize className={`text-3xl text-t-header-dark ${selectedComp ? "text-t-header-light" : "text-t-header-dark"}`} />
                        </button >
                        <SizeDropDown className={`${(sizeDrop && selectedComp)? "w-max" : "w-0"}`} onClick={handleChangeSize} />
                        <button  className={`flex justify-center items-center w-[50px] h-full border-r-[3px] border-r-base-300 ${(textIsHighlighted === true) ? "bg-base-100 text-t-header-light" : "bg-base-300 text-t-header-dark"}`} onClick={handleBoldClick}>
                            <FaBold />
                        </button >
                        <button className={`flex justify-center items-center w-[50px] h-full border-r-[3px] ${((textIsHighlighted) === true) ? "bg-base-100 text-t-header-light" : "bg-base-300 text-t-header-dark"}`} onClick={handleItalicClick}>
                            <FaItalic />
                        </button >
                        <button className={`flex justify-center items-center w-[50px] h-full border-r-[3px] ${(textIsHighlighted === true) ? "bg-base-100 text-t-header-light" : "bg-base-300 text-t-header-dark"}`} onClick={handleStrikethroughClick}>
                            <FaStrikethrough />
                        </button >
                        <button className={`flex justify-center items-center w-[50px] h-full border-r-[3px] ${(textIsHighlighted === true) ? "bg-base-100 text-t-header-light" : "bg-base-300 text-t-header-dark"}`} onClick={handleUnderlineClick}>
                            <FaUnderline />
                        </button >
                        <button className={`flex justify-center items-center w-[50px] h-full border-r-[3px] ${(textIsHighlighted === true) ? "bg-base-100 text-t-header-light" : "bg-base-300 text-t-header-dark"}`} onClick={handleLink}>
                            <FaList />
                        </button >
                        <button className={`flex justify-center items-center w-[50px] h-full border-r-[3px] ${(textIsHighlighted === true) ? "bg-base-100 text-t-header-light" : "bg-base-300 text-t-header-dark"}`} onClick={handleLink}>
                            <FaLink />
                        </button >

                        <input id="link-input" placeHolder="URL..." onKeyDown={(e) => handleLinkInput(e)} className={`flex flex-row bg-base-100 overflow-hidden h-full ${(linkInput)? "w-[300px]" : "w-0"}  `}>

                        </input>
                    </div>
                    <button className={`w-max h-full px-[15px] ${isPreviewEnabled ? "bg-primary" : "text-t-header-dark"}`} onClick={togglePreviewEnabled}>
                        Preview
                    </button>
                </div>
                
                <div className="flex w-full h-[700px] border-y-[3px] ">
                                        
                    <div className={`h-full flex items-center border-r-[3px] ${isSideBarOpen ? "w-max" : "w-0"}`}>
                        <div className={`h-full overflow-hidden ${isSideBarOpen ? "w-max" : "w-0" }`}>
                            <ControlPanel panelOptions={panelOptions} handleAddComponent={handleAddComponent} handleHeaderInput={handleHeaderInput} setTitle={setTitle} currentTitle={title} setAuthor={setAuthor} currentAuthor={author} setTags={setTags} currentTags={tags} setCategory={setCategory} innerHtml={innerHtmlContent} exportContent={handleExportContent}/>
                        </div>
                        <div className='w-0 h-[45px] '>
                            <div className='w-[25px] relative rounded-r  h-full flex items-center justify-center bg-base-300' onClick={() => toggleSideBar()}>
                                {
                                    (isSideBarOpen)
                                    ?
                                    <IoIosArrowBack className="text-t-header-dark text-2xl " />
                                    :
                                    <IoIosArrowForward className="text-t-header-dark text-2xl"/>
                                }
                            </div>
                        </div>                     
                    </div>
                    <div  className="flex flex-col items-center min-w-[100vw] lg:min-w-0 lg:grow  h-full overflow-y-scroll px-[25px] md:pl-[30px] pb-[100px] pt-[50px]">
                        {/* <div className="w-full h-0 z-10"> 
                            <div className={`w-full  flex justify-center items-center bg-base-100 `}>
                                <div className="relative loader-container">
                                    <div className="block-dark"></div>
                                    <div className="block-dark"></div>
                                    <div className="block-dark"></div>
                                    <div className="block-dark"></div>
                                </div>
                            </div>
                        </div> */}
                        <div className="h-0 w-full flex">
                            {/* <div className="relative w-full h-[700px] top-0 left-[0px] bg-base-300 flex flex-col justify-center">
                                <div className="flex justify-between items-center">
                                    <div className='w-[25px] relative rounded-r  left-[-30px] h-[45px] flex items-center justify-center bg-base-100 lg:bg-base-300' onClick={() => toggleSideBar()}>
                                        <IoIosArrowBack className="text-t-header-light lg:text-t-header-dark text-2xl " />
                                    </div>
                                    <Header type={"sm"} classes="w-max text-t-dark" styles={{lightColor: "text-t-header-dark"}}>
                                        Please make your screen bigger.
                                    </Header >
                                    <div className='w-[25px] relative rounded-l h-[45px] flex items-center justify-center bg-base-100 lg:bg-base-300' onClick={() => toggleSideBar()}>
                                        <IoIosArrowForward className="text-t-header-light lg:text-t-header-dark text-2xl"/>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="flex w-full">
                            <div className={`w-full h-max md:grow flex ${!isPreviewEnabled && "px-[51px]"} md:px-0 justify-center`}>
                                <div className="w-full md:w-[800px] h-max flex flex-col items-center">
                                        <div className={`flexitems-center w-full ${isPreviewEnabled ? "md:w-full" : "md:w-[692px]"} gap-[30px]`} >
                                            <Header type={"lg"} classes="p-0 text-center" >
                                                {title}
                                            </Header>
                                        </div>
                                        <div className={`flex items-center w-full ${isPreviewEnabled ? "md:w-full" : "md:w-[692px]"} gap-[30px]`} >
                                            <div className="flex w-full items-center">
                                                <Header type={"sm"} classes="w-max">
                                                    By: <span className="font-normal">{author}</span>
                                                </Header>
                                            </div>
                                        </div>
                                </div>
                            </div>
                            {/* <div className="w-[250px] ml-[25px] mr-[50px] h-full">

                            </div> */}
                        </div>


                        <div className="w-full h-max flex flex-col justify-between">
                            {/* <div className="flex flex-col h-full w-[250px] ml-[25px] mr-[50px] gap-[15px] pt-[15px]">
                                {
                                    bookMarks.map((bookMark) => {
                                        console.log(bookMark)
                                        return(
                                            <a href={bookMark[1]}>{bookMark[0]}</a>
                                        )
                                    })
                                }
                            </div> */}
                            <div className="grow flex flex-col items-center h-full z-1 gap-[10px] ">
                                <div className="flex-col w-full md:w-[800px]" id="text-editor-container" >
                                    {compArray.map((comp, index) => (
                                        <DraggableComponent 
                                        key={comp.id} 
                                        comp={comp} 
                                        index={index} 
                                        length={compArray.length}
                                        moveComponent={moveComponent} 
                                        onClick={handleSelectComponent} 
                                        selected={selectedComp}
                                        removeComp={handleRemoveComponent}
                                        handleInput={handleCompInput}
                                        handleSelection={handleCompSelection}
                                        editContent={editContent}
                                        handleBlur={handleCompBlur}
                                        isEnabled={isPreviewEnabled}
                                        onLoad={handleLoadCompData}
                                        isLoaded={isContentLoaded}
                                        loadBookMarks={handleLoadBookMarks}
                                        isPreview={isPreviewEnabled}
                                        />
                                    ))}
                                    <div className={`flex items-center w-full gap-[30px] ${!isPreviewEnabled && "px-[51px]"}`} >
                                        <div className="flex flex-col h-max w-full gap-[15px]">
                                            <Header type="sm" classes="border-b-[2px] border-b-black w-full">
                                                Tags:
                                            </Header>
                                            <div className="flex flex-wrap items-center w-full h-max">
                                                {tags.map((tag, index) => (
                                                    <Tag key={`${index}-${tag[0]}`} backgroundColor={tag[1]} tag={tag[0]} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`flex items-center w-full gap-[30px] mt-[15px] ${!isPreviewEnabled && "px-[51px]"}`} >
                                        <div className="flex w-full items-center gap-[15px]">
                                            <Tag  backgroundColor={"#29ff80"} tag={category} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>                 
            </div>
        </DndProvider>
        </>
    );
};

export default TextEditor;

