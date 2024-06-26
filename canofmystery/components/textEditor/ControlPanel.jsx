import React, { useState, useRef, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaExpandAlt,  FaCompressAlt  } from "react-icons/fa"
import { TiDelete } from "react-icons/ti";
import { MdOutlineDownloadDone } from "react-icons/md"
import { MdOutlineQuestionMark, MdOutlineSubtitles, MdOutlinePlaylistAdd} from "react-icons/md"
import { Dialog, Button} from '@mui/material';
import { makeStyles } from '@mui/styles'
import { getPageByName } from "../../firebase/articleUtils/articleUtils"
import Image from 'next/image';
import FileUpload from "./ImageEditor/FileUpload";
import helpAddVideoGif from "./Assets/help_add_vido.gif"
import Header from "../TextComponents/Header1"



class RandomColorPicker {
    constructor(colors) {
        this.colors = [...colors]; // Copy the input array to avoid modifying the original array
        this.shuffleColors();
    }

    // Fisher-Yates shuffle algorithm to shuffle the colors
    shuffleColors() {
        for (let i = this.colors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.colors[i], this.colors[j]] = [this.colors[j], this.colors[i]];
        }
    }

    // Pick the next color
    pickColor() {
        if (this.colors.length === 0) {
            return null;
        }
        return this.colors.pop();
    }
}

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


const ControlPanel = ({ 
    panelOptions, 
    handleAddComponent, 

    setTitle, 
    Title,

    setAuthor, 
    Author,

    setTags, 
    tags, 

    setSelectedCanItem, 
    selectedCanItem,

    innerHtml, 
    exportContent,

    enableCrop, 
    cropType,

    imageToCrop, 
    setImageToCrop, 
    croppedImage, 
    setCroppedImage,
    removeImage, 

    coverImageToCrop,
    setCoverImageToCrop,
    croppedCoverImage, 
    setCroppedCoverImage,
    removeCoverImage,

    pageType,

    setPageName,
    pageName,

    canItems,

    setCropType,

    isCropEnabled,
    setIsHelpOpen,

    isPanelOpen,
    setIsPanelOpen,
    }) => {
    const panelOptionsArray = Object.entries(panelOptions); // Convert object to array of [key, value] pairs
    const [panel, setPanel] = useState(panelOptionsArray[0][1]); // Initialize with the value of the first entry
    const colors = ["#9723c9", "#ff68b5", "#ff6b6b", "#e2a017", "#7fbc8c", "#69d3e8", "#fd6666", "#f1fd66", "#7fffb3", "#66a2fd"];
    const [tagErrorVisible, setTagErrorVisible] = useState(false); // New state for error visibility
    const [youtubeErrorVisible, setYoutubeErrorVisible] = useState(false); // New state for error visibility
    
    const [search, setSearch] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isImageAddOpen, setIsImageAddOpen] = useState(false)
    const [isVideoAddOpen, setIsVideoAddOpen] = useState(false)
    const [isVideoAddHelpOpen, setIsVideoAddHelpOpen] = useState(false)

    const [currentVideoLink, setCurrentVideoLink] = useState()
    

    const containerRef = useRef(null);
    const dropdownRef = useRef(null);

    const colorPicker = new RandomColorPicker(colors);
    const classes = useStyles()
    const [pageNameError, setPageNameError] = useState();
    
    

    const containerStyle = {
        display: 'flex', // Ensure the container is always flex
        flexDirection: isPanelOpen ? 'row' : 'column', // Dynamic flex-direction
        transition: { duration: 0.5 } // Apply a transition duration
    };

    

    const handleSetTitle = (value) => {
        if(value !== ""){
            setTitle(value)
        }else{
            setTitle("Example Title")
        }
        
    }

    function checkString(input) {
        const hasSpaces = /\s/.test(input); // Check for spaces
        const hasNumbers = /\d/.test(input); // Check for numbers
        const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(input); // Check for special characters
    
        return hasSpaces || hasNumbers || hasSpecialCharacters;
    }

    const handleSetPageName = async (value) => {
        if(value !== ""){
            const test = checkString(value)
            if(test === true){
                const test_2 = await getPageByName(value)

                if(test && test_2){
                    setPageNameError("This page name already exists, and the page name must not include spaces, numbers, but may contain the special character '-'.")
                }else if(test){
                    setPageNameError("The page name must not include spaces, numbers, but may contain the special character '-'.")
                }else if(test_2){
                    setPageNameError("This page name already exists.")
                }
                
            }else{
                setPageNameError(null)
                setPageName(value)
            }
        }else{
            setPageName("")
        }
    }

    const handleSetAuthor = (value) => {
        if(value !== ""){
            setAuthor(value)
        }else{
            setAuthor("First Last or Sudonim")
        }
        
    }

    const handleChangeTag = (index, newValue) => {
        setTags(tags => {
            const newTags = [...tags];
            newTags[index] = {Text: newValue, Color: newTags[index].Color};
            return newTags;
        });
    };

    function handleRemoveTag(index) {
        setTags(tags => {
            return tags.filter((tag, i) => i !== index);
        });
    }

    const handleAddTags = () => {
        if (tags.length < 4) {
            setTags(tags => [...tags, {Text: "Text Here", Color: colorPicker.pickColor()}]);
        } else {
            setTagErrorVisible(true); // Show error
            setTimeout(() => setTagErrorVisible(false), 3000); // Hide error after 3 seconds
        }
    };

    const handleAddYoutubeVideo = () => {
        const embededId = document.getElementById("video-input").value

        if(embededId){
            handleAddComponent("youtube", embededId)
            setYoutubeErrorVisible(false)
            setIsVideoAddOpen(false)
            document.getElementById("video-input").value === false
        }else{
            setYoutubeErrorVisible(true)
            setTimeout(() => setYoutubeErrorVisible(false), 3000)
        }
    }

    


    const spring = {
        type: "linear",
        stiffness: 700,
        damping: 30
    };

    const handleChangePanel = (value) => {
        if(value !== panel){
            setPanel(value); 
        }else if(value === panel){
            setIsPanelOpen(!isPanelOpen)
        }else{
            setPanel(value);
        }
    }

    return (
        <>
            <AnimatePresence className="w-0" >
                <div  key={isPanelOpen ? "open" : "closed"} id="control-panel"  className={` ${isPanelOpen ? " flex " : " flex xs-sm:w-max xs-sm:flex-col " } mr-0  origin-bottom-right items-center select-none p-2 rounded-md bg-base-300 m-2 mb-0  transition-width duration-200 dark:bg-[#322e38] `} style={{width: isPanelOpen ? "calc(100vw - 8px)" : "max", maxWidth: isPanelOpen && "290px", transition: 'width 0.3s ease-in-out' }}>
                        <div
                            key={isPanelOpen ? "open" : "closed"} // Key change triggers re-animation
                            className={`flex gap-[5px] ${isPanelOpen ? 'flex-row w-full ' : 'w-[calc(100vw_-_90px)]  xs-sm:w-full  xs-sm:flex-col'}`}
                        >
                            {panelOptionsArray.map(([key, value], index) => (
                                <button key={key} className={`flex justify-center items-center font-bold w-[50px] h-[45px] transition duration-200 rounded-md  mr-1 ${panel !== value ? " bg-base-300 text-t-header-dark hover:bg-base-100 hover:text-t-header-light dark:text-t-header-dark hover:dark:text-t-header-dark  dark:bg-[#322e38] hover:dark:bg-base-100-dark " : isPanelOpen ? " bg-base-100 text-t-header-light  dark:bg-base-100-dark dark:text-t-header-dark" : " bg-base-300 text-t-header-dark hover:bg-base-100 hover:text-t-header-light dark:text-t-header-dark hover:dark:text-t-header-dark  dark:bg-[#322e38] hover:dark:bg-base-100-dark"}`} onClick={() => handleChangePanel(value)}>   
                                    {
                                        (index === 0) 
                                        ?
                                        < MdOutlineSubtitles className='text-3xl' />
                                        :
                                        < MdOutlinePlaylistAdd className='text-3xl' />

                                    }   
                                </button>
                            ))}
                        </div>
                    <div className={`w-max h-max`}>
                        <button className={`flex justify-center transition duration-200 items-center font-bold w-[50px] h-[45px] relative bg-base-300 rounded-md  text-t-header-dark dark:text-t-header-dark hover:bg-base-100 hover:text-t-header-light dark:bg-[#322e38] hover:dark:bg-base-100-dark ${!isPanelOpen && "mt-[5px]"}`} onClick={() => {setIsPanelOpen(!isPanelOpen);}}>
                            {
                                isPanelOpen
                                ?
                                <FaCompressAlt className='text-2.7xl' />
                                :
                                <FaExpandAlt className='text-2.7xl' />
                            }
                        </button>
                    </div>   
                </div>
            </AnimatePresence>
            <Dialog
                open={isVideoAddHelpOpen}
                onClose={() => setIsVideoAddHelpOpen(prevState => !prevState)}
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
                                onClick={() => setIsVideoAddHelpOpen(prevState => !prevState)}
                            />
                        </Button>
                    </div>
                    <Image src={helpAddVideoGif} className="w-auto h-[30vh] object-cover md:w-[800px] md:h-auto  z-0 overflow-hidden" />   
                </div>
            </Dialog>
            <div key={isPanelOpen ? "open" : "closed"} transition={spring}  ref={containerRef} className={`flex flex-col border-3  bg-base-100 dark:bg-base-100-dark dark:border-2 dark:border-[#322e38] m-2 mr-0  rounded-md   overflow-hidden overflow-y-auto select-none  no-scrollbar overflow-scroll transition-all duration-100 ${panel !== "Info" ? "hidden" : "visible"} ${isPanelOpen ? `opacity-1 transition duration-100 w-[calc(100vw_-_20px)] xs-sm:w-[290px] h-[calc(100vh_-_240px)]` : "opacity-0 transition duration-100 pointer-events-none w-0 h-0"} `}>
                <div className="flex flex-col w-full h-max mt-[15px] p-2 pt-[0px] bg-black">
                    <Header type="sm" >
                        Cover Image:
                    </Header>
                    <div className={`w-full overflow-hidden h-max mt-3`}>
                        <FileUpload 
                        className='text-t-header-light dark:text-t-header-dark' 
                        enableCrop={enableCrop}
                        imageToCrop={coverImageToCrop} 
                        setImageToCrop={setCoverImageToCrop} 
                        croppedImage={croppedCoverImage} 
                        setCroppedImage={setCroppedCoverImage}  
                        removeImage={removeCoverImage} 
                        isCropEnabled={isCropEnabled}
                        type="cover"
                        setCropType={setCropType}
                        />
                    </div> 
                </div>
                {
                    pageType === "page"
                    &&
                    <div className="flex flex-col w-full h-max mt-[15px] p-2 pt-[0px] bg-black gap-[10px] ">
                        <Header type="sm" >
                            Page Name
                        </Header>
                        <input className="w-full p-[5px] rounded-md dark:bg-base-100-dark dark:border-2 dark:border-[#302c38] dark:text-t-header-dark" placeholder={"Page Name"} value={pageName && pageName} onChange={(e) => handleSetPageName(e.currentTarget.value)}>
                        </input>
                        <AnimatePresence>
                            {pageNameError && (
                                <motion.div
                                initial={{ opacity: 0, height: 0, paddingX: 0, paddingY: 0 }}
                                animate={{ opacity: 1, height: "auto",  paddingX: 15, paddingY: 10, }}
                                exit={{ opacity: 0, height: 0, paddingY: 0, paddingX: 0}}
                                transition={{ duration: 0.5 }}
                                className="rounded-md overflow-hidden p-[10px] px-[15px] tracking-tighter"
                                    style={{ background: '#fd6666', marginTop: "5px", color: "black", marginTop: "15px"}}
                                >
                                    {pageNameError}
                                </motion.div>
                            )}
                        </AnimatePresence>  
                    </div>
                    
                }
                <div className="flex flex-col w-full h-max mt-[15px] p-2 pt-[0px] bg-black gap-[10px]">
                    <Header type="sm" >
                        Title
                    </Header>
                    <input className="w-full p-[5px] dark:bg-base-100-dark rounded-md dark:border-2 dark:border-[#302c38] dark:text-t-header-dark tracking-tighter" placeholder={pageType === "page" ? "Page Title" : "Article Title" } value={Title && Title} onChange={(e) => handleSetTitle(e.currentTarget.value)}>
                    </input>
                </div>
                <div className="flex flex-col w-full h-max mt-[15px] p-2 pt-[0px] bg-black gap-[10px]">
                    <Header type="sm" >
                        Author
                    </Header>
                    <input className="w-full p-[5px] dark:bg-base-100-dark rounded-md dark:border-2 dark:border-[#302c38] dark:text-t-header-dark tracking-tighter" placeholder={"Author Name"} value={Author && Author} onChange={(e) => handleSetAuthor(e.currentTarget.value)}>
                    </input>
                </div>
                <div className="flex flex-col w-full h-max mt-[15px] p-2 pt-[0px] bg-black gap-[10px]">
                    <div className='flex gap-[15px] items-center'>
                        <Header type="sm" classes={"w-max"}>
                            Tags
                        </Header>
                        <button className='rounded-md dark:hover:bg-[#322e38] w-max h-max p-3'>
                            < FaPlus className="dark:text-t-header-dark" onClick={() => handleAddTags()}/>
                        </button>
                    </div>
                    <div className='flex flex-wrap min-h-[50px] w-full bg-base-300 rounded-md dark:bg-base-100-dark dark:border-2 dark:border-[#302c38]'>
                        {tags.map((tag, index) => (
                            <div key={`${index}-${tag.Text}`}
                                className='p-[5px] m-[5px] bg-base-100 w-[calc(100%_-_10px)] flex items-center gap-[5px] rounded dark:bg-[#57545e] dark:text-t-header-dark rounded-md'
                                >
                                
                                <div className='w-[calc(100%_-_32px)] h-full text-xl max-w-[calc(100%_-_27px)] flex items-center truncate text-ellipsis tracking-tighter' suppressContentEditableWarning={true} contentEditable={true} onBlur={(e) => handleChangeTag(index, e.currentTarget.textContent)}>
                                    {tag.Text}
                                </div>
                                <button className="hover:bg-base-300 rounded-md transition duration-100 dark:hover:bg-base-100-dark p-[5px] text-t-header-light hover:text-t-header-dark" onClick={() => handleRemoveTag(index)}>
                                    <TiDelete className="text-2.7xl text-inherit" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <AnimatePresence>
                        {tagErrorVisible && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ background: '#fd6666', marginTop: "5px", padding: "5px", borderRadius: "5px", color: "black"  }}
                            >
                                Error: You cannot add more than 4 tags.
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className="w-full h-max mt-[15px] p-2 pt-[0px] bg-black">
                    <div className='flex flex-col gap-[10px]'>
                        <Header type="sm" classes={"w-max"}>
                            Categories
                        </Header>
                        <span className='text-xl text-t-header-light dark:text-t-header-dark tracking-tighter'>
                            Pick 1 categorie that best fits your article.
                        </span>
                        {
                            selectedCanItem
                            &&
                            <span className='text-xl text-t-header-light dark:text-t-header-dark tracking-tighter'>
                                Selected: {selectedCanItem}
                            </span>
                        }
                        <div className="relative mt-[10px]">
                            <input
                                type="text"
                                className="border border-gray-300 rounded p-2 w-full tracking-tighter"
                                placeholder="Search Can Item..."
                      
                                onChange={(e) => setSearch(e.target.value)}
                                onFocus={() => setIsSearchOpen(true)}
                                onBlur={() => setTimeout(() => setIsSearchOpen(false), 100)}
                            />
                            {isSearchOpen && (
                                <div ref={dropdownRef} className="rounded mt-1 max-h-60 overflow-y-auto bg-[white] w-full rounded-md bg-base-300">
                                    <div
                                    className="flex items-center p-2 cursor-pointer p-[5px] rounded m-[5px] text-t-header-dark tracking-tighter"
                                    onMouseDown={() => { setSelectedCanItem("")}}
                                    >   
                                        None
                                    </div>
                                    {
                                        canItems.filter(canItem => search ? canItem.text.includes(search) : true)
                                        .map((canItem, index) => (
                                            <div
                                            key={index}
                                            className="flex items-center p-2 cursor-pointer p-[5px] rounded m-[5px] text-t-header-dark tracking-tighter"
                                            onMouseDown={() => { setSelectedCanItem(canItem.text)}}
                                            >   
                                                {canItem.text}
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                    <div id="filler-div" className="h-[100px] w-full">
                    </div>
                </div>
            </div>
            <div className={`flex flex-col border-3 dark:border-2 dark:border-[#322e38] m-2 mr-0 rounded-md h-full select-none pb-[15px] bg-base-100 dark:bg-base-100-dark overflow-hidden ${panel !== "Add" ? "hidden" : "visible"}  ${isPanelOpen ? "opacity-1 transition duration-100 w-[calc(100vw_-_20px)] xs-sm:w-[290px]" : "opacity-0 transition duration-100 pointer-events-none w-0"}`}>
                <Header type="sm" classes={"mt-[15px] p-[10px] pt-[0px]"} >
                    Componets
                </Header>
                <div className="flex flex-row p-2  items-center gap-[15px] mt-[15px] p-[10px] pt-[0px]" onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} onClick={() =>  handleAddComponent("header")}>
                    < FaPlus  className='text-t-header-light dark:text-t-header-dark'  />
                    <span className='text-t-header-light dark:text-t-header-dark tracking-tighter' >Header</span>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row p-2 items-center gap-[15px] mt-[15px] p-[10px] pt-[0px]" onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} onClick={() =>  handleAddComponent("paragraph")}>
                        <FaPlus className='text-t-header-light dark:text-t-header-dark' />
                        <span className='text-t-header-light dark:text-t-header-dark tracking-tighter'>Paragraph</span>
                    </div>
                </div>
                {/* <div className="flex flex-col">
                    <div className="flex flex-row p-2 items-center gap-[15px] mt-[15px] p-[10px] pt-[0px]" onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} onClick={() =>  handleAddComponent("list")}>
                        <FaPlus className='text-t-header-light dark:text-t-header-dark'/>
                        <span className='text-t-header-light dark:text-t-header-dark'>List</span>
                    </div>
                </div> */}
                <div className="flex flex-col px-[10px]">
                    <div className="flex flex-row  items-center gap-[15px] mt-[15px] p-[10px] pl-[0px] pt-[0px]" onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} onClick={() =>  setIsImageAddOpen(!isImageAddOpen)}>
                        <FaPlus className='text-t-header-light dark:text-t-header-dark' />
                        <span className='text-t-header-light dark:text-t-header-dark tracking-tighter'>Image</span>
                    </div>
                    {
                    isImageAddOpen 
                    &&

                        <div className={`w-full overflow-hidden h-max`}>
                            <FileUpload className='text-t-header-light dark:text-t-header-dark' addImage={handleAddComponent} enableCrop={enableCrop} imageToCrop={imageToCrop} setImageToCrop={setImageToCrop} croppedImage={croppedImage} setCroppedImage={setCroppedImage} isImageAddOpen={setIsImageAddOpen} removeImage={removeImage} type="comp" setCropType={setCropType} isCropEnabled={isCropEnabled}/>
                        </div> 
                    }
  
                </div>
                <div className="flex flex-col p-[10px] gap-[15px] pt-[0px]">
                    <div className="flex justify-between items-center gap-[15px] mt-[15px]  " onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} onClick={() =>  setIsVideoAddOpen(!isVideoAddOpen)}>
                        <div className="flex w-max gap-[15px] items-center">
                            <FaPlus className='text-t-header-light dark:text-t-header-dark' />
                            <span className='text-t-header-light dark:text-t-header-dark tracking-tighter'>Youtube Video</span>
                        </div>
                        {
                            isVideoAddOpen
                            &&
                            <button className='flex items-center justify-center w-[45px]'>
                                <MdOutlineQuestionMark className='text-2.5xl' onClick={() => {setIsHelpOpen(true, "video_help")}}></MdOutlineQuestionMark>
                            </button> 
                        }
                    </div>
                    {
                        isVideoAddOpen
                        &&
                            <div className='flex w-full gap-[10px]'>
                                <input id="video-input" className="w-[calc(100%_-_25px)] p-[5px] rounded" placeholder={"Youtube Embed ID"} onChange={(e) => setCurrentVideoLink(e.currentTarget.value)}>
                                </input>
                                <button className='flex items-center justify-center w-[45px] bg-primary-dark rounded border-2'>
                                    <MdOutlineDownloadDone className='text-2.5xl' onClick={() => {handleAddYoutubeVideo()}}></MdOutlineDownloadDone>
                                </button>   
                            </div>
                        }
                    {
                        <AnimatePresence>
                        {youtubeErrorVisible && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ background: '#fd6666', marginTop: "5px", padding: "5px", borderRadius: "5px", color: "black"  }}
                            >
                                Error: Please enter an embeded id.
                            </motion.div>
                            )}
                        </AnimatePresence>
                    }
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row p-2 items-center gap-[15px] mt-[15px] p-[10px] pt-[0px]" onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} onClick={() =>  handleAddComponent("resource")}>
                        <FaPlus className='text-t-header-light dark:text-t-header-dark' />
                        <span className='text-t-header-light dark:text-t-header-dark tracking-tighter'>Resource</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ControlPanel;