import React from "react";
// import {Button, Header, SubHeader, SubText} from "../../components/DisplayComp/Components"
import { Header, XLHeader, LargeParagraph } from "../textComponents";
import NeoButton from "../textComponents/neoButton";

const Lander = () => {
    return (
        <div className="h-max  w-screen overflow-hidden flex flex-col lg:flex-row bg-base-100 ">
            <div className="h-full w-[100%] mt-16 pt-[10px] lg:mt-0 lg:w-full flex flex-col justify-between lg:flex-row lg:items-center bg-primary dark:bg-secondary-dark lg:border-b-3 lg:border-b-0 lg:border-r-black lg:border-r-3"  >
                <div className="flex flex-col 3xl:flex 3xl:flex-col 3xl:w-[60vw] w-full  xs:h-max xs-sm:h-[400px] lg:h-max px-7 xs:pb-[150px] lg:px-0 py-[20px] lg:py-0 3xl:items-start 3xl:pr-[50px] gap-[25px]">
                    <div className="flex flex-col w-full 3xl:w-[45vw] gap-[25px] lg:pl-7 3xl:px-[2.5vw] lg:min-h-[230px]">
                        <Header type="landerTitle" classes="flex flex-col gap-0 md:gap-7 xs-sm:flex-row md:flex-row lg:flex-col xl:flex-row lg:w-[100%] xl:w-[90%]">
                            <div className="min-w-max">
                                Can Of
                            </div> 
                            
                            <span className="w-min w-full sm:w-min">
                                Mysteries 
                            </span>
                        </Header>

                        <LargeParagraph classes="lg:w-[80%] xl:mr-[118px]">
                            The world is a mysterious place. The can of mystery highlights some of those mysteries. Articles are uploaded once a year in the fall and/or spring.
                        </LargeParagraph > 

                    </div>
                    <div className=" lg:pl-7 3xl:pl-[2.5vw] 3xl:w-[45vw]">
                        <NeoButton  classes={"bg-primary-dark"}>Read Articles</NeoButton>
                    </div>
                </div>
                <div className="xs:h-[450px] xs-sm:h-[450px] lg:w-[925px]  lg:hidden px-7  lg:pt-28 flex flex-col justify-end dark:bg-base-100-dark text-t-header-light bg-base-100 dark:text-t-dark border-y-2 border-b-black"> 

                    <Header type="md" classes={"relative top-[-25px] xs:text-2.5xl sm:text-3xl "}>
                            Ghosts And Ghouls
                    </Header>
                    <div className="relative top-[-15px] md:top-[-25px] max-w-full xs:min-h-[400px] xs-sm:min-h-[400px]  md:min-h-[400px] bg-dark-purple rounded-lg border-2 my-[10px] shadow-lg">

                    </div>
                    <div className="relative top-[-15px] md:top-[-25px] w-full h-max flex flex-col items-end p-[10px] ">
                        <h2 className="w-content text-xl tracking-[-1.76px]">
                            Author Name
                        </h2>
                        <h2 className="w-content text-xl tracking-[-1.76px]">
                            @UserName
                        </h2>
                    </div>
                </div>
                <div className="h-full w-[784px] 3xl:w-[60vw] 3xl:px-[2.5vw] hidden lg:flex px-14 pt-28 flex flex-col border-l-3 border-l-black justify-center dark:bg-base-100-dark text-t-header-light bg-base-100 dark:text-t-dark"> 
                    <Header type="md" styles="pb-[20px]">
                            Ghosts And Ghouls
                    </ Header >
                    <div className="h-[35vw] w-[45vw] lg:h-[450px] lg:w-[650px] 3xl:w-full 3xl:h-[28vw] 3xl:my-[2vw] bg-dark-purple rounded-lg border-2 lg:border-3 my-[26px] shadow-lg">

                    </div>
                    <div className="w-full 3xl:w-full h-max flex flex-col items-end p-[10px] ">
                        <h2 className="w-content text-xl tracking-[-1.76px] xl:text-2xl xl:tracking-[-3.32px] 2xl:text-2.5xl 3xl:text-[1.25vw] tracking-[-5.76px]">
                            Author Name
                        </h2>
                        <h2 className="w-content text-xl tracking-[-1.76px] xl:text-2xl xl:tracking-[-3.32px] 2xl:text-2.5xl 3xl:text-[1.25vw] tracking-[-5.76px]">
                            @UserName
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lander;