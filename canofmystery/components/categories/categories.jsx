import React from "react";

const json_catgeories = [
    {title:"Spooky",link:"../link/to/page",image:"/testimage.png"},{title:"Folklore",link:"../link/to/page",image:"/testimage.png"},{title:"Unsolved",link:"../link/to/page",image:"/testimage.png"},{title:"Creature",link:"../link/to/page",image:"/testimage.png"},
    {title:"Spooky",link:"../link/to/page",image:"/testimage.png"},{title:"Folklore",link:"../link/to/page",image:"/testimage.png"},{title:"Unsolved",link:"../link/to/page",image:"/testimage.png"},{title:"Creature",link:"../link/to/page",image:"/testimage.png"}
];


const CategoryCard = (category) => {
    return (
        <>
            
            <div className="grid h-[234px] lg:w-[calc(10%_-_20px)] xl:w-[calc(27.5%_-_60px)] place-items-center object-contain bg-t-header-light border-3 object-none shadow-sidelg rounded-md">
                <div className="text-3xl text-base-100">{category.title}</div>
            </div>
        </>

    );



}



const CategoriesSection = () => {
    return (
        <>
            <div className="pt-[50px] dark:bg-base-100-dark bg-grid-image bg-base-100 border-t-3 ">
                <div className={`h-max bg-[50%]`}>
                    <div className="flex justify-between h-[70px]">
                        <div className="flex">
                            <div className="w-[0px] h-full">
                                <div className="w-[100px] h-[500px] top-[50px] relative lg:hidden bg-gradient-to-l from-transparent to-t-header-dark dark:to-base-100-dark">

                                </div>
                            </div>
                            <div className="flex justify-end items-center text-2xl md:text-2.7xl p-[15px] h-[50px] md:h-[70px] w-[500px] relative left-[-350px] md:left-[-250px] rounded-md bg-light-purple border-3 shadow-lg font-bold">
                                Categories.
                            </div>
                        </div>
                    </div>
                    <div className="px-14 py-[100px] flex w-full place-content-center">
                        <div className="resize-none flex flex-wrap maw-full max-w-[1500px] gap-[20px] grid-flow-row auto-rows-max justify-center ">
                            {
                                json_catgeories.map((category, index) => 
                                    CategoryCard(category)
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            
        </>

    );

};

export default CategoriesSection;