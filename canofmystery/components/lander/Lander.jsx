import React from "react";
import {Button, Header, SubHeader, SubText} from "../../components/DisplayComp/Components"


const Lander = () => {

    return (
        <div className="h-screen w-screen 3xl:h-[60vw] 3xl:max-h-screen  flex flex-col lg:flex-row bg-base-100 border-b-2 border-b-black lg:border-b-3">
            <div className="h-full w-[100%] mt-16 pt-[10px] lg:mt-0 lg:w-full flex flex-col justify-between lg:flex-row lg:items-center bg-primary dark:bg-secondary-dark lg:border-b-3 lg:border-b-0 lg:border-r-black lg:border-r-3"  >
                <div className="3xl:flex 3xl:flex-col 3xl:w-[60vw] w-full h-max px-7  lg:px-0 py-[20px] lg:py-0 3xl:items-start 3xl:pr-[50px]">
                    <div className="w-full 3xl:w-[45vw] lg:pl-7 3xl:px-[2.5vw] lg:min-h-[230px]">
                        <div className="flex flex-wrap text-3xl md:text-4xl 3xl:text-[3.5vw] tracking-[-3.76px] md:tracking-[-4.76px] lg:w-[100%] xl:w-[90%] lg:text-6xl lg:tracking-[-13px] 2xl:text-7xl 2xl:tracking-[-15px] font-bold text-t-header-light dark:text-t-dark">
                            <span className="w-content">
                                Can Of
                            </span> 
                            &nbsp;
                            <span>
                                Mysteries 
                            </span>
                        </div>

                        <p className="text-xl mt-[15px] tracking-[-1.76px] lg:text-2xl tracking-[-2.76px] xl:text-2.5xl 2xl:text-2.7xl 3xl:w-full 3xl:text-[1.25vw] xl:tracking-[-3.32px] lg:mt-[30px] lg:w-[80%]  xl:mr-[118px]  h-max text-t-header-light dark:text-t-dark">
                            The world is a mysterious place. The can of mystery highlights some of those mysteries. Articles are uploaded once a year in the fall and/or spring.
                        </p>
                    </div>
                    <div className="lg:mt-[36px] lg:pl-7 3xl:pl-[2.5vw] mt-[20px] 3xl:w-[45vw]">
                        <button className="text-xl xs:tracking-[-1.76px] 3xl:w-[11vw]  3xl:h-[2.3vw] 3xl:text-[1.25vw]   lg:text-2xl lg:tracking-[-2.76px]  xl:text-2xl xl:tracking-[-3.32px] tracking-[-5.76px] border-2 lg:border-3 p-1 pr-3 rounded-md bg-primary-dark shadow-md ">
                            Read Articles
                        </button>
                    </div>
                </div>
                <div className="h-[50%] lg:w-[925px]  lg:hidden px-7  lg:pt-28 flex flex-col justify-end dark:bg-base-100-dark text-t-header-light bg-base-100 dark:text-t-dark border-t-2 border-b-black"> 

                    {/* <SubHeader>
                        Ghosts And Ghouls
                    </SubHeader> */}
                    <div className="relative top-[-15px] md:top-[-25px] max-w-full min-h-[45vh] bg-dark-purple rounded-lg border-2 my-[10px] shadow-lg">

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
                    <h2 className="text-3xl 3xl:text-[1.5vw] font-bold tracking-[-5.76px]">
                            Ghosts And Ghouls
                    </h2>
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