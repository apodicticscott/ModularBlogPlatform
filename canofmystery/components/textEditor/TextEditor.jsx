'use client'

import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaItalic, FaBold, FaStrikethrough, FaUnderline, FaLink, FaList, FaCheck } from "react-icons/fa";
import { MdOutlinePreview, MdOutlineDownloadDone } from "react-icons/md";
import { RiFontSize, RiFontFamily } from "react-icons/ri";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Dialog from '@mui/material/Dialog';
import "../../app/homepage.module.css"

import { DndProvider } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'

import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
    
  } from "@dnd-kit/sortable";
  import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    TouchSensor, // Add this line
    useSensor,
    useSensors
  } from "@dnd-kit/core";

import "../../app/globals.css"

import ControlPanel from "./ControlPanel"
import Tag from "../../components/TextComponents/NeoTag"
import Header from "../../components/TextComponents/Header1";
import CropUtils from "./CropUtils";

import placeholderOne from "../../public/Assets/1.png"
import placeholderTwo from "../../public/Assets/2.jpg"

import DragHeader from "./DraggableComponents/DragHeader";
import DragParagraph from "./DraggableComponents/DragParagraph"
import DragResource from "./DraggableComponents/DragResource";
import DragImage from "./DraggableComponents/DragImage";
import DragList from "./DraggableComponents/DragList"
import { NeoButton } from "../TextComponents";




const SizeDropDown = ({className, onClick, selected}) => {

    
    return(
        <div className={`${className} flex flex-row bg-base-100 overflow-hidden  h-[30px] sm:h-full border-r-solid border-r-[3px] border-r-black` }>
            <button id="sm" className="flex flex-row justify-center items-end h-full pb-[5px] w-[50px] " onClick={(e) => onClick(e.currentTarget.id)}>
                <RiFontFamily id="sm" className="text-[8px] sm:text-xl"/>
            </button>
            <button id="md" className="flex flex-row justify-center items-end h-full  pb-[5px] w-[50px] " onClick={(e) => onClick(e.currentTarget.id)}>
                <RiFontFamily id="md" className="text-[10px] sm:text-2.2xl"/>
            </button>
            <button id="lg" className={`flex flex-row justify-center items-end h-full pb-[5px] w-[50px] ${selected.type === "header" ? "bg-base-100" : "bg-base-300 text-t-header-dark"}`} onClick={(e) => {selected.type === "header" && onClick(e.currentTarget.id)}}>
                <RiFontFamily id="lg" className="flex flex-col justify-end text-[12px] sm:text-2.7xl"/>
            </button>
            <button id="xl" className={`flex flex-row justify-center items-end h-full pb-[5px] w-[50px] ${selected.type === "header" ? "bg-base-100" : "bg-base-300 text-t-header-dark"}`} onClick={(e) => { selected.type === "header" && onClick(e.currentTarget.id)}}>
                <RiFontFamily id="xl" className="sm:text-3xl"/>
            </button>
        </div>
    )
}


const TextEditor = () => {
    const [compArray, setCompArray] = useState([    
        { type: "paragraph", size: "md", style: [], id: "component-1", isTagged: false, content: 'For years, people in Kentucky have been talking about the peculiar and eccentric weather phenomenon known as the "Kentucky Meat Rain." Locals are left scratching their heads in astonishment and awe at this strange phenomenon where chunks of raw flesh fall from the sky. The Kentucky Meat Rain is still a mysterious and intriguing natural phenomenon, despite a plethora of theories and ideas regarding its cause.'},
        { type: "image", size: "", style: [], id: "component-2", image: placeholderOne.src, originalImage: placeholderOne.src},
        { type: "paragraph", size: "md", style: [], id: "component-3", isTagged: false, content: 'The first Kentucky Meat Rain was observed by the nice people of Olympia Springs, Kentucky, in 1876. This is where our voyage into the world of meaty precipitation began. People were in complete disbelief as various types of meat, including venison and steak, appeared to fall from the sky. The tale quickly became viral, igniting a flurry of interest and ideas about the meaty downpour.'},
        { type: "paragraph", size: "md", style: [], id: "component-4", isTagged: false, content: 'Meat showers persisted in appearing in different locations around Kentucky in the late 19th and early 20th centuries. Even more, a report from the 1876 incident said that the meat parts were "large irregularly shaped flakes, one of which was 6 by 8 inches in size.'},
        { type: "paragraph", size: "md", style: [], id: "component-5", isTagged: false, content: 'Numerous theories, ranging from the serious to the absurd, have been proposed on the Kentucky Meat Rain:'},
        { type: "image", size: "", style: [], id: "component-6", image: placeholderTwo.src, originalImage: placeholderTwo.src},
        { type: "paragraph", size: "md", style: [], id: "component-7", isTagged: false, content: 'Numerous theories, ranging from the serious to the absurd, have been proposed on the Kentucky Meat Rain:'},
        { type: "resource", size: "md", style: [], id: "component-8", isTagged: false, content: 'Duckworth, Matthew, “‘Kentucky Shower of Flesh’: The ‘Great Kentucky Meat Shower’ fell 147 years ago” Fox56News. Mar. 2023 https://fox56news.com/news/kentucky/the-great-kentucky-meat-shower-147-years-passed-since-the-kentucky-shower-of-flesh/ Accessed Oct. 2023.'},
        { type: "resource", size: "md", style: [], id: "component-9", isTagged: false, content: 'McManus, Melanie, “10 Times It Has Rained Something Other Than Water” HowStuffWorks. https://science.howstuffworks.com/nature/climate-weather/storms/10-times-it-rained-something-other-than-water.htm. Accessed Oct. 2023.'},
        { type: "resource", size: "md", style: [], id: "component-10", isTagged: false, content: '“Kentucky meat shower”, https://en.wikipedia.org/wiki/Kentucky_meat_shower, Wikipedia. Nov. 2023.'},
    ]);
    const [bookMarks, setBookMarks] = useState([])

    const [panelOptions, setPanelOptions] = useState({info: "Info", add: "Add", html: "HTML"})
    const [title, setTitle] = useState("Kentucky Meat Rain")
    const [author, setAuthor] = useState("Name or Pseudonym")
    const [tags, setTags] = useState([["Text Here", "#f1fd66"]])
    const [category, setCategory] = useState("Example Category")
    const [linkValue, setLinkValue] = useState();

    const [selectedComp, setSelectedComp] = useState({id: undefined, compType: undefined, eventType: undefined});
    const [sizeDrop, setSizeDrop] = useState(false);
    const [linkInput, setLinkInput] = useState(false);
    const [textIsHighlighted, setTextIsHighlighted] = useState(false)
    const [innerHtmlContent, setInnerHtmlContent] = useState([]);
    const [isPreview, setIsPreview] = useState(false)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const [isCropEnabled, setIsCropEnabled] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor), // Add this line
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates
        })
    );


    const [imageData, setImageData] = useState([undefined, undefined])


    //Change Content Section ---------------------------------------------------------------------------------------------------------
    const handleItalicClick = () => {
        document.execCommand("italic")
    };

    const handleBoldClick = () => {
        document.execCommand("bold")
    };

    const handleUnderlineClick = () => {
        document.execCommand("underline")
    };

    const handleStrikethroughClick = () => {
        document.execCommand("strikeThrough")
    };

    const handleListClick = () => {
        document.execCommand('formatblock', false, 'p')
        
    }

    const handleSetLink = (e) => {
        // if(e.key === "Enter"){
        //     document.execCommand("CreateLink", false, "http://stackoverflow.com/");
        // }else{
        //     console.log("We Tried")
        //     console.log(url)
        //     document.execCommand("CreateLink", false, "http://stackoverflow.com/");
        // }

        const input = document.getElementById("link-input")
        const url = input.value;
        setLinkValue(url)
        setLinkInput(!linkInput)

    };

    const handleCreateLink = () => {
        document.execCommand("CreateLink", false, linkValue);
        setLinkValue();
    }
    

    const handleChangeSize = (id) => {
        setCompArray(compArray.map(comp => {
            if (comp.id === selectedComp.id) {
                return { ...comp, size: id};
            }
            return comp;
        }));
    };

    const updateContent = (id, content, type) => {
        setCompArray(compArray.map(comp => {
            if(type === "text"){
                if(comp.id === id){
                    return { ...comp, content: content};
                }
            }else if(type === "list"){
                if(comp.id === id ){
                    return {...comp, listItems: content}
                }
            }

            return comp;
        }));
    }

    const handleSelectComponent = (e, id, compType) => {
        let eventType;
        if(e.target.id === "header" || e.target.id === "paragraph" || e.target.id === "resource"){
            eventType = "in-text-click"
        }else{
            eventType = "comp-click"
        }

        console.log(eventType)

        handleGetInnerHtml(e)

            console.log("id")
            if(selectedComp.id === id && eventType === selectedComp.eventType && eventType === "in-text-click"){
                setSelectedComp({id: id, compType: compType, eventType: eventType});
            }else if (selectedComp.id === id) {
                // Toggle the dropdown only if the same component is clicked again
                toggleSizeDropdown();
                setSelectedComp({id: undefined, compType: undefined, eventType: undefined});
            }else {
                // Close the dropdown when a different component is selected
                setSizeDrop(false);
                setSelectedComp({id: id, compType: compType, eventType: eventType});
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

    const handleAddComponent = (type) => {
        const newId = compArray.length + 1;
        
        let newComponent;
        if(type === "header"){
            newComponent = { type: type, size: "md", style: [], id: `component-${newId}`, content: "New Text" };
        }else if(type === "paragraph"){
            newComponent = { type: type, size: "md", style: [], id: `component-${newId}`, content: "New Text"}
        }else if(type === "image"){
            if(imageData[1]){
                newComponent = { type: type, size: "", style: [], id: `component-${newId}`, content: "", image: imageData[1], originalImage: imageData[0] };
            }else{
                newComponent = { type: type, size: "", style: [], id: `component-${newId}`, content: "", image: imageData[0], originalImage: imageData[0] };
            }
        }else if(type === "resource"){
            newComponent = { type: type, size: "", style: [], id: `component-${newId}`, content: "Test Resource" };
        }else if(type === "list"){
            newComponent = { type: type, size: "", style: [], id: `component-${newId}`, content: "Test List" };
        }
        setCompArray([...compArray, newComponent]);
    };

    
    const handleRemoveComponent = (id) => {
        setCompArray(compArray.filter((comp) => comp.id !== id));
    };

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


    useEffect(() => {
        const getContentById = (compArray, id) => {
            const element = compArray.find(item => item.id === id);
            return element ? element.content : null;
        }

        setInnerHtmlContent([innerHtmlContent[0], getContentById[compArray, innerHtmlContent[0]]])
    }, [compArray])

    const toggleSizeDropdown = () => {
        if (selectedComp) {
            setSizeDrop(prevState => !prevState);
        }
    }

    const togglePreviewEnabled = () => {
        setIsPreview(prevState => !prevState);
    }

    const toggleSideBar = () => {
        setIsSideBarOpen(prevState => !prevState);
    }

    const handleExportContent = () => {
        const articleContent = {title: title, author: author, components: compArray, tags: tags, category: category}
        console.log(articleContent)
    }

    return (
        <>

            <div className="w-full" id="text-editor">
                <div className="flex flex-wrap w-full h-max sm:h-[50px] border-t-black border-t-[3px] px-[15px] bg-base-300 gap-y-[3px]">    
                    <button className={`flex justify-center items-center w-[50px] h-[30px] sm:h-full  border-r-[3px] ${isPreview ? "bg-base-100" : "text-t-header-dark"}`} onClick={togglePreviewEnabled}>
                        <MdOutlinePreview className="text-2xl sm:text-2.5xl"/>
                    </button>     
                    <button  className={`flex justify-center items-center  w-[50px]  h-[30px] sm:h-full  border-r-[3px] border-r-base-300 ${((selectedComp === "header" || selectedComp.compType === "paragraph" || selectedComp.compType === "resource") && selectedComp.eventType === "in-text-click") ? "bg-base-100 text-t-header-light" : "bg-base-300 text-t-header-dark"}`} onClick={handleBoldClick}>
                        <FaBold className="text-lg sm:text-xl"/>
                    </button >
                    <button className={`flex justify-center items-center w-[50px] h-[30px] sm:h-full  border-r-[3px] ${((selectedComp === "header" || selectedComp.compType === "paragraph" || selectedComp.compType === "resource") && selectedComp.eventType === "in-text-click") ? "bg-base-100 text-t-header-light" : "bg-base-300 text-t-header-dark"}`} onClick={handleItalicClick}>
                        <FaItalic className="text-lg sm:text-xl"/>
                    </button >
                    <button className={`flex justify-center items-center w-[50px] h-[30px] sm:h-full  border-r-[3px] ${((selectedComp === "header" || selectedComp.compType === "paragraph" || selectedComp.compType === "resource") && selectedComp.eventType === "in-text-click") ? "bg-base-100 text-t-header-light" : "bg-base-300 text-t-header-dark"}`} onClick={handleStrikethroughClick}>
                        <FaStrikethrough className="text-lg sm:text-xl"/>
                    </button >
                    <button className={`flex justify-center items-center w-[50px] h-[30px] sm:h-full  border-r-[3px] ${((selectedComp === "header" || selectedComp.compType === "paragraph" || selectedComp.compType === "resource") && selectedComp.eventType === "in-text-click") ? "bg-base-100 text-t-header-light" : "bg-base-300 text-t-header-dark"}`} onClick={handleUnderlineClick}>
                        <FaUnderline className="text-lg sm:text-xl"/>
                    </button >
                    <button className={`flex justify-center items-center w-[50px] h-[30px] sm:h-full  border-r-[3px] ${(textIsHighlighted === true) ? "bg-base-100 text-t-header-light" : "bg-base-300 text-t-header-dark"}`} onClick={handleListClick}>
                        <FaList className="text-lg sm:text-xl"/>
                    </button >
                    <button className={`flex justify-center items-center w-[50px] h-[30px] sm:h-full  border-r-[3px] bg-base-100 text-t-header-light`} onClick={() => setLinkInput(prevState => !prevState)}>
                        <FaLink className="text-lg sm:text-xl"/>
                    </button >

                    {
                        linkValue
                        &&
                        <button className={`flex justify-center items-center w-[50px] h-[30px] sm:h-full  border-r-[3px] ${(linkValue)  ? "bg-base-100 text-t-header-light" : "bg-base-300 text-t-header-dark"}`} onClick={() => {(linkValue) && handleCreateLink()}}>
                            <FaCheck className="text-lg sm:text-xl"/>
                        </button >
                    }


                    <div className="flex w-max gap-[3px]">
                        <button  className={`flex justify-center items-center w-[50px] h-[30px] sm:h-full ${((selectedComp === "header" || selectedComp.compType === "paragraph" || selectedComp.compType === "resource") && selectedComp.eventType === "comp-click") ? "bg-base-100" : "bg-base-300"}`} onClick={() => {((selectedComp === "header" || selectedComp.compType === "paragraph" || selectedComp.compType === "resource") && selectedComp.eventType === "comp-click") && toggleSizeDropdown()}}>
                            <RiFontSize className={`text-2xl sm:text-2.5xl text-t-header-dark ${((selectedComp === "header" || selectedComp.compType === "paragraph" || selectedComp.compType === "resource") && selectedComp.eventType === "comp-click") ? "text-t-header-light" : "text-t-header-dark"}`} />
                        </button >
                        <SizeDropDown selected={selectedComp} className={`${(sizeDrop && (selectedComp.compType === "header" || selectedComp.compType === "paragraph" || selectedComp.compType === "resource"))? "w-max" : "w-0"}`} onClick={handleChangeSize} />
                    </div>


                </div>

                <div className="flex w-full h-[calc(100vh_-_117px)] border-y-[3px] overflow-x-hidden ">
                               
                    <div className={`h-full flex items-end border-r-[3px] ${isSideBarOpen ? "w-[100vw] xs-sm:w-max" : "w-0"}`}>
                        <div className={`h-full overflow-hidden z-10 ${isSideBarOpen ? "w-[100vw] xs-sm:w-max" : "w-0" }`}>
                            <ControlPanel enableCrop={setIsCropEnabled} setImageToCrop={imageToCrop => setImageData([imageToCrop, imageData[1]])} imageToCrop={imageData[0]} setCroppedImage={croppedImage => setImageData([imageData[0], croppedImage])} croppedImage={imageData[1]} panelOptions={panelOptions} handleAddComponent={handleAddComponent} setTitle={setTitle} currentTitle={title} setAuthor={setAuthor} currentAuthor={author} setTags={setTags} currentTags={tags} setCategory={setCategory} innerHtml={innerHtmlContent} exportContent={handleExportContent} removeImage={() => setImageData([undefined, undefined])}/>
                        </div>
                        <div className='w-0 h-[45px] py-[2px] z-10'>
                            <div className={` relative rounded-r w-[30px] justify-center ${isSideBarOpen ? "rounded-l rounded-r-none xs-sm:rounded-r left-[-30px] xs-sm:left-0 w-[30px] xs-sm:w-[25px] " : ""}  h-full flex items-center  bg-base-300`} onClick={() => toggleSideBar()}>
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
                    {
                        isCropEnabled
                        &&
                        <div className={`flex flex-col items-center min-w-[100vw] lg:min-w-0 lg:grow  h-full z-0`}>
                            <CropUtils imageToCrop={imageData[0]} onImageCropped={croppedImage => setImageData([imageData[0], croppedImage])} />
                        </div>
                    }

                    <div  className={`flex flex-col items-center min-w-[100vw] lg:min-w-0 lg:grow  h-full overflow-y-scroll px-[25px] md:pl-[30px] pb-[100px] pt-[50px] ${isCropEnabled && "hidden"}`}>

                        <div className={`flex w-full`}>
                            <div className={`w-full h-max md:grow flex ${!isPreview && "px-[51px]"} md:px-0 justify-center`}>
                                <div className="w-full md:w-[800px] h-max flex flex-col items-center">
                                    <div className={`flexitems-center w-full ${isPreview ? "md:w-full" : "md:w-[692px]"} gap-[30px]`} >
                                        <Header type={"lg"} classes="p-0 text-center" >
                                            {title}
                                        </Header>
                                    </div>
                                    <div className={`flex items-center w-full ${isPreview ? "md:w-full" : "md:w-[692px]"} gap-[30px]`} >
                                        <div className="flex w-full items-center">
                                            <Header type={"sm"} classes="w-max">
                                                By: <span className="font-normal">{author}</span>
                                            </Header>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-max flex flex-col justify-between">
                            <Dialog
                                open={linkInput}
                                onClose={() => setLinkInput(prevState => !prevState)}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                
                            >   
                                <div className="flex flex-col p-[15px] max-w-[350px] gap-[15px]">
                                    <Header type="sm" id="alert-dialog-title">
                                    {"Enter The URL."}
                                    </Header>
                                    <div className="flex-row">
                                        <input id="link-input" type="url" placeholder="URL.." className="w-[calc(100%_-_15px)] ">
                                        </input>
                                        <button className="w-max" onClick={handleSetLink}>
                                            <FaCheck className="text-lg sm:text-xl"/>
                                        </button>
                                    </div>
                                    <div className="text-[12px]">
                                        Enter the url, then highlight your text, and click the checkmark next to the link icon.
                                    </div>
                                </div>


                            </Dialog>
                            <div className="grow flex flex-col items-center h-full z-1 gap-[10px] ">
                                <div className="flex-col w-full md:w-[800px]" id="text-editor-container" >
                                    <DndContext
                                        sensors={sensors}
                                        collisionDetection={closestCenter}
                                        onDragEnd={handleDragEnd}
                                    >
                                        <SortableContext items={compArray.map(comp => comp.id)} strategy={verticalListSortingStrategy}>
                                            {compArray.map((comp, index) => (
                                                <>
                                                    {comp.type === "header" && (
                                                        <>
                                                            <DragHeader key={comp.id} comp={comp} isEnabled={isPreview} removeComp={handleRemoveComponent} updateContent={updateContent} index={index} selected={selectedComp} onClick={handleSelectComponent}/>
                                                        </>
                                                    )}
                                                    {comp.type === "image" && (
                                                        <>
                                                            <DragImage key={comp.id} comp={comp} isEnabled={isPreview} removeComp={handleRemoveComponent} updateContent={updateContent} index={index} selected={selectedComp} onClick={handleSelectComponent}/>
                                                        </>
                                                    )}
                                                    {(comp.type === "paragraph")&& (
                                                        <>
                                                            <DragParagraph  key={comp.id} comp={comp} isEnabled={isPreview} removeComp={handleRemoveComponent} updateContent={updateContent} index={index} selected={selectedComp} onClick={handleSelectComponent}/>          
                                                        </>
                                                    )}
                                                    {comp.type === "resource" && (
                                                        <> 
                                                            <DragResource  key={comp.id} comp={comp} isEnabled={isPreview} removeComp={handleRemoveComponent} updateContent={updateContent} index={index} selected={selectedComp} onClick={handleSelectComponent}/>
                                                        </>
                                                    )}
                                                    {comp.type === "list" && (
                                                        <> 
                                                            <DragList  key={comp.id} comp={comp} isEnabled={isPreview} removeComp={handleRemoveComponent} updateContent={updateContent} index={index} selected={selectedComp} onClick={handleSelectComponent}/>
                                                        </>
                                                    )}
                                                </>
                                            //     <DraggableComponent 
                                            //     key={comp.id} 
                                            //     comp={comp} 
                                            //     index={index} 
                                            //     compArray={compArray}
                                            //     selected={selectedComp}
                                            //     onClick={handleSelectComponent} 
                                            //     onLoad={() => setIsContentLoaded(true)}
                                            //     moveComp={moveComponent} 
                                            //     removeComp={handleRemoveComponent}
                                            //     updateContent={updateContent}
                                            //     isEnabled={isPreview}
                                            //     isLoaded={isContentLoaded}
                                            //     isPreview={isPreview}
                                            //     loadBookMarks={handleLoadBookMarks}
                                            // />
                                            ))}
                                        </SortableContext>
                                    </DndContext>
                                    <div className={`flex items-center w-full gap-[30px] ${!isPreview && "px-[51px]"}`} >
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
                                    <div className={`flex items-center w-full gap-[30px] mt-[15px] ${!isPreview && "px-[51px]"}`} >
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
        </>
    );

    function handleDragEnd(event) {
        const { active, over } = event;
    
        if (active.id !== over.id) {
          setCompArray((compArray) => {
            let oldIndex;
            let newIndex;
            for(let i = 0; i <= compArray.length - 1; i++){
                console.log(compArray[i].id, active.id)
                console.log(compArray[i].id === active.id)
                if(compArray[i].id === active.id){
                    oldIndex = i;
                }else if(compArray[i].id === over.id){
                    newIndex = i;
                }
            }
            return arrayMove(compArray, oldIndex, newIndex);
        });}
    }
    
};

export default TextEditor;

