import React, {useEffect, useState} from "react"
import { Dialog, Button } from "@mui/material";
import Image from "next/image";
import { makeStyles } from "@mui/styles";
import { TiDelete } from "react-icons/ti";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import Header from "../../TextComponents/Header1"

import helpAddVideoGif from "../Assets/help_add_vido.gif"
import helpAddLinkGif from "../Assets/help_add_link.gif"
import helpAddTagGif from "../Assets/help_add_tag.gif"
import helpFontSizeGif from "../Assets/help_font_size.gif"
import helpAddTextGif from "../Assets/help_add_text.gif"
import helpAddImageGif from "../Assets/help_add_image.gif"

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


const Help = ({isOpen, setIsOpen, type}) => {
    const [helpImage, setHelpImage] = useState(type || "menue");
    const [isOpened, setIsOpened] = useState(true)
    const classes = useStyles();


    useEffect(() => {
        if(type !== null){
            setHelpImage(type)
        }
    }, [type])

    return(
        <>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(!isOpen)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="max-content"
            >   
                <div className='overflow-hidden min-h-[400px] min-w-[100px]'>
                    <div className='flex justify-end w-full h-0 '>
                        {
                            helpImage === "menue"
                            ?
                            <Button  className={`z-10 m-7 h-min rounded-[30px] ${classes.button}`} disableRipple onClick={() => setIsOpen(!isOpen)} >
                                <TiDelete
                                    className={`text-[30px] text-base-300`}
                                    onMouseOver={(e) => (e.currentTarget.style.cursor = "pointer")}
                                />
                            </Button>
                            :
                            <Button  className={`z-10 m-7 h-min rounded-[30px] ${classes.button}`} disableRipple onClick={() => setHelpImage("menue")}>
                                <IoChevronBackCircleSharp
                                    className={`text-[30px] text-base-300`}
                                    onMouseOver={(e) => (e.currentTarget.style.cursor = "pointer")}
                                />
                            </Button>
                        }

                    </div>
                    {
                        helpImage === "menue"
                        &&
                        <div className="w-auto h-[30vh] object-cover md:w-[400px] md:h-[400px]  z-0 overflow-hidden flex flex-col p-7 gap-5">
                            <Header type="md">
                                Need Help?
                            </Header>
                            <div className="flex justify-apart">
                                <button onClick={() => setHelpImage("text_help")}>
                                    How do I add text?
                                </button>
                            </div>
                            <div className="flex justify-apart">
                                <button onClick={() => setHelpImage("image_help")}>
                                    How do I add an image?
                                </button>
                            </div>
                            <div className="flex justify-apart">
                                <button onClick={() => setHelpImage("video_help")}> 
                                    How do I add a video?
                                </button>
                            </div>
                            <div className="flex justify-apart">
                                <button onClick={() => setHelpImage("tag_help")}>
                                    How do I add tags?
                                </button>
                            </div>
                            <div className="flex justify-apart">
                                <button onClick={() => setHelpImage("link_help")}>
                                    How do I add a link?
                                </button>
                            </div>
                            <div className="flex justify-apart">
                                <button onClick={() => setHelpImage("fontSize_help")}>
                                    How do i change font sizes?
                                </button>
                            </div>
                        </div> 
                    }

                    {
                        helpImage === "video_help"
                        ?
                        <Image src={helpAddVideoGif} alt="Video Help Image" className="w-auto h-[30vh] object-cover md:w-[800px] md:h-auto  z-0 overflow-hidden" />
                        :
                            helpImage === "link_help"
                            ?
                            <Image src={helpAddLinkGif} alt="Link Help Image" className="w-auto h-[30vh] object-cover md:w-[800px] md:h-auto  z-0 overflow-hidden" />
                            :
                                helpImage === "tag_help"
                                ?
                                <Image src={helpAddTagGif} alt="Tag Help Image" className="w-auto h-[30vh] object-cover md:w-[800px] md:h-auto  z-0 overflow-hidden" />
                                :
                                    helpImage === "fontSize_help"
                                    ?
                                    <Image src={helpFontSizeGif} alt="Font Size Help Image" className="w-auto h-[30vh] object-cover md:w-[800px] md:h-auto  z-0 overflow-hidden" />
                                    :
                                        helpImage === "text_help"
                                        ?
                                        <Image src={helpAddTextGif} alt="Text Help Image" className="w-auto h-[30vh] object-cover md:w-[800px] md:h-auto  z-0 overflow-hidden" />
                                        :
                                            helpImage === "image_help"
                                            &&
                                            <Image src={helpAddImageGif} alt="Image Add Help Image" className="w-auto h-[30vh] object-cover md:w-[800px] md:h-auto  z-0 overflow-hidden" />
                    }
                    
                </div>
            </Dialog>
        </>
    )
}

export default Help;