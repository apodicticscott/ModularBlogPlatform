import React from "react";

const json_catgeories = [
    {title:"Spooky",link:"../link/to/page",image:"/testimage.png"},{title:"Folklore",link:"../link/to/page",image:"/testimage.png"},{title:"Unsolved",link:"../link/to/page",image:"/testimage.png"},{title:"Creature",link:"../link/to/page",image:"/testimage.png"},
    {title:"Spooky",link:"../link/to/page",image:"/testimage.png"},{title:"Folklore",link:"../link/to/page",image:"/testimage.png"},{title:"Unsolved",link:"../link/to/page",image:"/testimage.png"},{title:"Creature",link:"../link/to/page",image:"/testimage.png"}
];


const CategoryCard = (category) => {
    return (
        <>
            
            <div className="grid h-[234px] w-[23%] place-items-center bg-cover" style={{backgroundImage: `url(${category.image})`}}>
                <div className="text-3xl text-t-header-light">{category.title}</div>
                
            </div>
        </>

    );



}



const CategoriesSection = () => {
    return (
        <>
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
        </>

    );

};

export default CategoriesSection;