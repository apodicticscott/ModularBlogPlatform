'use client'

import React, { useState, useEffect, useRef, useCallback } from "react";
import { GrDrag } from "react-icons/gr";
import { FaPlus, FaItalic, FaBold, FaStrikethrough, FaUnderline, FaLink } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { RiFontSize } from "react-icons/ri";
import { DndProvider, useDrag, useDrop,  } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RiFontFamily } from "react-icons/ri";
import { Paragraph} from "../TextComponents/Paragraph"
import { debounce, includes } from 'lodash';

import rangy from "rangy";
import Image from "../../components/TextComponents/Image";
import ControlPanel from "./ControlPanel"
import Tag from "../../components/TextComponents/NeoTag"
import Header from "../../components/TextComponents/Header1";
import Container from "../containers/containers";
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



const DraggableComponent = ({ comp, index, moveComponent, onClick, handleBlur, handleInput, handleSelection, selected, onSelect, removeComp, editContent, isEnabled}) => {
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


    const [{ isDragging }, drag] = useDrag({
        type: ItemType.COMPONENT,
        item: () => {
            return { id: comp.id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

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

    const handleKeyDown = (e) => {


    };
    
    drag(drop(ref));

    return (
        <div id="clickable-parent" ref={ref} style={{ opacity: isDragging ? 0 : 1, borderColor: "rgba(101, 101, 101, 0.7)" }} className={`${(selected === comp.id) && "border-[3px]"} flex items-center w-full gap-[30px] rounded-md`}  onClick={(e) => onClick(comp.id, e)}>
            <GrDrag className={`text-2.5xl ${isEnabled  && "hidden"}`} onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'}/>

                {comp.type === "header" && (
                    <Header 
                        type={comp.size} 
                        style={comp.style} 
                        id={comp.id} 
                        data-key={comp.id}
                        editable={true}
                        onClick={(e) => onClick(comp.id, e)}
                        onKeyUp={handleKeyUp}
                        onKeyDown={handleKeyDown}
                        onSelect={onSelect}
                        data-compid={comp.id}
                    >
                        <div ref={editableRef}  contentEditable={!isEnabled} data-compid={comp.id}  onInput={(e) => handleInput(e, comp.id)} onMouseUp={(e) => handleSelection(e)} onMouseLeave={(e) => handleBlur(e, comp.id)} id="clickable-child"  />
                    </Header>
                )}
                {comp.type === "image" && (
                    <Image src={comp.content} key={comp.id} >
                        
                    </Image>
                )}
                {/* Add cases for other types if needed */}
            <TiDelete className={`text-3xl ${isEnabled  && "hidden"}`} onClick={() => removeComp(comp.id)} onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'}/>
        </div>
    );
};

const TextEditor = () => {
    const [compArray, setCompArray] = useState([
        { type: "header", size: "md", style: [], id: "1", content: "This here Here here here here here" },
        { type: "header", size: "sm", style: [], id: "2", content: "Text Here" },
        { type: "image", size: "", style: [], id: "3", content: "" }
    ]);

 

    const [selection, setSelection] = useState();
    const [selectedComp, setSelectedComp] = useState();
    const [sizeDrop, setSizeDrop] = useState(false);
    const [linkInput, setLinkInput] = useState(false);
    const [textIsHighlighted, setTextIsHighlighted] = useState(false)
    const [panelOptions, setPanelOptions] = useState({info: "Info", add: "Add", html: "HTML"})
    const [title, setTitle] = useState("Example Title")
    const [author, setAuthor] = useState("Name or Sudonim")
    const [tags, setTags] = useState([["Text Here", "#f1fd66"]])
    const [category, setCategory] = useState("Example Category")
    const [innerHtmlContent, setInnerHtmlContent] = useState([]);
    const [styleClick, setStyleClick] = useState()
    const [numStyles, setNumStyles] = useState(0)
    const [compWithStyleChange, setCompWithStyleChange] = useState(null);
    const [isPreviewEnabled, setIsPreviewEnabled] = useState(false)

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
                    setInnerHtmlContent([parent.children[0].getAttribute('data-compid'), target.innerHTML]);
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
                            console.log("ISNIDE I === 0 if")
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
                                console.log("POSITION: " + i, (i + r.toString().length + offset))
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
                                console.log(startPosition);

                                let offset = 0;
                                for(let i = 0; i < fullContentArray.length; i++){
                                    if(i >= startPosition){
                                        if(i < (startPosition + r.toString().length + offset)){
                                            if(anyTag.test(fullContentArray[i])){
                                                console.log(fullContentArray[i])
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
                console.log(parcedContent)
            }else{
                if(Array.isArray(position)){
                    for(let i = 0; i < fullContentArray.length - 1; i++){
                        if(i >= position[0]){
                            if(i <= (position[1])){
                                content = content + fullContentArray[i]; console.log(fullContentArray[i])
                            }
                        }
                    }
                }else{
                    content = position;
                }
            }
            
            let tempString;
            
            console.log(parcedContent[0][1])
            console.log(direction)
            if(direction){
                let tempNewContentArray = [];
                
                for(let i = 0; i < parcedContent.length; i++){
                    let pushOffset = 0;
                    let tempContentArray = parcedContent[i][0].match(createArray2)
                    for(let j = 0; j < (fullContentArray.length - 1 + pushOffset); j++){
                        if(i > 0 && pushOffset === 0){
                            j = (parcedContent[i][1] + (i * 2))
                        }
                        console.log(parcedContent[i][1], parcedContent[i][2])
                        console.log(j)
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




        console.log(backupRange)
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
                    console.log(position)
                    newStyleContent = toggleIndividualStyle(position, newStyle);
                    console.log(newStyleContent)
                }else if(direction === "right"){
                    const position = getSelectionPosition(range)
                    console.log(position)
                    newStyleContent = toggleIndividualStyle(position, newStyle, "right");
                    console.log(newStyleContent)
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
            if (comp.id === id) {
                return { ...comp, content: newContent };
            }
            if(from === "toggleStyles"){
                if(compWithStyleChange !== id){
                    setCompWithStyleChange(id)
                }else{
                    setCompWithStyleChange(null)
                    setLastCompWithStyleChange(id)
                }
                
            }
            
            return comp;
            
        }));

        
    };

    useEffect(() => {
        if(compWithStyleChange !== null){
            handleCompBlur(null, compWithStyleChange)
        }else if(lastCompWithStyleChange !== null){
            handleCompBlur(null, lastCompWithStyleChange)
            setLastCompWithStyleChange(null)
            setCompWithStyleChange(lastCompWithStyleChange)
        }
    }, [compWithStyleChange])



    const handleCompBlur = (e, id, from) => {
        const element = document.getElementById(id)
        if(element.firstChild.hasAttribute("data-compid")){
            let child = element.firstChild
            compArray.map(comp => {
                if(comp.id === id){
                    if(child.innerHTML !== comp.content){
                        child.innerHTML = comp.content;

                    }
                }
            })
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


    
    return (
        <>  
        <DndProvider backend={HTML5Backend}>
            <div className="w-full h-[650px]" id="text-editor">
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
                            <FaLink />
                        </button >
                        <input id="link-input" placeholder="URL..." onKeyDown={(e) => handleLinkInput(e)} className={`flex flex-row bg-base-100 overflow-hidden h-full ${(linkInput)? "w-[300px]" : "w-0"}  `}>

                        </input>
                    </div>
                    <button className={`w-max h-full px-[15px] ${isPreviewEnabled ? "bg-primary" : "text-t-header-dark"}`} onClick={togglePreviewEnabled}>
                        Preview
                    </button>
                </div>
                
                <div className="flex w-full h-[600px] border-y-[3px] ">
                    <div className="flex flex-col items-center w-full h-full overflow-y-scroll pb-[100px]">
                        <div className="w-[60%] h-full ">
                            <div className={`flex items-center w-full gap-[30px]`} >
                                <GrDrag className="text-2.5xl opacity-[0]" />
                                <Header type={"landerTitle"} classes="p-0 text-center" >
                                    {title}
                                </Header>
                                <TiDelete className="text-3xl opacity-[0]"/>
                            </div>
                            <div className={`flex items-center w-full gap-[30px]`} >
                                <GrDrag className="text-2.5xl opacity-[0]" />
                                <div className="flex w-full items-center">
                                    <Header type={"sm"} classes="w-max">
                                        By: <span className="font-normal">{author}</span>
                                    </Header>
                                </div>

                                <TiDelete className="text-3xl opacity-[0]"/>
                            </div>
                            {compArray.map((comp, index) => (
                                <DraggableComponent 
                                key={comp.id} 
                                comp={comp} 
                                index={index} 
                                moveComponent={moveComponent} 
                                onClick={handleSelectComponent} 
                                selected={selectedComp}
                                removeComp={handleRemoveComponent}
                                handleInput={handleCompInput}
                                handleSelection={handleCompSelection}
                                editContent={editContent}
                                handleBlur={handleCompBlur}
                                isEnabled={isPreviewEnabled}
                                />
                            ))}
                            <div className={`flex items-center w-full gap-[30px]`} >
                                <GrDrag className="text-2.5xl opacity-[0]" />
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
                                <TiDelete className="text-3xl opacity-[0]"/>
                            </div>
                            <div className={`flex items-center w-full gap-[30px] mt-[15px]`} >
                                <GrDrag className="text-2.5xl opacity-[0]" />
                                <div className="flex w-full items-center gap-[15px]">
                                    <Tag  backgroundColor={"#29ff80"} tag={category} />
                                </div>
                                <TiDelete className="text-3xl opacity-[0]"/>
                            </div>

                        </div>
                    </div>
                    
                    <div className="w-[350px] h-full border-l-[3px]">
                        <ControlPanel panelOptions={panelOptions} handleAddComponent={handleAddComponent} handleHeaderInput={handleHeaderInput} setTitle={setTitle} currentTitle={title} setAuthor={setAuthor} currentAuthor={author} setTags={setTags} currentTags={tags} setCategory={setCategory} innerHtml={innerHtmlContent}/>
                    </div>
                </div>                
            </div>
        </DndProvider>
        </>
    );
};

export default TextEditor;
