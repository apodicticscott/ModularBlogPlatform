'use client'
import NeoButtonLink from "../TextComponents/NeoButtonLink";


const json_article_cards_array = [
    {title:"Bog Bodies",link:"../link/to/page"},
    {title:"Wiking Runestones In America",link:"../link/to/page"},
    {title:"Kolmanskop, Nambia",link:"../link/to/page"},
    {title:"Fiji Mermaid",link:"../link/to/page"},
    {title:"The Wawel Dragon",link:"../link/to/page"},
    {title:"Hill of Crosses, Lithuania",link:"../link/to/page"},
    {title:"Queen Mary, Long Beach, California",link:"../link/to/page"},
    {title:"Point Des Arts Bridge, Paris",link:"../link/to/page"},
    {title:"Kolmanskop, Namibia",link:"../link/to/page"},
    {title:"Shroud of Turin",link:"../link/to/page"}
];




const ArticleCardsSection = () => {
    return (
        <>
        <div>
            <div className={`h-[100px] bg-primary-dark`}>
                    <div className="place-content-center">
                        <div className="snap-proximity snap-x flex p-[20px] gap-[40px] flex-nowrap overflow-x-auto overscroll-contain">
                            {
                                json_article_cards_array.map((tag, index) => (
                                    <NeoButtonLink key={`${index}-${tag.title}`} bgcolor={"bg-base-100"} children={tag.title} link={tag.link} style={"snap-center"}/> //Supposed to use  but bg color takes a hex code...
                                ))
                            }
                        </div>
                    </div>
                </div>
        </div>
        
        </>
    );
};

export default ArticleCardsSection;