import React from "react";

const json_catgeories = [
    {title:"Spooky",link:"../link/to/page",image:"/testimage.png"},{title:"Folklore",link:"../link/to/page",image:"/testimage.png"},{title:"Unsolved",link:"../link/to/page",image:"/testimage.png"},{title:"Creature",link:"../link/to/page",image:"/testimage.png"},
    {title:"Spooky",link:"../link/to/page",image:"/testimage.png"},{title:"Folklore",link:"../link/to/page",image:"/testimage.png"},{title:"Unsolved",link:"../link/to/page",image:"/testimage.png"},{title:"Creature",link:"../link/to/page",image:"/testimage.png"}
];


const CategoryCard = (category) => {
    return (
        <>
            
            <div className="grid h-[234px] w-[23%] place-items-center bg-cover shadow-sidebig" style={{backgroundImage: `url(${category.image})`}}>
                <div className="text-3xl text-t-header-light">{category.title}</div>
                
            </div>
        </>

    );



}



const CategoriesSection = () => {
    return (
        <>


            <div>
                <div className="absolute left-[-50px]">
                    <div className="pt-[100px]">
                        <div className="w-[350px] p-[20px] bg-title-color rounded-lg shadow-lg">
                            <p className="text-right text-3xl">Categories.</p>
                            
                        </div>
                    </div>

                </div>



                <div className={`h-[825px] bg-grid-image bg-[50%]`}>
                    <div className="p-[200px] place-content-center">
                        <div className="flex flex-wrap justify-between gap-[10px]">
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