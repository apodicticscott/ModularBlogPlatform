'use client'

import React, { useState, useEffect } from "react";
import { FaItalic, FaBold, FaStrikethrough, FaUnderline, FaLink, FaList, FaCheck, FaCcJcb } from "react-icons/fa";
import { MdOutlinePreview, MdOutlineQuestionMark, MdOutlineDownloadDone } from "react-icons/md";
import { RiFontSize, RiFontFamily } from "react-icons/ri";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

import Dialog from '@mui/material/Dialog';
import { Button } from '@mui/material';

import { AnimatePresence, motion } from "framer-motion";
import "../../app/homepage.module.css"
import {  makeStyles  } from '@mui/styles'

import Image from "next/image"

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
import CropUtils from "./ImageEditor/CropUtils";

import placeholderOne from "../../public/Assets/1.png"
import placeholderTwo from "../../public/Assets/2.jpg"

import DragHeader from "./DraggableComponents/DragHeader";
import DragParagraph from "./DraggableComponents/DragParagraph"
import DragResource from "./DraggableComponents/DragResource";
import DragImage from "./DraggableComponents/DragImage";
import DragList from "./DraggableComponents/DragList"
import DragVideo from "./DraggableComponents/DragVideo"

import { NeoButton } from "../TextComponents";

import Help from "./Help/Help"

import addLinkHelp from "./Assets/help_add_link.gif"

import {getFirestore, collection, getDoc, doc, addDoc} from "firebase/firestore"
import { app } from "../../app/firebase"

const useStyles = makeStyles({
    button: {
        backgroundColor: "transparent",
        border: '3px solid transparent',
        minWidth: '0px',
        width: 'max-content',
        '&:hover': {
            backgroundColor: 'white',
            border: '2px solid black'
    },
}})


const SizeDropDown = ({className, onClick, selected}) => {

    
    return(
        <div className={`${className} flex flex-row bg-base-100 overflow-hidden  h-[30px] sm:h-full border-r-solid border-r-[3px] border-r-black` }>
            <button id="sm" className="flex flex-row justify-center items-end h-full pb-[5px] w-[50px] " onClick={(e) => onClick(e.currentTarget.id)}>
                <RiFontFamily id="sm" className="text-[8px] sm:text-xl"/>
            </button>
            <button id="md" className="flex flex-row justify-center items-end h-full  pb-[5px] w-[50px] " onClick={(e) => onClick(e.currentTarget.id)}>
                <RiFontFamily id="md" className="text-[10px] sm:text-2.2xl"/>
            </button>
            <button id="lg" className={`flex flex-row justify-center items-end h-full pb-[5px] w-[50px] ${selected.compType === "header" ? "bg-base-100" : "bg-base-300 text-t-header-dark"}`} onClick={(e) => {selected.compType === "header" && onClick(e.currentTarget.id)}}>
                <RiFontFamily id="lg" className="flex flex-col justify-end text-[12px] sm:text-2.7xl"/>
            </button>
            <button id="xl" className={`flex flex-row justify-center items-end h-full pb-[5px] w-[50px] ${selected.compType === "header" ? "bg-base-100" : "bg-base-300 text-t-header-dark"}`} onClick={(e) => { selected.compType === "header" && onClick(e.currentTarget.id)}}>
                <RiFontFamily id="xl" className="sm:text-3xl"/>
            </button>
        </div>
    )
}


const TextEditor = ({articleId}) => {

    const classes = useStyles()

    const [article, setArticle] = useState(null);
    const [compArray, setCompArray] = useState([]);

    const [panelOptions, setPanelOptions] = useState({info: "Info", add: "Add", html: "HTML"})
    const [Title, setTitle] = useState("")
    const [Author, setAuthor] = useState("")
    const [Tags, setTags] = useState([])
    const [Category, setCategory] = useState()
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(new Date());
    
    const [linkValue, setLinkValue] = useState();
    const [currentLink, setCurrentLink] = useState("");
    const [linkErrorVisible, setLinkErrorVisible] = useState(false);
    const [isLinkAddHelpOpen, setIsLinkAddHelpOpen] = useState(false);
    const [isDoneNotificationOpen, setIsDoneNotificationOpen] = useState(false);

    const [selectedComp, setSelectedComp] = useState({id: undefined, compType: undefined, eventType: undefined});
    const [sizeDrop, setSizeDrop] = useState(false);
    const [linkInput, setLinkInput] = useState(false);
    const [textIsHighlighted, setTextIsHighlighted] = useState(false)
    const [innerHtmlContent, setInnerHtmlContent] = useState([]);
    const [isPreview, setIsPreview] = useState(false)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [isCropEnabled, setIsCropEnabled] = useState({value: false, type: ""});
    const [isHelpOpen, setIsHelpOpen] = useState({value: false, type: null});

    

    const db = getFirestore(app)

    useEffect(() => {
        if(articleId){
            const fetchArticle = async () => {
                const docRef = doc(db, "Articles", articleId);
                const docSnap = await getDoc(docRef);
          
                if (docSnap.exists()) {
                  console.log("Document data:", docSnap.data());
                  console.log(docSnap.data())
                  setArticle(docSnap.data());
                } else {
                  console.log("No such document!");
                }
            };
          
            fetchArticle();
        }
    }, []);

    useEffect(() => {
        if(articleId && article){
            console.log(article.Content)
            setCompArray(article.Content);
            setTitle(article.Title)
            setAuthor(article.Author)
            console.log(article.Tags)
            setTags(article.Tags)
        }
    }, [article])
    

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor), // Add this line
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates
        })
    );


    const [imageData, setImageData] = useState([undefined, undefined])
    const [coverImageData, setCoverImageData] = useState([undefined, undefined])

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
        const url = currentLink

        if(url){
            setLinkValue(url)
            setCurrentLink()
            setLinkErrorVisible(false)
            setLinkInput(!linkInput)
            document.getElementById("link-input").value === ""
        }else{
            setCurrentLink()
            setLinkErrorVisible(true)
            setTimeout(() => setLinkErrorVisible(false), 3000)
        }


    };

    const handleCreateLink = () => {
        document.execCommand("CreateLink", false, linkValue);
        setLinkValue();
    }
    

    const handleChangeSize = (id) => {
        setCompArray(compArray.map(comp => {
            if (comp.ID === selectedComp.id) {
                return { ...comp, Size: id};
            }
            return comp;
        }));
    };

    const updateContent = (id, content, type) => {
        setCompArray(compArray.map(comp => {
            if(type === "text"){
                if(comp.ID === id){
                    return { ...comp, Content: content};
                }
            }else if(type === "list"){
                if(comp.ID === id ){
                    return {...comp, ListItems: content}
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


        handleGetInnerHtml(e)

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

    useEffect(() => {
        const timer = setInterval(() => {
          const now = new Date();
          setCurrentDate(now);
          setCurrentTime(now);
        }, 1000); // Update the date and time every second
    
        return () => clearInterval(timer); // Clean up the interval on component unmount
      }, []);
    
      // Format date as "Year-Month-Day"
    const formatDate = (date) => {
    return date.toISOString().split('T')[0];
    };

    // Format time as "Hours:Minutes:Seconds"
    const formatTime = (time) => {
    return time.toTimeString().split(' ')[0];
    };

    const handleAddComponent = (Type, url) => {
        const newId = compArray.length + 1;


        
        let newComponent;
        if(Type === "header"){
            newComponent = { Type: Type, Size: "md", Style: [], ID: `component-${newId}`, Content: "New Text", Image: "", OriginalImage: "", VideoEmbededId: "" };
        }else if(Type === "paragraph"){
            newComponent = { Type: Type, Size: "md", Style: [], ID: `component-${newId}`, Content: "New Text", Image: "", OriginalImage: "", VideoEmbededId: "" };
        }else if(Type === "in-paragraph"){
            newComponent = { Type: Type, Size: "md", Style: [], ID: `component-${newId}`, Content: "New Text", Image: "", OriginalImage: "", VideoEmbededId: "" };
        }else if(Type === "image"){
            if(imageData[1]){
                newComponent = { Type: Type, Size: "", Style: [], ID: `component-${newId}`, Content: "", Image: imageData[1], OriginalImage: imageData[0], VideoEmbededId: "" };
            }else{
                newComponent = { Type: Type, Size: "", Style: [], ID: `component-${newId}`, Content: "", Image: imageData[0], OriginalImage: imageData[0], VideoEmbededId: "" };
            }
        }else if(Type === "resource"){
            newComponent = { Type: Type, Size: "md", Style: [], ID: `component-${newId}`, Content: "Test Resource", Image: "", originalImage: "", videoEmbededId: "" };
        }else if(Type === "list"){
            newComponent = { Type: Type, Size: "", Style: [], ID: `component-${newId}`, Content: "Test List", Image: "", OriginalImage: "", VideoEmbededId: ""  };
        }else if(Type === "youtube"){
            newComponent = { Type: Type, Size: "", Style: [], ID: `component-${newId}`, Content: "Test List", Image: "", OriginalImage: "", VideoEmbededId: url  };
        }
        setCompArray([...compArray, newComponent]);
    };

    
    const handleRemoveComponent = (id) => {
        // Remove the component from the array
        const newCompArray = compArray.filter((comp) => comp.ID !== id);

        // Renumber the component IDs based on their new order
        const renumberedCompArray = newCompArray.map((comp, index) => {
            return { ...comp, id: `component-${index + 1}` };
        });

        // Update the state with the renumbered components array
        setCompArray(renumberedCompArray);
    };



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
        const articleContent = {Author: Author, Publisher: "Undefined", Time: "Undefined", Title: Title, Content: compArray, Tags: Tags}
        console.log(articleContent)
    }

    const handleUploadArticle = async () => {
        try {
            // Construct the article object
            const article = {
                Title: Title,
                Tags: Tags.map(tag => ({ Color: tag[1], Text: tag[0] })),
                // CoverImage: (coverImageData[1] ? coverImageData[1] : coverImageData[0]),
                Content: compArray.map(comp => ({
                    ID: comp.ID,
                    Content: comp.Content,
                    Style: comp.Style || '', // Assuming style is an optional field
                    Type: comp.Type,
                    ImageOriginal: comp.OriginalImage || '',
                    Image: comp.Image || '',
                    Size: comp.Size || ''
                })),
                Publisher: "ADMIN", 
                Time: formatTime(currentTime),
                Date: formatDate(currentDate),
                // Author: author
            };
    
            // Reference to the 'Articles' collection
            const articleColRef = collection(db, 'Articles');
            
            // Add the article to the collection
            const docRef = await addDoc(articleColRef, article);
            console.log("Article uploaded with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding article: ", error);
        }
    };

    const handleClearContent = () => {
        setAuthor()
        setTitle()
        setTags([])
        setCompArray([])
        setCategory()
    }



    return (
        <>

            <div className="w-full" id="text-editor">
                <div className="flex w-full"> 
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
                        <button className={`flex justify-center items-center w-[50px] h-[30px] sm:h-full  border-r-[3px]  ${(linkValue) ? 'bg-base-300 text-t-header-dark' : 'bg-base-100 text-t-header-light'}`} onClick={() => setLinkInput(prevState => !prevState)}>
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
                            <button  className={`flex justify-center items-center w-[50px] h-[30px] sm:h-full ${((selectedComp.compType  === "header" || selectedComp.compType === "paragraph" || selectedComp.compType === "resource") && selectedComp.eventType === "comp-click") ? "bg-base-100" : "bg-base-300"}`} onClick={() => {((selectedComp.compType  === "header" || selectedComp.compType === "paragraph" || selectedComp.compType === "resource") && selectedComp.eventType === "comp-click") && toggleSizeDropdown()}}>
                                <RiFontSize className={`text-2xl sm:text-2.5xl text-t-header-dark ${((selectedComp.compType  === "header" || selectedComp.compType === "paragraph" || selectedComp.compType === "resource") && selectedComp.eventType === "comp-click") ? "text-t-header-light" : "text-t-header-dark"}`} />
                            </button >
                            <SizeDropDown selected={selectedComp} className={`${(sizeDrop && (selectedComp.compType === "header" || selectedComp.compType === "paragraph" || selectedComp.compType === "resource"))? "w-max" : "w-0"}`} onClick={handleChangeSize} />
                        </div>

                    </div>
                    <button className='flex items-center justify-center w-[45px]'>
                        <MdOutlineQuestionMark className='text-2.5xl' onClick={() => {setIsHelpOpen({value: !isHelpOpen.value, type: "menue"})}}></MdOutlineQuestionMark>
                    </button> 
                    <button className="bg-base-100 text-t-header-light text-bold px-[10px] border-l-[3px]" onClick={() => handleClearContent()}>
                        Clear
                    </button>
                    {
                        !isCropEnabled.value
                        &&
                        <>
                            <button className="bg-primary-dark text-t-header-light text-bold px-[10px] border-l-[3px]" onClick={() => setIsDoneNotificationOpen(true)}>
                                Done
                            </button>

                            <Dialog
                                open={isDoneNotificationOpen}
                                onClose={() => setIsDoneNotificationOpen(prevState => !prevState)}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                maxWidth="max-content"
                            
                            >   
                                <div className="flex flex-col p-[15px] gap-[15px] bg-base-100">
                                    <Header type="sm" id="alert-dialog-title">
                                        {"Are you sure?"}
                                    </Header>
                                    <div className="flex flex-col gap-[10px]">
                                        <div>
                                            Please make sure this is how you want to submit the article.
                                        </div>
                                        <NeoButton className='flex items-center justify-center w-max p-[5px] bg-primary-dark rounded border-2 bg-primary-dark' onClick={() => {handleUploadArticle(); setIsDoneNotificationOpen(false)}}>
                                            Yes Im Sure!
                                        </NeoButton>   
                                    </div>
                                </div>
                            </Dialog>
                                
                            
                        </>
                    }
                <Help isOpen={isHelpOpen.value} setIsOpen={isOpen => setIsHelpOpen({value: isOpen, type: null})} type={isHelpOpen.type}/>
                </div>

                <div className="flex w-full h-[calc(100vh_-_117px)] border-y-[3px] overflow-x-hidden ">
                               
                    <div className={`h-full flex items-end border-r-[3px] ${isSideBarOpen ? "w-[100vw] xs-sm:w-max" : "w-0"}`}>
                        <div className={`h-full overflow-hidden z-10 ${isSideBarOpen ? "w-[100vw] xs-sm:w-max" : "w-0" }`}>
                            <ControlPanel 
                            enableCrop={(value, type) => setIsCropEnabled({value: value, type: type})} 

                            setImageToCrop={imageToCrop => setImageData([imageToCrop, imageData[1]])} 
                            imageToCrop={imageData[0]} 
                            setCroppedImage={croppedImage => setImageData([imageData[0], croppedImage])} 
                            croppedImage={imageData[1]} 
                            removeImage={() => setImageData([undefined, undefined])}

                            setCoverImageToCrop={coverImageToCrop => setCoverImageData([coverImageToCrop, coverImageData[1]])}
                            coverImageToCrop={coverImageData[0]}
                            setCroppedCoverImage={croppedCoverImage => setCoverImageData[coverImageData[0], croppedCoverImage]}
                            croppedCoverImage={coverImageData[1]}
                            removeCoverImage={() => setCoverImageData([undefined, undefined])}

                            panelOptions={panelOptions} 
                            handleAddComponent={handleAddComponent} 
                            setTitle={setTitle} 
                            setAuthor={setAuthor} 
                            currentAuthor={Author} 
                            setTags={setTags} 
                            currentTags={Tags} 
                            setCategory={setCategory} 
                            innerHtml={innerHtmlContent} 
                            exportContent={handleExportContent} 
                            
                            isCropEnabled={isCropEnabled.value}
                            setIsHelpOpen={(value, type) => setIsHelpOpen({value: value, type: type})}
                            />
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
                        isCropEnabled.value
                        &&
                        <div className={`flex flex-col items-center min-w-[100vw] lg:min-w-0 lg:grow  h-full z-0`}>
                            <CropUtils 
                            imageToCrop={(isCropEnabled.type === "comp") 
                            ? 
                            imageData[0] 
                            : 
                            coverImageData[0]
                            } 

                            onImageCropped={(isCropEnabled.type  === "comp") 
                            ? 
                            croppedImage => {setImageData([imageData[0], croppedImage]); setIsCropEnabled({value: false, type: ''})}
                            : 
                            croppedCoverImage => {setCoverImageData([coverImageData[0], croppedCoverImage]); setIsCropEnabled({value: false, type: ''})}} 

                            ratios={(isCropEnabled.type  === "comp") ? [1,4] : [2,2]}
                            />
                        </div>
                    }

                    <div  className={`flex flex-col items-center min-w-[100vw] lg:min-w-0 lg:grow  h-full overflow-y-scroll px-[25px] md:pl-[30px] pb-[100px] pt-[50px] ${isCropEnabled.value && "hidden"}`}>

                        <div className={`flex w-full`}>
                            <div className={`w-full h-max md:grow flex ${!isPreview && "px-[51px]"} md:px-0 justify-center`}>
                                <div className="w-full md:w-[800px] h-max flex flex-col items-center">
                                    <div className={`flexitems-center w-full ${isPreview ? "md:w-full" : "md:w-[692px]"} gap-[30px]`} >
                                        <Header type={"lg"} classes="p-0 text-center" >
                                            {Title}
                                        </Header>
                                    </div>
                                    <div className={`flex items-center w-full ${isPreview ? "md:w-full" : "md:w-[692px]"} gap-[30px]`} >
                                        <div className="flex w-full items-center">
                                            <Header type={"sm"} classes="w-max">
                                                By: <span className="font-normal">{Author}</span>
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
                                <div className="flex flex-col p-[15px] max-w-[350px] gap-[15px] bg-base-100">
                                    <Header type="sm" id="alert-dialog-title">
                                        {"Enter The URL."}
                                    </Header>
                                    <div className="flex gap-[10px]">
                                        <input id="link-input" className="w-[calc(100%_-_25px)] p-[5px] rounded" placeHolder={"Enter a URL."} onChange={(e) => setCurrentLink(e.currentTarget.value)}>
                                        </input>
                                        <button className='flex items-center justify-center w-[45px] bg-primary-dark rounded border-2'>
                                            <MdOutlineDownloadDone className='text-2.5xl' onClick={() => {handleSetLink(); setLinkInput(false)}}></MdOutlineDownloadDone>
                                        </button>   
                                    </div>
                                    <AnimatePresence>
                                        {linkErrorVisible && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                style={{ background: '#fd6666', marginTop: "5px", padding: "5px", borderRadius: "5px", color: "black"  }}
                                            >
                                                Please Eneter A URL
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <div className="flex justify-between">
                                        <div className="w-[calc(100%_-_25px)] p-[5px] text-[12px]">
                                            Enter the url, then highlight your text, and click the checkmark next to the link icon.
                                        </div>
                                        <button className='flex items-center justify-center w-[45px]'>
                                            <MdOutlineQuestionMark className='text-2.5xl' onClick={() => {setIsHelpOpen({value: true, type: "link_help"})}}></MdOutlineQuestionMark>
                                        </button>
                                        {
                                            isLinkAddHelpOpen
                                            &&
                                            <Dialog
                                                open={isLinkAddHelpOpen}
                                                onClose={() => setIsLinkAddHelpOpen(prevState => !prevState)}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                maxWidth="max-content"
                                            >   
                                                <div className='overflow-hidden'>
                                                    <div className='flex justify-end w-full h-0'>
                                                        <Button  className={`z-10 m-[10px] h-min rounded-[30px] ${classes.button}`} disableRipple >
                                                            <TiDelete
                                                                className={`text-[30px] text-base-300`}
                                                                onMouseOver={(e) => (e.currentTarget.style.cursor = "pointer")}
                                                                onClick={() => setIsLinkAddHelpOpen(prevState => !prevState)}
                                                            />
                                                        </Button>
                                                    </div>
                                                    <Image src={addLinkHelp} className="w-auto h-[30vh] object-cover md:w-[800px] md:h-auto  z-0 overflow-hidden" /> 
                                                </div>
                                            </Dialog>
                                        }
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
                                        <SortableContext items={compArray.map(comp => comp.ID)} strategy={verticalListSortingStrategy}>
                                            {compArray.map((comp, index) => (
                                                <>
                                                    {comp.Type === "header" && (
                                                        <>
                                                            <DragHeader key={comp.ID} comp={comp} isEnabled={isPreview} removeComp={handleRemoveComponent} updateContent={updateContent} index={index} selected={selectedComp} onClick={handleSelectComponent}/>
                                                        </>
                                                    )}
                                                    {comp.Type === "image" && (
                                                        <>
                                                            <DragImage key={comp.ID} comp={comp} isEnabled={isPreview} removeComp={handleRemoveComponent} updateContent={updateContent} index={index} selected={selectedComp} onClick={handleSelectComponent}/>
                                                        </>
                                                    )}
                                                    {(comp.Type === "in-paragraph")&& (
                                                        <>
                                                            <DragParagraph  key={comp.ID} indent={true} comp={comp} isEnabled={isPreview} removeComp={handleRemoveComponent} updateContent={updateContent} index={index} selected={selectedComp} onClick={handleSelectComponent}/>          
                                                        </>
                                                    )}
                                                    {(comp.Type === "paragraph")&& (
                                                        <>
                                                            <DragParagraph  key={comp.ID} indent={false} comp={comp} isEnabled={isPreview} removeComp={handleRemoveComponent} updateContent={updateContent} index={index} selected={selectedComp} onClick={handleSelectComponent}/>          
                                                        </>
                                                    )}
                                                    {comp.Type === "resource" && (
                                                        <> 
                                                            <DragResource  key={comp.ID} comp={comp} isEnabled={isPreview} removeComp={handleRemoveComponent} updateContent={updateContent} index={index} selected={selectedComp} onClick={handleSelectComponent}/>
                                                        </>
                                                    )}
                                                    {comp.Type === "list" && (
                                                        <> 
                                                            <DragList  key={comp.ID} comp={comp} isEnabled={isPreview} removeComp={handleRemoveComponent} updateContent={updateContent} index={index} selected={selectedComp} onClick={handleSelectComponent}/>
                                                        </>
                                                    )}
                                                   {comp.Type === "youtube" && (
                                                        <> 
                                                            <DragVideo key={comp.ID} comp={comp} isEnabled={isPreview} removeComp={handleRemoveComponent} updateContent={updateContent} index={index} selected={selectedComp} onClick={handleSelectComponent}/>
                                                        </>
                                                    )}
                                                </>
                                            ))}
                                        </SortableContext>
                                    </DndContext>
                                    <div className={`flex items-center w-full gap-[30px] ${!isPreview && "px-[51px]"}`} >
                                        <div className="flex flex-col h-max w-full gap-[15px]">
                                            <Header type="sm" classes="border-b-[2px] border-b-black w-full">
                                                Tags:
                                            </Header>
                                            <div className="flex flex-wrap items-center w-full h-max">
                                                {Tags.map((tag, index) => (
                                                    <Tag key={`${index}-${tag.Text}`} backgroundColor={tag.Color} tag={tag.Text} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`flex items-center w-full gap-[30px] mt-[15px] ${!isPreview && "px-[51px]"}`} >
                                        <div className="flex w-full items-center gap-[15px]">
                                            <Tag  backgroundColor={"#29ff80"} tag={Category} />
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
                const oldIndex = compArray.findIndex(comp => comp.ID === active.id);
                const newIndex = compArray.findIndex(comp => comp.ID === over.id);
                const newArray = arrayMove(compArray, oldIndex, newIndex);
    
                // Reassign IDs based on the new order
                const renumberedArray = newArray.map((comp, index) => ({
                    ...comp,
                    id: `component-${index + 1}`
                }));
    
                return renumberedArray;
            });
        }
    }
    
};

export default TextEditor;

