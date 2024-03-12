import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus } from "react-icons/fa"
import { TiDelete } from "react-icons/ti";
import FileUpload from "./ImageEditor/FileUpload";
import { MdOutlineDownloadDone } from "react-icons/md"
import { MdOutlineQuestionMark } from "react-icons/md"
import { Dialog, Button} from '@mui/material';
import { makeStyles } from '@mui/styles'
import Image from 'next/image';

import helpAddVideoGif from "./Assets/help_add_vido.gif"


import Header from "../../components/TextComponents/Header1"

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
    setAuthor, 
    setTags, 
    currentTags, 
    setCategory, 
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

    isCropEnabled,
    setIsHelpOpen,
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


    const categories = [
        "Bog Bodies",
        "Point Des Arts Bridge, Paris",
        "Kolmanskop, Namibia",
        "The Wawel Dragon",
        "Viking Runestones in America",
        "Hill of Crosses, Lithuania",
        "Queen Mary, Long Beach, California",
        "Fiji Mermaid",
        "Shroud of Turin",
        "St. Bernadette of Lourdes",
        "King Solomon’s Mines",
        "Oak Island Money Pit",
        "The Lost Dutchman Mine",
        "Giant Skeletons (of humans) in America",
        "Curse of King Tutankhamen",
        "Catacombs of Paris",
        "Catacombs of Rome",
        "Vlad the Impaler",
        "Lady Elizabeth Bathory, Blood Countess",
        "Lucky Number 7",
        "Unlucky Number 13",
        "El Dorado",
        "The Beale Treasure/Beale Papers",
        "Fountain of Youth",
        "Hollow Earth Theory",
        "Flat Earth Theory",
        "Loch Ness Monster",
        "Lake Champlain Monster",
        "Big Foot",
        "Wendigo",
        "Shapeshifters",
        "The Beast of Gévaudan",
        "Mothman",
        "Chupacabra",
        "Sedlec Ossuary, Kutna Hora",
        "Issie, Lake Ikeda, Japan",
        "Mokele-mbembe",
        "The Jersey Devil",
        "The Bray Road Beast",
        "The Vampire Beast of Bladenboro",
        "Mayan Prophecy, December 21, 2012",
        "The Brown Mountain Lights",
        "The Marfa Lights",
        "The Maco Light",
        "Bingham Light",
        "Lands End Light",
        "Crystal Skulls",
        "Bermuda Triangle",
        "The Lost Civilization of Lemura/Mu",
        "Bimini Road/Bimini Wall (Atlantis)",
        "Zombies (Voodoo ones)",
        "Nazca Lines",
        "Stonehenge",
        "Taj Mahal",
        "Alice of the Hermitage",
        "Gray Man of Pawley’s Island",
        "The Bell Witch",
        "Old Ford’s Glowing Cross",
        "Messie, Lake Murray Monster",
        "Lizardman of Scape Ore Swamp",
        "Edinburg Vaults",
        "Yonaguni Monument, Japan",
        "Coral Castle, Florida",
        "The Ideal Palace, Hauterives, France",
        "Glastonbury Abbey (Grail/Camelot)",
        "Georgia Guidestones",
        "Machu Picchu",
        "Reptilians/Lizard People",
        "The Illuminati",
        "The Knights Templar",
        "The Voynich Manuscript",
        "Codas Gigas (The Devil’s Bible)",
        "The 23 Enigma",
        "Zé Arigó",
        "Chemtrail Conspiracy",
        "Kidney Heist",
        "Crocodiles in the Sewers",
        "Vanishing Hitchhiker/Resurrection Mary",
        "Bloody Mary (game/ghost story)",
        "The Hookman",
        "Cry Baby Bridge",
        "The Grey Lady, Willard Library, Evansville, IN",
        "Stull Cemetery",
        "The Winchester Mystery House",
        "Suicidal Roommate/Straight A Semester",
        "Killer in the Backseat",
        "The Haunted Railroad Crossing",
        "Ghostly Athens (Athens, OH)",
        "Shanghai Tunnels (Portland, OR)",
        "Greyfriars Cemetery",
        "Dock Street Theater (Charleston, SC)",
        "La Isla De Las Munecas, Mexico",
        "Waverly Hills Sanatorium",
        "Saint Louis Cemetery #1, New Orleans",
        "Marie Laveau",
        "The Fox Sisters",
        "Edgar Cayce",
        "Slenderman",
        "The Mary Celeste",
        "Dyatlov Pass incident",
        "D.B. Cooper",
        "Elisa Lam"
    ];
    

    

    const filteredCategories = categories.filter(category =>
        category.toLowerCase().includes(search.toLowerCase())
    );
    

    const handleSetTitle = (value) => {
        if(value !== ""){
            setTitle(value)
        }else{
            setTitle("Example Title")
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
            console.log(newTags)
            return newTags;
        });
    };

    function handleRemoveTag(index) {
        setTags(tags => {
            return tags.filter((tag, i) => i !== index);
        });
    }

    const handleAddTags = () => {
        if (currentTags.length < 4) {
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

    useEffect(() => {
        if (isSearchOpen && containerRef.current && dropdownRef.current) {
            const dropdownRect = dropdownRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            const scrollY = dropdownRect.top + containerRef.current.scrollTop - containerRect.top - (containerRect.height / 2) + (dropdownRect.height / 2);
            containerRef.current.scrollTop = scrollY;
        }
    }, [isSearchOpen]);
    



    return (
        <>
            <div className={`flex w-[100vw] xs-sm:max-w-[300px] items-center select-none`}>
                {panelOptionsArray.map(([key, value], index) => (
                    (index === 0) 
                    ? 
                        <button key={key} className={`flex justify-center items-center font-bold w-[33.33%] h-[50px] text-t-header-light dark:text-t-header-dark ${panel !== value ? "border-b-[3px] border-b-black" : ""}`} onClick={() => setPanel(value)}>
                            {value}
                        </button>
                    :
                        <button key={key} className={`flex justify-center items-center font-bold w-[33.33%] h-[50px] border-l-[3px] border-l-black text-t-header-light dark:text-t-header-dark ${panel !== value ? "border-b-[3px] border-b-black" : ""}`} onClick={() => setPanel(value)}>
                            {value}
                        </button>
                ))}

            </div>
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
            
            <div  ref={containerRef} className={`flex flex-col w-[calc(100vw_-_20px)] xs-sm:w-[300px] h-full overflow-hidden overflow-y-auto select-none ${panel !== "Info" ? "hidden" : "visible"}`}>
                <div className="flex flex-col w-full h-max mt-[15px] p-[10px] pt-[0px] bg-black gap-[10px]">
                    <Header type="sm" >
                        Cover Image:
                    </Header>
                    <div className={`w-full overflow-hidden h-max`}>
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
                        />
                    </div> 
                </div>
                <div className="flex flex-col w-full h-max mt-[15px] p-[10px] pt-[0px] bg-black gap-[10px]">
                    <Header type="sm" >
                        Title
                    </Header>
                    <input className="w-full p-[5px] rounded" placeHolder={"Article Title"} onChange={(e) => handleSetTitle(e.currentTarget.value)}>
                    </input>
                </div>
                <div className="flex flex-col w-full h-max mt-[15px] p-[10px] pt-[0px] bg-black gap-[10px]">
                    <Header type="sm" >
                        Author
                    </Header>
                    <input className="w-full p-[5px] rounded" placeHolder={"Author Name"} onChange={(e) => handleSetAuthor(e.currentTarget.value)}>
                    </input>
                </div>
                <div className="flex flex-col w-full h-max mt-[15px] p-[10px] pt-[0px] bg-black gap-[10px]">
                    <div className='flex gap-[15px] items-center'>
                        <Header type="sm" classes={"w-max"}>
                            Tags
                        </Header>
                        <button>
                            < FaPlus onClick={() => handleAddTags()}/>
                        </button>
                    </div>
                    <div className='flex flex-wrap min-h-[50px] w-full bg-base-300 rounded-md'>
                        {currentTags.map((tag, index) => (
                            <div key={`${index}-${tag.Text}`}
                                className='p-[5px] m-[5px] bg-base-100 w-[calc(100%_-_10px)] flex flex-wrap items-center gap-[5px] rounded'
                                >
                                
                                <div className='w-[calc(100%_-_32px)] h-full text-xl max-w-[calc(100%_-_27px)] flex items-center truncate text-ellipsis' suppressContentEditableWarning={true} contentEditable={true} onBlur={(e) => handleChangeTag(index, e.currentTarget.textContent)}>
                                    {tag.Text}
                                </div>
                                <button onClick={() => handleRemoveTag(index)}>
                                    <TiDelete className="text-2.7xl" />
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
                <div className="w-full h-max mt-[15px] p-[10px] pt-[0px] bg-black">
                    <div className='flex flex-col gap-[10px]'>
                        <Header type="sm" classes={"w-max"}>
                            Categories
                        </Header>
                        <span className='text-xl text-t-header-light dark:text-t-header-dark'>
                            Pick 1 categorie that best fits your article.
                        </span>
                        <div className="relative mt-[10px]">
                            <input
                                type="text"
                                className="border border-gray-300 rounded p-2 w-full"
                                placeHolder="Search categories..."
                      
                                onChange={(e) => setSearch(e.target.value)}
                                onFocus={() => setIsSearchOpen(true)}
                                onBlur={() => setTimeout(() => setIsSearchOpen(false), 100)}
                            />
                            {isSearchOpen && (
                                <div ref={dropdownRef} className="rounded mt-1 max-h-60 overflow-y-auto bg-[white] w-full rounded-md bg-base-300">
                                    {filteredCategories.map((category, index) => (
                                        <div
                                        key={index}
                                        className="flex items-center p-2 cursor-pointer p-[5px] rounded m-[5px] text-t-header-dark"
                                        onMouseDown={() => {setSearch(category); setCategory(category)}}
                                        >   
                                            {category}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div id="filler-div" className="h-[100px] w-full">
                    </div>
                </div>
            </div>
            <div className={`flex flex-col w-full xs-sm:w-[300px] h-full select-none ${panel !== "Add" ? "hidden" : "visible"}`}>
                <Header type="sm" classes={"mt-[15px] p-[10px] pt-[0px]"} >
                    Componets
                </Header>
                <div className="flex flex-row p-2  items-center gap-[15px] mt-[15px] p-[10px] pt-[0px]" onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} onClick={() =>  handleAddComponent("header")}>
                    < FaPlus  className='text-t-header-light dark:text-t-header-dark'  />
                    <span className='text-t-header-light dark:text-t-header-dark' >Header</span>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row p-2 items-center gap-[15px] mt-[15px] p-[10px] pt-[0px]" onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} onClick={() =>  handleAddComponent("in-paragraph")}>
                        <FaPlus className='text-t-header-light dark:text-t-header-dark' />
                        <span className='text-t-header-light dark:text-t-header-dark'>Indented Paragraph</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row p-2 items-center gap-[15px] mt-[15px] p-[10px] pt-[0px]" onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} onClick={() =>  handleAddComponent("paragraph")}>
                        <FaPlus className='text-t-header-light dark:text-t-header-dark' />
                        <span className='text-t-header-light dark:text-t-header-dark'>Unindented Paragraph</span>
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
                        <span className='text-t-header-light dark:text-t-header-dark'>Image</span>
                    </div>
                    {
                    isImageAddOpen 
                    &&

                        <div className={`w-full overflow-hidden h-max`}>
                            <FileUpload className='text-t-header-light dark:text-t-header-dark' addImage={handleAddComponent} enableCrop={enableCrop} imageToCrop={imageToCrop} setImageToCrop={setImageToCrop} croppedImage={croppedImage} setCroppedImage={setCroppedImage} isImageAddOpen={setIsImageAddOpen} removeImage={removeImage} type="comp" isCropEnabled={isCropEnabled}/>
                        </div> 
                    }
  
                </div>
                <div className="flex flex-col p-[10px] gap-[15px] pt-[0px]">
                    <div className="flex justify-between items-center gap-[15px] mt-[15px]  " onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'} onClick={() =>  setIsVideoAddOpen(!isVideoAddOpen)}>
                        <div className="flex w-max gap-[15px] items-center">
                            <FaPlus className='text-t-header-light dark:text-t-header-dark' />
                            <span className='text-t-header-light dark:text-t-header-dark'>Youtube Video</span>
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
                                <input id="video-input" className="w-[calc(100%_-_25px)] p-[5px] rounded" placeHolder={"Youtube Embed ID"} onChange={(e) => setCurrentVideoLink(e.currentTarget.value)}>
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
                        <span className='text-t-header-light dark:text-t-header-dark'>Resource</span>
                    </div>
                </div>
            </div>
            <div className={`flex w-full h-full ${panel !== "HTML" ? "hidden" : "visible"} select-none`}>
                <div className="w-full  h-max mt-[15px] p-[10px] pt-[0px] ">
                    <Header type="sm" >
                        Inner HTML
                    </Header>
                    <textarea placeHolder="Click on an editable element to see its raw content" value={innerHtml[1]} className="w-full rounded p-[5px] min-h-[200px]">
                       
                    </textarea >
                    <div className='p-[5px] bg-base-100 w-full h-[50px] flex justify-center items-center gap-[5px] rounded bg-base-300 text-t-header-dark' onClick={() => exportContent()}>
                        Export Content JSON
                    </div>
                </div>
            </div>
        </>
    );
};

export default ControlPanel;